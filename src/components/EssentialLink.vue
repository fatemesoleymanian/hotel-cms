<template>
  <slot name="item">
    <q-item
      clickable
      tag="a"
      :href="link"
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <div class="row">
          <q-icon :name="icon" size="sm" />
          <div class="column q-ml-sm">
            <q-item-label>{{ title }}</q-item-label>
            <q-item-label caption>{{ caption }}</q-item-label>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </slot>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
