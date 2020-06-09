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
          prop="X01"
          align="center"
          label="玉石器、宝石">
      </el-table-column>
      <el-table-column
          prop="X02"
          align="center"
          label="陶器">
      </el-table-column>
      <el-table-column
          prop="X03"
          align="center"
          label="瓷器">
      </el-table-column>
      <el-table-column
          prop="X04"
          align="center"
          label="铜器">
      </el-table-column>
      <el-table-column
          prop="X05"
          align="center"
          label="金银器">
      </el-table-column>
      <el-table-column
          prop="X06"
          align="center"
          label="铁器、其他金属器">
      </el-table-column>
      <el-table-column
          prop="X07"
          align="center"
          label="漆器">
      </el-table-column>
      <el-table-column
          prop="X08"
          align="center"
          label="雕塑、造像">
      </el-table-column>
      <el-table-column
          prop="X09"
          align="center"
          label="石器、石刻、砖瓦">
      </el-table-column>
      <el-table-column
          prop="X10"
          align="center"
          label="书法、绘画">
      </el-table-column>
      <el-table-column
          prop="X11"
          align="center"
          label="文具">
      </el-table-column>
      <el-table-column
          prop="X12"
          align="center"
          label="甲骨">
      </el-table-column>
      <el-table-column
          prop="X13"
          align="center"
          label="玺印符牌">
      </el-table-column>
      <el-table-column
          prop="X14"
          align="center"
          label="钱币">
      </el-table-column>
      <el-table-column
          prop="X15"
          align="center"
          label="牙骨角器">
      </el-table-column>
      <el-table-column
          prop="X16"
          align="center"
          label="竹木雕">
      </el-table-column>
      <el-table-column
          prop="X17"
          align="center"
          label="家具">
      </el-table-column>
      <el-table-column
          prop="X18"
          align="center"
          label="珐琅器">
      </el-table-column>
      <el-table-column
          prop="X19"
          align="center"
          label="织绣">
      </el-table-column>
      <el-table-column
          prop="X20"
          align="center"
          label="古籍图书">
      </el-table-column>
      <el-table-column
          prop="X21"
          align="center"
          label="碑帖拓本">
      </el-table-column>
      <el-table-column
          prop="X22"
          align="center"
          label="武器">
      </el-table-column>
      <el-table-column
          prop="X23"
          align="center"
          label="邮品">
      </el-table-column>
      <el-table-column
          prop="X24"
          align="center"
          label="文件、宣传品">
      </el-table-column>
      <el-table-column
          prop="X25"
          align="center"
          label="档案文书">
      </el-table-column>
      <el-table-column
          prop="X26"
          align="center"
          label="名人遗物">
      </el-table-column>
      <el-table-column
          prop="X27"
          align="center"
          label="玻璃器">
      </el-table-column>
      <el-table-column
          prop="X28"
          align="center"
          label="乐器、法器">
      </el-table-column>
      <el-table-column
          prop="X29"
          align="center"
          label="皮革">
      </el-table-column>
      <el-table-column
          prop="X30"
          align="center"
          label="音像制品">
      </el-table-column>
      <el-table-column
          prop="X31"
          align="center"
          label="票据">
      </el-table-column>
      <el-table-column
          prop="X32"
          align="center"
          label="交通、运输工具">
      </el-table-column>
      <el-table-column
          prop="X33"
          align="center"
          label="度量衡器">
      </el-table-column>
      <el-table-column
          prop="X34"
          align="center"
          label="标本、化石">
      </el-table-column>
      <el-table-column
          prop="X35"
          align="center"
          label="其他">
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
