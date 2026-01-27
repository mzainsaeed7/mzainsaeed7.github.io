"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useMemo, useEffect, createRef } from "react";
import { Environment, Text, Stars } from "@react-three/drei";
import * as THREE from "three";

// Physics parameters
const COUNT = 12;
const BOUNDARY = 7;
const GRAVITY = 0; // Space-like physics
const DAMPING = 0.98;
const MOUSE_REPULSION = 5;

type PhysicsObject = {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    rotation: THREE.Vector3;
    rotVelocity: THREE.Vector3;
    radius: number;
    symbol: string;
    color: string;
    ref: React.RefObject<THREE.Group | null>;
};

function PhysicsScene() {
    const { viewport, mouse } = useThree();

    // Initialize physics state
    const objects = useMemo<PhysicsObject[]>(() => {
        const symbols = [
            { char: "{ }", color: "#6366f1" },
            { char: "</>", color: "#8b5cf6" },
            { char: "&&", color: "#ec4899" },
            { char: "npm", color: "#ef4444" },
            { char: "git", color: "#f97316" },
            { char: "main", color: "#10b981" },
            { char: ";", color: "#3b82f6" },
            { char: "const", color: "#eab308" },
            { char: "#", color: "#06b6d4" },
            { char: "++", color: "#8b5cf6" },
            { char: "[]", color: "#f43f5e" },
            { char: "=>", color: "#84cc16" },
        ];

        return symbols.map((s, i) => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.05
            ),
            rotation: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, 0),
            rotVelocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05
            ),
            radius: 1.2, // Approximate collision radius
            symbol: s.char,
            color: s.color,
            ref: createRef<THREE.Group>() as React.RefObject<THREE.Group | null> // Casting for TS
        }));
    }, []);

    useFrame((state) => {
        const mousePos = new THREE.Vector3((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);

        objects.forEach((obj, i) => {
            if (!obj.ref.current) return;

            // 1. Apply forces
            // Mouse Repulsion
            const distToMouse = obj.position.distanceTo(mousePos);
            if (distToMouse < 4) {
                const forceDir = obj.position.clone().sub(mousePos).normalize();
                const force = (4 - distToMouse) * 0.05; // Stronger force closer
                obj.velocity.add(forceDir.multiplyScalar(force));
                // Add spin on hit
                obj.rotVelocity.x += (Math.random() - 0.5) * 0.1;
                obj.rotVelocity.y += (Math.random() - 0.5) * 0.1;
            }

            // Return to center (soft gravity to keep them in view)
            obj.velocity.add(obj.position.clone().multiplyScalar(-0.001));

            // 2. Collisions with other objects
            for (let j = i + 1; j < objects.length; j++) {
                const other = objects[j];
                const dist = obj.position.distanceTo(other.position);
                const minDist = obj.radius + other.radius;

                if (dist < minDist) {
                    // Simple elastic collision response
                    const normal = obj.position.clone().sub(other.position).normalize();
                    const relativeVelocity = obj.velocity.clone().sub(other.velocity);
                    const speed = relativeVelocity.dot(normal);

                    if (speed < 0) {
                        const impulse = normal.multiplyScalar(speed); // Restitution 1 (elastic)
                        obj.velocity.sub(impulse);
                        other.velocity.add(impulse);

                        // Separate to prevent sticking
                        const overlap = (minDist - dist) / 2;
                        obj.position.add(normal.clone().multiplyScalar(overlap));
                        other.position.sub(normal.clone().multiplyScalar(overlap));
                    }
                }
            }

            // 3. Update Physics
            obj.velocity.multiplyScalar(DAMPING);
            obj.position.add(obj.velocity);

            obj.rotation.add(obj.rotVelocity);
            obj.rotVelocity.multiplyScalar(0.99); // Drag on rotation

            // 4. Boundary Checks (Soft bounce)
            if (Math.abs(obj.position.x) > viewport.width / 2) obj.velocity.x *= -1;
            if (Math.abs(obj.position.y) > viewport.height / 2) obj.velocity.y *= -1;
            if (Math.abs(obj.position.z) > 5) obj.velocity.z *= -1;

            // 5. Apply to Mesh
            obj.ref.current.position.copy(obj.position);
            obj.ref.current.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z);
        });
    });

    return (
        <group>
            {objects.map((obj, i) => (
                <group key={i} ref={obj.ref} position={obj.position}>
                    <Text
                        font="/fonts/inter-bold.woff"
                        fontSize={1}
                        color={obj.color}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {obj.symbol}
                        <meshStandardMaterial emissive={obj.color} emissiveIntensity={0.8} toneMapped={false} />
                    </Text>
                    {/* Debug collider visualization - commented out */}
                    {/* <mesh visible={false}><sphereGeometry args={[obj.radius, 16, 16]} /><meshBasicMaterial wireframe color="white" /></mesh> */}
                </group>
            ))}
        </group>
    );
}

export function HeroCanvas() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <PhysicsScene />
                    <fog attach="fog" args={['#09090b', 8, 25]} />
                </Suspense>
            </Canvas>
        </div>
    );
}

