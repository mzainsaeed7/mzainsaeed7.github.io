"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the cursor follower
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // State for interactions
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    // Hide cursor on touch devices or initially
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Add listeners for hover effects on clickable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on mobile (simple check)
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
                opacity: isVisible ? 1 : 0,
            }}
        >
            {/* Main Center Dot (Precision) */}
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: isClicking ? 0.8 : 1,
                    }}
                    className="w-2 h-2 bg-white rounded-full"
                />

                {/* Outer Ring (Magnetic Field) */}
                <motion.div
                    animate={{
                        width: isHovering ? 60 : 32,
                        height: isHovering ? 60 : 32,
                        opacity: isHovering ? 0.5 : 0.2,
                        borderRadius: isHovering ? "20%" : "50%", // Square-ish when hovering links (Tech feel)
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute border border-white rounded-full"
                />

                {/* Tech Accents (Crosshair style) */}
                {isHovering && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute -top-6 w-[1px] h-3 bg-white/50"
                        />
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute -bottom-6 w-[1px] h-3 bg-white/50"
                        />
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute -left-6 w-3 h-[1px] bg-white/50"
                        />
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute -right-6 w-3 h-[1px] bg-white/50"
                        />
                    </>
                )}
            </div>
        </motion.div>
    );
}
