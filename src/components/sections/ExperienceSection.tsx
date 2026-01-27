"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { experiences } from "@/data/experience";
import { Briefcase, Calendar, MapPin } from "lucide-react";

function ExperienceCard({ experience, index, isLeft }: { experience: typeof experiences[0]; index: number; isLeft: boolean }) {
    return (
        <div className={`relative mb-12 md:mb-24 flex w-full ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
            {/* Timeline Dot (Center) - visible on Desktop */}
            <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                className="absolute left-8 md:left-1/2 w-5 h-5 -ml-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-black z-20 shadow-[0_0_30px_rgba(99,102,241,0.8)] hidden md:block"
            >
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-75" />
            </motion.div>

            {/* Mobile Line Dot - with animation */}
            <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                className="absolute left-0 w-5 h-5 -ml-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-black z-20 shadow-[0_0_30px_rgba(99,102,241,0.8)] md:hidden top-8"
            >
                <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-75" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50, x: 0 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative w-full md:w-[48%] pl-8 md:pl-0 ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
            >
                <div className="group relative">
                    {/* Glow Effect on Hover */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />
                    
                    {/* Card Container - Optimized padding */}
                    <div className="relative p-6 sm:p-7 md:p-8 rounded-3xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/50 hover:bg-zinc-900/90 hover:border-zinc-700 transition-all duration-500 overflow-hidden">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
                        </div>

                        {/* Content - No extra padding needed now */}
                        <div className={`flex flex-col gap-2.5 sm:gap-3 mb-5 sm:mb-6 relative z-10 ${isLeft ? "md:items-end" : "md:items-start"}`}>
                            {/* Role */}
                            <motion.h3 
                                className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300 leading-tight"
                                whileHover={{ scale: 1.02 }}
                            >
                                {experience.role}
                            </motion.h3>

                            {/* Company, Duration & Period - All in one line */}
                            <div className={`flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 text-sm md:text-base ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex items-center gap-2 text-zinc-300 font-semibold group-hover:text-white transition-colors">
                                    <Briefcase size={16} className="text-indigo-400 flex-shrink-0" />
                                    <span>{experience.company}</span>
                                </div>
                                <span className="hidden sm:inline text-zinc-600">•</span>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <MapPin size={14} className="text-zinc-500 flex-shrink-0" />
                                    <span>{experience.duration}</span>
                                </div>
                                <span className="hidden sm:inline text-zinc-600">•</span>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm">
                                    <Calendar size={12} className="text-indigo-400" />
                                    <span className="text-[11px] sm:text-xs font-bold text-indigo-300 whitespace-nowrap">{experience.period}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed relative z-10 group-hover:text-zinc-300 transition-colors mb-5 sm:mb-6">
                            {experience.description}
                        </p>

                        {/* Skills */}
                        <div className={`flex flex-wrap gap-2 relative z-10 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                            {experience.skills.map((skill, skillIndex) => (
                                <motion.span 
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:border-indigo-500/50 hover:text-white transition-all duration-300 cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>

                        {/* Decorative Corner Accent */}
                        <div className={`absolute bottom-0 ${isLeft ? 'md:left-0' : 'md:right-0'} right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
            {/* Semi-transparent Background */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/5 via-transparent to-transparent" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 sm:mb-20 md:mb-24"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Career Path</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                        <span className="block text-white mb-1">Professional</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Journey
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto"
                    >
                        My career timeline and professional growth
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800/50 hidden md:block -translate-x-1/2" />
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden md:block -translate-x-1/2 origin-top shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        style={{ scaleY }}
                    />

                    {/* Side Line (Mobile) */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800/50 md:hidden ml-[7px]" />
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 md:hidden ml-[7px] origin-top shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        style={{ scaleY }}
                    />

                    {/* Experience Cards */}
                    <div className="space-y-0">
                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={experience.id}
                                experience={experience}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}