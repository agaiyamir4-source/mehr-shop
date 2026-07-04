import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, NotificationMessage } from '../types';
import { initialProducts } from '../data/mockData';

interface SearchFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  brand: string;
  rating: number;
  sort: 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating';
}

interface StoreContextType {
  // Navigation & Routing
  currentView: string;
  selectedProductId: string | null;
  searchQuery: string;
  searchFilters: SearchFilters;
  navigateTo: (view: string, payload?: any) => void;
  setSearchQuery: (query: string) => void;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  checkoutDiscount: number;
  setCheckoutDiscount: (discount: number) => void;

  // Auth
  user: UserProfile | null;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, phone?: string, address?: string) => void;

  // Products (Persisted and Admin-editable)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (address: string, deliveryMethod: string, paymentMethod: string, couponDiscount: number) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Toast Notifications
  notifications: NotificationMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;

  // Comparison
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialFilters: SearchFilters = {
  category: 'all',
  minPrice: 0,
  maxPrice: 100000000,
  brand: 'all',
  rating: 0,
  sort: 'popular'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Navigation state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(initialFilters);
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);

  // 2. Auth state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // 3. Products state (initialized from initialProducts, stored in localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // 4. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // 5. Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // 6. Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  // 7. Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // 8. Notifications state
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  // 9. Comparison state
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  // 10. Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('user', user ? JSON.stringify(user) : '');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Toast handler
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2);
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Navigation controller
  const navigateTo = (view: string, payload?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (view === 'product-details' && payload) {
      setSelectedProductId(payload);
      addToRecentlyViewed(payload);
    } else if (view === 'search') {
      if (payload && typeof payload === 'object') {
        setSearchFilters((prev) => ({ ...prev, ...payload }));
      }
    } else if (view === 'checkout') {
      if (payload && typeof payload === 'object' && typeof payload.discountPercent === 'number') {
        setCheckoutDiscount(payload.discountPercent);
      } else {
        setCheckoutDiscount(0);
      }
    }
  };

  // Auth actions
  const login = async (email: string, password?: string): Promise<boolean> => {
    // Simulated Login
    if (!email) {
      showToast('لطفا ایمیل خود را وارد کنید.', 'error');
      return false;
    }
    const isAdmin = email.toLowerCase().includes('admin');
    const mockUser: UserProfile = {
      uid: 'u_' + Math.random().toString(36).substring(2),
      email,
      displayName: isAdmin ? 'مدیر سیستم' : 'کاربر مهمان',
      role: isAdmin ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      phoneNumber: '۰۹۱۲۳۴۵۶۷۸۹',
      address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۴'
    };
    setUser(mockUser);
    showToast(`خوش آمدید، ${mockUser.displayName}!`, 'success');
    navigateTo('home');
    return true;
  };

  const register = async (email: string, name: string): Promise<boolean> => {
    if (!email || !name) {
      showToast('لطفا تمام فیلدها را پر کنید.', 'error');
      return false;
    }
    const mockUser: UserProfile = {
      uid: 'u_' + Math.random().toString(36).substring(2),
      email,
      displayName: name,
      role: 'user',
      createdAt: new Date().toISOString(),
      phoneNumber: '',
      address: ''
    };
    setUser(mockUser);
    showToast('ثبت‌نام شما با موفقیت انجام شد!', 'success');
    navigateTo('home');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('با موفقیت از حساب کاربری خارج شدید.', 'info');
    navigateTo('home');
  };

  const updateProfile = (name: string, phone?: string, address?: string) => {
    if (!user) return;
    const updated = {
      ...user,
      displayName: name,
      phoneNumber: phone,
      address: address
    };
    setUser(updated);
    showToast('پروفایل کاربری با موفقیت بروزرسانی شد.', 'success');
  };

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const freshProduct: Product = {
      ...newProd,
      id: 'p_' + Math.random().toString(36).substring(2),
      rating: 5.0,
      ratingCount: 1
    };
    setProducts((prev) => [freshProduct, ...prev]);
    showToast('محصول جدید با موفقیت اضافه شد.', 'success');
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    showToast('محصول با موفقیت ویرایش شد.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('محصول با موفقیت حذف شد.', 'success');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        showToast('تعداد محصول در سبد خرید بروزرسانی شد.', 'success');
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showToast('محصول به سبد خرید اضافه شد.', 'success');
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('محصول از سبد خرید حذف شد.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('از لیست علاقمندی‌ها حذف شد.', 'info');
        return prev.filter((id) => id !== productId);
      }
      showToast('به لیست علاقمندی‌ها اضافه شد.', 'success');
      return [...prev, productId];
    });
  };

  // Place Order
  const placeOrder = (address: string, deliveryMethod: string, paymentMethod: string, couponDiscount: number) => {
    if (cart.length === 0) return;
    const rawTotal = cart.reduce((acc, item) => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return acc + discountedPrice * item.quantity;
    }, 0);
    const finalTotal = rawTotal * (1 - couponDiscount / 100) + 45000; // 45k delivery fee

    const newOrder: Order = {
      id: 'DK-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('fa-IR'),
      items: [...cart],
      totalPrice: finalTotal,
      shippingAddress: address,
      deliveryMethod,
      paymentMethod,
      status: 'pending',
      discountApplied: couponDiscount
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast('سفارش شما با موفقیت ثبت شد!', 'success');
    navigateTo('profile');
  };

  // Theme actions
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Product Comparison
  const addToComparison = (product: Product) => {
    if (comparisonList.length >= 3) {
      showToast('حداکثر ۳ محصول را می‌توانید مقایسه کنید.', 'error');
      return;
    }
    if (comparisonList.some((p) => p.id === product.id)) {
      showToast('این محصول قبلاً اضافه شده است.', 'info');
      return;
    }
    setComparisonList((prev) => [...prev, product]);
    showToast('محصول به لیست مقایسه اضافه شد.', 'success');
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== productId));
    showToast('محصول از لیست مقایسه حذف شد.', 'info');
  };

  // Recently Viewed
  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 5); // Keep last 5
    });
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        selectedProductId,
        searchQuery,
        searchFilters,
        navigateTo,
        setSearchQuery,
        setSearchFilters,
        checkoutDiscount,
        setCheckoutDiscount,
        user,
        login,
        register,
        logout,
        updateProfile,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        theme,
        toggleTheme,
        notifications,
        showToast,
        dismissToast,
        comparisonList,
        addToComparison,
        removeFromComparison,
        recentlyViewed
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
