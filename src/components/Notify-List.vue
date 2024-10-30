<template>
  <q-card class="style" >
      <q-card-section>
        <div class="row" style="width: 100%;">
          <div class="row col-12">
            <div class="col-12 col-sm-6 row">
              <q-icon v-if="icon != null" :name="icon" :color="icon_color" size="30px" class="q-mr-sm"/>
              <div class="font-bold h2">{{ title }}</div>
            </div>
            <div class="row text-right col-12 col-sm-6 items-center">
              <div class="font-medium h5 col-11">{{ caption }}</div>
              <div class="col-1">
                <q-btn
                class="style" style="margin: 0!important;"
                icon="refresh"
                size="sm"
                :dense="true"
                flat
                @click="$emit('on-reload')"
                color="primary"/>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-list>
        <q-card-section style="min-height: 212px; width: 100%;">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <q-virtual-scroll v-show="items != null" style="height: 212px; max-width: 100%;" :items="items" v-slot="{ item }">
              <q-item class="border-radius bg-grey-2 q-mb-sm" dense clickable @click="$emit('on-click-item', item)">

                <q-card-section class="">
                  <div class="font-bold h4">{{ item.title }}</div>

                  <div class="font-regular h5">{{ item.body }}</div>
                  <slot :item="item" name="item"></slot>

                </q-card-section>
                <q-item-section side >
                  <slot :header="item" name="header-left"></slot>
                  <!-- <q-icon name="star" color="yellow" />
                  <q-item-label caption>5 min ago</q-item-label> -->
                </q-item-section>
              </q-item>
            </q-virtual-scroll>
          </transition>
          <div class="h4 font-bold absolute-center" v-show="items != null && items.length == 0">{{ noItemCaption }}</div>

        <q-inner-loading :showing="items == null">
          <q-spinner
            :color="icon_color"
            size="5em"
          />
        </q-inner-loading>
      </q-card-section>

    </q-list>
  </q-card>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['title', 'items', 'icon', 'icon_color', 'caption', 'noItemCaption'],
  setup () {
    return {
      newTickets: ref([])
    }
  }
}
</script>
