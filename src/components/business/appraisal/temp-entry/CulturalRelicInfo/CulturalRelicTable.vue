<template>
  <div>
    <el-table :data="tableData" border>
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
          prop="realSize"
          label="尺寸">
      </el-table-column>
      <el-table-column
          prop="crTextureName"
          label="质地">
      </el-table-column>
      <el-table-column
          prop="crClass"
          label="类别">
      </el-table-column>
      <el-table-column
          prop="crLevelName"
          label="级别">
      </el-table-column>
      <el-table-column
          prop="crAge"
          label="年代">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="数量">
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注">
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
  import {listCulturalRelic, getBizCroCrPics} from '@/api/personal/schedule/56020/temp-entry'
  import API_PREFIX from '@/api/config'

  import Vue from 'vue'
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'

  Vue.use(Viewer);

  export default {
    data() {
      return {
        // 文物或复仿制品信息列表数据
        tableData: [],
        totalCount: 0,
        queryParams: {
          condition: {
            itemId: '',
            crName: ''
          },
          pagination: {
            currentPage: 1,
            pageSize: 20
          },
          sort: {}
        },
        images: []
      }
    },
    mounted() {
      this.queryParams.condition.itemId = this.$route.query.id;
      this.search();
    },
    methods: {
      sizeChange(pageSize) {
        this.queryParams.pagination.pageSize = pageSize;
        this.search(this.queryParams.pagination.currentPage)
      },
      search(currentPage) {
        this.queryParams.pagination.currentPage = currentPage ? currentPage : 1;
        listCulturalRelic(this.queryParams).then(({data}) => {
          this.tableData = data.data;
          this.totalCount = data.pagination.totalNum
        })
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
