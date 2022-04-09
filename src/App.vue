<template>
  <div class="container-lg container-fluid">
    <h1>Payment</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
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
          <div class="mb-2">
            <label for="address">Address</label>
            <input
              v-model="payment.shipping.address"
              type="text"
              name="address"
              id="address"
              class="form-control"
            />
          </div>
          <div class="row mb-2">
            <div class="col">
              <label for="city">City</label>
              <input
                v-model="payment.shipping.city"
                type="text"
                name="city"
                id="city"
                class="form-control"
              />
            </div>
            <div class="col">
              <label for="states">States</label>
              <select
                class="form-select"
                v-model="payment.shipping.states"
                name="states"
                id="states"
              >
                <option
                  v-for="state in states"
                  :key="state.name"
                  :value="state.abbreviation"
                >
                  {{ state.name }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="zipcode">Zipcode</label>
              <input
                v-model="zipCode"
                type="text"
                name="zipcode"
                id="zipcode"
                class="form-control"
              />
            </div>
          </div>
          <div>
            <input class="btn btn-primary" type="submit" value="Next" />
          </div>
        </div>
        <div class="col">
          <div><strong>Billing information</strong></div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              name="sameAsShipping"
              id="sameAdShipping"
            />
            <label class="form-check-label" for="sameAsShipping"
              >Same as shipping</label
            >
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
import { ref, computed, reactive } from "vue";
import states from "./data/states.js";
export default {
  name: "App",
  setup() {
    const payment = reactive({ shipping: { zipCode: "" }, billing: {} });
    const error = ref("");

    function handleSave() {
      error.value = "No API available.";
    }

    const zipCode = computed({
      get: () => payment.shipping.zipCode,
      set: (value) => {
        if (value.length > 5 && value.indexOf("-") === -1) {
          value = value.substring(0, 5) + "-" + value.substring(5);
        }
        payment.shipping.zipCode = value;
      },
    });

    return { payment, states, handleSave, zipCode, error };
  },
};
</script>

<style>
</style>
