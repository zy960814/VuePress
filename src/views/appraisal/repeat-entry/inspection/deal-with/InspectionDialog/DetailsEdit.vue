<template>
  <div class="details-edit">
    <div style="text-align: right">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <div class="underContent">
      <el-form ref="form" :model="form" label-width="120px" label-position="left">
        <el-form-item label="文物或复仿制品名称" prop="crName" class="redStar">
          <el-input v-model="form.crName" :disabled="disabled"></el-input>
        </el-form-item>
        <div class="clear-float">
          <el-form-item label="尺寸" prop="realSize" class="half-width fl redStar">
            <el-input v-model="form.realSize" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="质地" prop="crTextureCode" class="half-width fr redStar">
            <el-select v-model="form.crTextureCode" :disabled="disabled" placeholder="质地" value="">
              <el-option
                  v-for="(item, index) in options.scrRelicQuality"
                  :label="item.name"
                  :value="item.code"
                  :key="index">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="clear-float">
          <el-form-item label="类别" prop="crClassCode" class="half-width fl">
            <el-select
                v-model="form.crClassCode"
                placeholder="类别"
                :disabled="disabled"
                clearable
                value="">
              <el-option
                  v-for="(item, index) in options.scrRelicType"
                  :label="item.name"
                  :value="item.code"
                  :key="index">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="clear-float">
          <el-form-item label="数量" prop="amount" class="half-width fl">
            <el-select v-model="form.amount" :disabled="amountDisable" value="">
              <el-option label="1件" value="1件"></el-option>
              <el-option label="1批" value="1批"></el-option>
            </el-select>
          </el-form-item>
          <template v-if="showExtraAmount">
            <el-form-item prop="piecesNum" class="fl piecesNum redStar">
              <el-input v-model="form.piecesNum" :disabled="disabled"></el-input>
            </el-form-item>
            <span class="fl" style="line-height: 32px; margin-left: 10px">件</span>
          </template>
        </div>
        <div class="clear-float">
          <el-form-item label="年代" prop="crAge" class="half-width fl">
            <el-input v-model="form.crAge" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="级别" prop="crLevelCode" class="half-width fr">
            <el-select v-model="form.crLevelCode" :disabled="disabled" placeholder="级别" clearable value="">
              <el-option
                  v-for="(item, index) in options.crLevelCode"
                  :label="item.name"
                  :value="item.code"
                  :key="index">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="2" :disabled="disabled" placeholder="请输入内容" v-model="form.remark"></el-input>
        </el-form-item>
        <div class="pictureText clear-float">
          <p class="fl pictureTextLeft">文物或复仿制品照片<span style="color: red; margin-left: 5px">*</span></p>
          <p class="fr pictureTextRight">说明：照片应能清晰表现改文物或复仿制品的特征，单张照片不能超过2M，单个文物或复仿制品最多上传6张照片，格式支持bmp、jpg、jpeg、png</p>
        </div>
        <picture-upload ref="imgUpload" style="height: 318px" :action="fileUploadUrl" :type="20" :max-file-size="2"
                        :limit="6"/>
      </el-form>
      <el-form ref="cyForm" :model="cyForm" :rules="rules" label-width="120px" label-position="left">
        <div class="inspection_opinion">
          <el-form-item label="是否允许出境" prop="approvalFlag" class="redStar">
            <el-radio v-model="cyForm.approvalFlag" label="0">是</el-radio>
            <el-radio v-model="cyForm.approvalFlag" label="1">否</el-radio>
          </el-form-item>
          <common-language @language="language" class="clear-float" space-width="78px"
                           style="line-height: 32px; margin-bottom: 10px"/>
          <el-form-item label="鉴定意见" prop="remark">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="cyForm.remark"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="text-align: right; margin-bottom: 0; height: 32px">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {queryDictionary} from '@/api/basic'
  import API_PREFIX from '@/api/config'
  import PictureUpload from '@/components/commons/PictureUpload'
  import {fetchCulturalRelic} from '@/api/personal/schedule/56020/temp-entry'
  import CommonLanguage from '@/components/commons/CommonLanguage'
  import {inspection} from '@/api/appraisal/temp-entry'
  import {getAncestorAttr} from '@/utils/common'
  import {getBizCroAppraiseOpinion} from '@/api/appraisal/temp-entry'

  export default {
    components: {
      PictureUpload,
      CommonLanguage
    },
    data() {
      return {
        options: {
          scrRelicQuality: [], // 文物质地数据字典
          scrRelicType: [], // 文物类别数据字典
          crLevelCode: [] // 文物级别数据字典
        },
        form: {
          id: null,
          crName: '',
          realSize: '',
          crTextureCode: '',
          crTextureName: '',
          crClassCode: '',
          crClass: '',
          amount: '',
          piecesNum: '',
          crAge: '',
          crLevelCode: '',
          crLevelName: '',
          remark: '',
          docType: []
        },
        disabled: true,  // 表单是否禁用、锁定
        amountDisable: true,  // 事项下拉选是否禁用
        showExtraAmount: false,  // 附加数量文本框是否显示
        fileUploadUrl: '',
        rules: {
          remark: [
            {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
          ]
        },
        // 查验表单项
        cyForm: {
          itemId: this.$route.query.id,
          crId: '',
          isCr: '1',
          approvalFlag: '0',
          remark: ''
        }
      }
    },
    computed: {
      // 当前选中项
      selectedItem: function () {
        return this.$store.state._20.tempEntryApplyCurrItem;
      }
    },
    watch: {
      'form.amount'(val) {
        this.showExtraAmount = val === '1批';  // 设置附加数量文本框是否显示
      },
      'form.crClassCode'(val) {
        // val: 1表示文物, 2表示复仿制品
        this.form.amount = val ? '1件' : '';
        this.amountDisable = val !== '2';  // 设置数量是否可编辑
      },
      selectedItem: function (val) {
        if (val.detailQuery) {
          fetchCulturalRelic({id: val.id}).then(({data}) => {
            this.form = data;
            const fileListData = data.docType || [];
            fileListData.map(item => {
              if (item.url) {
                item.url = API_PREFIX.FILE_SERVICE + item.url;
              }
              return item;
            });
            this.$refs['imgUpload'].setData(fileListData);
            this.$nextTick(() => {
              // 锁定数据
              this.$refs['imgUpload'].setDisabled(true);
              this.amountDisable = true;
            });
          });
          getBizCroAppraiseOpinion({
            itemId: this.$route.query.id,
            crId: val.id
          }).then(data => {
              if(data.data){
                  this.cyForm = data.data
              }
          });
        }
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      // 初始化数据
      initData() {
        // 查询文物质地数据字典
        queryDictionary('ScrRelicQuality').then(({data}) => this.options.scrRelicQuality = data);
        // 查询类别数据字典
        queryDictionary('ScrRelicType').then(({data}) => this.options.scrRelicType = data);
        // 查询文物级别数据字典项
        queryDictionary('CrLevelCode').then(({data}) => this.options.crLevelCode = data);
      },
      // 常用语
      language(value) {
        this.cyForm.remark += value;
      },
      // 保存查验结果
      save() {
        this.$refs['cyForm'].validate(valid => {
          if (valid) {
            this.cyForm.crId = this.form.id;
            inspection(this.cyForm).then(() => {
              this.form.isInspect = '1';
              getAncestorAttr(this, 'x_cyNext')(this.form);
              this.$message({
                message: '查验成功',
                type: 'success'
              });
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }

  /deep/ .piecesNum .el-form-item__content {
    margin-left: 10px !important;
    width: 80px
  }

  .inspection_opinion {
    border-top: 1px solid #CCC;
    margin-top: 10px;
    padding-top: 10px;
  }

  .details-edit {

    .half-width {
      width: 48%;
    }
  }

  .underContent {
    border: 1px solid $--border-color;
    padding: 10px 20px;
    margin: 10px 0;
  }

  .pictureText {
    border-top: 1px solid $--border-color;
  }

  .pictureTextLeft {
    width: 150px;
    height: 30px;
    line-height: 30px;
  }

  .pictureTextRight {
    color: #18B9F4;
    width: 75%;
    height: 30px;
  }

  .line {
    border-bottom: 1px solid $--border-color;
  }

  .verticalLine {
    display: inline-block;
    width: 2px;
    height: 8px;
    background-color: $--border-color;
  }
</style>
