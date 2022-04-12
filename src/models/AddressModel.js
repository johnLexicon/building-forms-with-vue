import { ref } from 'vue';

export default class AddressModel {
  street = ref('');
  city = ref('');
  stateProvince = ref('');
  zipCode = ref('');
}
