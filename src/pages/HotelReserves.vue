<template>
  <q-page class="flex flex-center bg-white" >
    <transition
      appear
      enter-active-class="animated fadeInRightBig slower"
      leave-active-class="animated fadeInLeftBig slower">
        <div class="w-full m-0 h-1/2 q-pa-none full-width mb-4">
          <img src="https://hoteldel.com/wp-content/uploads/2021/03/beach_village_2303_villa_oceanview_living_room_rbenson_2023_K1LOS_K1LOS2_2500x1100.jpg"
          class="w-full h-1/2 m-0 q-pa-none full-width"
          alt="Hotel Logo" />
        </div>
    </transition>

    <div class="q-py-md q-px-sm ">
    <q-table
      title="رزروهای من"
      :rows="rows"
      :columns="columns"
       bordered
       @on-db-click="onViewDetails"
      separator="cell"
      card-class="border-2 border-dark bg-accent text-black"
      row-key="name"
    />
  </div>
 </q-page>
</template>
<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]

export default defineComponent({
 name: 'HotelReserves',
 setup() {
   const pageTitle = ref('رزروهای من');
 useMeta(() => ({
   title: pageTitle.value
 }));
 return{
  rows,
  columns
 }
 },
 methods:{
  onViewDetails(id){
    alert('nn')
    window.location.href =  `voucher/${id}`
  }
 }
})
</script>
