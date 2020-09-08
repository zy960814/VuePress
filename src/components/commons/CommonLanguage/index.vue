<template>
  <div class="commonLanguage">
    <span class="fl" :style="{marginRight: spaceWidth}">常用语</span>
    <el-select class="fl" clearable v-model="language" placeholder="请选择" @change="languageSelect">
      <el-option v-for="item in tableData" :key="item.id" :label="item.phrase" :value="item.phrase"></el-option>
    </el-select>
    <el-button class="fr" type="primary" @click="dialogVisibleLanguage = true">常用语设置</el-button>

    <my-dialog
      width="1024px"
      :height="dialogHeight+'px'"
      :visible.sync="dialogVisibleLanguage"
      :append-to-body="true"
      :center="true"
      class="boxCard_dialog"
    >
      <!-- <div slot="title" class="title">
        <el-button type="primary" @click="show" class="titleButton">+ 新增常用语</el-button>

        设置业务常用语
      </div>-->
      <el-card shadow="never">
        <div slot="header">
          设置业务常用语
          <div class="header_button">
            <el-button
              type="primary"
              @click="show"
              class="titleButton"
              icon="el-icon-circle-plus-outline"
            >新建</el-button>
          </div>
        </div>
        <el-container>
          <el-main style="padding:0px;">
            <el-scrollbar :style="{height: dialogContentHeight}">
              <div style="padding-right:10px;">
                <el-table
                  :data="tableData"
                  :header-cell-style="{background:'#f2f2f2',color:'#555',padding:'12px 0'}"
                  border
                  align="center"
                  class="mh-table"
                  highlight-current-row
                  :fit="true"
                  @current-change="handleCurrentChange"
                  ref="singleTable"
                >
                  <el-table-column type="index" label="序号" width="120"></el-table-column>
                  <el-table-column label="常用语" prop="phrase"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                      <table-button @button-click="editClick(scope.row)" buttonName="编辑" ></table-button>
                      <table-button @button-click="deleteClick(scope.row)" v-double buttonName="删除"></table-button>
                    </template>
                    <!-- <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteClick(scope.row)" v-double>删除</el-button>
                    </template>-->
                  </el-table-column>
                </el-table>
                <!-- <language :pagetype="null"></language> -->
              </div>
            </el-scrollbar>
          </el-main>
          <el-aside width="80px" class="aside">
            <div class="asideButton">
              <el-row style="margin-top: 20px;margin-left: 20px;">
                <el-radio-group v-model="radio" size="small">
                  <!-- <el-radio-button label="1" @click="up">
                  <i class="el-icon-top" />
                  </el-radio-button>-->
                  <el-button
                    icon="el-icon-top"
                    @click="up"
                    :disabled="choseDisabledUp"
                    type="primary"
                  ></el-button>
                </el-radio-group>
              </el-row>
              <el-row style="margin-top: 20px;margin-left: 20px;">
                <el-radio-group v-model="radio" size="small">
                  <!-- <el-radio-button label="2" @click="down">
                  <i class="el-icon-bottom" />
                  </el-radio-button>-->
                  <el-button
                    icon="el-icon-bottom"
                    @click="down"
                    :disabled="choseDisabledDown"
                    type="primary"
                  ></el-button>
                </el-radio-group>
              </el-row>
            </div>
          </el-aside>
        </el-container>
      </el-card>
    </my-dialog>
    <!-- 新增修改弹框 -->
    <my-dialog
      width="524px"
      :height="dialogHeightEdit+'px'"
      :visible.sync="dialogVisible"
      center
      :append-to-body="true"
      class="boxCard_dialog"
    >
      <el-card shadow="never">
        <div slot="header">{{title}}</div>
        <el-scrollbar :style="{height: dialogContentHeightEdit}">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer fr">
        <el-button type="primary" @click="addLanguageConfirm">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from '@/components/commons/MyDialog'
import TableButton from '@/components/commons/TableButton'
import {
  findLanguage,
  addLanguage,
  deleteLanguage,
  moveLanguage
} from '@/api/basic'
export default {
  name: 'CommonLanguage',
  components: {
    MyDialog,
    TableButton
  },
  // TODO:连续点击上下按钮报错
  //使用自定义指令
  // directives: {
  //   double: {
  //     inserted(el) {
  //       el.addEventListener('click', e => {
  //         console.log('-----------------')
  //         console.log(el)
  //         if (!el.disabled) {
  //           el.disabled = true
  //           el.style.cursor = 'not-allowed'
  //           setTimeout(() => {
  //             el.style.cursor = 'pointer'
  //             el.disabled = false
  //           }, 15000)
  //         }
  //       })
  //     }
  //   }
  // },
  props: {
    spaceWidth: {
      type: String,
      default: '20px'
    }
  },
  data() {
    return {
      options: [
        {
          value: '黄金糕',
          label: '黄金糕'
        },
        {
          value: '双皮奶',
          label: '双皮奶'
        },
        {
          value: '蚵仔煎',
          label: '蚵仔煎'
        },
        {
          value: '龙须面',
          label: '龙须面'
        },
        {
          value: '北京烤鸭',
          label: '北京烤鸭'
        }
      ],
      //常用语 弹框
      dialogVisibleLanguage: false,
      language: '',
      textarea: '',
      title: '新增常用语',
      dialogVisible: false,
      radio: '1',
      col: [
        {
          label: '常用语',
          prop: 'name'
        }
      ],
      dropCol: [
        {
          label: '常用语',
          prop: 'name'
        }
      ],
      tableData: [],
      // findLanguageData: {
      //   pageNation: {
      //     currentPage: 1,
      //     pageSize: 1000
      //   },
      //   sort: {
      //     disOrder: 1
      //   }
      // },
      addLanguageData: {
        id: '',
        accountId: '',
        accountName: '',
        phrase: '',
        disOrder: ''
      },
      deleteLanguageData: {
        id: []
      },
      moveLanguageData: {
        id: '',
        disOrder: '',
        moveFlag: ''
      },
      // 选中行
      choseLine: {},
      // 选中行后解开上下按钮
      choseDisabledUp: true,
      choseDisabledDown: true
    }
  },
  created() {
    this.findLanguage()
  },
  mounted() {},
  computed: {
    // 常用语设置弹框
    dialogHeight() {
      return this.$store.getters.screenHeight > 1200
        ? 1200
        : this.$store.getters.screenHeight
    },
    dialogContentHeight() {
      return this.dialogHeight - 185 + 'px'
    },
    // 添加编辑弹框
    dialogHeightEdit() {
      return this.$store.getters.screenHeight > 237
        ? 237
        : this.$store.getters.screenHeight
    },
    dialogContentHeightEdit() {
      return this.dialogHeightEdit - 163 + 'px'
    }
  },
  methods: {
    languageSelect(value) {
      this.$emit('language', value)
    },
    // 常用语弹框确认
    languageConfirm() {
      this.dialogVisibleLanguage = false
    },
    //新增常用语
    show() {
      this.title = '新增常用语'
      this.dialogVisible = true
      this.textarea = ''
      this.addLanguageData.id = ''
      if (this.tableData.length === 0) {
        this.addLanguageData.disOrder = 1
      } else {
        this.addLanguageData.disOrder =
          this.tableData[this.tableData.length - 1].disOrder + 1
      }
    },
    //编辑常用语
    editClick(row) {
      this.title = '修改常用语'
      this.dialogVisible = true
      this.textarea = row.phrase
      this.addLanguageData.id = row.id
      this.addLanguageData.disOrder = row.disOrder
    },
    //删除常用语
    deleteClick(row) {
      this.deleteLanguageData.id = []
      this.deleteLanguageData.id.push(row.id)
      // console.log(this.deleteLanguageData.id)
      this.deleteLanguage()
    },
    // 添加常用语弹框确定
    addLanguageConfirm() {
      this.addLanguageData.phrase = this.textarea

      this.addLanguage()
      this.dialogVisible = false
    },
    // 单行选中
    handleCurrentChange(val) {
      this.choseDisabledUp = true
      this.choseDisabledDown = true
      if (val) {
        if (Object.keys(val).length > 0 && val.id !== this.tableData[0].id) {
          this.choseDisabledUp = false
        }
        if (
          Object.keys(val).length > 0 &&
          val.id !== this.tableData[this.tableData.length - 1].id
        ) {
          this.choseDisabledDown = false
        }
        this.choseLine = val
      }
    },
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row)
    // },
    // 向上按钮
    up() {
      this.moveLanguageData.id = this.choseLine.id
      this.moveLanguageData.disOrder = this.choseLine.disOrder

      this.moveLanguageData.moveFlag = '+'
      this.moveLanguage()
      // this.findLanguage()
    },
    down() {
      this.moveLanguageData.id = this.choseLine.id
      this.moveLanguageData.disOrder = this.choseLine.disOrder
      this.moveLanguageData.moveFlag = '-'
      this.moveLanguage()
      // findLanguage()
    },
    //常用语查询接口
    findLanguage() {
      // this.findLanguageData
      findLanguage()
        .then(responseData => {
          this.tableData = responseData.data
          // if (Object.keys(this.choseLine).length > 0) {

          //   this.tableData.findIndex(item => {
          //     return item.id === this.choseLine.id
          //   })
          // )

          // console.log(responseData)
          // this.choseDisabledUp = true
          // this.choseDisabledDown = true
          if (responseData.code === 200) {
            if (this.choseLine) {
              if (Object.keys(this.choseLine).length > 0) {
                this.$refs.singleTable.setCurrentRow(
                  this.tableData[
                    this.tableData.findIndex(item => {
                      return item.id === this.choseLine.id
                    })
                  ]
                )
              }
            }
            this.choseDisabledUp = true
            this.choseDisabledDown = true
            setTimeout(() => {
              if (this.choseLine) {
                if (
                  Object.keys(this.choseLine).length > 0 &&
                  this.choseLine.id !== this.tableData[0].id
                ) {
                  this.choseDisabledUp = false
                }
                if (
                  Object.keys(this.choseLine).length > 0 &&
                  this.choseLine.id !==
                    this.tableData[this.tableData.length - 1].id
                ) {
                  this.choseDisabledDown = false
                }
              }
            }, 500)
            // this.$nextTick(() => {
            //   this.choseDisabledUp = false
            //   this.choseDisabledDown = false
            // })
          }
          // this.setCurrent(this.choseLine)
          // }
        })
        .then(() => {
          // this.choseDisabledUp = false
          // this.choseDisabledDown = false
        })
    },
    //常用语添加接口
    addLanguage() {
      addLanguage(this.addLanguageData).then(responseData => {
        if (responseData.code === 200) {
          this.findLanguage()
        }
      })
    },
    //常用语删除接口
    deleteLanguage() {
      deleteLanguage(this.deleteLanguageData).then(responseData => {
        if (responseData.code === 200) {
          this.findLanguage()
        }
      })
    },
    //常用语移动接口
    moveLanguage() {
      moveLanguage(this.moveLanguageData).then(responseData => {
        if (responseData.code === 200) {
          this.findLanguage()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// append-to-body属性让横向滚动条出现了，所有加属性让它消失
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-dialog--center .el-dialog__body {
  padding-top: 0px;
}
/deep/.el-main {
  padding-left: 0px;
}
.title {
  font-weight: 700;
  position: relative;
  .titleButton {
    position: absolute;
    left: 4px;
  }
}
.aside {
  position: relative;
  .asideButton {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
.header_button {
  vertical-align: middle;
  border-top: 1px solid #e6ebf5;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 12px 0 20px;
}
</style>
