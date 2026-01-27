"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Github, Linkedin, Mail, ArrowDown, ExternalLink, Terminal } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { PERSONAL_INFO } from "@/lib/constants";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const codeLines = [
    `class Developer {`,
    `  final String name = 'Muhammad Zain';`,
    `  final String role = 'Mobile App Developer';`,
    ``,
    `  // Primary: Mobile Development`,
    `  final List<String> mobileStack = [`,
    `    'Flutter', 'Dart',`,
    `    'Android', 'iOS'`,
    `  ];`,
    ``,
    `  // Secondary: Full Stack`,
    `  final List<String> webStack = [`,
    `    'Node.js', 'Express',`,
    `    'React', 'Next.js'`,
    `  ];`,
    `}`
  ];

  // Simple and reliable typewriter effect
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const animationRef = useRef<{ lineIndex: number; charIndex: number }>({ lineIndex: 0, charIndex: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state
    const emptyLines = codeLines.map(() => "");
    setDisplayedCode(emptyLines);
    animationRef.current = { lineIndex: 0, charIndex: 0 };

    const animate = () => {
      const { lineIndex, charIndex } = animationRef.current;

      // Check if we're done
      if (lineIndex >= codeLines.length) {
        return;
      }

      const currentLine = codeLines[lineIndex];

      // Type character by character
      if (charIndex < currentLine.length) {
        setDisplayedCode(prev => {
          const updated = [...prev];
          updated[lineIndex] = currentLine.substring(0, charIndex + 1);
          return updated;
        });

        animationRef.current.charIndex++;
        timeoutRef.current = setTimeout(animate, 10); // 30ms per character
      } else {
        // Move to next line
        animationRef.current.lineIndex++;
        animationRef.current.charIndex = 0;
        timeoutRef.current = setTimeout(animate, 30); // 100ms pause between lines
      }
    };

    // Start animation after short delay
    timeoutRef.current = setTimeout(animate, 800);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Syntax highlighting function
  const highlightSyntax = (line: string) => {
    if (!line || line.trim() === "") {
      return <span>&nbsp;</span>;
    }

    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < line.length) {
      // Comments
      if (line[i] === '/' && line[i + 1] === '/') {
        elements.push(
          <span key={i} className="text-zinc-500 italic">
            {line.substring(i)}
          </span>
        );
        break;
      }

      // Strings with quotes
      if (line[i] === "'" || line[i] === '"') {
        const quote = line[i];
        let str = quote;
        i++;
        while (i < line.length && line[i] !== quote) {
          str += line[i];
          i++;
        }
        if (i < line.length) {
          str += line[i];
          i++;
        }
        elements.push(
          <span key={elements.length} className="text-green-400">
            {str}
          </span>
        );
        continue;
      }

      // Whitespace
      if (line[i] === ' ') {
        let spaces = '';
        while (i < line.length && line[i] === ' ') {
          spaces += ' ';
          i++;
        }
        elements.push(<span key={elements.length}>{spaces}</span>);
        continue;
      }

      // Brackets
      if (line[i] === '[' || line[i] === ']') {
        elements.push(
          <span key={elements.length} className="text-orange-400">
            {line[i]}
          </span>
        );
        i++;
        continue;
      }

      // Braces and symbols
      if (['{', '}', '(', ')', '=', ';', ',', ':'].includes(line[i])) {
        elements.push(
          <span key={elements.length} className="text-zinc-300">
            {line[i]}
          </span>
        );
        i++;
        continue;
      }

      // Words (keywords, types, identifiers)
      if (/[a-zA-Z_]/.test(line[i])) {
        let word = '';
        while (i < line.length && /[a-zA-Z0-9_]/.test(line[i])) {
          word += line[i];
          i++;
        }

        let className = 'text-zinc-300';
        if (['class', 'final', 'const', 'var', 'return', 'void'].includes(word)) {
          className = 'text-purple-400 font-medium';
        } else if (['String', 'List', 'int', 'bool', 'Future'].includes(word)) {
          className = 'text-yellow-400';
        } else if (word === 'Developer') {
          className = 'text-blue-400 font-medium';
        }

        elements.push(
          <span key={elements.length} className={className}>
            {word}
          </span>
        );
        continue;
      }

      // Default
      elements.push(<span key={elements.length}>{line[i]}</span>);
      i++;
    }

    return <>{elements}</>;
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center overflow-hidden selection:bg-indigo-500/30 py-16 sm:py-20 md:py-24 lg:py-0">
      {/* Dynamic Background Elements */}
      <HeroCanvas />

      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 z-0 pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full"
      >
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 items-center max-w-7xl mx-auto">

          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Status Badge */}
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 hover:border-indigo-500/30 transition-colors cursor-default text-xs sm:text-sm"
            >
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-500"></span>
              </span>
              <span className="font-medium text-zinc-300 tracking-wide">
                <span className="hidden sm:inline">Available for new opportunities</span>
                <span className="sm:hidden">Available for work</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-400"
                >
                  Hello, I&apos;m
                </motion.h2>
              </div>

              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9] flex flex-wrap gap-x-2 sm:gap-x-4">
                  {PERSONAL_INFO.name.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-flex overflow-hidden"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {word.split("").map((char, j) => (
                        <motion.span
                          key={j}
                          variants={{
                            hidden: { y: "100%", rotateX: 90, opacity: 0 },
                            visible: {
                              y: 0,
                              rotateX: 0,
                              opacity: 1,
                              transition: {
                                type: "spring",
                                damping: 12,
                                stiffness: 100,
                              }
                            }
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  ))}
                </h1>
              </div>

              <div className="pt-3 sm:pt-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                  className="h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-full sm:max-w-[710px]"
                />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-3 sm:mt-4"
                >
                  Mobile App Developer
                </motion.span>
              </div>
            </div>

            {/* Description */}
            <motion.p 
              variants={fadeInUp} 
              className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed pt-2 sm:pt-4"
            >
              Building <span className="text-white font-semibold">polished mobile apps</span> and <span className="text-white font-semibold">scalable web solutions</span>.
              Open to full-time opportunities.
            </motion.p>

            {/* Mobile Code Block - Compact Version (Above Buttons) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="lg:hidden pt-4"
            >
              <div className="relative bg-zinc-950/60 backdrop-blur-sm rounded-lg border border-zinc-800/50 shadow-xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/50 border-b border-zinc-800/50">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                    <Terminal className="w-2.5 h-2.5" />
                    developer.dart
                  </div>
                </div>

                {/* Compact Code Content */}
                <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">1</span>
                    <div className="text-zinc-300">
                      <span className="text-purple-400 font-medium">class</span>{" "}
                      <span className="text-blue-400 font-medium">Developer</span> {"{"}
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">2</span>
                    <div className="text-zinc-300 pl-3 sm:pl-4">
                      <span className="text-purple-400 font-medium">final</span>{" "}
                      <span className="text-yellow-400">String</span> name = <span className="text-green-400">&apos;Muhammad Zain&apos;</span>;
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">3</span>
                    <div className="text-zinc-300 pl-3 sm:pl-4">
                      <span className="text-purple-400 font-medium">final</span>{" "}
                      <span className="text-yellow-400">String</span> role = <span className="text-green-400">&apos;Mobile Developer&apos;</span>;
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">4</span>
                    <div className="text-transparent">.</div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">5</span>
                    <div className="text-zinc-500 italic pl-3 sm:pl-4">// Tech Stack</div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">6</span>
                    <div className="text-zinc-300 pl-3 sm:pl-4">
                      <span className="text-purple-400 font-medium">final</span>{" "}
                      <span className="text-yellow-400">List</span> stack = <span className="text-orange-400">[</span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">7</span>
                    <div className="text-zinc-300 pl-6 sm:pl-8">
                      <span className="text-green-400">&apos;Flutter&apos;</span>, <span className="text-green-400">&apos;React&apos;</span>, <span className="text-green-400">&apos;Node.js&apos;</span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">8</span>
                    <div className="text-zinc-300 pl-3 sm:pl-4">
                      <span className="text-orange-400">]</span>;
                    </div>
                  </div>
                  <div className="flex">
                    <span className="text-zinc-700 select-none pr-2 sm:pr-3 text-right w-5 sm:w-6 flex-shrink-0">9</span>
                    <div className="text-zinc-300">{"}"}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
              variants={fadeInUp} 
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 pt-4 sm:pt-8"
            >
              <a
                href="#projects"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform active:scale-95 shadow-lg shadow-white/10 text-center text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                  View Work <ExternalLink className="w-4 h-4" />
                </span>
              </a>

              <a
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-semibold hover:bg-zinc-800 transition-colors active:scale-95 text-center text-sm sm:text-base"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              variants={fadeInUp} 
              className="flex items-center gap-5 sm:gap-6 text-zinc-500 pt-4 sm:pt-8"
            >
              <a 
                href="https://github.com/mzainsaeed7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/zain-saeed-8073563a8/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a 
                href="mailto:zainsaeed761@gmail.com" 
                className="hover:text-white transition-colors"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Code Block (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block lg:col-span-5 relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

            <div className="relative bg-zinc-950 rounded-xl border border-zinc-800/50 shadow-2xl overflow-hidden w-full max-w-lg mx-auto">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <Terminal className="w-3 h-3" />
                  developer.dart
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed min-h-[420px]">
                {codeLines.map((_, lineIndex) => (
                  <div key={lineIndex} className="flex">
                    <span className="text-zinc-700 select-none pr-4 text-right w-8 flex-shrink-0">
                      {lineIndex + 1}
                    </span>
                    <div className="flex-1 whitespace-pre">
                      {displayedCode[lineIndex] ? (
                        highlightSyntax(displayedCode[lineIndex])
                      ) : (
                        <span className="text-transparent">.</span>
                      )}
                    </div>
                  </div>
                ))}
                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block w-2 h-4 bg-indigo-500 ml-1 align-text-bottom"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 z-10"
      >
        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}