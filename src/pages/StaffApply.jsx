import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ListChecks, MessageSquare, ChevronRight, AlertCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function StaffApply() {
    const { staffApply } = useApp();
    const isClosed = staffApply.status === 'Closed';

    return (
        <div className="min-h-screen bg-[#0D2028]">
            <Navbar />
            
            <div className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-white mb-4"
                    >
                        Join Our Team <span className="text-orange">🐯</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-steel font-body text-lg"
                    >
                        Think you have what it takes? Apply below!
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Status Banner */}
                    {isClosed ? (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-12 flex items-center gap-4 text-red-500">
                            <AlertCircle size={24} />
                            <div>
                                <h3 className="font-heading font-bold text-xl uppercase tracking-wider">Applications currently CLOSED</h3>
                                <p className="font-body text-sm text-red-500/70">Check back later or join our Discord for announcements.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-12 flex items-center gap-4 text-green-500">
                            <CheckCircle2 size={24} />
                            <div>
                                <h3 className="font-heading font-bold text-xl uppercase tracking-wider">Applications are OPEN!</h3>
                                <p className="font-body text-sm text-green-500/70">We are actively looking for new members to join our staff team.</p>
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-8 rounded-3xl mb-8 border-orange/40 hover:glow-orange transition-all duration-500"
                    >
                        <h2 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                            <ListChecks className="text-orange" />
                            Requirements
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {staffApply.requirements.map((req, i) => (
                                <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange/20 transition-colors">
                                    <CheckCircle2 size={18} className="text-orange flex-shrink-0" />
                                    <span className="text-steel/80 font-body text-sm">{req}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {staffApply.steps.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-6 rounded-2xl flex gap-6 items-center group hover:bg-white/5 transition-all"
                            >
                                <div className="w-12 h-12 flex-shrink-0 bg-orange/10 border border-orange/20 text-orange rounded-2xl flex items-center justify-center font-heading font-bold text-xl group-hover:bg-orange group-hover:text-white transition-all">
                                    {i + 1}
                                </div>
                                <p className="text-white font-body font-medium">{step}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Discord CTA */}
                    <div className="glass p-12 rounded-3xl text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-50"></div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-6">Ready to Apply?</h2>
                        <p className="text-steel/70 font-body mb-8 max-w-lg mx-auto">
                            Our application process is handled through our Discord server to ensure real-time communication.
                        </p>
                        <a 
                            href={staffApply.discordLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-3 px-10 py-4 rounded-xl font-heading font-bold text-white shadow-lg transition-all hover:-translate-y-1 ${
                                isClosed ? 'bg-steel/20 cursor-not-allowed grayscale' : 'bg-[#5865F2] hover:bg-[#4752C4] shadow-[#5865F2]/20'
                            }`}
                            onClick={(e) => isClosed && e.preventDefault()}
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                            Apply on Discord
                            <ExternalLink size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
