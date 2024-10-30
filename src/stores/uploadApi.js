import { api } from 'src/boot/axios'
import { token } from './localStorageVariables'

class UploadApiElements {
  constructor (urlConfigs) {
    this.urlConfigs = urlConfigs
  }

  async request (configKey, data, conditions = '', filename) {
    const t = token.getValue
    let fileName = null
    if (filename != null) {
      const split = filename.split('/')
      fileName = split[split.length - 1]
    } else { fileName = null }
    const res = await api({
      method: this.urlConfigs[configKey].method,
      url: `${this.urlConfigs[configKey].url}?${conditions}`,
      data: {
        [this.urlConfigs[configKey].fileKey || 'files']: data,
        filename: fileName,
        api_port: 8056,
        s3_resource: 'chamanara',
        bucket_name: 'images',
        ...this.urlConfigs[configKey].data
      },
      headers: {
        Authorization: 'Bearer ' + t,
        'Content-Type': 'multipart/form-data'
      }
    })
    return res
  }
}

export const uploadImage = new UploadApiElements({
  create: {
    method: 'post',
    url: 'https://upload.dariamelk.com/upload_files'
  }
})

export const uploadVideo = new UploadApiElements({
  create: {
    method: 'post',
    url: 'https://upload.dariamelk.com/upload_files',
    data: 'mp4'
  }
})

export const uploadSingleImage = new UploadApiElements({
  create: {
    method: 'post',
    url: 'https://upload.dariamelk.com/upload_file',
    fileKey: 'file'
  }
})
