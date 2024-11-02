<template>
<div>
  <div class="p-4 border rounded-lg shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-gray-100">
    <!-- Image and Dates Section -->
    <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
      <img src="https://reserve.salardarehhotel.com/salar/img/icons/reservation.png"
        alt="Person with luggage" class="w-10 h-10 object-cover md:ml-4" />
      <div class="flex flex-col items-start text-right q-px-md q-py-sm md:border-r border-gray-400">
        <span class="text-green-600 font-semibold">تاریخ ورود شما: {{ startDate }}</span>
        <span class="text-gray-500 font-semibold">تاریخ خروج شما: {{ endDate }}</span>
      </div>
    </div>

    <!-- Date Selection and Duration -->
    <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
      <div class="flex items-center space-x-2">
        <span class="text-gray-500">از تاریخ</span>
        <q-input v-model="startDate" mask="####/##/##" filled placeholder="----/--/--" class="w-32" />
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-gray-500">به مدت</span>
        <q-select dense v-model="duration" :options="durations" filled placeholder="انتخاب کنید" class="w-32" />
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-gray-500">تا تاریخ</span>
        <q-input v-model="endDate" mask="####/##/##" filled placeholder="----/--/--" class="w-32" />
      </div>
    </div>

    <!-- Search Button -->
    <q-btn color="green" label="جستجو" class="text-white font-semibold bg-white q-px-lg md:ml-auto"
    outline />
  </div>

  <div class="flex flex-col md:flex-row bg-gray-100 my-4 border rounded-lg shadow-md px-2 py-2">
    <!-- Room Cards Section -->
    <div class="w-full md:w-3/4 space-y-6">
      <!-- Room Card 1 -->
      <div class="border rounded-lg p-4 shadow-md flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center gap-2">
              <span class="font-semibold">ظرفیت اتاق:</span>
              <div class="flex items-center space-x-1">
                <q-icon name="person" size="xs" v-for="i in 3" :key="i" />
                <q-icon name="child_friendly" size="xs" />
              </div>
              <q-icon name="info" size="xs" class="text-gray-500" >
                <q-tooltip>ظرفیت اتاق سه نفر + کودک</q-tooltip>
              </q-icon>
            </div>
            <button class="text-red-500 font-semibold border border-red-500 rounded px-2 py-1">حذف اتاق</button>
          </div>
          <h3 class="text-xl font-bold text-gray-700">دوبلکس</h3>
          <div class="flex gap-2 mb-2">
            <span class="text-gray-600">قیمت هر دوپلکس:</span>
            <span class="text-red-500 font-bold">۴۵,۲۱۰,۰۰۰ ریال</span>
          </div>
          <div class="flex gap-2 mb-4">
            <span class="text-gray-600">قیمت هر نفر اضافی:</span>
            <span class="font-semibold">۱۱,۰۰۰,۰۰۰ ریال</span>
          </div>
          <div class="grid grid-cols-3 gap-2 mb-4">
            <label class="flex items-center">
              <span class="mr-2">اتاق</span>
              <q-select dense filled v-model="rooms" :options="['۱', '۲', '۳']" class="w-full" />
            </label>
            <label class="flex items-center">
              <span class="mr-2">نفر اضافه</span>
              <q-select dense filled v-model="extraPerson" :options="['۰', '۱', '۲', '۳']" class="w-full" />
            </label>
            <label class="flex items-center">
              <span class="mr-2">کودک</span>
              <q-select dense filled v-model="children" :options="['۰', '۱', '۲', '۳']" class="w-full" />
            </label>
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-1">
              <q-checkbox v-model="breakfast" size="sm"/>
              <span>صبحانه</span>
            </label>
            <label class="flex items-center gap-1">
              <q-checkbox v-model="lunch" size="sm"/>
              <span>نهار</span>
            </label>
            <label class="flex items-center gap-1">
              <q-checkbox v-model="dinner" size="sm"/>
              <span>شام</span>
            </label>
          </div>
        </div>
        <div class="flex-shrink-0 w-full md:w-1/3">
          <img src="https://via.placeholder.com/150" alt="Room Image" class="rounded-lg w-full h-36 object-cover" />
          <q-btn label="امکانات اتاق" class="w-full mt-2 text-center" color="accent"
          @click="roomFacilitiesDialog = true"/>
        </div>
      </div>

      <!-- Room Card 2 (Repeat structure for other room types) -->
      <div class="border rounded-lg p-4 shadow-md flex flex-col md:flex-row gap-4 ">
        <div class="flex-grow">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center gap-2">
              <span class="font-semibold">ظرفیت اتاق:</span>
              <div class="flex items-center space-x-1">
                <q-icon name="person" size="xs" v-for="i in 3" :key="i" />
                <q-icon name="child_friendly" size="xs" />

              </div>
              <q-icon name="info" size="xs" class="text-gray-500" >
                <q-tooltip>ظرفیت اتاق سه نفر + کودک</q-tooltip>
              </q-icon>
            </div>
            <button class="text-red-500 font-semibold border border-red-500 rounded px-2 py-1">انتخاب اتاق</button>
          </div>
          <h3 class="text-xl font-bold text-gray-700">سوئیت معمولی</h3>
          <div class="flex gap-2 mb-2">
            <span class="text-gray-600">قیمت هر سوئیت:</span>
            <span class="text-red-500 font-bold">۴۸,۴۰۰,۰۰۰ ریال</span>
          </div>
          <div class="flex gap-2 mb-4">
            <span class="text-gray-600">قیمت هر نفر اضافی:</span>
            <span class="font-semibold">۱۱,۰۰۰,۰۰۰ ریال</span>
          </div>
          <div class="grid grid-cols-3 gap-2 mb-4">
            <label class="flex items-center">
              <span class="mr-2">اتاق</span>
              <q-select dense filled v-model="rooms" :options="['۱', '۲', '۳']" class="w-full" />
            </label>
            <label class="flex items-center">
              <span class="mr-2">نفر اضافه</span>
              <q-select dense filled v-model="extraPerson" :options="['۰', '۱', '۲', '۳']" class="w-full" />
            </label>
            <label class="flex items-center">
              <span class="mr-2">کودک</span>
              <q-select dense filled v-model="children" :options="['۰', '۱', '۲', '۳']" class="w-full" />
            </label>
          </div>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-1">
              <q-checkbox v-model="breakfast" size="sm"/>
              <span>صبحانه</span>
            </label>
            <label class="flex items-center gap-1">
              <q-checkbox v-model="lunch" size="sm"/>
              <span>نهار</span>
            </label>
            <label class="flex items-center gap-1">
              <q-checkbox v-model="dinner" size="sm" />
              <span>شام</span>
            </label>
          </div>
        </div>
        <div class="flex-shrink-0 w-full md:w-1/3">
          <img src="https://via.placeholder.com/150" alt="Room Image" class="rounded-lg w-full h-36 object-cover" />
          <q-btn label="امکانات اتاق" class="w-full mt-2 text-center" color="accent"
          @click="roomFacilitiesDialog = true"/>
        </div>
      </div>
    </div>
    <!-- Left Box (Price Summary and Booking Button) -->
    <div class="w-full md:w-1/4 bg-gray-800 overflow-y-scroll md:overflow-y-visible	text-white p-4 rounded-lg md:sticky top-4"
    :class="{ 'fixed bottom-0 top-auto h-2/5 left-0 w-full': isMobile }" >
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>هزینه اتاق‌ها:</span>
          <span class="text-green-400 font-bold">۴۵,۲۱۰,۰۰۰ ریال</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد اتاق‌ها:</span>
          <span class="font-semibold">۱</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد نفر اضافی:</span>
          <span class="font-semibold">۰</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد نفرات:</span>
          <span class="font-semibold">۴ نفر</span>
        </div>
        <div class="flex justify-between">
          <span>تعداد کودک:</span>
          <span class="font-semibold">۰ نفر</span>
        </div>
        <div class="flex justify-between">
          <span>تاریخ ورود:</span>
          <span class="font-semibold">۱۴۰۳/۰۸/۲۳</span>
        </div>
        <div class="flex justify-between">
          <span>مدت اقامت:</span>
          <span class="font-semibold">شب</span>
        </div>
        <div class="flex justify-between">
          <span>تخفیف:</span>
          <span class="font-semibold">۰ ریال</span>
        </div>
        <div class="flex justify-between font-bold">
          <span>جمع کل:</span>
          <span class="text-red-400">۴۵,۲۱۰,۰۰۰ ریال</span>
        </div>
      </div>
      <q-btn label="مرحله بعد ( ادامه رزرو )" color="green"
       class="w-full mt-4 text-center text-white font-semibold sticky" @click="this.$emit('next-step')" />
    </div>
  </div>
  <q-dialog v-model="roomFacilitiesDialog">
    <q-card header="امکانات اتاق" style="min-width: 40%" class="border-radius">

          <q-card-section>
            <div class="grid gap-x-8 gap-y-4 grid-cols-3 ">
            <div >01</div>
            <div>02</div>
            <div>03</div>
            <div>04</div>
            <div>05</div>
            <div>06</div>
          </div>
    <div>lorem ipsummmm</div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn label="قوانین هتل" @click="this.$router.push('/about')" color="secondary"
            class="q-px-md"/>
          </q-card-actions>
      </q-card>
  </q-dialog>
</div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
 name: 'StepOne',
 setup() {
  const isMobile = computed(() => window.innerWidth < 768);
    const rooms = ref('1');
    const extraPerson = ref('0');
    const children = ref('0');
    const breakfast = ref(false);
    const lunch = ref(false);
    const dinner = ref(false);
    const fromDate = ref(null);
    const toDate = ref(null);
    const selectedRooms = ref([]);
    const totalPrice = ref(0);

    const updateDate = () => {
      // Update date logic here
    };

    const selectRoom = (room) => {
      selectedRooms.value.push(room);
      totalPrice.value += room.price;
    };


    return {
       fromDate, toDate, rooms, selectedRooms, totalPrice, updateDate, selectRoom,
       isMobile,
      extraPerson,
      children,
      breakfast,
      lunch,
      dinner,
      roomFacilitiesDialog: ref(false)
    };
 },

 watch: {
    startDate(val) {
      // Update endDate based on the selected duration
      if (this.duration) {
        this.calculateEndDate();
      }
    },
    duration() {
      // Calculate endDate whenever the duration changes
      this.calculateEndDate();
    },
  },
  methods: {
    calculateEndDate() {
      const start = new Date(this.startDate.replace(/-/g, '/'));
      start.setDate(start.getDate() + parseInt(this.duration));
      this.endDate = start.toISOString().slice(0, 10).replace(/-/g, '/');
    },
  },
});
</script>
<style scoped>
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

</style>
