<template>
  <div class="configurator-wrapper">
    <div class="pt-5 px-7">
      <div class="mb-5">
        <h3>Техподдержка</h3>
        <div class="mt-5">
          <div
            v-for="item in TICKETS"
            :key="item.id"
            style="
              background-color: #33333310;
              padding: 20px;
              justify-content: flex-start;
              column-gap: 20px;
            "
            class="d-flex align-center mt-3"
          >
            <div style="width: 250px">
              {{ getContragentsName(item.fromContragent) }}
            </div>
            <div style="width: 250px">{{ item.message }}</div>
            <div style="width: 250px">
              <v-btn @click="setContragentToPartner(item.fromContragent)">
                Одобрить
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {mapActions, mapGetters} from 'vuex'
import ProfilePart from "@/api/parts/ProfilePart";
import cons from "@/pages/cons";

export default {
  name: 'TicketsPage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  layout: 'default',
  fetchOnServer: false,
  data() {
    return {
      tickets: {},
    }
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  async fetch() {
    await this.GetAllTickets()
  },
  computed: {
    ...mapGetters([
      'CONTRAGENTS',
      'CHILD_CONTRAGENTS',
      'SELECTED_CONTRAGENT',
      'TICKETS'
    ]),
  },
  beforeMount() {},
  methods: {
    ...mapActions(['GetContragents','CreateChildContragent','GetChildContragents', 'GetAllTickets', 'SetStatusPartner']),
    getContragentsName(id) {
      const contragents = [this.CONTRAGENTS, ...this.CHILD_CONTRAGENTS]
      return contragents.find(el => el.id === id)?.name
    },
    setContragentToPartner(id) {
      console.log(id)
      console.log('Назначаем партнерку')
      this.SetStatusPartner(id)
    }
  },
}
</script>

<style scoped></style>
