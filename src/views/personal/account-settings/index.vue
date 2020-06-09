<template>
  <div>
    <el-card shadow="never" :body-style="{padding: '5px'}" :style="{height: contentHeight}">
      <div slot="header" style="padding-bottom: 10px">账户设置</div>
      <page-tabs :pageTabsData="pageTabsData" @handle-select="handleSelect"></page-tabs>
      <el-button v-if="showButton" type="primary" @click="show" class="fixButton">修改</el-button>
      <div>
        <Essential v-if="radio2 == 1" :showText="showText"></Essential>
        <Password v-if="radio2 == 2"></Password>
        <Contacts v-if="radio2 == 3"></Contacts>
        <language v-if="radio2 == 4"></language>
        <Login v-if="radio2 == 5"></Login>
      </div>
    </el-card>
  </div>
</template>
<script type="text/javascript">
  import Login from '@/components/business/Loginhistory'
  import language from '@/components/business/language'
  import Contacts from '@/components/business/Contacts'
  import Password from '@/components/business/ChangePassword'
  import Essential from '@/components/business/Essential'
  import PageTabs from '@/components/commons/PageTabs'

  export default {
    components: {
      Login,
      PageTabs,
      language,
      Contacts,
      Password,
      Essential
    },
    data() {
      return {
        radio2: '1',
        showText: false,
        showButton: true,
        pageTabsData: {
          tabs: [{
            title: '基本信息',
            num: ''
          }, {
            title: '修改密码',
            num: ''
          }, {
            title: '常用联系人',
            num: ''
          }, {
            title: '业务常用语',
            num: ''
          }, {
            title: '登录历史',
            num: ''
          }]
        },
      }
    },
    computed: {
      contentHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 85 : 85) + 'px)'
      }
    },
    methods: {
      changeUrl(val) {
        console.log(val);
      },
      show() {
        this.$router.push({path: '/personal/account-settings?show=2'})
        this.showText = true
        this.showButton = false
      },
      handleSelect(key) {
        if (key == 1) {
          this.showButton = true
        } else {
          this.showButton = false
        }

        this.radio2 = key
      },
    },
    mounted() {
      if (this.$route.query.show == 1) {
        this.showText = false
        this.showButton = true
      }


    },
    watch: {
      $route(to) {
        if (to.query.show == 1) {
          this.showText = false
          this.showButton = true
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fixButton {
    text-align: right;
    margin: 5px;
  }


</style>

