<template>
    <inscription-editor
                      :html="htmlVal">
                    <template v-slot:html="{ html }">
                      <div v-if="typeof getObject(html) === 'string'" v-html="html"></div>
                      <div v-else>
                        <div v-for="item in getObject(html)" :key="item">
                          <q-expansion-item
                            expand-separator
                            group="g1"
                          >
                            <template #header>
                              <q-item-section avatar>
                                <div v-html="item.question"/>
                              </q-item-section>

                              <q-item-section>

                              </q-item-section>
                            </template>
                            <div class="q-pa-md" v-html="item.answer" />
                          </q-expansion-item>
                        </div>
                      </div>
                    </template>
                </inscription-editor>
</template>

<script>
import InscriptionEditor from './DynamicContentTools/Inscription-Editor.vue'
export default {
  props: {
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
