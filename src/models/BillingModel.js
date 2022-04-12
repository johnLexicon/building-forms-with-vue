import AddressModel from './AddressModel.js';
import { ref } from 'vue';

export default class BillingModel extends AddressModel {
  sameAsShipping = ref(false);
}
