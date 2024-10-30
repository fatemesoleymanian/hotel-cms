<template>
  <q-input filled>
    <template v-slot:append>
      <slot name="append">
        <div>{{ append }}</div>
      </slot>
    </template>
    <template v-slot:prepend>
      <slot name="prepend">
        <div>{{ prepend }}</div>
      </slot>
    </template>
  </q-input>
</template>
<script>
export default {
  props: ['append', 'prepend']
}
</script>
