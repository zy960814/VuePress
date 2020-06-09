<template>
  <div class="content">
    <select-dialog :pageTabsData="pageTabsData" title="上传海关关单">
      <template #body_1>
        <picture-upload
            ref="imgUpload"
            :action="fileUploadUrl"
            :data="extData"
            :max-file-size="2"
            :limit="1"/>
      </template>
    </select-dialog>
  </div>
</template>

<script>
  import API_PREFIX from '@/api/config'
  import SelectDialog from '@/components/commons/SelectDialog'
  import PictureUpload from '@/components/commons/PictureUpload'
  import {getCustomsFile} from '@/api/appraisal/temp-entry'

  export default {
    components: {
      PictureUpload,
      SelectDialog
    },
    props: {
      itemId: String
    },
    data() {
      return {
        fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadBpersonalFile`,
        // 切换按钮数据
        pageTabsData: {
          tabs: []
        },
        // 扩展数据
        extData: {
          itemId: this.itemId,
          fieldCode: 'HGGD',
          fieldName: '海关关单',
        }
      }
    },
    mounted() {
      getCustomsFile({itemId: this.itemId}).then(({data}) => {
        this.$refs.imgUpload.setData([{
          url: API_PREFIX.FILE_SERVICE + data
        }]);
      });
    }
  }
</script>
