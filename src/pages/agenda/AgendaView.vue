<template>
    <div>
      <Fieldset legend="Gerenciamento de Agenda">
        <Toolbar class="p-mb-4">
          <template #start>
            <Button
              label="Novo"
              icon="pi pi-plus"
              class="mr-2"
              @click="showCreate()"
            />
          </template>
          <template #end>
            <div
              class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
            >
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Buscar..."
                />
              </span>
            </div>
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
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Contato" field="contact" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.contact }}
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
              />
              &nbsp;
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
      <Toast />
      <ConfirmDialog></ConfirmDialog>
    </div>
    <!--MODAL CADASTRAR-->
    <dialog-form :objSelected="obj" @findAll="findAll" />
    <!--FIM MODAL CADASTRAR-->
  </template>
  <script>
  //import { ref } from "vue";
  
  import { FilterMatchMode } from "primevue/api";
  //Models
  import Agenda from "../../models/agenda/agenda";
  
  //Services
  import AgendaService from "../../service/agenda/agenda_service";
  
  //components
  import DialogForm from "../../pages/agenda/components/dialog-form.vue";
  
  export default {
    components: {
      DialogForm,
    },
    data() {
      return {
        loading: false,
        list: [],
        obj: new Agenda(),
        filters: {},
        service: new AgendaService(),
      };
    },
  
    created() {
      this.initFilters();
    },
    mounted() {
      this.findAll();
    },
    methods: {
      changeStatus(data) {
        this.service
          .changeStatus(data.id)
          .then((data) => {
            if (data.status === 200) {
              this.$msgSuccess(data);
              this.hideDialog();
            }
            this.findAll();
          })
          .catch((error) => {
            this.$msgErro(error);
          });
      },
      showCreate() {
        this.obj = new Agenda();
        this.$store.state.views.agenda.dialogForm = true;
        this.findAll();
      },
      showUpdate(obj) {
        this.obj = obj;
        this.$store.state.views.agenda.dialogForm = true;
        console.log("Upadte");
      },
  
      findAll() {
        this.loading = true;
        this.service.findAll().then((data) => {
          this.list = data;
          this.loading = false;
        });
      },
      showRemove(data) {
        this.$confirm.require({
          message: "Deseja Excluir esse registro?",
          header: "Deseja deletar?",
          icon: "pi pi-exclamation-triangle",
          acceptLabel: "Sim",
          rejectLabel: "Não",
          accept: () => {
            this.service
              .delete(data.id)
              .then((data) => {
                this.$msgSuccess(data);
                this.findAll();
              })
              .catch((error) => {
                this.$msgErro(error);
              });
          },
        });
        console.log("Remover");
      },
      hideDialog() {
      this.agebda = new Agenda();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
      initFilters() {
        this.filters = {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        };
      },
    },
  };
  // const date = ref();
  </script>
  
  <style lang="scss" scoped>
  @import url("../../App.scss");
  </style>