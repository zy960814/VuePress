<template>
  <div class="appllist">
    <el-card class="box-card">
      <el-container>
        <el-header class="header_style">
          <span>请选择行政许可申请事项</span>
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
              <el-table-column prop="eventCode" label="事项编码" min-width="80"></el-table-column>
              <el-table-column prop="eventName" label="事项名称" min-width="172">
                <template slot-scope="scope">
                  <el-link type="primary" @click="diaShow" class="outerLink">{{scope.row.eventName}}</el-link>
                  <!-- <el-link
                    type="primary"
                    @click="diaShow"
                    class="outerLink"
                    v-if="scope.row.eventName.hasOwnProperty('link')"
                  >{{scope.row.eventName.link}}</el-link>
                  <p
                    style="margin-left: 10px;"
                    v-if="scope.row.eventName.hasOwnProperty('explain')"
                  >{{ scope.row.eventName.explain}}</p>-->
                </template>
              </el-table-column>
              <el-table-column prop="acceptInstitution" label="受理机构" min-width="120"></el-table-column>
              <el-table-column prop="processTime" label="办理时限" min-width="140"></el-table-column>
              <el-table-column prop="applySubject" label="申报主体" min-width="110"></el-table-column>
              <el-table-column prop="applyType" label="申报类型" min-width="155"></el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                min-width="200"
                fixed="right"
                :resizable="false"
              >
                <template slot-scope="scope">
                  <!-- <el-button
                    type="primary"
                    class="operativeButton"
                    plain
                    size="mini"
                    @click="personApplyBtnClick(scope.$index)"
                    v-if="scope.row.operate.hasOwnProperty('personApplyButton')"
                  >{{scope.row.operate.personApplyButton}}</el-button>
                  <el-button
                    type="primary"
                    class="operativeButton"
                    plain
                    size="mini"
                    @click="showApplyBtnClick(scope.$index)"
                    v-if="scope.row.operate.hasOwnProperty('showApplyBtton')"
                  >{{scope.row.operate.showApplyBtton}}</el-button>
                  <el-button
                    type="primary"
                    class="operativeButton"
                    plain
                    size="mini"
                    @click="applyBtnClick(scope.$index)"
                    v-if="scope.row.operate.hasOwnProperty('applyBtton')"
                  >{{scope.row.operate.applyBtton}}</el-button>-->
                  <template v-for="(item,i) in scope.row.operate">
                    <span v-if="scope.row.eventCode==='56003'" :key="i">{{item}}</span>
                    <table-button
                      v-else
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
      <!-- 申请弹出框 -->
      <!-- Table -->
      <el-dialog :visible.sync="dialogTableVisible" center class="event_dialog">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clear-float">
            <span style="font-size:15px;font-weight:700;">文物出境许可</span>
            <el-button class="printButton">打印</el-button>
          </div>
          <!-- 切换按钮 -->
          <el-row class="wenWuMenu">
            <el-menu
              :default-active="activeIndex"
              class="clear-float"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">
                <el-link :underline="false" class="wenwuItem" href="#basicMessage">基本信息</el-link>
              </el-menu-item>

              <li class="liLine"></li>
              <el-menu-item index="2">
                <el-link class="wenwuItem" href="#handleProcess" :underline="false">办理流程</el-link>
              </el-menu-item>
              <li class="liLine"></li>
              <el-menu-item index="3">
                <el-link class="wenwuItem" href="#handleMaterial" :underline="false">办理材料目录</el-link>
              </el-menu-item>
              <li class="liLine"></li>
              <el-menu-item index="4">
                <el-link class="wenwuItem" href="#acceptCondition" :underline="false">受理条件</el-link>
              </el-menu-item>
              <li class="liLine"></li>
              <el-menu-item index="5">
                <el-link class="wenwuItem" href="#forbidenDemaind" :underline="false">禁止性要求</el-link>
              </el-menu-item>
              <li class="liLine"></li>
              <el-menu-item index="6">
                <el-link class="wenwuItem" href="#chargeStandard" :underline="false">收费标准</el-link>
              </el-menu-item>
              <li class="liLine"></li>
              <el-menu-item index="7">
                <el-link class="wenwuItem" href="#setBasic" :underline="false">设定依据</el-link>
              </el-menu-item>
              <li class="liLine"></li>
              <el-menu-item index="8">
                <el-link class="wenwuItem" href="#commonProblem" :underline="false">常见问题</el-link>
              </el-menu-item>
            </el-menu>
          </el-row>

          <div class="dialogcard_scoll">
            <a name="basicMessage"></a>
            <div class="dialogcard_content">
              <el-row class="basicMessage">
                <span>基本信息</span>
              </el-row>
              <vertical-tablef :dataArray="dataArray" width="150px"></vertical-tablef>
              <a name="handleProcess"></a>
              <el-row class="basicMessage clear-float">
                <span class="fl">办理流程</span>
                <el-link type="primary" class="fr" @click="jump">查看流程图</el-link>
              </el-row>
              <el-row style="border:1px solid #f2f2f2;">
                <p class="orderP" style="text-indent:30px;">
                  申报人登录国家文物进出境审核信息管理系统（系统设置在国家文物局政府网站业务平台版块，网址：http://
                  www.sach.gov.cn），填写文物出境申请信息；国家文物进出境审核管理处对文物进行实物审核，对许可出境的文物颁发《文物出境许可证》，并在许可出境文物上标明相应的电子标签，对不予许可出境的文物出具《文物禁止出境登记表》，并将不予许可出境文物发还申报人。
                </p>
              </el-row>
              <a name="handleMaterial"></a>
              <el-row class="basicMessage">
                <span>办理材料目录</span>
              </el-row>
              <el-table
                class="innerTable"
                size="medium"
                :data="tableDataDialog"
                :span-method="arraySpanMethodDialog"
                border
                :fit="true"
                ref="table"
              >
                <el-table-column
                  prop="materialName"
                  label="材料名称"
                  min-width="165;"
                  :resizable="false"
                ></el-table-column>
                <el-table-column label="材料填写样本" min-width="165;" :resizable="false">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      class="operativeButton"
                      plain
                      size="mini"
                      v-if="scope.row.materialPrototype!=='--'"
                    >{{scope.row.materialPrototype}}</el-button>
                    <span v-else>{{scope.row.materialPrototype}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="originWay" label="来源渠道" min-width="168;" :resizable="false"></el-table-column>
                <el-table-column
                  prop="paperMaterial"
                  label="纸质材料"
                  min-width="168;"
                  :resizable="false"
                ></el-table-column>
                <el-table-column
                  prop="paperNecessary"
                  label="材料必要性"
                  min-width="170;"
                  :resizable="false"
                ></el-table-column>
              </el-table>
              <a name="forbidenDemaind"></a>
              <el-row class="basicMessage">
                <span>禁止性要求</span>
              </el-row>
              <el-row style="border:1px solid #f2f2f2;">
                <p
                  class="forbidenP"
                >1、凡在1949年以前（含1949年）生产、制作的具有一定历史、艺术、科学价值的文物，原则上禁止出境。其中，1911年以前（含1911年）生产、制作的文物一律禁止出境。</p>
                <p class="forbidenP">2、凡在1966年以前（含1966年）生产、制作的有代表性的少数民族文物禁止出境。</p>
                <p class="forbidenP">3、现存我国境内的外国文物、图书，与我国的文物、图书一样，分类执行本标准。</p>
                <p class="forbidenP">4、凡有损国家、民族利益，或者有可能引起不良社会影响的文物，不论年限，一律禁止出境。</p>
                <p class="forbidenP">5、未列入本标准范围之内的文物，如经文物进出境审核机构审核，确有重大历史、艺术、科学价值的，应禁止出境。</p>
              </el-row>
              <a name="acceptCondition"></a>
              <el-row class="basicMessage">
                <span>受理条件</span>
              </el-row>
              <el-row style="border:1px solid #f2f2f2;">
                <p class="orderP">申请人具备申请条件，申请材料齐全，符合法定形式</p>
              </el-row>
              <a name="chargeStandard"></a>
              <el-row class="basicMessage">
                <span>收费标准</span>
              </el-row>
              <el-row style="border:1px solid #f2f2f2;">
                <p class="orderP">不收取费用</p>
              </el-row>
              <a name="setBasic"></a>
              <el-row class="basicMessage">
                <span>设定依据</span>
              </el-row>
              <el-row style="border:1px solid #f2f2f2;">
                <p
                  class="forbidenP"
                  style="text-indent:20px;"
                >《中华人民共和国文物保护法》第六十一条：“文物出境，应当经国务院文物行政部门指定的文物进出境审核机构审核。经审核允许出境的文物，由国务院文物行政部门发给文物出境许可证，从国务院文物行政部门指定的口岸出境。</p>
                <p
                  class="forbidenP"
                  style="text-indent:20px;"
                >任何单位或者个人运送、邮寄、携带文物出境，应当向海关申报；海关凭文物出境许可证放行。</p>
                <p class="forbidenP" style="text-indent:20px;">
                  《中华人民共和国文物保护法实施条例》第四十五条：“运送、邮寄、携带文物出境，应当在文物出境前依法报文物进出境审核机构审核。文物进出境审核
                  机构应当自收到申请之日起15个工作日内作出是否允许出境的决定。
                </p>
                <p
                  class="forbidenP"
                  style="text-indent:20px;"
                >文物进出境审核机构审核文物，应当有3名以上文物博物专业技术人员参加；其中，应当有2名以上文物进出境责任鉴定员。</p>
                <p
                  class="forbidenP"
                  style="text-indent:20px;"
                >文物出境审核意见，由文物进出境责任鉴定员共同签署；对经审核，文物进出境责任鉴定员一致同意允许出境的文物，文物进出境审核机构方可作出允许出境的决定。</p>
                <p class="forbidenP" style="text-indent:20px;">文物出境审核标准，由国务院文物行政主管部门制定。”</p>
                <p class="forbidenP" style="text-indent:20px;">
                  《中华人民共和国文物保护法实施条例》第四十七条：“经审核允许出境的文物，由国务院文物行政主管部门发给文物出境许可证，并由文物进出境审核机构标明文物出境标识。经审核允许出境的文物，应当从国务院文物行政主管部门指定的口岸出境。海关查验文物出境标识后，凭文物出境许可证放行。
                  经审核不允许出境的文物，由文物进出境审核机构发还当事人。”
                </p>
              </el-row>
              <a name="commonProblem"></a>
              <el-row class="basicMessage">
                <span>常见问题</span>
              </el-row>
              <el-row style="border:1px solid #f2f2f2;">
                <p class="forbidenP">一、常见错误示例</p>
                <p class="forbidenP">1.申报人漏填或误填姓名、住址、证件号码、联系方式等重要信息。</p>
                <p class="forbidenP">2.申报人未正确填写出境海关，如A意图于天津海关出境，但出境申请表格中“文物出境海关”一栏误填为北京。</p>
                <p class="forbidenP">3.申报人所填写申报物品名称、年代、质地、数量等信息与实物不符。</p>
                <div style="height:15px;"></div>
                <p class="forbidenP">二、常见问题解答</p>
                <p class="forbidenP">1.文物出境许可如何申报？</p>
                <p
                  class="forbidenP"
                >答：任何单位或者个人申请办理文物出境许可，须通过国家文物进出境审核信息管理系统向文物出境口岸所在省（自治区、直辖市）的国家文物进出境审核管理处进行申报。</p>
                <p class="forbidenP">2.如何登陆国家文物进出境审核信息管理系统？</p>
                <p class="forbidenP">
                  答：申报人可登录国家文物局网站（http://sach.gov.cn），在业务平台选择系统链接登录系统，也可直接通过域名（http://
                  jcj.sach.gov.cn）登录系统，按系统要求填写申请信息并提交。
                </p>
                <p class="forbidenP">3.通过系统提交申请信息后该如何办理下一步手续？</p>
                <p
                  class="forbidenP"
                >答：国家文物进出境审核管理处收到文物出境许可申请后，将通过系统消息告知申报人办理时间，申报人需按要求携带所申报文物、申报人身份文件和申请表到该管理处办理相关手续。</p>
                <p class="forbidenP">4.允许出境的文物如何办理通关手续？</p>
                <p
                  class="forbidenP"
                >答：对经审核允许出境的文物，国家文物进出境审核管理处在发给文物出境许可证的同时，将在文物上标明文物出境标识。海关查验文物出境标识后，凭文物出境许可证放行。</p>
                <p class="forbidenP">5.不允许出境的文物如何处理？</p>
                <p class="forbidenP">答：对经审核不允许出境的文物，由国家文物进出境审核管理处发还当事人。</p>
                <p class="forbidenP">6.临时进境的文物为何要办理审核登记手续？</p>
                <p class="forbidenP">
                  答：临时进境的文物不强制要求办理审核登记手续，但办理了临时进境登记手续的文物，在六个月内申报文物复出境许可，不受文物出境审核标准的限制。
                  7.临时进境文物在申请复出境时，是否必须由审核机构进行审核？
                </p>
                <p
                  class="forbidenP"
                >答：临时进境的文物复出境，必须经原审核、登记的国家文物进出境审核管理处审核查验，审核查验无误后，方由管理处可发给文物出境许可证。</p>
                <p class="forbidenP">8.邮寄文物出境是否不需要经过文物出境审批？</p>
                <p
                  class="forbidenP"
                >答：任何单位或者个人运送、邮寄、携带文物出境，都应当向海关申报，邮寄文物出境和携运、运送文物出境等同管理，都必须经过国家文物进出境审核管理处审核。</p>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import VerticalTablef from '@/components/commons/VerticalTablef'
import TableButton from '@/components/commons/TableButton'

export default {
  components: {
    VerticalTablef,
    TableButton
  },

  data() {
    return {
      payLoads: '',
      // 弹出框中表格复用组件的数据
      dataArray: [],
      // 竖形表格数据
      basicMessage: {
        // 事项类型
        eventType: '行政许可',
        // 办件类型
        handleType: '承诺件',
        // 实施主体
        implementationSubject: '国家文物局',
        // 行政层级
        administration: '国家级',
        // 决定机构
        decisionOrganization: '国家文物局（国家文物进出境审核管理处）',
        // 审查类型
        examineType: '前审后批',
        // 申请主体
        applySubject: '运送、邮寄、携带文物出境单位或个人',
        // 受理机构
        receiveOrgan: '国家文物进出境审核管理处',
        // 承诺办结时限
        promiseTime: '15个工作日',
        // 法定办结时限
        specifiedTime: '15个工作日',
        // 是否收费
        isCharge: '否',
        // 到办事现场次数
        frequency: '1次',
        // 数量限制
        numLimit: '无数量限制',
        // 适用范围
        suitScope: '任何单位或个人运送、邮寄、携带文物出境',
        // 审批结果及送达方式
        resultAndType: '许可证，现场送达',
        // 办理进程和结果查询
        orderAndResult: '各相关省（市）文物进出境管理处',
        // 咨询方式
        consult:
          '各相关省（市）文物进出境管理处：北京010-64014608      天津022-23396363     河北0311-85286812     上海021-64045311      江苏025-84841206      浙江0571-87081576 安徽0551-62827802   福建0591-87118174   山东0531-85058187      河南0371-65963945   湖北027-65399532      广东020-87047165 云南0871-67204783   陕西029-85360103     辽宁024-24846318         四川028-86120526     山西0351-5687506      内蒙古0471-4608271 西藏0891-6826335     海南0898-66987097   重庆023-63679223',
        // 监管投诉渠道
        superviseChannel: '国家文物局办公室 010-56792211',
        // 办理时间
        handleTime:
          '办公时间：每周一至周五（节假日除外，具体办理时间以预约为准）',
        // 办理地点
        handlePlace: '各相关省（市）文物进出境管理处'
      },
      // 横向表格数据
      tableDataDialog: [
        {
          materialName: '一、通过国家文物局综合行政管理平台提供的材料',
          materialPrototype: '',
          originWay: '',
          paperMaterial: '',
          paperNecessary: ''
        },
        {
          materialName: '文物基本信息',
          materialPrototype: '--',
          originWay: '申请人自备',
          paperMaterial: '0份',
          paperNecessary: '必要'
        },
        {
          materialName: '文物照片',
          materialPrototype: '--',
          originWay: '申请人自备',
          paperMaterial: '0份',
          paperNecessary: '必要'
        },
        {
          materialName: '携运人身份',
          materialPrototype: '--',
          originWay: '申请人自备',
          paperMaterial: '0份',
          paperNecessary: '必要'
        },
        {
          materialName: '二、实物审核时提供的材料',
          materialPrototype: '',
          originWay: '',
          paperMaterial: '',
          paperNecessary: ''
        },
        {
          materialName: '文物实物',
          materialPrototype: '--',
          originWay: '申请人自备',
          paperMaterial: '0份',
          paperNecessary: '必要'
        },
        {
          materialName: '携运人身份证明文件',
          materialPrototype: '--',
          originWay: '申请人自备',
          paperMaterial: '0份',
          paperNecessary: '必要'
        },
        {
          materialName: '申请表',
          materialPrototype: '样本下载',
          originWay: '系统提供',
          paperMaterial: '0份',
          paperNecessary: '必要'
        }
      ],
      //切换按钮默认激活项
      activeIndex: '1',
      // 外部表格数据
      tableData: [
        // 第一行
        {
          eventCode: '56004',
          eventName: '全国重点文物保护单位原址保护措施审批',
          acceptInstitution: '国家文物局',
          processTime: '20个工作日（委托评估、专家评审时间除外）',
          applySubject: '项目建设单位',
          applyType: '--',
          operate: ['申请']
        },
        //第二行
        {
          eventCode: '56005',
          eventName:
            '省级和全国重点文物保护单位保护范围内其他建设工程或者爆破、钻探、挖掘等作业审批',
          acceptInstitution: '国家文物局',
          processTime: '20个工作日（委托评估、专家评审时间除外）',
          applySubject: '项目所在地省级人民政府',
          applyType: '--',
          operate: ['申请']
        },
        // 第三行
        {
          eventCode: '56008',
          eventName: '考古发掘计划许可',
          acceptInstitution: '国家文物局',
          processTime:
            '30个工作日（征求社会科学研究机构及其他科研机构和有关专家意见所需时间除外）',
          applySubject: '考古发掘项目实施单位',
          applyType: '重大事项：考古工作方案或规划',
          operate: ['申请']
        },
        {
          eventCode: '56008',
          eventName: '考古发掘计划许可',
          acceptInstitution: '国家文物局',
          processTime:
            '30个工作日（征求社会科学研究机构及其他科研机构和有关专家意见所需时间除外）',
          applySubject: '考古发掘项目负责人',
          applyType: '一般事项',
          operate: ['申请']
        },
        //第四行
        {
          eventCode: '56009',
          eventName: '水下文物的考古勘探和发掘活动许可',
          acceptInstitution: '国家文物局',
          processTime:
            '30个工作日（征求社会科学研究机构及其他科研机构和有关专家意见所需时间除外）',
          applySubject: '水下考古勘探和发掘实施单位',
          applyType: '--',
          operate: ['申请']
        },
        // 第五行
        {
          eventCode: '56010',
          eventName: '省级文物保护单位的迁移或拆除审批',
          acceptInstitution: '国家文物局',
          processTime: '20个工作日（委托评估、专家评审时间除外）',
          applySubject: '项目所在地省级人民政府',
          applyType: '--',
          operate: ['申请']
        },

        // 第六行

        {
          eventCode: '56012',
          eventName: '全国重点文物保护单位建设控制地带内建设工程设计方案审批',
          acceptInstitution: '国家文物局',
          processTime: '20个工作日（委托评估、专家评审时间除外）',
          applySubject: '项目建设单位',
          applyType: '--',
          operate: ['申请']
        },
        // 第七行
        {
          eventCode: '56013',
          eventName:
            '国际合作考古调查、勘探、发掘的文物或自然标本送到境外进行分析化验或技术鉴定许可',
          acceptInstitution: '国家文物局',
          processTime:
            '20个工作日（征求社会科学研究机构及其他科研机构和有关专家意见所需时间除外）',
          applySubject: '考古发掘单位',
          applyType: '--',
          operate: ['申请']
        },
        // 第八行
        {
          eventCode: '56014',
          eventName: '全国重点文物保护单位修缮审批 ',
          acceptInstitution: '国家文物局或者文物局委托的省级文物行政部门',
          processTime: '20个工作日（委托评估、专家评审时间除外）',
          applySubject: '全国重点文物保护单位管理机构或者所有人',
          applyType: '全国重点文物保护单位修缮项目审批',
          operate: ['申请']
        },
        {
          eventCode: '56014',
          eventName: '全国重点文物保护单位修缮审批 ',
          acceptInstitution: '国家文物局或者文物局委托的省级文物行政部门',
          processTime: '20个工作日（委托评估、专家评审时间除外）',
          applySubject: '全国重点文物保护单位管理机构或者产权单位',
          applyType: '全国重点文物保护单位安全防护工程项目审批',
          operate: ['申请']
        },
        // 第九行
        {
          eventCode: '56022',
          eventName: '全国重点文物保护单位保护规划审批',
          acceptInstitution: '国家文物局',
          processTime: '不限时',
          applySubject: '全国重点文物保护单位管理机构或者产权单位',
          applyType: '国家文物局审批事项',
          operate: ['申请']
        },
        {
          eventCode: '56022',
          eventName: '全国重点文物保护单位保护规划审批',
          acceptInstitution: '国家文物局',
          processTime: '不限时',
          applySubject: '全国重点文物保护单位管理机构或者产权单位',
          applyType: '省级文物局审批事项',
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
            '2': [2, 1],
            '4': [1, 1],
            '5': [1, 1],
            '6': [1, 1],
            '7': [1, 1],
            '8': [2, 1],
            '10': [2, 1]
          }
        },
        {
          columnIndex: 1,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [2, 1],
            '4': [1, 1],
            '5': [1, 1],
            '6': [1, 1],
            '7': [1, 1],
            '8': [2, 1],
            '10': [2, 1]
          }
        },
        {
          columnIndex: 2,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [2, 1],
            '4': [1, 1],
            '5': [1, 1],
            '6': [1, 1],
            '7': [1, 1],
            '8': [2, 1],
            '10': [2, 1]
          }
        },
        {
          columnIndex: 3,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [2, 1],
            '4': [1, 1],
            '5': [1, 1],
            '6': [1, 1],
            '7': [1, 1],
            '8': [2, 1],
            '10': [2, 1]
          }
        },
        {
          columnIndex: 4,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [1, 1],
            '3': [1, 1],
            '4': [1, 1],
            '5': [1, 1],
            '6': [1, 1],
            '7': [1, 1],
            '8': [1, 1],
            '9': [1, 1],
            '10': [2, 1]
          }
        },
        {
          columnIndex: 5,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [1, 1],
            '3': [1, 1],
            '4': [1, 1],
            '5': [1, 1],
            '6': [1, 1],
            '7': [1, 1],
            '8': [1, 1],
            '9': [1, 1],
            '10': [1, 1],
            '11': [1, 1]
          }
        },
        {
          columnIndex: 6,
          colapseArr: {
            '0': [1, 1],
            '1': [1, 1],
            '2': [1, 1],
            '3': [1, 1],
            '4': [1, 1],
            '5': [1, 1],
            '6': [1, 1],
            '7': [1, 1],
            '8': [1, 1],
            '9': [1, 1],
            '10': [1, 1],
            '11': [1, 1]
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

      // if (columnIndex === 0) {
      //   if (rowIndex === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     }
      //   }
      // }
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

      // if (columnIndex === 1) {
      //   if (rowIndex === 0) {
      //     return [3, 1]
      //   } else if (rowIndex === 3) {
      //     return [1, 1]
      //   } else if (rowIndex === 4) {
      //     return [1, 1]
      //   } else {
      //     return [0, 0]
      //   }
      // }
      // if (columnIndex === 2) {
      //   if (rowIndex === 0) {
      //     return [3, 1]
      //   } else if (rowIndex === 3) {
      //     return [1, 1]
      //   } else if (rowIndex === 4) {
      //     return [1, 1]
      //   } else {
      //     return [0, 0]
      //   }
      // }
      // if (
      //   columnIndex !== 3 &&
      //   columnIndex !== 4 &&
      //   columnIndex !== 5 &&
      //   columnIndex !== 6
      // ) {
      //   if (rowIndex === 0) {
      //     return [3, 1]
      //   } else {
      //     return [0, 0]
      //   }
      // }
      // if (columnIndex !== 5 && columnIndex !== 6) {
      //   if (columnIndex !== 0) {
      //     if (rowIndex % 5 === 0) {
      //       if (rowIndex !== 10) {
      //         return [5, 1]
      //       } else {
      //         return [2, 1]
      //       }
      //     } else {
      //       return [0, 0]
      //     }
      //   } else {
      //     //第一列合并行
      //     if (rowIndex === 0) {
      //       return [5, 1]
      //     } else if (rowIndex === 5) {
      //       return [7, 1]
      //     } else {
      //       return [0, 0]
      //     }
      //   }
      // }
    },
    // // 个人申请按钮点击事件
    // personApplyBtnClick(rowIndex) {
    //   switch (rowIndex) {
    //     case 0:
    //       this.$router.push(
    //         '/personal/schedule/56020/temp-entry/personal-carry-apply'
    //       )
    //       break
    //   }
    // },
    // // 展览申请按钮点击事件
    // showApplyBtnClick(rowIndex) {
    //   switch (rowIndex) {
    //     case 0:
    //       this.$router.push(
    //         '/personal/schedule/56020/temp-entry/exhibition-apply'
    //       )
    //       break
    //   }
    // },
    // // 申请按钮点击事件
    // applyBtnClick(rowIndex) {
    //   console.log(rowIndex)
    // },
    // 按钮点击事件
    btnClick(type) {
      // console.log(type)
      switch (type) {
        case '00':
          this.$router.push('/personal/schedule/56004')
          break
        case '10':
          this.$router.push('/personal/schedule/56005')
          break
        case '20':
          this.$router.push('/personal/schedule/56008/majorMatter')
          break
        case '30':
          this.$router.push('/personal/schedule/56008/commonMatter')
          break
        case '40':
          this.$router.push('/personal/schedule/56009')
          break
        case '50':
          this.$router.push('/personal/schedule/56010')
          break
        case '60':
          this.$router.push('/personal/schedule/56012')
          break
        case '70':
          this.$router.push('/personal/schedule/56013')
          break
        case '80':
          this.$router.push('/personal/schedule/56014/56014_a')
          break
        case '90':
          this.$router.push('/personal/schedule/56014/56014_b')
          break
        case '100':
          this.$router.push('/personal/schedule/56022/n_protectPlan')
          break
        case '110':
          this.$router.push('/personal/schedule/56022/p_protectPlan')
          break
        default:
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
    jump() {
      this.dialogTableVisible = false
      this.$router.push('/personal/admin-apply/handleProcess')
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
