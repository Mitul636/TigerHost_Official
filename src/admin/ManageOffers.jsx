import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Flame, Gift, TrendingUp, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ManageOffers() {
    const { offers, addOffer, updateOffer, deleteOffer } = useApp();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', badge: 'HOT',
        priceINR_old: 0, priceBDT_old: 0,
        priceINR_new: 0, priceBDT_new: 0,
        code: '', expiry: '', active: true
    });

    const resetForm = () => {
        setFormData({
            title: '', description: '', badge: 'HOT',
            priceINR_old: 0, priceBDT_old: 0,
            priceINR_new: 0, priceBDT_new: 0,
            code: '', expiry: '', active: true
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleEdit = (offer) => {
        setFormData(offer);
        setEditingId(offer.id);
        setIsAdding(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateOffer(editingId, formData);
        } else {
            addOffer(formData);
        }
        resetForm();
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Manage Special Offers</h2>
                    <p className="text-steel/70 font-body">Create and manage promotional deals for your customers.</p>
                </div>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
                        <Plus size={20} /> Add Offer
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="glass p-8 rounded-2xl border-orange/30">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-heading font-bold text-white">
                            {editingId ? 'Edit Offer' : 'Create New Offer'}
                        </h3>
                        <button onClick={resetForm} className="text-steel hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Offer Title</label>
                            <input 
                                type="text" required value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="admin-input" placeholder="e.g. 50% OFF VPS Hosting!"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Description</label>
                            <textarea 
                                required value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="admin-input min-h-[80px]" placeholder="Explain the offer details..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Badge Type</label>
                            <select 
                                value={formData.badge}
                                onChange={e => setFormData({ ...formData, badge: e.target.value })}
                                className="admin-input"
                            >
                                <option value="HOT">HOT 🔥</option>
                                <option value="LIMITED">LIMITED ⏳</option>
                                <option value="NEW">NEW ✨</option>
                                <option value="SALE">SALE 🎁</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Promo Code (Optional)</label>
                            <input 
                                type="text" value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value })}
                                className="admin-input" placeholder="e.g. TIGER50"
                            />
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                            <h4 className="text-white font-heading font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">Old Prices (INR / BDT)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="number" required value={formData.priceINR_old}
                                    onChange={e => setFormData({ ...formData, priceINR_old: Number(e.target.value) })}
                                    className="admin-input" placeholder="Price ₹"
                                />
                                <input 
                                    type="number" required value={formData.priceBDT_old}
                                    onChange={e => setFormData({ ...formData, priceBDT_old: Number(e.target.value) })}
                                    className="admin-input" placeholder="Price ৳"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-orange/5 rounded-xl border border-orange/20 space-y-4">
                            <h4 className="text-orange font-heading font-bold text-xs uppercase tracking-widest border-b border-orange/10 pb-2">Discounted Prices (INR / BDT)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="number" required value={formData.priceINR_new}
                                    onChange={e => setFormData({ ...formData, priceINR_new: Number(e.target.value) })}
                                    className="admin-input border-orange/30 !text-orange" placeholder="Price ₹"
                                />
                                <input 
                                    type="number" required value={formData.priceBDT_new}
                                    onChange={e => setFormData({ ...formData, priceBDT_new: Number(e.target.value) })}
                                    className="admin-input border-orange/30 !text-orange" placeholder="Price ৳"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Expiry Date (Optional)</label>
                            <input 
                                type="date" value={formData.expiry}
                                onChange={e => setFormData({ ...formData, expiry: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                        
                        <div className="flex items-center gap-4 mt-6">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" id="offerActive" checked={formData.active}
                                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                    className="w-5 h-5 accent-orange"
                                />
                                <label htmlFor="offerActive" className="text-white font-body">Visible on Site</label>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-6 flex gap-4">
                            <button type="submit" className="btn-primary flex-1 py-4 flex items-center justify-center gap-2">
                                <Save size={20} /> {editingId ? 'Update Offer' : 'Create Offer'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="glass p-6 rounded-2xl border-white/5 group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${
                                offer.badge === 'HOT' ? 'bg-red-500/10 text-red-500' : 
                                offer.badge === 'LIMITED' ? 'bg-orange/10 text-orange' : 
                                'bg-blue-500/10 text-blue-500'
                            }`}>
                                {offer.badge === 'HOT' ? <Flame size={20} /> : 
                                 offer.badge === 'SALE' ? <Gift size={20} /> : 
                                 offer.badge === 'NEW' ? <Sparkles size={20} /> : <TrendingUp size={20} />}
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(offer)} className="p-2 bg-white/5 text-steel hover:text-orange rounded-lg transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => deleteOffer(offer.id)} className="p-2 bg-white/5 text-steel hover:text-red-500 rounded-lg transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-heading font-bold text-white mb-2">{offer.title}</h3>
                        <p className="text-steel/50 text-sm font-body mb-4 line-clamp-2">{offer.description}</p>
                        
                        <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-4">
                            <div className="flex-1">
                                <p className="text-[10px] text-steel/30 uppercase tracking-widest font-heading mb-1">Old Price</p>
                                <p className="text-steel/40 font-heading line-through text-sm">₹{offer.priceINR_old} / ৳{offer.priceBDT_old}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] text-orange/50 uppercase tracking-widest font-heading mb-1">Offer Price</p>
                                <p className="text-orange font-heading font-bold text-lg">₹{offer.priceINR_new} / ৳{offer.priceBDT_new}</p>
                            </div>
                        </div>

                        {!offer.active && (
                            <div className="absolute inset-0 bg-dark/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                                <span className="bg-red-500 text-white font-heading font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">HIDDEN</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
