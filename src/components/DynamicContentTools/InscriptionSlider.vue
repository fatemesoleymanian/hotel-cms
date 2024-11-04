<template>
  <div :class="sliderClass">
    <!-- Carousel for displaying images, text, and link -->
    <q-carousel
      v-model="slide"
      control-color="gray-700"
      navigation-icon="radio_button_unchecked"
      navigation
      swipeable
      animated
      padding
      arrows
      autoplay="true"
      height="300px"
      class="bg-white text-black shadow-1 rounded-borders w-full h-screen m-0 q-pa-none full-width full-height"
    >
      <q-carousel-slide
        v-for="(item, index) in media"
        :key="index"
        :name="index"
        :img-src="item.url"
        class="column no-wrap flex-between flex-center"
      >
        <!-- <img :src="item.url" alt="Slide Image" class="w-full h-56 object-cover rounded" /> -->
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap" v-if="multipleImgesInSlide">
          <q-img class="rounded-borders col-6 full-height" :src="item.imgs[index]" />
          <q-img class="rounded-borders col-6 full-height" :src="item.imgs[index]" />
        </div>
        <div class="q-mt-md text-center bg-dark rounded-borders q-py-md q-px-xl"
          style="margin-top: auto;" v-else>
          <a :href="item.link" target="_blank" class="text-white">
            {{ item.text }}
          </a>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <!-- Edit Button -->

    <custom-btn
      @click="dialog = true"
      flat
      v-if="editMode"
      padding="5px"
      icon="edit"
    />

    <!-- Dialog for editing images, text, and links -->
    <q-dialog v-model="dialog">
      <card-panel @on-submit="setSlider" size="100%" header="ویرایش اسلایدر">
        <template #sections>
          <q-card-section>
            <div class="col-12 q-mb-md">آپلود عکس‌ها برای اسلایدر</div>
            <div class="col-12 q-mb-md">
              <custom-btn icon="add" @click="media.push({ url: '', text: '', link: '' })" />
            </div>
            <div
              class="row q-mb-xl"
              v-for="(item, index) in media"
              :key="index"
            >
              <!-- Delete Button for Each Slide -->
              <div class="col-12 q-my-md">
                <custom-btn color="negative" icon="delete" @click="media.splice(index, 1)" />
              </div>

              <!-- Image Uploader -->
              <q-uploader
                @added="files => onFileAdded(files, index)"
                class="col-12 col-sm-6 q-pa-sm"
                label="تصویر"
                accept=".jpg, .png, image/*"
              />

              <!-- Text Input for Caption -->
              <div class="col-12 col-sm-6 q-pa-sm">
                <q-input
                  filled
                  v-model="item.text"
                  label="توضیح تصویر"
                  class="col-12"
                />
              </div>

              <!-- Link Input -->
              <div class="col-12 q-pa-sm">
                <q-input
                  filled
                  v-model="item.link"
                  label="لینک"
                  class="col-12"
                />
              </div>
            </div>
          </q-card-section>
        </template>
      </card-panel>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { uploadImage } from 'src/stores/uploadApi';

export default {
  name: 'CarouselSlider',
  props: {
    keyValImage: {
    type: String,
    required: true
  },
  keyValText: {
    type: String,
    required: true
  },
    images: {
      type: Array,
      default: () => [],
    },
    sliderClass: {
      type: String,
    },
    buttonColor: {
      default: 'black',
    },
    multipleImgesInSlide: {
      type:Boolean,
      default: false,
    },
  },
  setup() {
    const dialog = ref(false);
    return {
      dialog,
      slide: ref(0),
      media: ref([]), // Stores the uploaded images and associated data
      editMode: true,
    };
  },
  async created() {
    // Load initial images passed as props
    this.media = this.images;
    console.log(this.media)
  },
  methods: {
    onFileAdded(files, index) {
      // Handles the upload of new files
      this.media[index].file = files[0];
    },
    async setSlider() {
      // Upload images and save their URLs in `media`
      const files = this.media.map((item) => (item.file ? item.file : null));
      // const uploadRes = (await uploadImage.request('create', files)).data;

      let uploadIndex = 0;
      this.media.forEach((item) => {
        if (item.file) {
          item.url = uploadRes[uploadIndex];
          uploadIndex++;
        }
        delete item.file;
      });

      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.w-full {
  width: 100%;
}
.h-56 {
  height: 14rem;
}
.object-cover {
  object-fit: cover;
}
</style>
