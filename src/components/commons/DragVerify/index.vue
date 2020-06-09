<template>
  <div
      class="drag_verify"
      :style="dragVerifyStyle"
      @mousemove="dragMoving"
      @mouseup="dragFinish"
      @touchmove="dragMoving"
      @touchend="dragFinish">
    <div class="dv_progress_bar" ref="progressBar" :style="progressBarStyle">
    </div>
    <div class="dv_text" :style="textStyle" ref="message">{{message}}</div>
    <div
        class="dv_handler dv_handler_bg"
        @mousedown="dragStart"
        ref="handler"
        :style="handlerStyle"
        @touchstart="dragStart">
      <i :class="handlerIcon"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DragVerify',
    props: {
      width: {
        type: Number,
        default: 300
      },
      height: {
        type: Number,
        default: 42
      },
      text: {
        type: String,
        default: 'swiping to the right side'
      },
      successText: {
        type: String,
        default: 'success'
      },
      background: {
        type: String,
        default: '#9C9C9C'
      },
      progressBarBg: {
        type: String,
        default: '#FFFF99'
      },
      completedBg: {
        type: String,
        default: '#66CC66'
      },
      circle: {
        type: Boolean,
        default: true
      },
      handlerIcon: {
        type: String
      },
      successIcon: {
        type: String
      },
      handlerBg: {
        type: String,
        default: '#FFF'
      },
      textSize: {
        type: String,
        default: '14px'
      }
    },
    computed: {
      handlerStyle: function () {
        return {
          left: '0px',
          width: '36px',
          height: '36px',
          margin: '3px',
          borderRadius: this.circle ? '50%' : 0,
          background: this.handlerBg
        };
      },
      message: function () {
        return this.isPassing ? this.successText : this.text;
      },
      dragVerifyStyle: function () {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          lineHeight: this.height + 'px',
          background: this.background,
          borderRadius: this.circle ? this.height / 2 + 'px' : 0
        };
      },
      progressBarStyle: function () {
        return {
          background: this.progressBarBg,
          height: this.height + 'px',
          borderRadius: this.circle
            ? this.height / 2 + 'px 0 0 ' + this.height / 2 + 'px'
            : 0
        };
      },
      textStyle: function () {
        return {
          height: this.height + 'px',
          width: this.width + 'px',
          fontSize: this.textSize
        };
      },
      handlerIconClass: function () {
        return this.isPassing ? this.handlerIcon : this.successIcon;
      }
    },
    data() {
      return {
        isMoving: false,
        x: 0,
        isPassing: false
      };
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
      },
      dragStart: function (e) {
        if (!this.isPassing) {
          this.isMoving = true;
          var handler = this.$refs.handler;
          this.x =
            (e.pageX || e.touches[0].pageX) -
            parseInt(handler.style.left.replace('px', ''), 10);
        }
      },
      dragMoving: function (e) {
        if (this.isMoving && !this.isPassing) {
          var _x = (e.pageX || e.touches[0].pageX) - this.x;
          var handler = this.$refs.handler;
          if (_x > 0 && _x <= this.width - this.height) {
            handler.style.left = _x + 'px';
            this.$refs.progressBar.style.width = _x + this.height / 2 + 'px';
          } else if (_x > this.width - this.height) {
            handler.style.left = this.width - this.height + 'px';
            this.$refs.progressBar.style.width =
              this.width - this.height / 2 + 'px';
            this.passVerify();
          }
        }
      },
      dragFinish: function (e) {
        if (this.isMoving && !this.isPassing) {
          var _x = (e.pageX || e.changedTouches[0].pageX) - this.x;
          if (_x < this.width - this.height) {
            this.$refs.handler.style.left = '0';
            this.$refs.progressBar.style.width = '0';
          }
          this.isMoving = false;
        }
      },
      passVerify: function () {
        this.isPassing = true;
        this.isMoving = false;
        var handler = this.$refs.handler;
        handler.className += ' dv_handler_ok_bg';
        handler.children[0].className = this.successIcon;
        this.$refs.progressBar.style.background = this.completedBg;
        this.$refs.message.style.color = '#FFF';
        this.$emit('pass-callback');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .drag_verify {
    position: relative;
    background-color: #E8E8E8;
    text-align: center;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
    box-sizing: border-box;

    .dv_handler {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #ccc;
      cursor: move;

      i {
        color: #666;
        font-size: 1.5em;
      }
    }

    .dv_progress_bar {
      position: absolute;
      height: 36px;
      width: 0;
      transition: background 0.5s ease-in;
    }

    .dv_text {
      position: absolute;
      top: 0;
      color: #fff;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      -ms-user-select: none;
    }
  }
</style>
