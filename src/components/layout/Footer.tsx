"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

const footerLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
];

const socialLinks = [
    { href: SOCIAL_LINKS.github, icon: FiGithub, label: "GitHub" },
    { href: SOCIAL_LINKS.linkedin, icon: FiLinkedin, label: "LinkedIn" },
    { href: SOCIAL_LINKS.email, icon: FiMail, label: "Email" },
];

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border">
            <div className="container py-16">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-xl font-semibold text-text-primary">
                            Portfolio
                        </Link>
                        <p className="mt-4 text-text-secondary text-sm max-w-xs">
                            Building exceptional mobile experiences with passion and precision.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-medium text-text-primary mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-sm font-medium text-text-primary mb-4">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
                                    whileHover={{ y: -2 }}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-sm">
                        © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm"
                        whileHover={{ y: -2 }}
                    >
                        Back to Top
                        <FiArrowUp size={14} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
