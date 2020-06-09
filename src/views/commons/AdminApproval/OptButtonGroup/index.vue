<template>
  <div>
    <el-button @click="itemClick('save')" type="primary">保存</el-button>
    <el-button @click="itemClick('post')" type="primary">起草发文</el-button>
    <el-button @click="itemClick('sign-off')" type="primary">起草签报</el-button>
    <el-button @click="itemClick('edit')" type="primary">编辑</el-button>
    <el-button @click="itemClick('view')" type="primary">查看</el-button>
    <el-button @click="itemClick('abandon')" type="primary">作废</el-button>
    <el-button @click="itemClick('print')" type="primary">打印</el-button>
    <el-button @click="itemClick('emphasize')" type="primary">套红</el-button>
    <el-button @click="itemClick('signature')" type="primary">签章</el-button>
    <el-button @click="itemClick('before-emphasize')" type="primary">套红前正文</el-button>
    <el-button @click="itemClick('after-emphasize')" type="primary">套红后正文</el-button>
    <el-button @click="itemClick('upload')" type="primary">上传最终稿</el-button>
    <el-button @click="itemClick('send-back')" type="primary">发回拟稿人</el-button>
    <el-button @click="itemClick('review')" type="primary">专家评审</el-button>
    <el-button @click="itemClick('replenish')" type="primary">补请专家</el-button>
    <el-button @click="itemClick('send')" type="primary">发送</el-button>
    <el-button @click="itemClick('trace')" type="primary">表单修改痕迹</el-button>
    <el-button @click="$router.go(-1)">返回</el-button>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    },
    methods: {
      itemClick(evt) {
        this.$emit('item-click', evt);
      }
    }
  }
</script>
