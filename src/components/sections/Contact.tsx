"use client";

import React, { useState } from "react";
import { Mail, MapPin, Link as LinkIcon, Code2, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (result.success) {
                alert("Message sent successfully!");
                (e.target as HTMLFormElement).reset();
            } else {
                alert(`Failed to send message: ${result.error || result.message}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                {/* Left Column: Info */}
                <div className="flex flex-col gap-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-4">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Touch</span>
                        </h1>
                        <p className="text-lg text-text-muted leading-relaxed max-w-md">
                            Interested in collaborating on AI models, scalable backend systems, or just want to say hi? Drop me a message below.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 mt-4">
                        <a href="mailto:hasbirizqulloh95@gmail.com" className="flex items-start gap-4 group cursor-pointer w-fit">
                            <div className="w-12 h-12 rounded-xl bg-surface-dark border border-[#2f333a] group-hover:border-primary/50 group-hover:shadow-neon flex items-center justify-center text-primary transition-all">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted mb-1 font-medium">Email Address</p>
                                <p className="text-lg text-white font-semibold group-hover:text-primary transition-colors">
                                    hasbirizqulloh95@gmail.com
                                </p>
                            </div>
                        </a>

                        <div className="flex items-start gap-4 group cursor-pointer w-fit">
                            <div className="w-12 h-12 rounded-xl bg-surface-dark border border-[#2f333a] group-hover:border-primary/50 group-hover:shadow-neon flex items-center justify-center text-primary transition-all">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-text-muted mb-1 font-medium">Location</p>
                                <p className="text-lg text-white font-semibold">
                                    Indonesia
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6">Connect on Socials</p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-surface-dark border border-[#2f333a] hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center text-white hover:text-primary transition-all hover:-translate-y-1">
                                <LinkIcon className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-surface-dark border border-[#2f333a] hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center text-white hover:text-primary transition-all hover:-translate-y-1">
                                <Code2 className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-surface-dark border border-[#2f333a] hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center text-white hover:text-primary transition-all hover:-translate-y-1">
                                <MessageSquare className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-surface-dark rounded-2xl border border-[#2f333a] p-8 lg:p-10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-muted" htmlFor="name">Full Name</label>
                                <input
                                    className="w-full bg-[#151619] border border-[#2f333a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon transition-all placeholder:text-text-muted/50"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    type="text"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-text-muted" htmlFor="email">Email Address</label>
                                <input
                                    className="w-full bg-[#151619] border border-[#2f333a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon transition-all placeholder:text-text-muted/50"
                                    id="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    type="email"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-text-muted" htmlFor="subject">Subject</label>
                            <input
                                className="w-full bg-[#151619] border border-[#2f333a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon transition-all placeholder:text-text-muted/50"
                                id="subject"
                                name="subject"
                                placeholder="Project Inquiry"
                                type="text"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-text-muted" htmlFor="message">Message</label>
                            <textarea
                                className="w-full bg-[#151619] border border-[#2f333a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-neon transition-all placeholder:text-text-muted/50 resize-none"
                                id="message"
                                name="message"
                                placeholder="Tell me about your project..."
                                rows={5}
                                required
                                disabled={isSubmitting}
                            ></textarea>
                        </div>

                        <button
                            className="mt-4 w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-neon active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
