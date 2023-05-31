<template>
  <div class="configurator-wrapper">
    <div class="page-header px-7 pt-5">
      <h2 class="mb-5">Администрирование</h2>
      <v-tabs background-color="transparent">
        <v-tab exact link to="/administration">
          <span style="text-transform: none !important">Пользователи</span>
        </v-tab>
        <v-tab
          v-if="SELECTED_CONTRAGENT.partner"
          link
          to="/administration/contragents"
        >
          <span style="text-transform: none !important">Контрагенты</span>
        </v-tab>
        <v-tab link to="/administration/contragent-profile">
          <span style="text-transform: none !important">
            Профиль контрагента
          </span>
        </v-tab>
        <v-tab link to="/administration/tickets">
          <span style="text-transform: none !important">Техподдержка</span>
        </v-tab>
        <!--<v-tab link to="/divisions/terminals">-->
        <!--  <span style="text-transform: none !important">Терминалы</span>-->
        <!--</v-tab>-->
        <!--<v-tab link to="/divisions/files">-->
        <!--  <span style="text-transform: none !important">Дистрибутивы</span>-->
        <!--</v-tab>-->
      </v-tabs>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminPage',
  computed: {
    ...mapGetters(['SELECTED_CONTRAGENT', 'USER_ROLE']),
  },
}
</script>

<style scoped></style>
