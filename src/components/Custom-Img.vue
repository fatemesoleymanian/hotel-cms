<template>
    <q-img :src="srcs[index]" @click="maximumDialog=true"/>
    <q-dialog @hide="playPause(false); timer = 0" maximized v-model="maximumDialog">
      <q-img class="no-scroll" :src="srcs[currentIndex]" fit="scale-down"/>
      <div>
        <q-btn icon="arrow_back_ios" style="height: 50%" class="arrow-btn-style center-right side-buttons" @click="previous(); this.autoPlayEnable=false"/>
        <q-btn icon="arrow_forward_ios" style="height: 50%" class="arrow-btn-style center-left side-buttons" @click="next(); this.autoPlayEnable=false"/>

        <div class="absolute-bottom items-center row justify-center">
          <div>
            <q-btn
                round
                size="md"
                icon="chevron_right"
                class="btn-style"
                @click="next"/>
          </div>
          <q-circular-progress
            show-value
            font-size="10px"
            class="q-ma-md"
            :value="(timer / duration) * 100"
            size="72px"
            :animation-speed="0"
            :thickness="0.2"
            color="primary"
            track-color="grey-3"
          >
            <q-btn
              round
              size="lg"
              :icon="this.playing ? 'pause' : 'play_arrow'"
              class="btn-style"
              @click="playPause(!playing)"/>
          </q-circular-progress>
          <div>
            <q-btn
                round
                size="md"
                icon="chevron_left"
                class="btn-style"
                @click="previous"/>
          </div>

        </div>
        <div class="absolute-top-right">
          <q-btn
          color="negative"
          icon="close"
          padding="lg"
          @click="maximumDialog = false"/>
        </div>
        <div class="absolute-top row justify-center">
          <div class="h1 footer-style q-px-lg">{{ getSrcNumber }} / {{ srcs.length }}</div>
        </div>
      </div>
    </q-dialog>
</template>
<script>
import { ref } from 'vue'

export default {
  props: {
    srcs: {
      default: []
    },
    index: {
      default: 0
    }
  },
  setup () {
    return {
      maximumDialog: ref(false),
      playing: ref(false),
      thread: ref(null),
      duration: ref(3000),
      timer: ref(0)
    }
  },

  data () {
    return {
      currentIndex: ref(this.index)
    }
  },

  methods: {
    next () {
      this.currentIndex = this.currentIndex < this.srcs.length - 1
        ? this.currentIndex + 1
        : 0
    },

    previous () {
      this.currentIndex = this.currentIndex !== 0
        ? this.currentIndex - 1
        : this.srcs.length - 1
    },

    playPause (play) {
      this.playing = play
      if (this.playing) this.autoPlay()
      else this.stopPlay()
    },

    stopPlay () {
      clearTimeout(this.thread)
    },

    autoPlay () {
      this.thread = setTimeout(async () => {
        this.autoPlay()
        this.timer += 50
        if (this.timer >= this.duration) {
          this.next()
          this.timer = 0
        }
      }, 50)
    }
  },

  computed: {
    getSrcNumber () {
      return this.currentIndex + 1
    }
  }
}
</script>
<style scoped>
.footer-style {
  background-color: rgb(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
}

.btn-style {
  color: white;
  background-color: rgb(0, 0, 0, 0.7);
}

.arrow-btn-style {
  color: white;
  background-color: rgb(255, 255, 0, 0.2);
}
</style>
