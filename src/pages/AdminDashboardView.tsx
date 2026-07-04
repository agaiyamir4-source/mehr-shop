import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/mockData';
import { Product, Specification } from '../types';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Trash2, 
  Edit, 
  ShoppingBag, 
  Tag, 
  TrendingUp, 
  Users, 
  Box, 
  CheckCircle,
  Sliders,
  DollarSign
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    user, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'discounts'>('stats');

  // Add Product form state
  const [prodTitle, setProdTitle] = useState('');
  const [prodEngTitle, setProdEngTitle] = useState('');
  const [prodPrice, setProdPrice] = useState(1000000); // Rials
  const [prodDiscount, setProdDiscount] = useState(0);
  const [prodStock, setProdStock] = useState(10);
  const [prodCategory, setProdCategory] = useState('digital');
  const [prodBrand, setProdBrand] = useState('سامسونگ');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=600&h=600&q=80');
  const [prodDesc, setProdDesc] = useState('');

  // Editing Product state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Discount Coupons form state
  const [coupons, setCoupons] = useState([
    { code: 'MEHR20', discount: 20 },
    { code: 'FIRST10', discount: 10 }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4" dir="rtl">
        <LayoutDashboard className="h-16 w-16 text-rose-500 mx-auto animate-pulse" />
        <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">دسترسی محدود شده است</h2>
        <p className="text-xs text-gray-500">جهت دسترسی به پنل مدیریت سیستم باید با حساب کاربری مدیر کل (با ایمیل حاوی کلمه admin) وارد شده باشید.</p>
      </div>
    );
  }

  // Statistics calculation
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  
  // Simulated sales calculations based on orders
  const totalSalesVolume = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const totalOrdersCount = orders.length;

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle || !prodDesc) {
      showToast('لطفا عنوان و توضیحات محصول را وارد کنید.', 'error');
      return;
    }

    const defaultSpecs: Specification[] = [
      { key: 'موجودی انبار', value: `${prodStock} عدد` },
      { key: 'کشور سازنده', value: 'چین' },
      { key: 'برند رسمی', value: prodBrand }
    ];

    if (editingId) {
      const existing = products.find((p) => p.id === editingId);
      if (existing) {
        updateProduct({
          ...existing,
          title: prodTitle,
          englishTitle: prodEngTitle,
          price: prodPrice,
          discountPercentage: prodDiscount,
          stock: prodStock,
          category: prodCategory,
          brand: prodBrand,
          images: [prodImage],
          description: prodDesc,
          specifications: defaultSpecs
        });
        setEditingId(null);
      }
    } else {
      addProduct({
        title: prodTitle,
        englishTitle: prodEngTitle,
        price: prodPrice,
        discountPercentage: prodDiscount,
        stock: prodStock,
        category: prodCategory,
        brand: prodBrand,
        images: [prodImage],
        description: prodDesc,
        specifications: defaultSpecs,
        isNewArrival: true
      });
    }

    // Reset Form
    setProdTitle('');
    setProdEngTitle('');
    setProdPrice(1000000);
    setProdDiscount(0);
    setProdStock(10);
    setProdCategory('digital');
    setProdBrand('سامسونگ');
    setProdDesc('');
  };

  const handleEditClick = (p: Product) => {
    setEditingId(p.id);
    setProdTitle(p.title);
    setProdEngTitle(p.englishTitle);
    setProdPrice(p.price);
    setProdDiscount(p.discountPercentage);
    setProdStock(p.stock);
    setProdCategory(p.category);
    setProdBrand(p.brand);
    setProdImage(p.images[0]);
    setProdDesc(p.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    setCoupons([...coupons, { code: newCouponCode.toUpperCase(), discount: newCouponDiscount }]);
    showToast('کوبون تخفیف جدید با موفقیت فعال شد.', 'success');
    setNewCouponCode('');
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons(coupons.filter((c) => c.code !== code));
    showToast('کوبون تخفیف با موفقیت حذف شد.', 'info');
  };

  const formatPrice = (price: number) => {
    return (price / 10).toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <div id="admin-view" className="pb-16" dir="rtl">
      
      {/* Top Admin Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-150 pb-5">
        <div>
          <h1 className="text-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-rose-500" />
            <span>میز کار پنل مدیریت سیستم</span>
          </h1>
          <p className="text-xs text-gray-400 font-bold mt-1">مدیریت محصولات، سفارش‌ها، تخفیف‌ها و گزارش‌های مالی فروشگاه</p>
        </div>

        {/* Horizontal Navigation Menu */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'stats', label: 'آمار کلی', icon: <TrendingUp className="h-4 w-4" /> },
            { id: 'products', label: 'محصولات', icon: <Box className="h-4 w-4" /> },
            { id: 'orders', label: 'سفارش‌ها', icon: <ShoppingBag className="h-4 w-4" /> },
            { id: 'discounts', label: 'کدهای تخفیف', icon: <Tag className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`admin-tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/10'
                  : 'bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB CONTENTS */}

      {/* 1. Statistics Summary */}
      {activeTab === 'stats' && (
        <div className="space-y-8">
          {/* Quick numbers row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-1">
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-xs font-bold">کل درآمدهای مالی</span>
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-black text-gray-800 dark:text-gray-100">{formatPrice(totalSalesVolume)}</h3>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-1">
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-xs font-bold">کل سفارشات ثبت‌شده</span>
                <ShoppingBag className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="text-lg font-black text-gray-800 dark:text-gray-100">{totalOrdersCount.toLocaleString('fa-IR')} عدد</h3>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-1">
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-xs font-bold">تنوع کل کالاها</span>
                <Box className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-black text-gray-800 dark:text-gray-100">{totalProducts.toLocaleString('fa-IR')} محصول</h3>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-1">
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-xs font-bold">تعداد کل کالاها در انبار</span>
                <Sliders className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-black text-gray-800 dark:text-gray-100">{totalStock.toLocaleString('fa-IR')} عدد</h3>
            </div>
          </div>

          {/* Simple Visual Analytics (Tailwind Bar progress indicators) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Best categories report */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">سهم دسته‌بندی‌ها از تنوع محصولات</h3>
              <div className="space-y-4 text-xs font-bold">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.slug).length;
                  const percentage = totalProducts > 0 ? (count / totalProducts) * 100 : 0;
                  return (
                    <div key={cat.id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                        <span>{cat.name}</span>
                        <span>{count.toLocaleString('fa-IR')} کالا ({Math.round(percentage)}٪)</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inventory alert warnings */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">هشدارهای رو به اتمام انبار (زیر ۱۰ عدد)</h3>
              <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-56 overflow-y-auto pr-1">
                {products.filter((p) => p.stock < 10).map((prod) => (
                  <div key={prod.id} className="flex justify-between items-center py-2.5 text-xs font-bold">
                    <span className="text-gray-800 dark:text-gray-200 truncate max-w-[200px]">{prod.title}</span>
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 rounded-md">
                      فقط {prod.stock.toLocaleString('fa-IR')} عدد موجود!
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Manage Products (Add / Edit / Remove) */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add / Edit Product Form - Right Column */}
          <div className="lg:col-span-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm h-fit space-y-4">
            <h3 className="text-sm font-black text-gray-850 dark:text-gray-200">
              {editingId ? 'ویرایش مشخصات کالا' : 'افزودن محصول جدید به فروشگاه'}
            </h3>

            <form id="add-product-form" onSubmit={handleAddProductSubmit} className="space-y-3 text-xs font-bold text-gray-500 dark:text-gray-400">
              <div>
                <label className="block mb-1">نام محصول (فارسی)</label>
                <input
                  id="admin-p-title"
                  type="text"
                  required
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block mb-1">نام محصول (انگلیسی)</label>
                <input
                  id="admin-p-engtitle"
                  type="text"
                  required
                  value={prodEngTitle}
                  onChange={(e) => setProdEngTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">قیمت (به ریال)</label>
                  <input
                    id="admin-p-price"
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block mb-1">تخفیف (درصد)</label>
                  <input
                    id="admin-p-discount"
                    type="number"
                    min="0"
                    max="90"
                    value={prodDiscount}
                    onChange={(e) => setProdDiscount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">موجودی انبار</label>
                  <input
                    id="admin-p-stock"
                    type="number"
                    min="1"
                    value={prodStock}
                    onChange={(e) => setProdStock(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block mb-1">دسته بندی</label>
                  <select
                    id="admin-p-category"
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1">برند کالا</label>
                <input
                  id="admin-p-brand"
                  type="text"
                  required
                  value={prodBrand}
                  onChange={(e) => setProdBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block mb-1">تصویر کالا (آدرس URL)</label>
                <input
                  id="admin-p-image"
                  type="text"
                  required
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-850 dark:text-gray-200 font-mono"
                />
              </div>

              <div>
                <label className="block mb-1">توضیحات و نقد محصول</label>
                <textarea
                  id="admin-p-desc"
                  rows={4}
                  required
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-850 dark:text-gray-200"
                ></textarea>
              </div>

              <button
                id="add-product-submit"
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-sm transition-colors"
              >
                {editingId ? 'ثبت و بروزرسانی تغییرات کالا' : 'افزودن و انتشار محصول'}
              </button>

              {editingId && (
                <button
                  id="cancel-editing-btn"
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setProdTitle('');
                    setProdDesc('');
                  }}
                  className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors text-xs"
                >
                  انصراف از ویرایش
                </button>
              )}
            </form>
          </div>

          {/* Products List - Left Column */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">آرشیو محصولات فعال فروشگاه</h3>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[600px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 py-3 first:pt-0">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img src={p.images[0]} alt="" className="h-12 w-12 object-contain bg-gray-50 rounded-lg p-1" referrerPolicy="no-referrer" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{p.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-0.5">قیمت: {formatPrice(p.price)} • انبار: {p.stock.toLocaleString('fa-IR')} عدد</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      id={`edit-p-btn-${p.id}`}
                      onClick={() => handleEditClick(p)}
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="ویرایش کالا"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      id={`delete-p-btn-${p.id}`}
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                      title="حذف کالا"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 3. Manage Placed Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm space-y-6">
          <h3 className="text-sm font-black text-gray-850 dark:text-gray-200">مدیریت سفارش‌ها و محموله‌های مشتریان</h3>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 text-xs font-black">
                      <span className="text-gray-800 dark:text-gray-200">سفارش: {order.id}</span>
                      <span className="text-gray-400">|</span>
                      <span>{order.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold">ارسال به: {order.shippingAddress}</p>
                    <p className="text-[10px] text-gray-400 font-bold">هزینه نهایی پرداخت شده: {formatPrice(order.totalPrice)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-100">
                      پرداخت شده
                    </span>
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400 text-[10px] font-black rounded-lg border border-rose-100">
                      آماده بسته‌بندی
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2 text-gray-400">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-300" />
              <p className="text-xs font-bold">هیچ سفارشی در سیستم ثبت نشده است.</p>
            </div>
          )}
        </div>
      )}

      {/* 4. Manage Discount Coupons */}
      {activeTab === 'discounts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coupon Generator Form */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm h-fit space-y-4">
            <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">ایجاد کد تخفیف جدید</h3>
            
            <form id="add-coupon-form" onSubmit={handleAddCoupon} className="space-y-4 text-xs font-bold text-gray-500 dark:text-gray-400">
              <div>
                <label className="block mb-1.5">کد اختصاصی (فقط حروف انگلیسی بزرگ و اعداد)</label>
                <input
                  id="new-coupon-code-input"
                  type="text"
                  required
                  placeholder="مثال: SALE30"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block mb-1.5">درصد تخفیف</label>
                <input
                  id="new-coupon-discount-input"
                  type="number"
                  min="5"
                  max="90"
                  required
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(parseInt(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <button
                id="submit-coupon-btn"
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>فعال کردن کدهای تخفیف</span>
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-800 dark:text-gray-200">کدهای تخفیف فعال در سیستم</h3>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {coupons.map((coupon) => (
                <div key={coupon.code} className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-mono font-black rounded-xl text-xs border border-rose-100">
                      {coupon.code}
                    </span>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">تخفیف: {coupon.discount.toLocaleString('fa-IR')}٪</span>
                  </div>

                  <button
                    id={`delete-coupon-btn-${coupon.code}`}
                    onClick={() => handleDeleteCoupon(coupon.code)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                    title="غیرفعال کردن کد"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
