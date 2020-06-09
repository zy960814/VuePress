<template>
  <div style="padding-top: 10vh; text-align: center">
    <el-button-group>
      <el-button
          v-for="(item, index) in orgCategory"
          :key="index"
          @click="login(item)"
          type="primary"
          size="normal">{{ item.role }}
      </el-button>
    </el-button-group>
    <el-button @click="$router.push('/')" type="success" size="normal" style="margin-left: 20px">进入系统</el-button>
    <el-button @click="exit" type="danger" size="normal" style="margin-left: 20px">清除登录信息</el-button>
    <div style="width: 450px; margin: 40px auto">
      <el-input v-model="userInfo.token" placeholder="Token">
        <el-button type="primary" @click="login(userInfo)" slot="append">写入</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orgCategory: [{
          role: '国家文物局',
          token: '1'
        }, {
          role: '省级文物局',
          token: '2'
        }, {
          role: '文物进出境审核管理处',
          token: '3'
        }, {
          role: '评估机构',
          token: '4'
        }, {
          role: '评审专家',
          token: '5'
        }, {
          role: '海关',
          token: '6'
        }, {
          role: '法人',
          token: '7'
        }, {
          role: '个人',
          token: '8'
        }],
        userInfo: {
          role: '',
          token: ''
        }
      }
    },
    mounted() {

    },
    methods: {
      login(data) {
        this.$store.dispatch('logOut');
        this.$store.dispatch('mockLogin', data.token);
        this.$notify({
          title: data.role,
          message: '登录成功',
          type: 'success'
        });
      },
      exit() {
        this.$store.dispatch('logOut');
        this.$notify({
          title: '清除登录信息',
          message: '登出成功',
          type: 'info'
        });
      }
    }
  }
</script>
