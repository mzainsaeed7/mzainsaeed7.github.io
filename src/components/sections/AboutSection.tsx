"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Sparkles } from "lucide-react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/constants";

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative min-h-screen py-16 sm:py-20 md:py-24 overflow-hidden flex items-center"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950/50 to-zinc-950/80" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    style={{ opacity }}
                    className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center"
                >
                    {/* Left Side - Image */}
                    <div className="relative order-1 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: "-100px" }}
                            style={{ y }}
                            className="relative z-10"
                        >
                            <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl group">
                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent z-20" />
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                                {/* Image */}
                                <Image
                                    src="/zain.png"
                                    alt="Zain - Mobile App Developer"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    priority
                                />

                                {/* Hover Shine Effect */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-30"
                                    style={{
                                        background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                                    }}
                                    animate={{
                                        x: ['-100%', '200%'],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -top-8 sm:-top-12 -left-8 sm:-left-12 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-8 sm:-bottom-12 -right-8 sm:-right-12 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-6 sm:space-y-8 order-2 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className="text-xs sm:text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-3 flex items-center gap-2"
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                                About Me
                            </motion.h2>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                Ready to contribute to{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 inline-block">
                                    your team&apos;s success
                                </span>
                            </h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-4 sm:space-y-6 text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed"
                        >
                            <p className="relative pl-4 border-l-2 border-indigo-500/30">
                                {PERSONAL_INFO.bio}
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {['Flutter', 'React', 'Node.js', 'TypeScript', 'Firebase'].map((tech, index) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900/50 border border-zinc-800/50 rounded-full text-xs sm:text-sm text-zinc-300 hover:border-indigo-500/30 hover:text-indigo-400 transition-all cursor-default"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Action Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm sm:text-base"
                            >
                                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                                Let&apos;s Chat
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}