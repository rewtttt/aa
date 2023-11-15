import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Grid, GridItem } from 'vant';
import { Search } from 'vant';
import pinia from './stores/index'
import '@/style/index.css'

const app = createApp(App)
app.use(Grid);
app.use(GridItem);
app.use(Search)

app.use(pinia)
app.use(router)
app.mount('#app')
