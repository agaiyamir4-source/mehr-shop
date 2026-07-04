import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Heart, ShoppingBag, MapPin, Phone, Mail, ArrowLeft, Trash2, ShieldCheck } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    user, 
    updateProfile, 
    wishlist, 
    products, 
    toggleWishlist, 
    addToCart, 
    orders, 
    navigateTo, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'info' | 'wishlist' | 'orders'>('info');

  // Profile forms
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState(user?.address || '');

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4" dir="rtl">
        <User className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto" />
        <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">جهت دسترسی به پروفایل، ابتدا وارد شوید</h2>
        <p className="text-xs text-gray-500">جهت بررسی وضعیت سفارش‌ها، لیست علاقمندی‌ها و ویرایش اطلاعات، باید ابتدا به حساب خود وارد شوید.</p>
        <button onClick={() => navigateTo('auth')} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm">
          ورود / ثبت‌نام در مهرشاپ
        </button>
      </div>
    );
  }

  // Get wishlisted products objects
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(displayName, phoneNumber, address);
  };

  const formatPrice = (price: number) => {
    return (price / 10).toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div id="profile-view" className="pb-16" dir="rtl">
      
      {/* Top Banner Grid */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-3xl p-6 sm:p-8 text-white mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-rose-500 text-2xl font-black shadow-inner">
            {user.displayName.substring(0, 1)}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black">{user.displayName}</h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">{user.email}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl text-center">
            <span className="text-[10px] text-gray-400 font-bold block">سفارش‌ها</span>
            <span className="text-lg font-black">{orders.length.toLocaleString('fa-IR')}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl text-center">
            <span className="text-[10px] text-gray-400 font-bold block">علاقمندی‌ها</span>
            <span className="text-lg font-black">{wishlist.length.toLocaleString('fa-IR')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Tabs List - Right Column */}
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl shadow-sm flex flex-col gap-2">
            <button
              id="profile-tab-info"
              onClick={() => setActiveTab('info')}
              className={`w-full text-right px-4 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-3 ${
                activeTab === 'info'
                  ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                  : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
              }`}
            >
              <User className="h-5 w-5" />
              <span>ویرایش مشخصات پروفایل</span>
            </button>

            <button
              id="profile-tab-wishlist"
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-right px-4 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-3 ${
                activeTab === 'wishlist'
                  ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                  : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>لیست علاقمندی‌ها ({wishlist.length.toLocaleString('fa-IR')})</span>
            </button>

            <button
              id="profile-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`w-full text-right px-4 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-3 ${
                activeTab === 'orders'
                  ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                  : 'text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>تاریخچه سفارش‌های من ({orders.length.toLocaleString('fa-IR')})</span>
            </button>
          </div>
        </aside>

        {/* Selected Content - Left Column */}
        <main className="lg:col-span-3">
          
          {/* Profile info editor */}
          {activeTab === 'info' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-black text-gray-800 dark:text-gray-100">ویرایش مشخصات شخصی و نشانی</h2>
              
              <form id="profile-edit-form" onSubmit={handleUpdateProfileSubmit} className="space-y-4 text-xs font-bold text-gray-500 dark:text-gray-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block">نام و نام خانوادگی کامل</label>
                    <input
                      id="profile-name"
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block">شماره تماس (تلفن همراه)</label>
                    <input
                      id="profile-phone"
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block">نشانی دقیق جهت ارسال مرسولات</label>
                  <textarea
                    id="profile-address"
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="نشانی پستی دقیق به همراه کد پستی، پلاک و زنگ آپارتمان..."
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  ></textarea>
                </div>

                <button
                  id="profile-save-btn"
                  type="submit"
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md shadow-rose-600/10 transition-colors"
                >
                  ذخیره و ثبت تغییرات اطلاعات
                </button>
              </form>
            </div>
          )}

          {/* Wishlist management */}
          {activeTab === 'wishlist' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-black text-gray-800 dark:text-gray-100">محصولات مورد علاقه من</h2>

              {wishlistedProducts.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-800 space-y-4">
                  {wishlistedProducts.map((p) => (
                    <div 
                      key={p.id}
                      id={`wishlist-item-${p.id}`}
                      className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 pt-4 first:pt-0"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <img src={p.images[0]} alt="" className="h-16 w-16 object-contain rounded-xl bg-gray-50 p-1" referrerPolicy="no-referrer" />
                        <div>
                          <h3 
                            onClick={() => navigateTo('product-details', p.id)}
                            className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 hover:text-rose-600 cursor-pointer line-clamp-1"
                          >
                            {p.title}
                          </h3>
                          <p className="text-[10px] font-bold text-rose-500 mt-1">
                            {formatPrice(p.price * (1 - p.discountPercentage / 100))}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          id={`wishlist-add-to-cart-${p.id}`}
                          onClick={() => addToCart(p, 1)}
                          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          خرید کالا
                        </button>
                        <button
                          id={`wishlist-delete-${p.id}`}
                          onClick={() => toggleWishlist(p.id)}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          title="حذف از علاقمندی‌ها"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <Heart className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto" />
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">هیچ کالایی در لیست علاقمندی‌ها یافت نشد.</p>
                </div>
              )}
            </div>
          )}

          {/* Orders History list */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-black text-gray-800 dark:text-gray-100">تاریخچه سفارش‌ها و فاکتورها</h2>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      id={`order-card-${order.id}`}
                      className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5 space-y-4 shadow-sm"
                    >
                      {/* Order status bar */}
                      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                        <div className="text-xs font-black flex items-center gap-3">
                          <span className="text-gray-800 dark:text-gray-100">کد رهگیری: {order.id}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-550 dark:text-gray-400">{order.date}</span>
                        </div>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-100">
                          پرداخت و ثبت شده (آماده ارسال)
                        </span>
                      </div>

                      {/* Items loop */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.product.id} className="flex justify-between items-center text-xs font-bold text-gray-600 dark:text-gray-400">
                            <span className="truncate max-w-[200px] hover:text-rose-600 cursor-pointer" onClick={() => navigateTo('product-details', item.product.id)}>
                              {item.product.title}
                            </span>
                            <span>{item.quantity.toLocaleString('fa-IR')} عدد</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Address and Info */}
                      <div className="text-[10px] font-bold text-gray-450 dark:text-gray-500 bg-gray-50/50 dark:bg-gray-950/50 p-2.5 rounded-xl border border-gray-100/50 dark:border-gray-850">
                        <span className="block mb-1">گیرنده و نشانی: {order.shippingAddress}</span>
                        <span className="block">روش پرداخت: {order.paymentMethod} • روش ارسال: {order.deliveryMethod}</span>
                      </div>

                      {/* Total Price */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-black text-gray-500">مجموع هزینه پرداخت شده:</span>
                        <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                          {formatPrice(order.totalPrice)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <ShoppingBag className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto" />
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">هیچ سفارشی برای شما ثبت نشده است.</p>
                </div>
              )}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
