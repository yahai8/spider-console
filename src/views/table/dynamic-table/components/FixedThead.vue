<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="id">
          id
        </el-checkbox>
        <el-checkbox label="friendName">
          好友名称
        </el-checkbox>
        <el-checkbox label="friendQq">
          好友QQ
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page-num.sync="param.pageNum" :page-size.sync="param.limit" @pagination="listArticle" />

  </div>
</template>

<script>
const defaultFormThead = ['id', 'friendName']
import { fetchFriend } from '@/api/friend'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      param: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [
        {
          id: 'fruit-1',
          friendName: 'apple-10',
          friendQq: 'banana-10',
          createTime: 'orange-10'
        },
        {
          id: 'fruit-2',
          friendName: 'apple-20',
          friendQq: 'banana-20',
          createTime: 'orange-20'
        }
      ],
      key: 1, // table key
      formTheadOptions: ['id', 'friendName', 'friendQq'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  mounted() {
    this.listArticle()
  },
  methods: {
    listArticle() {
      fetchFriend(this.param).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    }
  }
}
</script>
