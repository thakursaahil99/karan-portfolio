export const profile = {
  name: "Karan Singh",
  first: "Karan",
  last: "Singh",
  role: "Web Designer & Developer",
  intro:
    "Engineer by training, team leader by experience, web developer by craft. I build WordPress, Shopify, Webflow, Framer and Next.js sites that are engineered to run like a well-balanced production line.",
  email: "thakurkaran696@gmail.com",
  phone: "+91 82788 48099",
  phoneHref: "+918278848099",
  whatsapp: "918278848099",
  location: "Chandigarh, India",
  origin: "Mandi, Himachal Pradesh",
  company: "Caresort Solutions",
};

export const nav = [
  { href: "/", label: "Home", index: "01" },
  { href: "/work", label: "Work", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
];

export const stats = [
  { value: 11, suffix: "", label: "Live client sites in this portfolio" },
  { value: 12, suffix: "+", label: "Years of professional work since 2014" },
  { value: 5, suffix: "+", label: "Years leading production teams" },
  { value: 6, suffix: "", label: "Platforms shipped on" },
];

export const marquee = ["WordPress", "Shopify", "Webflow", "Framer", "Next.js", "PHP", "MySQL", "JavaScript", "jQuery", "AJAX"];

export type Skill = { name: string; group: "Build" | "Code" | "Data" };

export const skills: Skill[] = [
  { name: "WordPress", group: "Build" },
  { name: "Elementor", group: "Build" },
  { name: "Shopify", group: "Build" },
  { name: "WooCommerce", group: "Build" },
  { name: "Webflow", group: "Build" },
  { name: "Framer", group: "Build" },
  { name: "Next.js", group: "Code" },
  { name: "PHP (Core)", group: "Code" },
  { name: "JavaScript", group: "Code" },
  { name: "jQuery", group: "Code" },
  { name: "AJAX", group: "Code" },
  { name: "HTML", group: "Code" },
  { name: "CSS", group: "Code" },
  { name: "MySQL", group: "Data" },
];

export type Service = { no: string; title: string; desc: string; points: string[]; tags: string[] };

export const services: Service[] = [
  {
    no: "01",
    title: "WordPress Engineering",
    desc: "Custom WordPress builds from layout to launch, extended with PHP, JavaScript and AJAX where a page builder stops.",
    points: ["Elementor builds & custom widgets", "Custom PHP functionality", "WooCommerce stores", "Client-editable content"],
    tags: ["WordPress", "Elementor", "PHP", "WooCommerce"],
  },
  {
    no: "02",
    title: "Shopify Stores",
    desc: "Storefronts that let the product lead: theme setup, custom sections and a checkout path that works on a phone.",
    points: ["Theme setup & styling", "Custom Liquid sections", "Product & collection pages", "Mobile-first flows"],
    tags: ["Shopify", "Liquid", "E-commerce"],
  },
  {
    no: "03",
    title: "Webflow, Framer & Next.js",
    desc: "Modern, motion-rich frontends for brands that want speed and interaction beyond a template.",
    points: ["Component-driven builds", "Scroll & hover animation", "SEO-friendly markup", "Fast static delivery"],
    tags: ["Next.js", "Webflow", "Framer"],
  },
  {
    no: "04",
    title: "Custom Backend & Data",
    desc: "Forms, dashboards and dynamic features in core PHP and MySQL, wired up with AJAX so nothing reloads.",
    points: ["Core PHP & MySQL", "AJAX-driven interfaces", "Forms & integrations", "Database design"],
    tags: ["PHP", "MySQL", "AJAX", "jQuery"],
  },
];

/** The career, newest first. `kind` decides the node colour on the timeline. */
export const journey = [
  {
    period: "Now",
    role: "WordPress Designer & Developer",
    company: "Caresort Solutions",
    place: "Chandigarh Tricity",
    kind: "web" as const,
    points: [
      "Design and develop client websites in WordPress, from layout to launch.",
      "Build custom functionality with PHP, JavaScript, jQuery, AJAX and MySQL.",
      "Ship on Shopify, Webflow, Framer and Next.js when the project calls for it.",
    ],
  },
  {
    period: "6–9 months",
    role: "Web Development Training",
    company: "Imax Infotech",
    place: "Sector 34, Chandigarh",
    kind: "web" as const,
    points: ["Professional training in PHP, JavaScript, jQuery, AJAX and MySQL."],
  },
  {
    period: "Dec 2017 – 2020",
    role: "Sr. Team Leader",
    company: "Forcefox Pvt. Ltd.",
    place: "Sonipat, Haryana · Mobile phone manufacturing",
    kind: "line" as const,
    points: [
      "Led production lines: shift planning, workload distribution and hourly supervision to meet targets.",
      "Analysed rejection and rework data; controlled rejection, cost and manpower.",
      "Improved efficiency with 5-S, TPM, Kaizen and line balancing; trained operators.",
    ],
  },
  {
    period: "Jun 2016 – Nov 2017",
    role: "Sr. Team Leader",
    company: "Essline Engineers & Consultant Pvt. Ltd.",
    place: "Sonipat, Haryana",
    kind: "line" as const,
    points: [],
  },
  {
    period: "Jul 2015 – Jun 2016",
    role: "Team Leader",
    company: "GDN Enterprises Pvt. Ltd.",
    place: "Sector 63, Noida (U.P.)",
    kind: "line" as const,
    points: [],
  },
  {
    period: "Jul 2014 – Jul 2015",
    role: "Diploma Engineer",
    company: "Intex Industries Pvt. Ltd.",
    place: "Baddi (H.P.)",
    kind: "line" as const,
    points: [],
  },
];

export const education = [
  { year: "2013", title: "Diploma in Electronics & Communication (ECE)", place: "Sri Sai University, Palampur (H.P.)" },
  { year: "2009", title: "Standard XII", place: "H.P. Board of School Education" },
  { year: "2007", title: "Standard X", place: "H.P. Board of School Education" },
];

export const training = [
  { title: "Web Development", length: "6–9 months", place: "Imax Infotech, Sector 34, Chandigarh" },
  { title: "Embedded Systems", length: "45 days", place: "EVLK Lab, Chandigarh" },
];

/** What the factory floor taught, applied to websites. */
export const principles = [
  { term: "5-S", title: "Sort, set, shine", desc: "Clean file structures, named layers and no dead plugins. A site someone else can open and understand." },
  { term: "Kaizen", title: "Small, constant gains", desc: "Every launch is measured and tuned again: images, scripts, layout shifts, one fix at a time." },
  { term: "TPM", title: "Built to keep running", desc: "Updates, backups and a hand-over clients can maintain, so the site works long after launch day." },
  { term: "Line balancing", title: "No bottlenecks", desc: "Content, design and code planned together so nothing waits on anything else, and deadlines hold." },
];

export const process = [
  { title: "Brief", desc: "Goals, audience, content and the platform that fits them — WordPress, Shopify, Webflow, Framer or Next.js." },
  { title: "Blueprint", desc: "Page structure and layout planned like a production line: every section has a job." },
  { title: "Build", desc: "Responsive, hand-tuned and extended with custom code where the builder stops." },
  { title: "Launch & tune", desc: "Speed, forms, tracking and cross-device checks before and after go-live." },
];

export type Platform = "WordPress" | "Shopify" | "WooCommerce";

export type Project = {
  slug: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  industry: string;
  region: string;
  platform: Platform;
  stack: string[];
  summary: string;
  overview: string;
  scope: string[];
  /** Brand-ish duotone used for covers, glows and hover tints. */
  colors: [string, string];
  /** Screenshots live at /public/projects/{slug}-desktop|full|mobile.jpg */
  shots: boolean;
  fullHeight: number;
};

const wpScope = ["Layout & UI", "Elementor build", "Responsive breakpoints", "Custom code", "Launch & speed"];
const shopScope = ["Theme customisation", "Custom sections", "Product pages", "Mobile-first layout"];

export const projects: Project[] = [
  {
    slug: "arvid",
    name: "Arvid Lindblad",
    url: "https://arvidlindblad.com",
    domain: "arvidlindblad.com",
    category: "Personal brand",
    industry: "Motorsport · Formula 1",
    region: "United Kingdom",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "The official website of Formula 1 driver Arvid Lindblad.",
    overview:
      "The official home of Arvid Lindblad, Formula 1 driver with Racing Bulls. A personal-brand site that had to feel fast and premium: a full driver profile, race history and media, built to look as sharp on a phone in the paddock as on a desktop.",
    scope: wpScope,
    colors: ["#2b3cff", "#ff2b4f"],
    shots: true,
    fullHeight: 7200,
  },
  {
    slug: "caresort",
    name: "Caresort Solutions",
    url: "https://www.caresortsolutions.com/",
    domain: "caresortsolutions.com",
    category: "Agency website",
    industry: "Software & digital marketing",
    region: "India",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Software development and digital marketing company site.",
    overview:
      "The company website for Caresort Solutions Pvt. Ltd., a technology, software development and digital marketing firm. The site presents a broad set of services and global partnerships in a layout that stays clear across a long page.",
    scope: wpScope,
    colors: ["#1e6bff", "#00d1b2"],
    shots: true,
    fullHeight: 7129,
  },
  {
    slug: "ivueverse",
    name: "Vueverse",
    url: "https://ivueverse.com",
    domain: "ivueverse.com",
    category: "Corporate website",
    industry: "Pharma & life sciences",
    region: "Global",
    platform: "WordPress",
    stack: ["WordPress", "Elementor", "Slider Revolution"],
    summary: "Capability partner for pharma and life sciences.",
    overview:
      "Vueverse is a senior-led partner providing regulatory, CMC, quality, clinical and pharmacovigilance expertise. The site needed to carry a lot of specialist services while staying scannable, with an animated hero slider and service tags up front.",
    scope: [...wpScope.slice(0, 3), "Slider Revolution hero", "Launch & speed"],
    colors: ["#ff3b30", "#111827"],
    shots: true,
    fullHeight: 5998,
  },
  {
    slug: "mybrokerpaul",
    name: "Spectrum One Mortgage",
    url: "https://mybrokerpaul.com/",
    domain: "mybrokerpaul.com",
    category: "Lead-generation website",
    industry: "Mortgage & finance",
    region: "Arizona, USA",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Mortgage broker in Lake Havasu City, Arizona.",
    overview:
      "Spectrum One Mortgage is a mortgage broker in Lake Havasu City, AZ. The site walks visitors from loan programmes to a clear 'how it works' path and a pre-approval call to action, built to turn visits into enquiries.",
    scope: [...wpScope.slice(0, 3), "Lead forms", "Launch & speed"],
    colors: ["#0f4c81", "#f5b700"],
    shots: true,
    fullHeight: 7200,
  },
  {
    slug: "trendz",
    name: "Trendz Imports",
    url: "https://trendzimports.ca/",
    domain: "trendzimports.ca",
    category: "E-commerce website",
    industry: "Furniture & home",
    region: "Canada",
    platform: "WooCommerce",
    stack: ["WordPress", "WooCommerce"],
    summary: "Premium furniture for modern living across Canada.",
    overview:
      "Trendz Imports Inc. sells living room, bedroom and dining furniture across Canada. The WooCommerce build pairs large lifestyle imagery with collection-led navigation so shoppers can browse by room.",
    scope: ["Layout & UI", "WooCommerce setup", "Collection pages", "Responsive breakpoints", "Launch & speed"],
    colors: ["#22a447", "#ffb400"],
    shots: true,
    fullHeight: 7200,
  },
  {
    slug: "wirehn",
    name: "Wiréhn",
    url: "https://wirehn.myshopify.com/en",
    domain: "wirehn.myshopify.com",
    category: "E-commerce store",
    industry: "Art & fine-art prints",
    region: "Sweden",
    platform: "Shopify",
    stack: ["Shopify", "Liquid"],
    summary: "Original artworks and fine-art prints by Klas Wiréhn.",
    overview:
      "An online store for original artworks and fine-art prints by Klas Wiréhn: character-driven pieces inspired by storytelling and modern culture. The dark storefront lets the artwork lead while keeping browsing and buying simple.",
    scope: shopScope,
    colors: ["#f2e6d0", "#ff7a3d"],
    shots: true,
    fullHeight: 5493,
  },
  {
    slug: "brand-integrity",
    name: "BRAND",
    url: "https://www.brandintegritymanagement.com/",
    domain: "brandintegritymanagement.com",
    category: "SaaS product website",
    industry: "Supply-chain compliance",
    region: "Global",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Supply-chain compliance and brand-integrity platform.",
    overview:
      "BRAND helps companies map direct and indirect suppliers, run KYC and verification, and understand risk by location, tier and sector. The site turns a dense compliance product into a clear feature-by-feature story.",
    scope: wpScope,
    colors: ["#5b3cff", "#00c2ff"],
    shots: true,
    fullHeight: 4053,
  },
  {
    slug: "sbppl",
    name: "SBPPL Industries",
    url: "https://sbpplindustries.com/",
    domain: "sbpplindustries.com",
    category: "Corporate website",
    industry: "Recycled polymers · Manufacturing",
    region: "India",
    platform: "WordPress",
    stack: ["WordPress", "Elementor", "Site Kit"],
    summary: "Manufacturing partner for recycled polymer solutions.",
    overview:
      "Shree Balaji Plastochem Pvt. Ltd. manufactures recycled PP, LD and HD granules for industrial use. The site positions a manufacturer as a reliable, sustainable partner, with Google Site Kit set up for analytics.",
    scope: wpScope,
    colors: ["#1aa260", "#0b3d2e"],
    shots: true,
    fullHeight: 5628,
  },
  {
    slug: "supertech",
    name: "Super Tech Pumps",
    url: "http://supertechpumps.com",
    domain: "supertechpumps.com",
    category: "Industrial catalogue site",
    industry: "Pumps & water treatment",
    region: "India",
    platform: "WordPress",
    stack: ["WordPress", "Elementor"],
    summary: "Industrial pumps, water solutions and boiler chemicals.",
    overview:
      "Super Tech Pumps & Equipments Pvt. Ltd. supplies Milton Roy dosing pumps, Xylem water solutions, Veolia boiler chemicals and AODD pumps. The site is built around products and quick actions: request a quote, download the catalogue, ask for service parts.",
    scope: [...wpScope.slice(0, 3), "Quote & catalogue CTAs", "Launch & speed"],
    colors: ["#1f8fd1", "#43a047"],
    shots: true,
    fullHeight: 4366,
  },
  {
    slug: "purpose-fueled",
    name: "Purpose Fueled Leadership",
    url: "https://purposefueledleadership.ca/",
    domain: "purposefueledleadership.ca",
    category: "Personal brand",
    industry: "Executive coaching",
    region: "Canada",
    platform: "WordPress",
    stack: ["WordPress"],
    summary: "Executive coaching by Dr. Arief Ebrahim, Ed.D.",
    overview:
      "The website of Dr. Arief Ebrahim, a systems leader, executive coach and wellness facilitator with more than 25 years of leadership experience. A calm, personal layout that puts the person and the services first.",
    scope: ["Layout & UI", "WordPress build", "Responsive breakpoints", "Contact & social", "Launch & speed"],
    colors: ["#1d4ed8", "#9b1c1c"],
    shots: true,
    fullHeight: 5086,
  },
  {
    slug: "diamond-exch",
    name: "Diamond Exch",
    url: "https://diamondexch.social",
    domain: "diamondexch.social",
    category: "Platform website",
    industry: "Online exchange",
    region: "India",
    platform: "WordPress",
    stack: ["Web"],
    summary: "Brand site for an online exchange platform.",
    overview:
      "A brand and onboarding website for an online exchange platform, designed around a bold dark visual identity and a quick route to sign-up.",
    scope: ["Layout & UI", "Responsive breakpoints", "Launch"],
    colors: ["#00e5ff", "#7c3aed"],
    shots: false,
    fullHeight: 0,
  },
];

export const platforms = ["All", "WordPress", "WooCommerce", "Shopify"] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const faqs = [
  {
    q: "Which platform should my website be on?",
    a: "WordPress when you want to edit content yourself, Shopify or WooCommerce when you sell products, Webflow or Framer for design-led marketing sites, and Next.js when you need custom interaction and maximum speed. I'll recommend the one that fits, not the one I like best.",
  },
  {
    q: "Can you add features a page builder can't do?",
    a: "Yes. I write custom PHP, JavaScript, jQuery and AJAX, with MySQL behind it, for forms, filters, dashboards and anything else the builder stops short of.",
  },
  {
    q: "Will it work on mobile?",
    a: "Every layout is built and checked on phone, tablet and desktop breakpoints and across browsers before launch.",
  },
  {
    q: "How does your manufacturing background help?",
    a: "Five years running production lines taught me planning, deadlines and quality control: 5-S, Kaizen, TPM. I run web projects the same way, with clear stages and no surprises at the end.",
  },
];
