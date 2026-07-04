import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Award, 
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  MessageSquare,
  User
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailsView: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    addToComparison, 
    showToast, 
    navigateTo 
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Review Input State
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [customReviews, setCustomReviews] = useState<{username: string, rating: number, date: string, title: string, comment: string}[]>([]);

  if (!product) {
    return (
      <div className="text-center py-20" dir="rtl">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">محصول مورد نظر یافت نشد.</h2>
        <button onClick={() => navigateTo('home')} className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl">برگشت به خانه</button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const formatPrice = (price: number) => {
    return (price / 10).toLocaleString('fa-IR') + ' تومان';
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('لینک صفحه محصول با موفقیت کپی شد!', 'success');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewTitle || !reviewComment) {
      showToast('لطفا تمام فیلدها را پر کنید.', 'error');
      return;
    }
    const newRev = {
      username: reviewName,
      rating: reviewRating,
      date: new Date().toLocaleDateString('fa-IR'),
      title: reviewTitle,
      comment: reviewComment
    };
    setCustomReviews([newRev, ...customReviews]);
    showToast('دیدگاه شما با موفقیت ثبت و منتشر شد.', 'success');
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
  };

  // Similar Products (same category, different id)
  const similarProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div id="product-details-view" className="space-y-12 pb-16" dir="rtl">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <button id="breadcrumb-home" onClick={() => navigateTo('home')} className="hover:text-rose-600">خانه</button>
        <ChevronRight className="h-3.5 w-3.5" />
        <button id="breadcrumb-category" onClick={() => navigateTo('search', { category: product.category })} className="hover:text-rose-600">
          {product.category === 'digital' ? 'کالای دیجیتال' : product.category === 'home-appliances' ? 'لوازم خانگی' : 'محصولات'}
        </button>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-400 dark:text-gray-600 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* 2. Main Product Section */}
      <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Gallery - Left Column (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Active Image Display */}
            <div className="relative border border-gray-100 dark:border-gray-850 bg-gray-50 dark:bg-gray-950/60 rounded-2xl h-80 sm:h-96 w-full flex items-center justify-center p-6 overflow-hidden">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain transform hover:scale-102 transition-transform"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <button
                  id="share-product-btn"
                  onClick={handleShare}
                  className="p-2.5 bg-white dark:bg-gray-850 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-600 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm transition-colors"
                  title="اشتراک گذاری"
                >
                  <Share2 className="h-4.5 w-4.5" />
                </button>
                <button
                  id="wishlist-detail-btn"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 border rounded-xl shadow-sm transition-colors ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-100 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900/30' 
                      : 'bg-white border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:bg-gray-850 dark:border-gray-700'
                  }`}
                  title="افزودن به علاقمندی‌ها"
                >
                  <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`h-16 w-16 p-1 border rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-all ${
                      activeImageIdx === idx 
                        ? 'border-rose-500 ring-2 ring-rose-500/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Details - Right Column (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 leading-relaxed">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {product.englishTitle}
                </p>
              </div>

              {/* Brand and category info */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span>برند:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">{product.brand}</span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-1">
                  <span>امتیاز:</span>
                  <div className="flex items-center text-amber-500 font-bold gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{product.rating.toLocaleString('fa-IR')}</span>
                  </div>
                  <span>({product.ratingCount.toLocaleString('fa-IR')} دیدگاه کاربران)</span>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 my-4"></div>

              {/* Description summary */}
              <div>
                <h3 className="text-sm font-black text-gray-800 dark:text-gray-200 mb-2">توضیحات کوتاه</h3>
                <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-400 leading-relaxed font-semibold">
                  {product.description}
                </p>
              </div>

              {/* Digikala-like Store Advantage Boxes */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-950/40 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-100/40 dark:border-gray-850">
                  <ShieldCheck className="h-4.5 w-4.5 text-rose-500" />
                  <span>گارانتی ۱۸ ماهه پارس گستر</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-950/40 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 border border-gray-100/40 dark:border-gray-850">
                  <Truck className="h-4.5 w-4.5 text-rose-500" />
                  <span>ارسال ویژه مهرپست (اکسپرس)</span>
                </div>
              </div>
            </div>

            {/* Shopping Box Widget */}
            <div className="bg-gray-50 dark:bg-gray-950/40 border border-gray-100 dark:border-gray-850 rounded-2xl p-4 sm:p-6 mt-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-6">
              
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">قیمت نهایی کالا:</span>
                <div className="flex flex-col">
                  {product.discountPercentage > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                        {formatPrice(discountedPrice)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {(product.price / 10).toLocaleString('fa-IR')}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-black text-gray-800 dark:text-gray-100">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold block ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {product.stock > 0 ? `در انبار موجود است (تنها ${product.stock.toLocaleString('fa-IR')} عدد باقی‌مانده)` : 'ناموجود'}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id="add-to-compare-details"
                  onClick={() => addToComparison(product)}
                  className="p-3 bg-white dark:bg-gray-850 hover:bg-rose-50 text-gray-500 hover:text-rose-600 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-colors"
                  title="مقایسه با سایر محصولات"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>

                <button
                  id="add-to-cart-details"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 sm:flex-none px-6 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 text-white font-black text-sm rounded-xl shadow-md shadow-rose-600/15 flex items-center justify-center gap-2 transition-all hover:scale-101"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>افزودن به سبد خرید</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Specifications Table */}
      <section id="product-specs" className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="h-5.5 w-5.5 text-rose-500" />
          <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">مشخصات فنی محصول</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {product.specifications.map((spec, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 p-4 text-xs font-semibold gap-2">
                <span className="text-gray-400 dark:text-gray-500 md:col-span-1">{spec.key}</span>
                <span className="text-gray-800 dark:text-gray-200 md:col-span-3 bg-gray-50 dark:bg-gray-950 p-2 rounded-lg font-bold">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customer reviews input and feedback */}
      <section id="reviews-section" className="space-y-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5.5 w-5.5 text-rose-500" />
          <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">نظرات و دیدگاه کاربران</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Write a comment - Right Column */}
          <div className="lg:col-span-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm h-fit">
            <h3 className="text-sm font-black text-gray-800 dark:text-gray-200 mb-4">ثبت دیدگاه جدید</h3>
            <form id="add-review-form" onSubmit={handleAddReview} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-gray-500 block mb-1">نام و نام خانوادگی</label>
                <input
                  id="review-username"
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="text-gray-500 block mb-1">امتیاز شما</label>
                <select
                  id="review-rating-select"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                >
                  <option value={5}>۵ ستاره (عالی)</option>
                  <option value={4}>۴ ستاره (خوب)</option>
                  <option value={3}>۳ ستاره (متوسط)</option>
                  <option value={2}>۲ ستاره (ضعیف)</option>
                  <option value={1}>۱ ستاره (بسیار ضعیف)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-500 block mb-1">عنوان نظر</label>
                <input
                  id="review-title-input"
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="text-gray-500 block mb-1">متن نظر شما</label>
                <textarea
                  id="review-comment-textarea"
                  rows={4}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                ></textarea>
              </div>

              <button
                id="submit-review-btn"
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-sm transition-colors"
              >
                ارسال و انتشار دیدگاه
              </button>
            </form>
          </div>

          {/* User Reviews List - Left Column */}
          <div className="lg:col-span-8 space-y-4">
            {customReviews.length > 0 && (
              <div className="space-y-4 border-b border-gray-100 dark:border-gray-800/80 pb-6">
                <h3 className="text-sm font-black text-rose-600 dark:text-rose-400">نظرات اخیر شما</h3>
                {customReviews.map((rev, idx) => (
                  <div key={idx} className="bg-rose-50/20 dark:bg-rose-950/10 border border-rose-100/50 dark:border-rose-900/10 p-5 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{rev.username}</span>
                      <div className="flex items-center text-amber-500 gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-black text-rose-600">{rev.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
              <div className="pb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 dark:bg-gray-850 rounded-lg text-gray-400">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">امیر مسعودی</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">۱۴۰۵/۰۲/۱۵</span>
                </div>
                <div className="flex items-center text-amber-500 gap-0.5 mb-2">
                  <Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <p className="text-xs font-black text-rose-600 dark:text-rose-400">بسیار کاربردی و باکیفیت</p>
                <p className="text-xs text-gray-650 dark:text-gray-400 leading-relaxed font-medium">
                  این کالا رو از شگفت‌انگیز خریدم. قیمت فوق‌العاده رقابتی بود و پکیجینگ شرکت ارسالی هم عالی بود. بسیار پیشنهاد میشه.
                </p>
              </div>

              <div className="pt-4 pb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 dark:bg-gray-850 rounded-lg text-gray-400">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">مریم احمدی</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">۱۴۰۵/۰۱/۲۰</span>
                </div>
                <div className="flex items-center text-amber-500 gap-0.5 mb-2">
                  <Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <p className="text-xs font-black text-rose-600 dark:text-rose-400">خرید خوبی بود</p>
                <p className="text-xs text-gray-650 dark:text-gray-400 leading-relaxed font-medium">
                  کیفیت خوبی داره ولی بعد از دو هفته یه کم قیمتش پایین اومد که ضدحال بود. در کل کار راه بنداز و مقاومت جنس بدنه راضی کننده هست.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Similar Products */}
      {similarProducts.length > 0 && (
        <section id="similar-products" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Award className="h-5.5 w-5.5 text-rose-500" />
              <span>کالاهای مشابه و پیشنهادی</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
