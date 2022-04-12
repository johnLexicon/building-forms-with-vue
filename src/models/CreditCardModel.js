import { ref } from 'vue';

export default class CreditCardModel {
  number = ref('');
  name = ref('');
  expirationMonth = ref(1);
  expirationYear = ref(2022);
  cvv = ref('');
}
