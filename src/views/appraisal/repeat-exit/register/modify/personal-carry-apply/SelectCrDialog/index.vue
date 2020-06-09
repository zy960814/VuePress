<template>
  <div class="content">
    <h2>添加文物或复仿制品信息</h2>
    <el-scrollbar :style="{height: (contentHeight - 138) + 'px'}">
      <el-form ref="form" label-width="80px" label-position="left">
        <div class="clear-float">
          <el-form-item>
            <div class="row_1">
              <el-input placeholder="文物或复仿制品名称" v-model="queryParams.condition.crName" class="keyword mr-10">
                <el-button @click="search(1)" slot="append">查询</el-button>
              </el-input>
              <el-button @click="resetForm">重置</el-button>
            </div>
          </el-form-item>
          <!--<el-form-item label="时间范围" prop="crName" class="half-width">
            <el-date-picker
                v-model="form.crName"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>-->
        </div>
      </el-form>
      <el-table ref="table" :data="tableData" border>
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="序号" align="center" width="80">
          <template
              slot-scope="scope"
          >{{ (queryParams.pagination.currentPage - 1) * queryParams.pagination.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="crName" label="文物或复仿制品名称" width="180"></el-table-column>
        <el-table-column prop="realSize" label="尺寸"></el-table-column>
        <el-table-column prop="crTextureName" label="质地"></el-table-column>
        <el-table-column prop="crClass" label="类别"></el-table-column>
        <el-table-column prop="crLevelName" label="级别"></el-table-column>
        <el-table-column prop="crAge" label="年代"></el-table-column>
        <el-table-column prop="amount" label="数量"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="照片">
          <template slot-scope="scope">
            <el-link
                :underline="false"
                type="primary"
                @click="viewImg(scope.row)"
            >{{ scope.row.picNum }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="sizeChange"
          @current-change="search"
          :current-page="queryParams.pagination.currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
      ></el-pagination>
    </el-scrollbar>
    <viewer :images="images" @inited="initViewer">
      <img v-for="(src, index) in images" :src="src" :key="index" style="display: none" alt/>
    </viewer>
  </div>
</template>

<script>
  import {querySelectableBCroCrList} from '@/api/appraisal/repeat-exit'
  import API_PREFIX from '@/api/config'
  import {getBizCroCrPics} from '@/api/personal/schedule/56020/temp-entry'

  import Vue from 'vue'
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'

  Vue.use(Viewer);

  export default {
    props: {
      contentHeight: Number
    },
    data() {
      return {
        tableData: [],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          condition: {
            crName: '',
            isExhibition: '0',
            itemId: ''
          }
        },
        images: []
      };
    },
    mounted() {
      this.queryParams.condition.itemId = this.$route.query.id;
      this.search();
    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        querySelectableBCroCrList(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum;
        });
      },
      resetForm() {
        this.queryParams.condition.crName = '';
        this.search();
      },
      // 获取选择的表格行数据
      getSelectData() {
        return [...this.$refs.table.selection];
      },
      initViewer(viewer) {
        this.$viewer = viewer;
        this.$viewer.view();  // 此处解决组件首次加载不上图片的 BUG
      },
      viewImg(row) {
        getBizCroCrPics({
          id: row.id
        }).then(({data}) => {
          this.images = data.map(item => {
            return API_PREFIX.FILE_SERVICE + item.url
          });
          this.$viewer.view()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  .content {

    h2 {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 0 0 5px 0;
      margin: 0 0 10px 0;
      border-bottom: 1px solid $--border-color;
      color: #303133;
    }

    /*.half-width {
      width: 48%;
    }*/

    /deep/ .el-scrollbar__view {
      padding-right: 15px;
    }

    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }

    .row_1 {
      text-align: center;

      .keyword {
        width: 480px;
      }
    }
  }

  .el-select {
    width: 100%;
  }
</style>
