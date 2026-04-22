import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Services() {
    const { services, plans } = useApp();
    const visibleServices = services.filter(s => s.visible);

    const getPlanCount = (serviceName) => {
        return plans.filter(p => p.service === serviceName && p.active).length;
    };

    return (
        <section id="services" className="relative py-24 px-4 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-orange font-body font-semibold text-sm tracking-widest uppercase">Our Services</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
                        What We <span className="text-orange text-glow">Offer</span>
                    </h2>
                    <p className="text-steel/80 font-body text-lg max-w-2xl mx-auto">
                        From game servers to cloud infrastructure — we've got the perfect hosting solution for every need.
                    </p>
                    <div className="divider-gradient w-24 mx-auto mt-6" />
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleServices.map((service, i) => (
                        <motion.a
                            key={service.id}
                            href="#plans"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative p-6 rounded-2xl glass hover:shadow-orange-glow transition-all duration-500 cursor-pointer block"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#0D2028]/30 border border-[#0D2028]/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:shadow-orange-glow transition-all duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-heading font-semibold text-white mb-2">
                                    {service.name}
                                </h3>

                                <p className="text-steel/80 font-body text-sm leading-relaxed mb-4">
                                    {service.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-body text-steel/60">
                                        {getPlanCount(service.name)} plans available
                                    </span>
                                    <span className="text-orange text-sm font-body font-semibold group-hover:translate-x-1 transition-transform duration-300">
                                        Explore →
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
