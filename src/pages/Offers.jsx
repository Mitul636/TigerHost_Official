import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Copy, Check, ExternalLink, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Offers() {
    const { offers, formatPrice, currency, settings } = useApp();
    const activeOffers = offers.filter(o => o.active);
    const [copied, setCopied] = useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

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
                        🔥 Special <span className="text-orange">Offers</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-steel font-body text-lg"
                    >
                        Limited time deals — grab before they expire!
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activeOffers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-2xl relative overflow-hidden group hover:glow-orange-lg transition-all duration-500"
                        >
                            {/* Hot Badge */}
                            <div className="absolute top-4 right-4 animate-bounce">
                                <span className={`px-3 py-1 rounded-full font-heading text-[10px] font-bold tracking-widest uppercase shadow-lg ${
                                    offer.badge === 'HOT' ? 'bg-red-500 text-white shadow-red-500/20' : 
                                    offer.badge === 'LIMITED' ? 'bg-orange text-white shadow-orange/20' : 
                                    'bg-blue-500 text-white shadow-blue-500/20'
                                }`}>
                                    {offer.badge}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">{offer.title}</h3>
                                <p className="text-steel/70 text-sm font-body leading-relaxed">{offer.description}</p>
                            </div>

                            <div className="flex items-end gap-3 mb-8">
                                <div key={currency} className="flex flex-col price-update-fade">
                                    <span className="text-steel/40 text-sm line-through font-body">
                                        {formatPrice(offer.priceINR_old, offer.priceBDT_old, offer.priceUSD_old)}
                                    </span>
                                    <span className="text-3xl font-heading font-bold text-orange">
                                        {formatPrice(offer.priceINR_new, offer.priceBDT_new, offer.priceUSD_new)}
                                    </span>
                                </div>
                                <span className="text-xs text-steel/50 mb-1 font-body">/ month</span>
                            </div>

                            {offer.code && (
                                <div className="mb-8">
                                    <label className="block text-xs font-heading font-bold text-steel/50 uppercase tracking-widest mb-2">Promo Code</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-heading font-bold text-white tracking-widest">
                                            {offer.code}
                                        </div>
                                        <button 
                                            onClick={() => handleCopy(offer.code)}
                                            className="p-3 bg-orange/10 hover:bg-orange text-orange hover:text-white rounded-lg transition-all"
                                        >
                                            {copied === offer.code ? <Check size={20} /> : <Copy size={20} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {offer.expiry && (
                                <div className="flex items-center gap-2 mb-8 text-steel/60 text-xs font-body">
                                    <Clock size={14} className="text-orange" />
                                    <span>Expires: {new Date(offer.expiry).toLocaleDateString()}</span>
                                </div>
                            )}

                            {offer.planSlug ? (
                                <Link 
                                    to={`/order/${offer.planSlug}`}
                                    className="btn-primary w-full flex items-center justify-center gap-2 group/btn"
                                >
                                    Claim This Offer <Rocket size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Link>
                            ) : (
                                <button 
                                    onClick={() => {
                                        const baseUrl = settings.gamePanelUrl || 'https://billing.tigerhost.com';
                                        const promo = offer.code ? `&promocode=${offer.code}` : '';
                                        window.open(`${baseUrl}/index.php?rp=/store&currency=${currency}${promo}`, '_blank');
                                    }}
                                    className="btn-primary w-full flex items-center justify-center gap-2 group/btn"
                                >
                                    Claim Offer <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
