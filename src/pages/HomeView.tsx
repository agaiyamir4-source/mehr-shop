import React from 'react';
import { useStore } from '../context/StoreContext';
import { categories, popularBrands, mockReviews } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { 
  Sparkles, 
  Smartphone, 
  Tv, 
  Shirt, 
  Wrench, 
  ShoppingBag, 
  Store, 
  ChevronLeft, 
  Percent, 
  Award, 
  Heart, 
  MessageSquare,
  Star
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, navigateTo, setSearchFilters } = useStore();

  // Filter products by tag
  const specialOffers = products.filter((p) => p.isSpecialOffer);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'digital': return <Smartphone className="h-6 w-6" />;
      case 'home-appliances': return <Tv className="h-6 w-6" />;
      case 'beauty': return <Sparkles className="h-6 w-6" />;
      case 'supermarket': return <ShoppingBag className="h-6 w-6" />;
      case 'fashion': return <Shirt className="h-6 w-6" />;
      case 'tools': return <Wrench className="h-6 w-6" />;
      default: return <Store className="h-6 w-6" />;
    }
  };

  return (
    <div id="home-view" className="space-y-12 pb-16">
      
      {/* 1. Large Premium Hero Banner */}
      <section id="hero-banner" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 py-16 px-8 sm:px-16 text-white shadow-xl shadow-rose-600/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl flex flex-col gap-5 text-right" dir="rtl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black self-start">
            جشنواره تابستانه مهرشاپ
          </span>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            تکنولوژی، زیبایی و راحتی خانه شما در یکجا
          </h1>
          <p className="text-sm sm:text-base text-rose-50/90 font-medium leading-relaxed">
            امسال با شگفت‌انگیزترین تخفیف‌ها به استقبال فصل گرم می‌رویم. جدیدترین گوشی‌ها، کالای دیجیتال و لوازم خانگی اصل با گارانتی معتبر و تحویل فوق‌سریع.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <button
              id="hero-shop-now"
              onClick={() => {
                setSearchFilters((prev) => ({ ...prev, sort: 'popular' }));
                navigateTo('search');
              }}
              className="px-6 py-3 bg-white text-rose-600 hover:bg-rose-50 font-black rounded-xl text-sm sm:text-base shadow-lg transition-transform hover:scale-102 flex items-center gap-2"
            >
              <span>مشاهده محصولات شگفت‌انگیز</span>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              id="hero-categories"
              onClick={() => {
                navigateTo('search');
              }}
              className="px-6 py-3 bg-rose-700/40 hover:bg-rose-700/60 border border-white/20 text-white font-bold rounded-xl text-sm sm:text-base transition-colors"
            >
              بررسی دسته‌بندی‌ها
            </button>
          </div>
        </div>
      </section>

      {/* 2. Product Categories Grid */}
      <section id="home-categories" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-1.5 bg-rose-600 rounded-full"></div>
            <h2 className="text-xl font-black text-gray-800 dark:text-gray-100">دسته‌بندی‌های محبوب</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              id={`cat-card-${cat.slug}`}
              onClick={() => {
                setSearchFilters((prev) => ({ ...prev, category: cat.slug }));
                navigateTo('search');
              }}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 p-5 rounded-2xl cursor-pointer text-center flex flex-col items-center gap-3.5 hover:shadow-lg hover:border-rose-200 dark:hover:border-rose-950/40 transition-all duration-300"
            >
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                {getCategoryIcon(cat.slug)}
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Special Offers section (Red Banner styled like Digikala's "Shegeftangiz") */}
      {specialOffers.length > 0 && (
        <section id="special-offers" className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-600/10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            {/* Promo text */}
            <div className="flex flex-col gap-4 text-right">
              <div className="flex items-center gap-2">
                <Percent className="h-8 w-8 animate-bounce text-amber-300" />
                <h2 className="text-2xl font-black tracking-tight">پیشنهادهای شگفت‌انگیز</h2>
              </div>
              <p className="text-xs sm:text-sm text-red-50/90 font-medium leading-relaxed">
                فرصت محدود برای خرید برترین کالاها با بیشترین تخفیف‌های سال. انبار رو به اتمام است!
              </p>
              <button
                id="view-all-offers"
                onClick={() => {
                  setSearchFilters((prev) => ({ ...prev, sort: 'price-desc' }));
                  navigateTo('search');
                }}
                className="px-4 py-2 bg-white text-rose-600 hover:bg-rose-50 font-black rounded-xl text-xs sm:text-sm self-start shadow-md flex items-center gap-1.5 transition-transform hover:scale-102"
              >
                <span>مشاهده همه</span>
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>

            {/* Products grid */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {specialOffers.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Best Selling Products */}
      {bestSellers.length > 0 && (
        <section id="best-sellers" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award className="h-6 w-6 text-amber-500" />
              <h2 className="text-xl font-black text-gray-800 dark:text-gray-100">پرفروش‌ترین کالاها</h2>
            </div>
            <button
              id="view-all-best-sellers"
              onClick={() => navigateTo('search')}
              className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>مشاهده همه</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Promotional Double Banner */}
      <section id="promotional-banners" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8 relative min-h-[180px] flex flex-col justify-center shadow-lg">
          <div className="absolute -left-6 -bottom-6 opacity-15">
            <Smartphone className="h-44 w-44" />
          </div>
          <div className="relative z-10 space-y-2 max-w-[70%]">
            <span className="text-[10px] font-black uppercase bg-purple-500 text-white px-2 py-0.5 rounded-full">محصولات اپل</span>
            <h3 className="text-lg font-black">نسل جدید آیفون و ساعت‌های هوشمند</h3>
            <p className="text-xs text-purple-100 font-medium">همراه با گارانتی مادام‌العمر اصالت محصول.</p>
            <button onClick={() => { setSearchFilters((prev) => ({ ...prev, brand: 'اپل' })); navigateTo('search'); }} className="text-xs font-bold text-amber-300 hover:underline pt-2 block">اکنون بخرید ←</button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 to-orange-600 text-white p-8 relative min-h-[180px] flex flex-col justify-center shadow-lg">
          <div className="absolute -left-6 -bottom-6 opacity-15">
            <Tv className="h-44 w-44" />
          </div>
          <div className="relative z-10 space-y-2 max-w-[70%]">
            <span className="text-[10px] font-black uppercase bg-orange-500 text-white px-2 py-0.5 rounded-full">خانه هوشمند</span>
            <h3 className="text-lg font-black">آشپزخانه مدرن با لوازم خانگی هوشمند</h3>
            <p className="text-xs text-orange-100 font-medium">تا ۲۰ درصد تخفیف ویژه خرید اسپرسوساز و لوازم برقی.</p>
            <button onClick={() => { setSearchFilters((prev) => ({ ...prev, category: 'home-appliances' })); navigateTo('search'); }} className="text-xs font-bold text-amber-200 hover:underline pt-2 block">مشاهده محصولات ←</button>
          </div>
        </div>
      </section>

      {/* 6. New Arrivals */}
      {newArrivals.length > 0 && (
        <section id="new-arrivals" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-6 w-6 text-rose-500 animate-pulse" />
              <h2 className="text-xl font-black text-gray-800 dark:text-gray-100">جدیدترین محصولات</h2>
            </div>
            <button
              id="view-all-new-arrivals"
              onClick={() => { setSearchFilters((prev) => ({ ...prev, sort: 'newest' })); navigateTo('search'); }}
              className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>مشاهده همه</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Popular Brands */}
      <section id="popular-brands" className="space-y-6">
        <div className="flex items-center gap-2.5">
          <Award className="h-6 w-6 text-rose-500" />
          <h2 className="text-xl font-black text-gray-800 dark:text-gray-100">برندهای محبوب در مهرشاپ</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {popularBrands.map((brand) => (
              <div
                key={brand.id}
                id={`brand-logo-${brand.id}`}
                onClick={() => {
                  setSearchFilters((prev) => ({ ...prev, brand: brand.name }));
                  navigateTo('search');
                }}
                className="group flex flex-col items-center justify-center p-4 border border-gray-100/50 dark:border-gray-800 rounded-2xl hover:shadow-md cursor-pointer transition-all bg-gray-50/50 dark:bg-gray-950/50 hover:bg-white dark:hover:bg-gray-900"
              >
                <div className="h-12 w-24 flex items-center justify-center mb-2 overflow-hidden rounded-lg">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-rose-600 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section id="customer-reviews" className="space-y-6">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-6 w-6 text-rose-500" />
          <h2 className="text-xl font-black text-gray-800 dark:text-gray-100">نظرات مشتریان ما</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{rev.username}</span>
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-black text-rose-600 dark:text-rose-400">{rev.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  "{rev.comment}"
                </p>
              </div>
              <span className="text-[10px] text-gray-400 font-bold self-end">{rev.date}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
