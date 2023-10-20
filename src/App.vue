<template>
  <div>
    <Fieldset legend="Gerenciamento de Agenda">
      <Toolbar>
        <template #start>
          <Button
              label="Novo"
              icon="pi pi-plus"
              class="mr-2"
              @click="showCreate()"
            />
        </template>
      </Toolbar>
      <DataTable 
          ref="dt"
          dataKey="id"
          class="p-datatable-sm"
          :value="list"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          :filters="filters"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Exibindo de {first} a {last} no total de {totalRecords} registros."
          :loading="loading"
      >
        <template #empty>
            <div class="p-text-center">Nenhum resultado encontrado...</div>
          </template>
          <Column header="#" field="id" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
        <Column header="Nome" field="name" :sortable="true">
          <template #body="slotProps">
              {{ slotProps.data.name}}
            </template>
        </Column>
        <Column header="Contato" field="contact" :sortable="true">
          <template #body="slotProps">
              {{ slotProps.data.contact}}
            </template>
        </Column>
        <Column field="status" header="Status" ref="status">
            <template #body="slotProps">
              <span class="p-column-title">Status:</span>
              <span
                v-if="slotProps.data.status === true"
                :class="'badge status-' + slotProps.data.status"
                @click="changeStatus(slotProps.data)"
                v-tooltip.top="'Clique para INATIVAR'"
                style="cursor: pointer"
                >Ativo</span
              >
              <span
                v-if="slotProps.data.status === false"
                :class="'badge status-' + slotProps.data.status"
                @click="changeStatus(slotProps.data)"
                v-tooltip.top="'CLIQUE ATIVAR'"
                style="cursor: pointer"
                >Inativo</span
              >
            </template>
          </Column>
          <Column header="Ações">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="showUpdate(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA EDITAR'"
              /> &nbsp;
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="showRemove(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA EXCLUIR'"
              />
            </template>
          </Column>
      </DataTable>
    </Fieldset>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<!--MODAL CADASTRAR-->
<dialog-form :objSelected="obj" @findAll="findAll" />
<!--FIM MODAL CADASTRAR-->

<script>
//Models
import Agenda from "./models/agenda";

//Services
import AgendaService from "./service/agenda_service";


//components
import DialogForm from "./components/dialog-form.vue";

export default {
    components: {
      DialogForm,
    },
  data() {
    return {
      obj: new Agenda(),
      service: new AgendaService(),
      list: [],
      filters: {},
      loading: false
    };
  },
  mounted() {
    this.findAll();
    //this.changeStatus()
  },
  methods: {
    showCreate() {
      this.obj = new Agenda();
      //this.$store.state.views.agenda.dialogForm = true;
      //this.$store.state.views.agenda.dialogForm = false;
      console.log("cheguei");
    },
    findAll() {
      this.service.findAll().then((data) => {
        this.list = data;
        console.log(this.list);
      });
    },
    changeStatus(data) {
      this.service.changeStatus(data.id).then(() => {
        this.findAll();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("./utilities/App.scss");
</style>