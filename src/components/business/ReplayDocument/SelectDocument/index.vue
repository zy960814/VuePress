<template>
  <div class="selectDocument">
    <el-form ref="form" :model="form" label-position="left" label-width="30px" style="padding:0px;">
      <!-- <div class="header_button_one">
          <el-checkbox v-model="checked" @change="singleSelect">无此文件,手动上传</el-checkbox>
      </div>-->
      <div class="row_1 clear-float header_button_two">
        <el-input placeholder="名称" v-model="form.name" class="keyword mr-10 fl">
          <el-button slot="append">查询</el-button>
        </el-input>
        <el-button type="primary" plain class="fl">重置</el-button>
      </div>
      <!-- <div class="header_button_three">
        <el-select v-model="form.batch" clearable placeholder="请选择批次" style="width:150px;">
          <el-option
            v-for="item in batchArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>-->
    </el-form>
    <el-scrollbar :style="{height: height_select}">
      <singleselect-table
        :tableData="nationalSecurityTableData"
        :tableTitle="nationalSecurityTitle"
        @select="earnSelect"
        ref="multipleTable"
        style="margin:0 20px;"
      ></singleselect-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagination.currentPage"
        :page-sizes="[10, 20 ,30 ,50,100]"
        :page-size="queryParams.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-scrollbar>
  </div>
</template>

<script>
import SingleselectTable from '@/components/commons/SingleselectTable'
export default {
  name: 'SelectDocument',
  components: { SingleselectTable },
  props: {
    height_select: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      //   checked: false,
      nationalSecurityTableData: [
        {
          index: 1,
          replayDocumentTitle: '周口店遗址01号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 2,
          replayDocumentTitle: '周口店遗址02号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 3,
          replayDocumentTitle: '周口店遗址03号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 4,
          replayDocumentTitle: '周口店遗址04号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 5,
          replayDocumentTitle: '周口店遗址05号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 6,
          replayDocumentTitle: '周口店遗址06号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 7,
          replayDocumentTitle: '周口店遗址07号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 8,
          replayDocumentTitle: '周口店遗址08号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 9,
          replayDocumentTitle: '周口店遗址09号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 10,
          replayDocumentTitle: '周口店遗址10号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 11,
          replayDocumentTitle: '周口店遗址11号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 12,
          replayDocumentTitle: '周口店遗址12号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 13,
          replayDocumentTitle: '周口店遗址13号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        },
        {
          index: 14,
          replayDocumentTitle: '周口店遗址14号文件',
          replayDocumentNo: '20200429',
          replayTime: '2020-02-30',
          approvalResponse: '周口店遗址14号文件.doc'
        }
      ],
      // 国保单位选择表头
      nationalSecurityTitle: [
        {
          label: '序号',
          prop: 'index'
        },
        {
          label: '批复文件标题',
          prop: 'replayDocumentTitle'
        },
        {
          label: '批复文号',
          prop: 'replayDocumentNo'
        },
        {
          label: '批复时间',
          prop: 'replayTime'
        }
      ],
      form: { name: '' },
      //   batchArr: [
      //     {
      //       value: '选项1',
      //       label: '黄金糕'
      //     },
      //     {
      //       value: '选项2',
      //       label: '双皮奶'
      //     },
      //     {
      //       value: '选项3',
      //       label: '蚵仔煎'
      //     },
      //     {
      //       value: '选项4',
      //       label: '龙须面'
      //     },
      //     {
      //       value: '选项5',
      //       label: '北京烤鸭'
      //     }
      //   ],
      queryParams: {
        pagination: {
          currentPage: 1,
          pageSize: 20
        },
        keyword: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // singleSelect(val) {
    //   this.$refs.multipleTable.$refs.SuperviseMultipleTable.clearSelection()
    //   this.$emit('singleSelect', val)
    // },
    // 获取国保单位选中项
    earnSelect(val) {
      //   console.log(val)
      //   this.checked = false
      this.$emit('nationalSecurity', val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.selectDocument {
  .row_1 {
    display: inline-block;
    margin: 0 auto;
    .keyword {
      width: 540px;
    }
    /deep/ .el-date-editor.el-input__inner {
      width: 260px;
    }
    /deep/ .el-input-group__prepend {
      width: 128px;
      background-color: #fff;

      .el-input__inner {
        width: 131px;
      }
    }
  }
  .header_button_one {
    vertical-align: middle;
    height: 50px;
    border-top: 1px solid #e6ebf5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
  }
  .header_button_two {
    margin-top: -12px;
    vertical-align: middle;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
    border-bottom: 1px solid #e6ebf5;
  }
  .header_button_three {
    vertical-align: middle;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
  }
  h3 {
    margin: 30px 0 16px;
    font-size: 16px;
  }
  .titleDiv {
    width: 100%;
    font-weight: 700;
    background-color: white;
    font-size: 14px;
    border: 1px solid gray;
    border-bottom: none;
    line-height: 20px;
    padding: 5px;
    text-align: center;
  }
}
</style>
