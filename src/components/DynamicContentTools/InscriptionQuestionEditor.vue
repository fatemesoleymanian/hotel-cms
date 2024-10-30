<template>
  <div class="q-pa-md">
        <q-list bordered >
          <q-expansion-item
            icon="gavel"
            label="قوانین و مقررات هتل"
          >
            <q-card>
              <q-card-section>
                  <inscription-editor
                        :key-val="keyVal"
                        :inscription-class="`q-mb-sm text-color q-bt-md border-gray-700`"
                        :html="html"/>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          </q-list>
      </div>
</template>

<script>
import InscriptionEditor from './InscriptionEditor.vue';
export default {
props: {
  keyVal:{
    type:String,
    },
  html: {
    type: String,
    required: true
  }
},

methods: {
  getObject (text) {
    console.log(text)
    const seperated = text.split('--')
    const obj = []
    for (let i = 0; i < seperated.length - 1; i += 2) {
      obj.push({
        question: seperated[i],
        answer: seperated[i + 1]
      })
    }
    console.log(obj)
    return obj
  }
},

components: {
  InscriptionEditor
}
}
</script>
