<template>
  <q-page class="flex flex-center">
    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower"
    >
    <div class="w-full h-screen m-0 q-pa-none full-width full-height mb-8">
        <inscription-slider
                        key-val-image="home-page-slider-1"
                        key-val-text="home-page-slider-text-1"
                        :sliderClass="`w-full h-screen m-0 q-pa-none full-width full-height`"
                        :images="[
                          {link:'/',url:'https://hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg',text:'texttt'},
                          {link:'/',url:'https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg',text:'texttt2'}]"
                        :html="headerTitle" />
    </div>
    </transition>
    <transition
appear
enter-active-class="animated fadeInRightBig delay-2s slow"
leave-active-class="animated fadeInLeftBig slower"
>
    <div class="w-full h-screen m-0 q-pa-none full-width full-height bg-accent mb-8">
        <inscription-editor
                    key-val="home-page-section-two"
                    :inscription-class="`q-mb-sm text-color q-bt-md border-gray-700`"
                    :html="headerTitle" />

    </div>
    </transition>
    <transition
      appear
      enter-active-class="animated bounceIn slower delay-5s repeat-2"
      leave-active-class="animated bounceOut">
    <div class="w-full m-0">
      <inscription-overflow-slider
                    key-val-image="home-page-slider-2"
                    key-val-text="home-page-slider-text-2"
                    :sliderClass="`q-mb-sm text-color`"
                    :images="[
                      {link:'/',url:'https://www.google.com/imgres?q=hotel%20images&imgurl=https%3A%2F%2Fhoteldel.com%2Fwp-content%2Fuploads%2F2021%2F01%2Fhotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg&imgrefurl=https%3A%2F%2Fhoteldel.com%2F&docid=WbWkksqRk6OlFM&tbnid=mmZGYZeAzQ6HiM&vet=12ahUKEwiZseqllbGJAxXXxgIHHYqFBmgQM3oECGUQAA..i&w=1600&h=900&hcb=2&ved=2ahUKEwiZseqllbGJAxXXxgIHHYqFBmgQM3oECGUQAA',text:'texttt'},
                      {link:'/',url:'https://www.google.com/imgres?q=hotel%20images&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F119926339%2Fphoto%2Fresort-swimming-pool.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3D9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fresort-swimming-pool-gm119926339-15353142&docid=oKIDTkDtOQnbCM&tbnid=5fOLZTxG4oyxXM&vet=12ahUKEwiZseqllbGJAxXXxgIHHYqFBmgQM3oECFEQAA..i&w=612&h=410&hcb=2&ved=2ahUKEwiZseqllbGJAxXXxgIHHYqFBmgQM3oECFEQAA',text:'texttt2'}]"
                    :html="headerTitle" />
     </div>
     </transition>
     <transition
      appear
      enter-active-class="animated rollIn slower delay-5s repeat-2"
      leave-active-class="animated rollOut">
     <div class="w-full h-screen m-0 q-pa-none full-width full-height bg-accent">
        <inscription-editor
                    key-val="home-page-section-three"
                    :inscription-class="`q-mb-sm text-color q-bt-md border-gray-700`"
                    :html="headerBody" />
      </div>
      </transition>
      <transition
      appear
      enter-active-class="animated bounceIn slower delay-5s repeat-2"
      leave-active-class="animated bounceOut">
      <div class="w-full h-screen m-0 q-pa-none full-width full-height">
        <Inscription-gallary
                    key-val="home-page-gallary-one"
                    :inscription-class="`q-mb-sm text-color q-bt-md border-gray-700`"
                    :html="headerBody" />
                  </div>
                  </transition>
                  <transition
      appear
      enter-active-class="animated rollIn slower delay-5s repeat-2"
      leave-active-class="animated rollOut">
      <div class="w-full m-0 q-pa-sm full-width bg-accent">
          <inscription-editor
                    key-val="home-page-section-four"
                    :inscription-class="`q-mb-sm text-color q-bt-md border-gray-700`"
                    :html="headerBody" />
      </div>
    </transition>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { headerTitle, headerBody, features, body1, body2, body3 } from 'stores/introduceValues'
import InscriptionEditor from 'src/components/DynamicContentTools/InscriptionEditor.vue'
import InscriptionSlider from 'src/components/DynamicContentTools/InscriptionSlider.vue'
// import { getFeaturedApps } from 'stores/abrwareApi'
import { ref } from 'vue'
import InscriptionOverflowSlider from 'src/components/DynamicContentTools/InscriptionOverflowSlider.vue'
import InscriptionGallary from 'src/components/DynamicContentTools/InscriptionGallary.vue'
import { useMeta } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const pageTitle = ref('هتل');
 useMeta(() => ({
   title: pageTitle.value
 }));
    return {
      headerTitle,
      headerBody,
      body1,
      body2,
      body3,
      featuredApps: ref(null),
      features: ref(features)
    }
  },

  data () {
    this.getFeaturedApps()
  },

  methods: {
    async getFeaturedApps () {
      // const res = await getFeaturedApps()
      // this.featuredApps = res
    }
  },

  components: {
    InscriptionEditor,
    InscriptionSlider,
    InscriptionOverflowSlider,
    InscriptionGallary
  }
})
</script>

<style scoped>
.header-border-style {
  border-bottom-right-radius: 1200px 400px;
  border-bottom-left-radius: 1200px 400px;
}
.header-border-style2 {
  border-top-right-radius: 1200px 400px;
  border-top-left-radius: 1200px 400px;
}
</style>
