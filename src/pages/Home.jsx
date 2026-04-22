import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Plans from '../components/Plans';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0D2028]">
            <Navbar />
            <Hero />
            <WhyChooseUs />
            <Services />
            <Plans />
            <CTABanner />
            <Footer />
        </div>
    );
}
