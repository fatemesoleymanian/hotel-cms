export const adminLinks = [
  {
    title: 'مدیریت پروژه ها',
    caption: 'ساخت و مدیریت پروژه های ساختمانی',
    icon: 'apartment',
    link: '#/admin/create_project'
  },
  {
    title: 'مدیریت کاربران',
    caption: 'اطلاعات هویتی، مالی، کاربری و ...',
    icon: 'group',
    link: '#/admin/users_management'
  },
  {
    title: 'فروشگاه‌ها',
    caption: 'فروشگاه‌های مصالح',
    icon: 'store',
    link: '#/admin/shopping_management'
  },
  {
    title: 'مدیریت درخواست‌ها',
    caption: 'درخواست خرید و فروش',
    icon: 'request_quote',
    link: '#/admin/affidavit'
  },
  {
    title: 'جلسات',
    caption: 'مدیریت جلسات',
    icon: 'calendar_month',
    link: '#/admin/meeting'
  }
]

export const userLinks = [
  {
    title: 'داشبورد',
    caption: 'اقساط، سرمایه گذاری ها، پروژه ها و ...',
    icon: 'dashboard',
    link: '#/user/dashboard'
  },
  {
    title: 'احراز هویت',
    caption: '',
    icon: 'admin_panel_settings',
    link: '#/authentication'
  },
  {
    title: 'مدیریت درخواست‌ها',
    caption: 'درخواست خرید و فروش',
    icon: 'request_quote',
    link: '#/user/contracts'
  }
]

export const commissaryLinks = [
  {
    title: 'مامور خرید',
    caption: '',
    icon: 'receipt_long',
    link: '#/admin/create_project?role=abadsara_commissary'
  }
]
