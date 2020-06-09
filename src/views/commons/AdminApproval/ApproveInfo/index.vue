<template>
  <apply-form-item data="审批信息">
    <div class="approvelInfo">
      <el-container>
        <!-- 左侧部分 -->
        <el-main>
          <el-scrollbar>
            <!-- 审批信息 -->
            <h4 class="title">
              审批信息
              <div class="fr titleLine"></div>
            </h4>
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <h3>国家文物局发文</h3>
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
                  <el-col :span="6">
                    <el-form-item label="业务主题" prop="bussinessTheme" class="redStar redLabel">
                      <el-select
                        v-model="form.bussinessTheme"
                        size="mini"
                        placeholder
                        class="mr-10"
                        disabled
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="形式代码" prop="typeCode" class="redStar redLabel">
                      <el-select
                        v-model="form.typeCode"
                        size="mini"
                        placeholder
                        class="mr-10"
                        disabled
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="公开形式" prop="publicType" class="redStar redLabel">
                      <el-select
                        v-model="form.publicType"
                        size="mini"
                        placeholder
                        class="mr-10"
                        disabled
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="流水号" prop="num redLabel" class="redStar">
                      <el-input v-model="form.num" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="9">
                        <el-form-item label="文号" prop="documentNo_partOne" class="redStar redLabel">
                          <el-select
                            style="width:70px;"
                            v-model="form.documentNo_partOne"
                            size="mini"
                            placeholder
                            class="mr-10"
                            disabled
                          >
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9">
                        <el-form-item class="labelZero" prop="documentNo_partTwo">
                          <div class="inpuWidthBox">
                            <span style="line-height:32px;margin-left:5px">〔</span>
                            <el-select
                              style="width:80px;"
                              v-model="form.documentNo_partTwo"
                              size="mini"
                              placeholder
                              disabled
                            >
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                            <span style="line-height:32px">〕</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item class="labelZero" prop="documentNo_partThree">
                          <ul>
                            <li class="fl">
                              <el-input
                                v-model="form.documentNo_partThree"
                                style="width:60px;"
                                disabled
                              ></el-input>
                            </li>
                            <li class="fl" style="line-height:32px;">号</li>
                          </ul>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="封发" prop="fenfa_partOne" class="redStar redLabel">
                      <div style="display:flex;">
                        <el-select
                          v-model="form.fenfa_partOne"
                          size="mini"
                          placeholder
                          class="mr-10"
                          style="flex:2;width:40px;"
                          disabled
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                        <span style="flex:1">月</span>
                        <el-select
                          v-model="form.fenfa_partTwo"
                          size="mini"
                          placeholder
                          class="mr-10"
                          style="flex:2;width:40px;"
                          disabled
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                        <span style="flex:1">日</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="缓急" prop="huanji" class="redStar redLabel">
                      <el-select
                        v-model="form.huanji"
                        size="mini"
                        placeholder
                        class="mr-10"
                        style="flex:2;width:75px;"
                        disabled
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="10">
                    <el-form-item label="拟稿单位" prop="ngdw" class="redStar redLabel">
                      <el-input v-model="form.ngdw" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="拟稿人" prop="ngr" class="redStar redLabel">
                      <el-input v-model="form.ngr" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话" prop="tel" class="redStar redLabel">
                      <el-input v-model="form.tel" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="24">
                    <el-form-item label="标题" prop="title" class="redStar redLabel">
                      <el-input v-model="form.title" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="24">
                    <el-form-item label="主送" prop="zs" class="redStar redLabel">
                      <el-input v-model="form.zs" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="24">
                    <el-form-item label="抄送" prop="cs" class="redLabel">
                      <el-input v-model="form.cs" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="24">
                    <el-form-item label="局内会签单位" prop="jnhq" class="redLabel normal">
                      <el-input v-model="form.jnhq" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="7">
                    <el-form-item label="公章" prop="gz" class="redLabel redStar">
                      <el-select v-model="form.gz" size="mini" placeholder class="mr-10" disabled>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="10">
                    <el-form-item label="稿纸类型" prop="gzlx" class="redLabel redStar">
                      <el-select v-model="form.gzlx" size="mini" placeholder class="mr-10" disabled>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="5">
                  <el-col :span="7">
                    <el-form-item label="签发" prop="qf" class="redStar redLabel">
                      <el-input v-model="form.qf" placeholder disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="10">
                    <el-form-item label="签发时间" prop="qfTime" class="redStar redLabel">
                      <el-date-picker
                        format="yyyy"
                        value-format="yyyy"
                        v-model="form.qfTime"
                        type="year"
                        style="width:120px"
                        placeholder="选择年"
                        disabled
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注" prop="otherIntroduction" style="margin-bottom:0px;">
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="描述不超过2000个汉字"
                        v-model="form.otherIntroduction"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      style="margin-top:18px;margin-bottom:0px;"
                      label="审批结果"
                      prop="approvalResult"
                      class="redStar"
                    >
                      <el-radio v-model="form.approvalResult" label="1">是</el-radio>
                      <el-radio v-model="form.approvalResult" label="2">否</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
            <!-- 办理意见 -->
            <h4 class="title">
              办理意见
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
          </el-scrollbar>
        </el-main>
        <!-- 右侧部分 -->
        <el-aside width="300px">
          <h4 class="title">
            相关材料
            <div class="titleLine"></div>
          </h4>
          <div class="asideCard">
            <h5>发文附件</h5>
            <el-card class="smallCard" shadow="never">
              <el-scrollbar class="scroll_aside">
                <div style="margin:0px 10px 10px;">
                  <ul style="text-align:left;">
                    <li class="liItem">
                      <el-link type="primary">20200421涉建专家意见表格（南京万安石刻）-沈旸.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">南京万安陵石刻周边环境整治方案-胡石.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">保护区划关系图.pdf</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">20200421涉建专家意见表格（南京万安石刻）-沈旸.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">南京万安陵石刻周边环境整治方案-胡石.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">保护区划关系图.pdf</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">20200421涉建专家意见表格（南京万安石刻）-沈旸.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">南京万安陵石刻周边环境整治方案-胡石.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">保护区划关系图.pdf</el-link>
                    </li>
                  </ul>
                </div>
              </el-scrollbar>
            </el-card>
            <h5>收文附件</h5>
            <el-card class="smallCard" shadow="never">
              <el-scrollbar class="scroll_aside">
                <div style="margin:0px 10px 10px;">
                  <ul>
                    <li class="liItem">
                      <el-link type="primary">20200421涉建专家意见表格（南京万安石刻）-沈旸.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">南京万安陵石刻周边环境整治方案-胡石.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">保护区划关系图.pdf</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">20200421涉建专家意见表格（南京万安石刻）-沈旸.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">南京万安陵石刻周边环境整治方案-胡石.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">保护区划关系图.pdf</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">20200421涉建专家意见表格（南京万安石刻）-沈旸.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">南京万安陵石刻周边环境整治方案-胡石.docx</el-link>
                    </li>
                    <li class="liItem">
                      <el-link type="primary">保护区划关系图.pdf</el-link>
                    </li>
                  </ul>
                </div>
              </el-scrollbar>
            </el-card>
            <h5>专家意见</h5>
            <el-card class="smallCard" shadow="never">专家意见</el-card>
            <h5></h5>
            <el-card @click.native="testClick" class="box-card smallCard" shadow="never">文物地图</el-card>
          </div>
        </el-aside>
      </el-container>
    </div>
    <!-- 文物地图弹框 -->
    <my-dialog
      width="1200px"
      class="boxCard_dialog"
      :height="dialogHeight + 'px'"
      center
      :visible.sync="dialogFormThumbnailsGis"
      :append-to-body="true"
    >
      <select-dialog
        :pageTabsData="pageTabsData1"
        title="邙山陵墓群"
        @handle-select="handleSelect"
        :height="dialogHeight + 'px'"
        ref="selectDialog"
      >
        <template #body_1>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <Thumbnails></Thumbnails>
          </el-scrollbar>
        </template>
        <template #body_2>
          <el-scrollbar :style="{height: (dialogHeight - 170) + 'px'}">
            <ThumbnailsGis></ThumbnailsGis>
          </el-scrollbar>
        </template>
      </select-dialog>
    </my-dialog>
  </apply-form-item>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import MyDialog from '@/components/commons/MyDialog'
import SelectDialog from '@/components/commons/SelectDialog'
import Thumbnails from '@/components/business/ApplyForDialog/ThumbnailsGisDialog'
import ThumbnailsGis from '@/components/business/ApplyForDialog/ThumbnailsGisDialog/ThumbnailsGis'

export default {
  components: {
    ApplyFormItem,
    MyDialog,
    SelectDialog,
    Thumbnails,
    ThumbnailsGis
  },
  data() {
    return {
      dialogFormThumbnailsGis: false,
      form: {
        bussinessTheme: '1',
        typeCode: '2',
        publicType: '依申请公开',
        num: '网审190620001号',
        documentNo_partOne: '文物保函',
        documentNo_partTwo: '2019',
        documentNo_partThree: '10',
        fenfa_partOne: '11',
        fenfa_partTwo: '13',
        huanji: '',
        ngdw: '文物保护与考古司 资源管理处',
        ngr: '聂凯月',
        tel: '56792082',
        title:
          '国家文物局关于湖北省2020年度全国重点文物保护单位文物保护项目（不含安防消防防雷）计划的批复',
        zs: '湖北省文化和旅游厅',
        cs: '本局办公室',
        jnhq: '',
        gz: '局章',
        gzlx: '文物局发文',
        qf: '宋新潮',
        qfTime: '2019-10-16',
        approvalResult: '1'
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
      pageTabsData1: {
        tabs: [
          { title: '单位地图', num: '' },
          { title: '批复文件', num: '' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    testClick() {
      this.dialogFormThumbnailsGis = true
    },
    handleSelect(key) {
      this.selectMenuItem = key
    }
  },
  computed: {
    // 弹出框
    dialogHeight: function() {
      return this.$store.getters.screenHeight > 600
        ? 600
        : this.$store.getters.screenHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.approvelInfo {
  .el-container {
    .title {
      position: relative;
      .titleLine {
        position: absolute;
        left: 50%;
        bottom: -5px;
        transform: translate(-50%, 0);
        background-color: $--color-primary;
        width: 70px;
        height: 3px;
      }
    }
    text-align: center;
    border: 1px solid #ccc;
    /deep/.el-main {
      padding: 0px 10px;
      .redLabel .el-form-item__label {
        color: red !important;
      }
      th {
        background-color: $--color-plain-hover;
        height: 30px;
        color: gray;
      }
      .labelZero {
        .el-form-item__content {
          margin-left: 0px !important;
        }
      }
      .inpuWidthBox {
        width: 100%;
      }
      .inpuWidth {
        width: calc(100% - 40px) !important;
      }
      h4 {
        margin: 10px;
      }
      // .scroll_main {
      //   height: 900px;
      // }
      .el-divider {
        background-color: red;
        margin: 0;
        margin-bottom: 18px;
      }
    }
    .el-aside {
      h4 {
        margin: 10px;
      }
      padding: 0 10px;
      .asideCard {
        border: 1px solid #ccc;
        h5 {
          margin: 10px;
        }

        .smallCard {
          height: 200px;
          margin: 8px;
          .scroll_aside {
            height: 204px;
            box-sizing: border-box;
            .liItem {
              margin-top: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
