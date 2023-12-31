import axios from "axios";

export default class AgendaService {

  findAll() {
    return axios.get("http://localhost:8080/agenda").then((res) => res.data);
  }

  findById(id) {
    return axios.get(`${"http://localhost:8080/agenda"}/${id}`);
  }
  findByStatus(status) {
    return this.execute("GET", `/status/${status}`).then((res) => res.data);
  }

  create(obj) {
    return axios.post("http://localhost:8080/agenda", obj);
  }

  update(obj) {
    return axios.put("http://localhost:8080/agenda", obj);
  }
  changeStatus(id) {

    return this.execute("PUT", `/status/${id}`);

  }

  execute(method, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: "http://localhost:8080/agenda" + params,
        
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }






  delete(id) {
    return axios.delete(`${"http://localhost:8080/agenda"}/${id}`)
  }
}
