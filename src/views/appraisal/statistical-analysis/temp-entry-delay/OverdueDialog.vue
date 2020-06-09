<template>
  <div style="margin-top: 10px">
    <el-table ref="table" :data="tableData" border>
      <!--<el-table-column
          type="selection"
          align="center"
          width="50">
      </el-table-column>-->
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          {{ (queryParams.pagination.currentPage - 1) * queryParams.pagination.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
          prop="crName"
          label="文物或复仿制品名称"
          width="180">
      </el-table-column>
      <el-table-column
          label="照片">
        <template slot-scope="scope">
          <el-link
              :underline="false"
              type="primary"
              @click="viewImg(scope.row)">{{ scope.row.picNum }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="realSize"
          label="尺寸">
      </el-table-column>
      <el-table-column
          prop="crTextureName"
          label="质地">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="数量">
      </el-table-column>
      <el-table-column
          prop="crClass"
          label="携运人">
      </el-table-column>
      <el-table-column
          prop="crLevelName"
          label="申请事项名称">
      </el-table-column>
      <el-table-column
          prop="crAge"
          label="审批时间">
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
    <viewer :images="images" @inited="initViewer">
      <img v-for="(src, index) in images" :src="src" :key="index" style="display: none" alt/>
    </viewer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'

  Vue.use(Viewer);

  export default {
    data() {
      return {
        pageTabsData: {
          tabs: []
        },
        tableData: [{
          crName: '文物名称',
          picNum: 4,
        }],
        totalCount: 0,
        queryParams: {
          pagination: {
            currentPage: 1,
            pageSize: 5
          },
          keyword: ''
        },
        images: [
          'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg',
          'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2853553659,1775735885&fm=26&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1911078885,2819697506&fm=26&gp=0.jpg'
        ]
      }
    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage);
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;

        const data = 'responseData';

        this.tableData = data.data;
        this.totalCount = data.pagination.totalNum;
      },
      initViewer(viewer) {
        this.$viewer = viewer;
        //this.$viewer.view();  // 此处解决组件首次加载不上图片的 BUG
      },
      viewImg(row) {
        console.log(row);
        this.$viewer.view();
        // getBizCroCrPics({
        //   id: row.id
        // }).then(({data}) => {
        //   this.images = data.map(item => {
        //     return API_PREFIX.FILE_SERVICE + item.url
        //   });
        //   this.$viewer.view()
        // })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content {

  }
</style>
