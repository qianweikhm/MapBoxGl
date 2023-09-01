import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'


import naive from 'naive-ui'

const app = createApp(App)
app.use(VueViewer)
app.use(naive)
app.mount('#app')
