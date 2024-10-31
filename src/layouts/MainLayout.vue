<template>
  <q-layout view="lHh LpR lff" class="bg-secondary"  @scroll="onScroll">
    <!-- Header -->
    <q-header class="shadow-md border-b border-gray-200 no-shadow border-none" :class="headerClass">
      <q-toolbar class="flex justify-between items-center px-4 md:px-8" >
        <!-- Logo -->
        <div class="flex items-center space-x-4 cursor-pointer" @click="this.$router.push('/')">
          <img src="https://www.logodesign.net/logo/city-inside-shield-1950ld.png?nwm=1&nws=1&industry=hotel&sf=&txt_keyword=All"
          alt="Hotel Logo" class="h-8 md:h-10"  /> <!-- Replace with actual logo path -->
          <q-toolbar-title class="text-lg font-bold text-gray-800">نام هتل</q-toolbar-title>
        </div>

        <!-- Navigation (Desktop) -->
        <div class="flex space-x-6 text-gray-700 font-medium"  v-if="!($q.screen.xs || $q.screen.sm)">
          <a
          v-for="link in navLinks" :key="link"
          :href="link.url"
          style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);"
          :class="['hover:text-primary font-semibold transition-all duration-300 ease-linear hover:underline decoration-2 underline-offset-4', link.class, isActive(link.url) ]">
          {{ link.title }}</a>
          <div class="pr-20 font-semibold" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);">
            تلفن رزرواسیون:
            <a href="tel:+9821444327" class="text-secondary hover:underline">021-444327</a>
          </div>

        </div>
        <q-btn label="رزرو آنلاین" color="primary" class="md:hidden" />
        <q-btn-dropdown dense rounded outline icon="account_circle" color="primary" v-if="tokenIsSet">
          <q-list>
            <q-item clickable @click="this.$router.push('/settings')" v-if="role === 'admin'">
              <q-item-section avatar>
                <q-icon name="settings" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>تنظیمات</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="this.$router.push('/reserves')" v-else>
              <q-item-section avatar>
                <q-icon name="luggage" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>رزروهای من</q-item-label>
              </q-item-section>
            </q-item>
            <!-- <q-item clickable @click="this.$router.push('/dashboard')" >
              <q-item-section avatar>
                <q-icon name="account_circle" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>پروفایل کاربری</q-item-label>
              </q-item-section>
            </q-item> -->

            <q-item clickable @click="exitHotel">
              <q-item-section avatar>
                <q-icon name="logout" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>خروج</q-item-label>
              </q-item-section>
            </q-item>
        </q-list>
        </q-btn-dropdown>
        <q-btn class="font-semibold" label="ورود / ثبت نام" color="primary" v-else
          @click="loginFormDialog =! loginFormDialog" outline/>
        <!-- Mobile Menu Button -->
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="menu"
          aria-label="Menu"
          class="md:hidden"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Mobile Only) -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      class="bg-white text-gray-700 md:hidden"
    >
      <q-list>
        <q-item clickable v-ripple v-for="link in navLinks" :key="link">
          <q-item-section>
            <a :href="link.url" :class="isActive(link.url)">{{ link.title }}</a>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple >
          <q-item-section>
            <a href="tel:+9821444327" class="text-primary hover:underline">
              تلفن رزرواسیون: <span>021-444327</span>
            </a>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <router-view style="margin-top: -50px"/>
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-dark text-white py-8">
    <div class="container mx-auto px-4 text-center md:text-left">
      <!-- Contact Info and Address Section -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">

        <!-- Contact Info -->
        <div class="flex flex-col items-center md:items-start">
          <h3 class="font-bold text-lg mb-2">ارتباط با ما</h3>
          <p>تلفن: 011-33455101-7</p>
          <p>فکس: 011-33455108</p>
          <p>ایمیل: info@vhotelhotel.com</p>
        </div>

        <!-- Address -->
        <div class="flex flex-col items-center md:items-center">
          <h3 class="font-bold text-lg mb-2">آدرس:</h3>
          <p>مازندران، ساری، کیلومتر ۱۲ جاده ساری به سمنان، روبروی</p>
          <p>شرکت چوب و کاغذ مازندران</p>
        </div>

        <!-- Tagline or Message -->
        <div class="flex flex-col items-start">
          <h3 class="font-bold text-lg mb-2">لینک ها</h3>
          <a href="/">صفحه اصلی</a>
          <a href="/rooms">اتاق ها</a>
          <a href="/about">معرفی هتل</a>
          <a href="/blog">وبلاگ</a>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-700 my-4"></div>

      <!-- Bottom Footer Text -->
      <div class="text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; تمامی حقوق محفوظ است | طراحی و توسعه توسط <span class="text-green-500">وی هتل</span></p>
        <p class="mt-2 md:mt-0">اینستاگرام: <span class="text-gray-400">hotel.vhotel</span> | تلفن: <span class="text-gray-400">0910-467-9474</span></p>
      </div>
    </div>
  </q-footer>
  <q-dialog v-model="loginFormDialog" position="top">
    <LoginSignupForm @on-close="enterHotel"/>
  </q-dialog>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import LoginSignupForm from "src/components/LoginSignupForm.vue";
import { getRole, getToken, role } from "src/stores/localStorageVariables";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "MainLayout",
  setup() {
    const tokenIsSet = getToken()
    const role = getRole()
    const leftDrawerOpen = ref(false);
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    const route = useRoute();
    const currentRoute = route.path;

    const navLinks = [
      {
        title:'صفحه اصلی',
        class:'pl-4',
        url:'/'
      },
      {
        title:'اتاق ها',
        class:'',
        url:'/rooms'
      },
      {
        title:'معرفی هتل',
        class:'',
        url:'/about'
      },
      {
        title:'وبلاگ',
        class:'',
        url:'/blog'
      },
      {
        title:'رزرو آنلاین',
        class:'px-4 py-1 bg-primary text-white hover:animate-bounce rounded-borders shadow-md',
        url:'/book'
      }
    ]
    return {
      tokenIsSet,
      loginFormDialog: ref(false),
      $q: useQuasar(),
      leftDrawerOpen,
      navLinks,
      toggleLeftDrawer,
      currentRoute,
      headerClass: ref('bg-transparent'),
      scrollPosition: ref(0)
    };
  },
  data(){
    const $q = useQuasar()
  },
  methods:{
    exitHotel(){
      localStorage.clear()
      window.location.reload()
    },
    enterHotel(){
      this.loginFormDialog = false;
      window.location.reload()
    },
    isActive(item){
      return this.currentRoute === item ? ' text-secondary font-bold underline decoration-2 underline-offset-4' : ''
    },
    onScroll() {
      // Update scroll position
      this.scrollPosition = window.scrollY;

      // Change header background based on scroll position
      if (this.scrollPosition > 50) { // Change 50 to the desired scroll threshold
        this.headerClass = 'bg-white'; // Change to your desired background
      } else {
        this.headerClass = 'bg-transparent';
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  components:{
    LoginSignupForm
  }
};
</script>

<style scoped>
/* Additional styling if needed */
</style>
