<template>
  <q-field filled stack-label>
      <template v-slot:before>
        <slot name="before">

        </slot>
      </template>
      <template v-slot:control>
        <slot name="control">
          <div>{{ control }}</div>
        </slot>
      </template>
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
      <template v-slot:hint>
        <slot name="hint">

        </slot>
      </template>
      <template v-slot:after>
        <slot name="after">

        </slot>
      </template>
  </q-field>
</template>
<script>
export default {
  props: ['control', 'append', 'prepend']
}
</script>
