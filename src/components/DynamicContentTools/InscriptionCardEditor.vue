<template>
  <div :class="cardClass">
    <!-- Display cards in two columns -->
    <div :class="`grid sm:grid-cols-1  md:grid-cols-${columns} gap-8`">
      <q-card
        v-for="(item, index) in media"
        :key="index"
        flat
        bordered
      >
      <a :href="item.link || '#'">
      <transition
      appear
      enter-active-class="animated flipInY delay-2s slow"
      leave-active-class="animated flipOutY slower">
        <q-img :src="item.url || 'https://cdn.quasar.dev/img/parallax2.jpg'"/>
        </transition>

        <q-card-section>
          <div class="text-overline text-orange-9">{{ item.overline || 'Overline' }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ item.title || 'Title' }}</div>
          <div class="text-caption text-grey">
            {{ item.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" label="Share" />
          <q-btn flat color="secondary" label="Book" />
          <q-space />
          <q-btn v-if="moreDetails"
            color="grey"
            round
            flat
            dense
            :icon="expanded[index] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="toggleExpand(index)"
          />
        </q-card-actions>

        <q-slide-transition v-if="moreDetails">
          <div v-show="expanded[index]">
            <q-separator />
            <q-card-section class="text-subtitle2">
              {{ item.lorem || lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
        </a>
      </q-card>
    </div>

    <!-- Edit Button -->
    <custom-btn
      @click="dialog = true"
      flat
      v-if="editMode"
      padding="5px"
      icon="edit"
    />

    <!-- Dialog for editing cards -->
    <q-dialog v-model="dialog">
      <card-panel @on-submit="setCards" size="100%" header="ویرایش کارت‌ها">
        <template #sections>
          <q-card-section>
            <div class="col-12 q-mb-md">آپلود عکس‌ها برای کارت‌ها</div>
            <div class="col-12 q-mb-md">
              <custom-btn icon="add" @click="addNewCard" />
            </div>
            <div class="row q-mb-xl" v-for="(item, index) in media" :key="index">
              <!-- Delete Button for Each Card -->
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

              <!-- Text Inputs for Title, Description, and Link -->
              <div class="col-12 col-sm-6 q-pa-sm">
                <q-input
                  filled
                  v-model="item.title"
                  label="عنوان"
                  class="col-12"
                />
              </div>
              <div class="col-12 col-sm-6 q-pa-sm">
                <q-input
                  filled
                  v-model="item.description"
                  label="توضیح"
                  class="col-12"
                />
              </div>
              <div class="col-12 col-sm-6 q-pa-sm">
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

export default {
  name: 'CardSlider',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    cardClass: {
      type: String,
    },
    buttonColor: {
      default: 'black',
    },
    columns:{
      type:String,
      default:'2'
    },
    moreDetails:{
    type: Boolean,
    default: true
  },
  },
  setup() {
    const dialog = ref(false);
    const expanded = ref([]);
    return {
      dialog,
      slide: ref(0),
      media: ref([]), // Stores the uploaded images and associated data
      editMode: true,
      expanded,
      lorem: "Detailed description goes here...",
    };
  },
  async created() {
    // Load initial images passed as props
    this.media = this.images;
  },
  methods: {
    onFileAdded(files, index) {
      // Handles the upload of new files
      this.media[index].file = files[0];
    },
    async setCards() {
      // Save image URLs and other data for each card
      this.dialog = false;
    },
    toggleExpand(index) {
      // Toggle the expanded state for each card
      this.expanded[index] = !this.expanded[index];
    },
    addNewCard() {
      this.media.push({ url: '', title: '', description: '', link: '' });
      this.expanded.push(false);
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 40%;
}
</style>
