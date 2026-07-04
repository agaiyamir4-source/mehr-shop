import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowLeft, Percent, Gift, ChevronLeft } from 'lucide-react';

export const ShoppingCartView: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    navigateTo, 
    showToast 
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Math totals
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const discountAmount = cart.reduce((acc, item) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    const saveAmount = item.product.price - discountedPrice;
    return acc + (saveAmount * item.quantity);
  }, 0);

  const cartTotalBeforeCoupon = subtotal - discountAmount;
  const couponDiscountAmount = cartTotalBeforeCoupon * (discountPercent / 100);
  
  // Shipping cost: Free if over 10,000,000 Rials (1,000,000 Tomans), else 450,000 Rials (45,000 Tomans)
  const shippingFee = cartTotalBeforeCoupon > 10000000 ? 0 : 450000;

  const finalTotal = cartTotalBeforeCoupon - couponDiscountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    
    // Support two codes
    if (couponCode.toUpperCase() === 'MEHR20') {
      setDiscountPercent(20);
      showToast('کد تخفیف ۲۰ درصدی با موفقیت اعمال شد!', 'success');
    } else if (couponCode.toUpperCase() === 'FIRST10') {
      setDiscountPercent(10);
      showToast('کد تخفیف ۱۰ درصدی با موفقیت اعمال شد!', 'success');
    } else {
      showToast('کد تخفیف وارد شده معتبر نمی‌باشد.', 'error');
    }
  };

  const handleProceedToCheckout = () => {
    // Navigate to checkout with discount percentage payload
    navigateTo('checkout', { discountPercent });
  };

  if (cart.length === 0) {
    return (
      <div id="cart-empty-state" className="max-w-md mx-auto text-center py-16 space-y-5" dir="rtl">
        <div className="h-24 w-24 bg-rose-50 dark:bg-rose-950/40 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Trash2 className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-black text-gray-800 dark:text-gray-100">سبد خرید شما خالی است!</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
          در حال حاضر هیچ کالا یا محصولی در سبد خرید شما وجود ندارد. می‌توانید به گالری محصولات برگشته و کالاهای جذابی اضافه کنید.
        </p>
        <button
          id="cart-return-to-shop"
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
        >
          بازگشت به فروشگاه و خرید
        </button>
      </div>
    );
  }

  return (
    <div id="cart-view" className="pb-16" dir="rtl">
      <h1 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-2">
        <span>سبد خرید شما</span>
        <span className="text-xs font-bold text-gray-400">({cartItemsCount.toLocaleString('fa-IR')} کالا)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Items List - Right Column (col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const product = item.product;
            const singleDiscountedPrice = product.price * (1 - product.discountPercentage / 100);
            const itemTotal = singleDiscountedPrice * item.quantity;

            return (
              <div 
                key={product.id}
                id={`cart-item-${product.id}`}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image and title */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-20 w-20 bg-gray-50 dark:bg-gray-950 flex items-center justify-center rounded-xl p-1.5 overflow-hidden border border-gray-100/50">
                    <img src={product.images[0]} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-1">
                    <h3 
                      onClick={() => navigateTo('product-details', product.id)}
                      className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 hover:text-rose-600 cursor-pointer line-clamp-1"
                    >
                      {product.title}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider truncate max-w-[200px]">
                      {product.englishTitle}
                    </p>
                    <p className="text-[10px] font-bold text-rose-500">
                      هر عدد: {(singleDiscountedPrice / 10).toLocaleString('fa-IR')} ت
                    </p>
                  </div>
                </div>

                {/* Quantity adjustments + remove action */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-1.5 rounded-xl">
                    <button
                      id={`cart-qty-plus-${product.id}`}
                      onClick={() => updateCartQuantity(product.id, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-rose-600 dark:text-gray-400 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-black text-gray-800 dark:text-gray-100 px-2 min-w-[20px] text-center">
                      {item.quantity.toLocaleString('fa-IR')}
                    </span>
                    <button
                      id={`cart-qty-minus-${product.id}`}
                      onClick={() => updateCartQuantity(product.id, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-rose-600 dark:text-gray-400 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Subtotal Price for this item */}
                  <div className="text-left">
                    <span className="text-xs font-black text-gray-800 dark:text-gray-200 block">
                      {(itemTotal / 10).toLocaleString('fa-IR')} ت
                    </span>
                    <button
                      id={`cart-remove-btn-${product.id}`}
                      onClick={() => removeFromCart(product.id)}
                      className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>حذف کالا</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Summary Card - Left Column (col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
            <h2 className="text-sm font-black text-gray-800 dark:text-gray-200">خلاصه پیش‌فاکتور</h2>

            {/* Calculations breakdown */}
            <div className="space-y-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800/80 pb-4">
              <div className="flex justify-between">
                <span>قیمت کل کالاها:</span>
                <span className="text-gray-800 dark:text-gray-200">{(subtotal / 10).toLocaleString('fa-IR')} ت</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-500">
                  <span>تخفیف کالاها:</span>
                  <span>- {(discountAmount / 10).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
              {discountPercent > 0 && (
                <div className="flex justify-between text-red-500">
                  <span>کوبون تخفیف ({discountPercent.toLocaleString('fa-IR')}٪):</span>
                  <span>- {(couponDiscountAmount / 10).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>هزینه ارسال پستی:</span>
                <span className="text-gray-800 dark:text-gray-200">
                  {shippingFee === 0 ? 'رایگان' : `${(shippingFee / 10).toLocaleString('fa-IR')} ت`}
                </span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-800 dark:text-gray-200">مبلغ قابل پرداخت:</span>
              <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                {(finalTotal / 10).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            {/* Coupon Promo Form */}
            <form id="coupon-apply-form" onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                id="coupon-input"
                type="text"
                placeholder="کد تخفیف (مثال: MEHR20)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
              />
              <button
                id="apply-coupon-btn"
                type="submit"
                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-700 dark:text-gray-300 hover:text-rose-600 rounded-xl text-xs font-black transition-colors"
              >
                اعمال
              </button>
            </form>

            <div className="space-y-2 pt-2">
              <button
                id="checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md shadow-rose-600/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>ادامه فرآیند خرید</span>
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>

              <button
                id="cart-continue-shopping"
                onClick={() => navigateTo('home')}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-xs rounded-xl transition-colors"
              >
                ادامه خرید و مشاهده محصولات بیشتر
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
