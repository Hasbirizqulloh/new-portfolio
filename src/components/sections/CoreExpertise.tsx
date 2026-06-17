import React from "react";
import { Layers, Bot, Database } from "lucide-react";

interface CoreExpertiseProps {
    settings?: Record<string, string>;
}

export function CoreExpertise({ settings }: CoreExpertiseProps) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Quote Section */}
            <section className="border-y border-[#2f333a] py-10 mb-20">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                    <p className="text-xl text-text-main font-light leading-relaxed whitespace-pre-wrap">
                        {settings?.quoteText || `"Passionate about leveraging cutting-edge AI technologies to solve real-world problems. I combine robust engineering principles with data science to build products that matter."`}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            "Fullstack Engineer",
                            "AI Engineer",
                            "Data Enthusiast",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 rounded-full bg-surface-dark border border-[#2f333a] text-sm font-medium text-text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                            >
                                # {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Grid */}
            <section className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted">
                        Core Expertise
                    </h3>
                    <div className="h-px bg-[#2f333a] flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ExpertiseCard
                        icon={<Layers size={24} />}
                        title="Fullstack Development"
                        description="End-to-end web applications using React, Node.js, and modern cloud infrastructure."
                    />
                    <ExpertiseCard
                        icon={<Bot size={24} />}
                        title="AI & Machine Learning"
                        description="Integrating LLMs and predictive models into production environments with Python."
                    />
                    <ExpertiseCard
                        icon={<Database size={24} />}
                        title="Data Engineering"
                        description="Designing scalable pipelines and warehouses for large-scale data processing."
                    />
                </div>
            </section>
        </div>
    );
}

function ExpertiseCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="group p-6 rounded-xl bg-surface-dark border border-[#2f333a] hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="w-10 h-10 rounded-lg bg-[#151619] border border-[#2f333a] flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                {icon}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-sm text-text-muted">{description}</p>
        </div>
    );
}
