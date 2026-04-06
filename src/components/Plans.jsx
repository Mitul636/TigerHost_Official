import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Plans() {
    const { plans, services, formatPrice, currency, settings } = useApp();
    const [selectedService, setSelectedService] = useState('All');

    const activePlans = plans.filter(p => p.active);
    const filteredPlans = selectedService === 'All'
        ? activePlans
        : activePlans.filter(p => p.service === selectedService);

    const visibleServices = services.filter(s => s.visible);

    const getBadgeClass = (badge) => {
        switch (badge) {
            case 'Popular': return 'badge-popular';
            case 'New': return 'badge-new';
            case 'Hot': return 'badge-hot';
            default: return '';
        }
    };

    return (
        <section id="plans" className="relative py-24 px-4 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-dark/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-orange font-body font-semibold text-sm tracking-widest uppercase">Pricing</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-3 mb-4">
                        Popular <span className="text-orange text-glow">Plans</span>
                    </h2>
                    <p className="text-steel/80 font-body text-lg max-w-2xl mx-auto">
                        Affordable plans with premium features. Choose the perfect plan for your project.
                    </p>
                    <div className="divider-gradient w-24 mx-auto mt-6" />
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <button
                        onClick={() => setSelectedService('All')}
                        className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-300 ${selectedService === 'All'
                            ? 'bg-orange text-white shadow-orange-glow'
                            : 'glass text-steel/80 hover:text-orange'
                            }`}
                    >
                        All Plans
                    </button>
                    {visibleServices.map(service => (
                        <button
                            key={service.id}
                            onClick={() => setSelectedService(service.name)}
                            className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all duration-300 ${selectedService === service.name
                                ? 'bg-orange text-white shadow-orange-glow'
                                : 'glass text-steel/80 hover:text-orange'
                                }`}
                        >
                            {service.name}
                        </button>
                    ))}
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            className={`group relative p-6 rounded-2xl glass hover:shadow-orange-glow transition-all duration-500 flex flex-col ${plan.badge === 'Popular' ? 'border-orange/50 shadow-orange-glow' : ''
                                }`}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className={getBadgeClass(plan.badge)}>{plan.badge}</span>
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col flex-1">
                                {/* Plan Name */}
                                <h3 className="text-lg font-heading font-semibold text-white mb-1">
                                    {plan.name}
                                </h3>
                                <p className="text-xs font-body text-steel/60 mb-4">{plan.service}</p>

                                {/* Price */}
                                <div className="mb-6 h-[40px] flex items-center">
                                    {settings.currencySettings?.showAllOnCards ? (
                                        <div className="flex flex-col">
                                            <span className="text-xl font-heading font-bold text-orange">
                                                ₹{plan.priceINR} / ৳{plan.priceBDT}
                                            </span>
                                            <span className="text-lg font-heading font-bold text-orange">
                                                ${plan.priceUSD} <span className="text-steel/50 font-body text-xs">/mo</span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div key={currency} className="price-update-fade flex items-baseline gap-1">
                                            <span className="text-3xl font-heading font-bold text-orange text-glow">
                                                {formatPrice(plan.priceINR, plan.priceBDT, plan.priceUSD)}
                                            </span>
                                            <span className="text-steel/50 font-body text-sm">/mo</span>
                                        </div>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-2.5 mb-6 flex-1">
                                    {plan.features.map((feature, fi) => (
                                        <li key={fi} className="flex items-start gap-2 text-sm font-body text-steel/80">
                                            <Check className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Order Button */}
                                <Link 
                                    to={`/order/${plan.slug || plan.id}`}
                                    className="btn-primary w-full !py-2.5 text-center block group-hover:shadow-orange-glow-lg transition-all duration-300"
                                >
                                    Order Now 🚀
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredPlans.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-steel/60 font-body text-lg">No plans available in this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
