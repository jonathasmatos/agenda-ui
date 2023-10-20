<template>
    <Dialog
      v-model:visible="visibleDialog"
      :style="{ width: '520px' }"
      header="Fomulário Agenda"
      :modal="true"
      @hide="hideDialog"
      class="p-fluid"
    >
      <div class="fluid">
        <div class="field">
          <label for="name">Nome</label>
          <InputText
            id="name"
            v-model="obj.name.$model"
            placeholder="Digite Seu Nome"
            maxlength="255"
name          />
          <!-- <small class="p-error" v-if="submitted && obj.name.$invalid"
            >Descrição deve ter entre 3 e 255 caracteres.</small
          > -->
        </div>
        <div class="field">
          <label for="contact">Contato</label>
          <InputText
            id="contact"
            v-model="obj.contact.$model"
            type="date"
            :class="{ 'p-invalid': submitted && obj.contact.$invalid }"
          />
          <!-- <small class="p-error" v-if="submitted && obj.contact.$invalid"
            >Validade é obrigatória.</small
          > -->
        </div>
      </div>
  
      <template #footer>
        <Button
          label="Salvar"
          class="p-button"
          icon="pi pi-check"
          @click="send(!v$.obj.$invalid)"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button p-button-text"
          @click="hideDialog"
        />
      </template>
    </Dialog>
  </template>
  <script>
  //Models
  import Agenda from "../models/agenda";
  
  //Services
  import AgendaService from "../service/agenda_service";

//   //VALIDATIONS
//   import { useVuelidate } from "@vuelidate/core";
  
  export default {
    props: ["objSelected"],
    setup() {
      return ;
    },
    data() {
      return {
        obj: new Agenda(),
        submitted: false,
        service: new AgendaService(),
      };
    },
    mounted() {
      
    },
    // validations() {
    //   return {
    //     obj: new Lot().validations(),
    //   };
    // },
    computed: {
      visibleDialog: {
        get() {
          let value = this.$store.state.views.agenda.dialogForm;
          if (value === true) this.getData();
          return value;
        },
        set(value) {
          this.$store.state.views.agenda.dialogForm = value;
        },
      },
    },
    methods: {
        create() {
        this.agendaService.findAll().then((data) => {
          this.agenda = data;
        });
      },
      send(isFormValid) {
        this.submitted = true;
        if (isFormValid) {
          if (this.obj.id) {
            this.update();
          } else {
            this.create();
          }
        } else {
          return;
        }
      },
      create() {
        this.submitted = true;
        this.service
          .create(this.obj)
          .then((data) => {
            if (data.status === 201) {
              this.$msgSuccess(data);
              this.$emit("findAll");
              this.hideDialog();
            }
          })
          .catch((error) => {
            this.$msgErro(error);
          });
      },
      update() {
        this.submitted = true;
        this.service
          .update(this.obj)
          .then((data) => {
            if (data.status === 200) {
              this.$msgSuccess(data);
              this.$emit("findAll");
              this.hideDialog();
            }
          })
          .catch((error) => {
            this.$msgErro(error);
          });
      },
      hideDialog() {
        this.obj = new Agenda();
        this.submitted = false;
        this.visibleDialog = false;
      },
      getData() {
        this.obj = this.objSelected;
      },
    },
  };
  </script>
  <style scoped></style>
  