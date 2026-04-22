import React from 'react';
import { motion } from 'framer-motion';
import { Server, Package, Zap, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
    const { services, plans, settings } = useApp();

    const stats = [
        { title: 'Total Services', value: services.length, icon: <Server size={24} />, color: 'text-orange', bg: 'bg-orange/10' },
        { title: 'Total Plans', value: plans.length, icon: <Package size={24} />, color: 'text-[#90E0EF]', bg: 'bg-[#90E0EF]/10' },
        { title: 'Active Plans', value: plans.filter(p => p.active).length, icon: <Zap size={24} />, color: 'text-green-400', bg: 'bg-green-400/10' },
        { title: 'Brand Name', value: settings.brandName || 'TigerHost', icon: <Users size={24} />, color: 'text-purple-400', bg: 'bg-purple-400/10', textOnly: true },
    ];

    return (
        <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-xl p-6 border border-[#0D2028]/30 flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-steel/70 font-body text-sm font-medium mb-1">{stat.title}</p>
                            <p className={`text-2xl font-heading font-bold ${stat.textOnly ? 'text-white text-lg truncate w-24' : 'text-white'}`}>
                                {stat.value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Plans */}
                <div className="glass rounded-xl p-6 border border-[#0D2028]/30">
                    <h2 className="text-xl font-heading font-semibold text-white mb-4 flex items-center gap-2">
                        <Package size={20} className="text-orange" /> Recent Plans
                    </h2>
                    <div className="space-y-3">
                        {plans.slice(-5).reverse().map(plan => (
                            <div key={plan.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0D2028]/50 border border-[#0D2028]/20">
                                <div>
                                    <p className="text-white font-body font-medium">{plan.name}</p>
                                    <p className="text-steel/70 text-xs font-body">{plan.service}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-orange font-heading font-bold text-sm">₹{plan.priceINR}</p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${plan.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {plan.active ? 'Active' : 'Hidden'}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {plans.length === 0 && <p className="text-steel/60 text-sm">No plans available.</p>}
                    </div>
                </div>

                {/* Services List */}
                <div className="glass rounded-xl p-6 border border-[#0D2028]/30">
                    <h2 className="text-xl font-heading font-semibold text-white mb-4 flex items-center gap-2">
                        <Server size={20} className="text-orange" /> Service Categories
                    </h2>
                    <div className="space-y-3">
                        {services.slice(0, 5).map(service => (
                            <div key={service.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#0D2028]/50 border border-[#0D2028]/20">
                                <div className="w-10 h-10 rounded bg-orange/10 flex items-center justify-center text-xl shrink-0">
                                    {service.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-body font-medium truncate">{service.name}</p>
                                    <p className="text-steel/70 text-xs font-body truncate">{service.description}</p>
                                </div>
                            </div>
                        ))}
                        {services.length === 0 && <p className="text-steel/60 text-sm">No services available.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
