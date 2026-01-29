"use client";

import { useRef, useState } from "react";
import { motion, useInView, useSpring, Variants } from "framer-motion";
import { FiGithub, FiLinkedin, FiCopy, FiCheck } from "react-icons/fi";
import { PERSONAL_INFO, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

function MagneticButton({ children, href, className = "" }: { children: React.ReactNode; href?: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    const xMotion = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const yMotion = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const content = (
        <motion.div
            style={{ x: xMotion, y: yMotion }}
            className={`relative flex items-center justify-center ${className}`}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return (
            <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className="relative inline-block">
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {content}
                </a>
            </div>
        );
    }

    return (
        <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className="relative inline-block cursor-pointer">
            {content}
        </div>
    );
}

export function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        await navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const currentYear = new Date().getFullYear();

    // Staggered animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    return (
        <section id="contact" className="relative pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8 md:pb-10 overflow-hidden" ref={ref}>
            {/* Half-transparent Background */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/5 via-transparent to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants} className="mb-5 sm:mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="text-indigo-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">Open to Opportunities</span>
                            </div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-5 md:mb-6 leading-tight px-2"
                        >
                            <span className="block">Ready to Join</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Your Team
                            </span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-zinc-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4"
                        >
                            Seeking a full-time role where I can contribute to building exceptional mobile applications and drive real impact.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4 mb-12 sm:mb-16 md:mb-20"
                        >
                            {/* Email Button (Primary) - Full width on mobile */}
                            <MagneticButton>
                                <button
                                    onClick={copyEmail}
                                    className="group relative w-full sm:w-auto min-w-[280px] sm:min-w-[320px] h-14 sm:h-16 md:h-[72px] bg-white rounded-full flex items-center justify-center gap-3 overflow-hidden transition-transform active:scale-95 shadow-2xl shadow-white/10 px-8"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                    <span className="text-zinc-900 text-base sm:text-lg md:text-xl font-bold tracking-tight group-hover:tracking-wide transition-all">
                                        {copied ? "Email Copied!" : "Get in Touch"}
                                    </span>
                                    {copied ? (
                                        <FiCheck className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                                    ) : (
                                        <FiCopy className="text-zinc-900 text-lg sm:text-xl group-hover:rotate-12 transition-transform flex-shrink-0" />
                                    )}
                                </button>
                            </MagneticButton>

                            {/* Social Icons */}
                            <div className="flex gap-4">
                                {/* LinkedIn */}
                                <MagneticButton href={SOCIAL_LINKS.linkedin}>
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300 shadow-xl">
                                        <FiLinkedin className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                </MagneticButton>

                                {/* GitHub */}
                                <MagneticButton href={SOCIAL_LINKS.github}>
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300 shadow-xl">
                                        <FiGithub className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-zinc-800/50 pt-5 sm:pt-6"
            >
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-zinc-500 text-xs sm:text-sm">
                    <p className="text-center md:text-left">© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-8 text-center">
                        <span className="hover:text-white transition-colors cursor-pointer">{PERSONAL_INFO.locationShort}</span>
                        <span className="hover:text-white transition-colors cursor-pointer hidden sm:inline">
                            Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: SITE_CONFIG.timezone })}
                        </span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}