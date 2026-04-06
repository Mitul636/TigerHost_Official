import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Zap, MessageSquare, Twitter, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
    const { contactSettings } = useApp();

    const contactInfo = [
        { icon: <Mail className="text-orange" />, title: 'Email Address', value: contactSettings.email, sub: 'Click to copy' },
        { icon: <Clock className="text-orange" />, title: 'Support Hours', value: contactSettings.hours, sub: 'Local time' },
        { icon: <Zap className="text-orange" />, title: 'Response Time', value: contactSettings.responseTime, sub: 'Average' },
    ];

    const socials = [
        { icon: <Twitter size={20} />, link: contactSettings.socials.twitter, name: 'Twitter' },
        { icon: <Instagram size={20} />, link: contactSettings.socials.instagram, name: 'Instagram' },
        { icon: <Facebook size={20} />, link: contactSettings.socials.facebook, name: 'Facebook' },
    ];

    return (
        <div className="min-h-screen bg-[#0D2028]">
            <Navbar />
            
            <div className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-white mb-4"
                    >
                        Get In <span className="text-orange">Touch</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-steel font-body text-lg"
                    >
                        We're here to help 24/7
                    </motion.p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Discord Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:glow-orange transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-32 h-32" fill="#5865F2" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                        </div>

                        <div className="relative">
                            <h2 className="text-3xl font-heading font-bold text-white mb-8 flex items-center gap-4">
                                <span className="p-3 bg-[#5865F2]/10 rounded-2xl"><MessageSquare className="text-[#5865F2]" /></span>
                                Join Our Discord
                            </h2>

                            <div className="space-y-6 mb-10">
                                {[
                                    { step: '1', text: 'Click the button below to join our server' },
                                    { step: '2', text: 'Go to the #open-ticket channel' },
                                    { step: '3', text: 'Click "Create Ticket" button' },
                                    { step: '4', text: 'Describe your issue and wait for staff' },
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <span className="w-8 h-8 flex-shrink-0 bg-orange/10 border border-orange/20 text-orange rounded-full flex items-center justify-center font-heading font-bold text-sm">
                                            {s.step}
                                        </span>
                                        <p className="text-steel/80 font-body text-sm pt-1.5">{s.text}</p>
                                    </div>
                                ))}
                            </div>

                            <a 
                                href={contactSettings.discordInvite} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-heading font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#5865F2]/20 transition-all hover:-translate-y-1"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                                Join Discord Server
                            </a>
                        </div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {contactInfo.map((info, i) => (
                            <div key={i} className="glass p-6 rounded-2xl flex items-center gap-6 group hover:border-orange/50 transition-colors">
                                <div className="p-4 bg-orange/10 rounded-xl group-hover:scale-110 transition-transform">
                                    {info.icon}
                                </div>
                                <div>
                                    <h4 className="text-white font-heading font-bold text-lg mb-0.5">{info.title}</h4>
                                    <p className="text-orange font-heading text-xl">{info.value}</p>
                                    <p className="text-steel/50 text-xs font-body">{info.sub}</p>
                                </div>
                            </div>
                        ))}

                        <div className="glass p-8 rounded-2xl">
                            <h4 className="text-white font-heading font-bold text-lg mb-6">Social Media</h4>
                            <div className="grid grid-cols-3 gap-4">
                                {socials.map((social, i) => (
                                    <a 
                                        key={i} 
                                        href={social.link} 
                                        className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-orange/10 text-steel hover:text-orange rounded-xl transition-all border border-transparent hover:border-orange/30 group"
                                    >
                                        <div className="group-hover:scale-110 transition-transform">{social.icon}</div>
                                        <span className="text-[10px] font-heading font-bold uppercase tracking-widest">{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
