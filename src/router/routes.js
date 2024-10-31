
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'),
        meta:{
          title:'هتل',
          description:''
        }
       },
      { path: 'rooms', component: () => import('pages/HotelRooms.vue'),
        meta:{
          title:'اتاق ها',
          description:''
        }
       },
      { path: 'blog', component: () => import('pages/HotelBlog.vue'),
        meta:{
          title:'وبلاگ',
          description:''
        }
       },
      { path: 'about', component: () => import('pages/AboutHotel.vue'),
        meta:{
          title:'معرفی هتل',
          description:''
        }
       },
      { path: 'post/:slug', component: () => import('pages/BlogPost.vue'),
        meta:{
          title:'پست وبلاگ',
          description:'',
        }
       },
       { path: 'reserves', component: () => import('pages/HotelReserves.vue'),
        meta:{
          title:'رزروهای من',
          description:'',
           needsAuth:true,
          role:'user'
        }
       },
      { path: 'booking-1', component: () => import('pages/BookingFirstStep.vue'),
        meta:{
          title:'رزرو آنلاین',
          description:'',
          needsAuth:true,
          role:'user'
        }
       },
      { path: 'booking-2', component: () => import('pages/BookingSecondStep.vue'),
        meta:{
          title:'رزروآنلاین',
          description:'',
           needsAuth:true,
          role:'user'
        }
       },
       { path: 'settings', component: () => import('pages/TemplateSettings.vue'),
        meta:{
          title:'تنظیمات قالب',
          description:'',
           needsAuth:true,
          role:'admin'
        }
       },
       { path: 'voucher/:reserve_id', component: () => import('pages/ReserveVoucher.vue'),
        meta:{
          title:'ووچر',
          description:'',
          needsAuth:true,
          role:'user'
        }
       },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
