import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Star, Heart, ShoppingCart, SlidersHorizontal } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist, addToComparison, comparisonList } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = comparisonList.some((p) => p.id === product.id);

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  // Format price in Persian Style (TOMANS)
  const formatPrice = (price: number) => {
    return (price / 10).toLocaleString('fa-IR') + ' تومان';
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToComparison(product);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={() => navigateTo('product-details', product.id)}
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 cursor-pointer relative flex flex-col justify-between hover:shadow-xl dark:hover:shadow-rose-950/10 transition-all duration-300 transform hover:-translate-y-1 select-none"
    >
      {/* Badges and actions bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          {product.discountPercentage > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white font-black text-xs rounded-lg shadow-sm">
              {product.discountPercentage.toLocaleString('fa-IR')}٪ تخفیف
            </span>
          )}
          {product.isSpecialOffer && (
            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 font-bold text-[10px] rounded-md border border-rose-200 dark:border-rose-900/40">
              شگفت‌انگیز
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={handleToggleWishlist}
            className={`p-2 rounded-xl border shadow-sm transition-all ${
              isWishlisted 
                ? 'bg-rose-50 border-rose-100 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900/30' 
                : 'bg-white border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:bg-gray-800 dark:border-gray-700'
            }`}
          >
            <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          <button
            id={`compare-btn-${product.id}`}
            onClick={handleAddToCompare}
            className={`p-2 rounded-xl border shadow-sm transition-all ${
              isCompared 
                ? 'bg-blue-50 border-blue-100 text-blue-500 dark:bg-blue-950/40 dark:border-blue-900/30' 
                : 'bg-white border-gray-100 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-700'
            }`}
            title="مقایسه محصول"
          >
            <SlidersHorizontal className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Image Gallery Container */}
      <div className="h-44 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-950 mb-4 p-2">
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Titles and Ratings */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 h-10 leading-relaxed group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-[10px] font-mono font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider truncate mb-1">
          {product.englishTitle}
        </p>

        {/* Rating and Reviews Count */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-500 gap-0.5 font-bold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{product.rating.toLocaleString('fa-IR')}</span>
          </div>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <span className="text-gray-400 dark:text-gray-500 font-semibold">
            ({product.ratingCount.toLocaleString('fa-IR')} نظر)
          </span>
        </div>
      </div>

      {/* Pricing and Basket action */}
      <div className="border-t border-gray-100 dark:border-gray-800/80 pt-3 mt-4 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          {product.discountPercentage > 0 ? (
            <>
              <span className="text-xs text-gray-400 dark:text-gray-600 line-through font-semibold">
                {(product.price / 10).toLocaleString('fa-IR')}
              </span>
              <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                {formatPrice(discountedPrice)}
              </span>
            </>
          ) : (
            <span className="text-sm font-black text-gray-800 dark:text-gray-100">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
          className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md shadow-rose-600/10 transition-colors"
          title="افزودن به سبد خرید"
        >
          <ShoppingCart className="h-4.5 w-4.5" />
        </button>
      </div>

    </div>
  );
};
