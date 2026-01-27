export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    category: "mobile" | "web" | "backend";
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: "insight-guard-app",
        title: "Insight Guard App",
        description: "Community Safety & Security Partner Application (Apps Available in SA)",
        longDescription: "All-in-one platform empowering residents and security companies with a digital incident logbook, real-time alerts, and AI-driven intelligence — all from a single, easy-to-use mobile app.",
        image: "/projects/insight_guard.png",
        category: "mobile",
        technologies: ["Flutter", "Dart", "Model Training", "Fine Tuning", "Firebase", "REST API", "Deployment"],
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.app.insight_guard",
        appStoreUrl: "https://apps.apple.com/us/app/insight-guard/id6744703439",
        liveUrl: "https://insightguard.co.za",
        featured: true,
    },
    {
        id: "autogen-mind",
        title: "AutoGen Mind",
        description: "Automate Your Blogs & Social Media with AI",
        longDescription: "Let AI write, style, and publish stunning blog posts and social content automatically. One platform for WordPress, Instagram, and Facebook.",
        image: "/projects/autogen_mind.png",
        category: "web",
        technologies: ["Node.js", "TypeScript","Next.js Turbo", "Express", "PostgreSQL", "Redis",  "JWT", "REST API", "Deployment" ],
        liveUrl: "https://autogenmind.softosync.com/",
        featured: true,
    },
    {
        id: "mind-mesh",
        title: "MindMesh Ai App",
        description: "Mind Mash Personal Ai Assistant app developed using Flutter and Firebase",
        longDescription: "MindMesh, your ultimate chatbot companion designed to enhance your daily interactions and provide valuable assistance. Whether you're seeking information, a helpful reminder, or just engaging in friendly conversation, MindMesh is here for you. MindMesh is more than just a chatbot; it's a versatile tool for exploration and engagement. Discover a wealth of knowledge on various topics, from science and technology to history and lifestyle. Ask questions, get answers, and delve into conversations that spark curiosity.",
        image: "/projects/mind_mesh.webp",
        category: "mobile",
        technologies: ["Flutter", "Dart", "Firebase", "Playstore Subscriptions", "App Store Subscriptions", "Google Sign In", "REST API", "Deployment"],
        featured: false,
    },
    {
        id: "wedissect",
        title: "WeDissect",
        description: "WeDissect - Advanced AI Powered KYC System, Advanced AI-Powered KYC & Screening System",
        longDescription: "WeDissect is a cutting-edge KYC (Know Your Customer) solution designed to streamline identity verification and risk assessment for both individuals and businesses. Built with Laravel, PHP, and MySQL, this powerful system leverages AI-driven analysis to enhance security, compliance, and fraud detection. WeDissect is built for organizations that require a seamless, automated, and reliable way to verify identities, prevent fraud, and comply with regulatory requirements. ",
        image: "/projects/wedissect.webp",
        category: "web",
        technologies: ["Laravel", "PHP", "MySQL", "AI", "Stripe", "Socket.io", "JWT", "REST API", "Deployment"],
        liveUrl: "https://wedissect.com",
        featured: true,
    },
    {
        id: "socratic-story",
        title: "Socratic Story AI App",
        description: "I created A App Socratic Story, To generate Fictional Stories. It helps people to think and develop new ideas for stories. its used Artificial Intelligence  to help peoples.",
        longDescription: "I created A App Socratic Story, To generate Fictional Stories. It helps people to think and develop new ideas for stories. its used Artificial Intelligence  to help peoples.",
        image: "/projects/socratic_story.webp",
        category: "mobile",
        technologies: ["Flutter", "Dart", "Firebase", "Playstore Subscriptions", "App Store Subscriptions", "Google Sign In", "REST API", "Deployment"],
        featured: false,
    },
    
 
];

export const projectCategories = [
    { id: "all", label: "All Projects" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "web", label: "Web Apps" },
    { id: "backend", label: "Backend" },
];
