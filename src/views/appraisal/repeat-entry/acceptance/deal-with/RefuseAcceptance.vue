<!-- 不予受理 -->
<template>
  <div class="refuse_acceptance">
    <table>
      <tr>
        <td class="header center" colspan="4">不予受理通知书</td>
      </tr>
      <tr>
        <td colspan="4">事项名称：{{ data.itemName }}</td>
      </tr>
      <tr>
        <td>申请人</td>
        <td>{{ data.applicantName }}</td>
        <td>联系电话</td>
        <td>{{ data.telNo }}</td>
      </tr>
      <tr>
        <td colspan="4">
          <div>
            <el-form
                ref="form"
                :model="data"
                :rules="rules"
                label-position="left"
                label-width="40px"
            >
              <p>经审查，你（单位）提交的{{ data.itemName }}申请事项，由于以下第
                <el-form-item class="reason" label-width="0" prop="situation">
                  <el-input v-model="data.situation" size="mini"></el-input>
                </el-form-item>
                种情况：
              </p>
              <p>1、根据法律法规和“三定”方案，不属于我局职责范围。</p>
              <p>2、根据国务院有关文件，我局已经下放或取消该项行政许可。</p>
              <p>3、根据我局行政审批指南，申报材料中有重要因素缺失或错误。</p>
              <p>4、其他原因。</p>
              <el-form-item label="备注" prop="remark">
                <el-input
                    v-model="data.remark"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
            <p>我局不予受理，特此告知！</p>
            <p>如有疑义，请致电{{ data.appraisalTelNo }}详询。</p>
            <p class="sign">{{ data.appraisalName }}</p>
            <p class="sign">{{ data.gmtCreate }}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        rules: {
          situation: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 5, message: '长度最大 5 个字符', trigger: 'blur'}
          ],
          remark: [
            {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getData() {
        return new Promise((resolve, reject) => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              resolve(this.data);
            } else {
              reject();
            }
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .refuse_acceptance {

    .reason {
      width: 100px;
      display: inline-block;

      /deep/ .el-form-item__content {
        width: 100px;
      }
    }


    table {
      width: 100%;
      padding: 10px;
      border: 1px solid gray;
      border-collapse: collapse;

      td {
        border: 1px solid gray;
        padding: 11px 20px;
        font-size: 12px;

        .sign {
          text-align: right;
        }
      }

      td.center {
        text-align: center;
      }

      td.header {
        font-weight: bold;
        background-color: #F2F2F2;
      }
    }
  }
</style>
