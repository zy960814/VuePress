<template>
  <div class="list">
    <el-card class="box-card" v-for="(item,index) in cardDetail" :key="index">
      <div slot="header" class="clear-float" style="color:black;">
        <span style="float:left;font-size:16px;">专家：{{item.expert}}</span>
        <div class="titleLeft clear-float" style="float:right;font-size:14px;color:gray;">
          <span class="fl">{{item.receiveTime}}</span>
          <span class="fl primaryColor">|</span>
          <span class="fl">
            停留时间:
            <span class="primaryColor">{{item.stayTime}}</span>
          </span>
        </div>
      </div>
      <div>
        <div class="listItem">
          <p class="listTitle">建控要求:</p>
          <p style="flex:8">{{item.command}}</p>
        </div>
        <el-divider></el-divider>
        <div class="listItem">
          <p class="listTitle">相关资料图纸:</p>
          <p style="flex:8">{{item.paper}}</p>
        </div>
        <el-divider></el-divider>
        <div class="listItem">
          <p class="listTitle">设计说明:</p>
          <p style="flex:8">{{item.instroduction}}</p>
        </div>

        <el-divider></el-divider>
        <div class="listItem">
          <p class="listTitle">评审意见:</p>
          <p style="flex:8">{{item.opinion}}</p>
        </div>
        <el-divider></el-divider>
        <div class="listItem">
          <p class="listTitle">评审结论:</p>
          <p style="flex:8">{{item.result}}</p>
        </div>
        <el-divider></el-divider>
        <div class="listItem">
          <p class="listTitle">备注:</p>
          <p style="flex:8">{{item.remarks}}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    cardDetail: {
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>

<style  lang="scss" scoped>
/deep/.el-card__header {
  background-color: $--color-plain-hover;
}
.box-card {
  margin-top: 5px;
  .primaryColor {
    color: $--color-primary;
  }
  .listTitle {
    flex: 1;
    margin-right: 12px;
    text-align: left;
    color: $--color-primary;
    font-size: 16px;
    font-weight: 700;
  }
  .listItem {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
  }
}
</style>
