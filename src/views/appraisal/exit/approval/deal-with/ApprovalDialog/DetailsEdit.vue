<template>
  <div class="details-edit">
    <div style="text-align: right">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <div class="underContent">
      <el-form ref="form" :model="spForm" :rules="rules[ruleKey]" label-width="120px" label-position="left">
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
        <div class="inspection_opinion">
          <div style="font-size: 12px; margin-bottom: 10px">查验意见</div>
          <el-table ref="table" :data="tableData" border>
            <el-table-column label="序号" min-width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="查验人姓名" min-width="70"></el-table-column>
            <el-table-column label="是否是文物" min-width="65">
              <template scope="scope">{{ scope.row.isCr === '1' ? '是' : '否' }}</template>
            </el-table-column>
            <el-table-column label="是否允许进境" min-width="65">
              <template scope="scope">{{ scope.row.approvalFlag === '1' ? '是' : '否' }}</template>
            </el-table-column>
            <el-table-column prop="remark" label="查验意见" min-width="200"></el-table-column>
          </el-table>
          <div class="inspection_opinion">
            <common-language @language="language" class="clear-float" space-width="78px"
                             style="line-height: 32px; margin-bottom: 10px"/>
            <el-form-item label="审批意见" prop="remark">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="spForm.remark"></el-input>
            </el-form-item>
          </div>
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
  import {findBizCroAppraiseHistory, getBizCroApproval, approval} from '@/api/appraisal/temp-entry'
  import {getAncestorAttr} from '@/utils/common'

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
        // 表单校验规则的选用方案
        ruleKey: 'default',
        rules: {
          default: {},
          submit: {
            remark: [
              {max: 200, message: '长度最大 200 个字符', trigger: 'blur'}
            ]
          }
        },
        tableData: [],
        // 审批意见表单项
        spForm: {
          itemId: '',
          crId: '',
          remark: ''
        }
      };
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

          // 查询查验意见
          findBizCroAppraiseHistory({
            itemId: this.$route.query.id,
            crId: val.id
          }).then(({data}) => {
            this.tableData = data;
          });

          // 查询审批意见
          getBizCroApproval({
            itemId: this.$route.query.id,
            crId: val.id
          }).then(({data}) => {
            this.spForm.remark = data ? data.remark : '';
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
        this.spForm.remark += value;
      },
      // 保存点击事件
      save() {
        this.$refs['form'].clearValidate();
        this.ruleKey = 'submit';
        this.$nextTick(() => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.spForm.itemId = this.$route.query.id;
              this.spForm.crId = this.selectedItem.id;
              approval(this.spForm).then(() => {
                this.form.isApproval = '1';  // 设置已审批状态
                getAncestorAttr(this, 'x_spNext')(this.form);
                this.$message({
                  message: '审批成功',
                  type: 'success'
                });
              });
            }
          });
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
    width: 80px;
  }

  .inspection_opinion {
    border-top: 1px solid $--border-color;
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
