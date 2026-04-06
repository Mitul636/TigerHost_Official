import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.png';

export default function Footer() {
    const { settings } = useApp();

    return (
        <footer className="relative border-t border-steel/20">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src={settings.logoUrl || logo} alt="TigerHost Logo" className="w-[42px] h-[42px] object-contain rounded-lg border border-orange/40" />
                            <span className="text-xl font-heading font-bold text-white tracking-wider">
                                {settings.brandName || 'TigerHost'}
                            </span>
                        </Link>
                        <p className="text-steel/70 font-body text-sm leading-relaxed mb-4">
                            {settings.footerText || 'Premium Hosting. Desi Prices.'}
                        </p>
                        <p className="text-steel/50 font-body text-xs">
                            {settings.contactEmail || 'support@tigerhost.com'}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Services', href: '/#services' },
                                { name: 'Special Offers', href: '/offers' },
                                { name: 'Our Team', href: '/team' },
                            ].map(link => (
                                <li key={link.name}>
                                    <Link to={link.href}
                                        className="text-steel/70 hover:text-orange font-body text-sm transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h4 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4">
                            Account
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { name: 'Game Panel', href: settings.gamePanelUrl || '#' },
                                { name: 'VM Panel', href: settings.vmPanelUrl || '#' },
                            ].map(link => (
                                <li key={link.name}>
                                    <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className="text-steel/60 hover:text-orange font-body text-sm transition-colors duration-200">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-heading font-semibold text-sm tracking-wider uppercase mb-4">
                            Support
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { name: 'Discord Community', href: settings.discordLink || '#' },
                                { name: 'Contact Us', href: '/contact' },
                                { name: 'Staff Application', href: '/staff/apply' },
                                { name: 'About Us', href: '/about' },
                            ].map(link => (
                                <li key={link.name}>
                                    {link.href.startsWith('/') ? (
                                        <Link to={link.href}
                                            className="text-steel/60 hover:text-orange font-body text-sm transition-colors duration-200">
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined}
                                            rel="noopener noreferrer"
                                            className="text-steel/60 hover:text-orange font-body text-sm transition-colors duration-200">
                                            {link.name}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider-gradient my-10" />

                {/* Bottom Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-steel/40 font-body text-xs">
                        © {new Date().getFullYear()} {settings.brandName || 'TigerHost'}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {[
                            { name: 'Privacy Policy', href: '/legal/privacy' },
                            { name: 'Terms of Service', href: '/legal/tos' },
                            { name: 'Refund Policy', href: '/legal/refund' },
                        ].map(link => (
                            <Link key={link.name} to={link.href}
                                className="text-steel/40 hover:text-orange font-body text-xs transition-colors duration-200">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
