<template>
  <q-page class="flex flex-center">
   رزروهای من
 </q-page>
</template>
<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'
export default defineComponent({
 name: 'HotelReserves',
 setup() {
   const pageTitle = ref('رزروهای من');
 useMeta(() => ({
   title: pageTitle.value
 }));
 }
})
</script>
