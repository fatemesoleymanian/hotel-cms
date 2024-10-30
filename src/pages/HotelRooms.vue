<template>
  <q-page class="flex flex-center">
    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full h-screen m-0 q-pa-none full-width full-height mb-8">
            <inscription-slider
                            key-val-image="rooms-page-slider-1"
                            key-val-text="rooms-page-slider-text-1"
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
                        key-val="rooms-page-section-two"
                        :inscription-class="`text-color q-bt-md border-gray-700`"
                        :html="body2" />

        </div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full h-screen m-0 q-pa-none full-width full-height mb-8">
            <inscription-card-editor
                            key-val-image="rooms-page-img-cards-section-three"
                            key-val-text="rooms-page-text-cards-section-three"
                            :cardClass="`w-full h-screen m-0 q-px-lg full-width full-height`"
                            :images="[
                              {link:'/',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'room 1'},
                              {link:'/',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'room 2'}]"
                            :html="headerTitle" />
        </div>
    </transition>


  </q-page>
</template>

<script>
import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'
import InscriptionCardEditor from 'src/components/DynamicContentTools/InscriptionCardEditor.vue';
import InscriptionSlider from 'src/components/DynamicContentTools/InscriptionSlider.vue';
import InscriptionEditor from 'src/components/DynamicContentTools/InscriptionEditor.vue';
import { body2 } from 'src/stores/introduceValues';
export default defineComponent({
  name: 'HotelRooms',
  components:{
    InscriptionCardEditor,
    InscriptionSlider,
    InscriptionEditor
  },
  setup() {
   const pageTitle = ref('اتاق ها');
 useMeta(() => ({
   title: pageTitle.value
 }));
 return{
  body2
 }
 }
})
</script>
