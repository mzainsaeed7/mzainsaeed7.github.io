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
        id: "ict-systems",
        company: "ICT Systems Pvt Ltd",
        logo: "/companies/ict-systems.png",
        role: "Lead Flutter Developer",
        period: "May 2026 - Present",
        duration: "Current",
        location: "Pakistan · On Site",
        description: "Serving as primary Mobile Developer building and maintaining production Flutter applications with Clean Architecture and BLoC/MVVM patterns. Independently designing and developing REST APIs on ASP.NET with end-to-end ownership from API design to integration with mobile clients.",
        skills: ["Flutter", "Dart", "ASP.NET", "REST APIs", "Clean Architecture", "BLoC", "MVVM", "Team Management", "API Design"],
    },
    {
        id: "freelance",
        company: "Freelance Upwork/Fiverr",
        logo: "/companies/tekrevol.png", // User needs to provide this or we use text fallback
        role: "Full Stack  Developer",
        period: "Jan 2024 - Present",
        duration: "2 years 2 months", // Total duration at company or just this role? User text says "4 yrs total", "Jan 2024 - Present" for this role. I'll stick to role specific or calculate? Th[...]
        location: "Karāchi, Sindh, Pakistan · Remote",
        description: "I built mobile and web apps for clients on Upwork and Fiverr. I handled development and client communication from start to finish.",
        skills: ["Flutter", "Dart", "Node.js", "Express.js", "Next JS", "Laravel", "PHP", "Team Management", "OOP"],
    },
    {
        id: "ms-global",
        company: "MS Global Inc.",
        logo: "/companies/tekrevol.png", // User needs to provide this or we use text fallback
        role: "Flutter  Developer",
        period: "March 2023 - Dec 2023",
        duration: "10 months", // Total duration at company or just this role? User text says "4 yrs total", "Jan 2024 - Present" for this role. I'll stick to role specific or calculate? The user [...]
        location: "Karāchi, Sindh, Pakistan · On Site",
        description: "I worked on Flutter apps used by real users. I added features, fixed bugs, and worked with the team to deliver updates on time.",
        skills: ["Flutter", "Dart", "Team Management", "OOP"],
    },

    {
        id: "softologics",
        company: "Softologics",
        logo: "/companies/softologics.png", // User needs to provide this or we use text fallback
        role: "Android Developer",
        period: "Jan 2022 - Feb 2023",
        duration: "1 year 2 months", // Total duration at company or just this role? User text says "4 yrs total", "Jan 2024 - Present" for this role. I'll stick to role specific or calculate? The[...]
        location: "Karāchi, Sindh, Pakistan · On Site",
        description: "I built Flutter apps from requirements to final release. I focused on clean UI, reusable code, and smooth app performance.",
        skills: ["Flutter", "Dart", "Team Management", "OOP"],

    },

    {
        id: "softologics",
        company: "Softologics",
        logo: "/companies/softologics.png", // User needs to provide this or we use text fallback
        role: "Android Developer",
        period: "Jan 2021 - Jan 2022",
        duration: "1 year", // Total duration at company or just this role? User text says "4 yrs total", "Jan 2024 - Present" for this role. I'll stick to role specific or calculate? The user tex[...]
        location: "Karāchi, Sindh, Pakistan · On Site",
        description: "I developed Android apps in Java and connected them with APIs. I also improved app speed and kept the code clean.",
        skills: ["Android", "Java", "Team Management", "OOP"],
    },
];
