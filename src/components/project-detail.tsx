"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { sitePath, type Locale } from "@/data/content";

type Project = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  technologies: string[];
  cover: string | null;
  gallery: string[];
  url?: string;
};

export function ProjectDetail({ project }: { project: Project }) {
  const [locale, setLocale] = useState<Locale>("en");
  const rtl = locale === "ar";
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);
  return <main className="project-page" dir={rtl ? "rtl" : "ltr"}>
    <div className="project-toolbar"><a href={sitePath("/")}>{rtl ? "← إبراهيم سعدون" : "← Ibrahim Alsaadoun"}</a><button className="language" onClick={() => setLocale(rtl ? "en" : "ar")}>{rtl ? "EN" : "عربي"}</button></div>
    <p className="eyebrow">{rtl ? "مشروع" : "PROJECT"}</p>
    <h1>{project.title[locale]}</h1>
    <p>{project.description[locale]}</p>
    <div className="project-cover">{project.cover ? <img src={sitePath(project.cover)} alt={project.title[locale]} /> : <span>{rtl ? "صورة المشروع" : "Project image"}</span>}</div>
    <h2>{rtl ? "نظرة عامة" : "Overview"}</h2><p>{project.description[locale]}</p>
    {project.gallery.length > 0 && <div className="project-detail-gallery">{project.gallery.map((image) => <img key={image} src={sitePath(image)} alt={project.title[locale]} loading="lazy" />)}</div>}
    <h2>{rtl ? "التقنيات" : "Technology"}</h2><p>{project.technologies.join(" · ")}</p>
    {project.url && <a className="text-link" href={project.url} target="_blank" rel="noreferrer">{rtl ? "زيارة المشروع" : "Visit project"}<ArrowUpRight size={16} /></a>}
  </main>;
}
