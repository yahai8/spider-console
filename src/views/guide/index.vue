<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item>
        <el-tag type="success" style="width: 400px;text-align: center;">默认只爬取说说及一级评论</el-tag>
      </el-form-item>

      <el-form-item label="选择爬取内容" prop="type">
        <el-checkbox v-model="ruleForm.checkAll" :indeterminate="ruleForm.isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="ruleForm.typeList" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in ruleForm.cities" :key="city" :label="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="驱动地址" prop="driverPath">
        <el-input v-model="ruleForm.driverPath" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  .demo-ruleForm input{
    width: 400px;
  }
  .demo-ruleForm{
    margin-top: 100px;
    margin-left: 500px;
  }
</style>
<script>

import Vue from 'vue'
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'
import { spiderRun } from '@/router/api/api.js'
// Vue.prototype.$api = api; // 将api挂载到vue的原型上
const cityOptions = ['说说', '评论', '留言', '相册']
export default {

  name: 'Guide',
  data() {
    var checkusername = (rule, value, callback) => {
      if (value == null || value == '') {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkDriverPath = (rule, value, callback) => {
      if (value == null || value == '') {
        return callback(new Error('驱动地址必须填写'))
      } else {
        callback()
      }
    }
    return {
      driver: null,
      ruleForm: {
        pass: '',
        checkPass: '',
        username: '114161171',
        driverPath: '',
        checkAll: false,
        typeList: ['说说', '评论'],
        cities: cityOptions,
        isIndeterminate: true
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkusername, trigger: 'blur' }
        ],
        driverPath: [
          { validator: checkDriverPath, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          spiderRun(this.ruleForm).then(res => {
            if (res.code == '200') {
              this.$router.push({ name: 'Documentation' })
            } else {
              this.$message.success(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCheckAllChange(val) {
      this.ruleForm.typeList = val ? cityOptions : []
      this.ruleForm.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.ruleForm.checkAll = checkedCount === this.ruleForm.cities.length
      this.ruleForm.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleForm.cities.length
    }
  }
}
</script>
