<template>
  <div class="configurator-wrapper">
    <div class="page-header px-7 pt-5">
      <h2 class="mb-5">Управление балансом</h2>
      <v-tabs background-color="transparent">
        <v-tab exact link to="/finance">
          <span style="text-transform: none !important">История операций</span>
        </v-tab>
        <v-tab exact link to="/finance">
          <span style="text-transform: none !important">
            Управление билинг лицами
          </span>
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'

export default {
  name: 'FinancePage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  layout: 'default',
  data() {
    return {
      users: null,
    }
  },
  async fetch() {},
  beforeMount() {},
  methods: {},
}
</script>

<style scoped></style>
