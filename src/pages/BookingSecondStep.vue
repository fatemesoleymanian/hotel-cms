<template>
  <q-page class="flex flex-center">
   رزرو آنلاین
 </q-page>
</template>
<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'
export default defineComponent({
 name: 'BookingSecondStep',
 setup() {
   const pageTitle = ref('رزرو آنلاین');
 useMeta(() => ({
   title: pageTitle.value
 }));
 }
});
</script>
