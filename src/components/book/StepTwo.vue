<template>
  <div class="flex flex-col md:flex-row bg-gray-100 my-4 border rounded-lg shadow-md">
    <!-- Room Cards Section -->
    <div class="w-full md:w-3/4 space-y-6">
      <!-- Room Card 1 -->
      <div class="bg-gray-100 rounded-lg p-4 mt-4">
          <form @submit.prevent="completeReservation">
            <!-- Personal Information Form -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <q-input v-model="firstName" label="نام" outlined />
              <q-input v-model="lastName" label="نام خانوادگی" outlined />
              <q-input v-model="phone" label="تلفن همراه" outlined />
              <q-input v-model="city" label="شهر" outlined />
              <q-input v-model="address" label="آدرس" outlined />
              <q-input v-model="email" label="ایمیل" outlined />
            </div>

          </form>
        </div>
    </div>
    <!-- Left Box (Price Summary and Booking Button) -->
    <div class="w-full md:w-1/4 bg-gray-800 overflow-y-scroll md:overflow-y-visible	text-white p-4 rounded-lg md:sticky top-4"
    :class="{ 'fixed bottom-0 top-auto h-2/5 left-0 w-full': isMobile }" >
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>هزینه اتاق‌ها:</span>
          <span class="text-green-400 font-bold">۴۵,۲۱۰,۰۰۰ ریال</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد اتاق‌ها:</span>
          <span class="font-semibold">۱</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد نفر اضافی:</span>
          <span class="font-semibold">۰</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد نفرات:</span>
          <span class="font-semibold">۴ نفر</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد کودک:</span>
          <span class="font-semibold">۰ نفر</span>
        </div>
        <div class="flex justify-between">
          <span>تاریخ ورود:</span>
          <span class="font-semibold">۱۴۰۳/۰۸/۲۳</span>
        </div>
        <div class="flex justify-between">
          <span>مدت اقامت:</span>
          <span class="font-semibold">شب</span>
        </div>
        <div class="flex justify-between">
          <span>تخفیف:</span>
          <span class="font-semibold">۰ ریال</span>
        </div>
        <div class="flex justify-between font-bold">
          <span>جمع کل:</span>
          <span class="text-red-400">۴۵,۲۱۰,۰۰۰ ریال</span>
        </div>
      </div>
      <hr class="text-white mt-4">
       <!-- Terms Checkbox -->
       <q-checkbox v-model="agreeToTerms" color="white" class="mt-4"
       label="قوانین هتل را مطالعه کرده و تمامی موارد را قبول دارم." />

<!-- Summary and Payment Button -->
        <div class="bg-gray-800 text-white rounded-lg p-4 mt-4">
          <h4 class="font-bold">خلاصه فاکتور</h4>
          <p>جمع کل: {{ totalPrice }} ریال</p>
          <q-btn type="submit" color="red" label="پرداخت نهایی و تسویه حساب"
          class="w-full mt-4 text-center text-white font-semibold sticky"/>
        </div>
      <!-- <q-btn label="مرحله بعد ( ادامه رزرو )" color="green"
       class="w-full mt-4 text-center text-white font-semibold sticky" @click="this.$emit('next-step')" /> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const step = ref(2);
    const firstName = ref('');
    const lastName = ref('');
    const phone = ref('');
    const city = ref('');
    const address = ref('');
    const email = ref('');
    const agreeToTerms = ref(false);
    const totalPrice = ref(780000); // Update based on selected rooms from the first page

    const completeReservation = () => {
      if (agreeToTerms.value) {
        // Process payment and complete reservation
        alert("Reservation complete!");
      } else {
        alert("You must agree to the terms.");
      }
    };

    return {
      step, firstName, lastName, phone, city, address, email, agreeToTerms, totalPrice, completeReservation
    };
  }
};
</script>

<style scoped>
/* Custom styles */
</style>
