import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Package, XCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ManagePlans() {
    const { plans, services, addPlan, updatePlan, deletePlan } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [featureInput, setFeatureInput] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        service: services.length > 0 ? services[0].name : '',
        priceINR: '',
        priceBDT: '',
        priceUSD: '',
        features: [],
        badge: '',
        active: true
    });

    const openModal = (plan = null) => {
        if (plan) {
            setFormData(plan);
            setEditingId(plan.id);
        } else {
            setFormData({
                name: '',
                slug: '',
                service: services.length > 0 ? services[0].name : '',
                priceINR: '',
                priceBDT: '',
                priceUSD: '',
                features: [],
                badge: '',
                active: true
            });
            setEditingId(null);
        }
        setFeatureInput('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData({
                ...formData,
                features: [...formData.features, featureInput.trim()]
            });
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        const newFeatures = [...formData.features];
        newFeatures.splice(index, 1);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleAutoCalculate = () => {
        if (!formData.priceINR) return;
        const rates = settings.exchangeRates || { usd_to_inr: 84, usd_to_bdt: 110 };
        const usd = (formData.priceINR / rates.usd_to_inr).toFixed(2);
        const bdt = Math.round(usd * rates.usd_to_bdt);
        
        setFormData({
            ...formData,
            priceUSD: Number(usd),
            priceBDT: Number(bdt)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updatePlan(editingId, formData);
        } else {
            const planData = {
                ...formData,
                slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-')
            };
            addPlan(planData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this plan?')) {
            deletePlan(id);
        }
    };

    const toggleActive = (id, currentActive) => {
        updatePlan(id, { active: !currentActive });
    };

    const getBadgeCol = (badge) => {
        if (badge === 'Popular') return 'bg-orange text-white';
        if (badge === 'New') return 'bg-steel text-[#0D2028]';
        if (badge === 'Hot') return 'bg-red-500 text-white';
        return '';
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Hosting Plans</h1>
                    <p className="text-steel/60 font-body text-sm">Create and manage pricing plans for your services.</p>
                </div>
                <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 !py-2 shrink-0">
                    <Plus size={18} /> Add Plan
                </button>
            </div>

            <div className="bg-dark rounded-xl border border-[#0D2028]/30 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#0D2028]/10 border-b border-[#0D2028]/30">
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Plan Name</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Service Cat.</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Pricing (₹ / ৳ / $)</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Badge</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Status</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-steel/50 font-body">
                                        <div className="flex flex-col items-center justify-center">
                                            <Package className="w-12 h-12 mb-3 text-orange/30" />
                                            <p>No plans found. Add one to get started.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : plans.map((plan) => (
                                <tr key={plan.id} className="border-b border-[#0D2028]/10 hover:bg-[#0D2028]/5 transition-colors">
                                    <td className="p-4">
                                        <span className="text-white font-body font-bold text-base">{plan.name}</span>
                                        <p className="text-steel/50 text-xs font-body mt-1">{plan.features.length} features</p>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-[#0D2028]/20 text-orange rounded border border-[#0D2028]/30 font-body text-xs">
                                            {plan.service}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-2 items-center">
                                            <span className="text-white font-heading font-bold text-sm">₹{plan.priceINR}</span>
                                            <span className="text-steel/40 text-xs">/</span>
                                            <span className="text-steel/80 font-heading text-sm">৳{plan.priceBDT}</span>
                                            <span className="text-steel/40 text-xs text-orange">/</span>
                                            <span className="text-orange font-heading font-bold text-sm">${plan.priceUSD}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {plan.badge ? (
                                            <span className={`px-2.5 py-1 rounded text-xs font-heading font-bold uppercase tracking-wide ${getBadgeCol(plan.badge)}`}>
                                                {plan.badge}
                                            </span>
                                        ) : (
                                            <span className="text-steel/30 text-xs">-</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleActive(plan.id, plan.active)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max ${plan.active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}
                                        >
                                            {plan.active ? <><Check size={12} /> Active</> : <><X size={12} /> Hidden</>}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openModal(plan)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(plan.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0D2028]/80 backdrop-blur-sm">
                    <div className="bg-dark border border-orange/30 rounded-2xl w-full max-w-2xl shadow-orange-glow-lg flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-[#0D2028]/30 flex items-center justify-between bg-[#0D2028]/10 shrink-0">
                            <h2 className="text-xl font-heading font-bold text-white">
                                {editingId ? 'Edit Plan' : 'Add New Plan'}
                            </h2>
                            <button onClick={closeModal} className="text-steel/60 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form id="planForm" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-body text-steel/80 mb-1.5">Plan Name</label>
                                            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="admin-input" placeholder="e.g. Starter Pro" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-body text-steel/80 mb-1.5">URL Slug</label>
                                            <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="admin-input" placeholder="e.g. starter-pro (optional)" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-body text-steel/80 mb-1.5">Service Category</label>
                                        <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="admin-input appearance-none bg-dark select-arrow">
                                            {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                            {services.length === 0 && <option value="" disabled>No services available</option>}
                                        </select>
                                    </div>
                                </div>

                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-white font-heading font-bold text-sm uppercase tracking-widest">Pricing Strategy</h4>
                                        <button 
                                            type="button" 
                                            onClick={handleAutoCalculate}
                                            className="px-3 py-1 bg-orange/10 text-orange rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-orange/20 transition-all"
                                        >
                                            <RefreshCw size={12} /> Auto Calculate from INR
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-heading text-steel/50 uppercase tracking-widest mb-1.5 font-bold">Price INR (₹)</label>
                                            <input type="number" required min="0" value={formData.priceINR} onChange={(e) => setFormData({ ...formData, priceINR: parseFloat(e.target.value) || '' })} className="admin-input" placeholder="299" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-heading text-steel/50 uppercase tracking-widest mb-1.5 font-bold">Price BDT (৳)</label>
                                            <input type="number" required min="0" value={formData.priceBDT} onChange={(e) => setFormData({ ...formData, priceBDT: parseFloat(e.target.value) || '' })} className="admin-input" placeholder="399" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-heading text-steel/50 uppercase tracking-widest mb-1.5 font-bold">Price USD ($)</label>
                                            <input type="number" step="0.01" required min="0" value={formData.priceUSD} onChange={(e) => setFormData({ ...formData, priceUSD: parseFloat(e.target.value) || '' })} className="admin-input" placeholder="3.59" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-steel/40 font-body italic mt-2">
                                        Tip: Enter your primary native price (INR) and click "Auto Calculate" to sync with other currencies using set rates.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-body text-steel/80 mb-1.5">Badge (Optional)</label>
                                    <select value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} className="admin-input appearance-none bg-dark select-arrow w-1/2">
                                        <option value="">None</option>
                                        <option value="Popular">Popular</option>
                                        <option value="Hot">Hot</option>
                                        <option value="New">New</option>
                                    </select>
                                </div>

                                <div className="border-t border-[#0D2028]/30 pt-5 mt-5">
                                    <label className="block text-sm font-heading font-semibold text-white mb-3">Plan Features</label>

                                    <div className="flex gap-2 mb-4">
                                        <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} className="admin-input flex-1" placeholder="Type a feature and click Add or press Enter..." />
                                        <button type="button" onClick={addFeature} className="btn-outline !py-2 shrink-0">Add</button>
                                    </div>

                                    {formData.features.length > 0 ? (
                                        <ul className="space-y-2 bg-[#0D2028]/50 p-4 rounded-xl border border-[#0D2028]/20">
                                            {formData.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center justify-between bg-dark p-2.5 rounded-lg border border-[#0D2028]/10 group">
                                                    <span className="text-steel font-body text-sm flex items-center gap-2"><Check size={14} className="text-orange" /> {feature}</span>
                                                    <button type="button" onClick={() => removeFeature(idx)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <XCircle size={18} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-steel/50 text-sm italic py-4 text-center border border-dashed border-[#0D2028]/30 rounded-xl">No features added yet.</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0D2028]/10 border border-[#0D2028]/20 mt-6">
                                    <div className="flex-[1]">
                                        <p className="text-white font-body font-medium">Plan Status</p>
                                        <p className="text-xs text-steel/60 font-body">Make this plan available for purchase</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
                                        <div className="w-11 h-6 bg-[#0D2028]/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"></div>
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-[#0D2028]/30 flex justify-end gap-3 shrink-0 bg-dark">
                            <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg font-body font-medium text-steel/80 hover:bg-[#0D2028]/20 transition-colors border border-transparent">
                                Cancel
                            </button>
                            <button type="submit" form="planForm" className="btn-primary !py-2 !px-6">
                                {editingId ? 'Save Changes' : 'Add Plan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
