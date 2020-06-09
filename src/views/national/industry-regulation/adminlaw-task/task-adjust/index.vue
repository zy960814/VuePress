<template>
  <div class="taskadjust">
    <el-card class="box-card" shadow="never">
      <div slot="header">
        行政执法监管任务调整
        <div class="header_button clear-float">
          <ul class="fr" v-if="this.$route.query.selectMenuItem==='1'">
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="taskDialogVisible = true">重新生成任务</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="resizeObject">重新抽取对象</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button type="primary" @click="personDialogVisible = true">重新抽取人员</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button @click="taskSave">保存</el-button>
            </li>
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button @click="taskConfirm">任务确认</el-button>
            </li>
          </ul>
          <ul class="fr">
            <li class="fl" style="margin-right:10px;" size="medium">
              <el-button @click="back">返回</el-button>
            </li>
          </ul>
        </div>
      </div>
      <!-- :style="{height:cardHeight}" -->
      <el-scrollbar :style="{height: cardHeight}">
        <div style="padding: 10px 20px">
          <!-- <h3 style="margin-top: 0">监管事项信息</h3> -->
          <!-- 垂直表格 -->
          <el-row class="clear-float">
            <vertical-table
              style="width:100%;"
              class="fr"
              title="监管事项信息"
              :verticalTableData="personInfo"
              :verticalTableTitle="thingVerticalTableTitle"
              width="150px"
            ></vertical-table>
          </el-row>
          <!-- <h3>监管对象信息</h3> -->
          <!-- 垂直表格 -->
          <el-row class="clear-float">
            <vertical-table
              style="width:100%;margin-top:10px;"
              class="fr"
              title="监管对象信息"
              :verticalTableData="personInfo"
              :verticalTableTitle="objectVerticalTableTitle"
              width="150px"
              tabelWidth="400px"
            ></vertical-table>
          </el-row>
          <!-- <h3>检查人员信息*</h3> -->
          <el-form>
            <el-form-item style="margin-top: 10px">
              <div class="titleDiv">检查人员信息</div>
              <el-table :data="personInfo.persions" border>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="rank" label="职级"></el-table-column>
                <el-table-column prop="lawStaffType" label="执法人员性质"></el-table-column>
                <el-table-column prop="qualificationLegalProfession" label="是否具有法律职业资格"></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-card>
    <my-dialog width="30%" :visible.sync="taskDialogVisible" :show-close="false">
      <span>请您确定随机检查人员的数量：</span>
      <el-input-number v-model="taskNum" controls-position="right" :min="2" size="small"></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="taskResize">确 定</el-button>
      </span>
    </my-dialog>
    <my-dialog width="30%" :visible.sync="personDialogVisible" :show-close="false">
      <span>请您确定随机检查人员的数量：</span>
      <el-input-number v-model="personNum" controls-position="right" :min="2" size="small"></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="personDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="personResize">确 定</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
import VerticalTable from '@/components/commons/VerticalTable'
import MyDialog from '@/components/commons/MyDialog'
import {
  waitDetail,
  randomPersions,
  randomPersion,
  randomItem,
  assignJob,
  saveTask
} from '@/api/national'
export default {
  components: {
    MyDialog,
    VerticalTable
  },
  data() {
    return {
      // 对话框
      taskDialogVisible: false,
      taskNum: 2,
      personDialogVisible: false,
      personNum: 2,
      // 监管对象信息
      personInfo: {
        itemName: '111',
        superviseObject: '国家文物局',
        persions: [
          {
            index: 1,
            name: '刘大明',
            rank: '处长',
            lawStaffType: '公务员',
            qualificationLegalProfession: '是'
          },
          {
            index: 1,
            name: '陈培军',
            rank: '调研员',
            lawStaffType: '公务员',
            qualificationLegalProfession: '是'
          }
        ]
      },
      // 监管事项信息
      matterInfo: {},
      // 检查行为信息
      inspectInfo: {},
      persion: [],
      // 当前查看详情的ic
      currentCrId: '',
      // 竖形表格标题数据(一个对象为一行的标题)
      thingVerticalTableTitle: [
        { itemName: '监管类型', superviseItemImplementCode: '事项编码' },
        { entrustDept: '实施机构', entrustDeptCode: '受委托部门编号' }
      ],
      objectVerticalTableTitle: [
        {
          superviseObject: '监管对象',
          administrativeCpUiCode: '监管对象唯一标识'
        },
        {
          administrativeCp: '行政相对人',
          administrativeCpNa: '行政相对人性质'
        },
        {
          administrativeCpCeType: '行政相对人证件类型',
          administrativeCpUiCode: '行政相对人编码'
        },
        { addressRegistered: '注册地址', addressOperating: '经营地址' }
      ]
    }
  },
  computed: {
    cardHeight() {
      return (
        'calc(100vh - ' +
        (this.$store.getters.menuStyle === 1 ? 182 : 223) +
        'px' +
        ')'
      )
    }
  },
  watch: {},
  created() {
    this.waitHandledetail()
  },
  mounted() {},
  destroyed() {},
  methods: {
    search(currentPage) {
      this.queryParams.pagination.currentPage = currentPage ? currentPage : 1
    },
    // 查询详情数据
    waitHandledetail() {
      this.currentCrId = this.$route.query.crId
      waitDetail(this.currentCrId).then(responseData => {
        this.personInfo = responseData.data.item
        // console.log(this.personInfo)
      })
    },
    //重新生成任务
    taskResize() {
      this.taskDialogVisible = false
      randomPersions(
        this.taskNum,
        this.personInfo.superviseItemImplementCode
      ).then(responseData => {
        // console.log(responseData)

        this.filterResize(responseData.data.item)
        this.personInfo.persions = responseData.data.persions
      })
      this.message(this.taskNum)
    },
    // 重新抽取对象
    resizeObject() {
      randomItem().then(responseData => {
        this.filterResize(responseData.data.item)
        // console.log(responseData.data.item)
      })
    },
    // 重新抽取人员
    personResize() {
      this.personDialogVisible = false
      randomPersion(
        this.personNum,
        this.personInfo.superviseItemImplementCode
      ).then(responseData => {
        // console.log(responseData.data.persion)

        this.personInfo.persions = responseData.data.persion
        this.message(this.personNum)
      })
    },
    // 人员不足消息提示
    message(num) {
      console.log(this.personInfo.persions)

      if (this.personInfo.persions.length < num) {
        this.$message.error(`人员不足${num}条`)
      }
    },
    // 过滤重新生成的数组
    filterResize(data) {
      for (let key in data) {
        if (this.personInfo.hasOwnProperty(key)) {
          this.personInfo[key] = data[key]
        }
      }
      // console.log('11111111111')

      // console.log(this.personInfo)
    },
    // 任务确认
    taskConfirm() {
      this.assignJob()
      this.$router.push(
        `/national/industry-regulation/admin-law?selectMenuItem=${this.$route.query.selectMenuItem}`
      )
    },
    // 任务下发接口
    assignJob() {
      // console.log({ item: this.personInfo })
      assignJob({ item: this.personInfo }).then(responseData => {
        if (responseData.code === 200) {
          this.$message({
            message: '任务下发成功',
            type: 'success'
          })
        }
      })
    },
    // 保存
    taskSave() {
      this.saveTask()
    },
    // 返回
    back() {
      this.$router.push({
        name: 'adminLaw',
        query: { selectMenuItem: this.$route.query.selectMenuItem },
        params: { queryParams: this.$route.params.queryParams }
      })
    },
    // 任务保存接口
    saveTask() {
      // let nameArr = []
      // let idNumberArr = []
      // this.personInfo.persions.forEach(item => {
      //   nameArr.push(item.name)
      //   idNumberArr.push(item.idNumber)
      //   // console.log(item.idNumber)
      // })
      // let nameStr = nameArr.join(';')
      // let idNumberStr = idNumberArr.join(';')
      // this.$set(this.personInfo, 'checkPersonnel', nameStr)
      // // console.log(idNumberStr)
      // this.$set(this.personInfo, 'checkPersonnelCode', idNumberStr)
      // console.log({ item: this.personInfo })
      saveTask({ item: this.personInfo }).then(responseData => {
        if (responseData.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
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
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 0 0;
  }
  .header_button {
    margin-top: 10px;
    vertical-align: middle;
    // background-color: #ccc;
    height: 50px;
    // #e6ebf5
    border-top: 1px solid #e6ebf5;
    // border-bottom: 1px solid #e6ebf5;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
  }
  /deep/.el-card__body {
    padding: 0;
  }
}
</style>
