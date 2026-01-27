"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text, Line, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo, useRef, useState, useEffect, useCallback } from "react";

// --- Configuration (Smoother, less aggressive) ---
const NODE_RADIUS = 0.5;
const LINK_DISTANCE = 5.0;
const REPULSION_FORCE = 3; // Reduced for smoother motion
const SPRING_STRENGTH = 0.03; // Reduced for gentler movement
const CENTERING_FORCE = 0.003; // Reduced
const DRAG_DAMPING = 0.15;
const VELOCITY_DAMPING = 0.92; // Increased damping for smoother motion
const CONTINUOUS_DRIFT = 0.008; // New: gentle continuous motion

// --- Development Tools & Technologies ---
const NODES = [
    { id: "flutter", label: "Flutter", type: "framework", color: "#54C5F8" },
    { id: "dart", label: "Dart", type: "language", color: "#0175C2" },
    { id: "react", label: "React", type: "framework", color: "#61DAFB" },
    { id: "nodejs", label: "Node.js", type: "runtime", color: "#339933" },
    { id: "restapi", label: "REST API", type: "api", color: "#FF6C37" },
    { id: "graphql", label: "GraphQL", type: "api", color: "#E10098" },
    { id: "postman", label: "Postman", type: "tool", color: "#FF6C37" },
    { id: "firebase", label: "Firebase", type: "service", color: "#FFCA28" },
    { id: "mongodb", label: "MongoDB", type: "database", color: "#47A248" },
    { id: "postgresql", label: "PostgreSQL", type: "database", color: "#4169E1" },
    { id: "docker", label: "Docker", type: "devops", color: "#2496ED" },
    { id: "git", label: "Git", type: "vcs", color: "#F05032" },
    { id: "github", label: "GitHub", type: "platform", color: "#181717" },
    { id: "slack", label: "Slack", type: "communication", color: "#4A154B" },
    { id: "vscode", label: "VS Code", type: "editor", color: "#007ACC" },
    { id: "figma", label: "Figma", type: "design", color: "#F24E1E" },
    { id: "typescript", label: "TypeScript", type: "language", color: "#3178C6" },
    { id: "kotlin", label: "Kotlin", type: "language", color: "#7F52FF" },
    { id: "swift", label: "Swift", type: "language", color: "#FA7343" },
    { id: "python", label: "Python", type: "language", color: "#3776AB" },
    { id: "tailwind", label: "Tailwind", type: "css", color: "#06B6D4" },
    { id: "redux", label: "Redux", type: "state", color: "#764ABC" },
    { id: "webpack", label: "Webpack", type: "bundler", color: "#8DD6F9" },
    { id: "jest", label: "Jest", type: "testing", color: "#C21325" },
];

const LINKS = [
    // Frontend Stack
    { source: "react", target: "typescript" },
    { source: "react", target: "redux" },
    { source: "react", target: "tailwind" },
    { source: "typescript", target: "nodejs" },
    
    // Mobile Development
    { source: "flutter", target: "dart" },
    { source: "flutter", target: "firebase" },
    { source: "kotlin", target: "restapi" },
    { source: "swift", target: "restapi" },
    
    // Backend & APIs
    { source: "nodejs", target: "restapi" },
    { source: "nodejs", target: "graphql" },
    { source: "restapi", target: "postman" },
    { source: "graphql", target: "postman" },
    { source: "python", target: "restapi" },
    
    // Databases
    { source: "nodejs", target: "mongodb" },
    { source: "nodejs", target: "postgresql" },
    { source: "firebase", target: "mongodb" },
    
    // DevOps & Tools
    { source: "docker", target: "nodejs" },
    { source: "docker", target: "mongodb" },
    { source: "docker", target: "postgresql" },
    { source: "git", target: "github" },
    { source: "vscode", target: "git" },
    
    // Build & Testing
    { source: "webpack", target: "react" },
    { source: "jest", target: "react" },
    { source: "jest", target: "nodejs" },
    
    // Collaboration
    { source: "slack", target: "github" },
    { source: "figma", target: "react" },
    { source: "figma", target: "flutter" },
    
    // Cross connections
    { source: "vscode", target: "typescript" },
    { source: "vscode", target: "python" },
    { source: "github", target: "docker" },
];

type NodeType = {
    id: string;
    label: string;
    type: string;
    color: string;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    mass: number;
    drift: THREE.Vector3; // For continuous motion
};

function GraphSimulation() {
    const { camera, mouse } = useThree();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    // Initialize Simulation State
    const nodes = useMemo(() => {
        return NODES.map((n) => ({
            ...n,
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 3
            ),
            velocity: new THREE.Vector3(0, 0, 0),
            mass: ['framework', 'runtime', 'database'].includes(n.type) ? 1.8 : 1,
            drift: new THREE.Vector3(
                (Math.random() - 0.5) * CONTINUOUS_DRIFT,
                (Math.random() - 0.5) * CONTINUOUS_DRIFT,
                0
            ),
        }));
    }, []);

    const nodesRef = useRef<NodeType[]>(nodes);
    const timeRef = useRef(0);

    const getTargetPosition = useCallback((mouseX: number, mouseY: number) => {
        const vec = new THREE.Vector3(mouseX, mouseY, 0.5);
        vec.unproject(camera);
        vec.sub(camera.position).normalize();
        const distance = -camera.position.z / vec.z;
        return camera.position.clone().add(vec.multiplyScalar(distance));
    }, [camera]);

    useFrame((state, delta) => {
        const physicsNodes = nodesRef.current;
        const targetPos = getTargetPosition(mouse.x, mouse.y);
        timeRef.current += delta;

        physicsNodes.forEach((node, i) => {
            // Dragging Override
            if (node.id === draggedNode) {
                const force = targetPos.clone().sub(node.position).multiplyScalar(DRAG_DAMPING);
                node.velocity.add(force);
            }

            // A. Continuous Drift (circular motion)
            const driftX = Math.sin(timeRef.current * 0.3 + i * 0.5) * CONTINUOUS_DRIFT;
            const driftY = Math.cos(timeRef.current * 0.2 + i * 0.7) * CONTINUOUS_DRIFT;
            node.velocity.add(new THREE.Vector3(driftX, driftY, 0));

            // B. Repulsion (Gentler)
            physicsNodes.forEach((other, j) => {
                if (i === j) return;
                const dir = node.position.clone().sub(other.position);
                const dist = Math.max(dir.length(), 0.5); // Avoid singularity

                const forceMagnitude = REPULSION_FORCE / (dist * dist);
                dir.normalize().multiplyScalar(forceMagnitude);
                node.velocity.add(dir.divideScalar(node.mass));
            });

            // C. Center Gravity
            const centerDir = node.position.clone().multiplyScalar(-1);
            node.velocity.add(centerDir.multiplyScalar(CENTERING_FORCE));
        });

        // D. Spring Forces
        LINKS.forEach(link => {
            const source = physicsNodes.find(n => n.id === link.source);
            const target = physicsNodes.find(n => n.id === link.target);
            if (!source || !target) return;

            const dir = target.position.clone().sub(source.position);
            const dist = dir.length();
            const stretch = dist - LINK_DISTANCE;

            const force = dir.normalize().multiplyScalar(stretch * SPRING_STRENGTH);

            source.velocity.add(force.clone().divideScalar(source.mass));
            target.velocity.sub(force.divideScalar(target.mass));
        });

        // E. Update Positions
        physicsNodes.forEach(node => {
            node.velocity.multiplyScalar(VELOCITY_DAMPING);
            node.position.add(node.velocity);

            // Soft Boundaries
            if (Math.abs(node.position.x) > 14) node.velocity.x -= node.position.x * 0.008;
            if (Math.abs(node.position.y) > 10) node.velocity.y -= node.position.y * 0.008;
        });
    });

    const handlePointerDown = (e: any, nodeId: string) => {
        e.stopPropagation();
        setDraggedNode(nodeId);
    };

    const handlePointerUp = () => {
        setDraggedNode(null);
    };

    useEffect(() => {
        window.addEventListener('pointerup', handlePointerUp);
        return () => window.removeEventListener('pointerup', handlePointerUp);
    }, []);

    return (
        <group>
            {LINKS.map((link, i) => {
                const source = nodesRef.current.find(n => n.id === link.source);
                const target = nodesRef.current.find(n => n.id === link.target);
                if (!source || !target) return null;

                return (
                    <LinkSegment key={i} start={source} end={target} />
                );
            })}

            {nodesRef.current.map((node) => (
                <NodeMesh
                    key={node.id}
                    node={node}
                    isActive={draggedNode === node.id || hoveredNode === node.id}
                    onPointerDown={(e: any) => handlePointerDown(e, node.id)}
                    onPointerOver={() => setHoveredNode(node.id)}
                    onPointerOut={() => setHoveredNode(null)}
                />
            ))}
        </group>
    );
}

function LinkSegment({ start, end }: { start: NodeType, end: NodeType }) {
    const geoRef = useRef<THREE.BufferGeometry>(null);

    useFrame(() => {
        if (geoRef.current) {
            const positions = geoRef.current.attributes.position.array as Float32Array;
            positions[0] = start.position.x;
            positions[1] = start.position.y;
            positions[2] = start.position.z;
            positions[3] = end.position.x;
            positions[4] = end.position.y;
            positions[5] = end.position.z;
            geoRef.current.attributes.position.needsUpdate = true;
        }
    });

    return (
        <line>
            <bufferGeometry ref={geoRef}>
                <bufferAttribute
                    attach="attributes-position"
                    args={[new Float32Array(6), 3]}
                    count={2}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
        </line>
    );
}

function NodeMesh({ node, isActive, onPointerDown, onPointerOver, onPointerOut }: any) {
    const ref = useRef<THREE.Group>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.position.copy(node.position);
            ref.current.lookAt(0, 0, 10);
        }
    });

    return (
        <group ref={ref}>
            <Sphere
                args={[['framework', 'runtime', 'database'].includes(node.type) ? 0.65 : 0.45, 16, 16]}
                onPointerDown={onPointerDown}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; onPointerOver(); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; onPointerOut(); }}
            >
                <meshStandardMaterial
                    color={isActive ? "#ffffff" : node.color}
                    emissive={node.color}
                    emissiveIntensity={isActive ? 0.6 : 0.15}
                    roughness={0.3}
                    metalness={0.7}
                    transparent
                    opacity={0.7}
                />
            </Sphere>
            <Text
                position={[0, 0.85, 0]}
                fontSize={0.25}
                color={isActive ? "#ffffff" : "#aaaaaa"}
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.01}
                outlineColor="#000000"
            >
                {node.label}
            </Text>
        </group>
    );
}

export function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-auto">
            {/* Gradient Background with better depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-950" />
            
            {/* Subtle overlay to reduce distraction */}
            <div className="absolute inset-0 bg-black/20" />

            <Canvas 
                camera={{ position: [0, 0, 16], fov: 40 }} 
                dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={1.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
                <pointLight position={[0, 15, 5]} intensity={0.6} color="#8b5cf6" />

                <Suspense fallback={null}>
                    <GraphSimulation />
                </Suspense>
            </Canvas>
        </div>
    );
}