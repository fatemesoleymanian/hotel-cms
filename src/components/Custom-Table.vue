<!-- eslint-disable vue/valid-v-slot -->
<template>
      <q-table
         class="border-radius"
        flat bordered
        :rows="rows"
        :columns="columns"
        v-model:pagination="paginationVal"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRequest"
        separator="cell"
      >
        <template v-slot:top>
            <div class="h1 text-bold q-mr-sm">{{ title }}</div>
            <slot name="top"></slot>
        </template>
        <template v-slot:top-right>
          <slot name="top-right"></slot>
        </template>
        <template v-for="col in columns" :key="col" v-slot:[`body-cell-${col.name}`]="props">
            <slot :props="props" :name="`body-cell-${col.name}`">
                <q-td :props="props">
                    <div>{{ props.row[col.name] }}</div>
                </q-td>
            </slot>
        </template>
        <template v-for="col in columns" :key="col" v-slot:[`header-cell-${col.name}`]="props">
            <slot :props="props" :name="`header-cell-${col.name}`">
                <q-th :props="props">
                    <div>{{ col.label }}</div>
                    <custom-input
                    v-if="col.searchable"
                    dense
                    v-model="col.search"
                    @update:model-value="if (col.search.length === 0) { onRequest({ pagination: paginationVal }) };"
                    @keydown.enter="onRequest({ pagination: paginationVal })">
                      <template #append>
                        <q-icon name="search"/>
                      </template>
                    </custom-input>
                </q-th>
            </slot>
        </template>

        <template v-slot:item="props">
          <slot :props="props" name="item"></slot>
        </template>
      </q-table>
  </template>

<script>
import { ref } from 'vue'

export default {
  props: {
    requestApi: {
      type: Object
    },
    columns: {
      type: Object
    },
    title: {
      type: String
    }
  },
  setup () {
    const rows = ref([])
    const filter = ref('')
    const loading = ref(false)
    const paginationVal = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })
    return {
      filter,
      loading,
      paginationVal,
      rows
    }
  },

  data () {
    this.onRequest({ pagination: this.paginationVal })
  },

  methods: {
    async onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      this.loading = true
      const res = await this.requestApi.api.request(this.requestApi.config,
        this.requestApi.data,
        `${this.requestApi.condition || ''}&limit=${rowsPerPage}&offset=${(page - 1) * rowsPerPage}&${sortBy != null ? `order=${sortBy}.${descending ? 'desc' : 'asc'}` : ''}${this.getSearchFieldFilter()}`,
        this.requestApi.header || { Prefer: 'count=exact' })
      this.rows = res.data
      this.paginationVal = props.pagination
      this.paginationVal.rowsNumber = parseInt(res.headers['content-range'].split('/')[1])
      this.loading = false
    },

    getSearchFieldFilter () {
      if (!Array.isArray(this.columns)) return
      let searches = '&'
      console.log(this.columns)
      for (const col of this.columns) {
        if (col.search == null || col.search.length === 0) continue
        searches += `${col.name}=match.${col.search}&`
      }
      return searches
    },

    getVariableType (variable) {
      return typeof variable
    }
  }
}
</script>
