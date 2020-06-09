import forElementUI from 'webpack-theme-color-replacer/forElementUI';
import client from 'webpack-theme-color-replacer/client';
import {Message} from 'element-ui'
import {LOCAL_STORAGE_KEY} from './const'
import Storage from './storage'
import variables from '@/styles/element-variables.scss'

/**
 * @Author: HuangXuLin
 * @Description: 主题颜色相关操作
 */
const theme = {
  get() {
    return Storage.get(LOCAL_STORAGE_KEY.THEME_COLOR) || variables.theme
  },
  // 初始化，设置主题颜色
  init() {
    const options = {
      newColors: forElementUI.getElementUISeries(this.get())
    };
    client.changer.changeColor(options, Promise)
  },
  // 修改主题颜色
  change(themeColor) {
    Storage.set(LOCAL_STORAGE_KEY.THEME_COLOR, themeColor);
    const options = {
      newColors: forElementUI.getElementUISeries(themeColor)
    };
    client.changer.changeColor(options, Promise).finally(() => Message({
      message: '换肤成功',
      type: 'success'
    }))
  }
};

export default theme;
