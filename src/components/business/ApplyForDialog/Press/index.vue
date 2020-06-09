<template>
  <div>
    <el-card shadow="never">
      <div slot="header">催办</div>
        <el-scrollbar :style="{height: (dialogHeight - 200) + 'px'}">
          <el-form
            ref="scholar"
            :model="form"
            label-position="left"
            label-width="80px"
            :show-message="false">
            <el-form-item ref="fileUpload" label="催办方式" prop="technologyDocument" class="redStar">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="短信催办"></el-checkbox>
                <el-checkbox label="">平台催办</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item ref="fileUpload" label="意见" prop="technologyDocument" class="redStar">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.textarea2">
              </el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-card>
  </div>
</template>
<script>
// import TableOptMenu from '@/components/commons/TableOptMenu'
export default {
  components: {
  },
  data() {
    return {
      checkList:[],

       // 表单数据
      form: {
        keyWordS: '', //下拉框
        keywords: '', //输入框
        handle: '', //个人待办
        superviseType: '' //监管类型
      },
     
    }
  },
  methods: {
    //表头的序号
    indexMethod(index) {
      return ++index;
    },
    // 搜索按钮
    searchFun() {
      // this.searchWait()
    },
    resetForm( ){

    },
    itemClick(evt) {
      switch (evt) {
        case 'set-up':
          this.headerDialogVisible.flag = true
          break
      }
      console.log(evt)
    },
  },
  computed: {
    dialogHeight() {
      return this.$store.getters.screenHeight > 330
        ?  330
        : this.$store.getters.screenHeight;
    },
  },
}
</script>
<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x:hidden
  }
  .el-upload__tip{
    margin-left: 15px;
  }
  .row_1 {
    display: inline-block;
    margin: 0 auto;

    .keyword {
      width: 540px;
    }
    /deep/ .el-date-editor.el-input__inner {
      width: 260px;
    }

    /deep/ .el-input-group__prepend {
      width: 128px;
      background-color: #fff;

      .el-input__inner {
        width: 131px;
      }
    }

    // /deep/ .el-input__inner {
    //   width: 350px;
    // }
  }
</style>

