import { reactive, ref } from 'vue';
import BillingModel from '../models/BillingModel';
import ShippingModel from '../models/ShippingModel';
import CreditCardModel from '../models/CreditCardModel';

export default {
  shipping: reactive(new ShippingModel()),
  billing: reactive(new BillingModel()),
  creditcard: reactive(new CreditCardModel()),
  errorMessage: ref('')
};
