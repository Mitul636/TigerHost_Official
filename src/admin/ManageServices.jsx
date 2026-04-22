import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Server } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ManageServices() {
    const { services, addService, updateService, deleteService } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        icon: '',
        description: '',
        visible: true
    });

    const openModal = (service = null) => {
        if (service) {
            setFormData(service);
            setEditingId(service.id);
        } else {
            setFormData({ name: '', icon: '🎮', description: '', visible: true });
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateService(editingId, formData);
        } else {
            addService(formData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            deleteService(id);
        }
    };

    const toggleVisibility = (id, currentVisible) => {
        updateService(id, { visible: !currentVisible });
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Service Categories</h1>
                    <p className="text-steel/60 font-body text-sm">Manage the hosting services displayed on the frontend.</p>
                </div>
                <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 !py-2 shrink-0">
                    <Plus size={18} /> Add Service
                </button>
            </div>

            <div className="bg-dark rounded-xl border border-[#0D2028]/30 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0D2028]/10 border-b border-[#0D2028]/30">
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Icon</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Service Name</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm max-w-[300px]">Description</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm">Status</th>
                                <th className="p-4 text-steel font-heading font-semibold text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-steel/50 font-body">
                                        <div className="flex flex-col items-center justify-center">
                                            <Server className="w-12 h-12 mb-3 text-orange/30" />
                                            <p>No services found. Add one to get started.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : services.map((service) => (
                                <tr key={service.id} className="border-b border-[#0D2028]/10 hover:bg-[#0D2028]/5 transition-colors">
                                    <td className="p-4">
                                        <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-xl border border-orange/20">
                                            {service.icon}
                                        </div>
                                    </td>
                                    <td className="p-4 text-white font-body font-medium">{service.name}</td>
                                    <td className="p-4 text-steel/80 font-body text-sm max-w-[300px] truncate" title={service.description}>
                                        {service.description}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleVisibility(service.id, service.visible)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max ${service.visible ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}
                                        >
                                            {service.visible ? <><Check size={12} /> Visible</> : <><X size={12} /> Hidden</>}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openModal(service)}
                                                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service.id)}
                                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                title="Delete"
                                            >
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
                    <div className="bg-dark border border-orange/30 rounded-2xl w-full max-w-lg shadow-orange-glow-lg overflow-hidden">
                        <div className="p-6 border-b border-[#0D2028]/30 flex items-center justify-between bg-[#0D2028]/10">
                            <h2 className="text-xl font-heading font-bold text-white">
                                {editingId ? 'Edit Service' : 'Add New Service'}
                            </h2>
                            <button onClick={closeModal} className="text-steel/60 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-sm font-body text-steel/80 mb-1.5">Icon (Emoji)</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="admin-input text-center text-xl"
                                        placeholder="🎮"
                                        maxLength={5}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-body text-steel/80 mb-1.5">Service Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="admin-input"
                                        placeholder="e.g. Minecraft Hosting"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-body text-steel/80 mb-1.5">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="admin-input resize-none"
                                    placeholder="Short description for the service card..."
                                />
                            </div>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0D2028]/10 border border-[#0D2028]/20">
                                <div className="flex-[1]">
                                    <p className="text-white font-body font-medium">Visibility</p>
                                    <p className="text-xs text-steel/60 font-body">Show this service on the frontend</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer cursor-allowed">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.visible}
                                        onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-[#0D2028]/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"></div>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-[#0D2028]/30">
                                <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg font-body font-medium text-steel/80 hover:bg-[#0D2028]/20 transition-colors border border-transparent">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary !py-2 !px-6">
                                    {editingId ? 'Save Changes' : 'Add Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
