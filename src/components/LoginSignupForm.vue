<template>
   <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
  <q-card class="q-pa-md q-px-lg" style="max-width: 500px;">

    <q-card-section class="row items-center q-pa-none q-ma-none">
          <q-btn v-if="switchStep" icon="arrow_forward" flat round dense @click="switchStep = false"/>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

      <q-card-section style="margin-top: -10px;" v-if="switchStep">
        <div class="text-h5 font-bold text-center" >کد تایید را وارد کنید</div>
        <div class="text-subtitle2 text-center q-mt-sm">
          کد ۵ رقمی به شماره {{ phoneNumber }} ارسال شد.
        </div>
        <q-btn flat label="اصلاح شماره موبایل" color="primary" class="q-mt-sm text-center justify-center full-width" v-if="switchStep" @click="switchStep = false"/>
      </q-card-section>
      <q-card-section style="margin-top: -10px;" v-else>
        <div class="text-h5 font-bold text-center">ورود یا ثبت‌نام</div>

        <div class="text-subtitle2 font-medium text-center q-mt-sm">
          برای ادامه شماره موبایل خود را وارد کنید.
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-md" v-if="switchStep" style="direction: ltr!important;">
        <div class="row justify-around q-pa-md" style="direction: ltr!important;">
          <q-input
            ref="input0"
            v-model="code[0]"
            type="text"
            maxlength="1"
            outlined
            class="q-pa-sm q-ma-xs otp-inputs"
            @update:model-value="focusNext(0)"
          />
          <q-input
            ref="input1"
            v-model="code[1]"
            type="text"
            maxlength="1"
            outlined
            class="q-pa-sm q-ma-xs otp-inputs"
            @update:model-value="focusNext(1)"
          />
          <q-input
            ref="input2"
            v-model="code[2]"
            type="text"
            maxlength="1"
            outlined
            class="q-pa-sm q-ma-xs otp-inputs"
            @update:model-value="focusNext(2)"
          />
          <q-input
            ref="input3"
            v-model="code[3]"
            type="text"
            maxlength="1"
            outlined
            class="q-pa-sm q-ma-xs otp-inputs"
            @update:model-value="focusNext(3)"
          />
          <q-input
            ref="input4"
            v-model="code[4]"
            type="text"
            maxlength="1"
            outlined
            class="q-pa-sm q-ma-xs otp-inputs"
            @update:model-value="focusNext(4)"
          />
        </div>
        <div class="text-center text-caption text-grey-7">
          {{ formattedTime }} تا درخواست مجدد کد
          <q-btn  v-if="reset" outline class="font-bold q-mx-sm" label="ارسال مجدد کد" color="primary" size="sm" @click="reset=false;startCountdown()"/>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <q-input
          dir="rtl"
          v-model="phoneNumber"
          label="شماره موبایل"
          filled
          placeholder="شماره موبایل"
          maxlength="11"
          type="tel"
          class="q-my-md"
        />
        <q-checkbox
          v-model="acceptTerms"
          label="استفاده از هتل به معنی پذیرش قوانین و مقررات این سرویس است."
          right-label
          size="xs"
          class="text-right"
        />
      </q-card-section>

      <q-card-actions v-if="switchStep">
        <q-btn label="تایید و ادامه" color="primary" class="full-width" ref="confirmCodebtn"
        @click="submitFinal"/>
      </q-card-actions>
      <q-card-actions v-else>
        <q-btn
          label="تایید و دریافت کد"
          color="primary"
          :disable="!acceptTerms || !phoneNumber"
          class="full-width q-mb-none"
          @click="switchStep = true;startCountdown()"
        />
      </q-card-actions>

      <!-- <q-card-section  style="margin-top: -10px;">
        <q-btn
          flat
          label="ورود با کلمه عبور"
          color="primary"
          class="full-width text-center justify-center q-mt-none q-pt-none"
        />
      </q-card-section> -->
    </q-card>
    </transition>
</template>
<script>
import { setRole, setToken } from 'src/stores/localStorageVariables';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'LoginSignupForm',
  components:{
  },
  setup() {

  return{
    switchStep: ref(false),
    reset: ref(false),
  }
  },
  computed: {
    formattedTime() {
      const minutes = String(Math.floor(this.timer / 60)).padStart(2, '0');
      const seconds = String(this.timer % 60).padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
  },
  data() {
    return {
      phoneNumber: '',
      acceptTerms: false,
      code: ['', '', '', '', ''],
      timer: 240, // 4 minutes in seconds
      intervalId: null,
    };
  },
  methods:{
    focusNext(index) {
      if (this.code[index].length === 1 && index < 4) {
        this.$refs[`input${index + 1}`].focus();
      }
      if (index === 4){
        this.$refs.confirmCodebtn.click()
      }
    },
    submitFinal(){
      setToken('ssss')
      setRole('user')
      this.$emit('on-close')
    },
    startCountdown() {
      if (this.intervalId) clearInterval(this.intervalId); // Clear any previous interval
      this.timer = 240; // Reset timer to 4 minutes
      this.reset = false; // Reset the reset variable
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.intervalId); // Stop the countdown at 0
          this.reset = true; // Set reset to true when countdown ends
        }
      }, 1000);
    }
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval when component is destroyed
    }
  },
});
</script>
<style>
.otp-inputs{
   text-align: center;
   width: 30px;
}
@media (min-width: 640px) {
  .otp-inputs{
   width: 40px;
}
}
@media (min-width: 768px) {
  .otp-inputs{
   width: 50px;
}
 }
</style>
