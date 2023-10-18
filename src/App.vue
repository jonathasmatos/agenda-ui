<template>
  <div>
    <Fieldset legend="Gerenciamento de Agenda">
      <Toolbar>
        <template #start>
          <Button label="Novo" />
        </template>
      </Toolbar>
      <DataTable :value="list">
        <Column header="Nome" field="name" :sortable="true">
          <!-- <template #body="slotProps">
              {{ slotProps.data.name}}
            </template> -->
        </Column>
        <Column header="Contato" field="contact" :sortable="true">
          <!-- <template #body="slotProps">
              {{ slotProps.data.name}}
            </template> -->
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
      </DataTable>
    </Fieldset>
  </div>
</template>

<script>
//Models
import Agenda from "./models/agenda";

//Services
import AgendaService from "./service/agenda_service";

export default {
  data() {
    return {
      obj: new Agenda(),
      service: new AgendaService(),
      list: [],
    };
  },
  created() {},
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      this.service.findAll().then((data) => {
        this.list = data;
        console.log(this.list);
      });
    },
  },
};
</script>

<style scoped>
status-true {
    background: #c8e6c9;
    color: #256029;
  }
  status-false {
    background: #ffcdd2;
    color: #c63737;
  }
</style>
