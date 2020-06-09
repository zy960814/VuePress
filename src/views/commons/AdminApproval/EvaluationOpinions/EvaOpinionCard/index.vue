<template>
  <div class="content">
    <!-- 专家查看弹框 -->
    <my-dialog
      width="1024px"
      class="boxCard_dialog"
      :height="dialogHeight+'px'"
      :visible.sync="dialogVisible"
    >
      <el-card shadow="never">
        <div slot="header">专家</div>
        <el-scrollbar :style="{height: dialogHeight-138+'px'}">
          <div class="scrollcontent">
            <Expert56004 v-if="applyCode=='56004'" ref="56004"></Expert56004>
            <Expert56005 v-if="applyCode=='56005'" ref="56005"></Expert56005>
            <Expert56008a v-if="applyCode=='56008-a'" ref="56008a"></Expert56008a>
            <Expert56008b v-if="applyCode=='56008-b'" ref="56008b"></Expert56008b>
            <Expert56009 v-if="applyCode=='56009'" ref="56009"></Expert56009>
            <Expert56010 v-if="applyCode=='56010'" ref="56010"></Expert56010>
            <Expert56011a v-if="applyCode=='56011-a'" ref="56011a"></Expert56011a>
            <Expert56011b v-if="applyCode=='56011-b'" ref="56011b"></Expert56011b>
            <Expert56012 v-if="applyCode=='56012'" ref="56012"></Expert56012>
            <Expert56013 v-if="applyCode=='56013'" ref="56013"></Expert56013>
            <Expert560143a v-if="applyCode=='56014-3-a'" ref="560143a"></Expert560143a>
            <Expert560143b v-if="applyCode=='56014-3-b'" ref="560143b"></Expert560143b>
            <Expert56014a v-if="applyCode=='56014-a'" ref="56014a"></Expert56014a>
            <Expert56014b v-if="applyCode=='56014-b'" ref="56014b"></Expert56014b>
            <Expert56014c v-if="applyCode=='56014-c'" ref="56014c"></Expert56014c>
            <Expert56014d v-if="applyCode=='56014-d'" ref="56014d"></Expert56014d>
            <Expert56015a v-if="applyCode=='56015-a'" ref="56015a"></Expert56015a>
            <Expert56015b v-if="applyCode=='56015-b'" ref="56015b"></Expert56015b>
            <Expert56015c v-if="applyCode=='56015-c'" ref="56015c"></Expert56015c>
            <Expert56016 v-if="applyCode=='56016'" ref="56016"></Expert56016>
            <Expert56019 v-if="applyCode=='56019'" ref="56019"></Expert56019>
            <Expert56022a v-if="applyCode=='56022-a'" ref="56022a"></Expert56022a>
            <Expert56022b v-if="applyCode=='56022-b'" ref="56022b"></Expert56022b>
          </div>
        </el-scrollbar>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
    </my-dialog>
    <!-- 催办 -->
    <my-dialog
      width="700px"
      class="boxCard_dialog"
      :height="dialogHeight3+'px'"
      center :visible.sync="dialogFormVisiblePress"
      :append-to-body="true">
      <Press />
      <div class="right">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisiblePress = false">确定</el-button>
          <el-button @click="dialogFormVisiblePress = false">取消</el-button>
        </span>
      </div>
    </my-dialog>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="8" v-for="(item,index) in cardList" :key="index" style="margin-top:8px;">
        <el-card shadow="never">
          <div class="cardTitle clear-float">
            <div
              style="float:left;"
              class="titleName"
              v-if="item.expertType==='会审'"
            >{{item.expertType}}</div>
            <div style="float:left;" class="titleName" v-else>{{item.expertType}}:{{item.expert}}</div>
            <div
              :style="{ color: item.result==='通过'?'green':'red'}"
              style="float:right;"
            >{{item.result}}</div>
          </div>
          <div class="cardContent">
            <p>接收时间:{{item.receiveTime}}</p>
            <p>停留时间:{{item.stayTime}}</p>
          </div>
          <div class="cardButton clear-float">
            <div style="float:left;">
              <el-button
                type="primary"
                v-if="item.flagButtonOne===1"
                @click="see(item.expertType)"
              >查看</el-button>
              <el-button type="primary" @click="see(item.expertType)" v-if="item.flagButtonOne===2">催办</el-button>
              <el-button type="primary" v-if="item.flagButtonOne===3">上传意见</el-button>
            </div>
            <div style="float:right;">
              <el-button type="primary" v-if="item.flagButtonOne===1">下载</el-button>
              <el-button type="primary" v-if="item.flagButtonOne===2">收回</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyDialog from '@/components/commons/MyDialog'
import Expert56004 from '@/components/business/Expert/expert_56004'
import Expert56005 from '@/components/business/Expert/expert_56005'
import Expert56008a from '@/components/business/Expert/expert_56008a'
import Expert56008b from '@/components/business/Expert/expert_56008b'
import Expert56009 from '@/components/business/Expert/expert_56009'
import Expert56010 from '@/components/business/Expert/expert_56010'
import Expert56011a from '@/components/business/Expert/expert_56011a'
import Expert56011b from '@/components/business/Expert/expert_56011b'
import Expert56012 from '@/components/business/Expert/expert_56012'
import Expert56013 from '@/components/business/Expert/expert_56013'
import Expert560143a from '@/components/business/Expert/expert_56014_3a'
import Expert560143b from '@/components/business/Expert/expert_56014_3b'
import Expert56014a from '@/components/business/Expert/expert_56014a'
import Expert56014b from '@/components/business/Expert/expert_56014b'
import Expert56014c from '@/components/business/Expert/expert_56014c'
import Expert56014d from '@/components/business/Expert/expert_56014d'
import Expert56015a from '@/components/business/Expert/expert_56015a'
import Expert56015b from '@/components/business/Expert/expert_56015b'
import Expert56015c from '@/components/business/Expert/expert_56015c'
import Expert56016 from '@/components/business/Expert/expert_56016'
import Expert56019 from '@/components/business/Expert/expert_56019'
import Expert56022a from '@/components/business/Expert/expert_56022a'
import Expert56022b from '@/components/business/Expert/expert_56022b'
import Press from '@/components/business/ApplyForDialog/Press'
export default {
  components: {
    MyDialog,
    Expert56004,
    Expert56005,
    Expert56008a,
    Expert56008b,
    Expert56009,
    Expert56010,
    Expert56011a,
    Expert56011b,
    Expert56012,
    Expert56013,
    Expert560143a,
    Expert560143b,
    Expert56014a,
    Expert56014b,
    Expert56014c,
    Expert56014d,
    Expert56015a,
    Expert56015b,
    Expert56015c,
    Expert56016,
    Expert56019,
    Expert56022a,
    Expert56022b,
    Press
  },
  props: {
    cardList: {
      type: Array
    },
    applyCode: String
  },
  data() {
    return {
      dialogVisible: false,
      dialogFormVisiblePress: false
    }
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 815
        ? 815
        : this.$store.getters.screenHeight
    },
    dialogHeight3() {
      return this.$store.getters.screenHeight > 270
        ? 270
        : this.$store.getters.screenHeight
    }
  },
  mounted() {},
  methods: {
    // 选择按钮弹框确认
    confirm() {
      this.dialogVisible = false
    },
    see(item,type) {
      console.log(item,'item')
      if (type === '专家姓名') {
        this.dialogVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .scrollcontent {
    margin-right: 10px;
  }
  /deep/.el-scrollbar__bar.is-horizontal {
    display: none;
  }
  .el-card {
    .cardTitle {
      .titleName {
        color: $--color-primary;
      }
    }
    .cardContent {
      margin-top: 5px;
      text-align: left;
      font-size: 12px;
    }
    .cardButton {
      margin-top: 5px;
    }
  }
}
  .right /deep/ .el-dialog__footer {
    text-align: right!important;
  }
  .right {
    margin-top: 10px;
    text-align: right
  }
</style>
