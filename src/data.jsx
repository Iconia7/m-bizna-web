import { Smartphone, PenTool, Layout, Globe, Search, Database } from 'lucide-react';
// Note: Monitor and Shield were imported but not used in the arrays below, 
// but I kept the import clean just in case you need them later.

export const services = [
  { 
    id: 1, 
    title: "Website Development", 
    icon: <Globe />, 
    desc: "Custom websites tailored to your business needs.",
    details: {
      heading: "About Website Development Services",
      intro: "We build responsive, high-performance websites that look great on any device. Our team uses the latest technologies to ensure your site is fast, secure, and scalable.",
      includes: ["Custom Web Design", "E-commerce Solutions", "CMS Integration", "Maintenance & Support"],
      expertise: [
        { id: 1, title: "Custom Development", text: "Tailored solutions built from scratch to meet your unique business requirements." },
        { id: 2, title: "Responsive Design", text: "Ensuring your website looks amazing on desktops, tablets, and mobile devices." },
        { id: 3, title: "SEO Optimization", text: "Built-in SEO best practices to help you rank higher on search engines." }
      ]
    }
  },
  { 
    id: 2, 
    title: "Mobile App Development", 
    icon: <Smartphone />, 
    desc: "Android & iOS apps with seamless performance.",
    details: {
      heading: "About Mobile App Development",
      intro: "Transform your business with a custom mobile application. We develop native and cross-platform apps that provide a seamless user experience.",
      includes: ["iOS & Android Apps", "Cross-Platform (Flutter/React Native)", "UI/UX Design", "App Store Deployment"],
      expertise: [
        { id: 1, title: "Native Performance", text: "High-performance apps optimized for specific operating systems." },
        { id: 2, title: "User-Centric Design", text: "Intuitive interfaces that engage users and improve retention." },
        { id: 3, title: "Scalable Architecture", text: "Backends built to handle millions of users." }
      ]
    }
  },
  { id: 3, title: "UI/UX Design", icon: <PenTool />, desc: "User-centric designs that drive engagement.", details: { heading: "UI/UX Design", intro: "Designing interfaces people love.", includes: ["Wireframing", "Prototyping"], expertise: [] } },
  { id: 4, title: "Graphics Design", icon: <Layout />, desc: "Branding materials, logos, and marketing assets.", details: { heading: "Graphics Design", intro: "Visuals that tell your story.", includes: ["Branding", "Logos"], expertise: [] } },
  { id: 5, title: "Digital Marketing", icon: <Search />, desc: "SEO and campaigns to grow your online presence.", details: { heading: "Digital Marketing", intro: "Reach your audience.", includes: ["SEO", "Social Media"], expertise: [] } },
  { id: 6, title: "Cloud Computing", icon: <Database />, desc: "Secure and scalable cloud infrastructure solutions.", details: { heading: "Cloud Solutions", intro: "Scale effortlessly.", includes: ["AWS/Azure", "Migration"], expertise: [] } },
];

export const projects = [
  { 
    id: 1, 
    title: "Care Connect", 
    category: "Mobile App", 
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    client: "HealthPlus Inc.",
    date: "Jan 2024",
    location: "New York, USA",
    challenge: "The client needed a way to connect patients with doctors remotely during the pandemic, ensuring secure data handling and easy scheduling.",
    solution: "We built a secure, HIPAA-compliant mobile app with real-time video consultation, appointment booking, and digital prescription features.",
    impact: "Increased patient consultations by 40% and reduced administrative overhead by 60%."
  },
  { 
    id: 2, 
    title: "Rent-A-Car", 
    category: "Web Design", 
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
    client: "DriveNow Ltd",
    date: "Mar 2024",
    location: "London, UK",
    challenge: "Automating the booking process for a fleet of 500+ vehicles.",
    solution: "Developed a responsive web platform with real-time availability checking.",
    impact: "Boosted bookings by 25% in the first quarter."
  },
  { id: 3, title: "E-Learn Platform", category: "Mobile App", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800", client: "EduTech", date: "Feb 2024", location: "Remote", challenge: "Remote learning access.", solution: "Video streaming app.", impact: "10k+ Downloads." },
  { id: 4, title: "Real Estate Hub", category: "Web Design", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800", client: "HomeFinders", date: "Apr 2024", location: "Nairobi", challenge: "Property listing management.", solution: "Searchable map portal.", impact: "Faster sales cycles." },
];

export const pricing = [
  { plan: "Basic", price: "89", period: "/Hour", features: ["Consultation", "Basic UI/UX", "Frontend Dev", "No Support"] },
  { plan: "Standard", price: "1999", period: "/Month", features: ["Advanced UI/UX", "Full Stack Dev", "SEO Optimization", "1 Month Support"], recommended: true },
  { plan: "Premium", price: "19,999", period: "/Year", features: ["Enterprise Solutions", "Cloud Hosting", "24/7 Support", "Dedicated Manager"] },
];

export const team = [
  { 
    id: 1, 
    name: "Jenny Alexander", 
    role: "Chief Executive Officer", 
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "jenny@nexora.co.ke",
    phone: "+254 700 123 456",
    experience: "18+ Years",
    bio: "Jenny is a visionary leader with over 18 years of experience in the tech industry. She focuses on driving innovation and building sustainable business strategies.",
    skills: [
      { name: "Strategic Planning", level: 95 },
      { name: "Leadership", level: 90 },
      { name: "Business Development", level: 85 }
    ]
  },
  { 
    id: 2, 
    name: "Olivia Hughes", 
    role: "Chief Technology Officer", 
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "olivia@nexora.co.ke",
    phone: "+254 700 987 654",
    experience: "12+ Years",
    bio: "Olivia leads our technology strategy, ensuring we stay ahead of the curve with cutting-edge solutions in AI and Cloud Computing.",
    skills: [
      { name: "System Architecture", level: 98 },
      { name: "Cloud Computing", level: 95 },
      { name: "Cybersecurity", level: 90 }
    ]
  },
  { 
    id: 3, 
    name: "Mia Hall", 
    role: "Frontend Developer", 
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    email: "mia@nexora.co.ke",
    phone: "+254 711 222 333",
    experience: "6+ Years",
    bio: "Mia creates stunning, responsive user interfaces. She specializes in React and modern CSS frameworks.",
    skills: [
      { name: "React / Vue", level: 95 },
      { name: "UI/UX Implementation", level: 90 },
      { name: "Animation", level: 85 }
    ]
  },
  { 
    id: 4, 
    name: "William Smith", 
    role: "Backend Developer", 
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "william@nexora.co.ke",
    phone: "+254 722 444 555",
    experience: "8+ Years",
    bio: "William is the backbone of our applications, creating robust APIs and secure database architectures.",
    skills: [
      { name: "Python / Node.js", level: 96 },
      { name: "Database Management", level: 94 },
      { name: "API Security", level: 92 }
    ]
  },
  { 
    id: 5, 
    name: "David Davis", 
    role: "Network Engineer", 
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    email: "david@nexora.co.ke",
    phone: "+254 733 666 777",
    experience: "10+ Years",
    bio: "David ensures our infrastructure is always up and running, optimizing network performance and security.",
    skills: [
      { name: "Network Security", level: 95 },
      { name: "Server Management", level: 90 },
      { name: "DevOps", level: 88 }
    ]
  },
  { 
    id: 6, 
    name: "Harper King", 
    role: "Full-Stack Developer", 
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    email: "harper@nexora.co.ke",
    phone: "+254 744 888 999",
    experience: "5+ Years",
    bio: "Harper is a versatile developer who bridges the gap between frontend beauty and backend logic.",
    skills: [
      { name: "Full Stack Dev", level: 92 },
      { name: "Problem Solving", level: 95 },
      { name: "Agile Methodology", level: 90 }
    ]
  }
];

export const benefits = [
    { id: 1, title: "Remote Friendly", desc: "Work from anywhere with our flexible remote policies." },
    { id: 2, title: "Health Insurance", desc: "Comprehensive health coverage for you and your family." },
    { id: 3, title: "Paid Time Off", desc: "Generous vacation days and holidays to recharge." },
    { id: 4, title: "Team Building", desc: "Regular retreats and fun activities to bond with the team." },
    { id: 5, title: "Learning Budget", desc: "Annual stipend for courses, books, and conferences." },
    { id: 6, title: "Gym Membership", desc: "Stay fit and healthy with our wellness partnerships." },
];
  
export const jobs = [
    { id: 1, title: "Senior React Developer", type: "Full Time", location: "Remote", exp: "5+ Years" },
    { id: 2, title: "UI/UX Designer", type: "Full Time", location: "Nairobi", exp: "3+ Years" },
    { id: 3, title: "Python Backend Engineer", type: "Contract", location: "Remote", exp: "4+ Years" },
    { id: 4, title: "Digital Marketing Manager", type: "Full Time", location: "Nairobi", exp: "2+ Years" },
];

export const blogs = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    category: "Web Development",
    author: "Ashley Smith",
    date: "Feb 19, 2025",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    excerpt: "Discover the latest technologies and frameworks that are shaping the future of the web.",
    content: {
      intro: "As we move further into the digital age, web development continues to evolve at a breakneck pace. From AI-driven interfaces to decentralized web applications, 2025 promises to be a year of significant transformation.",
      sections: [
        { title: "Overview of Web Evolution", text: "The static web pages of the past are long gone. Today, users expect dynamic, personalized experiences that load instantly. This shift is driving the adoption of frameworks like Next.js and remixing how we think about server-side rendering." },
        { title: "AI and Machine Learning", text: "Artificial Intelligence is no longer just a buzzword. It's becoming an integral part of the development process, from code generation tools like GitHub Copilot to AI-driven testing and optimization." }
      ],
      practices: [
        { id: 1, title: "Better Animation", text: "Using lightweight libraries for smooth UI transitions." },
        { id: 2, title: "The Need for Speed", text: "Optimizing core web vitals for better SEO rankings." },
        { id: 3, title: "Prompt UI/UX", text: "Interfaces that anticipate user needs before they click." }
      ]
    }
  },
  {
    id: 2,
    title: "The Role of AI in Cloud Computing and Automation",
    category: "Cloud Computing",
    author: "John Doe",
    date: "Feb 15, 2025",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    excerpt: "How Artificial Intelligence is optimizing cloud infrastructure and reducing operational costs.",
    content: {
      intro: "Cloud computing provides the infrastructure, but AI provides the intelligence. Together, they are automating complex tasks that previously required human intervention.",
      sections: [],
      practices: []
    }
  },
  {
    id: 3,
    title: "The Rise of Super Apps: What it Means for Consumers",
    category: "Mobile App",
    author: "Sarah Connor",
    date: "Feb 10, 2025",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80",
    excerpt: "Why users are preferring all-in-one solutions over single-purpose applications.",
    content: {
      intro: "Super apps like WeChat have dominated Asia, and now the trend is moving global. Users want one app to chat, pay bills, order food, and book rides.",
      sections: [],
      practices: []
    }
  },
  {
    id: 4,
    title: "Best Practices for Designing User-Friendly Mobile Apps",
    category: "UI/UX Design",
    author: "Mike Ross",
    date: "Feb 05, 2025",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d4f?auto=format&fit=crop&q=80",
    excerpt: "Key principles to ensure your mobile application engages users effectively.",
    content: {
      intro: "A pretty app is useless if users can't navigate it. We explore the core principles of mobile usability.",
      sections: [],
      practices: []
    }
  }
];