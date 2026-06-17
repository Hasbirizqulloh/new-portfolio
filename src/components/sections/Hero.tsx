"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, Github, Linkedin, Twitter } from "lucide-react";

interface HeroProps {
    settings?: Record<string, string>;
}

export function Hero({ settings }: HeroProps) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                <div className="flex flex-col items-start gap-6 order-2 md:order-1">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        {settings?.heroBadge || "Available for new opportunities"}
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight whitespace-pre-wrap">
                        {settings?.heroTitleMain || "Fullstack & AI Engineer building"}
                        {" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                            {settings?.heroTitleHighlight || "intelligent systems"}
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg text-text-muted leading-relaxed max-w-xl whitespace-pre-wrap">
                        {settings?.heroDescription || "I design and implement scalable backend architectures and data-driven solutions that bridge the gap between complex algorithms and intuitive user experiences."}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-2">
                        <Link href="/projects">
                            <Button className="px-6 py-6 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-neon border-none">
                                View Projects
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                className="px-6 py-6 rounded-lg border border-[#2f333a] bg-transparent text-white font-medium hover:border-primary/50 hover:bg-surface-dark transition-all hover:scale-105 active:scale-95"
                            >
                                Contact Me
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className="flex justify-center md:justify-end order-1 md:order-2">
                    <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden bg-surface-dark border border-[#2f333a] shadow-neon group">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                                backgroundImage:
                                    "url('/profile.jpg')",
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-background-dark/80 backdrop-blur-sm border border-white/10">
                            <h2 className="text-xl font-bold text-white">{settings?.heroName || "Hasbirizqulloh"}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-primary text-[18px]">
                                    <Github size={18} />
                                </span>
                                <p className="text-sm text-text-muted">
                                    {settings?.heroRole || "Fullstack & AI Engineer"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
