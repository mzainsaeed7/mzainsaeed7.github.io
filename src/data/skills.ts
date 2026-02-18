export interface Skill {
    name: string;
    level: number;
    icon: string;
    image?: string;
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
            { name: "Dart", level: 95, icon: "dart", image: "/skills/dart.png" },
            { name: "Android SDK", level: 70, icon: "android", image: "/skills/android_studio.png" },
            { name: "Kotlin", level: 40, icon: "kotlin", image: "/skills/kotlin.png" },
            { name: "Java", level: 50, icon: "java", image: "/skills/java.webp" }
        ],
    },
    {
        name: "Backend",
        id: "backend",
        skills: [
            { name: "Node.js", level: 50, icon: "nodejs", image: "/skills/nodejs.webp" },
            { name: "Express.js", level: 50, icon: "express", image: "/skills/expressjs.png" },
            { name: "MongoDB", level: 60, icon: "mongodb", image: "/skills/mongodb.png" },
            { name: "PostgreSQL", level: 65, icon: "postgresql", image: "/skills/postgresql.webp" },
            { name: "REST APIs", level: 85, icon: "api", image: "/skills/rest_api.png" },
            { name: "Firebase", level: 90, icon: "firebase", image: "/skills/firebase.png" },
        ],
    },
    {
        name: "Web",
        id: "web",
        skills: [
            { name: "React", level: 45, icon: "react", image: "/skills/react.png" },
            { name: "Next.js", level: 50, icon: "nextjs", image: "/skills/nextjs.png" },
            { name: "TypeScript", level: 45, icon: "typescript", image: "/skills/typescript.png" },
            { name: "Tailwind CSS", level: 40, icon: "tailwind", image: "/skills/tailwindcss.png" },
            { name: "HTML/CSS", level: 95, icon: "html", image: "/skills/vscode.png" },
            { name: "JavaScript", level: 60, icon: "javascript", image: "/skills/javascript.webp" },
        ],
    },
    {
        name: "Tools",
        id: "tools",
        skills: [
            { name: "Git", level: 80, icon: "git", image: "/skills/github.png" },
            { name: "VS Code", level: 85, icon: "vscode", image: "/skills/vscode.png" },
            { name: "Docker", level: 50, icon: "docker", image: "/skills/docker.png" },
            { name: "Android Studio", level: 90, icon: "android", image: "/skills/android_studio.png" },
            { name: "Jira", level: 55, icon: "jira", image: "/skills/jira.png" },
            { name: "Trello", level: 90, icon: "trello", image: "/skills/trello.webp" },
            { name: "Slack", level: 80, icon: "slack", image: "/skills/slack.png" },
            { name: "n8n", level: 40, icon: "n8n", image: "/skills/n8n.png" },
        ],
    },
];
