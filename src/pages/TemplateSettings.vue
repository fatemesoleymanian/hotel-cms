<template>
  <div>
    <div class="row">
      <div class="col-6">رنگ primary :</div>
      <div class="col-6">
         <q-color v-model="hex" class="my-picker" @update:model-value="onChangeColors($event,'primary')"/>
      </div>
    </div>
<!-- pallette
font-family
hotel name
logo
title of each page
telephone reservasion
addres
fax
email
instagram
 -->
</div>
</template>
<script>
import { updateThemeColor } from 'src/stores/settings';

export default{
  methods:{
onChangeColors(color,variable){
  updateThemeColor(variable,color)
}
  }
}
</script>
