import React, { useState } from 'react';
import { Save, Plus, Trash2, Globe, Layout, Info, Upload, GripVertical } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reorder } from 'framer-motion';

export default function ManageNavbarDropdown() {
    const { navbarDropdown, updateNavDropdownItem, addNavDropdownItem, deleteNavDropdownItem, reorderNavDropdowns, services } = useApp();
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        serviceName: '',
        description: '',
        icon: '',
        order: 1,
        active: true
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, icon: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateNavDropdownItem(editingItem.id, formData);
        } else {
            addNavDropdownItem(formData);
        }
        setShowModal(false);
        setEditingItem(null);
        setFormData({ serviceName: '', description: '', icon: '', order: 1, active: true });
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
        setShowModal(true);
    };

    const sortedItems = [...navbarDropdown].sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Navbar Dropdowns</h2>
                    <p className="text-steel/70 font-body">Manage which services appear with dropdown menus in the main navigation. Drag items to reorder them.</p>
                </div>
                <button 
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ serviceName: '', description: '', icon: '', order: navbarDropdown.length + 1, active: true });
                        setShowModal(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Add Service Dropdown
                </button>
            </div>

            <Reorder.Group axis="y" values={sortedItems} onReorder={reorderNavDropdowns} className="grid grid-cols-1 gap-4">
                {sortedItems.map((item) => (
                    <Reorder.Item 
                        key={item.id} 
                        value={item}
                        className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group hover:border-orange/30 transition-all duration-300 cursor-grab active:cursor-grabbing"
                    >
                        <div className="flex items-center gap-6">
                            <GripVertical className="text-steel/30 group-hover:text-orange transition-colors" size={20} />
                            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center border border-orange/20 overflow-hidden">
                                {item.icon ? (
                                    <img src={item.icon} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <Globe className="text-orange" size={24} />
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-heading font-bold text-white">{item.serviceName}</h3>
                                <p className="text-sm text-steel/60 font-body">{item.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center mr-4">
                                <span className="text-[10px] text-steel/40 font-heading uppercase mb-1">Index</span>
                                <span className="text-white font-heading font-bold">{item.order}</span>
                            </div>
                            <button 
                                onClick={() => handleEdit(item)}
                                className="p-2 hover:bg-white/5 rounded-lg text-steel/60 hover:text-white transition-colors"
                            >
                                <Layout size={20} />
                            </button>
                            <button 
                                onClick={() => deleteNavDropdownItem(item.id)}
                                className="p-2 hover:bg-red-500/10 rounded-lg text-steel/60 hover:text-red-400 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                            <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            {navbarDropdown.length === 0 && (
                <div className="text-center py-12 glass rounded-2xl border-dashed border-white/10">
                    <p className="text-steel/50 font-body">No dropdowns configured yet.</p>
                </div>
            )}

            <div className="p-4 bg-orange/5 border border-orange/20 rounded-xl flex gap-3">
                <Info className="w-5 h-5 text-orange shrink-0" />
                <p className="text-sm text-steel/70 font-body">
                    <strong>Note:</strong> Featured services shown here will appear in the main Navbar. We recommend showing a maximum of 5 services for the best desktop experience.
                </p>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative glass w-full max-w-lg rounded-2xl border-white/10 p-8 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-2xl font-heading font-bold text-white mb-6">
                            {editingItem ? 'Edit Dropdown Item' : 'Add Dropdown Item'}
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Select Service</label>
                                <select 
                                    required
                                    value={formData.serviceName}
                                    onChange={e => setFormData({ ...formData, serviceName: e.target.value })}
                                    className="admin-input"
                                >
                                    <option value="">Choose a service...</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Short Description</label>
                                <input 
                                    type="text" required maxLength={60}
                                    placeholder="e.g. High-performance gaming servers"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="admin-input"
                                />
                                <div className="text-[10px] text-right text-steel/40">{formData.description.length}/60</div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Icon / Image</label>
                                <div className="flex gap-4">
                                    <input 
                                        type="text"
                                        placeholder="Icon URL or upload below"
                                        value={formData.icon}
                                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                        className="admin-input flex-1"
                                    />
                                    <label className="cursor-pointer bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 transition-colors">
                                        <Upload size={20} className="text-steel" />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Display Order</label>
                                    <input 
                                        type="number" required
                                        value={formData.order}
                                        onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
                                        className="admin-input"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Status</label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, active: !formData.active })}
                                        className={`w-full h-[46px] rounded-lg border transition-all flex items-center justify-center gap-2 font-heading font-bold ${
                                            formData.active 
                                                ? 'bg-green-500/20 text-green-500 border-green-500/30' 
                                                : 'bg-red-500/20 text-red-500 border-red-500/30'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${formData.active ? 'bg-green-500' : 'bg-red-500'}`} />
                                        {formData.active ? 'Active' : 'Inactive'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white font-heading font-bold hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 btn-primary py-3"
                                >
                                    {editingItem ? 'Update Item' : 'Create Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
