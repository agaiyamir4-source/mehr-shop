import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, dismissToast } = useStore();

  return (
    <div id="notifications-container" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((toast) => {
          let icon = <Info className="h-5 w-5 text-blue-500" />;
          let bgColor = 'bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900/30';
          
          if (toast.type === 'success') {
            icon = <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
            bgColor = 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-100 dark:border-emerald-900/30';
          } else if (toast.type === 'error') {
            icon = <AlertTriangle className="h-5 w-5 text-rose-500" />;
            bgColor = 'bg-rose-50/95 dark:bg-rose-950/90 border-rose-100 dark:border-rose-900/30';
          }

          return (
            <motion.div
              key={toast.id}
              id={`toast-${toast.id}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg ${bgColor} backdrop-blur-sm`}
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {toast.message}
                </span>
              </div>
              <button
                id={`close-toast-${toast.id}`}
                onClick={() => dismissToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
