import React from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Star } from 'lucide-react';

export const SearchResultsView: React.FC = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery,
    searchFilters, 
    setSearchFilters 
  } = useStore();

  const brands = Array.from(new Set(products.map((p) => p.brand))) as string[];

  // Filter Products
  const filteredProducts = products.filter((product) => {
    // 1. Text Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchEngTitle = product.englishTitle.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      if (!matchTitle && !matchEngTitle && !matchDesc && !matchBrand) return false;
    }

    // 2. Category Filter
    if (searchFilters.category !== 'all' && product.category !== searchFilters.category) {
      return false;
    }

    // 3. Brand Filter
    if (searchFilters.brand !== 'all' && product.brand !== searchFilters.brand) {
      return false;
    }

    // 4. Rating Filter
    if (product.rating < searchFilters.rating) {
      return false;
    }

    // 5. Price Filter (using Tomans or Rials? Let's check: price is stored in Rials e.g. 68500000)
    // Discounted price is what matters
    const finalPrice = product.price * (1 - product.discountPercentage / 100);
    if (finalPrice > searchFilters.maxPrice) {
      return false;
    }

    return true;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const finalPriceA = a.price * (1 - a.discountPercentage / 100);
    const finalPriceB = b.price * (1 - b.discountPercentage / 100);

    switch (searchFilters.sort) {
      case 'newest':
        return b.isNewArrival ? 1 : -1;
      case 'price-asc':
        return finalPriceA - finalPriceB;
      case 'price-desc':
        return finalPriceB - finalPriceA;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        // Sort by special offers, then rating count
        const weightA = (a.isSpecialOffer ? 2 : 0) + (a.isBestSeller ? 1 : 0);
        const weightB = (b.isSpecialOffer ? 2 : 0) + (b.isBestSeller ? 1 : 0);
        return weightB - weightA || b.ratingCount - a.ratingCount;
    }
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSearchFilters({
      category: 'all',
      minPrice: 0,
      maxPrice: 100000000,
      brand: 'all',
      rating: 0,
      sort: 'popular'
    });
  };

  const handleCategoryChange = (slug: string) => {
    setSearchFilters((prev) => ({ ...prev, category: slug }));
  };

  const handleBrandChange = (brand: string) => {
    setSearchFilters((prev) => ({ ...prev, brand }));
  };

  const handleSortChange = (sortVal: typeof searchFilters.sort) => {
    setSearchFilters((prev) => ({ ...prev, sort: sortVal }));
  };

  const handleRatingChange = (ratingVal: number) => {
    setSearchFilters((prev) => ({ ...prev, rating: ratingVal }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSearchFilters((prev) => ({ ...prev, maxPrice: val }));
  };

  return (
    <div id="search-view" className="pb-16" dir="rtl">
      
      {/* Title / Search query summary */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          {searchQuery ? (
            <h1 className="text-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span>نتایج جستجو برای:</span>
              <span className="text-rose-600 dark:text-rose-400">«{searchQuery}»</span>
            </h1>
          ) : (
            <h1 className="text-xl font-black text-gray-800 dark:text-gray-100">
              {searchFilters.category !== 'all' 
                ? `دسته بندی: ${categories.find(c => c.slug === searchFilters.category)?.name || ''}`
                : 'آرشیو تمام محصولات'}
            </h1>
          )}
          <p className="text-xs text-gray-400 font-bold mt-1">
            {sortedProducts.length.toLocaleString('fa-IR')} کالا پیدا شد
          </p>
        </div>

        {/* Clear Search / Filter badge */}
        {(searchQuery || searchFilters.category !== 'all' || searchFilters.brand !== 'all' || searchFilters.rating > 0) && (
          <button
            id="reset-filters-top"
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-red-200 dark:border-red-950/40 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>حذف فیلترها</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters sidebar - Left Column */}
        <aside id="search-filters-sidebar" className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm divide-y divide-gray-100 dark:divide-gray-800/80">
            
            <div className="pb-5">
              <div className="flex items-center gap-2 text-sm font-black text-gray-800 dark:text-gray-200 mb-4">
                <SlidersHorizontal className="h-4.5 w-4.5 text-rose-500" />
                <span>فیلتر محصولات</span>
              </div>
              
              {/* Category selector */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-2">دسته‌بندی</span>
                <button
                  id="filter-category-all"
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    searchFilters.category === 'all'
                      ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-850'
                  }`}
                >
                  همه دسته‌ها
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    id={`filter-category-${cat.slug}`}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                      searchFilters.category === cat.slug
                        ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-850'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price range selector */}
            <div className="py-5 space-y-3">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block">محدوده قیمت</span>
              <div className="flex justify-between items-center text-xs font-black text-rose-600 dark:text-rose-400">
                <span>تا: {(searchFilters.maxPrice / 10).toLocaleString('fa-IR')} ت</span>
                <span className="text-gray-400">صفر ت</span>
              </div>
              <input
                id="price-range-slider"
                type="range"
                min="0"
                max="100000000"
                step="500000"
                value={searchFilters.maxPrice}
                onChange={handlePriceChange}
                className="w-full accent-rose-600"
              />
            </div>

            {/* Brand selector */}
            <div className="py-5">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-3">برندها</span>
              <div className="space-y-2">
                <button
                  id="filter-brand-all"
                  onClick={() => handleBrandChange('all')}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    searchFilters.brand === 'all'
                      ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-850'
                  }`}
                >
                  همه برندها
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    id={`filter-brand-${brand}`}
                    onClick={() => handleBrandChange(brand)}
                    className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      searchFilters.brand === brand
                        ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-850'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating selector */}
            <div className="py-5">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-3">امتیاز خریداران</span>
              <div className="space-y-2">
                {[0, 4, 4.5, 4.8].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    id={`filter-rating-${ratingVal}`}
                    onClick={() => handleRatingChange(ratingVal)}
                    className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                      searchFilters.rating === ratingVal
                        ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-850'
                    }`}
                  >
                    <span>{ratingVal === 0 ? 'هر امتیازی' : `${ratingVal.toLocaleString('fa-IR')} ستاره به بالا`}</span>
                    {ratingVal > 0 && <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Search Results / Products grid - Right Column */}
        <main id="search-results-list" className="lg:col-span-3 space-y-6">
          
          {/* Sorting Header */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4.5 w-4.5 text-gray-400" />
              <span className="text-xs font-black text-gray-500 dark:text-gray-400">مرتب‌سازی براساس:</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'محبوب‌ترین', val: 'popular' },
                { label: 'جدیدترین', val: 'newest' },
                { label: 'ارزان‌ترین', val: 'price-asc' },
                { label: 'گران‌ترین', val: 'price-desc' },
                { label: 'بیشترین امتیاز', val: 'rating' }
              ].map((sortItem) => (
                <button
                  key={sortItem.val}
                  id={`sort-tab-${sortItem.val}`}
                  onClick={() => handleSortChange(sortItem.val as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    searchFilters.sort === sortItem.val
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/10'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                >
                  {sortItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Products */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm">
              <SlidersHorizontal className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto" />
              <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">کالایی یافت نشد!</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
                کالایی مطابق با فیلترهای اعمال شده یا عبارت جستجو پیدا نشد. لطفاً فیلترهای جستجو را مجدداً تنظیم کرده یا عبارت متفاوتی را جستجو کنید.
              </p>
              <button
                id="reset-all-filters-btn"
                onClick={resetFilters}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
              >
                حذف همه فیلترها و جستجو مجدد
              </button>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
