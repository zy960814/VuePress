<template>
  <div class="content">
    <h2>文物或复仿制品信息</h2>
    <el-scrollbar :style="{height: (contentHeight - 96) + 'px'}">
      <div class="clear-float">
        <el-button class="fl" v-if="opt === 'view'" type="primary" @click="modify" icon="el-icon-edit">修改</el-button>
        <el-button class="fr" type="primary" @click="save" v-if="!disabled">保存</el-button>
      </div>
      <div class="underContent">
        <el-form ref="form" :model="form" :rules="rules[ruleKey]" label-width="120px" label-position="left">
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
            <el-input type="textarea" :rows="2" :disabled="disabled" placeholder="请输入内容"
                      v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
        <div class="pictureText clear-float">
          <p class="fl pictureTextLeft">文物或复仿制品照片<span style="color: red; margin-left: 5px">*</span></p>
          <p class="fr pictureTextRight">说明：照片应能清晰表现改文物或复仿制品的特征，单张照片不能超过2M，单个文物或复仿制品最多上传6张照片，格式支持bmp、jpg、jpeg、png</p>
        </div>
        <picture-upload ref="imgUpload" :action="fileUploadUrl" :type="20" :max-file-size="2" :limit="6"/>
      </div>
      <div style="text-align: right; margin-bottom: 0; height: 32px">
        <el-button type="primary" @click="save" v-if="!disabled">保存</el-button>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import {queryDictionary} from '@/api/basic'
  import API_PREFIX from '@/api/config'
  import PictureUpload from '@/components/commons/PictureUpload'
  import {checkPositiveInt} from '@/utils/validator'
  import {saveCulturalRelicInfo, fetchCulturalRelic, delCulturalRelic} from '@/api/personal/schedule/56020/temp-entry'

  export default {
    components: {PictureUpload},
    props: {
      contentHeight: Number,
      opt: String
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
        disabled: false,  // 表单是否禁用、锁定
        amountDisable: true,  // 事项下拉选是否禁用
        showExtraAmount: false,  // 附加数量文本框是否显示
        fileUploadUrl: `${API_PREFIX.PERSONAL}/bizTempfile/uploadImgFile`,
        // 表单校验规则的选用方案
        ruleKey: 'default',
        rules: {
          default: {},
          submit: {
            crName: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
            ],
            realSize: [
              {required: true, message: ' ', trigger: 'blur'},
              {max: 100, message: '长度最大 100 个字符', trigger: 'blur'}
            ],
            crTextureCode: [
              {required: true, message: ' ', trigger: 'change'}
            ],
            piecesNum: [
              {required: true, message: ' ', trigger: 'blur'},
              {validator: checkPositiveInt, trigger: 'blur'}
            ],
            crAge: [
              {max: 20, message: '长度最大 20 个字符', trigger: 'blur'}
            ],
            remark: [
              {max: 30, message: '长度最大 30 个字符', trigger: 'blur'}
            ]
          }
        }
      };
    },
    watch: {
      'form.amount'(val) {
        this.showExtraAmount = val === '1批';  // 设置附加数量文本框是否显示
      },
      'form.crClassCode'(val) {
        // val: 1表示文物, 2表示复仿制品
        this.form.amount = val ? '1件' : '';
        this.amountDisable = val !== '2';  // 设置数量是否可编辑
      }
    },
    mounted() {
      // 表单是否禁用
      this.disabled = this.opt === 'view';
      this.initData();
      this.queryDetails();
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
      queryDetails() {
        if (this.$store.state._20.tempEntryApplyCurrItem.id) {
          fetchCulturalRelic({id: this.$store.state._20.tempEntryApplyCurrItem.id}).then(({data}) => {
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
              if (this.disabled) {
                this.$refs['imgUpload'].setDisabled(true);
                this.disabled = true;
                this.amountDisable = true;
              }
            });
          });
        }
      },
      // 重置表单数据
      resetForm(listQuery) {
        this.form.id = null;
        this.$store.dispatch('setTempEntryApplyCurrItem', {
          id: null,
          listQuery: listQuery || false,
          detailQuery: false
        });
        this.$refs['form'].resetFields();
        this.$refs['imgUpload'].reset();
        this.disabled = false;
      },
      // 确定按钮功能
      save() {
        this.$refs['form'].clearValidate();
        this.ruleKey = 'submit';
        this.$nextTick(() => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              const imgInfo = this.$refs['imgUpload'].getData();
              if (imgInfo.fileList.length > 0) {
                // 质地字典项处理
                const scrRelicQuality = this.options.scrRelicQuality.find(item => {
                  return item.code === this.form.crTextureCode
                });
                this.form.crTextureName = scrRelicQuality ? scrRelicQuality.name : '';
                // 类别字典项处理
                const scrRelic = this.options.scrRelicType.find(item => {
                  return item.code === this.form.crClassCode
                });
                this.form.crClass = scrRelic ? scrRelic.name : '';
                // 级别字典项处理
                const crLevel = this.options.crLevelCode.find(item => {
                  return item.code === this.form.crLevelCode
                });
                this.form.crLevelName = crLevel ? crLevel.name : '';

                // 处理文物图片信息
                this.form.docType = imgInfo.fileListData;

                // 校验通过
                saveCulturalRelicInfo({
                  data: this.form,
                  itemId: this.$store.state._20.tempEntryItemId
                }).then(data => {
                  this.$message({message: data.msg, type: 'success'});
                  this.$refs['imgUpload'].setDisabled(true);
                  this.disabled = true;
                  this.amountDisable = true;
                  // 更新当前选中项
                  this.form.id = data.data.id;
                  this.$store.dispatch('setTempEntryApplyCurrItem', {
                    id: this.form.id,
                    listQuery: true,
                    detailQuery: false
                  });

                  // 保存成功
                  this.$emit('edit-success');
                });
              } else {
                this.$store.dispatch('promptWarningMsg', '请上传文物或复仿制品照片');
              }
            }
          });
        });
      },
      // 修改数据
      modify() {
        this.disabled = false;
        this.amountDisable = false;
        this.$refs['imgUpload'].setDisabled(false);
      },
      // 删除数据
      deleteItem() {
        this.$confirm('你确定要删除此条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCulturalRelic({
            itemId: this.$store.state._20.tempEntryItemId,
            ids: this.selectedItem.id
          }).then(({msg}) => {
            this.$message({
              message: msg,
              type: 'success'
            });
            this.resetForm(true);
          });
        }).catch(() => {
        });
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

    .half-width {
      width: 48%;
    }

    /deep/ .el-scrollbar__view {
      padding-right: 15px;
    }
  }

  .el-select {
    width: 100%;
  }

  /deep/ .piecesNum .el-form-item__content {
    margin-left: 10px !important;
    width: 80px
  }

  .underContent {
    height: 720px;
    border: 1px solid $--border-color;
    padding: 10px 20px;
    margin: 10px 0;
  }

  .el-form {
    border-bottom: 1px solid $--border-color;
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
