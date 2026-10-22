"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Github, Instagram, Menu, Music2, X, Youtube } from "lucide-react";
import { copy, photos, projects, sitePath, socialLinks, videos, type Locale } from "@/data/content";

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const navIds = ["home", "about", "gallery", "content", "projects", "connect"];
export function Site() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();
  const t = copy[locale];
  const rtl = locale === "ar";
  const links = useMemo(() => socialLinks.map((item) => ({ ...item, icon: item.label === "YouTube" ? Youtube : item.label === "Instagram" ? Instagram : item.label === "TikTok" ? Music2 : item.label === "GitHub" ? Github : ArrowUpRight })), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  useEffect(() => {
    const sections = navIds.map((id) => document.getElementById(id)).filter((item): item is HTMLElement => !!item);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-18% 0px -58% 0px", threshold: [0, .2, .45] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduceMotion) return;
    document.documentElement.classList.add("motion-ready");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".site > .section"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));
    return () => { observer.disconnect(); document.documentElement.classList.remove("motion-ready"); };
  }, [reduceMotion]);
  useEffect(() => {
    if (activePhoto === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight") setActivePhoto((n) => n === null ? 0 : (n + 1) % photos.length);
      if (event.key === "ArrowLeft") setActivePhoto((n) => n === null ? 0 : (n - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [activePhoto]);
  const jump = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); };
  const photo = (index: number, className = "") => {
    const item = photos[index];
    return <button key={item.id} aria-label={`${t.gallery}: ${item.label[locale]}`} className={`photo-tile ${item.shape} ${className}`} onClick={() => setActivePhoto(index)} onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--shift-x", `${((event.clientX - rect.left) / rect.width - .5) * 7}px`); event.currentTarget.style.setProperty("--shift-y", `${((event.clientY - rect.top) / rect.height - .5) * 7}px`); }} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--shift-x", "0px"); event.currentTarget.style.setProperty("--shift-y", "0px"); }}>
      <img src={sitePath(item.src)} alt={item.label[locale]} loading="lazy" />
      <span className="tile-open"><ArrowUpRight size={18} /></span>
    </button>;
  };

  return <main dir={rtl ? "rtl" : "ltr"} className={rtl ? "site arabic" : "site"}>
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <a className="wordmark" href="#home" onClick={(e) => { e.preventDefault(); jump("home"); }}>{rtl ? <>إبراهيم <span>سعدون</span></> : "Ibrahim Alsaadoun"}</a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label={rtl ? "التنقل الرئيسي" : "Main navigation"}>
        {t.nav.map((label, i) => <button className={activeSection === navIds[i] ? "active" : ""} aria-current={activeSection === navIds[i] ? "location" : undefined} key={navIds[i]} onClick={() => jump(navIds[i])}>{label}</button>)}
      </nav>
      <div className="nav-actions"><button className="language" onClick={() => setLocale(rtl ? "en" : "ar")} aria-label={rtl ? "Switch to English" : "التبديل إلى العربية"}>{rtl ? "EN" : "عربي"}</button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>

    <section className="hero" id="home">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .7 }}>IBRAHIM ALSAADOUN <span>·</span> {rtl ? "مرحباً" : "PERSONAL SPACE"}</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ duration: .8, delay: .08 }}>{rtl ? "إبراهيم\nسعدون" : <>Ibrahim<br />Alsaadoun<span className="period">.</span></>}</motion.h1>
        <motion.p className="hero-role" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .7, delay: .18 }}>{t.role}</motion.p>
        <motion.p className="hero-lead" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .7, delay: .25 }}>{t.lead}</motion.p>
        <motion.div className="hero-buttons" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .7, delay: .32 }}><button className="button dark" onClick={() => jump("about")}>{t.story}<ArrowUpRight size={16} /></button><button className="button plain" onClick={() => jump("projects")}>{t.work}<ArrowUpRight size={16} /></button></motion.div>
      </div>
      <motion.div className="hero-portrait hero-brand-stage" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, ease: "easeOut" }}>
        <div className="hero-logo-crop"><img src={sitePath("/images/channel-logo.jpg")} alt={rtl ? "شعار قناة إبراهيم سعدون" : "Ibrahim Alsaadoun channel logo"} fetchPriority="high" /></div>
        <div className="portrait-caption"><span>{rtl ? "تقنية · إبداع · كرة قدم" : "TECHNOLOGY · CREATIVITY · FOOTBALL"}</span><ArrowDown size={15} /></div>
      </motion.div>
      <button className="scroll-cue" onClick={() => jump("about")}><span>{t.scroll}</span><ArrowDown size={15} /></button>
    </section>

    <section className="about section" id="about"><div className="section-kicker">01 / {t.nav[1]}</div><div className="about-grid"><div><h2>{t.aboutTitle}</h2><p className="body-large">{t.bio}</p><button className="text-link" onClick={() => jump("connect")}>{t.nav[5]} <ArrowUpRight size={16} /></button></div>{photo(0, "about-photo")}</div></section>

    <section className="gallery-section section" id="gallery"><div className="section-kicker">02 / {t.gallery}</div><div className="section-heading"><h2>{t.galleryTitle.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h2><p>{t.galleryIntro}</p></div><div className="gallery-grid">{photos.slice(1).map((_, index) => photo(index + 1, "gallery-item"))}</div></section>

    <section className="content-section section" id="content"><div className="section-kicker">03 / {t.nav[3]}</div><div className="content-panel"><div className="content-copy"><p className="eyebrow">{rtl ? "حكايات من عالم كرة القدم" : "STORIES FROM THE WORLD OF FOOTBALL"}</p><h2>{t.contentTitle}<span className="period">.</span></h2><p>{t.contentIntro}</p><div className="football-topics">{t.footballTopics.map((topic) => <span key={topic}>{topic}</span>)}</div><a className="button light" href={socialLinks[0].href} target="_blank" rel="noreferrer">{t.youtube}<ArrowUpRight size={16} /></a></div><a className="feature-frame" href={videos[0]?.url || socialLinks[0].href} target="_blank" rel="noreferrer" aria-label={t.videoWatch}>{videos[0]?.thumbnail && <img className="feature-photo" src={sitePath(videos[0].thumbnail)} alt="" loading="lazy" />}<div className="feature-mark"><span className="play-mark">▶</span></div><span>{t.featured}</span><span className="feature-watch">{t.videoWatch}<ArrowUpRight size={15} /></span></a></div><div className="video-row">{videos.map((video, i) => <article className="video-card" key={video.src || video.url || i}><a className="video-thumb video-thumb-link" href={video.url || socialLinks[0].href} target="_blank" rel="noreferrer" aria-label={video.title[locale]}>{video.thumbnail ? <img src={sitePath(video.thumbnail)} alt="" loading="lazy" /> : <span>▶</span>}<span className="video-play">▶</span></a><div className="video-title"><span>{video.title[locale]}<small>{video.platform[locale]}</small></span><a className="video-watch" href={video.url || socialLinks[0].href} target="_blank" rel="noreferrer"><Youtube size={15} />{t.videoWatch}<ArrowUpRight size={15} /></a></div>{video.src && <details className="local-video-details"><summary>{t.localVideo}</summary><video controls playsInline preload="none" aria-label={video.title[locale]}><source src={sitePath(video.src)} type="video/mp4" />{rtl ? "المتصفح لا يدعم تشغيل الفيديو." : "Your browser does not support video."}</video></details>}</article>)}</div></section>

    <section className="projects-section section" id="projects"><div className="section-kicker">04 / {t.nav[4]}</div><div className="section-heading project-heading"><h2>{t.projectsTitle}</h2><p>{t.projectsIntro}</p></div><div className="project-grid">{projects.length ? projects.map((project) => <a href={sitePath(`/projects/${project.slug}/`)} className="project-card" key={project.slug}><div className="project-cover">{project.cover ? <img src={sitePath(project.cover)} alt="" loading="lazy" /> : <span>{t.projectPlaceholder}</span>}<span className="project-arrow"><ArrowUpRight /></span></div><h3>{project.title[locale]}</h3><p>{project.description[locale]}</p><small>{project.technologies.join(" · ")}</small></a>) : <div className="empty-project"><span className="empty-icon">✳</span><p>{t.emptyProject}</p><span>{t.placeholder}</span></div>}</div></section>

    <section className="connect-section section" id="connect"><div className="section-kicker">05 / {t.nav[5]}</div><div className="connect-layout"><div><h2>{t.connectTitle}</h2><p>{t.connectIntro}</p></div><div className="social-list">{links.map(({ label, href, icon: Icon }) => <a key={label} href={href || undefined} aria-disabled={!href} onClick={!href ? (e) => e.preventDefault() : undefined}><span className="social-icon"><Icon size={19} /></span><span>{label}</span>{href ? <ArrowUpRight size={18} /> : <small>{t.placeholder}</small>}</a>)}</div></div></section>
    <footer className="footer"><span>© {new Date().getFullYear()} Ibrahim Alsaadoun</span><span>{t.footer}</span><button onClick={() => jump("home")}>↑</button></footer>

    <AnimatePresence>{activePhoto !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={t.gallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}><button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close"><X /></button><button className="lightbox-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto - 1 + photos.length) % photos.length); }}><ChevronLeft /></button><div className="lightbox-image" onClick={(e) => e.stopPropagation()}>{photos[activePhoto].src ? <img src={sitePath(photos[activePhoto].src)} alt={photos[activePhoto].label[locale]} /> : <div className="portrait-placeholder"><span className="portrait-monogram">إ</span><span>{t.placeholder}</span></div>}<p>{photos[activePhoto].label[locale]}</p></div><button className="lightbox-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto + 1) % photos.length); }}><ChevronRight /></button></motion.div>}</AnimatePresence>
  </main>;
}
