import React, { useState } from 'react';
import { faqs } from '../data/mockData';
import { MessageSquare, MapPin, Phone, Mail, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FAQView: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div id="faq-view" className="max-w-2xl mx-auto pb-16 text-right" dir="rtl">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6 text-rose-500" />
          <span>سوالات متداول کاربران</span>
        </h1>
        <p className="text-xs text-gray-400 font-bold">پاسخ به سوالات پرتکرار پیرامون نحوه خرید، تحویل و بازگشت کالا در مهرشاپ</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div 
              key={idx}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                id={`faq-toggle-${idx}`}
                onClick={() => toggleExpand(idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-black text-gray-850 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-850 text-right transition-colors"
              >
                <span>{faq.question}</span>
                {isExpanded ? <ChevronUp className="h-4.5 w-4.5 text-rose-500" /> : <ChevronDown className="h-4.5 w-4.5 text-gray-400" />}
              </button>
              
              {isExpanded && (
                <div className="px-5 pb-4 text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-semibold border-t border-gray-50 dark:border-gray-850 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const AboutUsView: React.FC = () => {
  return (
    <div id="about-view" className="max-w-3xl mx-auto pb-16 space-y-8 text-right" dir="rtl">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-gray-800 dark:text-gray-100">درباره فروشگاه اینترنتی مهرشاپ</h1>
        <p className="text-xs text-gray-400 font-bold">مهرشاپ، تجربه‌ای فراتر از خرید آنلاین با تمرکز بر اصالت کالا و رضایت کامل</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <p className="text-sm text-gray-750 dark:text-gray-300 leading-relaxed font-semibold">
          فروشگاه اینترنتی مهرشاپ فعالیت خود را با هدف ایجاد بستری امن، ارزان و شفاف برای دسترسی هموطنان گرامی به جدیدترین تجهیزات دیجیتال و لوازم خانگی اصل آغاز نمود. ما با حذف واسطه‌ها و ارتباط مستقیم با واردکنندگان تراز اول کشور توانسته‌ایم کالاهایی باکیفیت بالا و گارانتی معتبر را با رقابتی‌ترین قیمت ممکن عرضه کنیم.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
          <div className="p-4 bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl border border-rose-100/50">
            <h4 className="text-lg font-black text-rose-600">۱۰۰٪</h4>
            <p className="text-xs text-gray-500 mt-1">ضمانت اصالت و سلامت فیزیکی</p>
          </div>
          <div className="p-4 bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl border border-rose-100/50">
            <h4 className="text-lg font-black text-rose-600">۲۴/۷</h4>
            <p className="text-xs text-gray-500 mt-1">پشتیبانی و همراهی مستمر</p>
          </div>
          <div className="p-4 bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl border border-rose-100/50">
            <h4 className="text-lg font-black text-rose-600">۷ روز</h4>
            <p className="text-xs text-gray-500 mt-1">مهلت بازگشت بی قید و شرط کالا</p>
          </div>
        </div>

        <p className="text-sm text-gray-750 dark:text-gray-300 leading-relaxed font-semibold">
          رضایت مشتری گران‌بها‌ترین دارایی ما در مهرشاپ است. تیمی متشکل از جوانان زبده، متعهد و خلاق روزانه می‌کوشند تا فرایند سفارش، بررسی، پکینگ و تحویل کالا به بهینه‌ترین و سریع‌ترین شکل ممکن در سراسر میهن عزیزمان انجام پذیرد.
        </p>
      </div>
    </div>
  );
};

export const ContactUsView: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('پیغام شما با موفقیت ارسال شد. کارشناسان ما بزودی با شما تماس خواهند گرفت.', 'success');
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <div id="contact-view" className="max-w-5xl mx-auto pb-16 text-right" dir="rtl">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-2xl font-black text-gray-800 dark:text-gray-100">ارتباط و تماس با مهرشاپ</h1>
        <p className="text-xs text-gray-400 font-bold">پیشنهادات، انتقادات یا نیاز مبرم به راهنمایی خود را با ما در میان بگذارید</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact information details */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 mb-2">اطلاعات ارتباطی دفتر مرکزی</h3>
          
          <div className="flex items-start gap-3 text-xs font-bold text-gray-650 dark:text-gray-400">
            <MapPin className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-800 dark:text-gray-200">نشانی دفتر مرکزی:</h4>
              <p className="mt-1 font-semibold leading-relaxed">تهران، بزرگراه مدرس، نرسیده به خیابان مطهری، برج فناوری مهر، طبقه پنجم</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs font-bold text-gray-650 dark:text-gray-400">
            <Phone className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-800 dark:text-gray-200">تلفن‌های تماس مستقیم:</h4>
              <p className="mt-1 font-semibold leading-relaxed">۰۲۱-۱۲۳۴۵۶۷۸ • روزهای کاری از ساعت ۹ الی ۱۸</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs font-bold text-gray-650 dark:text-gray-400">
            <Mail className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-gray-800 dark:text-gray-200">آدرس پست الکترونیکی رسمی:</h4>
              <p className="mt-1 font-semibold">info@mehrshop.com • پاسخگویی در کمتر از ۲۴ ساعت</p>
            </div>
          </div>
        </div>

        {/* Contact Form panel */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 mb-4">ارسال پیام مستقیم برای مدیران سیستم</h3>

          <form id="contact-us-form" onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-gray-500 dark:text-gray-400">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5">نام و نام خانوادگی شما</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label className="block mb-1.5">نشانی پست الکترونیکی (ایمیل)</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">متن پیام یا شرح انتقاد و پیشنهاد</label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="متن پیام خود را کامل وارد کنید..."
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
              ></textarea>
            </div>

            <button
              id="contact-submit"
              type="submit"
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md shadow-rose-600/10 transition-colors flex items-center gap-2"
            >
              <span>ارسال پیغام شما</span>
              <Send className="h-4 w-4 transform rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
