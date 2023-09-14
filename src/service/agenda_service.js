import axios from "axios";

export default class AgendaService {

  findAll() {
    return axios.get("http://localhost:8080/agenda").then((res) => res.data);
  }

  findById(id) {
    return axios.get(`${"http://localhost:8080/agenda"}/${id}`);
  }

  create(obj) {
    return axios.post("http://localhost:8080/agenda", obj);
  }

  update(obj) {
    return axios.put("http://localhost:8080/agenda", obj);
  }

  delete(id) {
    return axios.delete(`${"http://localhost:8080/agenda"}/${id}`)
  }
}
