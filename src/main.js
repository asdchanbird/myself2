import { createApp } from 'vue'
import './style.css'
import router from "./router";
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
const app = createApp(App);
app.use(router);
app.use(ViewUIPlus);
app.mount("#app");
