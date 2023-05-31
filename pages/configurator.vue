<template>
  <div class="configurator-wrapper">
    <div v-if="!$route.params.bprocessId" class="page-header px-7 pt-5">
      <h2 class="mb-5">Мастер конфигураций</h2>
      <v-tabs background-color="transparent">
        <v-tab exact link to="/configurator">
          <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-tab>
        <v-tab link to="/configurator/configurations">
          <span style="text-transform: none !important">Все конфигурации</span>
        </v-tab>
        <v-tab link to="/configurator/processes">
          <span style="text-transform: none !important">Бизнес-процессы</span>
        </v-tab>
        <v-tab link to="/configurator/terminals">
          <span style="text-transform: none !important">Терминалы</span>
        </v-tab>
      </v-tabs>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'ConfigurationsIndex',
}
</script>

<style scoped></style>
