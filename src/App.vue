<template>
  <Error :message="errorMessage" />
  <PaymentView />
</template>

<script>
import PaymentView from "./views/PaymentView.vue";
import Error from "@/components/Error.vue";
import state from "@/state";
export default {
  name: "App",
  components: {
    PaymentView,
    Error,
  },
  setup() {
    return { errorMessage: state.errorMessage };
  },
};
</script>

<style>
</style>
