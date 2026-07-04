import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, SlidersHorizontal, Trash2 } from 'lucide-react';

export const ComparisonBar: React.FC = () => {
  const { comparisonList, removeFromComparison, navigateTo } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (comparisonList.length === 0) return null;

  const formatPrice = (price: number, discountPercentage: number) => {
    const finalPrice = price * (1 - discountPercentage / 100);
    return (finalPrice / 10).toLocaleString('fa-IR') + ' تومان';
  };

  // Extract all unique spec keys across compared products
  const allSpecKeys = Array.from(
    new Set(comparisonList.flatMap((p) => p.specifications.map((s) => s.key)))
  );

  return (
    <div id="comparison-bar" className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-40 transition-all duration-300" dir="rtl">
      
      {/* Header Bar */}
      <div 
        id="comparison-header"
        onClick={() => setIsOpen(!isOpen)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
              مقایسه محصولات ({comparisonList.length.toLocaleString('fa-IR')} از ۳ مورد)
            </h4>
            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
              جهت مشاهده جزئیات مقایسه، کلیک کنید
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            id="compare-view-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-rose-600/10 transition-colors"
          >
            {isOpen ? 'بستن مقایسه' : 'نمایش مقایسه'}
          </button>
        </div>
      </div>

      {/* Expanded Modal Content */}
      {isOpen && (
        <div id="comparison-details-panel" className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 max-h-[70vh] overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            
            {/* Products Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {comparisonList.map((product) => (
                <div 
                  key={product.id}
                  id={`compare-item-${product.id}`}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 relative flex flex-col items-center text-center shadow-sm"
                >
                  <button
                    id={`remove-compare-item-${product.id}`}
                    onClick={() => removeFromComparison(product.id)}
                    className="absolute top-2.5 left-2.5 p-1.5 bg-gray-50 hover:bg-red-50 dark:bg-gray-850 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    title="حذف از مقایسه"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <img
                    src={product.images[0]}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="h-24 w-24 object-contain mb-3"
                  />

                  <h5 
                    onClick={() => { setIsOpen(false); navigateTo('product-details', product.id); }}
                    className="text-xs font-bold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-rose-600 cursor-pointer h-8 leading-relaxed mb-1.5"
                  >
                    {product.title}
                  </h5>

                  <p className="text-xs font-black text-rose-600 dark:text-rose-400">
                    {formatPrice(product.price, product.discountPercentage)}
                  </p>
                </div>
              ))}
              
              {/* Placeholders */}
              {Array.from({ length: 3 - comparisonList.length }).map((_, i) => (
                <div 
                  key={`placeholder-${i}`}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full text-gray-400"
                >
                  <SlidersHorizontal className="h-8 w-8 mb-2 text-gray-300 dark:text-gray-700" />
                  <p className="text-xs font-bold">محصول جدید اضافه کنید</p>
                  <p className="text-[10px] text-gray-400 mt-1">از صفحه کالا دکمه مقایسه را بزنید</p>
                </div>
              ))}
            </div>

            {/* Specifications Comparison Table */}
            {allSpecKeys.length > 0 && (
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-850 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">مقایسه مشخصات فنی</h4>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800/80">
                  {allSpecKeys.map((key) => (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 text-xs font-medium">
                      {comparisonList.map((product, index) => {
                        const spec = product.specifications.find((s) => s.key === key);
                        return (
                          <div key={product.id} className="flex flex-col gap-1">
                            <span className="font-bold text-gray-400 dark:text-gray-500 sm:hidden">
                              {key} ({product.brand})
                            </span>
                            <span className="hidden sm:inline font-bold text-gray-400 dark:text-gray-500 mb-1">
                              {index === 0 ? key : ''}
                            </span>
                            <span className="text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-950 p-2 rounded-xl border border-gray-100/50 dark:border-gray-800/50">
                              {spec ? spec.value : '—'}
                            </span>
                          </div>
                        );
                      })}
                      {/* Placeholders specs */}
                      {Array.from({ length: 3 - comparisonList.length }).map((_, i) => (
                        <div key={i} className="hidden sm:block"></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
