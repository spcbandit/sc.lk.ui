<template>
  <div class="configurator-wrapper">
    <div class="page-header px-7 pt-5">
      <h2 class="mb-5">Печатные формы</h2>
      <!--<v-tabs background-color="transparent">-->
      <!--  <v-tab exact link to="/configurator">-->
      <!--    <v-icon>mdi-view-dashboard-outline</v-icon>-->
      <!--  </v-tab>-->
      <!--  <v-tab link to="/configurator/configurations">-->
      <!--    <span style="text-transform: none !important">Все конфигурации</span>-->
      <!--  </v-tab>-->
      <!--  <v-tab link to="/configurator/processes">-->
      <!--    <span style="text-transform: none !important">Бизнес-процессы</span>-->
      <!--  </v-tab>-->
      <!--  <v-tab link to="/configurator/terminals">-->
      <!--    <span style="text-transform: none !important">Терминалы</span>-->
      <!--  </v-tab>-->
      <!--</v-tabs>-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'

export default {
  name: 'ReportsPage',
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
