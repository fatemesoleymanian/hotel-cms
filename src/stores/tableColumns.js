export const usersColumns = [
  {
    label: 'نام و نام خانوادگی',
    name: 'first_last_name',
    field: 'first_last_name',
    align: 'center',
    sortable: true,
    searchable: true
  },
  {
    label: 'نام کاربری',
    name: 'username',
    field: 'username',
    align: 'center',
    sortable: true,
    searchable: true
  },
  {
    label: 'شماره تلفن',
    name: 'phone_number',
    field: 'phone_number',
    align: 'center',
    sortable: true,
    searchable: true
  },
  {
    label: 'کد ملی',
    name: 'national_code',
    field: 'national_code',
    align: 'center',
    sortable: true,
    searchable: true
  },

  {
    label: 'تنظیمات',
    name: 'settings',
    field: 'settings',
    align: 'center',
    sortable: false
  }
]

export const projectsColumns = [
  {
    label: 'نام',
    name: 'title',
    field: 'title',
    align: 'left'
  },
  {
    label: 'معرفی',
    name: 'settings',
    field: 'settings',
    align: 'center'
  },
  {
    label: 'عکس ها',
    name: 'images',
    field: 'images',
    align: 'center'
  },
  {
    label: 'فیلم ها',
    name: 'videos',
    field: 'videos',
    align: 'center'
  },
  {
    label: 'لوکیشن',
    name: 'location',
    field: 'location',
    align: 'center'
  },
  {
    label: 'واحد ها',
    name: 'units',
    field: 'units',
    align: 'center'
  },
  {
    label: 'کدال',
    name: 'codal',
    field: 'codal',
    align: 'center'
  }
]

export const imagesColumns = [
  {
    name: 'title',
    field: 'title',
    label: 'عنوان',
    align: 'left'
  },
  {
    name: 'urls',
    field: 'urls',
    label: 'تعداد عکس ها',
    align: 'center'
  },
  {
    name: 'created_at',
    field: 'created_at',
    label: 'تاریخ ایجاد',
    align: 'center'
  },
  {
    name: 'edit',
    field: 'edit',
    label: 'اضافه کردن عکس',
    align: 'center'
  }
]

export const codalColumns = [
  {
    name: 'title',
    field: 'title',
    label: 'عنوان',
    align: 'left'
  },
  {
    name: 'reports',
    field: 'reports',
    label: 'گزارشات',
    align: 'center'
  },
  {
    name: 'imageUrls',
    field: 'imageUrls',
    label: 'تعداد عکس ها',
    align: 'center'
  },
  {
    name: 'videoUrls',
    field: 'videoUrls',
    label: 'تعداد فیلم ها',
    align: 'center'
  },
  {
    name: 'progress',
    field: 'progress',
    label: 'درصد پیشرفت',
    align: 'center'
  },
  {
    name: 'created_at',
    field: 'created_at',
    label: 'تاریخ ایجاد',
    align: 'center'
  }
]

export const videosColumns = [
  {
    name: 'title',
    field: 'title',
    label: 'عنوان',
    align: 'left'
  },
  {
    name: 'urls',
    field: 'urls',
    label: 'تعداد ویدیو ها',
    align: 'center'
  },
  {
    name: 'created_at',
    field: 'created_at',
    label: 'تاریخ ایجاد',
    align: 'center'
  }
]

export const unitsColumns = [
  {
    name: 'unitNumber',
    field: 'unitNumber',
    label: 'واحد',
    align: 'center'
  },
  {
    name: 'area',
    field: 'area',
    label: 'مساحت',
    align: 'center'
  },
  {
    name: 'last_price',
    field: 'last_price',
    align: 'center',
    label: 'آخرین قیمت'
  }
]

export const buildingShoppingColumns = [
  {
    name: 'title',
    field: 'title',
    label: 'نام',
    align: 'center'
  },
  {
    name: 'url',
    field: 'url',
    label: 'آدرس',
    align: 'center'
  },
  {
    name: 'description',
    field: 'description',
    align: 'center',
    label: 'توضیحات'
  }
]

export const installmentColumns = [
  {
    name: 'installment_amount',
    field: 'installment_amount',
    align: 'center',
    label: 'مبلغ قسط',
    sortable: true
  },
  {
    name: 'status_description',
    field: 'status_description',
    align: 'center',
    label: 'وضعیت پرداخت',
    sortable: true,
    searchable: true
  },
  {
    name: 'due_date',
    field: 'due_date',
    align: 'center',
    label: 'تاریخ سررسید',
    sortable: true
  }
]

export const takenUnitsList = [
  {
    name: 'first_last_name',
    field: 'first_last_name',
    align: 'center',
    label: 'نام و نام‌خانوادگی خریدار',
    sortable: true,
    searchable: true
  },
  {
    name: 'project_title',
    field: 'project_title',
    align: 'center',
    label: 'نام پروژه',
    sortable: true,
    searchable: true
  },
  {
    name: 'area',
    field: 'area',
    align: 'center',
    label: 'مساحت',
    sortable: true
  },
  {
    name: 'last_price',
    field: 'last_price',
    align: 'center',
    label: 'آخرین قیمت'
  },
  {
    name: 'status_title',
    field: 'status_title',
    align: 'center',
    label: 'وضعیت',
    sortable: true,
    searchable: true
  },
  {
    name: 'created_at',
    field: 'created_at',
    align: 'center',
    label: 'تاریخ قول‌نامه',
    sortable: true
  },
  {
    name: 'action',
    field: 'action',
    align: 'center',
    label: 'صلاحیت',
    sortable: true
  }
]

export const contractManagementColumns = [
  {
    name: 'project_title',
    field: 'project_title',
    align: 'center',
    label: 'نام پروژه',
    sortable: true,
    searchable: true
  },
  {
    name: 'status_title',
    field: 'status_title',
    align: 'center',
    label: 'وضعیت',
    sortable: true,
    searchable: true
  },
  {
    name: 'area',
    field: 'area',
    align: 'center',
    label: 'مساحت',
    sortable: true
  },
  {
    name: 'last_price',
    field: 'last_price',
    align: 'center',
    label: 'آخرین قیمت',
    sortable: true
  },
  {
    name: 'created_at',
    field: 'created_at',
    align: 'center',
    label: 'تاریخ درخواست',
    sortable: true
  },
  {
    name: 'status_action',
    field: 'status_action',
    align: 'center',
    label: 'مشخص کردن وضعیت'
  }
]
