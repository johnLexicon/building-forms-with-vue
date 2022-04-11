<template>
  <div class="mb-2">
    <label for="street">Street</label>
    <input
      v-model="address.street"
      type="text"
      name="street"
      id="street"
      class="form-control"
      :disabled="isDisabled"
    />
  </div>
  <div class="row mb-2">
    <div class="col">
      <label for="city">City</label>
      <input
        v-model="address.city"
        type="text"
        name="city"
        id="city"
        class="form-control"
        :disabled="isDisabled"
      />
    </div>
    <div class="col">
      <label for="states">States</label>
      <select
        class="form-select"
        v-model="address.stateProvince"
        name="states"
        id="states"
        :disabled="isDisabled"
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
        :disabled="isDisabled"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import states from "@/data/states.js";
export default {
  name: "AddressView",
  props: {
    address: {
      type: Object,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  setup(props) {
    const zipCode = computed({
      get: () => props.address.zipCode,
      set: (value) => {
        if (value.length > 5 && value.indexOf("-") === -1) {
          value = value.substring(0, 5) + "-" + value.substring(5);
        }
        props.address.zipCode = value;
      },
    });
    return { zipCode, states };
  },
};
</script>

<style>
</style>