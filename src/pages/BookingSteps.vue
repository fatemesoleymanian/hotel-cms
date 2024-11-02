<template>
  <q-page class="flex flex-center bg-white">

    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full object-cover h-[500px]">
          <img src="https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg"
          class="w-full object-cover h-[500px]"
          alt="Hotel Logo" />
        </div>
    </transition>
    <div class="q-pa-md md:px-12 full-width "
       style="margin-top: -250px;">
       <q-stepper v-model="step"
          ref="stepper"
          elevated
          color="primary"
          header-nav
          alternative-labels
          animated >
      <!-- Step 1: Room Selection -->
      <q-step title="رزرو اتاق" icon="hotel"
        :name="1"
        :done="step > 1">
        <step-one @next-step="goNextStep"/>
      </q-step>
      <q-step title="مشخصات فردی" icon="hotel"
        :name="2"
        :done="step > 2">
        <step-two />
      </q-step>
        <q-step
        :name="3"
        title="Create an ad"
        icon="add_comment">
        <step-three />
      </q-step>
    </q-stepper>

    </div>

 </q-page>
</template>
<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'
import StepOne from 'src/components/book/StepOne.vue';
import StepTwo from 'src/components/book/StepTwo.vue';
import StepThree from 'src/components/book/StepThree.vue';
export default defineComponent({
 name: 'BookingSteps',
 setup() {
   const pageTitle = ref('رزرو آنلاین');
 useMeta(() => ({
   title: pageTitle.value
 }));
 const step = ref(1);

    return {
      step
        };
 },
 methods:{
  goNextStep(){
     this.$refs.stepper.next()
    },
    goPreviousStep(){
     if(this.step > 1) this.$refs.stepper.previous()
    }
 },
  components:{
    StepOne,
    StepTwo,
    StepThree
  }
});
</script>
