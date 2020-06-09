<template>
  <div class="content">
    <h2>分办人员列表</h2>
    <el-scrollbar :style="{height: (contentHeight - 148) + 'px'}">
      <div style="padding: 0 15px">
        <div style="min-height: 402px">
          <el-table ref="table" :data="tableData" border>
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column prop="userName" label="姓名" min-width="100"></el-table-column>
            <el-table-column prop="profession" label="职称" min-width="200"></el-table-column>
            <el-table-column prop="skill" label="技能和研究领域" min-width="200"></el-table-column>
            <el-table-column prop="appraiser" label="是否是责任鉴定员" min-width="150"></el-table-column>
            <el-table-column prop="task" label="待办任务数" min-width="150"></el-table-column>
          </el-table>
        </div>
        <common-language @language="language" class="clear-float" style="line-height: 32px; margin: 10px 0"/>
        <el-form ref="form" :model="form" label-position="left" label-width="62px">
          <el-form-item label="分办意见" style="margin-bottom: 0">
            <el-input type="textarea" v-model="form.remark" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import CommonLanguage from '@/components/commons/CommonLanguage'
  import {findBranchPerson} from '@/api/appraisal/temp-entry'

  export default {
    components: {
      CommonLanguage
    },
    props: {
      contentHeight: Number
    },
    data() {
      return {
        tableData: [],
        form: {
          remark: ''
        }
      }
    },
    mounted() {
      findBranchPerson().then(({data}) => this.tableData = data);
    },
    methods: {
      // 常用语
      language(value) {
        this.form.remark += value;
      },
      branch() {
        return new Promise((resolve, reject) => {
          const selectedRow = this.$refs.table.selection;
          if (selectedRow.length >= 3) {  // 至少三个分办人员
            const appraiserArr = selectedRow.filter(item => {
              return item.appraiser === '是';
            });
            if (appraiserArr.length >= 2) {  // 至少两个鉴定人员
              const data = selectedRow.map(item => {
                return {
                  id: null,
                  itemId: this.$store.state._20.tempEntryItemId,
                  userId: item.userId,
                  userName: item.userName
                }
              });
              return resolve(data);
            }
          }
          this.$alert('请选择至少三个分办人员，并且其中至少有两个是鉴定人员', {
            confirmButtonText: '我知道了',
            type: 'warning'
          });
          return reject();
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  .content {

    h2 {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 0 0 5px 0;
      margin: 0 0 10px 0;
      border-bottom: 1px solid $--border-color;
      color: #303133;
    }

    .el-main {
      padding: 0 15px;
    }
  }
</style>
