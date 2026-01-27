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
        id: "tekrevol",
        company: "TekRevol Pakistan",
        logo: "/companies/tekrevol.png", // User needs to provide this or we use text fallback
        role: "Mobile Application Developer",
        period: "Jan 2024 - Present",
        duration: "2 yrs 1 mo", // Total duration at company or just this role? User text says "4 yrs total", "Jan 2024 - Present" for this role. I'll stick to role specific or calculate? The user text says "Jan 2024 - Present . 2 yrs 1 mo" which implies current date is 2026! Wait, my system time is 2026. Okay I will use the text provided exactly.
        location: "Karāchi, Sindh, Pakistan · On-site",
        description: "Dart, Object-Oriented Programming (OOP) and +23 skills",
        skills: ["Flutter", "Dart", "Team Management", "OOP"],
    },
    {
        id: "tekrevol-flutter",
        company: "TekRevol Pakistan",
        logo: "/companies/tekrevol.png",
        role: "Flutter Developer",
        period: "Feb 2022 - Jan 2024",
        duration: "2 yrs",
        location: "Karāchi, Sindh, Pakistan · On-site",
        description: "Team Coordination and Team Management",
        skills: ["Flutter", "Team Coordination", "Mobile Dev"],
    },
    {
        id: "odd-senior",
        company: "Odd Technologies (Private) Limited",
        logo: "/companies/odd.png",
        role: "Senior Flutter Developer",
        period: "Apr 2021 - Jan 2022",
        duration: "10 mos",
        location: "Karāchi, Sindh, Pakistan · On-site",
        description: "Team Coordination and Team Management",
        skills: ["Flutter", "Leadership", "Architecture"],
    },
    {
        id: "odd-flutter",
        company: "Odd Technologies (Private) Limited",
        logo: "/companies/odd.png",
        role: "Flutter Developer",
        period: "Mar 2020 - Apr 2021",
        duration: "1 yr 2 mos",
        location: "Karāchi, Sindh, Pakistan · On-site",
        description: "Cross-platform Development and Dart",
        skills: ["Flutter", "Dart", "Cross-platform"],
    },
    {
        id: "techrise",
        company: "TechRise",
        logo: "/companies/techrise.png",
        role: "Android Developer",
        period: "Mar 2019 - Feb 2020",
        duration: "1 yr",
        location: "Karāchi, Sindh, Pakistan",
        description: "Full-time Android Development",
        skills: ["Android", "Java", "Kotlin"],
    },
];
