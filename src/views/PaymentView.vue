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
              v-model="payment.shipping.fullname"
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
          <address-view
            :address="payment.shipping.address"
            :isDisabled="false"
          />
          <div>
            <input class="btn btn-primary" type="submit" value="Next" />
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
            :address="payment.billing.address"
            :isDisabled="payment.billing.sameAsShipment"
          />
          <div><strong>Credit Card</strong></div>
          <div>
            <label for="ccNumber">Credit card number</label>
            <input
              id="ccNumber"
              type="text"
              class="form-control"
              v-model="payment.creditcard.number"
            />
          </div>
          <div>
            <label for="cardName">Name of card</label>
            <input
              id="cardName"
              type="text"
              class="form-control"
              v-model="payment.creditcard.name"
            />
          </div>
          <div class="row">
            <div class="col">
              <div>
                <label for="expirationMonth">Expiration Month</label>
                <select
                  class="form-select"
                  name="expirationMonth"
                  id="expirationMonth"
                  v-model="payment.creditcard.expirationMonth"
                >
                  <option
                    v-for="month in months"
                    :key="month.number"
                    :value="month.number"
                  >
                    {{ month.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col">
              <div>
                <label for="expirationYear">Expiration Year</label>
                <select
                  class="form-select"
                  name="expirationYear"
                  id="expirationYear"
                  v-model="payment.creditcard.expirationYear"
                >
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col">
              <div>
                <label for="cvv">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  class="form-control"
                  v-model="payment.creditcard.cvv"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div>
      <pre>{{ payment }}</pre>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import months from "@/data/months.js";
import AddressView from "./AddressView.vue";
import state from "../state";
export default {
  name: "PaymentView",
  components: {
    Error,
    AddressView,
  },
  setup(_, { emit }) {
    const payment = reactive({
      shipping: { address: {} },
      billing: { sameAsShipment: false, address: {} },
      creditcard: {},
    });

    const years = Array.from(
      { length: 10 },
      (_, index) => new Date().getUTCFullYear() + index
    );

    function handleSave() {
      emit("onError", "No API available.");
    }

    watch(
      // What to watch
      () => payment.billing.sameAsShipment,
      // What to do
      () => {
        if (payment.billing.sameAsShipment === true) {
          payment.billing.address = {};
        }
      }
    );

    return { payment, handleSave, years, months };
  },
};
</script>

<style>
</style>