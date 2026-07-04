import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter, 
  Linkedin,
  Send
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('لطفا یک ایمیل معتبر وارد کنید.', 'error');
      return;
    }
    showToast('با موفقیت در خبرنامه عضو شدید!', 'success');
    setEmail('');
  };

  return (
    <footer id="app-footer" className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-12 pb-6 transition-colors duration-200" dir="rtl">
      
      {/* 1. Value Propositions Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-rose-600 dark:text-rose-400">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">تحویل اکسپرس و سریع</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">ارسال فوری در سراسر کشور</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-rose-600 dark:text-rose-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">ضمانت اصالت کالا</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">صد درصد کالای اورجینال</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-rose-600 dark:text-rose-400">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">۷ روز ضمانت بازگشت</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">بازگرداندن کالا بدون دردسر</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-rose-600 dark:text-rose-400">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">پشتیبانی ۲۴ ساعته</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">۷ روز هفته در خدمت شما</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Information & Contacts */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-rose-600 dark:text-rose-500">مهرشاپ</span>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">MehrShop</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            مهرشاپ یکی از پیشروترین فروشگاه‌های اینترنتی ایران است که با تمرکز بر تجربه خرید بی‌نقص، تنوع محصولات دیجیتال و خانگی، اصالت محصولات شما را در یک بستر مدرن تضمین می‌کند.
          </p>
          <div className="flex flex-col gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4.5 w-4.5 text-gray-400" />
              <span>تهران، خیابان ولیعصر، برج مهر</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4.5 w-4.5 text-gray-400" />
              <span>تلفن تماس: ۰۲۱-۱۲۳۴۵۶</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4.5 w-4.5 text-gray-400" />
              <span>ایمیل: support@mehrshop.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links: Guides */}
        <div>
          <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-8 after:h-0.5 after:bg-rose-500">راهنمای خرید</h4>
          <ul className="flex flex-col gap-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">نحوه ثبت سفارش</button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">رویه ارسال سفارش</button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">شیوه‌های پرداخت</button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">قوانین و مقررات</button>
            </li>
          </ul>
        </div>

        {/* Quick Links: Services */}
        <div>
          <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:right-0 after:w-8 after:h-0.5 after:bg-rose-500">خدمات مشتریان</h4>
          <ul className="flex flex-col gap-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">پاسخ به پرسش‌های متداول</button>
            </li>
            <li>
              <button onClick={() => navigateTo('profile')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">پیگیری سفارش‌ها</button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">گزارش خطا / انتقاد</button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">حریم خصوصی کاربران</button>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Links */}
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3">عضویت در خبرنامه</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              با عضویت در خبرنامه از آخرین تخفیف‌ها و جدیدترین محصولات ما مطلع شوید.
            </p>
          </div>
          <form id="newsletter-form" onSubmit={handleSubscribe} className="flex relative">
            <input
              id="newsletter-email"
              type="email"
              placeholder="آدرس ایمیل شما"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pr-4 pl-12 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-rose-500 dark:text-gray-200 transition-all font-medium"
            />
            <button
              id="newsletter-submit"
              type="submit"
              className="absolute left-1.5 top-1.5 bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-lg transition-colors"
            >
              <Send className="h-4.5 w-4.5 transform rotate-180" />
            </button>
          </form>
          
          <div className="flex flex-col gap-2.5 mt-2">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">ما را در شبکه‌های اجتماعی دنبال کنید</span>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-white dark:bg-gray-900 rounded-xl hover:text-rose-600 dark:hover:text-rose-400 shadow-sm text-gray-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-gray-900 rounded-xl hover:text-rose-600 dark:hover:text-rose-400 shadow-sm text-gray-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-gray-900 rounded-xl hover:text-rose-600 dark:hover:text-rose-400 shadow-sm text-gray-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Credits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-200/60 dark:border-gray-800/60 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
          تمامی حقوق این وب‌سایت متعلق به فروشگاه مهرشاپ می‌باشد. © ۲۰۲۶ - طراحی و پیاده‌سازی با عشق در بستر وب فارسی.
        </p>
      </div>

    </footer>
  );
};
