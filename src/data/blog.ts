export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    publishedAt: string;
    readingTime: number;
    tags: string[];
    featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: "flutter-vs-react-native-2024",
        title: "Flutter vs React Native in 2024: Which One to Choose?",
        excerpt: "A comprehensive comparison of the two leading cross-platform mobile development frameworks to help you make the right choice for your next project.",
        content: "Full article content here...",
        image: "/images/blog/flutter-rn.jpg",
        category: "Mobile Development",
        publishedAt: "2024-01-15",
        readingTime: 8,
        tags: ["Flutter", "React Native", "Mobile Development", "Cross-Platform"],
        featured: true,
    },
    {
        id: "clean-architecture-flutter",
        title: "Implementing Clean Architecture in Flutter Apps",
        excerpt: "Learn how to structure your Flutter applications using clean architecture principles for better maintainability and testability.",
        content: "Full article content here...",
        image: "/images/blog/clean-arch.jpg",
        category: "Architecture",
        publishedAt: "2024-01-08",
        readingTime: 12,
        tags: ["Flutter", "Clean Architecture", "Best Practices", "Design Patterns"],
        featured: true,
    },
    {
        id: "state-management-guide",
        title: "The Ultimate Guide to State Management in Flutter",
        excerpt: "Explore different state management solutions in Flutter including Provider, Riverpod, BLoC, and GetX with practical examples.",
        content: "Full article content here...",
        image: "/images/blog/state-mgmt.jpg",
        category: "Flutter",
        publishedAt: "2023-12-20",
        readingTime: 15,
        tags: ["Flutter", "State Management", "BLoC", "Provider", "Riverpod"],
        featured: false,
    },
    {
        id: "firebase-authentication",
        title: "Complete Firebase Authentication in Mobile Apps",
        excerpt: "Step-by-step guide to implementing secure authentication in your mobile apps using Firebase Auth with multiple providers.",
        content: "Full article content here...",
        image: "/images/blog/firebase-auth.jpg",
        category: "Backend",
        publishedAt: "2023-12-10",
        readingTime: 10,
        tags: ["Firebase", "Authentication", "Security", "Backend"],
        featured: false,
    },
    {
        id: "app-performance-optimization",
        title: "Mobile App Performance Optimization Techniques",
        excerpt: "Discover proven techniques to optimize your mobile app performance and deliver a smooth user experience.",
        content: "Full article content here...",
        image: "/images/blog/performance.jpg",
        category: "Performance",
        publishedAt: "2023-11-28",
        readingTime: 11,
        tags: ["Performance", "Optimization", "Mobile", "Best Practices"],
        featured: true,
    },
];

export const blogCategories = [
    "All",
    "Mobile Development",
    "Flutter",
    "Architecture",
    "Backend",
    "Performance",
];
