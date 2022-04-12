<template>
  <Error :message="errorMessage" />
  <PaymentView @onError="reportError" />
</template>

<script>
import { ref } from "vue";
import PaymentView from "./views/PaymentView.vue";
import Error from "@/components/Error.vue";
export default {
  name: "App",
  components: {
    PaymentView,
    Error,
  },
  setup() {
    const errorMessage = ref("");

    function reportError(message) {
      errorMessage.value = message;
    }

    return { errorMessage, reportError };
  },
};
</script>

<style>
</style>
