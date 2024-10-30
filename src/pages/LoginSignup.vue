<template>
  <q-page class="flex flex-center">
    ورود / ثبت نام
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginSignup',
  setup() {
   const pageTitle = ref('ورود / ثبت نام');
 useMeta(() => ({
   title: pageTitle.value
 }));
 }
})
</script>
