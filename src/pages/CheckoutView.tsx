import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, MapPin, CreditCard, ChevronLeft, Calendar } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    user, 
    checkoutDiscount, 
    placeOrder, 
    navigateTo, 
    showToast 
  } = useStore();

  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [deliveryMethod, setDeliveryMethod] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (cart.length === 0) {
    return (
      <div className="text-center py-20" dir="rtl">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">سبد خرید شما خالی است. فرآیند سفارش متوقف شد.</h2>
        <button onClick={() => navigateTo('home')} className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl">برگشت به خانه</button>
      </div>
    );
  }

  // Mathematics
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const discountAmount = cart.reduce((acc, item) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    const saveAmount = item.product.price - discountedPrice;
    return acc + (saveAmount * item.quantity);
  }, 0);

  const cartTotalBeforeCoupon = subtotal - discountAmount;
  const couponDiscountAmount = cartTotalBeforeCoupon * (checkoutDiscount / 100);
  
  // Shipping cost based on option
  const deliveryCost = deliveryMethod === 'express' ? 450000 : 250000;
  // Free shipping for orders above 10,000,000 Rials (1,000,000 Tomans)
  const finalDeliveryCost = cartTotalBeforeCoupon > 10000000 ? 0 : deliveryCost;

  const finalTotal = cartTotalBeforeCoupon - couponDiscountAmount + finalDeliveryCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress || !phoneNumber || !fullName) {
      showToast('لطفا اطلاعات تحویل‌گیرنده و آدرس ارسال را کامل کنید.', 'error');
      return;
    }

    const deliveryMethodLabel = deliveryMethod === 'express' ? 'ارسال سریع اکسپرس' : 'ارسال پست سفارشی';
    const paymentMethodLabel = paymentMethod === 'card' ? 'درگاه پرداخت آنلاین شتاب' : 'پرداخت نقدی در محل';

    placeOrder(
      `${fullName} - تلفن: ${phoneNumber} - آدرس: ${shippingAddress}`,
      deliveryMethodLabel,
      paymentMethodLabel,
      checkoutDiscount
    );
  };

  return (
    <div id="checkout-view" className="pb-16" dir="rtl">
      <h1 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-8">فرآیند نهایی‌سازی خرید و پرداخت</h1>

      <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checkout Steps/Forms - Right Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Delivery Information */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <MapPin className="h-4.5 w-4.5 text-rose-500" />
              <span>اطلاعات تحویل‌گیرنده و آدرس ارسال</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-gray-500 dark:text-gray-400">
              <div>
                <label className="block mb-1.5">نام و نام خانوادگی تحویل‌گیرنده</label>
                <input
                  id="checkout-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block mb-1.5">شماره تماس اضطراری</label>
                <input
                  id="checkout-phone"
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
              <label className="block mb-1.5">نشانی دقیق پستی</label>
              <textarea
                id="checkout-address"
                rows={3}
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="کامل‌ترین نشانی پستی خود را به همراه کد پستی و شماره پلاک وارد کنید..."
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
              ></textarea>
            </div>
          </div>

          {/* Step 2: Shipping Method */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Truck className="h-4.5 w-4.5 text-rose-500" />
              <span>روش ارسال مرسوله</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                id="shipping-express-card"
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 border rounded-2xl cursor-pointer flex flex-col gap-2 transition-all ${
                  deliveryMethod === 'express'
                    ? 'border-rose-500 bg-rose-50/20 ring-2 ring-rose-500/10'
                    : 'border-gray-100 hover:border-gray-200 bg-white dark:bg-gray-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-gray-800 dark:text-gray-100">ارسال پیشتاز اکسپرس</span>
                  <span className="text-rose-600">۴۵,۰۰۰ تومان</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                  تحویل درب منزل در سریع‌ترین زمان ممکن (بین ۲۴ تا ۴۸ ساعت کاری در سراسر کشور)
                </p>
              </div>

              <div 
                id="shipping-regular-card"
                onClick={() => setDeliveryMethod('regular')}
                className={`p-4 border rounded-2xl cursor-pointer flex flex-col gap-2 transition-all ${
                  deliveryMethod === 'regular'
                    ? 'border-rose-500 bg-rose-50/20 ring-2 ring-rose-500/10'
                    : 'border-gray-100 hover:border-gray-200 bg-white dark:bg-gray-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-gray-800 dark:text-gray-100">پست سفارشی معمولی</span>
                  <span className="text-rose-600">۲۵,۰۰۰ تومان</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                  تحویل مرسوله از طریق شرکت پست جمهوری اسلامی ایران (بین ۳ تا ۵ روز کاری)
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <CreditCard className="h-4.5 w-4.5 text-rose-500" />
              <span>شیوه پرداخت هزینه سفارش</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                id="payment-card-card"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border rounded-2xl cursor-pointer flex flex-col gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-rose-500 bg-rose-50/20 ring-2 ring-rose-500/10'
                    : 'border-gray-100 hover:border-gray-200 bg-white dark:bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs font-black">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-800 dark:text-gray-100">درگاه پرداخت شتاب (کارت به کارت آنلاین)</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-semibold mt-1">
                  پرداخت مستقیم و سریع از طریق تمام کارت‌های بانکی عضو شبکه شتاب با امنیت کامل.
                </p>
              </div>

              <div 
                id="payment-cash-card"
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border rounded-2xl cursor-pointer flex flex-col gap-2 transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-rose-500 bg-rose-50/20 ring-2 ring-rose-500/10'
                    : 'border-gray-100 hover:border-gray-200 bg-white dark:bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs font-black">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-800 dark:text-gray-100">پرداخت نقدی درب منزل</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-semibold mt-1">
                  پرداخت مبلغ سفارش هنگام دریافت کالا با کارت‌خوان سیار مامور ارسال.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Invoice Summary - Left Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">فاکتور نهایی سفارش</h3>

            {/* Items mini review */}
            <div className="space-y-3.5 max-h-36 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs font-bold text-gray-600 dark:text-gray-400">
                  <span className="truncate max-w-[150px]">{item.product.title}</span>
                  <span>({item.quantity.toLocaleString('fa-IR')} عدد)</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800"></div>

            {/* Calculations breakdown */}
            <div className="space-y-3 text-xs font-bold text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>سبد خرید:</span>
                <span className="text-gray-800 dark:text-gray-200">{(subtotal / 10).toLocaleString('fa-IR')} ت</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-500">
                  <span>تخفیف کالاها:</span>
                  <span>- {(discountAmount / 10).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
              {checkoutDiscount > 0 && (
                <div className="flex justify-between text-red-500">
                  <span>کوبون تخفیف:</span>
                  <span>- {((cartTotalBeforeCoupon * (checkoutDiscount / 100)) / 10).toLocaleString('fa-IR')} ت</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ارسال پستی ({deliveryMethod === 'express' ? 'پیشتاز' : 'معمولی'}):</span>
                <span className="text-gray-800 dark:text-gray-200">
                  {finalDeliveryCost === 0 ? 'رایگان' : `${(finalDeliveryCost / 10).toLocaleString('fa-IR')} ت`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800"></div>

            {/* Final Cost */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-800 dark:text-gray-200">مبلغ قابل پرداخت:</span>
              <span className="text-base font-black text-rose-600 dark:text-rose-400">
                {(finalTotal / 10).toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <div className="pt-2">
              <button
                id="place-order-submit-btn"
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md shadow-rose-600/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>ثبت نهایی و پرداخت سفارش</span>
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              
              <button
                id="checkout-back-to-cart"
                type="button"
                onClick={() => navigateTo('cart')}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-xs rounded-xl transition-colors mt-2"
              >
                بازگشت به سبد خرید
              </button>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
