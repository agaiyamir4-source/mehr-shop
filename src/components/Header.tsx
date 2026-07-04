import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  Percent, 
  MessageSquare, 
  Smartphone, 
  Tv, 
  Sparkles, 
  ShoppingBag, 
  Shirt, 
  Wrench,
  Store,
  ArrowLeft
} from 'lucide-react';
import { categories } from '../data/mockData';

export const Header: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    user, 
    logout, 
    cart, 
    wishlist, 
    theme, 
    toggleTheme, 
    searchQuery, 
    setSearchQuery,
    setSearchFilters
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search');
    }
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'digital': return <Smartphone className="h-4 w-4" />;
      case 'home-appliances': return <Tv className="h-4 w-4" />;
      case 'beauty': return <Sparkles className="h-4 w-4" />;
      case 'supermarket': return <ShoppingBag className="h-4 w-4" />;
      case 'fashion': return <Shirt className="h-4 w-4" />;
      case 'tools': return <Wrench className="h-4 w-4" />;
      default: return <Store className="h-4 w-4" />;
    }
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200" dir="rtl">
      {/* Top Bar: Brand, Search, User, Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Right Section: Mobile Menu Trigger + Logo */}
        <div className="flex items-center gap-4">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <div 
            id="brand-logo"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-rose-600/20">م</div>
            <span className="text-2xl font-black text-rose-600 tracking-tight dark:text-white transition-colors">مهرشاپ</span>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <form 
          id="header-search-form"
          onSubmit={handleSearchSubmit} 
          className="hidden md:flex flex-1 max-w-lg items-center relative"
        >
          <input
            id="header-search-input"
            type="text"
            placeholder="جستجو در تمام محصولات مهرشاپ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-11 pl-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg border-none focus:bg-white dark:focus:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all text-sm font-medium"
          />
          <button 
            id="header-search-btn"
            type="submit" 
            className="absolute right-3.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Left Section: Wishlist, Cart, Login/Profile, Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Light/Dark Toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="تغییر پوسته"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Wishlist Icon */}
          <button
            id="wishlist-nav-btn"
            onClick={() => navigateTo('profile', 'wishlist')}
            className="relative p-2.5 rounded-xl text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon */}
          <button
            id="cart-nav-btn"
            onClick={() => navigateTo('cart')}
            className="relative p-2.5 rounded-xl text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900 animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  id="profile-dropdown-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium text-xs sm:text-sm transition-colors"
                >
                  <User className="h-4.5 w-4.5 text-gray-400" />
                  <span className="max-w-[80px] sm:max-w-[120px] truncate">{user.displayName}</span>
                </button>
                {profileDropdownOpen && (
                  <div 
                    id="profile-dropdown-menu"
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl z-50 overflow-hidden"
                  >
                    <button
                      id="nav-to-profile-btn"
                      onClick={() => { setProfileDropdownOpen(false); navigateTo('profile'); }}
                      className="w-full text-right px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-sm flex items-center gap-2"
                    >
                      <User className="h-4 w-4 text-gray-400" />
                      <span>حساب کاربری</span>
                    </button>
                    {user.role === 'admin' && (
                      <button
                        id="nav-to-admin-btn"
                        onClick={() => { setProfileDropdownOpen(false); navigateTo('admin'); }}
                        className="w-full text-right px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-2 font-bold"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>پنل مدیریت</span>
                      </button>
                    )}
                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    <button
                      id="dropdown-logout-btn"
                      onClick={() => { setProfileDropdownOpen(false); logout(); }}
                      className="w-full text-right px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>خروج از حساب</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => navigateTo('auth')}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors shadow-rose-600/10"
              >
                <User className="h-4 w-4" />
                <span>ورود / ثبت‌نام</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Categories / Navigation bar */}
      <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <nav className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              id="nav-category-all"
              onClick={() => {
                setSearchFilters((prev) => ({ ...prev, category: 'all' }));
                navigateTo('search');
              }}
              className="px-3 py-1 text-gray-600 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Store className="h-4 w-4" />
              <span>همه محصولات</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`nav-category-${cat.slug}`}
                onClick={() => {
                  setSearchFilters((prev) => ({ ...prev, category: cat.slug }));
                  navigateTo('search');
                }}
                className="px-3 py-1 text-gray-600 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {getCategoryIcon(cat.slug)}
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>
          
          <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">
            <button 
              id="nav-special-offers"
              onClick={() => navigateTo('search', { sort: 'popular' })} 
              className="flex items-center gap-1 hover:text-rose-600 transition-colors"
            >
              <Percent className="h-3.5 w-3.5 text-rose-500" />
              <span>شگفت‌انگیزها</span>
            </button>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <button 
              id="nav-faq"
              onClick={() => navigateTo('faq')} 
              className="flex items-center gap-1 hover:text-rose-600 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>سوالات متداول</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search - Visible only on mobile */}
      <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800">
        <form id="mobile-search-form" onSubmit={handleSearchSubmit} className="flex items-center relative">
          <input
            id="mobile-search-input"
            type="text"
            placeholder="جستجو در تمام محصولات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-11 pl-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl border border-transparent focus:border-rose-500 focus:bg-white focus:outline-none transition-all text-sm font-medium"
          />
          <button 
            id="mobile-search-btn"
            type="submit" 
            className="absolute right-3.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            id="mobile-menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          ></div>
          
          {/* Menu Drawer */}
          <div className="relative flex flex-col w-full max-w-xs bg-white dark:bg-gray-900 h-full p-6 shadow-2xl overflow-y-auto no-scrollbar transition-transform">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">منوی ناوبری</span>
              <button 
                id="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-6 flex flex-col gap-5">
              <button
                id="mobile-nav-home"
                onClick={() => { setMobileMenuOpen(false); navigateTo('home'); }}
                className="text-right py-2 text-base font-bold text-gray-800 dark:text-gray-200 hover:text-rose-600 transition-colors flex items-center gap-3"
              >
                <Store className="h-5 w-5 text-gray-400" />
                <span>صفحه اصلی</span>
              </button>
              <button
                id="mobile-nav-faq"
                onClick={() => { setMobileMenuOpen(false); navigateTo('faq'); }}
                className="text-right py-2 text-base font-bold text-gray-800 dark:text-gray-200 hover:text-rose-600 transition-colors flex items-center gap-3"
              >
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <span>سوالات متداول</span>
              </button>
              <button
                id="mobile-nav-about"
                onClick={() => { setMobileMenuOpen(false); navigateTo('about'); }}
                className="text-right py-2 text-base font-bold text-gray-800 dark:text-gray-200 hover:text-rose-600 transition-colors flex items-center gap-3"
              >
                <Store className="h-5 w-5 text-gray-400" />
                <span>درباره ما</span>
              </button>
              <button
                id="mobile-nav-contact"
                onClick={() => { setMobileMenuOpen(false); navigateTo('contact'); }}
                className="text-right py-2 text-base font-bold text-gray-800 dark:text-gray-200 hover:text-rose-600 transition-colors flex items-center gap-3"
              >
                <ArrowLeft className="h-5 w-5 text-gray-400" />
                <span>تماس با ما</span>
              </button>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-4">دسته‌بندی محصولات</span>
              <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    id={`mobile-nav-cat-${cat.slug}`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchFilters((prev) => ({ ...prev, category: cat.slug }));
                      navigateTo('search');
                    }}
                    className="text-right py-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-rose-600 transition-colors flex items-center gap-3"
                  >
                    {getCategoryIcon(cat.slug)}
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
