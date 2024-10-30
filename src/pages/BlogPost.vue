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
      enter-active-class="animated fadeIn delay-2s slow"
      leave-active-class="animated fadeOut slower">
        <div class="w-full m-0 q-pa-none full-width mt-4 mb-0">
            <inscription-editor
                        key-val="blog-page-section-two"
                        :inscription-class="`text-color q-bt-md border-gray-700`"
                        :html="post" />

        </div>
    </transition>


    <transition
      appear
      enter-active-class="animated rollIn slower"
      leave-active-class="animated rollOut slower">
        <div class="w-full m-0 q-pa-md full-width mb-8">

                <div class="post-container">
          <!-- Share Row -->
          <div class="flex justify-between items-center mb-4">
            <div></div>
            <q-btn icon="share" label="اشتراک کذاری" color="primary" />
          </div>
          <hr />
          <!-- Navigation Row -->
          <div class="flex items-center justify-between pt-8 px-16">
            <q-btn icon="arrow_forward" label="پست قبلی" color="dark"
            class="text-center" push @click="this.$router.push('/')" />

            <q-btn icon="newspaper" @click="this.$router.push('/blog')" class="mx-4"
              color="dark" flat round >
            <q-tooltip>بازگشت به وبلاگ</q-tooltip>
            </q-btn>

            <q-btn icon-right="arrow_back" label="پست بعدی" color="dark"
            class="text-center" push @click="this.$router.push('/')" />
          </div>
        </div>
        </div>
      </transition>
 </q-page>
</template>
<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'
import InscriptionSlider from 'src/components/DynamicContentTools/InscriptionSlider.vue';
import InscriptionEditor from 'src/components/DynamicContentTools/InscriptionEditor.vue';
import { post } from 'src/stores/introduceValues';
export default defineComponent({
 name: 'BlogPost',
 components:{
  InscriptionSlider,
  InscriptionEditor
 },
 setup(props) {
    const pageTitle = ref('پست وبلاگ');
  useMeta(() => ({
    title: pageTitle.value
  }));
  return{
    post
  }

  }
})
</script>
<style>
.post-container {
  padding: 1rem;
}
</style>
