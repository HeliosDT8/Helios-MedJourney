"use client";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {SITE_NAME} from "@/lib/seo";
export function Navbar(){const [open,setOpen]=useState(false);const pathname=usePathname();const links=[["Employers","/employers"],["Physicians","/physicians"],["Pricing","/pricing"],["About us","/about"],["Contact","/contact"]];return <header className="site-header"><div className="container nav-shell"><Link href="/" className="brand" aria-label={`${SITE_NAME} home`}><Image className="brand-emblem" src="/global-healthcare-h-emblem.png" alt="" width={1536} height={1024} priority/><span>{SITE_NAME}</span></Link><button className="menu-toggle" aria-expanded={open} aria-label="Toggle navigation" onClick={()=>setOpen(!open)}><i/><i/></button><nav className={open?"nav-links open":"nav-links"} aria-label="Main navigation">{links.map(([label,url])=>{const active=pathname===url||(url==="/employers"&&pathname.startsWith("/employers/"))||(url==="/about"&&pathname==="/approach");return <Link key={url} href={url} aria-current={active?"page":undefined} className={active?"active":undefined} onClick={()=>setOpen(false)}>{label}</Link>})}<Link className="nav-cta" href="/employers/onboarding" onClick={()=>setOpen(false)}>Start clinic onboarding <span>↗</span></Link></nav></div></header>}
