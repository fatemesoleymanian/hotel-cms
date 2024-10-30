
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
          description:''
        }
       },
      { path: 'login-signup', component: () => import('pages/LoginSignup.vue'),
        meta:{
          title:'ورود/ ثبت نام',
          description:''
        }
       },
       { path: 'reserves', component: () => import('pages/HotelReserves.vue'),
        meta:{
          title:'رزروهای من',
          description:''
        }
       },
      { path: 'booking-1', component: () => import('pages/BookingFirstStep.vue'),
        meta:{
          title:'رزرو آنلاین',
          description:''
        }
       },
      { path: 'booking-2', component: () => import('pages/BookingSecondStep.vue'),
        meta:{
          title:'رزروآنلاین',
          description:''
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
