import "primevue/resources/themes/bootstrap4-light-blue/theme.css"
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";



import PrimeVue from "primevue/config";
import Fieldset from "primevue/fieldset";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import msgErro from "./utilities/message/Erro";
import msgSuccess from "./utilities/message/Success";
import msgInfo from "./utilities/message/Info";
import Calendar from 'primevue/calendar';
import Tooltip from "primevue/tooltip";


const app = createApp(App);
app.use(ConfirmationService);
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.directive("tooltip", Tooltip);


app.component("Fieldset", Fieldset);
app.component("Toolbar", Toolbar);
app.component("Button", Button);
app.component("InputMask", InputMask);
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Toast", Toast);
app.component('Calendar', Calendar);


app.config.globalProperties.$msgErro = msgErro;
app.config.globalProperties.$msgSuccess = msgSuccess;
app.config.globalProperties.$msgInfo = msgInfo;

app.mount("#app");
