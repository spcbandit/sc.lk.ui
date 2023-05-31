<template>
  <div class="configurator-wrapper">
    <div class="page-header px-7 pt-5">
      <h2 class="mb-5">Подразделения</h2>
      <v-tabs background-color="transparent">
        <v-tab exact link to="/divisions">
          <span style="text-transform: none !important">Подразделения</span>
        </v-tab>
        <v-tab link to="/divisions/agents">
          <span style="text-transform: none !important">Агенты</span>
        </v-tab>
        <v-tab link to="/divisions/terminals">
          <span style="text-transform: none !important">Терминалы</span>
        </v-tab>
        <v-tab link to="/divisions/files">
          <span style="text-transform: none !important">Дистрибутивы</span>
        </v-tab>
        <v-tab link to="/divisions/license">
          <span style="text-transform: none !important">Лицензии</span>
        </v-tab>
      </v-tabs>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DivisionsPage',
}
</script>

<style scoped></style>
