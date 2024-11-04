<template>
  <div class="bg-white q-pa-md q-px-lg rounded-borders">
    <div class="row text-center text-2xl font-bold justify-center py-4">پالت رنگ</div>
    <div class="grid grid-cols-4 gap-4">
      <div class="">
        <q-input
        filled
        v-model="primaryColor"
        :rules="['anyColor']"
        hint="رنگ اصلی"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="primaryColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      </div>
      <div class="">
        <q-input
        filled
        v-model="secondaryColor"
        :rules="['anyColor']"
        hint="رنگ ثانویه"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="secondaryColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      </div>
      <div class="">
        <q-input
        filled
        v-model="accentColor"
        :rules="['anyColor']"
        hint="رنگ تاکیدی"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="accentColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      </div>
      <div class="">
        <q-input
        filled
        v-model="darkColor"
        :rules="['anyColor']"
        hint="رنگ تیره"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="darkColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      </div>
    </div>
<div class="row text-center justify-center py-4">
    <q-btn color="dark" @click="updateColors" label="ثبت تغییرات رنگ ها"/>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#1976d2',
      secondaryColor: '#424242',
      accentColor: '#abdfe9',
      darkColor: '#374151'
    };
  },
  methods: {
    async updateColors() {
      try {
        const response = await fetch('http://localhost:3000/update-colors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor,
            accentColor: this.accentColor,
            darkColor: this.darkColor,
          }),
        });
        if (!response.ok) throw new Error('Failed to update colors');
        console.log('Colors updated and project rebuilt successfully');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
