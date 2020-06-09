<template>
  <div>
    <table-opt-menu :data="tableOptMenu" @item-click="itemClick" style="margin: 5px 0">
    </table-opt-menu>
    <el-table :data="tableData" border stripe :height="tableHeight">
      <el-table-column
          prop="appr_inst_name"
          align="center"
          label="序号">
      </el-table-column>
      <el-table-column
          prop="provinceName"
          align="center"
          label="省份">
      </el-table-column>
      <el-table-column
          align="center"
          label="性质">
        <el-table-column
            prop="ww"
            align="center"
            label="文物">
        </el-table-column>
        <el-table-column
            prop="hy"
            align="center"
            label="行业">
        </el-table-column>
        <el-table-column
            prop="fgy"
            align="center"
            label="非国有">
        </el-table-column>
      </el-table-column>
      <el-table-column
          align="center"
          label="质量等级">
        <el-table-column
            prop="yj"
            align="center"
            label="一级">
        </el-table-column>
        <el-table-column
            prop="ej"
            align="center"
            label="二级">
        </el-table-column>
        <el-table-column
            prop="sj"
            align="center"
            label="三级">
        </el-table-column>
        <el-table-column
            prop="wjb"
            align="center"
            class-name="add_right_border"
            label="无级别">
        </el-table-column>
      </el-table-column>
      <el-table-column
          prop="cps"
          align="center"
          min-width="90"
          label="藏品数（件/套）">
      </el-table-column>
      <el-table-column
          prop="zgww"
          align="center"
          min-width="90"
          label="珍贵文物（件/套）">
      </el-table-column>
      <el-table-column
          prop="zlsl"
          align="center"
          label="展览数量（个）">
      </el-table-column>
      <el-table-column
          prop="jyhd"
          align="center"
          label="教育活动（次）">
      </el-table-column>
      <el-table-column
          prop="cgrs"
          align="center"
          min-width="95"
          label="参观人数（万人次）">
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
