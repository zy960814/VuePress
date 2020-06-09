<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      请选择全国重点文物保护单位
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="30px"
        style="padding:0px;margin-top: 10px;"
      >
        <!-- <div style="width:10px;height:10px;background-color:red;" class="fl"></div> -->
        <!-- <ul class="clear-float">
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="dialogTableVisible = true">填写说明</el-button>
            </li>
        </ul>-->
        <!-- <ul class="clear-float">
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="save">保存</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="submit">提交</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button @click="back">返回</el-button>
            </li>
        </ul>-->
        <div class="row_1 clear-float header_button">
          <el-input placeholder="名称" v-model="form.name" class="keyword mr-10 fl">
            <el-button slot="append">查询</el-button>
          </el-input>
          <el-button type="primary" plain class="fl">重置</el-button>
        </div>
        <div class="header_button_two">
          <el-select v-model="form.batch" clearable placeholder="请选择批次" style="width:150px;">
            <el-option
              v-for="item in batchArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item label="批次" prop="batch">
              <el-select v-model="form.batch" clearable placeholder="请选择">
                <el-option
                  v-for="item in batchArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
    </div>
    <el-scrollbar :style="{height: height}">
      <singleselect-table
        :tableData="nationalSecurityTableData"
        :tableTitle="nationalSecurityTitle"
        @select="earnSelect"
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
  </el-card>
</template>

<script>
import SingleselectTable from '@/components/commons/SingleselectTable'
export default {
  name: 'RelicProtect',
  components: { SingleselectTable },
  props: {
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      nationalSecurityTableData: [
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        },
        {
          name: '周口店遗址',
          province: '北京',
          batch: '第一批'
        }
      ],
      // 国保单位选择表头
      nationalSecurityTitle: [
        {
          label: '国保单位名称',
          prop: 'name'
        },
        {
          label: '省份',
          prop: 'province'
        },
        {
          label: '批次',
          prop: 'batch'
        }
      ],
      form: { name: '', batch: '' },
      batchArr: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
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
    // 获取国保单位选中项
    earnSelect(val) {
      console.log(val)
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
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}

.box-card {
  /deep/.el-card__header {
    padding-bottom: 0px !important;
  }
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
  .header_button {
    vertical-align: middle;
    height: 50px;
    border-top: 1px solid #e6ebf5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
    padding-left: 20px;
  }
  .header_button_two {
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
