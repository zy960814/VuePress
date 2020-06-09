<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6" style="text-align: center;display: flex">
        <el-input
            size="small"
            placeholder="姓名/所属单位"
            v-model="input3">
          <el-button slot="append">搜索</el-button>
        </el-input>
        <el-button style="margin-left: 5px" type="primary">重置</el-button>
      </el-col>
    </el-row>
    <el-row style="height: 20px"></el-row>
    <el-row>
      <el-col :span="10" :offset="1">
        <el-table 
          :data="tableData"
          :header-cell-style="{background:'#f2f2f2',color:'#555',padding:'12px 0'}"
          border
          ref="multipleTable"
          height=" calc(100vh - 230px)"
          row-key="id"
          class="mh-table"
          align="left">
          <el-table-column label="所有联系人">
            <el-table-column type="selection"  width="55"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="所属单位" prop="name" ></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">
        <el-row style="margin-top: 20px;margin-left: 20px;">
          <el-radio-group v-model="radio" size="small" :disabled="tableData.length == 0?true:false" @change="showUp">
            <el-radio-button label="1"><i class="el-icon-right"/></el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row style="margin-top: 20px;margin-left: 20px;">
          <el-radio-group v-model="radio" size="small" :disabled="tableData.length == 0?true:false" @change="showUp">
            <el-radio-button label="2"><i class="el-icon-back"/></el-radio-button>
          </el-radio-group>
        </el-row>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-table 
          :data="tableData"
          :header-cell-style="{background:'#f2f2f2',color:'#555',padding:'12px 0'}"
          border
          ref="multipleTable"
          height="calc(100vh - 230px)"
          row-key="id"
          class="mh-table"
          align="left">
          <el-table-column label="常用联系人">
            <el-table-column type="selection"  width="55"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="所属单位" prop="name" ></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2" >
        <el-row style="margin-top: 20px;margin-left: 20px;">
          <el-radio-group v-model="radio2" size="small"
                          :disabled="tableData.length == 0?true:false&&tableData.includes(1)">
            <el-radio-button label="1"><i class="el-icon-top"/></el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row style="margin-top: 20px;margin-left: 20px;">
          <el-radio-group v-model="radio2" size="small"
                          :disabled="tableData.length == 0?true:false&&tableData.includes(2)">
            <el-radio-button label="2"><i class="el-icon-bottom"/></el-radio-button>
          </el-radio-group>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Sortable from 'sortablejs'

  export default {
    data() {
      return {
        radio2: "1",
        radio: "1",
        input3: "",
        col: [
          {
            label: '常用语',
            prop: 'name'
          }
        ],
        dropCol: [
          {
            label: '常用语',
            prop: 'name'
          }
        ],
        tableData: [
          {
            id: '1',
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 100 弄'
          },
          {
            id: '2',
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 200 弄'
          },
          {
            id: '3',
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 300 弄'
          },
          {
            id: '4',
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 400 弄'
          }
        ]
      }
    },
    mounted() {
// 阻止默认行为
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      };
      this.rowDrop()
    },
    methods: {
      showUp(val) {
        if (val == 1) {
          this.tableData.push[{
            name: '测试'
          }]

        } else if (val == 2) {
          this.tableData.splice(1, 1)
          console.log(val);
        }
        this.$refs.multipleTable.clearSelection()
        // this.$refs.multipleTable.selection = []
      },
      handleClick() {

      },
//行拖拽
      rowDrop() {
        const tbody = document.querySelector('.el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          onEnd({newIndex, oldIndex}) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .el-col-offset-1{
    margin-left: 0px;
  }
</style>

