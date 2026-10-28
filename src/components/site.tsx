"use client";
import { useEffect, useMemo, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Github, Instagram, Menu, Music2, Play, X } from "lucide-react";
import { copy, photos, projects, sitePath, socialLinks, videos, type Locale } from "@/data/content";

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const navIds = ["home", "about", "gallery", "content", "projects", "connect"];
function YouTubeMark() {
  return <svg className="youtube-mark" viewBox="0 0 24 17" aria-hidden="true" focusable="false"><rect width="24" height="17" rx="5" fill="currentColor" /><path d="M10 5.15a.8.8 0 0 0-1.2.69v5.32a.8.8 0 0 0 1.2.69l4.6-2.66a.8.8 0 0 0 0-1.38L10 5.15Z" fill="white" /></svg>;
}
export function Site() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();
  const t = copy[locale];
  const rtl = locale === "ar";
  const links = useMemo(() => socialLinks.map((item) => ({ ...item, icon: item.label === "YouTube" ? YouTubeMark : item.label === "Instagram" ? Instagram : item.label === "TikTok" ? Music2 : item.label === "GitHub" ? Github : ArrowUpRight })), []);

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
  const tiltStage = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 5}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${(x + .5) * 100}%`);
    event.currentTarget.style.setProperty("--glow-y", `${(y + .5) * 100}%`);
  };
  const resetStage = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--glow-x", "50%");
    event.currentTarget.style.setProperty("--glow-y", "50%");
  };
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
        <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ duration: .8, delay: .08 }}>{rtl ? "إبراهيم\nسعدون" : <>Ibrahim<br />Alsaadoun<span className="period">.</span></>}</motion.h1>
        <motion.p className="hero-role" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .7, delay: .18 }}>{t.role}</motion.p>
        <motion.p className="hero-lead" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .7, delay: .25 }}>{t.lead}</motion.p>
        <motion.div className="hero-buttons" initial="hidden" animate="visible" variants={reveal} transition={{ duration: .7, delay: .32 }}><button className="button dark" onClick={() => jump("about")}>{t.story}<ArrowUpRight size={16} /></button><button className="button plain" onClick={() => jump("projects")}>{t.work}<ArrowUpRight size={16} /></button></motion.div>
      </div>
      <motion.div className="hero-portrait hero-brand-stage" onPointerMove={tiltStage} onPointerLeave={resetStage} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, ease: "easeOut" }}>
        <div className="hero-logo-crop"><img src={sitePath("/images/channel-logo.jpg")} alt={rtl ? "شعار قناة إبراهيم سعدون" : "Ibrahim Alsaadoun channel logo"} fetchPriority="high" /></div>
        <div className="portrait-caption"><span>{rtl ? "تقنية وإبداع وحكايات كرة قدم" : "Technology, creativity & football stories"}</span><ArrowDown size={15} /></div>
      </motion.div>
      <button className="scroll-cue" onClick={() => jump("about")}><span>{t.scroll}</span><ArrowDown size={15} /></button>
    </section>

    <section className="about section" id="about"><div className="about-grid"><div><h2>{t.aboutTitle}</h2><p className="body-large">{t.bio}</p><button className="text-link" onClick={() => jump("connect")}>{t.nav[5]} <ArrowUpRight size={16} /></button></div>{photo(0, "about-photo")}</div></section>

    <section className="gallery-section section" id="gallery"><div className="section-heading"><h2>{t.galleryTitle.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h2><p>{t.galleryIntro}</p></div><div className="gallery-grid">{photos.slice(1).map((_, index) => photo(index + 1, "gallery-item"))}</div></section>

    <section className="content-section section" id="content">
      <div className="content-panel">
        <div className="content-copy">
          <h2>{t.contentTitle}<span className="period">.</span></h2>
          <p>{t.contentIntro}</p>
          <div className="football-topics">{t.footballTopics.map((topic) => <span key={topic}>{topic}</span>)}</div>
        </div>
        <a className="feature-frame" href={videos[0]?.url || socialLinks[0].href} target="_blank" rel="noreferrer" aria-label={videos[0]?.title[locale] || t.videoWatch}>
          {videos[0]?.thumbnail && <img className="feature-photo" src={videos[0].thumbnail.startsWith("http") ? videos[0].thumbnail : sitePath(videos[0].thumbnail)} alt="" loading="lazy" />}
          <span className="feature-topline"><YouTubeMark />{t.featured}</span>
          <span className="feature-play"><Play size={25} fill="currentColor" /></span>
          <span className="feature-caption">{videos[0]?.title[locale]}<small>{t.videoWatch}<ArrowUpRight size={15} /></small></span>
        </a>
      </div>
      <div className="channel-callout">
        <div className="channel-copy-block">
          <div className="channel-identity"><span className="channel-profile-copy"><strong>{t.channelName}</strong><span>{t.channelHandle}</span></span></div>
          <p>{t.channelPitch}</p>
        </div>
        <a className="button dark channel-button" href={socialLinks[0].href} target="_blank" rel="noreferrer"><YouTubeMark />{t.youtube}<ArrowUpRight size={16} /></a>
      </div>
    </section>

    <section className="projects-section section" id="projects"><div className="section-heading project-heading"><h2>{t.projectsTitle}</h2><p>{t.projectsIntro}</p></div><div className="project-grid">{projects.length ? projects.map((project) => <a href={sitePath(`/projects/${project.slug}/`)} className="project-card" key={project.slug}><div className="project-cover">{project.cover ? <img src={sitePath(project.cover)} alt="" loading="lazy" /> : <span>{t.projectPlaceholder}</span>}<span className="project-arrow"><ArrowUpRight /></span></div><h3>{project.title[locale]}</h3><p>{project.description[locale]}</p><small>{project.technologies.join(" · ")}</small></a>) : <div className="empty-project"><span className="empty-icon">✳</span><p>{t.emptyProject}</p></div>}</div></section>

    <section className="connect-section section" id="connect"><div className="connect-layout"><div className="connect-intro"><h2>{t.connectTitle}</h2><p>{t.connectIntro}</p><a className="github-link" href={socialLinks.find(({label}) => label === "GitHub")?.href} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={15} /></a></div><div className="social-cards">{links.filter(({ label }) => ["YouTube", "Instagram", "TikTok"].includes(label)).map(({ label, href, handle, icon: Icon }) => <a className={`social-card social-card-${label.toLowerCase()}`} key={label} href={href || undefined} target="_blank" rel="noreferrer" aria-label={`${t.profileVisit}: ${label} ${handle}`}><span className="social-card-cover"><span className="social-card-icon">{label === "YouTube" ? <YouTubeMark /> : <Icon size={27} strokeWidth={1.8} />}</span></span><span className="social-card-profile"><img src={sitePath("/images/channel-logo.jpg")} alt="" loading="lazy" /><span className="social-card-account"><strong>{t.accountName}</strong><small>{handle}</small></span></span><span className="social-card-bottom"><span className="social-card-label">{label}</span><span className="social-card-visit">{t.profileVisit}<ArrowUpRight size={15} /></span></span></a>)}</div></div></section>
    <footer className="footer"><span>© {new Date().getFullYear()} Ibrahim Alsaadoun</span><span>{t.footer}</span><button onClick={() => jump("home")}>↑</button></footer>

    <AnimatePresence>{activePhoto !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={t.gallery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}><button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close"><X /></button><button className="lightbox-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto - 1 + photos.length) % photos.length); }}><ChevronLeft /></button><div className="lightbox-image" onClick={(e) => e.stopPropagation()}>{photos[activePhoto].src ? <img src={sitePath(photos[activePhoto].src)} alt={photos[activePhoto].label[locale]} /> : <div className="portrait-placeholder"><span className="portrait-monogram">إ</span><span>{t.placeholder}</span></div>}<p>{photos[activePhoto].label[locale]}</p></div><button className="lightbox-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto + 1) % photos.length); }}><ChevronRight /></button></motion.div>}</AnimatePresence>
  </main>;
}
