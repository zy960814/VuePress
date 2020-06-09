<template>
  <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave">
    <div
        v-show="visible"
        class="el-dialog__wrapper"
        @click.self="handleWrapperClick">
      <div
          role="dialog"
          :key="key"
          aria-modal="true"
          :aria-label="title || 'dialog'"
          :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
          ref="dialog"
          :style="style">
        <div ref="title" class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
              type="button"
              class="el-dialog__headerbtn"
              aria-label="Close"
              v-if="showClose"
              @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered">
          <slot></slot>
        </div>
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from 'element-ui/lib/utils/popup';
  import Migrating from 'element-ui/lib/mixins/migrating';
  import emitter from 'element-ui/lib/mixins/emitter';

  const drag = (dragBox, moveBox = dragBox) => {
    dragBox.onmousedown = e => {
      var disX = e.clientX - moveBox.offsetLeft;
      var disY = e.clientY - moveBox.offsetTop;
      document.onmousemove = (e) => {
        e.preventDefault();
        var l = e.clientX - disX;
        var t = e.clientY - disY;
        var x = document.documentElement.clientWidth - moveBox.offsetWidth;
        var y = document.documentElement.clientHeight - moveBox.offsetHeight;
        l = l < 0 ? 0 : (l > x ? x : l);
        t = t < 0 ? 0 : (t > y ? y : t);
        moveBox.style.left = l + 'px';
        moveBox.style.top = t + 'px';
        return false;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
      };
      return false;
    }
  };

  export default {
    name: 'MyDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: false
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: {
        type: String,
        default: '300px'
      },

      height: {
        type: String,
        default: '192px'
      },

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },

      destroyOnClose: Boolean
    },

    data() {
      return {
        closed: false,
        key: 0
      };
    },

    watch: {
      visible(val) {
        if (val) {
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
            // 弹框显示时设置屏幕居中
            const top = (document.documentElement.clientHeight - parseInt(this.height)) / 2;
            const left = (document.documentElement.clientWidth - parseInt(this.width)) / 2;
            this.$refs.dialog.style.left = left + 'px';
            this.$refs.dialog.style.top = top + 'px';
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
          if (this.destroyOnClose) {
            this.$nextTick(() => {
              this.key++;
            });
          }
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (!this.fullscreen) {
          style.width = this.width;
          style.height = this.height;
        }
        return style;
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
      this.$nextTick(() => {
        drag(this.$refs.title, this.$refs.dialog);
      });
    },

    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>

<style scoped>

  .el-dialog__wrapper {
    overflow: hidden !important;
  }

  .el-dialog {
    position: absolute;
    margin: 0;
  }

  .el-dialog__header {
    cursor: move;
  }
</style>
