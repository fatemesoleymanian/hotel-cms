import { boot } from 'quasar/wrappers'
import CustomField from '../components/Custom-Field.vue'
import CustomBtn from '../components/Custom-Btn.vue'
import CardPanel from '../components/Card-Panel.vue'
import CustomInput from '../components/Custom-Input.vue'
import CustomSelect from '../components/Custom-Select.vue'
import CustomTimePicker from '../components/Custom-Time-Picker.vue'
import CustomEditor from '../components/Custom-Editor.vue'
import PasswordInput from '../components/Password-Input.vue'
import CustomImg from '../components/Custom-Img.vue'

export default boot(async ({ app }) => {
  app.component('custom-field', CustomField)
  app.component('custom-btn', CustomBtn)
  app.component('card-panel', CardPanel)
  app.component('custom-input', CustomInput)
  app.component('custom-select', CustomSelect)
  app.component('custom-time-picker', CustomTimePicker)
  app.component('custom-editor', CustomEditor)
  app.component('password-input', PasswordInput)
  app.component('custom-img', CustomImg)
})
