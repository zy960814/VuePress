<!-- 准予受理 -->
<template>
  <div class="allow_acceptance">
    <table>
      <tr><td class="header center" colspan="6">受理通知书</td></tr>
      <tr><td colspan="6">事项名称：{{ data.itemName }}</td></tr>
      <tr>
        <td>受理时间</td>
        <td>{{ data.noticeTime }}</td>
        <td>受理人</td>
        <td>{{ data.accpetOperator }}</td>
        <td>许可编号</td>
        <td>{{ data.serialNum }}</td>
      </tr>
      <tr>
        <td>申请人</td>
        <td colspan="2">{{ data.applicantName }}</td>
        <td>联系电话</td>
        <td colspan="2">{{ data.telNo }}</td>
      </tr>
      <tr>
        <td colspan="6">
          <div>
            <p>经审查，你（单位）提交的{{ data.itemName }}申请事项的申报材料齐全，符合受理条件，现予受理。此事项法定办结时限为{{ data.workDay }}个工作日（不包括委托评估和专家评审时间）。我局承诺依法在法定办结时限内做出许可或不予许可决定。</p>
            <p>许可决定作出后，我局将通过单证的形式回复，申请人可在办理现场领取。</p>
            <p>提醒：查询办理进度（结果）请登录国家文物局综合行政管理平台（gl.ncha.gov.cn）或致电{{ data.appraisalTelNo }}。此项许可不收取费用。</p>
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
      data: {
        type: Object,
        require: true
      }
    },
    methods: {
      getData() {
        return Promise.resolve(this.data);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .allow_acceptance {

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
