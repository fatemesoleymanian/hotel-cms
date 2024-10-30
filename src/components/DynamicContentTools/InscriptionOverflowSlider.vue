<template>
  <div class="header-container pr-2">
    <!-- Title Section -->
    <h1 class="text-right text-3xl font-bold mt-4 mr-8">{{ headerText }}</h1>

    <!-- Horizontal Scroll Container -->
    <div class="horizontal-scroll-container mt-2">
      <div v-for="(item, index) in media" :key="index" class="carousel-item">
        <img :src="item.url" alt="Slide Image" class="image" />
        <div class="text-overlay bg-primary">{{ item.text }}</div>
      </div>
    </div>

    <!-- Edit Button -->
    <custom-btn @click="dialog = true" flat icon="edit" />

    <!-- Dialog for editing images, text, and links -->
    <q-dialog v-model="dialog">
      <card-panel @on-submit="setSlider" size="100%" header="ویرایش اسلایدر">
        <template #sections>
          <q-card-section>
            <div class="col-12 q-mb-md">آپلود عکس‌ها برای اسلایدر</div>
            <div class="col-12 q-mb-md">
              <custom-btn icon="add" @click="media.push({ url: '', text: '', link: '' })" />
            </div>
            <div class="row q-mb-xl" v-for="(item, index) in media" :key="index">
              <div class="col-12 q-my-md">
                <custom-btn color="negative" icon="delete" @click="media.splice(index, 1)" />
              </div>
              <q-uploader @added="files => onFileAdded(files, index)" class="col-12 col-sm-6 q-pa-sm" label="تصویر" accept=".jpg, .png, image/*" />
              <div class="col-12 col-sm-6 q-pa-sm">
                <q-input filled v-model="item.text" label="توضیح تصویر" class="col-12" />
              </div>
              <div class="col-12 q-pa-sm">
                <q-input filled v-model="item.link" label="لینک" class="col-12" />
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
  props: {
    headerText: {
      type: String,
      default: 'واحدهای اقامتی',
    },
    slides: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const dialog = ref(false);
    const media = ref([]);
    return {
      dialog,
      media,
    };
  },
  created() {
    this.media = this.slides.length ? this.slides : [
    { url: 'https://media.gettyimages.com/id/1363879795/photo/wide-shot-of-woman-opening-curtains-to-deck-of-luxury-suite-at-tropical-resort.jpg?s=612x612&w=0&k=20&c=KlePrqhokhQpbTjtsoyID2o5ygr9admncsokJ7-27kQ=', text: 'Room Type 1' },
        { url: 'https://media.gettyimages.com/id/1916666157/photo/maldives-paradise-glowing-sunset-beach-perfect-tropical-island-beautiful-dusk-palm-trees-and.jpg?s=612x612&w=0&k=20&c=Neu_ualTlXfffjc2FDS8VMBX8r3NKNa-gdnBzO3VJFE=', text: 'Room Type 2' },
        { url: 'https://thumbs.dreamstime.com/b/mint-green-trolley-suitcase-next-to-hotel-room-bed-travel-concept-vertical-shot-332374420.jpg', text: 'Room Type 3' },
        { url: 'https://img.freepik.com/premium-photo/vertical-image-luxury-hotels-bedroom-interior-with-big-windows-panoramic-city-view-sunset_704508-2446.jpg', text: 'Room Type 4' },
        { url: 'https://media.gettyimages.com/id/171572923/photo/luxurious-hotel-room-and-or-honeymoon-suite.jpg?s=612x612&w=0&k=20&c=r6e2mzdD5hBGjd-GJsvv3-FHOaIG8Kigq03kU05OA7o=', text: 'Room Type 5' },
        { url: 'https://media.gettyimages.com/id/988580828/photo/woman-getting-ready-in-the-hotel.jpg?s=612x612&w=0&k=20&c=I1aJ3mEymbJ7I9hn6GTe7wL53Zyyu4kHlXspe7KmMpk=', text: 'Room Type 6' },
        { url: 'https://media.gettyimages.com/id/1363879795/photo/wide-shot-of-woman-opening-curtains-to-deck-of-luxury-suite-at-tropical-resort.jpg?s=612x612&w=0&k=20&c=KlePrqhokhQpbTjtsoyID2o5ygr9admncsokJ7-27kQ=', text: 'Room Type 1' },
        { url: 'https://media.gettyimages.com/id/1916666157/photo/maldives-paradise-glowing-sunset-beach-perfect-tropical-island-beautiful-dusk-palm-trees-and.jpg?s=612x612&w=0&k=20&c=Neu_ualTlXfffjc2FDS8VMBX8r3NKNa-gdnBzO3VJFE=', text: 'Room Type 2' },
        { url: 'https://thumbs.dreamstime.com/b/mint-green-trolley-suitcase-next-to-hotel-room-bed-travel-concept-vertical-shot-332374420.jpg', text: 'Room Type 3' },
        { url: 'https://img.freepik.com/premium-photo/vertical-image-luxury-hotels-bedroom-interior-with-big-windows-panoramic-city-view-sunset_704508-2446.jpg', text: 'Room Type 4' },
        { url: 'https://media.gettyimages.com/id/171572923/photo/luxurious-hotel-room-and-or-honeymoon-suite.jpg?s=612x612&w=0&k=20&c=r6e2mzdD5hBGjd-GJsvv3-FHOaIG8Kigq03kU05OA7o=', text: 'Room Type 5' },
        { url: 'https://media.gettyimages.com/id/988580828/photo/woman-getting-ready-in-the-hotel.jpg?s=612x612&w=0&k=20&c=I1aJ3mEymbJ7I9hn6GTe7wL53Zyyu4kHlXspe7KmMpk=', text: 'Room Type 6' },
    ];
  },
  methods: {
    onFileAdded(files, index) {
      this.media[index].file = files[0];
    },
    async setSlider() {
      const files = this.media.map(item => item.file || null);
      let uploadIndex = 0;
      this.media.forEach(item => {
        if (item.file) {
          item.url = `uploaded_url_${uploadIndex}`; // Replace with actual upload logic
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
.horizontal-scroll-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 1rem 0;
}

.carousel-item {
  flex-shrink: 0;
  width: 80vw;
  max-width: 300px;
  scroll-snap-align: center;
  position: relative;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.text-overlay {
  text-align: center;
  color: white;
  padding: 0.5rem;
  border-radius: 0 0 8px 8px;
}

.horizontal-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.horizontal-scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.horizontal-scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>
