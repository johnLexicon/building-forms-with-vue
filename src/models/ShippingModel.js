import AddressModel from './AddressModel.js';
import { ref } from 'vue';

export default class extends AddressModel {
  name = ref('');
  company = ref('');
}
