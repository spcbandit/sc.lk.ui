<template>
  <div class="configurator-wrapper">
    <div class="page-header px-7 pt-5">
      <h2 class="mb-5">Магазин бизнес процессов</h2>
      <v-tabs background-color="transparent">
        <!--<v-tab exact link to="/configurator">-->
        <!--  <v-icon>mdi-view-dashboard-outline</v-icon>-->
        <!--</v-tab>-->
        <v-tab link to="/market">
          <span style="text-transform: none !important">Маркет</span>
        </v-tab>
        <v-tab link to="/market">
          <span style="text-transform: none !important">Шаблоны</span>
        </v-tab>
        <v-tab link to="/market">
          <span style="text-transform: none !important">История покупок</span>
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'

export default {
  name: 'MarketPage',
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
