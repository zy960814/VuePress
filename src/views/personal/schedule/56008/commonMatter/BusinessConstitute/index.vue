<template>
  <apply-form-item data="考古发掘项目负责人、主要业务人员构成">
    <el-form
      ref="form"
      :rules="rules[ruleKey]"
      :model="form"
      label-position="left"
      label-width="130px"
      validate-on-rule-blur
    >
      <el-row>
        <el-col :span="11">
          <el-form-item label="项目负责人姓名" prop="chargeName" class="redStar">
            <el-input v-model="form.chargeName" placeholder disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="编号" prop="num" class="redStar">
            <el-input v-model="form.num" placeholder disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="性别" prop="sex" class="redStar">
            <el-input v-model="form.sex" placeholder disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-form-item label="出生年月" prop="birthday" class="redStar">
            <el-input v-model="form.birthday" placeholder disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="专业职称" prop="professionalTitle" class="redStar">
            <el-input v-model="form.professionalTitle" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="学术专长" prop="learningExpertise" class="redStar">
            <el-input v-model="form.learningExpertise" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="联系方式" prop="telNo" class="redStar">
            <el-input v-model="form.telNo" placeholder="请填写经办人的联系电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="相关领域的学术成果和业务经历" prop="resultExperience" class="redStar normal">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="描述不超过2000个汉字"
              v-model="form.resultExperience"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="主要业务人员清单"
            prop="businessList"
            class="redStar"
            style="margin-bottom:0px;"
          >
            <div style="padding: 0 0px">
              <el-table ref="table" :data="tableData" border>
                <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="birthday" label="出生年月"></el-table-column>
                <el-table-column prop="majorTitle" label="专业职称"></el-table-column>
              </el-table>
              <el-pagination
                :current-page="queryParams.pagination.currentPage"
                :page-sizes="[10, 20, 30, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
              ></el-pagination>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import { checkMobileSave, checkMobileSubmit } from '@/utils/validator'
export default {
  name: 'ApplyMaterial',
  components: {
    ApplyFormItem
  },

  data() {
    return {
      // 携运人信息
      form: {
        chargeName: '李四',
        num: '12346',
        sex: '男',
        birthday: '1986年5月5日',
        professionalTitle: '',
        learningExpertise: '',
        telNo: '',
        resultExperience: '',
        businessList: ''
      },
      totalCount: 0,
      queryParams: {
        pagination: {
          currentPage: 1,
          pageSize: 5
        },
        keyword: ''
      },
      tableData: [
        {
          index: 1,
          name: '李四',
          sex: '男',
          birthday: '1986年5月5日',
          majorTitle: '工程师'
        },
        {
          index: 1,
          name: '李四',
          sex: '男',
          birthday: '1986年5月5日',
          majorTitle: '工程师'
        },
        {
          index: 1,
          name: '李四',
          sex: '男',
          birthday: '1986年5月5日',
          majorTitle: '工程师'
        },
        {
          index: 1,
          name: '李四',
          sex: '男',
          birthday: '1986年5月5日',
          majorTitle: '工程师'
        },
        {
          index: 1,
          name: '李四',
          sex: '男',
          birthday: '1986年5月5日',
          majorTitle: '工程师'
        }
      ],
      // 表单校验规则的选用方案
      ruleKey: 'default',
      // 三套表单校验规则
      rules: {
        default: {},
        save: {
          chargeName: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          num: [{ max: 200, message: '长度最大 200 个字符', trigger: 'blur' }],
          sex: [{ max: 200, message: '长度最大 200 个字符', trigger: 'blur' }],
          birthday: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          professionalTitle: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          learningExpertise: [
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          telNo: [{ validator: checkMobileSave, trigger: 'blur' }],
          resultExperience: [
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          businessList: []
        },
        submit: {
          chargeName: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          num: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          professionalTitle: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          learningExpertise: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 200, message: '长度最大 200 个字符', trigger: 'blur' }
          ],
          telNo: [
            { required: true, message: ' ', trigger: 'blur' },
            { validator: checkMobileSubmit, trigger: 'blur' }
          ],
          resultExperience: [
            { required: true, message: ' ', trigger: 'blur' },
            { max: 2000, message: '长度最大 2000 个字符', trigger: 'blur' }
          ],
          businessList: []
        }
      }
    }
  },
  mounted() {},
  computed: {},

  methods: {
    /**
     * 表单校验并获取数据, 提供给父组件使用
     * @param type: [save, submit]
     */
    getFormData(type) {
      this.$refs['form'].clearValidate()
      this.ruleKey = type
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              resolve({ ...this.form })
            } else {
              reject()
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cr-info {
  .row_1 {
    margin-bottom: 6px;
  }
}
</style>
