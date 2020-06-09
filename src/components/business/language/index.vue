<template>
  <div>
    <el-row>
      <el-col :span="12" style="text-align: left;margin-top:10px;">
        <el-button type="primary" @click="show">新增常用语</el-button>
      </el-col>
    </el-row>
    <el-row style="height: 10px"></el-row>
    <el-row>
      <el-col :span="22">
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#f2f2f2',color:'#555',padding:'12px 0'}"
          :height="pagetype"
          border
          align="center"
          class="mh-table"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column type="index" label="序号" width="150"></el-table-column>
          <el-table-column label="常用语" prop="phrase"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2">
        <el-row style="margin-top: 20px;margin-left: 20px;">
          <el-radio-group v-model="radio" size="small">
            <el-radio-button label="1">
              <i class="el-icon-top" />
            </el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row style="margin-top: 20px;margin-left: 20px;">
          <el-radio-group v-model="radio" size="small">
            <el-radio-button label="2">
              <i class="el-icon-bottom" />
            </el-radio-button>
          </el-radio-group>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      center
      width="30%"
      :append-to-body="true"
    >
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addLanguageConfirm">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { findLanguage, addLanguage, deleteLanguage } from "@/api/basic";
export default {
  props: {
    pagetype: {
      type: String,
      default: "calc(100vh - 230px)"
    }
  },
  data() {
    return {
      radio2: "1",
      textarea: "",
      title: "新增常用语",
      dialogVisible: false,
      radio: "1",
      col: [
        {
          label: "常用语",
          prop: "name"
        }
      ],
      dropCol: [
        {
          label: "常用语",
          prop: "name"
        }
      ],
      tableData: [],
      findLanguageData: {
        pageNation: {
          currentPage: 1,
          pageSize: 1000
        },
        sort: {
          gmtCreate: 1
        }
      },
      addLanguageData: {
        id: "",
        accountId: "",
        accountName: "",
        phrase: "",
        disOrder: ""
      },
      deleteLanguageData: {
        id: []
      }
    };
  },
  created() {
    this.findLanguage();
  },
  mounted() {},
  methods: {
    //新增常用语
    show() {
      this.title = "新增常用语";
      this.dialogVisible = true;
      this.textarea = "";
      this.addLanguageData.id = "";
    },
    //编辑常用语
    editClick(row) {
      this.title = "修改常用语";
      this.dialogVisible = true;
      this.textarea = "";
      this.addLanguageData.id = row.id;
    },
    //删除常用语
    deleteClick(row) {
      console.log(row.id);
      this.deleteLanguageData.id = [];
      this.deleteLanguageData.id.push(row.id);

      this.deleteLanguage();
    },
    // 添加常用语弹框确定
    addLanguageConfirm() {
      this.addLanguageData.phrase = this.textarea;
      this.addLanguageData.disOrder = this.tableData.length + 1;
      this.addLanguage();
      this.dialogVisible = false;
    },
    // 单行选中
    handleCurrentChange(val) {
      //   console.log(val)
    },
    //常用语查询接口
    findLanguage() {
      findLanguage(this.findLanguageData).then(responseData => {
        this.tableData = responseData.data.data;
      });
    },
    //常用语添加接口
    addLanguage() {
      addLanguage(this.addLanguageData).then(responseData => {
        if (responseData.code === 200) {
          this.findLanguage();
        }
      });
    },
    //常用语删除接口
    deleteLanguage() {
      deleteLanguage(this.deleteLanguageData).then(responseData => {
        if (responseData.code === 200) {
          this.findLanguage();
        }
      });
    }
  }
};
</script>
