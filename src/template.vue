<template>
  <div class="content">

  </div>
</template>

<script>
  export default {
    components: {

    },
    props: {

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
          keyword: ''
        }
      }
    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    mounted() {

    },
    destroyed() {

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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {

  }
</style>
