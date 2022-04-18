import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

export default class AddressModel {
  street = ref('');
  city = ref('');
  stateProvince = ref('');
  zipCode = ref('');

  get rules() {
    return {
      street: { required, minLength: minLength(5) },
      city: { required, minLength: minLength(2) },
      stateProvince: { required },
      zipCode: { required, minLength: minLength(5) }
    };
  }

  toModel() {
    return useVuelidate(this.rules, this);
  }

  clear() {
    this.street = '';
    this.city = '';
    this.stateProvince = '';
    this.zipCode = '';
  }
}
