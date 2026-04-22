import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Frontend Pages
import Home from './pages/Home';
import Team from './pages/Team';
import Offers from './pages/Offers';
import LegalPage from './pages/LegalPage';
import Contact from './pages/Contact';
import StaffApply from './pages/StaffApply';
import OrderPage from './pages/OrderPage';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageServices from './admin/ManageServices';
import ManagePlans from './admin/ManagePlans';
import CurrencySettings from './admin/CurrencySettings';
import SiteSettings from './admin/SiteSettings';
import ManageTeam from './admin/ManageTeam';
import ManageOffers from './admin/ManageOffers';
import ManageLegal from './admin/ManageLegal';
import ManageContact from './admin/ManageContact';
import ManageStaffApply from './admin/ManageStaffApply';
import ManageNavbarDropdown from './admin/ManageNavbarDropdown';
import OrderSettings from './admin/OrderSettings';

import { useApp } from './context/AppContext';
import Toast from './components/Toast';
import { SnowEffect } from './components/SnowEffect';
import ScrollObserver from './components/ScrollObserver';

function ProtectedRoute({ children }) {
    const { isAdmin } = useApp();
    if (!isAdmin) return <AdminLogin />;
    return children;
}

export default function App() {
    const { toast } = useApp();
    return (
        <>
            <Routes>
                {/* Frontend Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/legal/:type" element={<LegalPage />} />
                <Route path="/about" element={<LegalPage type="about" />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/staff/apply" element={<StaffApply />} />
                <Route path="/order/:planSlug" element={<OrderPage />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><ManageServices /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/plans" element={<ProtectedRoute><AdminLayout><ManagePlans /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/currency" element={<ProtectedRoute><AdminLayout><CurrencySettings /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><SiteSettings /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/team" element={<ProtectedRoute><AdminLayout><ManageTeam /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/offers" element={<ProtectedRoute><AdminLayout><ManageOffers /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/legal" element={<ProtectedRoute><AdminLayout><ManageLegal /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/contact" element={<ProtectedRoute><AdminLayout><ManageContact /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/staff-apply" element={<ProtectedRoute><AdminLayout><ManageStaffApply /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/navbar-dropdown" element={<ProtectedRoute><AdminLayout><ManageNavbarDropdown /></AdminLayout></ProtectedRoute>} />
                <Route path="/admin/order-settings" element={<ProtectedRoute><AdminLayout><OrderSettings /></AdminLayout></ProtectedRoute>} />
            </Routes>
            <SnowEffect />
            <ScrollObserver />
            <Toast message={toast} />
        </>
    );
}
