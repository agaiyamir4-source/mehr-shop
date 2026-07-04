import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';
import { ComparisonBar } from './components/ComparisonBar';

// Views
import { HomeView } from './pages/HomeView';
import { SearchResultsView } from './pages/SearchResultsView';
import { ProductDetailsView } from './pages/ProductDetailsView';
import { ShoppingCartView } from './pages/ShoppingCartView';
import { CheckoutView } from './pages/CheckoutView';
import { AuthView } from './pages/AuthView';
import { ProfileView } from './pages/ProfileView';
import { AdminDashboardView } from './pages/AdminDashboardView';
import { AboutUsView, ContactUsView, FAQView } from './pages/StaticPages';
import { Error404View, Error500View } from './pages/ErrorPages';

const MainLayout: React.FC = () => {
  const { currentView, navigateTo } = useStore();

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'search':
        return <SearchResultsView />;
      case 'product-details':
        return <ProductDetailsView />;
      case 'cart':
        return <ShoppingCartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'auth':
        return <AuthView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'about':
        return <AboutUsView />;
      case 'contact':
        return <ContactUsView />;
      case 'faq':
        return <FAQView />;
      case 'error404':
        return <Error404View />;
      case 'error500':
        return <Error500View />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div id="app-root-layout" className="min-h-screen flex flex-col justify-between bg-gray-50/50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
      
      {/* Dynamic Notifications Alerts */}
      <Notifications />

      {/* Global Persian RTL Header */}
      <Header />

      {/* Main Container Stage */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderActiveView()}
      </main>

      {/* Persistent Comparison Bar */}
      <ComparisonBar />

      {/* Deep Persian Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
