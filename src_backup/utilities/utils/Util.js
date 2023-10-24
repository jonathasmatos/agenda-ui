export default class Util {
  formatBoolean(value) {
    if (value === true) return "SIM";
    return "NÃO";
  }
  formatAtivo(value) {
    if (value === true) return "ATIVO";
    return "INATIVO";
  }
  formatCondition(value) {
    if (value === true) return "BOM";
    return "RUIM";
  }
  formatStatus(situacao) {
    switch (situacao) {
      case "EM_ABERTO":
        return "Em Aberto";
      case "FINALIZADO":
        return "Finalizado";
    }
  }
  formatEventStatus(status) {
    switch (status) {
      case "REQUESTED":
        return "SOLICITADO";
      case "CANCELED":
        return "CANCELADO";
      case "SCHEDULE":
        return "AGENDADO";
      case "FINISHED":
        return "FINALIZADO";
    }
  }
  formatType(tipo) {
    switch (tipo) {
      case "INTERNAL":
        return "INTERNO";
      case "EXTERNAL":
        return "EXTERNO";
    }
  }
  formatDay(day) {
    switch (day) {
      case "MONDAY":
        return "Segunda-feira";
      case "TUESDAY":
        return "Terça-feira";
      case "WEDNESDAY":
        return "Quarta-feira";
      case "THURSDAY":
        return "Quinta-feira";
      case "FRIDAY":
        return "Sexta-feira";
      case "SATURDAY":
        return "Sábado";
      case "SUNDAY":
        return "Domingo";
    }
  }
}
