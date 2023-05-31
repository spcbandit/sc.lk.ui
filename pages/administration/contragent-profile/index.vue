<template>
  <div class="configurator-wrapper">
    <div class="pt-5 px-7">
      <div class="mb-5">
        <h3>Профиль контрагента</h3>
      </div>
      <div>
        <p>
          <span>Наименование:</span>
          <span>{{ SELECTED_CONTRAGENT.name }}</span>
        </p>
        <p>
          <span>Статус партнера:</span>
          <span>
            {{ SELECTED_CONTRAGENT.partner ? 'Дистрибьютор' : 'Клиент' }}
          </span>
        </p>
      </div>
      <!-- <div class="d-flex">
        <v-text-field
          v-model="searchContragents"
          outlined
          dense
          color="primary"
          label="Искать"
          class="mx-0"
        />
        <v-btn
          class="mb-5 ml-5"
          height="40"
          elevation="0"
          color="primary"
          @click="addNewContragent = true"
        >
          Добавить контрагента
        </v-btn>
      </div>-->
      <div class="d-flex mt-5">
        <v-btn
          v-if="!SELECTED_CONTRAGENT.partner"
          :disabled="$store.getters.USER_ROLE.AccessType === 1"
          elevation="0"
          color="primary"
          @click="createTicketDialog = true"
        >
          Стать дистрибьютором
        </v-btn>
      </div>
    </div>
    <v-dialog v-model="createTicketDialog" max-width="600">
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Отправить заявку</h2>
          <v-btn icon @click="createTicketDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content px-5">
          <p>Вы хотите стать нашим дистрибьютором?</p>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="createPartnerTicket">
            Отправить заявку
          </v-btn>
          <v-btn color="error" @click="createTicketDialog = false">
            Отмена
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {mapActions, mapGetters} from 'vuex'
import ProfilePart from "@/api/parts/ProfilePart";

export default {
  name: 'ContragentProfilePage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  layout: 'default',
  fetchOnServer: false,
  data() {
    return {
      createTicketDialog: false,
    }
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  async fetch() {
    await this.GetContragents().then(() => {
      this.mainContragent = this.CONTRAGENTS
    })
    await this.GetChildContragents()
  },
  computed: {
    ...mapGetters([
      'CONTRAGENTS',
      'CHILD_CONTRAGENTS',
      'SELECTED_CONTRAGENT',
    ]),
  },
  beforeMount() {},
  methods: {
    ...mapActions(['GetContragents','CreateChildContragent','GetChildContragents', 'CreatePartnerTicket']),
    async createPartnerTicket() {
      await this.CreatePartnerTicket().then(()=> {
        this.createTicketDialog = false
      })
    }

  // 'TicketType=0'
  // 'TicketStatusType=0'
  // 'FromUser=08da6eea-bbab-4079-8b88-707238265707'
  // 'FromContragent=08da79ec-86c5-45f4-8092-cc13b928f49c'
  // 'Message=Заявка на партнерство'
  },
}
</script>

<style scoped></style>
