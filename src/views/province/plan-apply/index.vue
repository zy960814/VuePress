<template>
  <div class="appllist">
    <el-card class="box-card">
      <el-container>
        <el-header class="header_style">
          <span>请选择年度计划申请事项</span>
          <el-link type="primary" class="header_link outerLink">申请人权力和义务</el-link>
        </el-header>
        <el-main>
          <template>
            <el-table
              class="outerTable"
              :data="tableData"
              border
              :header-cell-style="{background:'#f2f2f2',color:'#555'}"
              :header-row-style="{height:'30px;'}"
              :height="tableHeight"
              :fit="true"
              :span-method="arraySpanMethod"
              size="mini"
              v-loadMore="payLoads"
              ref="collapseTable"
            >
              <!-- <el-table-column prop="eventCode" label="事项编码" min-width="80"></el-table-column> -->
              <el-table-column prop="eventName" label="事项名称" min-width="172">
                <template slot-scope="scope">
                  <el-link type="primary" @click="diaShow" class="outerLink">{{scope.row.eventName}}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="acceptInstitution" label="受理机构" min-width="120"></el-table-column>
              <!-- <el-table-column prop="processTime" label="办理时限" min-width="140"></el-table-column>
              <el-table-column prop="applySubject" label="申报主体" min-width="110"></el-table-column>-->
              <el-table-column prop="applyType" label="申报类型" min-width="155"></el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                min-width="200"
                fixed="right"
                :resizable="false"
              >
                <template slot-scope="scope">
                  <template v-for="(item,i) in scope.row.operate">
                    <table-button
                      :key="i"
                      :buttonName="item"
                      @button-click="btnClick(`${scope.$index}${i}`)"
                    ></table-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import TableButton from '@/components/commons/TableButton'

export default {
  components: {
    TableButton
  },

  data() {
    return {
      payLoads: '',
      // 外部表格数据
      tableData: [
        // 第一行
        {
          eventName: '文物安全防护年度计划',
          acceptInstitution: '国家文物局',
          applyType: '-',
          operate: ['申请']
        },
        // 第二行
        {
          eventName: '文保单位修缮年度计划',
          acceptInstitution: '国家文物局',
          applyType: '-',
          operate: ['申请']
        },
        // 第三行
        {
          eventName: '革命文物保护年度计划',
          acceptInstitution: '国家文物局',
          applyType: '文物保护单位保护项目',
          operate: ['申请']
        },
        // 第四行
        {
          eventName: '革命文物保护年度计划',
          acceptInstitution: '国家文物局',
          applyType: '馆藏一级文物保护项目',
          operate: ['申请']
        }
      ],
      // 后台取的表格合并数据
      colapseObj: [
        {
          columnIndex: 0,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [1, 1],
            '3': [1, 1]
          }
        },
        {
          columnIndex: 1,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [1, 1],
            '3': [1, 1]
          }
        },
        {
          columnIndex: 2,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [1, 1],
            '3': [1, 1]
          }
        },
        {
          columnIndex: 3,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [1, 1],
            '3': [1, 1]
          }
        }
      ],
      sum: 0,
      // 申请按钮弹出框数据
      gridData: [
        {
          temporaryAdvance: '文物临时进境',
          applyButton: {
            button1: '个人携带申请',
            button2: '展览申请'
          }
        },
        {
          temporaryAdvance: '文物复出境',
          applyButton: {
            button1: '个人携带申请',
            button2: '展览申请'
          }
        },
        {
          temporaryAdvance: '文物临时出境',
          applyButton: {
            button1: '个人携带申请',
            button2: '展览申请'
          }
        },
        {
          temporaryAdvance: '文物复进境',
          applyButton: {
            button1: '个人携带申请',
            button2: '展览申请'
          }
        },
        {
          temporaryAdvance: '文物出境',
          applyButton: {
            button1: '个人携带申请',
            button2: '展览申请'
          }
        }
      ],
      dialogTableVisible: false
    }
  },

  activated() {
    this.payLoads = new Date().getTime()
    // 解决返回滚动时底部奇怪的线bug
    this.$nextTick(() => {
      this.$refs.collapseTable.doLayout()
    })
  },
  computed: {
    tableHeight() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 182 : 223) +
        'px' +
        ')'
      )
    }
  },
  methods: {
    // 合并表行(选的是单元格的序号,最后的retrun [0,0]一定要写)
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row + column)

      for (let i = 0; i < this.colapseObj.length; i++) {
        let item = this.colapseObj[i]
        if (columnIndex === item.columnIndex) {
          let itemArr = [0, 0]
          Object.keys(item.colapseArr).forEach(itemInner => {
            if (rowIndex === +itemInner) {
              itemArr = item.colapseArr[itemInner]
            }
          })
          return itemArr
        }
      }
    },
    // 按钮点击事件
    btnClick(type) {
      // console.log(type)
      switch (type) {
        case '00':
          this.$router.push('/personal/schedule/protectPlan')
          break
        case '10':
          this.$router.push('/personal/schedule/repairPlan')
          break
      }
    },

    // 竖形表格
    handlebasicMessageData(basicMessage) {
      if (!basicMessage) {
        return
      }
      let table = [] // 大表格
      let tmpRow = [] // 临时数组，表示 row，一行数据

      tmpRow.push({ key: '事项类型', value: basicMessage.eventType })
      tmpRow.push({ key: '办证类型', value: basicMessage.handleType })
      // tmpRow.push({ key: "国籍", value: teacher.countryName });
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({
        key: '实施主体',
        value: basicMessage.implementationSubject
      })
      tmpRow.push({ key: '行政层级', value: basicMessage.administration })
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({
        key: '决定机构',
        value: basicMessage.decisionOrganization
      })
      tmpRow.push({ key: '审查类型', value: basicMessage.examineType })
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({ key: '申请主体', value: basicMessage.applySubject })
      tmpRow.push({ key: '受理机构', value: basicMessage.receiveOrgan })
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({ key: '承诺办结时限', value: basicMessage.promiseTime })
      tmpRow.push({ key: '法定办结时限', value: basicMessage.specifiedTime })
      table.push(tmpRow)
      tmpRow = []
      tmpRow.push({ key: '是否收费', value: basicMessage.isCharge })
      tmpRow.push({
        key: '到办事现场次数',
        value: basicMessage.frequency
      })
      table.push(tmpRow)
      tmpRow = []
      tmpRow.push({ key: '数量限制', value: basicMessage.numLimit })
      tmpRow.push({ key: '适用范围', value: basicMessage.suitScope })
      table.push(tmpRow)
      tmpRow = []
      tmpRow.push({
        key: '审批结果及送达方式',
        value: basicMessage.resultAndType
      })
      tmpRow.push({
        key: '办理进程和结果查询',
        value: basicMessage.orderAndResult
      })
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({
        key: '咨询方式',
        value: basicMessage.consult
      })
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({
        key: '监管投诉渠道',
        value: basicMessage.superviseChannel
      })
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({
        key: '办理时间',
        value: basicMessage.handleTime
      })
      table.push(tmpRow)
      tmpRow = []

      tmpRow.push({
        key: '办理地点',
        value: basicMessage.handlePlace
      })
      table.push(tmpRow)
      tmpRow = []
      this.dataArray = table
    },
    // 点击弹出弹出框事件
    diaShow() {
      this.handlebasicMessageData(this.basicMessage)
      this.dialogTableVisible = true
      // 解决ie浏览器表格不能100%显示问题，对表格进行重新布局
      this.$nextTick(() => {
        console.log(this.$refs.table)
        this.$refs.table.doLayout()
      })
    },
    // 点击切换按钮
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    // 弹出框合并行
    arraySpanMethodDialog({ rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 4) {
        if (columnIndex === 0) {
          return [1, 5]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 去除弹出框外部滚动条
/deep/ .el-dialog__wrapper {
  position: fixed;
  top: 0;
  bottom: 0px;
  right: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
}

.appllist {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  .box-card {
    height: 100%;
    width: 100%;
    // 头部样式（请选择申请事项）
    /deep/ .el-header {
      height: 20px !important;
      text-align: center;
      position: relative;
      height: unset !important;

      .header_link {
        position: absolute;
        right: 20px;
      }
    }

    // 外部表格样式
    // 表格文字居中
    /deep/ .outerTable.el-table th > .cell {
      text-align: center;
      padding: 8px;
    }

    /deep/ .outerTable.el-table .cell {
      text-align: center;
      // padding: 2px;
    }

    // 链接下划线
    .el-link.outerLink {
      text-decoration: underline;
    }

    .outerLink.el-link.is-underline:hover:after {
      border-bottom: none;
    }
  }

  // 申请按钮样式
  .operativeButton {
    font-size: 12px;
    padding: 4px;
    width: 82px;
    // width: 40%;
    height: 30px;
    margin: 5px 4px;
    // background-color: rgba(0, 135, 156, 0.5);
    // color: white;
  }

  // 弹出框按钮(个人携带申请\展览申请)长度修改
  // .el-button.operativeButton.applyButton {
  //   width: 84px;
  // }
  // 事项名称按钮弹出框样式
  /deep/ .el-dialog {
    margin-top: unset !important;
    top: 50%;
    transform: translateY(-50%);
    -ms-transform: translateY(-66%);

    // margin-bottom: 5vh;
    width: 90%;
    // 弹出框头部样式
    /deep/ .el-dialog__header {
      padding: 5px;
    }

    // 小叉叉样式
    /deep/ .el-dialog__headerbtn {
      top: 10px;
    }

    // 弹出框内边距
    // /deep/ .el-dialog--center .el-dialog__body {
    //   padding: 34px 25px 36px;
    // }

    // 事项名称按钮弹出框卡片样式

    .el-card {
      font-size: 12px;
      padding: 0 15px;
      // overflow-y: hidden;

      // height: 400px;
      // 事项名称按钮弹出框卡片头部样式
      .el-card__header {
        position: relative;
        padding: 4px 20px;
        text-align: center;
        vertical-align: middle;
        line-height: 29px;

        .printButton {
          position: absolute;
          right: 0;
          bottom: 2px;
        }
      }

      // 事项名称按钮弹出框外部滚动样式1
      // 事项名称按钮弹出框卡片内容连带头部滚动样式2
      // .dialogcard_scoll {
      //   height: 400px;
      //   overflow-y: auto;
      // .dialogcard_content {
      //   height: 1000px;
      // }
      // }
      // 事项名称按钮弹出框卡片内容滚动样式3
      .dialogcard_scoll {
        height: 400px;
        // padding-bottom: 20px;
        overflow-y: auto;

        .dialogcard_content {
          margin-top: 10px;
          // height: 2200px;
        }
      }

      .el-card__body {
        padding: 0px;
      }

      // 内部表格样式
      .el-table {
        font-size: 12px;
        color: black;
      }

      .el-table thead {
        color: black;
      }

      .el-table th {
        background-color: #f2f2f2;
        font-weight: unset;
      }

      .innerTable.el-table .cell {
        line-height: 40px;
      }

      // 禁止性要求字体样式
      .forbidenP {
        font-size: 12px;
        line-height: 12px;
        margin: 5px 0;
        text-align: left;
      }

      // 每段文字字体样式设置
      .orderP {
        text-align: left;
        text-indent: 5px;
        font-size: 12px;
        line-height: 18px;
        margin: 0;
      }
    }

    // 切换按钮样式（基本信息、办理流程、办理材料目录……）
    .wenWuMenu {
      .el-menu-demo .el-menu-item {
        border-bottom-color: #0066a0 !important;
      }

      ul {
        box-sizing: border-box;
        // padding: 5px 0;
      }

      ul > li {
        // width: 110px;
        height: 35px;
        line-height: 35px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        text-align: center;
        // border-right: 1px solid #ccc;
        padding: 0;

        .wenwuItem {
          font-size: 14px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding: 0 10px 5px;
        }
      }

      .liLine {
        float: left;
        height: 22px;
        width: 1px;
        background-color: #909399;
        padding: 0;
        margin: 7px 0 5px;
      }

      ul > li:last-of-type {
        border-right: 0;
      }

      .el-menu--horizontal > .el-menu-item.is-active {
        color: $--color-primary;
        height: 35px;
        line-height: 35px;
        font-weight: 700;
      }
    }

    // 基本信息行样式
    .basicMessage {
      text-align: left;
      font-size: 15px;
      font-weight: 700;
      margin: 10px 0;
      padding: 10px;
      background-color: #f2f2f2;
    }
  }

  // 去除外表格悬停样式
  /deep/ .el-table__body tr.hover-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td {
    background-color: white;
  }

  // 表格链接里的字体大小设置
  td .el-link {
    font-size: 12px;
  }
}
</style>
