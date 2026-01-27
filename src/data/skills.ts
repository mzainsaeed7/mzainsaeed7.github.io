export interface Skill {
    name: string;
    level: number; // 0-100
    icon: string;
    image?: string; // Path to image in public folder (e.g., "/skills/flutter.svg")
}

export interface SkillCategory {
    name: string;
    id: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        name: "Mobile",
        id: "mobile",
        skills: [
            { name: "Flutter", level: 95, icon: "flutter", image: "/skills/flutter.png" },
            { name: "React Native", level: 85, icon: "react", image: "/skills/react.svg" }, // Assuming react.svg is still there or need to check
            { name: "Kotlin", level: 80, icon: "kotlin", image: "/skills/kotlin.png" },
            { name: "Swift", level: 70, icon: "swift", image: "/skills/swift.svg" },
            { name: "Android SDK", level: 90, icon: "android", image: "/skills/android_studio.png" },
            { name: "iOS Development", level: 75, icon: "apple", image: "/skills/ios.webp" },
        ],
    },
    {
        name: "Backend",
        id: "backend",
        skills: [
            { name: "Node.js", level: 80, icon: "nodejs", image: "/skills/nodejs.webp" },
            { name: "Express.js", level: 75, icon: "express", image: "/skills/nodejs.webp" }, // Reusing nodejs for express if no specific icon
            { name: "MongoDB", level: 70, icon: "mongodb", image: "/skills/mongodb.png" },
            { name: "PostgreSQL", level: 65, icon: "postgresql", image: "/skills/postgresql.webp" },
            { name: "REST APIs", level: 85, icon: "api", image: "/skills/rest_api.png" },
            { name: "Firebase", level: 90, icon: "firebase", image: "/skills/firebase.png" },
        ],
    },
    {
        name: "Web",
        id: "web",
        skills: [
            { name: "React", level: 85, icon: "react", image: "/skills/react.svg" },
            { name: "Next.js", level: 80, icon: "nextjs", image: "/skills/nextjs.png" },
            { name: "TypeScript", level: 85, icon: "typescript", image: "/skills/typescript.png" },
            { name: "Tailwind CSS", level: 90, icon: "tailwind", image: "/skills/tailwindcss.png" },
            { name: "HTML/CSS", level: 95, icon: "html", image: "/skills/vscode.png" }, // Fallback or incorrect mapping? Maybe use vscode for now as generic code
            { name: "JavaScript", level: 90, icon: "javascript", image: "/skills/javascript.webp" },
        ],
    },
    {
        name: "Tools",
        id: "tools",
        skills: [
            { name: "Git", level: 90, icon: "git", image: "/skills/github.png" },
            { name: "VS Code", level: 95, icon: "vscode", image: "/skills/vscode.png" },
            { name: "Figma", level: 75, icon: "figma", image: "/skills/figma.svg" }, // Assuming figma.svg exists or check
            { name: "Docker", level: 60, icon: "docker", image: "/skills/docker.svg" }, // Assuming docker.svg exists
            { name: "Android Studio", level: 90, icon: "android", image: "/skills/android_studio.png" },
            { name: "Xcode", level: 70, icon: "xcode", image: "/skills/ios.webp" }, // Reusing iOS for Xcode
            { name: "Jira", level: 85, icon: "jira", image: "/skills/jira.png" }, // New
            { name: "Trello", level: 90, icon: "trello", image: "/skills/trello.webp" }, // New
            { name: "Slack", level: 90, icon: "slack", image: "/skills/slack.webp" }, // New
            { name: "n8n", level: 60, icon: "n8n", image: "/skills/n8n.png" }, // New
        ],
    },
];
