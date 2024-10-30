<template>
   <q-page class="flex flex-center">
    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full h-screen m-0 q-pa-none full-width full-height mb-8">
            <inscription-slider
                            key-val-image="about-page-slider-1"
                            key-val-text="about-page-slider-text-1"
                            :sliderClass="`w-full h-screen m-0 q-pa-none full-width full-height`"
                            :images="[
                              {link:'/',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'texttt2'}]"
                            :html="headerTitle" />
        </div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeInRightBig delay-2s slow"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full h-screen m-0 q-pa-none full-width full-height bg-accent mb-8">
            <inscription-editor
                        key-val="about-page-section-two"
                        :inscription-class="`q-mb-sm text-color q-bt-md border-gray-700`"
                        :html="headerTitle" />

        </div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
          <div class="w-full h-screen m-0 q-pa-none full-width full-height bg-accent mb-8">
            <inscription-question-editor
            key-val="about-page-questions-section-three"
            :html="questions"/>
            </div>

      </transition>


    <transition
      appear
      enter-active-class="animated bounceIn slower delay-5s repeat-2"
      leave-active-class="animated bounceOut">
      <div class="w-full h-screen m-0 q-pa-none full-width full-height">
        <Inscription-gallary
                    key-val="about-page-gallary-section-four"
                    :inscription-class="`q-mb-sm text-color q-bt-md border-gray-700`"
                    :html="headerBody" />
                  </div>
                  </transition>
  </q-page>
</template>
<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'
import InscriptionSlider from 'src/components/DynamicContentTools/InscriptionSlider.vue';
import InscriptionEditor from 'src/components/DynamicContentTools/InscriptionEditor.vue';
import InscriptionQuestionEditor from 'src/components/DynamicContentTools/InscriptionQuestionEditor.vue';
import { headerTitle, headerBody } from 'src/stores/introduceValues';
import { questions } from 'src/stores/introduce/aboutUs';
import InscriptionGallary from 'src/components/DynamicContentTools/InscriptionGallary.vue';
export default defineComponent({
  name: 'AboutHotel',
  components:{
    InscriptionSlider,
    InscriptionEditor,
    InscriptionGallary,
    InscriptionQuestionEditor
  },
  setup() {
    const pageTitle = ref('معرفی هتل');
  useMeta(() => ({
    title: pageTitle.value
  }));
  return{
    headerTitle,
    headerBody,
    questions
  }
  }
});
</script>
