"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Github, ExternalLink, Store, AppWindow, ArrowRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/projects";

function ProjectCard({ project, index, isMobile = false }: { project: typeof projects[0]; index: number, isMobile?: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile) return;
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

    // Dynamic Gradient based on index
    const gradients = [
        "from-indigo-500 via-purple-500 to-pink-500",
        "from-cyan-500 via-blue-500 to-indigo-500",
        "from-emerald-500 via-teal-500 to-cyan-500",
        "from-orange-500 via-amber-500 to-yellow-500",
        "from-rose-500 via-pink-500 to-fuchsia-500",
        "from-violet-500 via-purple-500 to-indigo-500",
    ];
    const gradient = gradients[index % gradients.length];

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`group relative rounded-3xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/60 overflow-hidden flex flex-col ${
                isMobile ? "w-full" : "w-[380px] sm:w-[420px] lg:w-[450px]"
            } shrink-0 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500`}
        >
            {/* Glow Effect */}
            <div className={`absolute -inset-[2px] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10 rounded-3xl`} />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Project Number Badge */}
            <div className="absolute top-5 left-5 z-20">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-md border border-zinc-700/50 shadow-xl">
                    <span className="text-base font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-5 right-5 z-20">
                <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${gradient} text-white shadow-2xl border border-white/10`}>
                    {project.category}
                </div>
            </div>

            {/* Image Section */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-zinc-800">
                {project.image ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                    </div>
                ) : (
                    <>
                        {/* Mesh Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
                        
                        {/* Animated Gradient Orbs */}
                        <motion.div
                            className={`absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r ${gradient} rounded-full blur-3xl opacity-40`}
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 20, 0],
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className={`absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r ${gradient} rounded-full blur-2xl opacity-30`}
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, -20, 0],
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        />

                        {/* Fallback Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl shadow-2xl`}
                            >
                                {project.category === 'mobile' ? '📱' : project.category === 'web' ? '💻' : '⚙️'}
                            </motion.div>
                        </div>
                    </>
                )}
            </div>

            {/* Content Section */}
            <div className="relative p-6 sm:p-7 flex flex-col flex-1 bg-gradient-to-b from-zinc-900/95 to-zinc-900">
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight line-clamp-2">
                    {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                    {project.description}
                </p>

                {/* Long Description */}
                {project.longDescription && project.longDescription !== project.description && (
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-5">
                        {project.longDescription}
                    </p>
                )}

                {/* Tech Stack - Show All */}
                <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                    {project.technologies.map((tech) => (
                        <span 
                            key={tech} 
                            className="text-[11px] font-semibold text-zinc-300 bg-zinc-800/80 border border-zinc-700/50 px-3 py-1.5 rounded-full hover:bg-zinc-800 hover:border-zinc-600 hover:text-white transition-all duration-300 whitespace-nowrap"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800/50">
                    {project.playStoreUrl && (
                        <a 
                            href={project.playStoreUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-green-400 transition-colors group/link"
                        >
                            <div className="w-8 h-8 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center group-hover/link:bg-green-500/10 group-hover/link:border-green-500/50 transition-all">
                                <Store size={16} />
                            </div>
                            <span>Play Store</span>
                        </a>
                    )}
                    {project.appStoreUrl && (
                        <a 
                            href={project.appStoreUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-blue-400 transition-colors group/link"
                        >
                            <div className="w-8 h-8 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center group-hover/link:bg-blue-500/10 group-hover/link:border-blue-500/50 transition-all">
                                <AppWindow size={16} />
                            </div>
                            <span>App Store</span>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group/link"
                        >
                            <div className="w-8 h-8 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center group-hover/link:bg-zinc-700/50 group-hover/link:border-zinc-600 transition-all">
                                <Github size={16} />
                            </div>
                            <span>Code</span>
                        </a>
                    )}
                    {project.liveUrl && (
                        <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-indigo-400 transition-colors group/link"
                        >
                            <div className="w-8 h-8 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center group-hover/link:bg-indigo-500/10 group-hover/link:border-indigo-500/50 transition-all">
                                <ExternalLink size={16} />
                            </div>
                            <span>Live</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function ProjectsSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0.1, 0.9], ["5%", "-95%"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="projects" className="relative">
            {/* DESKTOP: Horizontal Scroll */}
            <div ref={targetRef} className="hidden lg:block h-[300vh] relative">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    {/* Background - Half Transparent */}
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/5 via-transparent to-transparent" />
                    
                    {/* Floating Header - Behind cards with proper z-index */}
                    <motion.div 
                        style={{ opacity: headerOpacity, y: headerY }} 
                        className="absolute top-24 left-12 z-0 max-w-md pointer-events-none"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Portfolio</span>
                            </div>
                            
                            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
                                <span className="block text-white mb-1">Featured</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                    Projects
                                </span>
                            </h2>
                            
                            <p className="text-zinc-400 text-base lg:text-lg leading-relaxed mb-6">
                                Explore my work — from mobile apps to web platforms
                            </p>

                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <ArrowRight size={16} />
                                <span>Scroll to browse</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Projects Scroll Container - Higher z-index */}
                    <motion.div 
                        style={{ x }} 
                        className="flex gap-8 pl-[45%] relative z-10"
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                        
                        {/* End Spacer */}
                        <div className="w-[45vw] shrink-0" />
                    </motion.div>
                </div>
            </div>

            {/* MOBILE/TABLET: Vertical Stack */}
            <div className="lg:hidden py-16 sm:py-20 px-4 sm:px-6 relative">
                {/* Semi-transparent background for mobile */}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/5 via-transparent to-transparent" />
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-12 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Portfolio</span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="block text-white mb-1">Featured</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Projects
                        </span>
                    </h2>
                    
                    <p className="text-zinc-400 text-base">
                        Explore my work — from mobile apps to web platforms
                    </p>
                </div>

                    {/* Projects Grid */}
                    <div className="space-y-8 max-w-2xl mx-auto">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProjectCard project={project} index={index} isMobile={true} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}