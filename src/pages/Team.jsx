import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Twitter, Instagram } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Team() {
    const { team } = useApp();
    const activeMembers = team.filter(m => m.active).sort((a, b) => a.order - b.order);

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
                        Meet Our <span className="text-orange relative">
                            Team
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-orange rounded-full"></span>
                        </span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-steel font-body text-lg"
                    >
                        The people behind TigerHost
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl group hover:glow-orange transition-all duration-300"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <img 
                                    src={member.avatar} 
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-full border-2 border-orange/30 group-hover:border-orange transition-colors"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-orange text-white p-2 rounded-lg shadow-lg">
                                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider">{member.role}</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-white text-center mb-2">{member.name}</h3>
                            <p className="text-orange font-heading text-sm text-center mb-4 uppercase tracking-widest">{member.role}</p>
                            <p className="text-steel/70 text-sm text-center mb-8 font-body leading-relaxed">
                                {member.bio}
                            </p>

                            <div className="flex justify-center gap-4">
                                {member.discord && (
                                    <a href={member.discord} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-orange/20 text-steel hover:text-orange rounded-lg transition-all">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                                    </a>
                                )}
                                {member.twitter && member.twitter !== '#' && (
                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-orange/20 text-steel hover:text-orange rounded-lg transition-all">
                                        {/* Lucide Twitter doesn't work for X, using simple svg or lucide */}
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </a>
                                )}
                                {member.instagram && member.instagram !== '#' && (
                                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-orange/20 text-steel hover:text-orange rounded-lg transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
