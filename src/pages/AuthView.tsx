import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Lock, User, LogIn, ChevronLeft, Sparkles } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login, register, showToast, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register input states
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('لطفا ایمیل و رمز عبور خود را وارد کنید.', 'error');
      return;
    }
    const success = await login(loginEmail, loginPassword);
    if (success) {
      navigateTo('home');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      showToast('لطفا تمامی فیلدها را پر کنید.', 'error');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      showToast('رمز عبور و تایید آن با هم مطابقت ندارند.', 'error');
      return;
    }
    const success = await register(registerEmail, registerName);
    if (success) {
      navigateTo('home');
    }
  };

  const handleGoogleSignIn = () => {
    showToast('در حال اتصال به حساب کاربری گوگل...', 'info');
    setTimeout(() => {
      login('google-user@gmail.com');
    }, 1500);
  };

  return (
    <div id="auth-view" className="max-w-md mx-auto py-12" dir="rtl">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg flex flex-col">
        
        {/* Toggle Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          <button
            id="tab-login-btn"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-center font-black text-sm transition-all ${
              activeTab === 'login'
                ? 'text-rose-600 border-b-2 border-rose-500 bg-rose-50/5 dark:bg-rose-950/5'
                : 'text-gray-500 hover:text-gray-855 dark:hover:text-gray-300'
            }`}
          >
            ورود به حساب کاربری
          </button>
          <button
            id="tab-register-btn"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-4 text-center font-black text-sm transition-all ${
              activeTab === 'register'
                ? 'text-rose-600 border-b-2 border-rose-500 bg-rose-50/5 dark:bg-rose-950/5'
                : 'text-gray-500 hover:text-gray-855 dark:hover:text-gray-300'
            }`}
          >
            ثبت‌نام کاربری جدید
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">
              {activeTab === 'login' ? 'خوش آمدید!' : 'عضویت در خانواده مهرشاپ'}
            </h2>
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500">
              {activeTab === 'login' 
                ? 'جهت ورود به حساب کاربری خود، اطلاعات زیر را وارد کنید' 
                : 'با ایجاد حساب از شگفت‌انگیزترین جشنواره‌ها باخبر شوید'}
            </p>
          </div>

          {/* Login Form */}
          {activeTab === 'login' ? (
            <form id="login-form" onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-bold text-gray-500 dark:text-gray-400">
              <div className="space-y-1.5">
                <label className="block">نشانی ایمیل (یا کلمه admin برای مدیریت)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3.5 flex items-center text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="login-email-input"
                    type="text"
                    required
                    placeholder="example@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pr-11 pl-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block">رمز عبور</label>
                  <button 
                    type="button"
                    onClick={() => showToast('لینک بازیابی رمز عبور به ایمیل شما ارسال شد.', 'info')}
                    className="text-[10px] text-rose-500 hover:underline"
                  >
                    رمز عبور را فراموش کرده‌اید؟
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3.5 flex items-center text-gray-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    id="login-password-input"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pr-11 pl-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md shadow-rose-600/10 transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="h-4.5 w-4.5" />
                <span>ورود به پنل کاربری</span>
              </button>
            </form>
          ) : (
            // Register Form
            <form id="register-form" onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-bold text-gray-500 dark:text-gray-400">
              <div className="space-y-1.5">
                <label className="block">نام و نام خانوادگی</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3.5 flex items-center text-gray-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    id="register-name-input"
                    type="text"
                    required
                    placeholder="مثال: امیر مهدوی"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full pr-11 pl-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block">نشانی ایمیل</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3.5 flex items-center text-gray-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="register-email-input"
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full pr-11 pl-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block">رمز عبور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3.5 flex items-center text-gray-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    id="register-password-input"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full pr-11 pl-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block">تکرار و تایید رمز عبور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3.5 flex items-center text-gray-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    id="register-confirm-password-input"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="w-full pr-11 pl-4 py-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-rose-500 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md shadow-rose-600/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>ایجاد حساب کاربری جدید</span>
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
            </form>
          )}

          {/* Social login partition */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-400">یا با شبکه‌های اجتماعی</span>
            <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
          </div>

          <button
            id="google-signin-btn"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2.5"
          >
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span>ورود هوشمند با حساب گوگل (Google Sign-In)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
