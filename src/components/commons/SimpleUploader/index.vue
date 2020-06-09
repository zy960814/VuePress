<template>
  <div>
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="true"
      :file-status-text="statusText"
      @file-added="onFileAdded"
      @file-progress="onFileProgress"
      @file-success="onFileSuccess"
      @file-error="onFileError"
      @file-complete="fileComplete"
      @complete="complete"
      class="global-uploader">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <uploader-btn :single="single">选择文件</uploader-btn>
      </uploader-drop>
      <uploader-list>
        <div class="uploader-list" slot-scope="props" >
            <ul>
              <li v-for="file in props.fileList" :key="file.id">
                <uploader-file :file="file" :list="true"></uploader-file>
              </li>
            </ul>
        </div>
      </uploader-list>
    </uploader>
  </div>
</template>

<script>
  import Vue from 'vue';
  import uploader from 'vue-simple-uploader';
  import {ACCEPT_CONFIG} from './js/config';
  import SparkMD5 from 'spark-md5';
  Vue.use(uploader);
  /**
   * @Author: zxt
   * @Description: 文件断点续传配置，组件未经过二次封装，如不满足业务场景需求可进行二次封装
   *
   */
   export default {
    data () {
      return {
        options: {
          target: this.targetUrl,
          testChunks: this.testChunks,
          simultaneousUploads: 1,
          singleFile: this.singleFile,
          chunkSize: this.chunkSize,
          parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
              return parsedTimeRemaining
                  .replace(/\syears?/, '年')
                  .replace(/\days?/, '天')
                  .replace(/\shours?/, '小时')
                  .replace(/\sminutes?/, '分钟')
                  .replace(/\sseconds?/, '秒')
          }
        },
        attrs: {
          accept: ACCEPT_CONFIG.getAll()
        },
        statusText: {
          success: '上传成功',
          error: '上传失败',
          uploading: '上传中',
          paused: '已暂停',
          waiting: '等待中'
        }
      }
    },
    props: {
        //目标上传 URL
        targetUrl: String,
        //是否开启服务器分片校验
        testChunks: Boolean,
        //默认 false, 如果设为 true，则代表一次只能选择一个文件
        single: Boolean,
        //分块时按照该值来分
        chunkSize: Number,
        //单文件上传
        singleFile: Boolean,
        //临时文件保存方法
        mergeSaveFile: {
            type: Function,
            default: null
        },
    },
    computed: {
        //Uploader实例
        uploader() {
            return this.$refs.uploader.uploader;
        }
    },
    methods:{
      onFileAdded(file) {
          // this.computeMD5(file);
          //可用于文件的校验
      },
      onFileProgress(rootFile, file, chunk) {
          //console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
      },
      onFileSuccess(rootFile, file, response, chunk) {
          let res = JSON.parse(response);
          //console.log(res)
      },
      onFileError(rootFile, file, response, chunk) {
          let res = JSON.parse(response);
          //console.log(res)
      },
      // 上传完成
      complete() {
          //console.log('complete', arguments)
      },
      // 一个根文件（文件夹）成功上传完成。
      fileComplete() {
          let vm = this;
          const file = arguments[0].file;
          var data = {
              fileName: file.name,
              identifier: arguments[0].uniqueIdentifier,
              totalSize: file.size,
              type: file.type
          };
          //vm.$emit('mergeSaveFile',data);
          //保存临时文件的操作
          if (vm.mergeSaveFile) {
              vm.mergeSaveFile(data);
          }

      },
      /**
       * 计算md5，实现断点续传及秒传
       * @param file
       */
      computeMD5(file) {
        let fileReader = new FileReader();
        let time = new Date().getTime();
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let currentChunk = 0;
        const chunkSize = 10 * 1024 * 1000;
        let chunks = Math.ceil(file.size / chunkSize);
        let spark = new SparkMD5.ArrayBuffer();
        console.log(file)
        file.pause();
        //設置為等待中
        file.paused=false;
        loadNext();
        fileReader.onload = (e => {
            spark.append(e.target.result);

            if (currentChunk < chunks) {
                currentChunk++;
                loadNext();
            } else {
                let md5 = spark.end();
                this.computeMD5Success(md5, file);
                console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
            }
        });
        fileReader.onerror = function () {
            this.error(`文件${file.name}读取出错，请检查该文件`)
            file.cancel();
        };
        function loadNext() {
            let start = currentChunk * chunkSize;
            let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

            fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
        }
      },
      computeMD5Success(md5, file) {
        file.uniqueIdentifier = md5;
        file.resume();
      }
    }
  }
</script>

<style scoped lang="scss">
  .global-uploader {
    width: 880px;
    font-size: 14px;
   /* padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);*/
    .uploader-btn {
      margin-right: 4px;
      color: #fff;
      background-color: $--color-primary;
      border-color: $--color-primary;

    }
    .uploader-btn{
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 400;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 9px 15px;
      font-size: 12px;
      border-radius: 3px;
    }
    .uploader-btn:hover, .uploader-btn:focus {
      background: #4e83b3;
      border-color: #4e83b3;
      color: #FFFFFF
    }
    .uploader-list {
      max-height: 440px;
      overflow: auto;
      overflow-x: hidden;
      overflow-y: auto;
      /deep/.uploader-file[status="success"] .uploader-file-info .uploader-file-actions .uploader-file-remove {
        display: block;
      }
    }
    /deep/.uploader-file-icon {
      &:before {
        content: '' !important;
      }

      &[icon=image] {
        background: url(./images/image-icon.png);
      }
      &[icon=video] {
        background: url(./images/video-icon.png);
      }
      &[icon=document] {
        background: url(./images/text-icon.png);
      }
      &[icon=unknown] {
      background: url(./images/text-icon.png);
      }
    }
  }

</style>
