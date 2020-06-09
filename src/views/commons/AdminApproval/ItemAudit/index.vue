<template>
  <apply-form-item data="事项审查">
    <div class="itemAudit">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <h3>国家文物局阅批件</h3>
          <div class="clear-float">
            <span style="font-size:12px;float:right;">
              <i class="el-icon-time" style="margin-right:3px;"></i>总限时20个工作日，剩余12个工作日
            </span>
          </div>
        </div>
        <el-form
          ref="form"
          :model="form"
          label-position="left"
          label-width="60px"
          :show-message="false"
        >
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="标题" prop="title" class="redStar">
                <el-input v-model="form.title" placeholder disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider class="border_black"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="流水号" prop="ngdw" class>
                <el-input v-model="form.num" placeholder disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="缓急" prop="hj" class>
                <el-select v-model="form.hj" placeholder class="mr-10" disabled>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拟稿人" prop="ngr" class="redStar">
                <el-input v-model="form.ngr" placeholder disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider class="border_black"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="拟稿单位" prop="ngdw" class="redStar">
                <el-input v-model="form.ngdw" placeholder disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拟稿日期" prop="ngrq" class="redStar">
                <el-date-picker
                  v-model="form.ngrq"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话" prop="tel" class="redStar">
                <el-input v-model="form.ngrq" placeholder disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="otherIntroduction">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="备注不超过2000个汉字"
                  v-model="form.otherIntroduction"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="签报附件" prop="enclosure">
                <el-link :href="form.href">签报附件.doc</el-link>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="相关文件" prop="enclosure">
                <el-button type="primary">点击查看</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <!-- 审批意见 -->
      <el-card style="margin-top: 20px" class="box-card" shadow="never">
        <el-form :model="{}" label-position="left" label-width="60px" :show-message="false">
          <el-col :span="12">
            <el-form-item label="发送给：" prop="remark" class="redStar">
              <div style="display: flex; justify-content: space-between">
                <el-input v-model="form.name" style="flex: 1"></el-input>
                <el-button type="primary" @click="showSendDialog" style="margin-left: 10px">选择</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 9px">
              <common-language @language="language" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="办理意见" prop="remark" class="redStar">
              <el-input type="textarea" :rows="4" v-model="form.remark" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>

      <!-- 办理意见 -->
      <h4 class="title_h4">
        办理意见列表
        <div class="titleLine"></div>
      </h4>
      <el-card class="box-card" shadow="never" style="margin-bottom:10px;">
        <el-table :data="tableData" style="width: 100%" class="colorHover">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="handle" label="办理人" width="180"></el-table-column>
          <el-table-column prop="handleOpinion" label="办理意见"></el-table-column>
          <el-table-column prop="handleTime" label="办理时间" width="180"></el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 选择--发送备选人弹框 -->
    <my-dialog
      width="1000px"
      class="boxCard_dialog"
      :height="sendDialogHeight + 'px'"
      center
      :visible.sync="sendDialogVisible"
      :append-to-body="true"
    >
      <select-dialog
        :pageTabsData="sendPageTabsData"
        title="选择发送人员"
        @handle-select="handleSelect"
        :height="sendDialogHeight + 'px'"
        ref="selectDialog"
      >
        <template #body_1>
          <el-scrollbar :style="{height: (sendDialogHeight - 170) + 'px'}">
            <SendDialog></SendDialog>
          </el-scrollbar>
        </template>
        <template #body_2>
          <el-scrollbar :style="{height: (sendDialogHeight - 170) + 'px'}">
            <SendDialog></SendDialog>
          </el-scrollbar>
        </template>
      </select-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendDialogVisible = false">确定</el-button>
        <el-button @click="sendDialogVisible = false">取消</el-button>
      </span>
    </my-dialog>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import CommonLanguage from '@/components/commons/CommonLanguage'
import SelectDialog from '@/components/commons/SelectDialog'
import SendDialog from '@/components/business/ApplyForDialog/SendDialog'
import MyDialog from '@/components/commons/MyDialog'

export default {
  components: {
    ApplyFormItem,
    CommonLanguage,
    SelectDialog,
    SendDialog,
    MyDialog
  },
  data() {
    return {
      form: {
        title: '',
        num: '',
        hj: '',
        ngr: '',
        ngdw: '',
        ngrq: '',
        tel: '',
        otherIntroduction: '',
        href: '',
        enclosure: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      tableData: [
        {
          handle: '文印室',
          handleOpinion: '拟稿人校对办结',
          handleTime: '2019-11-13 09:38:29'
        },
        {
          handle: '文书室',
          handleOpinion: ' ',
          handleTime: '2019-11-12 17:06:57'
        },
        {
          handle: '文物保护与考古司司秘',
          handleOpinion: '',
          handleTime: '2019-11-12 16:46:12'
        },
        {
          handle: '王彬',
          handleOpinion: '',
          handleTime: '2019-11-12 16:30:40'
        },
        {
          handle: '聂凯月',
          handleOpinion: '',
          handleTime: '2019-11-11 14:06:15'
        },
        {
          handle: '卞建龙',
          handleOpinion: '',
          handleTime: '2019-11-10 12:12:09'
        },
        {
          handle: '王彬',
          handleOpinion: '',
          handleTime: '2019-11-07 12:04:42'
        },
        {
          handle: '文物保护与考古司司秘',
          handleOpinion: '',
          handleTime: '2019-11-07 12:03:11'
        },
        {
          handle: '秘书处',
          handleOpinion: '',
          handleTime: '2019-11-07 09:52:27'
        },
        {
          handle: '宋新潮',
          handleOpinion: '同意，新潮10.17',
          handleTime: '2019-11-05 14:25:35'
        },
        {
          handle: '文书室',
          handleOpinion: '',
          handleTime: '2019-10-16 17:29:50'
        },
        {
          handle: '张建华',
          handleOpinion: '报请新潮同志批示。',
          handleTime: '2019-10-16 15:46:50'
        },
        {
          handle: '吴刚',
          handleOpinion: '请建华同志示。',
          handleTime: '2019-10-16 10:01:19'
        },
        {
          handle: '文书室',
          handleOpinion: '',
          handleTime: '2019-10-16 09:52:43'
        },
        {
          handle: '闫亚林',
          handleOpinion: '请办公室核报。',
          handleTime: '2019-10-15 11:35:37'
        },
        {
          handle: '王彬',
          handleOpinion: '请司领导阅示。',
          handleTime: '2019-10-14 21:52:35'
        },
        {
          handle: '聂凯月',
          handleOpinion: '请王彬同志阅示',
          handleTime: '2019-09-27 16:26:05'
        }
      ],
      type: 'card', // list
      options: [
        {
          value: '1',
          label: '涉建项目'
        },
        {
          value: '2',
          label: '函'
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
      sendPageTabsData: { tabs: [{ title: '常用' }, { title: '全部' }] },
      sendDialogVisible: false, // 发送备选人弹窗
      sendDialogHeight: 600 // 发送弹窗高度
    }
  },
  mounted() {},
  methods: {
    // 常用语下拉框
    language(value) {
      this.form.remark += value
    },
    showSendDialog() {
      this.sendDialogVisible = true
    },
    handleSelect(tabIndex) {
      this.handleIndex = tabIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.itemAudit {
  .el-divider {
    margin: 0;
    margin-bottom: 18px;

    &.border_black {
      background-color: #000;
    }
  }
  .title_h4 {
    text-align: center;
    position: relative;
    .titleLine {
      position: absolute;
      left: 50%;
      bottom: -5px;
      transform: translate(-50%, 0);
      background-color: $--color-primary;
      width: 100px;
      height: 3px;
    }
  }
  /deep/ th {
    background-color: $--color-plain-hover;
    height: 30px;
    color: gray;
  }
}
</style>
