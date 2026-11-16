import hero from "@/assets/hero-learning.jpg";
import community from "@/assets/community.jpg";
import girls from "@/assets/girls-skills.jpg";
import sports from "@/assets/youth-sports.jpg";

export const images = { hero, community, girls, sports };

export const org = {
  name: "Education Connect Uganda",
  short: "ECU",
  founded: 2016,
  region: "West Nile, Uganda",
  email: "info@educationconnectuganda.org",
  phone: "+256 700 000 000",
  address: "Arua City, West Nile, Uganda",
};

export const stats = [
  { value: 5000, suffix: "+", label: "Beneficiaries reached" },
  { value: 30, suffix: "+", label: "Schools supported" },
  { value: 10, suffix: "+", label: "Districts reached" },
  { value: 2016, suffix: "", label: "Serving since" },
];

export const programs = [
  { slug: "education", title: "Education & Skills Training", img: hero, summary: "Keeping vulnerable children and refugee youth in school, and equipping young people with practical, marketable skills." },
  { slug: "health", title: "Adolescent Health", img: girls, summary: "Sexual and reproductive health education, menstrual hygiene support and safe spaces for adolescents." },
  { slug: "gender", title: "Gender Development & Equity", img: community, summary: "Empowering women and girls to participate fully in education, leadership and economic life." },
  { slug: "disability", title: "Disability Inclusion", img: hero, summary: "Making schools and communities accessible and welcoming to people with disabilities." },
  { slug: "peace", title: "Peace Building", img: community, summary: "Dialogue, conflict resolution and social cohesion between refugee and host communities." },
  { slug: "advocacy", title: "Advocacy & Human Rights", img: community, summary: "Raising the voices of the marginalised and promoting the rights of children, women and refugees." },
  { slug: "wash", title: "WASH, HIV/AIDS & Sanitation", img: girls, summary: "Clean water, hygiene promotion, sanitation facilities and HIV/AIDS awareness in schools and villages." },
  { slug: "youth", title: "Youth Sports & Wellbeing", img: sports, summary: "Using sport and recreation to build confidence, teamwork and mental wellbeing among young people." },
];

export const projects = [
  { slug: "agenci", title: "AGENCI", full: "Adolescent Girls Education in Crisis Initiative", img: girls, progress: 75, summary: "Helping out-of-school and at-risk adolescent girls in refugee settlements return to learning and stay in school.", reports: ["AGENCI Mid-term Report 2024", "AGENCI Baseline Study"] },
  { slug: "ecd", title: "Community ECD Centers", full: "Early Childhood Development", img: hero, progress: 60, summary: "Community-run early learning centres that give young children a strong, play-based start.", reports: ["ECD Centres Annual Report 2023"] },
  { slug: "refugee-skilling", title: "Refugee Youth Skilling", full: "Vocational training for refugee & host youth", img: girls, progress: 50, summary: "Tailoring, carpentry, ICT and business skills for refugee and host-community youth.", reports: ["Youth Skilling Evaluation 2024"] },
  { slug: "menstrual-hygiene", title: "Menstrual Hygiene Campaigns", full: "Dignity kits & school outreach", img: community, progress: 85, summary: "Reusable pad distribution, hygiene education and breaking stigma in schools.", reports: ["MHM Campaign Report 2023"] },
];

export const stories = [
  { name: "Grace A.", role: "AGENCI learner", quote: "I had left school after my father died. Now I am back in class and I want to become a nurse." },
  { name: "Emmanuel O.", role: "Youth skilling graduate", quote: "The tailoring course gave me a trade. Today I run my own small shop in the settlement." },
  { name: "Mama Sarah", role: "ECD caregiver", quote: "Our children now start primary school ready to learn. The whole village sees the difference." },
];

export const posts = [
  { slug: "back-to-school-2026", category: "Latest News", title: "Hundreds of girls return to school through AGENCI", date: "2026-02-10", img: girls, excerpt: "The new term saw record enrolment of adolescent girls across our partner schools." },
  { slug: "ecd-field-report", category: "Field Reports", title: "Field report: three new community ECD centres open", date: "2025-11-04", img: hero, excerpt: "Parents and local leaders came together to build safe learning spaces for young children." },
  { slug: "football-for-peace", category: "Impact Stories", title: "Football for peace brings two communities together", date: "2025-09-18", img: sports, excerpt: "A youth league is helping refugee and host-community teenagers build lasting friendships." },
  { slug: "women-dialogue", category: "Latest News", title: "Women lead community dialogue on gender equity", date: "2025-07-02", img: community, excerpt: "Community conversations are changing attitudes about girls' education." },
];

export const partners = ["Aga Khan Foundation", "Muni University", "LEGO Foundation", "UNHCR", "Arua District Local Government", "Community Partners"];

export const values = [
  { title: "Service", text: "We put the needs of communities first." },
  { title: "Teamwork", text: "We achieve more by working together with partners and communities." },
  { title: "Ambition", text: "We set bold goals for lasting change." },
  { title: "Respect", text: "We honour the dignity of every person we serve." },
];

export const timeline = [
  { year: "2016", text: "ECU founded as a community-based organisation in West Nile." },
  { year: "2018", text: "First refugee education programmes launched." },
  { year: "2020", text: "Community ECD centres established with partners." },
  { year: "2022", text: "Strategic Plan 2022–2026 adopted." },
  { year: "2023", text: "AGENCI scaled to more refugee settlements." },
  { year: "2024", text: "Youth skilling and menstrual hygiene campaigns expanded." },
];

export const leaders = [
  { name: "Executive Director", role: "Leads ECU's strategy and partnerships" },
  { name: "Ajio Melda Olea", role: "Programmes Manager" },
  { name: "Finance & Admin Lead", role: "Oversees finance and compliance" },
  { name: "M&E Officer", role: "Tracks results and learning" },
];
