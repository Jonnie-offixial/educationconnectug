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
  address: "West Nile, Uganda",
};

export const stats = [
  { value: 5000, suffix: "+", label: "Beneficiaries Reached" },
  { value: 30, suffix: "+", label: "Schools Supported" },
  { value: 10, suffix: "+", label: "Districts Reached" },
  { value: 8, suffix: "", label: "Core Programs" },
];

export const programs = [
  { slug: "education", title: "Education & Skills Training", img: hero, summary: "Providing quality education and vocational skills to improve employability and self-reliance." },
  { slug: "health", title: "Adolescent Health", img: girls, summary: "Supporting young people with reproductive health education, counseling, and essential services." },
  { slug: "gender", title: "Gender Development", img: community, summary: "Empowering women and girls through education, economic opportunities, and advocacy for equality." },
  { slug: "disability", title: "Disability Inclusion", img: hero, summary: "Ensuring persons with disabilities have equal access to education, health services, and economic opportunities." },
  { slug: "peace", title: "Peace Building", img: community, summary: "Fostering social cohesion, conflict resolution, and harmony among diverse communities." },
  { slug: "advocacy", title: "Advocacy & Human Rights", img: community, summary: "Raising the voices of the marginalised and promoting the rights of children, women and refugees." },
  { slug: "wash", title: "WASH, HIV/AIDS & Sanitation", img: girls, summary: "Clean water, hygiene promotion, sanitation facilities and HIV/AIDS awareness in schools and villages." },
  { slug: "youth", title: "Youth Empowerment", img: sports, summary: "Leadership, sports, and wellbeing programs to build confidence and life skills among young people." },
];

export const projects = [
  { slug: "agenci", title: "AGENCI", full: "Adolescent Girls Education in Crisis Initiative", img: girls, progress: 75, summary: "Helping out-of-school and at-risk adolescent girls in refugee settlements return to learning and stay in school.", reports: ["AGENCI Mid-term Report 2024", "AGENCI Baseline Study"] },
  { slug: "ecd", title: "Community ECD Centers", full: "Early Childhood Development", img: hero, progress: 60, summary: "Community-run early learning centres that give young children a strong, play-based start.", reports: ["ECD Centres Annual Report 2023"] },
  { slug: "refugee-skilling", title: "Refugee Youth Skilling", full: "Vocational training for refugee & host youth", img: girls, progress: 50, summary: "Tailoring, carpentry, ICT and business skills for refugee and host-community youth.", reports: ["Youth Skilling Evaluation 2024"] },
  { slug: "menstrual-hygiene", title: "Menstrual Hygiene Campaigns", full: "Dignity kits & school outreach", img: community, progress: 85, summary: "Reusable pad distribution, hygiene education and breaking stigma in schools.", reports: ["MHM Campaign Report 2023"] },
];

export const stories = [
  { name: "Grace Akello", role: "AGENCI Beneficiary", quote: "Before AGENCI, I had dropped out of school and saw no future. Today, I am back in class and mentoring younger girls in my community. ECU gave me hope when I had none." },
  { name: "David Ojara", role: "Youth Skilling Graduate", quote: "The vocational training changed my life. I learned carpentry and now run my own small workshop. I can feed my family and even employ one other person from my village." },
  { name: "Mary Draru", role: "Community Health Volunteer", quote: "ECU trained me as a community health volunteer. Now I teach mothers about hygiene and nutrition. Our village has seen fewer cases of preventable disease." },
];

export const posts = [
  { slug: "back-to-school", category: "Latest News", title: "Hundreds of girls return to school through AGENCI", date: "February 2026", img: girls, excerpt: "The new term saw record enrolment of adolescent girls across our partner schools." },
  { slug: "ecd-field-report", category: "Field Reports", title: "Three new community ECD centres open", date: "November 2025", img: hero, excerpt: "Parents and local leaders came together to build safe learning spaces for young children." },
  { slug: "football-for-peace", category: "Impact Stories", title: "Football for peace brings two communities together", date: "September 2025", img: sports, excerpt: "A youth league is helping refugee and host-community teenagers build lasting friendships." },
  { slug: "women-dialogue", category: "Latest News", title: "Women lead community dialogue on gender equity", date: "July 2025", img: community, excerpt: "Community conversations are changing attitudes about girls' education." },
];

export const partners = [
  { short: "AKF", name: "Aga Khan Foundation" }, { short: "MU", name: "Muni University" }, { short: "LF", name: "LEGO Foundation" }, { short: "UNHCR", name: "UNHCR" },
  { short: "UNICEF", name: "UNICEF" }, { short: "MoE", name: "Ministry of Education" }, { short: "SC", name: "Save the Children" }, { short: "WV", name: "World Vision" },
];

export const latestReports = [
  { type: "Annual", title: "Annual Report 2024", date: "December 2024" },
  { type: "Project", title: "AGENCI Project Evaluation", date: "October 2024" },
  { type: "Research", title: "Community Health Assessment", date: "August 2024" },
];

export const values = [
  { title: "Service", text: "Putting community needs first in everything we do. We exist to serve vulnerable populations with humility, dedication, and compassion." },
  { title: "Teamwork", text: "Collaborating with partners, volunteers, staff, and communities to achieve shared goals. No one achieves impact alone." },
  { title: "Ambition", text: "Striving for excellence, innovation, and measurable impact. We set ambitious targets because communities deserve the best." },
  { title: "Respect", text: "Honoring the dignity, culture, and rights of every person. Diversity strengthens us, and inclusion drives our work." },
];

export const goals = [
  { title: "Education Access", text: "Increase access to quality education for 10,000 children and youth, including refugees and persons with disabilities." },
  { title: "Health Outcomes", text: "Improve adolescent health outcomes in 50 communities through education, service linkage, and community health worker training." },
  { title: "Gender & Inclusion", text: "Advance gender equity and disability inclusion across all programs, ensuring 50% female participation and accessible facilities." },
  { title: "Peace & Cohesion", text: "Strengthen peacebuilding and conflict resolution capacities in 20 refugee-hosting communities to foster social cohesion." },
];

export const structure = [["General Assembly"], ["Board of Directors"], ["Executive Director"], ["Programs Manager", "Finance Manager", "M&E Coordinator", "Admin Officer"], ["Field Officers & Community Volunteers"]];

export const timeline = [
  { year: "2016", title: "Foundation", text: "Education Connect Uganda is founded by a group of community educators in West Nile." },
  { year: "2017", title: "First School Partnerships", text: "Launched education support programs in 5 primary schools across refugee settlements." },
  { year: "2018", title: "Adolescent Health Initiative", text: "Introduced reproductive health education and counseling for youth in crisis settings." },
  { year: "2019", title: "Gender Equity Program", text: "Launched women empowerment and gender-based violence prevention activities." },
  { year: "2020", title: "Disability Inclusion Launch", text: "Began targeted support for children with disabilities in inclusive education settings." },
  { year: "2021", title: "AGENCI Project", text: "Secured major funding for the Adolescent Girls Education in Crisis Initiative." },
  { year: "2022", title: "Strategic Plan 2022-2026", text: "Adopted ambitious 5-year strategic plan with 4 core goals and measurable targets." },
  { year: "2023", title: "District Expansion", text: "Expanded operations to 10+ districts, reaching over 4,000 direct beneficiaries." },
  { year: "2024", title: "5,000+ Beneficiaries", text: "Crossed the milestone of 5,000 beneficiaries served across all programs." },
];

export const leaders = [
  { name: "Ajio Melda Olea", role: "Executive Director", text: "Founder of ECU with over 15 years of experience in community development and education in West Nile." },
  { name: "Grace Adong", role: "Programs Manager", text: "Oversees all education, health, and empowerment programs with a focus on adolescent girls and refugees." },
  { name: "Peter Lwanga", role: "Finance & Admin Officer", text: "Ensures transparent financial management, compliance, and operational efficiency across all projects." },
];

export const opportunities = [
  { title: "Community Teacher Assistant", place: "Arua District", time: "Part-time" },
  { title: "Health Outreach Volunteer", place: "Yumbe District", time: "Weekends" },
  { title: "Youth Mentor", place: "Madi-Okollo", time: "Flexible" },
  { title: "WASH Project Support", place: "Terego District", time: "Full-time" },
  { title: "Digital Skills Trainer", place: "Remote / Online", time: "Remote" },
];
