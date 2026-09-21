export const profile = {
  name: "Dipesh Biswa",
  email: "DB4048@g.rit.edu",
  github: "https://github.com/DipeshBiswa",
  linkedin: "https://www.linkedin.com/in/dipesh-biswa/",
  introduction:
    "I’m interested in how the pieces of an application fit together. My work focuses on Java backends, React interfaces, and the APIs between them.",
  education: "Bachelor of Science in Software Engineering",
  school: "Rochester Institute of Technology",
  graduation: "May 2029",
  gpa: "3.5",
};

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  dates: string;
  description: string;
  focus: string;
  problem: string;
  experience: string;
  contributions: string[];
  technologies: string[];
  architecture: string;
  previewNote: string;
  screenshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
};

export const projects: Project[] = [
  {
    id: "plant",
    number: "01",
    name: "IoT Houseplant Health Monitor",
    category: "BACKEND · IoT",
    dates: "August–September 2026",
    description:
      "I built the backend for a plant-monitoring system that turned soil moisture, sunlight, temperature, and humidity readings into care recommendations.",
    focus:
      "I connected ESP32 telemetry, PostgreSQL storage, and Claude-powered analysis through a Spring Boot API.",
    problem:
      "Plant-care decisions need context. Soil moisture, sunlight, temperature, and humidity together can provide a clearer picture of a houseplant’s environment.",
    experience:
      "The system connected an ESP32 device to a backend service, stored environmental measurements, and used those readings to generate plant health assessments and care recommendations.",
    contributions: [
      "Collaborated with an embedded hardware engineer to define REST API contracts and JSON payload specifications for ESP32 telemetry ingestion.",
      "Built a Java Spring Boot backend with Spring Data JPA and PostgreSQL to validate, deserialize, and persist soil moisture, sunlight, temperature, and humidity measurements.",
      "Integrated the Anthropic Claude API to generate plant health assessments and actionable recommendations from stored telemetry.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "PostgreSQL",
      "REST APIs",
      "ESP32 integration",
      "Anthropic Claude API",
    ],
    architecture:
      "ESP32 → Spring Boot REST API → PostgreSQL → Claude-powered analysis. My focus was the backend and API integrations; my collaborator handled embedded hardware engineering.",
    previewNote:
      "Application screenshot showing the LeafLink plant dashboard, reading history, and AI plant assistant.",
    screenshot: {
      src: "/projects/plant-monitor.png",
      alt: "LeafLink dashboard for a spider plant, with plant data, reading history, and an AI plant-care assistant.",
      width: 1920,
      height: 1303,
      caption: "LeafLink · Plant dashboard",
    },
  },
  {
    id: "finance",
    number: "02",
    name: "Personal Finance Tracker",
    category: "FULL-STACK · API INTEGRATION",
    dates: "December 2025–January 2026",
    description:
      "I built a full-stack application to sync banking transactions through Plaid and organize them into categories for a clearer view of everyday spending.",
    focus:
      "I connected a React interface to protected Spring Boot endpoints and automated transaction synchronization.",
    problem:
      "Banking transactions need to be retrieved, organized, and categorized before they can offer a useful view of personal spending.",
    experience:
      "Users could sign in, sync their banking transactions through Plaid, and view categorized spending in a React interface.",
    contributions: [
      "Built a full-stack application with Spring Boot, React, PostgreSQL, and the Plaid API.",
      "Implemented JWT authentication and Spring Security to protect user data and REST endpoints.",
      "Developed automated transaction synchronization to retrieve, process, and store external banking data.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "Plaid API",
      "JWT",
      "Spring Security",
    ],
    architecture:
      "React interface → Spring Boot REST endpoints with Spring Security and JWT → Plaid integration and PostgreSQL transaction storage.",
    previewNote:
      "Application screenshot showing FinanceApp’s transactions dashboard, spending categories, and bank connection control.",
    screenshot: {
      src: "/projects/finance-tracker.png",
      alt: "FinanceApp transactions dashboard with a spending summary, category filters, transaction history, and a Connect Bank button.",
      width: 2048,
      height: 1076,
      caption: "FinanceApp · Transactions dashboard",
    },
  },
  {
    id: "auth",
    number: "03",
    name: "Secure Auth Service",
    category: "BACKEND · AUTHENTICATION",
    dates: "December 2025–January 2026",
    description:
      "I built a reusable authentication service with a React sign-in interface, JWT validation, and role-based access to protected endpoints.",
    focus:
      "I wrote a custom Spring Security filter chain and Axios interceptors to handle authentication across the backend and frontend.",
    problem:
      "Applications need a consistent way to authenticate users, validate access to protected endpoints, and apply permissions based on user roles.",
    experience:
      "The React frontend supported sign-in, attached tokens to requests, and centrally handled 401 Unauthorized responses. The backend validated tokens and applied role-based access rules.",
    contributions: [
      "Implemented JWT-based stateless authentication and a custom Spring Security filter chain for login/logout handling and token validation on protected REST endpoints.",
      "Used BCrypt for password hashing.",
      "Built a responsive React frontend with Axios interceptors for automatic token attachment and centralized handling of 401 Unauthorized responses.",
      "Designed a PostgreSQL user schema to support role-based access control and granular permissions.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "React",
      "Axios",
      "PostgreSQL",
      "JWT",
      "BCrypt",
      "RBAC",
    ],
    architecture:
      "React + Axios → Spring Security filter chain → JWT validation → role-based access to protected REST endpoints. PostgreSQL stored the user and permission model.",
    previewNote:
      "Application screenshot showing the FinanceApp sign-in interface, with username and password fields and a registration link.",
    screenshot: {
      src: "/projects/secure-auth.png",
      alt: "FinanceApp sign-in screen with username and password fields, a Sign In button, and a Register link.",
      width: 1914,
      height: 1280,
      caption: "Authentication · Sign-in screen",
    },
  },
];

export const skills = [
  { label: "Languages", items: ["Java", "Python", "JavaScript"] },
  { label: "Frontend", items: ["React", "Axios", "HTML", "CSS"] },
  {
    label: "Backend",
    items: ["Spring Boot", "Spring Security", "Spring Data JPA", "REST APIs"],
  },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  {
    label: "Tools & integrations",
    items: [
      "Plaid API",
      "Anthropic Claude API",
      "ESP32 integration",
      "JWT",
      "BCrypt",
    ],
  },
];
