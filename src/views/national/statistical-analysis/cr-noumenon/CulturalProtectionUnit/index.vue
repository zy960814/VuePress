<template>
  <div>
    <table-opt-menu :data="tableOptMenu" @item-click="itemClick" style="margin: 5px 0">
      <el-select v-model="value" size="mini" placeholder="批次" class="mr-10">
        <el-option label="第一批" value="1"></el-option>
        <el-option label="第二批" value="2"></el-option>
        <el-option label="第三批" value="3"></el-option>
      </el-select>
      <el-select v-model="value" size="mini" placeholder="省份">
        <el-option label="安徽省" value="1"></el-option>
        <el-option label="浙江省" value="2"></el-option>
        <el-option label="海南省" value="3"></el-option>
      </el-select>
    </table-opt-menu>
    <el-table :data="tableData" border stripe :height="tableHeight">
      <el-table-column
          prop="appr_inst_name"
          align="center"
          label="序号">
      </el-table-column>
      <el-table-column
          prop="taoqi"
          align="center"
          label="省份">
      </el-table-column>
      <el-table-column
          prop="ciqi"
          align="center"
          label="古遗址">
      </el-table-column>
      <el-table-column
          prop="boli"
          align="center"
          label="古墓葬">
      </el-table-column>
      <el-table-column
          prop="tongqi"
          align="center"
          label="古建筑">
      </el-table-column>
      <el-table-column
          prop="shiqi"
          align="center"
          label="石窟及石刻">
      </el-table-column>
      <el-table-column
          prop="yuqi"
          align="center"
          label="近现代重要史迹及代表性建筑">
      </el-table-column>
      <el-table-column
          prop="qita"
          align="center"
          label="其他">
      </el-table-column>
      <el-table-column
          prop="total"
          align="center"
          label="合计">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import TableOptMenu from '@/components/commons/TableOptMenu'
  import {print} from '@/utils/common'

  export default {
    components: {
      TableOptMenu
    },
    data() {
      return {
        tableOptMenu: [{
          icon: 'el-icon-top-right',
          text: '导出',
          evt: 'export'
        }, {
          icon: 'el-icon-printer',
          text: '打印',
          evt: 'print'
        }],
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 5
          },
          keyword: ''
        },
        value: ''
      }
    },
    computed: {
      tableHeight: function () {
        return 'calc(100vh - ' + (this.$store.getters.menuStyle === 1 ? 220 : 261) + 'px)'
      }
    },
    mounted() {

    },
    methods: {
      itemClick(evt) {
        switch (evt) {
          case 'print':
            print('printDOMElement');
            break;
          case 'export':
            break;
        }
      },
      search() {

      }
    }
  }
</script>
