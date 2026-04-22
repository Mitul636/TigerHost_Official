import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CTABanner() {
    const { settings } = useApp();

    return (
        <section className="relative py-20 px-4 overflow-hidden">
            <div className="max-w-5xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D2028] via-dark to-[#0D2028] animate-gradient" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D2028]/30" />

                    {/* Glow accents */}
                    <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-orange/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-dark/20 rounded-full blur-[80px]" />

                    {/* Content */}
                    <div className="relative z-10 text-center py-16 px-6 md:px-12">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                            Ready to Get <span className="text-orange text-glow">Started?</span>
                        </h2>
                        <p className="text-steel/90 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Join thousands of happy customers enjoying premium hosting at unbeatable prices. Deploy in seconds.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a href="#plans" className="btn-primary !px-8 !py-3 !text-lg flex items-center gap-2 group">
                                Browse Plans
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={settings.discordLink || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline !px-8 !py-3 !text-lg flex items-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Join Discord
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
