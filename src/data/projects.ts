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
        id: "fitness-tracker",
        title: "Fitness Tracking App",
        description: "Health and fitness tracking app with workout plans, progress analytics, and social features.",
        longDescription: "Developed a fitness tracking application that allows users to log workouts, track calories, monitor progress with beautiful charts, and compete with friends. Integrated with wearable devices for real-time data sync.",
        image: "/images/projects/fitness.jpg",
        category: "mobile",
        technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "HealthKit"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
    },
    {
        id: "food-delivery",
        title: "Food Delivery Platform",
        description: "Complete food delivery ecosystem with customer app, restaurant dashboard, and driver app.",
        longDescription: "Created a full food delivery platform including a customer-facing app for ordering, a restaurant management dashboard, and a driver app for deliveries. Features real-time tracking, chat support, and multiple payment options.",
        image: "/images/projects/food.jpg",
        category: "mobile",
        technologies: ["Flutter", "Firebase", "Google Maps", "Razorpay", "Socket.io"],
        playStoreUrl: "https://play.google.com",
        appStoreUrl: "https://apps.apple.com",
        featured: true,
    },
    {
        id: "task-management",
        title: "Task Management Dashboard",
        description: "Modern task management web app with drag-and-drop, team collaboration, and analytics.",
        longDescription: "Built a responsive task management dashboard with Kanban boards, team collaboration features, deadline tracking, and productivity analytics. Supports real-time updates and integrations with popular tools.",
        image: "/images/projects/tasks.jpg",
        category: "web",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: false,
    },
    {
        id: "social-media-api",
        title: "Social Media API",
        description: "Scalable RESTful API for a social media platform with real-time messaging.",
        longDescription: "Designed and implemented a robust backend API for a social media platform supporting user authentication, posts, comments, likes, follows, and real-time messaging using WebSockets.",
        image: "/images/projects/api.jpg",
        category: "backend",
        technologies: ["Node.js", "Express", "MongoDB", "Redis", "Socket.io", "JWT"],
        githubUrl: "https://github.com",
        featured: false,
    },
    {
        id: "banking-app",
        title: "Digital Banking App",
        description: "Secure mobile banking app with biometric authentication and instant transfers.",
        longDescription: "Developed a secure digital banking application featuring account management, fund transfers, bill payments, transaction history, and spending insights. Implemented advanced security measures including biometric authentication and encryption.",
        image: "/images/projects/banking.jpg",
        category: "mobile",
        technologies: ["Kotlin", "Jetpack Compose", "Retrofit", "Room DB", "Biometric API"],
        featured: true,
    },
];

export const projectCategories = [
    { id: "all", label: "All Projects" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "web", label: "Web Apps" },
    { id: "backend", label: "Backend" },
];
