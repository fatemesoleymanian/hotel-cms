<template>
  <div class="gallery-container bg-black">
    <!-- Header Title -->
    <h1 class="text-right text-white text-3xl font-bold pt-8 mr-8">{{ headerText }}</h1>

    <!-- Tabs Section -->
    <q-tabs
      v-model="activeTab"
      class="text-white mt-4"
      inline-label
      shrink
      indicator-color="primary"
    >
      <q-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :name="tab.name"
        :label="tab.label"
      />
    </q-tabs>
     <!-- Slider Section -->
    <q-carousel
      swipeable
      animated
      v-model="slide"
       control-color="primary"
      thumbnails
      infinite
       class="mt-4 bg-black text-white flex justify-center items-center"
    >
      <q-carousel-slide v-for="(slideGroup, groupIndex) in getSlidesByTab(activeTab)"
        :key="groupIndex"
        :name="groupIndex" :img-src="slideGroup.url"
        class="w-full" style="flex-shrink: 0; width: 80vw;max-width: 55vw;"/>
    </q-carousel>

    <!-- Edit Button -->
    <custom-btn @click="dialog = true" flat icon="edit" />

    <!-- Dialog for editing gallery -->
    <q-dialog v-model="dialog">
      <card-panel @on-submit="setGallery" size="100%" header="ویرایش گالری">
        <template #sections>
          <q-card-section>
            <div class="col-12 q-mb-md">آپلود عکس‌ها برای گالری</div>

            <!-- Tabs Editor -->
            <div class="col-12 q-mb-md">
              <custom-btn icon="add" @click="addTab()" label="Add Tab" />
              <div v-for="(tab, tabIndex) in tabs" :key="tabIndex" class="q-mt-md">
                <q-input v-model="tab.label" label="Tab Name" />
                <custom-btn icon="delete" color="negative" @click="removeTab(tabIndex)" />
              </div>
            </div>

            <!-- Images Editor for Each Tab -->
            <div v-for="(tab, tabIndex) in tabs" :key="tabIndex" class="q-mb-xl">
              <h3>{{ tab.label }}</h3>
              <div v-for="(slideGroup, groupIndex) in tab.slides" :key="groupIndex" class="row q-gutter-md">
                <div
                  v-for="(item, imgIndex) in slideGroup"
                  :key="imgIndex"
                  class="col-4"
                >
                  <q-uploader @added="files => onFileAdded(files, tabIndex, groupIndex, imgIndex)" accept="image/*" />
                  <img v-if="item.url" :src="item.url" alt="Uploaded Image" class="image-preview mt-2 rounded-lg" />
                </div>
                <custom-btn icon="add" @click="addImageGroup(tabIndex)" label="Add Image Group" />
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
  name: 'GalleryComponent',
  props: {
    headerText: {
      type: String,
      default: 'گالری',
    },
    tabsData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const dialog = ref(false);
    const slide = ref(0);
    const activeTab = ref('all');
    const tabs = ref([]);
    return {
      dialog,
      slide,
      activeTab,
      tabs,
    };
  },
  created() {
    // Initialize tabs with data or default
    this.tabs = this.tabsData.length
      ? this.tabsData
      : [
          {
            name: 'all',
            label: 'همه تصاویر',
            slides: [
                { url: 'https://images.squarespace-cdn.com/content/v1/625b5dabf803c6789696a2b3/d60a6f78-50a7-48a4-bd76-d38498218b83/2022.09.10+Hotel+Lilien2141.jpg' },
                { url: 'https://scdn.aro.ie/Sites/50/brochner_hotels/uploads/images/scrollimagegrid48/gridlandscape49/gridlandscapeextralarge52/Junior_Suite_Horizontal_1.jpg?v=0.00' },
                { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yQONCXtXqEnT-aVCKIWmGBoqgThUqVu3dA&s' },
                { url: 'https://media.gettyimages.com/id/500276137/photo/modern-villa-interior.jpg?s=612x612&w=0&k=20&c=K6Q7dRNYeke6xtoR__5uP4rXGJeUNoBK6l-u7El-BTY=' },
                { url: 'src="https://media.gettyimages.com/id/182238066/photo/asian-pool-villa.jpg?s=612x612&w=0&k=20&c=5wTUer7gyIXHoCLlNQ6gbUwQZRYEPdlvPji0wFiL3p8="' },
            ],
          },
          {
            name: 'coffeshop',
            label: 'کافی شاپ',
            slides: [
                { url: 'https://thumbs.dreamstime.com/b/serene-ocean-view-hotel-room-sunset-relaxation-travel-tranquility-vacation-calm-interior-seaside-serene-ocean-view-326792667.jpg' },
                { url: 'https://media.gettyimages.com/id/1300135335/photo/luxurious-bedroom-interior-at-nigh-with-messy-bed-leather-armchairs-closet-and-garden-view.jpg?s=612x612&w=0&k=20&c=3tFjNfMis-qELQ04hUmiG3W0i-5d7jBjaOP5YtB4sIw=' },
                { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjlRZPegyVLq7uKb0GhgThUl1XLtZGz7GAaQ&s' },
            ],
          },
        ];
  },
  methods: {
    getSlidesByTab(tabName) {
      const tab = this.tabs.find((t) => t.name === tabName);
      return tab ? tab.slides : [];
    },
    addTab() {
      this.tabs.push({ name: `tab-${this.tabs.length}`, label: `Tab ${this.tabs.length + 1}`, slides: [[]] });
    },
    removeTab(index) {
      this.tabs.splice(index, 1);
    },
    addImageGroup(tabIndex) {
      this.tabs[tabIndex].slides.push([
        { url: '' },
        { url: '' },
        { url: '' },
      ]);
    },
    onFileAdded(files, tabIndex, groupIndex, imgIndex) {
      const file = files[0];
      this.tabs[tabIndex].slides[groupIndex][imgIndex].url = URL.createObjectURL(file);
    },
    setGallery() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.carousel-item {
  flex-shrink: 0;
  max-width: 300px;
  position: relative;
}
.image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.image-preview {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
