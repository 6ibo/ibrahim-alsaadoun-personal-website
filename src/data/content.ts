export type Locale = "en" | "ar";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const sitePath = (path: string) => `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
export const copy = {
  en: {
    nav: ["Home", "About", "Gallery", "Content", "Projects", "Connect"],
    role: "IT Student & Content Creator",
    lead: "Exploring technology, creating stories, and building what’s next.",
    story: "Discover my story", work: "Explore my work", scroll: "Scroll to explore",
    aboutTitle: "A little about me.",
    bio: "I’m Ibrahim Alsaadoun, an IT student and content creator passionate about technology, creativity, and digital storytelling.",
    galleryTitle: "Moments,\nseen my way.", galleryIntro: "A personal collection of portraits and moments, seen from my perspective.",
    contentTitle: "Football, told as stories.", contentIntro: "Football is more than a game: I make short stories about iconic players, unforgettable moments, club debates, transfers, and the decisions that shape the sport.",
    projectsTitle: "Things I’m building.", projectsIntro: "A place for experiments, ideas, and digital projects as they take shape.",
    connectTitle: "Let’s stay connected.", connectIntro: "Find me around the internet.",
    placeholder: "Coming soon", emptyProject: "Project details will appear here when a project is ready to share.", videoWatch: "Watch this video on YouTube", localVideo: "Play the local video", footballTopics: ["Player stories", "Iconic moments", "Clubs & transfers", "Refereeing debates"],
    viewProject: "View project", youtube: "Visit my YouTube channel", featured: "Featured work", gallery: "Photography",
    videoPlaceholder: "Video placeholder", projectPlaceholder: "Project cover placeholder", footer: "Made with care."
  },
  ar: {
    nav: ["الرئيسية", "نبذة", "معرض الصور", "المحتوى", "المشاريع", "تواصل"],
    role: "طالب تقنية معلومات وصانع محتوى",
    lead: "أستكشف التقنية، وأروي القصص، وأبني ما هو قادم.",
    story: "اكتشف حكايتي", work: "استكشف أعمالي", scroll: "مرر للاستكشاف",
    aboutTitle: "نبذة بسيطة عني.",
    bio: "أنا إبراهيم سعدون، طالب تقنية معلومات وصانع محتوى، مهتم بالتكنولوجيا والإبداع وصناعة القصص الرقمية.",
    galleryTitle: "لحظات،\nبعيني.", galleryIntro: "مجموعة شخصية من الصور واللحظات كما أراها.",
    contentTitle: "كرة القدم كما تُروى.", contentIntro: "كرة القدم أكثر من لعبة: أقدّم قصصًا قصيرة عن نجومها ولحظاتها الخالدة، ونقاشات الأندية والانتقالات والقرارات التي تصنع الحكاية.",
    projectsTitle: "أشياء أعمل على بنائها.", projectsIntro: "مساحة للتجارب والأفكار والمشاريع الرقمية حين تكتمل ملامحها.",
    connectTitle: "لنبقَ على تواصل.", connectIntro: "يمكنك أن تجدني على الإنترنت.",
    placeholder: "قريباً", emptyProject: "ستظهر تفاصيل المشروع هنا عندما يصبح جاهزاً للمشاركة.", videoWatch: "شاهد هذا المقطع على يوتيوب", localVideo: "شاهد النسخة الموجودة بالموقع", footballTopics: ["قصص اللاعبين", "لحظات تاريخية", "الأندية والانتقالات", "نقاشات التحكيم"],
    viewProject: "عرض المشروع", youtube: "زيارة قناتي على يوتيوب", featured: "أعمال مختارة", gallery: "التصوير",
    videoPlaceholder: "مساحة لمقطع فيديو", projectPlaceholder: "مساحة لصورة المشروع", footer: "صُنع بعناية."
  }
} as const;

export const photos = [
  { id: "portrait", src: "/images/gallery/portrait-green-cutout.png", shape: "portrait", label: { en: "Green and cream portrait", ar: "صورة بالقميص الأخضر والعاجي" } },
  { id: "black-hoodie", src: "/images/gallery/portrait-black-hoodie-cutout.png", shape: "portrait", label: { en: "Portrait in black", ar: "صورة بالأسود" } },
  { id: "white-hoodie", src: "/images/gallery/portrait-white-hoodie.jpg", shape: "portrait", label: { en: "Portrait in white", ar: "صورة بالأبيض" } },
  // Football artwork stays with its video cards; the gallery is reserved for personal portraits.
] as const;

export const projects: { slug: string; title: Record<Locale, string>; description: Record<Locale, string>; technologies: string[]; cover: string | null; gallery: string[]; url?: string }[] = [];
export const videos: { title: Record<Locale, string>; platform: Record<Locale, string>; thumbnail: string | null; src?: string; url?: string }[] = [
  { title: { en: "“There’s Something…” — Chaouali before Madrid’s comeback", ar: "«فمّا حاجة!».. إحساس الشوالي قبل ريمونتادا ريال مدريد" }, platform: { en: "YouTube Short · Football moment", ar: "Short يوتيوب · لحظة كروية" }, thumbnail: "/images/content-football.jpg", src: "/videos/football-story.mp4", url: "https://www.youtube.com/shorts/98rv4ImC-BM" },
  { title: { en: "Haaland to Barcelona? Laporta’s unexpected plan", ar: "هالاند إلى برشلونة؟ خطة لابورتا بسبب أزمة مانشستر سيتي" }, platform: { en: "YouTube Short · Transfer story", ar: "Short يوتيوب · قصة انتقالات" }, thumbnail: "/images/content-algeria.jpg", src: "/videos/haaland.mp4", url: "https://www.youtube.com/shorts/6gu6RyLVj1E" }
];
export const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@ibrahimalsadon" }, { label: "Instagram", href: "https://www.instagram.com/ibrahimalsadon/?hl=en" }, { label: "TikTok", href: "https://www.tiktok.com/@ibrahimalsadon" },
  { label: "GitHub", href: "https://github.com/6ibo" }, { label: "Email", href: "" }
];
