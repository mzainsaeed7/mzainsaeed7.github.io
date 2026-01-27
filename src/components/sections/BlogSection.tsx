"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FiClock, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

function BlogCard({
    post,
    index,
    featured = false
}: {
    post: typeof blogPosts[0];
    index: number;
    featured?: boolean;
}) {
    return (
        <motion.article
            className={`group relative ${featured ? "md:col-span-2" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
        >
            <Link href={`/blog/${post.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl glass-card h-full">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                            📝
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-white">
                                {post.category}
                            </span>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-foreground-muted mb-3">
                            <span>{new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            })}</span>
                            <span className="flex items-center gap-1">
                                <FiClock size={14} />
                                {post.readingTime} min read
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-xs rounded-md bg-glass-bg border border-glass-border text-foreground-muted"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Read More */}
                        <motion.div
                            className="flex items-center gap-2 text-primary font-medium"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                        >
                            Read Article
                            <FiArrowRight size={16} />
                        </motion.div>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                </div>
            </Link>
        </motion.article>
    );
}

export function BlogSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

    return (
        <section id="blog" className="section" ref={ref}>
            {/* Background Elements */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-4">
                        Blog
                    </span>
                    <h2 className="section-title">
                        Latest <span className="gradient-text">Articles</span>
                    </h2>
                    <p className="section-subtitle">
                        Thoughts, tutorials, and insights about mobile development and technology
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPosts.map((post, index) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            index={index}
                            featured={index === 0}
                        />
                    ))}
                </div>

                {/* View All Posts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <motion.a
                        href="/blog"
                        className="btn-secondary inline-flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Articles
                        <FiArrowRight size={18} />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
