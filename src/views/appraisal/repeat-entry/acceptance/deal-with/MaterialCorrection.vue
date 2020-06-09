<!-- 材料补正 -->
<template>
  <div class="material_correction">
    <table>
      <tr>
        <td class="header center" colspan="4">材料补正一次性告知书</td>
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
            <p>经审查，你（单位）提交的{{ data.itemName }}申请事项，需补交或修改的材料如下：</p>
            <el-form
                ref="form"
                :model="data"
                :rules="rules"
                label-position="left"
                label-width="0">
              <el-form-item prop="remark">
                <el-input
                    v-model="data.remark"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
            <p>请将上述材料尽快补正提交，特此告知！</p>
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
  .material_correction {

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
