import React from 'react';
import { motion } from 'framer-motion';

const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'NVMe SSD storage and optimized networks deliver sub-millisecond response times for all your applications.' },
    { icon: '🛡️', title: 'DDoS Protection', description: 'Enterprise-grade DDoS mitigation keeps your services protected against even the largest volumetric attacks.' },
    { icon: '🕐', title: '24/7 Support', description: 'Our expert team is available around the clock via live chat, Discord, and ticket system.' },
    { icon: '🌍', title: 'Global Network', description: 'Strategically placed data centers across multiple continents ensure low latency worldwide.' },
    { icon: '🖥️', title: 'Easy Management', description: 'Intuitive control panel with one-click installs, automated backups, and real-time monitoring.' },
    { icon: '💰', title: 'Best Pricing', description: 'Premium infrastructure at unbeatable prices. No hidden fees, no surprises — just pure value.' },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
};

export default function WhyChooseUs() {
    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-dark/10 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-orange font-body font-semibold text-sm tracking-widest uppercase">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
                        Built for <span className="text-orange text-glow">Performance</span>
                    </h2>
                    <p className="text-steel/80 font-body text-lg max-w-2xl mx-auto">
                        We combine cutting-edge infrastructure with passionate support to deliver the hosting experience you deserve.
                    </p>
                    <div className="divider-gradient w-24 mx-auto mt-6" />
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            className="group relative p-6 rounded-2xl glass hover:shadow-orange-glow transition-all duration-500 cursor-default"
                        >
                            {/* Hover glow border effect */}
                            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-orange/40 transition-all duration-500" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center text-2xl mb-4 group-hover:shadow-orange-glow group-hover:scale-110 transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-steel/80 font-body text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
