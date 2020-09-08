<template>
  <div class="left_menu">
    <el-tooltip v-show="isCollapse" effect="dark" content="展开菜单" placement="right">
      <div class="menu_switch" @click="menuSwitch">
        <i class="el-icon-s-unfold"></i>
      </div>
    </el-tooltip>
    <div v-show="!isCollapse" class="menu_switch" @click="menuSwitch">
      <i class="el-icon-s-fold"></i>
      <span>收起</span>
    </div>
    <el-scrollbar class="menu_list" :style="{ width: (isCollapse ? 64 : 200) + 'px' }">
      <el-menu
          default-active=""
          :collapse-transition="false"
          :collapse="isCollapse">

        <menu-tree :data="$store.getters.menuList"/>

        <!--<template v-for="(item, index) in $store.getters.menuList">
          <el-submenu
              v-if="item.submenu"
              :key="index"
              :index="String(index)">
              <template slot="title">
                <svg-icon icon-class="site" style="margin: 0 10px 0 5px"/>
                &lt;!&ndash;<i class="el-icon-location"></i>&ndash;&gt;
                <span slot="title">{{ item.auth_name }}</span>
              </template>
              <el-menu-item
                  @click="$router.push(subItem.url)"
                  v-for="(subItem, subIndex) in item.submenu"
                  :key="subIndex"
                  :index="String(subIndex)">{{ subItem.auth_name }}</el-menu-item>
          </el-submenu>
          <el-menu-item @click="$router.push(item.url)" v-else :key="index">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.auth_name }}</span>
          </el-menu-item>
        </template>-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import MenuTree from './MenuTree'

  export default {
    name: "LeftMenu",
    components: {
      MenuTree
    },
    data() {
      return {
        isCollapse: false,
        // menuData: [
        //   {
        //     "auth_code": "01010000",
        //     "auth_name": "行政许可",
        //     "auth_type": "menu",
        //     "dis_order": 1010000,
        //     "handle": {},
        //     "id": "01010000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01010100",
        //         "auth_name": "审批事项",
        //         "auth_type": "menu",
        //         "dis_order": 1010100,
        //         "handle": {},
        //         "id": "01010100",
        //         "parentCode": "01010000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01010101",
        //             "auth_name": "待办",
        //             "auth_type": "menu",
        //             "dis_order": 1010101,
        //             "handle": {},
        //             "id": "01010101",
        //             "parentCode": "01010100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01010102",
        //             "auth_name": "已办",
        //             "auth_type": "menu",
        //             "dis_order": 1010102,
        //             "handle": {},
        //             "id": "01010102",
        //             "parentCode": "01010100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01010103",
        //             "auth_name": "主办",
        //             "auth_type": "menu",
        //             "dis_order": 1010103,
        //             "handle": {},
        //             "id": "01010103",
        //             "parentCode": "01010100",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01010200",
        //         "auth_name": "公示公开",
        //         "auth_type": "menu",
        //         "dis_order": 1010200,
        //         "handle": {},
        //         "id": "01010200",
        //         "parentCode": "01010000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01010201",
        //             "auth_name": "内部公示",
        //             "auth_type": "menu",
        //             "dis_order": 1010201,
        //             "handle": {},
        //             "id": "01010201",
        //             "parentCode": "01010200",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01010202",
        //             "auth_name": "办件公开",
        //             "auth_type": "menu",
        //             "dis_order": 1010202,
        //             "handle": {},
        //             "id": "01010202",
        //             "parentCode": "01010200",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01010300",
        //         "auth_name": "查询检索",
        //         "auth_type": "menu",
        //         "dis_order": 1010300,
        //         "handle": {},
        //         "id": "01010300",
        //         "parentCode": "01010000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01010400",
        //         "auth_name": "服务评价",
        //         "auth_type": "menu",
        //         "dis_order": 1010400,
        //         "handle": {},
        //         "id": "01010400",
        //         "parentCode": "01010000",
        //         "parent_name": ""
        //       }
        //     ]
        //   },
        //   {
        //     "auth_code": "01020000",
        //     "auth_name": "行业管理",
        //     "auth_type": "menu",
        //     "dis_order": 1020000,
        //     "handle": {},
        //     "id": "01020000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01020100",
        //         "auth_name": "安全防护年度计划",
        //         "auth_type": "menu",
        //         "dis_order": 1020100,
        //         "handle": {},
        //         "id": "01020100",
        //         "parentCode": "01020000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01020101",
        //             "auth_name": "待办",
        //             "auth_type": "menu",
        //             "dis_order": 1020101,
        //             "handle": {},
        //             "id": "01020101",
        //             "parentCode": "01020100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020102",
        //             "auth_name": "已办",
        //             "auth_type": "menu",
        //             "dis_order": 1020102,
        //             "handle": {},
        //             "id": "01020102",
        //             "parentCode": "01020100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020103",
        //             "auth_name": "主办",
        //             "auth_type": "menu",
        //             "dis_order": 1020103,
        //             "handle": {},
        //             "id": "01020103",
        //             "parentCode": "01020100",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01020200",
        //         "auth_name": "文保修缮年度计划",
        //         "auth_type": "menu",
        //         "dis_order": 1020200,
        //         "handle": {},
        //         "id": "01020200",
        //         "parentCode": "01020000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01020201",
        //             "auth_name": "待办",
        //             "auth_type": "menu",
        //             "dis_order": 1020201,
        //             "handle": {},
        //             "id": "01020201",
        //             "parentCode": "01020200",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020202",
        //             "auth_name": "已办",
        //             "auth_type": "menu",
        //             "dis_order": 1020202,
        //             "handle": {},
        //             "id": "01020202",
        //             "parentCode": "01020200",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020203",
        //             "auth_name": "主办",
        //             "auth_type": "menu",
        //             "dis_order": 1020203,
        //             "handle": {},
        //             "id": "01020203",
        //             "parentCode": "01020200",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01020300",
        //         "auth_name": "保护规划",
        //         "auth_type": "menu",
        //         "dis_order": 1020300,
        //         "handle": {},
        //         "id": "01020300",
        //         "parentCode": "01020000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01020301",
        //             "auth_name": "待办",
        //             "auth_type": "menu",
        //             "dis_order": 1020301,
        //             "handle": {},
        //             "id": "01020301",
        //             "parentCode": "01020300",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020302",
        //             "auth_name": "已办",
        //             "auth_type": "menu",
        //             "dis_order": 1020302,
        //             "handle": {},
        //             "id": "01020302",
        //             "parentCode": "01020300",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020303",
        //             "auth_name": "主办",
        //             "auth_type": "menu",
        //             "dis_order": 1020303,
        //             "handle": {},
        //             "id": "01020303",
        //             "parentCode": "01020300",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01020400",
        //         "auth_name": "查询检索",
        //         "auth_type": "menu",
        //         "dis_order": 1020400,
        //         "handle": {},
        //         "id": "01020400",
        //         "parentCode": "01020000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01020500",
        //         "auth_name": "考古发掘项目管理",
        //         "auth_type": "menu",
        //         "dis_order": 1020500,
        //         "handle": {},
        //         "id": "01020500",
        //         "parentCode": "01020000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01020600",
        //         "auth_name": "资质单位信息审核",
        //         "auth_type": "menu",
        //         "dis_order": 1020600,
        //         "handle": {},
        //         "id": "01020600",
        //         "parentCode": "01020000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01020700",
        //         "auth_name": "备案督办",
        //         "auth_type": "menu",
        //         "dis_order": 1020700,
        //         "handle": {},
        //         "id": "01020700",
        //         "parentCode": "01020000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01020701",
        //             "auth_name": "安全防护项目审批备案",
        //             "auth_type": "menu",
        //             "dis_order": 1020701,
        //             "handle": {},
        //             "id": "01020701",
        //             "parentCode": "01020700",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020702",
        //             "auth_name": "国保单位修缮审批备案",
        //             "auth_type": "menu",
        //             "dis_order": 1020702,
        //             "handle": {},
        //             "id": "01020702",
        //             "parentCode": "01020700",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020703",
        //             "auth_name": "保护规划审批备案",
        //             "auth_type": "menu",
        //             "dis_order": 1020703,
        //             "handle": {},
        //             "id": "01020703",
        //             "parentCode": "01020700",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01020704",
        //             "auth_name": "文物出境许可督办",
        //             "auth_type": "menu",
        //             "dis_order": 1020704,
        //             "handle": {},
        //             "id": "01020704",
        //             "parentCode": "01020700",
        //             "parent_name": ""
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "auth_code": "01030000",
        //     "auth_name": "行业监管",
        //     "auth_type": "menu",
        //     "dis_order": 1030000,
        //     "handle": {},
        //     "id": "01030000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01030100",
        //         "auth_name": "行政执法监管",
        //         "auth_type": "menu",
        //         "dis_order": 1030100,
        //         "handle": {},
        //         "id": "01030100",
        //         "parentCode": "01030000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01030101",
        //             "auth_name": "双随机一公开",
        //             "auth_type": "menu",
        //             "dis_order": 1030101,
        //             "handle": {},
        //             "id": "01030101",
        //             "parentCode": "01030100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01030102",
        //             "auth_name": "联合监管",
        //             "auth_type": "menu",
        //             "dis_order": 1030102,
        //             "handle": {},
        //             "id": "01030102",
        //             "parentCode": "01030100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01030103",
        //             "auth_name": "信用监管",
        //             "auth_type": "menu",
        //             "dis_order": 1030103,
        //             "handle": {},
        //             "id": "01030103",
        //             "parentCode": "01030100",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01030200",
        //         "auth_name": "风险预警",
        //         "auth_type": "menu",
        //         "dis_order": 1030200,
        //         "handle": {},
        //         "id": "01030200",
        //         "parentCode": "01030000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01030300",
        //         "auth_name": "投诉举报处置",
        //         "auth_type": "menu",
        //         "dis_order": 1030300,
        //         "handle": {},
        //         "id": "01030300",
        //         "parentCode": "01030000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01030400",
        //         "auth_name": "综合分析评价",
        //         "auth_type": "menu",
        //         "dis_order": 1030400,
        //         "handle": {},
        //         "id": "01030400",
        //         "parentCode": "01030000",
        //         "parent_name": ""
        //       }
        //     ]
        //   },
        //   {
        //     "auth_code": "01040000",
        //     "auth_name": "电子证照管理",
        //     "auth_type": "menu",
        //     "dis_order": 1040000,
        //     "handle": {},
        //     "id": "01040000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01040100",
        //         "auth_name": "电子证照目录",
        //         "auth_type": "menu",
        //         "dis_order": 1040100,
        //         "handle": {},
        //         "id": "01040100",
        //         "parentCode": "01040000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01040200",
        //         "auth_name": "电子证照查询",
        //         "auth_type": "menu",
        //         "dis_order": 1040200,
        //         "handle": {},
        //         "id": "01040200",
        //         "parentCode": "01040000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01040300",
        //         "auth_name": "模板管理",
        //         "auth_type": "menu",
        //         "dis_order": 1040300,
        //         "handle": {},
        //         "id": "01040300",
        //         "parentCode": "01040000",
        //         "parent_name": ""
        //       }
        //     ]
        //   },
        //   {
        //     "auth_code": "01050000",
        //     "auth_name": "电子印章管理",
        //     "auth_type": "menu",
        //     "dis_order": 1050000,
        //     "handle": {},
        //     "id": "01050000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01050100",
        //         "auth_name": "电子印章制作",
        //         "auth_type": "menu",
        //         "dis_order": 1050100,
        //         "handle": {},
        //         "id": "01050100",
        //         "parentCode": "01050000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01050200",
        //         "auth_name": "电子印章发布",
        //         "auth_type": "menu",
        //         "dis_order": 1050200,
        //         "handle": {},
        //         "id": "01050200",
        //         "parentCode": "01050000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01050300",
        //         "auth_name": "电子印章管理",
        //         "auth_type": "menu",
        //         "dis_order": 1050300,
        //         "handle": {},
        //         "id": "01050300",
        //         "parentCode": "01050000",
        //         "parent_name": ""
        //       }
        //     ]
        //   },
        //   {
        //     "auth_code": "01060000",
        //     "auth_name": "数据共享交换",
        //     "auth_type": "menu",
        //     "dis_order": 1060000,
        //     "handle": {},
        //     "id": "01060000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01060100",
        //         "auth_name": "数据订阅",
        //         "auth_type": "menu",
        //         "dis_order": 1060100,
        //         "handle": {},
        //         "id": "01060100",
        //         "parentCode": "01060000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01060200",
        //         "auth_name": "数据报送",
        //         "auth_type": "menu",
        //         "dis_order": 1060200,
        //         "handle": {},
        //         "id": "01060200",
        //         "parentCode": "01060000",
        //         "parent_name": ""
        //       }
        //     ]
        //   },
        //   {
        //     "auth_code": "01070000",
        //     "auth_name": "统计分析",
        //     "auth_type": "menu",
        //     "dis_order": 1070000,
        //     "handle": {},
        //     "id": "01070000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01070100",
        //         "auth_name": "文物进出境统计",
        //         "auth_type": "menu",
        //         "dis_order": 1070100,
        //         "handle": {},
        //         "id": "01070100",
        //         "parentCode": "01070000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01070101",
        //             "auth_name": "文物临时进境许可失效情况",
        //             "auth_type": "menu",
        //             "dis_order": 1070101,
        //             "handle": {},
        //             "id": "01070101",
        //             "parentCode": "01070100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070102",
        //             "auth_name": "文物临时进境目的情况",
        //             "auth_type": "menu",
        //             "dis_order": 1070102,
        //             "handle": {},
        //             "id": "01070102",
        //             "parentCode": "01070100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070103",
        //             "auth_name": "进出境文物质地情况",
        //             "auth_type": "menu",
        //             "dis_order": 1070103,
        //             "handle": {},
        //             "id": "01070103",
        //             "parentCode": "01070100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070104",
        //             "auth_name": "文物进出境审批情况",
        //             "auth_type": "menu",
        //             "dis_order": 1070104,
        //             "handle": {},
        //             "id": "01070104",
        //             "parentCode": "01070100",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070105",
        //             "auth_name": "进出境文物情况",
        //             "auth_type": "menu",
        //             "dis_order": 1070105,
        //             "handle": {},
        //             "id": "01070105",
        //             "parentCode": "01070100",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01070200",
        //         "auth_name": "审批事项情况统计",
        //         "auth_type": "menu",
        //         "dis_order": 1070200,
        //         "handle": {},
        //         "id": "01070200",
        //         "parentCode": "01070000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01070201",
        //             "auth_name": "国保单位行政审批统计",
        //             "auth_type": "menu",
        //             "dis_order": 1070201,
        //             "handle": {},
        //             "id": "01070201",
        //             "parentCode": "01070200",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070202",
        //             "auth_name": "收藏单位行政审批统计",
        //             "auth_type": "menu",
        //             "dis_order": 1070202,
        //             "handle": {},
        //             "id": "01070202",
        //             "parentCode": "01070200",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01070300",
        //         "auth_name": "日常工作情况统计",
        //         "auth_type": "menu",
        //         "dis_order": 1070300,
        //         "handle": {},
        //         "id": "01070300",
        //         "parentCode": "01070000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01070301",
        //             "auth_name": "国家文物局行政审批统计",
        //             "auth_type": "menu",
        //             "dis_order": 1070301,
        //             "handle": {},
        //             "id": "01070301",
        //             "parentCode": "01070300",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070302",
        //             "auth_name": "委托省级文物局行政审批统计",
        //             "auth_type": "menu",
        //             "dis_order": 1070302,
        //             "handle": {},
        //             "id": "01070302",
        //             "parentCode": "01070300",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01070400",
        //         "auth_name": "审批咨询情况统计",
        //         "auth_type": "menu",
        //         "dis_order": 1070400,
        //         "handle": {},
        //         "id": "01070400",
        //         "parentCode": "01070000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01070401",
        //             "auth_name": "国家文物局行政审批咨询情况",
        //             "auth_type": "menu",
        //             "dis_order": 1070401,
        //             "handle": {},
        //             "id": "01070401",
        //             "parentCode": "01070400",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070402",
        //             "auth_name": "各省文物局行政审批咨询情况",
        //             "auth_type": "menu",
        //             "dis_order": 1070402,
        //             "handle": {},
        //             "id": "01070402",
        //             "parentCode": "01070400",
        //             "parent_name": ""
        //           }
        //         ]
        //       },
        //       {
        //         "auth_code": "01070500",
        //         "auth_name": "文物本体统计",
        //         "auth_type": "menu",
        //         "dis_order": 1070500,
        //         "handle": {},
        //         "id": "01070500",
        //         "parentCode": "01070000",
        //         "parent_name": "",
        //         "submenu": [
        //           {
        //             "auth_code": "01070501",
        //             "auth_name": "全国重点文物保护单位统计",
        //             "auth_type": "menu",
        //             "dis_order": 1070501,
        //             "handle": {},
        //             "id": "01070501",
        //             "parentCode": "01070500",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070502",
        //             "auth_name": "国有馆藏珍贵文物统计",
        //             "auth_type": "menu",
        //             "dis_order": 1070502,
        //             "handle": {},
        //             "id": "01070502",
        //             "parentCode": "01070500",
        //             "parent_name": ""
        //           },
        //           {
        //             "auth_code": "01070503",
        //             "auth_name": "收藏单位情况统计",
        //             "auth_type": "menu",
        //             "dis_order": 1070503,
        //             "handle": {},
        //             "id": "01070503",
        //             "parentCode": "01070500",
        //             "parent_name": ""
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     "auth_code": "01080000",
        //     "auth_name": "基础资料",
        //     "auth_type": "menu",
        //     "dis_order": 1080000,
        //     "handle": {},
        //     "id": "01080000",
        //     "parentCode": "",
        //     "parent_name": "",
        //     "submenu": [
        //       {
        //         "auth_code": "01080100",
        //         "auth_name": "全国重点文物保护单位",
        //         "auth_type": "menu",
        //         "dis_order": 1080100,
        //         "handle": {},
        //         "id": "01080100",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080200",
        //         "auth_name": "馆藏文物",
        //         "auth_type": "menu",
        //         "dis_order": 1080200,
        //         "handle": {},
        //         "id": "01080200",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080300",
        //         "auth_name": "收藏单位",
        //         "auth_type": "menu",
        //         "dis_order": 1080300,
        //         "handle": {},
        //         "id": "01080300",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080400",
        //         "auth_name": "文保工程资质单位",
        //         "auth_type": "menu",
        //         "dis_order": 1080400,
        //         "handle": {},
        //         "id": "01080400",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080500",
        //         "auth_name": "文保工程资质人员",
        //         "auth_type": "menu",
        //         "dis_order": 1080500,
        //         "handle": {},
        //         "id": "01080500",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080600",
        //         "auth_name": "考古发掘资质单位",
        //         "auth_type": "menu",
        //         "dis_order": 1080600,
        //         "handle": {},
        //         "id": "01080600",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080700",
        //         "auth_name": "考古发掘项目负责人",
        //         "auth_type": "menu",
        //         "dis_order": 1080700,
        //         "handle": {},
        //         "id": "01080700",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080800",
        //         "auth_name": "文物商店文物拍卖企业",
        //         "auth_type": "menu",
        //         "dis_order": 1080800,
        //         "handle": {},
        //         "id": "01080800",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01080900",
        //         "auth_name": "涉案文物鉴定评估机构",
        //         "auth_type": "menu",
        //         "dis_order": 1080900,
        //         "handle": {},
        //         "id": "01080900",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081000",
        //         "auth_name": "中国世界遗产",
        //         "auth_type": "menu",
        //         "dis_order": 1081000,
        //         "handle": {},
        //         "id": "01081000",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081100",
        //         "auth_name": "历史文化名城",
        //         "auth_type": "menu",
        //         "dis_order": 1081100,
        //         "handle": {},
        //         "id": "01081100",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081200",
        //         "auth_name": "历史文化名镇",
        //         "auth_type": "menu",
        //         "dis_order": 1081200,
        //         "handle": {},
        //         "id": "01081200",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081300",
        //         "auth_name": "历史文化名村",
        //         "auth_type": "menu",
        //         "dis_order": 1081300,
        //         "handle": {},
        //         "id": "01081300",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081400",
        //         "auth_name": "历史文化街区",
        //         "auth_type": "menu",
        //         "dis_order": 1081400,
        //         "handle": {},
        //         "id": "01081400",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081500",
        //         "auth_name": "外国被盗文物",
        //         "auth_type": "menu",
        //         "dis_order": 1081500,
        //         "handle": {},
        //         "id": "01081500",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081600",
        //         "auth_name": "文物拍卖备案",
        //         "auth_type": "menu",
        //         "dis_order": 1081600,
        //         "handle": {},
        //         "id": "01081600",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081700",
        //         "auth_name": "传统村落",
        //         "auth_type": "menu",
        //         "dis_order": 1081700,
        //         "handle": {},
        //         "id": "01081700",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081800",
        //         "auth_name": "红色旅游",
        //         "auth_type": "menu",
        //         "dis_order": 1081800,
        //         "handle": {},
        //         "id": "01081800",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       },
        //       {
        //         "auth_code": "01081900",
        //         "auth_name": "大遗址",
        //         "auth_type": "menu",
        //         "dis_order": 1081900,
        //         "handle": {},
        //         "id": "01081900",
        //         "parentCode": "01080000",
        //         "parent_name": ""
        //       }
        //     ]
        //   }
        // ]
      };
    },
    methods: {
      menuSwitch() {
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>

<style lang="scss" scoped>

  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .left_menu {
    background-color: #FFF;
    border-right: none;

    .menu_list {
      height: calc(100vh - 110px);

      .el-menu {
        border-right: none;

        /*/deep/ .el-submenu__title, .el-menu-item {
          font-size: 16px;
        }*/
      }
    }

    .menu_switch {
      color: #303133;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 2px #F2F2F2 solid;
      cursor: pointer;

      i {
        margin-left: 3px;
        font-size: 18px;
      }

      span {
        margin-left: 8px;
        font-size: 14px;
      }
    }

    .menu_switch:hover {
      background-color: $--color-plain-hover;
    }
  }
</style>
