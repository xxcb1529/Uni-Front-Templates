import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'uniapp',
    navigationBarBackgroundColor: '#4C569C',
    navigationBarTextStyle: 'white',
    backgroundColor: '#4C569C',
  },
  easycom: {
    autoscan: true,
    custom: {
      "^wd-(.*)": "wot-design-uni/components/wd-$1/wd-$1.vue"
    },
  },
  tabBar: {
    color: '#aaa',
    selectedColor: '#4C569C',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '11px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home_active.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/user.png',
        selectedIconPath: 'static/tabbar/user.png',
        pagePath: 'pages/user/index',
        text: '用户',
      }
    ],
  },
})
