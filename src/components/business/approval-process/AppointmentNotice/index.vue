<!-- 预约通知书 -->
<template>
  <div class="appointment_notice">
    <table>
      <tr>
        <td class="header center" colspan="6">预约通知书</td>
      </tr>
      <tr>
        <td colspan="4">事项名称：{{ notice.itemName }}</td>
      </tr>
      <tr>
        <td>预约时间</td>
        <td>{{ notice.dealDay }}</td>
        <td>办理人</td>
        <td>{{ notice.operatorName }}</td>
      </tr>
      <tr>
        <td>申请人</td>
        <td>{{ notice.applyAccountName }}</td>
        <td>联系电话</td>
        <td>{{ notice.tel }}</td>
      </tr>
      <tr>
        <td colspan="4">
          <div>
            <p>经审查，你（单位）提交的{{ notice.itemName }}申请事项的申报材料齐全，符合预约条件，请您按照预约时间到指定地点办理。</p>
            <p>办理地点：{{ notice.position }}</p>
            <p>具体地址：{{ notice.adress }}</p>
            <p>提示：{{ notice.remark }}</p>
            <p class="sign">{{ notice.appraisalName }}</p>
            <p class="sign">{{ notice.gmtCreate }}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {getAppointmentNotice} from '@/api/appraisal/temp-entry'

  export default {
    props: {
      itemId: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        notice: {}
      }
    },
    mounted() {
      getAppointmentNotice({itemId: this.itemId}).then(({data}) => this.notice = data);
    }
  }
</script>

<style lang="scss" scoped>
  .appointment_notice {

    table {
      width: 100%;
      padding: 10px;
      border: 1px solid gray;
      border-collapse: collapse;

      td {
        border: 1px solid gray;
        padding: 11px 20px;
        font-size: 12px;

        p {
          text-indent: 2em;
        }

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
