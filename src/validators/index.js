import cardvalidator from 'card-validator';

export const creditCard = {
  $validator: (value) => {
    //Just validates the format not a live card
    return cardvalidator.number(value).isValid();
  },
  $message: 'Not a valid creditcard number'
};
