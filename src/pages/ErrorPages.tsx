import React from 'react';
import { useStore } from '../context/StoreContext';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export const Error404View: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div id="error-404-page" className="max-w-md mx-auto text-center py-20 space-y-6" dir="rtl">
      <div className="h-28 w-28 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100 shadow-lg">
        <AlertCircle className="h-14 w-14" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-red-600">۴۰۴</h1>
        <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">صفحه مورد نظر پیدا نشد!</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
          متاسفانه آدرس وارد شده یا صفحه‌ای که به دنبال آن بودید دیگر وجود ندارد یا جابجا شده است.
        </p>
      </div>

      <button
        id="error-404-home"
        onClick={() => navigateTo('home')}
        className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 mx-auto"
      >
        <Home className="h-4.5 w-4.5" />
        <span>بازگشت به صفحه اصلی</span>
      </button>
    </div>
  );
};

export const Error500View: React.FC = () => {
  const { navigateTo, showToast } = useStore();

  const handleRefresh = () => {
    showToast('در حال تلاش مجدد برای بارگذاری اطلاعات...', 'info');
    setTimeout(() => {
      navigateTo('home');
    }, 1000);
  };

  return (
    <div id="error-500-page" className="max-w-md mx-auto text-center py-20 space-y-6" dir="rtl">
      <div className="h-28 w-28 bg-rose-50 dark:bg-rose-950/40 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-100 shadow-lg">
        <AlertCircle className="h-14 w-14 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-rose-600">۵۰۰</h1>
        <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">خطای داخلی سرور!</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed">
          متاسفانه اختلالی در ارتباط با سرورهای پردازشی رخ داده است. جای نگرانی نیست، این مشکل موقتی بوده و بزودی برطرف خواهد شد.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <button
          id="error-500-refresh"
          onClick={handleRefresh}
          className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-rose-50 hover:text-rose-600 text-gray-700 dark:text-gray-300 font-black text-sm rounded-xl flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4.5 w-4.5" />
          <span>تلاش مجدد بارگذاری</span>
        </button>
        
        <button
          id="error-500-home"
          onClick={() => navigateTo('home')}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
        >
          <Home className="h-4.5 w-4.5" />
          <span>بازگشت به خانه</span>
        </button>
      </div>
    </div>
  );
};
