<template>
  <q-page class="flex flex-center">
    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full h-screen m-0 q-pa-none full-width full-height mb-8">
            <inscription-slider
                            key-val-image="blog-page-slider-1"
                            key-val-text="blog-page-slider-text-1"
                            :sliderClass="`w-full h-screen m-0 q-pa-none full-width full-height`"
                            :images="[
                              {link:'/',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'texttt2'}]"
                            :html="headerTitle" />
        </div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeIn delay-2s slow"
      leave-active-class="animated fadeOut slower">
        <div class="w-full m-0 q-pa-none full-width mt-4 mb-0">
            <inscription-editor
                        key-val="blog-page-section-two"
                        :inscription-class="`text-color q-bt-md border-gray-700`"
                        :html="body3" />

        </div>
    </transition>
    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full h-screen m-0 q-pa-none full-width full-height mb-8">
            <inscription-card-editor
                            key-val-image="blog-page-img-cards-section-three"
                            key-val-text="blog-page-text-cards-section-three"
                            :cardClass="`w-full h-screen m-0 q-px-lg full-width full-height`"
                            :columns="'3'"
                            :more-details="false"
                            :images="[
                              {link:'/post/first-post',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'room 1'},
                              {link:'/post/second-post',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'room 1'},
                              {link:'/post/third-post',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'room 2'}]"
                            :html="headerTitle" />
        </div>
    </transition>
 </q-page>
</template>
<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'
import { body3 } from 'src/stores/introduceValues';
import InscriptionSlider from 'src/components/DynamicContentTools/InscriptionSlider.vue';
import InscriptionCardEditor from 'src/components/DynamicContentTools/InscriptionCardEditor.vue';
import InscriptionEditor from 'src/components/DynamicContentTools/InscriptionEditor.vue';
InscriptionEditor
export default defineComponent({
 name: 'HotelBlog',
 components:{
  InscriptionSlider,
  InscriptionCardEditor,
  InscriptionEditor
 },
 setup() {
   const pageTitle = ref('وبلاگ هتل');
 useMeta(() => ({
   title: pageTitle.value
 }));
 return{
body3
 }
 }
})
</script>
