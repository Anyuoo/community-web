import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
    //引入 iconfont
import "@/assets/icon/iconfont.js";

import SvgIcon from "@/components/svg-icon.vue";
//全局注册组件
Vue.component("svg-icon", SvgIcon);
// //
// import VuevideoPlayer from 'vue-video-player';

// import 'video.js/dist/video-js.css';

// Vue.use(VuevideoPlayer);
new Vue({
    router,
    apolloProvider: createProvider(),
    render: h => h(App)
}).$mount('#app')