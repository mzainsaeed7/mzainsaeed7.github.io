"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { HiMenuAlt3, HiX, HiHome, HiUser, HiLightningBolt, HiCode, HiMail, HiDocumentText } from "react-icons/hi";

const navLinks = [
    { href: "#home", label: "Home", icon: HiHome },
    { href: "#about", label: "About", icon: HiUser },
    { href: "#skills", label: "Skills", icon: HiLightningBolt },
    { href: "#projects", label: "Projects", icon: HiCode },
    { href: "#experience", label: "Journey", icon: HiDocumentText }, // Added Experience Icon
    { href: "#contact", label: "Contact", icon: HiMail },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Auto-detect active section
            const sections = navLinks.map(link => link.href.substring(1));
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= -100 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(id.substring(1));
        }
    };

    return (
        <>
            {/* DESKTOP: Floating Dock Island */}
            <motion.div
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 p-2 rounded-full border transition-all duration-300 ${isScrolled
                    ? "bg-zinc-900/80 border-zinc-800 backdrop-blur-xl shadow-2xl shadow-black/50"
                    : "bg-zinc-900/50 border-zinc-800/50 backdrop-blur-md"
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
            >
                {/* Navigation Items */}
                <div className="flex items-center gap-1 rounded-full bg-zinc-950/50 p-1 border border-zinc-800/50">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <button
                                key={link.href}
                                onClick={() => scrollTo(link.href)}
                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-zinc-800 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {/* Icon only shows on hover or active to keep it clean, or maybe always text? User wants "Hat k". Let's show clean text. */}
                                    {link.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Separator */}
                <div className="w-px h-6 bg-zinc-800 mx-2" />

                {/* Actions */}
                <div className="flex items-center gap-2 pr-2">
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo('#contact');
                        }}
                        className="px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-95"
                    >
                        Contact Me
                    </a>
                </div>
            </motion.div>

            {/* MOBILE: Top Bar with Menu */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
                {/* Empty left side to balance */}
                <div className="w-10" />

                {/* Center Island for Mobile? A bit tight. Just a clean menu button on right. */}

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white shadow-lg"
                    >
                        <HiMenuAlt3 size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Full Screen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400"
                        >
                            <HiX size={24} />
                        </button>

                        <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollTo(link.href)}
                                    className={`w-full p-4 rounded-2xl border flex items-center gap-4 text-lg font-medium transition-all ${activeSection === link.href.substring(1)
                                        ? "bg-zinc-800 border-indigo-500/50 text-white"
                                        : "bg-zinc-900/50 border-zinc-800 text-zinc-400"
                                        }`}
                                >
                                    <link.icon className={`w-6 h-6 ${activeSection === link.href.substring(1) ? "text-indigo-400" : ""}`} />
                                    {link.label}
                                </motion.button>
                            ))}


                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
