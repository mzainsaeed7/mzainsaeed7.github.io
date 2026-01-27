export interface Experience {
    id: string;
    company: string;
    logo: string; // We'll use text or generic icon if logo image not available
    role: string;
    period: string;
    duration: string;
    location: string;
    description: string;
    skills: string[];
}

export const experiences: Experience[] = [
    {
        id: "freelance",
        company: "Freelance Upwork/Fiverr",
        logo: "/companies/tekrevol.png", // User needs to provide this or we use text fallback
        role: "Full Stack Developer",
        period: "Jan 2022 - Present",
        duration: "4 yrs 1 mo", // Total duration at company or just this role? User text says "4 yrs total", "Jan 2024 - Present" for this role. I'll stick to role specific or calculate? The user text says "Jan 2024 - Present . 2 yrs 1 mo" which implies current date is 2026! Wait, my system time is 2026. Okay I will use the text provided exactly.
        location: "Karāchi, Sindh, Pakistan · On-site",
        description: "Full Stack Developer with expertise in Flutter, Dart, Node.js, TypeScript, Next.js Turbo, Express, PostgreSQL, Redis, JWT, REST API, Deployment",
        skills: ["Flutter", "Dart", "Node.js", "TypeScript", "Next.js Turbo", "Express", "PostgreSQL", "Redis", "JWT", "REST API", "Deployment"],
    },
    {
        id: "ms-pakistan",
        company: "MS Pakistan",
        logo: "/companies/ms_pakistan.png",
        role: "Flutter Developer",
        period: "Jan 2021 - Dec 2021",
        duration: "1 yr",
        location: "Karāchi, Sindh, Pakistan · On-site",
        description: "Flutter Developer with expertise in Flutter, Dart, and Object-Oriented Programming (OOP)",
        skills: ["Flutter", "Dart", "Object-Oriented Programming (OOP)", "Mobile Dev"],
    },
    {
        id: "softologics",
        company: "Softologics",
        logo: "/companies/softologics.png",
        role: "Android Developer (Java)",
        period: "Jan 2020 - Dec 2020",
        duration: "1 yr",
        location: "Karāchi, Sindh, Pakistan · On-site",
        description: "Android Developer with expertise in Android, Java,  in Native Android Development",
        skills: ["Android", "Java", "Native Android Development", "Mobile Dev"],
    }
];