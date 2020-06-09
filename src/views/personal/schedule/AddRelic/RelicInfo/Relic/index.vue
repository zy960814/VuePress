<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      文物
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="30px"
        style="padding:0px;margin-top: 10px;"
      >
        <div class="row_1 clear-float header_button">
          <el-input placeholder="名称" v-model="form.name" class="keyword mr-10 fl">
            <el-button slot="append">查询</el-button>
          </el-input>
          <el-button type="primary" plain class="fl">重置</el-button>
        </div>
      </el-form>
    </div>
    <el-scrollbar :style="{height: height}">
      <singleselect-table
        :tableData="nationalSecurityTableData"
        :tableTitle="nationalSecurityTitle"
        @select="earnSelect"
        :showIndex="true"
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
          relicName: '中华人民共和国瑶族长鼓',
          sumNo: '430105218000110017538',
          years: '中华人民共和国(1949年10月1日成立)',
          relicCategory: '乐器、法器',
          relicLevel: '二级',
          texture: '木质',
          size: '长近126厘米',
          number: '1',
          integrated: '完整',
          integratedDetail: '完整',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院',
          collectTime: '1949年',
          relicSource: '瑶族'
        },
        {
          relicName: '中华人民共和国青田石刻“田子”章',
          sumNo: '430105218000110017538',
          years: '中华人民共和国(1949年10月1日成立)',
          relicCategory: '玺印符牌',
          relicLevel: '二级',
          texture: '木质',
          size: '长近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院/河南博物院',
          collectTime: '1950年8月',
          relicSource: '瑶族'
        },
        {
          relicName: '中华人民共和国青田石刻“翼乾像阁”章',
          sumNo: '430105218000110017538',
          years: '中华人民共和国(1949年10月1日成立)',
          relicCategory: '玺印符牌',
          relicLevel: '二级',
          texture: '木质',
          size: '长近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院/河南博物院',
          collectTime: '1950年8月',
          relicSource: '瑶族'
        },
        {
          relicName: '中华人民共和国青田石刻“延年益寿”章',
          sumNo: '430105218000110017538',
          years: '中华人民共和国(1949年10月1日成立)',
          relicCategory: '玺印符牌',
          relicLevel: '二级',
          texture: '木质',
          size: '长近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院/河南博物院',
          collectTime: '1950年8月',
          relicSource: '瑶族'
        },
        {
          relicName: '中华人民共和国青田石刻“任耀先章”',
          sumNo: '430105218000110017538',
          years: '中华人民共和国(1949年10月1日成立)',
          relicCategory: '玺印符牌',
          relicLevel: '二级',
          texture: '木质',
          size: '长近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院/河南博物院',
          collectTime: '1950年8月',
          relicSource: '瑶族'
        },
        {
          relicName: '中华人民共和国青田石刻“任承沅印”章',
          sumNo: '430105218000110017538',
          years: '中华人民共和国(1949年10月1日成立)',
          relicCategory: '玺印符牌',
          relicLevel: '二级',
          texture: '木质',
          size: '长近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院/河南博物院',
          collectTime: '1950年8月',
          relicSource: '瑶族'
        }
      ],
      // 国保单位选择表头
      nationalSecurityTitle: [
        {
          label: '文物名称',
          prop: 'relicName'
        },
        {
          label: '总登记号',
          prop: 'sumNo'
        },
        {
          label: '文物类型',
          prop: 'relicCategory'
        },
        {
          label: '具体年代',
          prop: 'years'
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
