<template>
  <apply-form-item data="预约" class="hxl_item">
    <div style="height: 305px">
      <page-tabs
          :pageTabsData="pageTabsData"
          @handle-select="handleSelect"
          style="margin-bottom: 18px"></page-tabs>
      <el-form
          ref="form"
          :model="form"
          :rules="rules[ruleKey]"
          label-position="left"
          label-width="110px"
      >
        <el-row :gutter="20">
          <template v-if="form.type === '1'">
            <div class="clear-float" style="padding: 0 10px">
              <el-form-item label="预约时间" prop="dealDay" class="redStar fl mr-10">
                <el-date-picker
                    class="yy_time"
                    v-model="form.dealDay"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label-width="0" prop="dealTime" class="fl">
                <el-select v-model="form.dealTime" placeholder="时间">
                  <el-option label="上午工作时间" value="上午工作时间"></el-option>
                  <el-option label="下午工作时间" value="下午工作时间"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div style="display: flex; justify-content: left; padding: 0 10px">
              <el-form-item label="办理地点" class="redStar bl_place">
                <el-radio v-model="form.position" label="窗口办理">窗口办理</el-radio>
                <el-radio v-model="form.position" label="上门办理">上门办理</el-radio>
              </el-form-item>
              <el-form-item label-width="0" prop="adress" class="detail_addr">
                <el-input v-model="form.adress" placeholder="具体地址"></el-input>
              </el-form-item>
            </div>
          </template>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 9px">
              <common-language @language="language"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="办理意见" prop="remark" class="redStar">
              <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.remark"
                  placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </apply-form-item>
</template>

<script>
  import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
  import PageTabs from '@/components/commons/PageTabs'
  import CommonLanguage from '@/components/commons/CommonLanguage'

  export default {
    components: {
      ApplyFormItem,
      PageTabs,
      CommonLanguage
    },
    props: {
      itemId: String
    },
    data() {
      return {
        // 切换按钮数据
        pageTabsData: {
          tabs: [{
            title: '接受预约',
            num: ''
          }, {
            title: '拒绝预约',
            num: ''
          }]
        },
        form: {
          id: null,
          itemId: '',
          type: '1',
          dealDay: '',
          dealTime: '',
          position: '窗口办理',
          adress: '',
          remark: ''
        },
        ruleKey: 'default',
        rules: {
          default: {},
          accept: {
            dealDay: [
              {required: true, message: ' ', trigger: 'blur'}
            ],
            dealTime: [
              {required: true, message: ' ', trigger: 'blur'}
            ],
            adress: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
            ],
            remark: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
            ]
          },
          refuse: {
            remark: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
            ]
          }
        }
      }
    },
    methods: {
      // 接受预约、拒绝预约 TAB 切换
      handleSelect(tabIndex) {
        this.form.type = tabIndex;
        if (tabIndex === '2') {  // 拒绝预约
          this.form.dealDay = '';
          this.form.dealTime = '';
          this.form.adress = '';
        }
      },
      // 常用语下拉框
      language(value) {
        this.form.remark += value;
      },
      getData() {
        this.$refs['form'].clearValidate();
        this.ruleKey = this.form.type === '1' ? 'accept' : 'refuse';
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.$refs['form'].validate(valid => {
              if (valid) {
                this.form.itemId = this.itemId;
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
  .yy_time.el-date-editor.el-input,
  /deep/ .yy_time.el-date-editor.el-input__inner {
    width: 277px;
  }

  .bl_place .el-radio {
    width: 123px;
  }

  .detail_addr {
    flex: 1;
    margin-left: 11px;
  }
</style>
