import { api } from 'src/boot/axios'

class Storage {
  constructor (key) {
    this.key = key
  }

  get getValue () {
    return localStorage.getItem(this.key)
  }

  setValue (value) {
    localStorage.setItem(this.key, value)
  }

  removeValue () {
    localStorage.removeItem(this.key)
  }
}

export const userid = new Storage('userid')
export const userFullName = new Storage('userFullName')
export const token = new Storage('token')
export const role = new Storage('role')
export const editModeStorage = new Storage('editMode')

export function setProfile (res) {
  userid.setValue(res.user_id)
  token.setValue(res.token)
  if (res.metadata != null) {
    userFullName.setValue(`${res.metadata.first_name} ${res.metadata.last_name}`)
  }
  if (res.token != null) {
    api.defaults.headers.common.Authorization = 'Bearer ' + res.token
  }
  if (res.role != null) {
    role.setValue(res.role)
  }
}
