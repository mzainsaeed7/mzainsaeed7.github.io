"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { skillCategories, type Skill } from "@/data/skills";

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const percentX = (e.clientX - centerX) / (rect.width / 2);
        const percentY = (e.clientY - centerY) / (rect.height / 2);
        mouseX.set(percentX);
        mouseY.set(percentY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative cursor-pointer"
        >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500" />

            {/* Card Container */}
            <div
                className="relative h-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-500 group-hover:border-zinc-700/80 overflow-hidden"
                style={{ transform: "translateZ(20px)" }}
            >
                {/* Mesh Gradient Background - Half opacity */}
                <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
                </div>

                {/* Animated Grid Pattern - Half opacity */}
                <div
                    className="absolute inset-0 opacity-[0.025] group-hover:opacity-[0.05] transition-opacity duration-500"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.53) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.53) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Logo Container with 3D Effect */}
                <motion.div
                    className="relative z-10 mb-4 flex items-center justify-center"
                    style={{ transform: "translateZ(50px)" }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24">
                        {/* Pulsing Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Logo */}
                        <div className="absolute inset-2 rounded-full bg-zinc-800/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 border border-zinc-700/30">
                            <Image
                                src={skill.image ?? "/skills/vscode.png"}
                                alt={skill.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Skill Name */}
                <motion.h3
                    className="relative z-10 text-center text-sm sm:text-base md:text-base font-bold text-white tracking-tight mb-4"
                    style={{ transform: "translateZ(30px)" }}
                >
                    {skill.name}
                </motion.h3>

                {/* Progress Bar Section */}
                <div className="relative z-10 space-y-2">
                    {/* Percentage Label */}
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="font-medium">Proficiency</span>
                        <motion.span
                            className="font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: index * 0.1 + 0.3 }}
                        >
                            {skill.level}%
                        </motion.span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-zinc-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-zinc-700/30">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{
                                duration: 1.2,
                                delay: index * 0.1 + 0.4,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            {/* Shimmer Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                    x: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: "linear"
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Floating Particles */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                    animate={{
                        x: [0, 30, -30, 0],
                        y: [0, -30, 30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                    }}
                />
            </div>
        </motion.div>
    );
};

export function SkillsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isTitleInView = useInView(titleRef, { once: true });

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
        >
            {/* Background Overlay to damp global animation */}
            <div className="absolute inset-0 bg-zinc-950/70" />

            {/* Animated Gradient Mesh - Reduced to 50% */}
            <div className="absolute inset-0 opacity-[0.075]">
                <motion.div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500 rounded-full blur-[100px]"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            {/* Subtle Grid - Very light */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    ref={titleRef}
                    className="text-center mb-12 sm:mb-14 md:mb-16"
                >
                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 mb-6"
                    >
                        <motion.span
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                            animate={{
                                boxShadow: [
                                    "0 0 10px rgba(99, 102, 241, 0.5)",
                                    "0 0 20px rgba(139, 92, 246, 0.8)",
                                    "0 0 10px rgba(99, 102, 241, 0.5)",
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-wider">
                            Tech Stack
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                    >
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-white">
                            Technical Skills
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        Technologies I use to build exceptional mobile and web solutions
                    </motion.p>
                </motion.div>

                {/* Skills Grid */}
                <div className="space-y-12 sm:space-y-14 md:space-y-16">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.8,
                                delay: categoryIndex * 0.2,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            {/* Category Title */}
                            <motion.div
                                className="flex items-center justify-center gap-6 mb-10 sm:mb-12 md:mb-14"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.2 + 0.3 }}
                            >
                                <motion.div
                                    className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent flex-1 max-w-xs"
                                    initial={{ scaleX: 0 }}
                                    animate={isInView ? { scaleX: 1 } : {}}
                                    transition={{ duration: 1, delay: categoryIndex * 0.2 + 0.4 }}
                                />

                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-white uppercase tracking-wider px-4">
                                    {category.name}
                                </h3>

                                <motion.div
                                    className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent flex-1 max-w-xs"
                                    initial={{ scaleX: 0 }}
                                    animate={isInView ? { scaleX: 1 } : {}}
                                    transition={{ duration: 1, delay: categoryIndex * 0.2 + 0.4 }}
                                />
                            </motion.div>

                            {/* Skills Grid - Properly centered */}
                            <div className="flex justify-center">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-6 w-full max-w-6xl">
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillCard
                                            key={skill.name}
                                            skill={skill}
                                            index={skillIndex}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
