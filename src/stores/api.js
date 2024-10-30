import { api } from 'boot/axios.js'

class ApiElements {
  constructor (urlConfigs) {
    this.urlConfigs = urlConfigs
  }

  async request (configKey, data, conditions = '', headers) {
    const res = await api({
      url: `${this.urlConfigs[configKey].url}?${conditions}`,
      method: this.urlConfigs[configKey].method,
      data,
      headers
    })
    return res
  }
}

export const unitsApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'units'
    },
    create: {
      method: 'post',
      url: 'units'
    },
    update: {
      method: 'patch',
      url: 'units'
    }
  }
)

export const unitPricesApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'unit_prices'
    },
    create: {
      method: 'post',
      url: 'unit_prices'
    }
  }
)

export const projectApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'projects'
    },
    getDetails: {
      method: 'get',
      url: 'project_details'
    },
    create: {
      method: 'post',
      url: 'projects'
    },
    update: {
      method: 'patch',
      url: 'projects'
    },
    getList: {
      method: 'get',
      url: 'projects_list'
    },
    delete: {
      method: 'delete',
      url: 'projects'
    }
  }
)

export const installmentsApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'installments_list'
    },
    create: {
      method: 'post',
      url: 'installments'
    }
  }
)

export const installmentSettingsApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'installment_settings'
    },
    set: {
      method: 'post',
      url: 'installment_settings'
    },
    update: {
      method: 'patch',
      url: 'installment_settings'
    }
  }
)

export const takenUnitsApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'taken_units'
    },
    getList: {
      method: 'get',
      url: 'taken_units_list'
    },
    create: {
      method: 'post',
      url: 'rpc/create_update_taken_units'
    },
    delete: {
      method: 'delete',
      url: 'taken_units'
    },
    update: {
      method: 'patch',
      url: 'taken_units'
    }
  }
)

export const financialsApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'financials'
    },
    create: {
      method: 'post',
      url: 'financials'
    },
    update: {
      method: 'patch',
      url: 'financials'
    }
  }
)

export const projectStatesApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'project_states_list'
    },
    create: {
      method: 'post',
      url: 'project_states'
    }
  }
)

export const notificationsApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'notifications'
    },

    update: {
      method: 'patch',
      url: 'notifications'
    }
  }
)

export const usersApi = new ApiElements({
  get: {
    method: 'get',
    url: 'user_list'
  },

  createUpdate: {
    method: 'post',
    url: 'rpc/register_user'
  }
})

export const userApi = new ApiElements({
  get: {
    method: 'get',
    url: 'rpc/get_user_info'
  },

  createUpdate: {
    method: 'post',
    url: 'rpc/register_user'
  }
})

export const familiarityApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'familiarity'
    },
    create: {
      method: 'post',
      url: 'familiarity'
    },
    update: {
      method: 'patch',
      url: 'familiarity'
    }
  }
)

export const buildingShoppingApi = new ApiElements(
  {
    get: {
      method: 'get',
      url: 'building_shopping'
    },
    create: {
      method: 'post',
      url: 'building_shopping'
    },
    update: {
      method: 'patch',
      url: 'building_shopping'
    },
    delete: {
      method: 'delete',
      url: 'building_shopping'
    }
  }
)

export const shoppingListsApi = new ApiElements({
  get: {
    method: 'get',
    url: 'shopping_lists'
  },

  create: {
    method: 'post',
    url: 'shopping_lists'
  },

  update: {
    method: 'patch',
    url: 'shopping_lists'
  }
})

export const contractManagementApi = new ApiElements({
  get: {
    method: 'get',
    url: 'contract_list'
  },
  update: {
    method: 'patch',
    url: 'taken_units'
  }
})

export async function getPosts (conditions) {
  const response = await api.get(`post_details?${conditions}`)
  return response
}

export async function requestSmsCode (mobileNumber) {
  const response = await api.post('rpc/request_sms_code', {
    mobile_number: '0' + mobileNumber
  })
  console.log(response)
  return response
}

export async function createPorject (body) {
  const response = await api.post('projects', body)
  return response
}

export async function loginBySms (mobileNumber, verifyCode) {
  const response = await api.post('rpc/login_by_sms', {
    mobile_number: '0' + mobileNumber,
    verify_code: verifyCode
  })
  return response
}

export async function registerBySms (username, email, pass) {
  const response = await api.post('rpc/login_by_sms', {
    username,
    email,
    pass
  })
  return response
}

export async function loginByEmail (username, password) {
  const response = await api.post('rpc/login_by_username', {
    username,
    password
  })
  return response
}

export async function getUsers () {
  const response = await api.get('users_info')
  return response
}

export async function getUserInfo (userId) {
  const response = await api.get(`rpc/user_profile?user_id=${userId}`)
  return response
}

export async function registerUser (body) {
  const response = await api.post('rpc/register_user', {
    user: {
      username: body.username,
      password: body.password,
      phone_number: '0' + body.phoneNumber
    }
  }).then(response => response)
    .catch(err => err.response)
  return { ...response, ok: response.status < 400 }
}

export async function setProfile (body) {
  const response = await api.post('rpc/register_by_email', {
    username: body.username,
    pass: body.pass,
    email: body.email
  })
  return response
}

export async function insertProject (body) {
  const response = await api.post('projects', body)
  return response
}

export async function projectList (condition = '') {
  const response = await api.get(`projects?${condition}`)
  return response
}

export const pageInscriptionApi = new ApiElements({
  get: {
    mathod: 'get',
    url: 'pages_inscription'
  },
  put: {
    method: 'put',
    url: 'pages_inscription'
  }
})

export const pageInscriptionLogApi = new ApiElements({
  get: {
    mathod: 'get',
    url: 'pages_inscription_log'
  },
  put: {
    method: 'put',
    url: 'pages_inscription_log'
  }
})

export const scoresApi = new ApiElements({
  get: {
    mathod: 'get',
    url: 'scores'
  }
})
