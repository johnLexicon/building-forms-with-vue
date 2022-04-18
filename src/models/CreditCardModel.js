import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { creditCard } from '@/validators';
import { ref } from 'vue';

export default class CreditCardModel {
  number = ref('');
  name = ref('');
  expirationMonth = ref(1);
  expirationYear = ref(2022);
  cvv = ref('');

  get rules() {
    return {
      number: { required, creditCard },
      name: { required },
      expirationMonth: { required },
      expirationYear: { required },
      cvv: { required }
    };
  }

  toModel() {
    return useVuelidate(this.rules, this);
  }
}
