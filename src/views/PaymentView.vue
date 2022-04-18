<template>
  <div class="container-lg container-fluid">
    <h1>Payment</h1>
    <form novalidate class="grid" @submit.prevent="handleSave">
      <div class="row">
        <div class="col">
          <div><strong>Shipping information</strong></div>
          <div class="mb-2">
            <label for="name">Name</label>
            <input
              v-model="payment.shipping.name"
              type="text"
              name="name"
              id="name"
              class="form-control"
            />
          </div>
          <div class="mb-2">
            <label for="company">Company</label>
            <input
              v-model="payment.shipping.company"
              type="text"
              name="company"
              id="company"
              class="form-control"
            />
          </div>
          <address-view :address="payment.shipping" :isDisabled="false" />
          <div>
            <input
              class="btn btn-primary"
              type="submit"
              value="Next"
              :disabled="creditCardModel.$invalid"
            />
          </div>
        </div>
        <div class="col">
          <div><strong>Billing information</strong></div>
          <div class="form-check">
            <input
              v-model="payment.billing.sameAsShipment"
              type="checkbox"
              class="form-check-input"
              name="sameAsShipping"
              id="sameAdShipping"
            />
            <label class="form-check-label" for="sameAsShipping"
              >Same as shipping</label
            >
          </div>
          <address-view
            :address="payment.billing"
            :isDisabled="payment.billing.sameAsShipment"
          />
          <div><strong>Credit Card</strong></div>
          <div>
            <label for="ccNumber">Credit card number</label>
            <input
              id="ccNumber"
              type="text"
              class="form-control"
              v-model="creditCardModel.number.$model"
            />
            <validation-message :model="creditCardModel.number" />
          </div>
          <div>
            <label for="cardName">Name of card</label>
            <input
              id="cardName"
              type="text"
              class="form-control"
              v-model="creditCardModel.name.$model"
            />
            <validation-message :model="creditCardModel.name" />
          </div>
          <div class="row">
            <div class="col">
              <div>
                <label for="expirationMonth">Expiration Month</label>
                <select
                  class="form-select"
                  name="expirationMonth"
                  id="expirationMonth"
                  v-model="creditCardModel.expirationMonth.$model"
                >
                  <option
                    v-for="month in months"
                    :key="month.number"
                    :value="month.number"
                  >
                    {{ month.name }}
                  </option>
                </select>
                <validation-message :model="creditCardModel.expirationMonth" />
              </div>
            </div>
            <div class="col">
              <div>
                <label for="expirationYear">Expiration Year</label>
                <select
                  class="form-select"
                  name="expirationYear"
                  id="expirationYear"
                  v-model="creditCardModel.expirationYear.$model"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
                <validation-message :model="creditCardModel.expirationYear" />
              </div>
            </div>
            <div class="col">
              <div>
                <label for="cvv">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  class="form-control"
                  v-model="creditCardModel.cvv.$model"
                />
                <validation-message :model="creditCardModel.cvv" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- <div>
      <pre>{{ payment }}</pre>
    </div>
    <div>
      <pre>{{ creditCardModel }}</pre>
    </div> -->
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import months from "@/data/months.js";
import AddressView from "./AddressView.vue";
import state from "../state";
import ValidationMessage from "@/components/ValidationMessage.vue";
export default {
  name: "PaymentView",
  components: {
    AddressView,
    ValidationMessage,
  },
  setup() {
    const payment = reactive(state);

    const years = Array.from(
      { length: 10 },
      (_, index) => new Date().getUTCFullYear() + index
    );

    const creditCardModel = state.creditcard.toModel();

    async function handleSave() {
      const result = await creditCardModel.value.$validate();

      state.errorMessage.value = result.toString();
    }

    watch(
      // What to watch
      () => payment.billing.sameAsShipment,
      // What to do
      () => {
        if (payment.billing.sameAsShipment === true) {
          payment.billing.clear();
        }
      }
    );

    return { payment, handleSave, years, months, creditCardModel };
  },
};
</script>

<style>
</style>