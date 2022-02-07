
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="id">
          id
        </el-checkbox>
        <el-checkbox label="qq">
          好友QQ
        </el-checkbox>
        <el-checkbox label="createTime">
          入库时间
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
const defaultFormThead = ['name', 'nickname', 'ubbContent', 'pubTime']
import { fetchMsg } from '@/api/msg'
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
          pubTime: 'apple-10',
          nickname: 'banana-10',
          ubbContent: 'orange-10',
          name: '张三',
          qq: '112121',
          createTime: ''
        },
        {
          id: 'fruit-1',
          pubTime: 'apple-10',
          nickname: 'banana-10',
          ubbContent: 'orange-10',
          name: '张三',
          qq: '112121',
          createTime: ''
        }
      ],
      key: 1, // table key
      formTheadOptions: ['id', 'pubTime', 'nickname', 'ubbContent', 'name', 'qq', 'createTime'],
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
      fetchMsg(this.param).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    }
  }
}
</script>

