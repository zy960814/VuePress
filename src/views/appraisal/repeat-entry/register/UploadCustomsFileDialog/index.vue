<template>
  <div class="content">
    <select-dialog :pageTabsData="pageTabsData" title="上传海关关单">
      <template #body_1>
        <picture-upload ref="imgUpload" :action="fileUploadUrl" :max-file-size="2" :limit="1"/>
      </template>
    </select-dialog>
  </div>
</template>

<script>
  import API_PREFIX from '@/api/config'
  import SelectDialog from '@/components/commons/SelectDialog'
  import PictureUpload from '@/components/commons/PictureUpload'

  export default {
    components: {
      PictureUpload,
      SelectDialog
    },
    data() {
      return {
        fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBexhibitionFile`,
        // 切换按钮数据
        pageTabsData: {
          tabs: []
        },
      }
    },
    mounted() {
    },
    methods: {

    }
  }
</script>
