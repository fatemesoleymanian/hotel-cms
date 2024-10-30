<template>
    <custom-input
    @update:model-value="console.log(date); $emit('update', date)"
    filled
    v-model="date">
      <template v-slot:prepend v-if="hasDate">
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append v-if="hasClock">
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </custom-input>
</template>
<script>
import { ref } from 'vue'
export default {
  props: ['hasTime', 'hasDate', 'value'],
  setup () {
    return {
      date: ref(null)
    }
  },

  data () {
    this.date = this.value
    console.log(this.date)
  }
}
</script>
