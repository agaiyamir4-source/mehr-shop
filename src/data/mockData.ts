import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'کالای دیجیتال', slug: 'digital', icon: 'Smartphone' },
  { id: '2', name: 'لوازم خانگی', slug: 'home-appliances', icon: 'Tv' },
  { id: '3', name: 'زیبایی و سلامت', slug: 'beauty', icon: 'Sparkles' },
  { id: '4', name: 'سوپرمارکت', slug: 'supermarket', icon: 'ShoppingBag' },
  { id: '5', name: 'مد و پوشاک', slug: 'fashion', icon: 'Shirt' },
  { id: '6', name: 'ابزار و خودرو', slug: 'tools', icon: 'Wrench' }
];

export const popularBrands = [
  { id: '1', name: 'سامسونگ', englishName: 'Samsung', logo: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=200&h=100&q=80' },
  { id: '2', name: 'شیائومی', englishName: 'Xiaomi', logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&h=100&q=80' },
  { id: '3', name: 'اپل', englishName: 'Apple', logo: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=200&h=100&q=80' },
  { id: '4', name: 'ایسوس', englishName: 'Asus', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&h=100&q=80' },
  { id: '5', name: 'بوش', englishName: 'Bosch', logo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&h=100&q=80' },
  { id: '6', name: 'جی پلاس', englishName: 'GPlus', logo: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=200&h=100&q=80' }
];

export const initialProducts: Product[] = [
  {
    id: 'p1',
    title: 'گوشی موبایل سامسونگ Galaxy S24 Ultra دو سیم کارت',
    englishTitle: 'Samsung Galaxy S24 Ultra Dual SIM 256GB',
    price: 68500000,
    discountPercentage: 5,
    rating: 4.8,
    ratingCount: 124,
    stock: 12,
    category: 'digital',
    brand: 'سامسونگ',
    images: [
      'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=600&h=600&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'حافظه داخلی', value: '۲۵۶ گیگابایت' },
      { key: 'مقدار RAM', value: '۱۲ گیگابایت' },
      { key: 'رزولوشن عکس', value: '۲۰۰ مگاپیکسل' },
      { key: 'شبکه های ارتباطی', value: '5G, 4G, 3G' },
      { key: 'باتری', value: '۵۰۰۰ میلی‌آمپر ساعت' }
    ],
    description: 'پرچمدار جدید سامسونگ با پردازنده قدرتمند Snapdragon 8 Gen 3، دوربین ۲۰۰ مگاپیکسلی خارق‌العاده و صفحه نمایش ۱۲۰ هرتزی دینامیک با روشنایی فوق‌العاده بالا. قلم S-Pen همراه این دستگاه امکان یادداشت‌برداری و طراحی حرفه‌ای را در اختیار شما قرار می‌دهد.',
    isSpecialOffer: true,
    isBestSeller: true
  },
  {
    id: 'p2',
    title: 'لپ تاپ ۱۶ اینچی ایسوس ROG Strix G16 گیمینگ',
    englishTitle: 'ASUS ROG Strix G16 Core i7 16GB 1TB RTX 4060',
    price: 89000000,
    discountPercentage: 8,
    rating: 4.7,
    ratingCount: 42,
    stock: 5,
    category: 'digital',
    brand: 'ایسوس',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&h=600&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'سازنده پردازنده', value: 'Intel' },
      { key: 'سری پردازنده', value: 'Core i7 13650HX' },
      { key: 'حافظه RAM', value: '۱۶ گیگابایت DDR5' },
      { key: 'حافظه SSD', value: '۱ ترابایت NVMe' },
      { key: 'پردازنده گرافیکی', value: 'NVIDIA GeForce RTX 4060 (8GB)' }
    ],
    description: 'یکی از قدرتمندترین لپ‌تاپ‌های گیمینگ سری ROG ایسوس با سیستم خنک‌کننده پیشرفته، صفحه نمایش با نرخ نوسازی ۱۶۵ هرتز و گرافیک قدرتمند نسل جدید انویدیا برای اجرای بی‌نقص سنگین‌ترین بازی‌ها و نرم‌افزارهای مهندسی.',
    isSpecialOffer: true,
    isNewArrival: true
  },
  {
    id: 'p3',
    title: 'گوشی موبایل اپل مدل iPhone 15 Pro Max',
    englishTitle: 'Apple iPhone 15 Pro Max 256GB Dual SIM Active',
    price: 92000000,
    discountPercentage: 0,
    rating: 4.9,
    ratingCount: 310,
    stock: 8,
    category: 'digital',
    brand: 'اپل',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&h=600&q=80',
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'حافظه داخلی', value: '۲۵۶ گیگابایت' },
      { key: 'جنس بدنه', value: 'تیتانیوم گرید ۵' },
      { key: 'پردازنده', value: 'Apple A17 Pro (3nm)' },
      { key: 'درگاه اتصال', value: 'USB Type-C 3.0' }
    ],
    description: 'آیفون ۱۵ پرو مکس با بدنه انقلابی تیتانیومی سبک و مقاوم، دکمه اکشن چندمنظوره، قوی‌ترین تراشه موبایلی جهان و سیستم دوربین تله‌فوتو با زوم اپتیکال ۵ برابری بی سابقه.',
    isBestSeller: true
  },
  {
    id: 'p4',
    title: 'تلویزیون ال ای دی هوشمند جی پلاس ۵۵ اینچ',
    englishTitle: 'GPlus GTV-55LU722S 4K Smart LED TV 55 Inch',
    price: 24500000,
    discountPercentage: 12,
    rating: 4.2,
    ratingCount: 67,
    stock: 15,
    category: 'home-appliances',
    brand: 'جی پلاس',
    images: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'کیفیت تصویر', value: 'Ultra HD - 4K' },
      { key: 'رابط هوشمند', value: 'اندروید ۱۱' },
      { key: 'تعداد درگاه HDMI', value: '۳ عدد' },
      { key: 'سیستم صوتی', value: 'دو کاناله با توان ۲۰ وات' }
    ],
    description: 'تلویزیون هوشمند جی پلاس با کیفیت خیره‌کننده Ultra HD 4K و پشتیبانی از تکنولوژی HDR10. مجهز به سیستم عامل اندروید جهت نصب برنامه‌های فیلیمو، نماوا و وب‌گردی آسان به همراه ریموت کنترل جادویی.',
    isSpecialOffer: true
  },
  {
    id: 'p5',
    title: 'اسپرسوساز دلونگی مدل EC685',
    englishTitle: 'Delonghi Dedica Style EC685 Espresso Maker',
    price: 11800000,
    discountPercentage: 15,
    rating: 4.6,
    ratingCount: 198,
    stock: 20,
    category: 'home-appliances',
    brand: 'دلونگی',
    images: [
      'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'فشار بخار', value: '۱۵ بار' },
      { key: 'توان مصرفی', value: '۱۳۰۰ وات' },
      { key: 'قابلیت استفاده از', value: 'پودر قهوه، پد قهوه' },
      { key: 'سیستم کاپوچینوساز', value: 'دارد (دستی حرفه‌ای)' }
    ],
    description: 'اسپرسوساز دلونگی مدل Dedica EC685 با طراحی فوق‌العاده باریک و شیک بدنه فلزی، لذت تهیه یک اسپرسو یا کاپوچینوی باکیفیت و خامه‌ای غلیظ را در خانه برای شما به ارمغان می‌آورد.',
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'p6',
    title: 'سرم آبرسان هیالورونیک اسید اوردینری ۳۰ میلی لیتر',
    englishTitle: 'The Ordinary Hyaluronic Acid 2% + B5 30ml',
    price: 1250000,
    discountPercentage: 20,
    rating: 4.5,
    ratingCount: 340,
    stock: 50,
    category: 'beauty',
    brand: 'اوردینری',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'حجم', value: '۳۰ میلی‌لیتر' },
      { key: 'مناسب برای', value: 'انواع پوست' },
      { key: 'کارکرد', value: 'آبرسانی عمیق و جوانسازی پوست' },
      { key: 'کشور سازنده', value: 'کانادا' }
    ],
    description: 'فرمولاسیون پیشرفته با هیالورونیک اسید خالص در وزن‌های مولکولی مختلف به همراه ویتامین B5 برای نفوذ عمیق به لایه‌های پوست و ایجاد ظاهری شاداب، پر و باطراوت.',
    isSpecialOffer: true
  },
  {
    id: 'p7',
    title: 'زعفران سرگل صادراتی ۱ مثقالی سحرخیز',
    englishTitle: 'Saharkhiz Sargol Saffron 1 Mesghal',
    price: 980000,
    discountPercentage: 10,
    rating: 4.9,
    ratingCount: 512,
    stock: 100,
    category: 'supermarket',
    brand: 'سحرخیز',
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'وزن', value: '۴.۶۰۸ گرم (یک مثقال)' },
      { key: 'نوع زعفران', value: 'سرگل ممتاز صادراتی' },
      { key: 'بسته‌بندی', value: 'پاکتی ضد رطوبت' }
    ],
    description: 'زعفران درجه یک سرگل سحرخیز تهیه شده از بهترین مزارع زعفران ایران با عطر، طعم و رنگ بی‌نظیر. دارای استانداردهای بین‌المللی کیفیت و بسته‌بندی کاملا بهداشتی.',
    isBestSeller: true
  },
  {
    id: 'p8',
    title: 'کفش دویدن مردانه نایک مدل Pegasus 40',
    englishTitle: 'Nike Pegasus 40 Men running Shoes Black White',
    price: 8400000,
    discountPercentage: 18,
    rating: 4.6,
    ratingCount: 89,
    stock: 14,
    category: 'fashion',
    brand: 'نایک',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    specifications: [
      { key: 'جنس رویه', value: 'الیاف مصنوعی تنفس‌پذیر' },
      { key: 'فناوری کفی', value: 'Nike React با بالشتک Zoom Air' },
      { key: 'مناسب برای', value: 'دویدن، پیاده‌روی طولانی و باشگاه' }
    ],
    description: 'آخرین نسل از کفش افسانه‌ای پگاسوس با راحتی فوق‌العاده، پاسخگویی فنری زیر پا و چسبندگی عالی برای حمایت کامل از پاهای شما در دویدن‌های طولانی روزانه.',
    isSpecialOffer: true,
    isNewArrival: true
  }
];

export const mockReviews = [
  {
    id: 'r1',
    username: 'امیررضا غیاثی',
    rating: 5,
    date: '۱۴۰۵/۰۴/۱۰',
    title: 'فوق‌العاده و بی‌نظیر',
    comment: 'سامسونگ اس ۲۴ اولترا رو خریدم و واقعا از سرعت پردازنده و کیفیت دوربینش شگفت‌زده شدم. ارسالتون هم خیلی سریع بود، ممنون!'
  },
  {
    id: 'r2',
    username: 'زهرا مهدوی',
    rating: 4,
    date: '۱۴۰۵/۰۴/۰۸',
    title: 'کیفیت ساخت عالی',
    comment: 'اسپرسوساز دلونگی کیفیت خیلی خوبی داره و قهوه غلیظ و عالی تحویل میده. کار کردن باهاش ساده‌ست و ظاهر بسیار جذابی داره.'
  },
  {
    id: 'r3',
    username: 'محمد کریمی',
    rating: 5,
    date: '۱۴۰۵/۰۴/۰۵',
    title: 'پیشنهاد می‌کنم حتما',
    comment: 'زعفران سحرخیز مثل همیشه عالی و معطر هست. رنگ‌دهی بی‌نظیری داره و قیمتش توی شگفت‌انگیز خیلی مناسب بود.'
  }
];

export const faqs = [
  {
    question: 'آیا امکان پرداخت در محل وجود دارد؟',
    answer: 'بله، برای مشتریان ساکن تهران و شهرهای بزرگ، امکان پرداخت در محل هنگام تحویل کالا با کارت‌های بانکی فراهم است.'
  },
  {
    question: 'شرایط مرجوعی کالا به چه صورت است؟',
    answer: 'تمامی کالاها دارای ۷ روز مهلت تست و مرجوعی هستند، مشروط بر اینکه کالا در شرایط اولیه خود باشد و پلمب آن باز نشده باشد.'
  },
  {
    question: 'مدت زمان ارسال کالا چقدر است؟',
    answer: 'ارسال‌های فوری تهران در کمتر از ۳ ساعت و ارسال‌های پستی به سراسر کشور بین ۲ تا ۴ روز کاری تحویل داده می‌شوند.'
  },
  {
    question: 'چگونه می‌توانم سفارش خود را پیگیری کنم؟',
    answer: 'با مراجعه به بخش «پروفایل کاربری» و سپس قسمت «سفارش‌های من»، می‌توانید وضعیت و کد رهگیری پستی سفارش خود را مشاهده کنید.'
  }
];
