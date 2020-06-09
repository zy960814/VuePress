<template>
  <el-card shadow="never">
    <div slot="header">文物信息确认</div>
    <el-scrollbar :style="{height: height}">
      <apply-form-item data="文物基本信息">
        <vertical-table
          style="width:100%;"
          :verticalTableData="applyFormDataInner"
          :verticalTableTitle="relicInfoTitle"
          width="150px"
        ></vertical-table>
      </apply-form-item>
    </el-scrollbar>
  </el-card>
</template>

<script>
import ApplyFormItem from '@/components/commons/ApplyForm/ApplyFormItem'
import VerticalTable from '@/components/commons/VerticalTable'
export default {
  name: 'ConfirmMessage',
  components: { ApplyFormItem, VerticalTable },
  props: {
    height: {
      type: String,
      default: '400px'
    },
    tableOperate: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      // 竖形表格标题数据(一个对象为一行的标题)
      // 申请人信息
      relicInfoTitle: [
        { relicName: '文物名称', sumNo: '总登记号' },
        { years: '具体年代', '': '' },
        { relicCategory: '文物类型', relicLevel: '文物级别' },
        { texture: '质地', size: '尺寸' },
        { number: '数量', '': '' },
        { integrated: '完残程度', '': '' },
        { integratedDetail: '完残程度详细描述' },
        { preservation: '保存状态' },
        { collectCompany: '收藏单位', '': '' },
        { collectTime: '入馆时间', relicSource: '文物来源' },
        { majorDisease: '主要病害' },
        { repairTarget: '主要目标' }
      ],
      relicData: [
        {
          relicName: '莲鹤方壶',
          sumNo: '202004231847',
          years: '春秋中期',
          relicCategory: '青铜器',
          relicLevel: '二级',
          texture: '青铜',
          size: '高近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院/河南博物院',
          collectTime: '1950年8月',
          relicSource: '郑公大墓',
          majorDisease: '锈蚀',
          repairTarget: '恢复光泽',
          relicImage: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '莲鹤方壶.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '莲鹤方壶.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ],
          repairPlan: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '莲鹤方壶.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '莲鹤方壶.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ],
          other: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '莲鹤方壶.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '莲鹤方壶.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ]
        },
        {
          relicName: '狸猫纹漆食盘',
          sumNo: '202004231854',
          years: '春秋中期',
          relicCategory: '器具',
          relicLevel: '一级',
          texture: '木',
          size: '高近126厘米',
          number: '2',
          integrated: '完',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院',
          collectTime: '1950年8月',
          relicSource: '郑公大墓',
          majorDisease: '锈蚀',
          repairTarget: '恢复光泽',
          relicImage: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '狸猫纹漆食盘.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '狸猫纹漆食盘.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ],
          repairPlan: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '狸猫纹漆食盘.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '狸猫纹漆食盘.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ],
          other: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '狸猫纹漆食盘.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '狸猫纹漆食盘.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ]
        },
        {
          relicName: '古滇国贮贝器',
          sumNo: '202004231858',
          years: '春秋中期',
          relicCategory: '青铜器',
          relicLevel: '二级',
          texture: '青铜',
          size: '高近126厘米',
          number: '2',
          integrated: '残',
          integratedDetail: '底部稍有残缺',
          preservation: '保存完整',
          collectCompany: '北京故宫博物院',
          collectTime: '1950年8月',
          relicSource: '郑公大墓',
          majorDisease: '锈蚀',
          repairTarget: '恢复光泽',
          relicImage: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '古滇国贮贝器.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '古滇国贮贝器.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ],
          repairPlan: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '古滇国贮贝器.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '古滇国贮贝器.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ],
          other: [
            {
              applyId: '',
              fieldCode: 'BAWJ',
              fieldName: '技术文件',
              fileName: '古滇国贮贝器.docx',
              gmtCreate: '2020-04-24T10:59:54.959+0000',
              gmtModified: null,
              id: '4028f78171a9f7290171abd80be2001d',
              name: '古滇国贮贝器.docx',
              status: 'success',
              uid: 1587725994830,
              url:
                '/upload/202004/applyFile/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c/file_info/655a4fdd-d653-46ea-9fa0-0b775eb4bf7c.docx'
            }
          ]
        }
      ]
    }
  },
  computed: {
    applyFormDataInner() {
      let relicItem = {}
      if (this.tableOperate.operateType === 'confirm') {
        relicItem = this.relicData.find(item => {
          return item.sumNo === this.tableOperate.id
        })
      }
      console.log(relicItem)
      return relicItem
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/.el-scrollbar__bar.is-horizontal {
  display: none;
}
</style>
