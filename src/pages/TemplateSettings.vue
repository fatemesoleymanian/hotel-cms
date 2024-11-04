<template>
  <div>
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
    <div class="row bg-white mx-4 mb-8" style="margin-top: -100px;">
      <div class="col-12">
        <color-changer />
      </div>
      <hr>
    </div>
<!-- pallette
font-family
hotel name
logo
title of each page
telephone reservasion
addres
fax
email
instagram
 -->
</div>
</template>
<script>
import ColorChanger from 'src/components/settings/Color-Changer.vue';

export default{
  components:{
    ColorChanger
  },
  methods:{
onChangeColors(color,variable){
 }
  }
}
</script>
