<template>
  <q-card :style="`min-width: ${size};`" class="border-radius">
    <q-card-section v-if="header != null">
      <slot name="header-right">
        <div class="row items-center">
          <div class="col h2">{{ header }}</div>
          <slot name="top"></slot>
          <div class="col text-right" v-if="!disableCloseBtn">
            <custom-btn color="negative" flat icon="close" round v-close-popup/>
          </div>
        </div>
      </slot>
    </q-card-section>
    <slot name="sections">

    </slot>
    <q-card-actions align="center" v-if="!disableActions">
      <slot name="actions">
        <custom-btn
        color="primary"
        class="col-sm-5 col-md-3"
        label="ثبت"
        icon="done"
        @click="$emit('on-submit', this)"/>
        <custom-btn
        color="negative"
        class="col-sm-5 col-md-3"
        label="لغو"
        icon="close"
        v-close-popup/>
      </slot>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  props: ['header', 'size', 'disableActions', 'disableCloseBtn']
}
</script>
