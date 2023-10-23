export default function msgSuccess(response, msg) {
    switch (response.status) {
        case 200:
            this.$toast.add({
                severity: "success",
                summary: "Alerta de Sucesso.",
                detail: "Atualizado com sucesso.",
                life: 3000,
            });
            break;
        case 201:
            this.$toast.add({
                severity: "success",
                summary: "Alerta de Sucesso.",
                detail: "Cadastrado com sucesso.",
                life: 3000,
            });
            break;
        case 204:
            this.$toast.add({
                severity: "success",
                summary: "Alerta de Sucesso.",
                detail: "Operação realizada com sucesso.",
                life: 3000,
            });
            break;
        default:
            this.$toast.add({
                severity: "success",
                summary: "Alerta de Sucesso",
                detail: msg,
                
                
            });
    }
}