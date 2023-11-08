import { maxLength, required } from "@vuelidate/validators";

export default class Agenda {

    constructor() {
        this.id = null;
        this.name = null;
        this.contact = null;
        this.status = true;
    }

    validations() {
      return {
        name: {
            required,
            maxLength: maxLength(100)
        },
        contact: {
            required,
            maxLength: maxLength(15)
        },
        status: {
            required,
        },
      }  
        
    }

}