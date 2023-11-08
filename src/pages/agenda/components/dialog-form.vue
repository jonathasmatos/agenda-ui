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
            type="text"
            v-model="obj.name"
            placeholder="Digite Seu Nome"
            maxlength="150"
          />
          <small class="p-error" v-if="submitted && v$.obj.name.$invalid"
            >Nome é obrigatório.</small
          >
        </div>
        <div class="field">
          <label for="contact">Contato</label>
          <InputMask 
            id="contact"
            type="txt"
            v-model="obj.contact"
            mask="(99) 9999999-99"
            placeholder="9999999-99"
            maxlength="15"
          />
          <small class="p-error" v-if="submitted && v$.obj.contact.$invalid"
            >Contato é obrigatório.</small
          >
        </div>
       
      </div>
  
      <template #footer>
        <Button
          label="Salvar"
          class="p-button"
          icon="pi pi-check"
          @click="send(obj)"
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
  import Agenda from "../../../models/agenda/agenda";
  
  //Services
  import AgendaService from "../../../service/agenda/agenda_service";

  //VALIDATIONS
  import { useVuelidate } from "@vuelidate/core";
  
  export default {
    props: ["objSelected"],
    setup() {
      return { v$: useVuelidate() };
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
    validations() {
      return {
        obj: new Agenda(). validations(),
      };
    },
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
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.obj.id) {
          this.update();
        } else {
          this.create();
        }
      } else {
        return this.findAll();
      }
    },
    create() {
      this.submitted = true;
      this.service
        .create(this.obj)
        .then((data) => {
          if (data.status === 201) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro cadastrado com sucesso.",
              life: 3000,
            });
            this.hideDialog();
            this.$emit("findAll");
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
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.obj = this.objSelected;
    },
  },
};
</script>
<style scoped></style>
  