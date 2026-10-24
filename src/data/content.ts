export type Locale = "en" | "ar";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const sitePath = (path: string) => `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
export const copy = {
  en: {
    nav: ["Home", "About", "Gallery", "Content", "Projects", "Connect"],
    role: "IT student · Football storyteller",
    lead: "I study technology and tell the stories behind football’s unforgettable moments.",
    story: "A little about me", work: "See what I create", scroll: "Explore",
    aboutTitle: "A little about me.",
    bio: "I’m Ibrahim Alsaadoun, an IT student and sports content creator. I tell football stories that bring the game’s people and moments closer.",
    galleryTitle: "Moments,\nseen my way.", galleryIntro: "A personal collection of portraits and moments, seen from my perspective.",
    contentTitle: "The stories behind the game", contentIntro: "I create Arabic football content about the players, turning points, rivalries, and unforgettable moments that make the game more than 90 minutes.",
    projectsTitle: "Things I’m building.", projectsIntro: "A place for experiments, ideas, and digital projects as they take shape.",
    connectTitle: "Let’s stay connected.", connectIntro: "Find me around the internet.",
    placeholder: "Not added yet", emptyProject: "I’ll share personal projects here as they’re ready.", videoWatch: "Watch on YouTube", footballTopics: ["Player stories", "Iconic moments", "Rivalries", "Transfers"],
    channelEyebrow: "Football, through my lens", channelName: "Ibrahim Alsaadoun", channelHandle: "@ibrahimalsadon", channelPitch: "Short Arabic stories about football’s biggest characters and moments. Watch a video, then come along for the next story.", channelInvite: "Watch my football stories", shortsHeading: "Stories worth a replay", shortsLabel: "ON YOUTUBE",
    viewProject: "View project", youtube: "Visit my YouTube channel", featured: "Featured work", gallery: "Photography",
    videoPlaceholder: "Video placeholder", projectPlaceholder: "Project cover placeholder", footer: "Made with care."
  },
  ar: {
    nav: ["الرئيسية", "نبذة", "معرض الصور", "المحتوى", "المشاريع", "تواصل"],
    role: "طالب تقنية معلومات · صانع محتوى رياضي",
    lead: "أدرس التقنية وأروي الحكايات خلف لحظات كرة القدم التي لا تُنسى.",
    story: "نبذة عني", work: "شاهد ما أقدّمه", scroll: "اكتشف",
    aboutTitle: "نبذة بسيطة عني.",
    bio: "أنا إبراهيم سعدون، طالب تقنية معلومات وصانع محتوى رياضي. أروي قصص كرة القدم وأقرّب لحظاتها وشخصياتها من الجمهور.",
    galleryTitle: "لحظات،\nبعيني.", galleryIntro: "مجموعة شخصية من الصور واللحظات كما أراها.",
    contentTitle: "الحكاية خلف كل لقطة", contentIntro: "أصنع محتوى رياضيًا بالعربية عن اللاعبين واللحظات الفاصلة والخصومات الكروية؛ لأن كرة القدم أكبر من تسعين دقيقة.",
    projectsTitle: "أشياء أعمل على بنائها.", projectsIntro: "مساحة للتجارب والأفكار والمشاريع الرقمية حين تكتمل ملامحها.",
    connectTitle: "لنبقَ على تواصل.", connectIntro: "يمكنك أن تجدني على الإنترنت.",
    placeholder: "لم يُضف بعد", emptyProject: "سأشارك هنا مشاريعي الشخصية عندما تصبح جاهزة.", videoWatch: "شاهد على يوتيوب", footballTopics: ["قصص اللاعبين", "لحظات لا تُنسى", "الخصومات", "الانتقالات"],
    channelEyebrow: "كرة القدم كما أراها", channelName: "إبراهيم سعدون", channelHandle: "@ibrahimalsadon", channelPitch: "حكايات رياضية قصيرة بالعربية عن أبرز نجوم كرة القدم ولحظاتها. شاهد قصة، وكن قريبًا من الحكاية القادمة.", channelInvite: "شاهد حكاياتي الكروية", shortsHeading: "حكايات تستحق المشاهدة", shortsLabel: "على يوتيوب",
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
export const videos: { title: Record<Locale, string>; platform: Record<Locale, string>; thumbnail: string | null; url?: string }[] = [
  { title: { en: "How did Hafidh Darraji know Mahrez would score?", ar: "كيف عرف حفيظ دراجي أن محرز سيسجل؟ 😱🇩🇿" }, platform: { en: "YouTube Short · Mahrez story", ar: "Short يوتيوب · حكاية محرز" }, thumbnail: "https://i.ytimg.com/vi/wVcvMU0LUSU/hqdefault.jpg", url: "https://www.youtube.com/shorts/wVcvMU0LUSU" },
  { title: { en: "Rooney’s overhead kick that stunned Fares Awad", ar: "مقصية روني اللي جنّنت فارس عوض! 🤯 «هذا لا يحدث كل يوم»" }, platform: { en: "YouTube Short · Iconic moment", ar: "Short يوتيوب · لقطة تاريخية" }, thumbnail: "https://i.ytimg.com/vi/q7WNKKHc0ac/hqdefault.jpg", url: "https://www.youtube.com/shorts/q7WNKKHc0ac" },
  { title: { en: "“There’s Something…” — Chaouali before Madrid’s comeback", ar: "«فمّا حاجة!».. إحساس عصام الشوالي قبل ريمونتادا ريال مدريد ضد السيتي 🔥😳" }, platform: { en: "YouTube Short · Football moment", ar: "Short يوتيوب · لحظة كروية" }, thumbnail: "https://i.ytimg.com/vi/98rv4ImC-BM/hqdefault.jpg", url: "https://www.youtube.com/shorts/98rv4ImC-BM" },
  { title: { en: "Haaland to Barcelona? Laporta’s unexpected plan", ar: "هالاند إلى برشلونة؟ خطة لابورتا بسبب أزمة مانشستر سيتي 😳🔥" }, platform: { en: "YouTube Short · Transfer story", ar: "Short يوتيوب · قصة انتقالات" }, thumbnail: "https://i.ytimg.com/vi/6gu6RyLVj1E/hqdefault.jpg", url: "https://www.youtube.com/shorts/6gu6RyLVj1E" }
];
export const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@ibrahimalsadon" }, { label: "Instagram", href: "https://www.instagram.com/ibrahimalsadon/?hl=en" }, { label: "TikTok", href: "https://www.tiktok.com/@ibrahimalsadon" },
  { label: "GitHub", href: "https://github.com/6ibo" }
];
