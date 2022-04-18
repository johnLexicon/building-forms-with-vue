<template>
  <div class="mb-2">
    <label for="street">Street</label>
    <input
      v-model="addressModel.street.$model"
      type="text"
      name="street"
      id="street"
      class="form-control"
      :disabled="isDisabled"
    />
    <validation-message :model="addressModel.street" />
  </div>
  <div class="row mb-2">
    <div class="col">
      <label for="city">City</label>
      <input
        v-model="addressModel.city.$model"
        type="text"
        name="city"
        id="city"
        class="form-control"
        :disabled="isDisabled"
      />
      <validation-message :model="addressModel.city" />
    </div>
    <div class="col">
      <label for="states">States</label>
      <select
        class="form-select"
        v-model="addressModel.stateProvince.$model"
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
      <validation-message :model="addressModel.stateProvince" />
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
      <validation-message :model="addressModel.zipCode" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import states from "@/data/states.js";
import ValidationMessage from "@/components/ValidationMessage.vue";
export default {
  name: "AddressView",
  components: {
    ValidationMessage,
  },
  props: {
    address: {
      type: Object,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  setup(props) {
    const addressModel = props.address.toModel();

    const zipCode = computed({
      get: () => addressModel.value.zipCode.$model,
      set: (value) => {
        if (value.length > 5 && value.indexOf("-") === -1) {
          value = value.substring(0, 5) + "-" + value.substring(5);
        }
        addressModel.value.zipCode.$model = value;
      },
    });
    return { addressModel, zipCode, states };
  },
};
</script>

<style>
</style>