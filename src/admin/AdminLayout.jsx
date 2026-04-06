import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Server, Package, Settings, LogOut, DollarSign, Home, Users, Flame, FileText, Phone, PenTool, Globe, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.png';

export default function AdminLayout({ children }) {
    const { logout, settings } = useApp();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { name: 'Services', icon: <Server size={20} />, path: '/admin/services' },
        { name: 'Hosting Plans', icon: <Package size={20} />, path: '/admin/plans' },
        { name: 'Team Members', icon: <Users size={20} />, path: '/admin/team' },
        { name: 'Special Offers', icon: <Flame size={20} />, path: '/admin/offers' },
        { name: 'Legal Pages', icon: <FileText size={20} />, path: '/admin/legal' },
        { name: 'Contact Info', icon: <Phone size={20} />, path: '/admin/contact' },
        { name: 'Staff Applications', icon: <PenTool size={20} />, path: '/admin/staff-apply' },
        { name: 'Order Settings', icon: <Save size={20} />, path: '/admin/order-settings' },
        { name: 'Navbar Dropdowns', icon: <Globe size={20} />, path: '/admin/navbar-dropdown' },
        { name: 'Currency Settings', icon: <DollarSign size={20} />, path: '/admin/currency' },
        { name: 'Site Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#0D2028] flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#0D2028]/50 border-r border-white/5 md:min-h-screen flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center justify-between md:justify-start gap-3">
                    <div className="flex items-center gap-3">
                        <img src={settings.logoUrl || logo} alt="TigerHost Logo" className="w-[36px] h-[36px] object-contain rounded-lg border border-orange/40" />
                        <span className="font-heading font-bold text-white tracking-wide truncate">
                            {settings.brandName || 'TigerHost'}
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm transition-all duration-200 ${isActive
                                    ? 'bg-orange/20 text-orange border border-orange/30 shadow-[inset_0_0_10px_rgba(232,66,10,0.2)]'
                                    : 'text-steel/70 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm text-steel/70 hover:bg-white/5 transition-all duration-200 w-full"
                    >
                        <Home size={20} />
                        View Live Site
                    </a>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm text-red-400 hover:bg-red-400/10 transition-all duration-200 w-full text-left"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0D2028]">
                <div className="max-w-7xl mx-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
