<template>
  <div :class="inscriptionClass">
      <q-spinner
          color="primary"
          size="3em"
          v-if="htmlVal == null"
      />
        <slot v-else name="html" :html="htmlVal">
          <div v-html="htmlVal"></div>
        </slot>
        <slot name="medias" :medias="media">

        </slot>
      <div>
          <custom-btn
          @click="dialog = true"
          flat
          v-if="editMode"
          :color="buttonColor"
          padding="5px"
          icon="edit" />
      </div>
  </div>

  <q-dialog v-model="dialog">
      <card-panel
      @on-submit="setInscription"
      size="100%"
      header="ویرایش">
          <template #sections>
              <q-card-section>
                <custom-editor v-model="htmlEditor"/>
              </q-card-section>
              <q-card-section v-if="enableUpload ">
                <div class="col-12 q-mb-md">آپلود فایل</div>
                <div class="col-12 q-mb-md">
                  <custom-btn icon="add" @click="media.push({})"/>
                </div>
                <div class="row q-mb-xl" v-for="(item, index) in media" :key="item">
                  <div class="col-12 q-my-md">
                    <custom-btn color="negative" icon="delete" @click="media.splice(index, 1)"/>
                  </div>
                  <q-uploader
                  @added="item.file = $event"
                  class="col-12 col-sm-6 q-pa-sm"
                  label="عکس"
                  accept=".jpg, .png, image/*"
                  />
                  <div class="col-12 col-sm-6 q-pa-sm">
                    <custom-editor label="تایتل" class="col-12" v-model="item.description"/>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <q-toggle v-model="history" class="h3" label="تاریخچه"/>
                <custom-table
                v-if="history"
                :columns="inscriptionLogsColumns"
                :request-api="{
                  api: pageInscriptionLogApi,
                  config: 'get',
                  condition: `key=eq.${keyVal}`
                }">
                  <template v-slot:body-cell-content="{ props }">
                    <q-td :props="props">
                        <div v-html="props.row.content"/>
                    </q-td>
                  </template>
                  <template v-slot:body-cell-created_at="{ props }">
                    <q-td :props="props">
                        <div>{{ persianDate.getPersianLongDateTime(props.row.created_at) }}</div>
                    </q-td>
                  </template>
                  <template v-slot:body-cell-paste="{ props }">
                    <q-td :props="props">
                        <custom-btn icon="content_paste_go" color="primary" @click="htmlEditor = props.row.content"/>
                    </q-td>
                  </template>
                </custom-table>
              </q-card-section>
          </template>
      </card-panel>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import CustomEditor from '../Custom-Editor.vue'
import { pageInscriptionApi, pageInscriptionLogApi } from 'stores/api'
import { persianDate } from 'stores/dateOperations'
import { editModeStorage } from 'stores/localStorageVariables'
import { uploadImage } from 'src/stores/uploadApi'
const inscriptionLogsColumns = [
{
  name: 'content',
  field: 'content',
  label: 'متن',
  align: 'left',
  sortable: false
},
{
  name: 'created_at',
  field: 'created_at',
  label: 'تاریخ ایجاد',
  align: 'center',
  sortable: true
},
{
  name: 'paste',
  field: 'paste',
  label: 'الصاق',
  align: 'center',
  sortable: true
}
]

export default {
props: {
  html: {
    type: String,
    required: true
  },
  keyVal: {
    type: String,
    required: true
  },
  inscriptionClass: {
    type: String
  },
  buttonColor: {
    default: 'black'
  },
  enableUpload: {

  }
},
setup () {
  const dialog = ref(false)
  return {
    dialog,
    htmlVal: ref(null),
    htmlEditor: ref(null),
    pageInscriptionLogApi,
    inscriptionLogsColumns,
    persianDate,
    editMode: true,
    history: ref(false),
    media: ref([])
  }
},

async data () {
  this.htmlVal = this.html
  await this.getInscription()
},

methods: {
  async getInscription () {
    const res = await pageInscriptionApi.request('get', null, `key=eq.${this.keyVal}`)
    if (res.status >= 400 || res.data[0] == null) {
      this.htmlEditor = this.htmlVal = this.html
      return
    }
    this.htmlEditor = this.htmlVal = res.data[0].content
    this.media = res.data[0].metadata || []
  },

  async setInscription () {
    let value = {
      content: this.htmlEditor,
      key: this.keyVal
    }
    value = await this.upload(value)
    const res = await pageInscriptionApi.request('put', value,
      `key=eq.${this.keyVal}`,
      {
        Prefer: 'return=representation'
      })
    if (res.status >= 400) return
    if (res.data[0] == null) return
    this.htmlEditor = this.htmlVal = res.data[0].content
    this.media = res.data[0].metadata
    this.dialog = false
  },

  async upload (value) {
    if (this.media == null || this.media.length === 0) return value
    const uploadRes = (await uploadImage.request('create', this.media.map(item => item.file != null ? item.file[0] : null))).data
    let uploadIndex = 0
    this.media.forEach(item => {
      if (item.file != null) {
        item.url = uploadRes[uploadIndex]
        uploadIndex++
      }
      delete item.file
      item.type = 'image'
    })
    value = {
      ...value,
      metadata: this.media
    }
    return value
  }
},

components: {
  CustomEditor
}
}
</script>
<style scoped>
.button-edit-pos {
  position: relative;
   bottom: 0;
   right: 0;
}
</style>
