<template>
  <div class="configurations px-7 pt-5">
    <div style="flex: 1 1">
      <div class="d-flex align-center mb-5">
        <v-btn
          class="mr-5"
          depressed
          color="primary"
          @click="$fetch()"
          :loading="$fetchState.pending"
        >
          Обновить агентов
        </v-btn>
        <v-btn depressed color="primary" @click="GetPinCodeByContragentId">
          Получить PIN
        </v-btn>
        <span v-if="$store.state.PIN" class="ml-10">
          Ваш пин код:
          <span
            :style="`
            font-weight: 500;
            letter-spacing: 1px;
            padding: 6px 12px;
            background-color: #faf9fb;
            border-radius: 5px`"
          >
            {{ $store.state.PIN }}
          </span>
        </span>
      </div>
      <div class="mb-5">
        <h3>Агенты</h3>
      </div>
      <div class="d-flex align-start" style="column-gap: 10px">
        <v-select
          v-model="selectedDivision"
          :items="divisions"
          :item-value="(item) => item.id"
          :item-text="(item) => item.name"
          style="max-width: 200px"
          outlined
          dense
          label="Подразделения"
          @change="getAgentByDivisionId($event)"
        />
        <v-text-field
          v-model="searchAgents"
          outlined
          dense
          label="Найти агента"
        />
        <!--<v-btn depressed height="40" color="primary">Найти</v-btn>-->
        <v-btn depressed height="40" color="primary" @click="$fetch()">
          Все агенты
        </v-btn>
        <v-btn
          depressed
          height="40"
          color="primary"
          @click="getAgentsWithoutDivision"
        >
          Агенты без подразделений
        </v-btn>
      </div>
      <v-data-table
        :loading="$fetchState.pending"
        :headers="agentsTable"
        :items="agents"
        :search="searchAgents"
        :sort-by="['Id']"
        must-sort
        :items-per-page="15"
        class="elevation-0"
      >
        <!--<template #item.isActive="{ item }">-->
        <!--  <v-switch-->
        <!--    v-model="item.isActive"-->
        <!--    class="ma-2 pa-0"-->
        <!--    hide-details-->
        <!--    @click.stop-->
        <!--  />-->
        <!--</template>-->
        <template #item.update="{ item }">
          {{ item.update.slice(0, 10) }}
          {{ item.update.slice(11, 19) }}
        </template>
        <!--<template #item.tools="{ item }">-->
        <!--  <v-btn class="mr-2" icon @click.stop="deleteAgent(item)">-->
        <!--    <v-icon color="error">mdi-delete</v-icon>-->
        <!--  </v-btn>-->
        <!--</template>-->
        <template #item.hostFingerprint="{ item }">
          <span style="word-break: break-all">{{ item.hostFingerprint }}</span>
        </template>
        <template #item.divisionName="{ item }">
          <div class="d-flex align-center">
            <span>
              {{
                divisions.find((el) => el.id === item.divisionId)
                  ? divisions.find((el) => el.id === item.divisionId).name
                  : 'Подразделение не назначено'
              }}
            </span>
            <v-btn
              v-if="divisions.find((el) => el.id === item.divisionId)"
              class="ml-auto"
              icon
              @click.stop="deleteAgentFromDivision(item)"
            >
              <v-icon color="error">mdi-link-variant-off</v-icon>
            </v-btn>
            <v-btn
              v-else
              class="ml-auto"
              icon
              color="success"
              @click.stop="openAgentToDivisionDialog(item.agentId)"
            >
              <v-icon>mdi-link-variant-plus</v-icon>
            </v-btn>
          </div>
        </template>
        <!--<template #item.tools="{ item }">-->
        <!--  <div class="d-flex">-->
        <!--    <v-btn-->
        <!--      class="mr-2"-->
        <!--      icon-->
        <!--      @click.stop="openUpdateTerminalDialog(item)"-->
        <!--    >-->
        <!--      <v-icon color="success">mdi-pencil</v-icon>-->
        <!--    </v-btn>-->
        <!--    <v-btn class="mr-2" icon @click.stop="deleteTerminal(item)">-->
        <!--      <v-icon color="error">mdi-delete</v-icon>-->
        <!--    </v-btn>-->
        <!--  </div>-->
        <!--</template>-->
      </v-data-table>
    </div>
    <v-dialog
      v-model="addAgentToTerminalDialog"
      max-width="600"
      @click:outside="
        closeDivisionDialog(
          'addAgentToTerminalDialog',
          'addAgentToTerminalForm'
        )
      "
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Добавить агента к подразделению</h2>
          <v-btn
            icon
            @click="
              closeDivisionDialog(
                'addAgentToTerminalDialog',
                'addAgentToTerminalForm'
              )
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          <v-form
            ref="addAgentToTerminalForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
            @submit="addAgentToDivision"
          >
            <v-select
              v-model="addAgentToTerminalSelectedDivision"
              dense
              outlined
              :items="divisions"
              :item-value="(item) => item.id"
              :item-text="(item) => item.name"
              label="Выберите подразделение из списка"
            />
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="addAgentToDivision">Сохранить</v-btn>
          <v-btn
            color="error"
            @click="
              closeDivisionDialog(
                'addAgentToTerminalDialog',
                'addAgentToTerminalForm'
              )
            "
          >
            Отмена
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar.state"
      right
      top
      text
      :color="snackbar.color"
      timeout="2000"
    >
      {{ snackbar.text }}
      <!--<template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar.state = false">
          Закрыть
        </v-btn>
      </template>-->
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AgentsIndex',
  fetchOnServer: false,
  data() {
    return {
      divisions: [],
      selectedDivision: null,
      agentsTable: [
        // { text: 'Id', value: '$id' },
        { text: 'Имя хоста', align: 'start', value: 'hostName', },
        { text: 'Название подразделения', align: 'start', value: 'divisionName', sortable: false },
        { text: 'Активен', value: 'isActive', sortable: false },
        { text: 'ID Подразделения', align: 'start', value: 'divisionId', sortable: false },
        { text: 'ID Агента', align: 'start', value: 'agentId', sortable: false },
        { text: 'Адрес хоста', align: 'start', value: 'hostAddress', sortable: false },
        { text: 'Обновлен', value: 'updateBy', sortable: false },
        { text: 'Дата обновления', value: 'update' },
        { text: 'ID дистрибутива', value: 'distributiveId', sortable: false },
        { text: 'hostFingerprint', value: 'hostFingerprint', sortable: false },
        { text: '', value: 'tools', sortable: false, width: 50, align: 'end', },
      ],
      agents: [],
      searchAgents: '',
      addAgentToTerminalDialog: false,
      addAgentToTerminalSelectedDivision: null,
      addedAgent: null,
      snackbar: {
        state: false,
        text: '',
        color: 'primary'
      },
    }
  },
  async fetch() {
    await this.GetAllDivisions().then(() => {
      this.divisions = this.GET_DIVISIONS_ALL
    })
    await this.GetAgentsByContragentId().then(() => {
      this.agents = this.GET_ALL_AGENTS
    })
    this.selectedDivision = null
  },
  computed: {
    ...mapGetters(['GET_DIVISIONS_ALL', 'GET_ALL_AGENTS', 'GET_DIVISION', 'SELECTED_CONTRAGENT',]),
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  methods: {
    ...mapActions([
      'GetPinCodeByContragentId',
      'GetAgentsByContragentId',
      'GetAgentsByDivisionId',
      'SetAgentInDivisionId',
      'GetAllDivisions',
      'UpdateAgent'
    ]),
    closeDivisionDialog(dialogName, refName) {
      this.$refs[refName].reset()
      this[dialogName] = false
    },
    addAgentToDivision() {
      console.log(this.addAgentToTerminalSelectedDivision)
      console.log(this.addedAgent)
      const addingAgentsModel = {
        divisionId: this.addAgentToTerminalSelectedDivision,
        agentsId: this.addedAgent
      }
      this.SetAgentInDivisionId(addingAgentsModel).then(() => {
        this.closeDivisionDialog(
          'addAgentToTerminalDialog',
          'addAgentToTerminalForm'
        )
        this.$fetch()
      })
    },
    deleteAgentFromDivision(item) {
      console.log(this.addAgentToTerminalSelectedDivision)
      const addingAgentsModel = {
        divisionId: '00000000-0000-0000-0000-000000000000',
        agentsId: item.agentId
      }
      this.SetAgentInDivisionId(addingAgentsModel).then(() => this.$fetch())
    },
    openAgentToDivisionDialog(item) {
      this.addedAgent = item
      this.addAgentToTerminalDialog = true
    },
    async getAgentsWithoutDivision() {
      await this.GetAgentsByContragentId().then(() => {
        console.log(
          this.GET_ALL_AGENTS.filter((el) => el.divisionId === '00000000-0000-0000-0000-000000000000')
        )
        this.agents = this.GET_ALL_AGENTS.filter(
          (el) => el.divisionId === '00000000-0000-0000-0000-000000000000'
        )
        this.selectedDivision = null
      })
    },
    async getAgentByDivisionId(divisionId) {
      console.log(divisionId)
      await this.GetAgentsByDivisionId(divisionId).then(() => {
        this.agents = this.GET_ALL_AGENTS
      })
    },
    async deleteAgent(agent) {
      const agentModel = {
        idAgent: '',
        agent: {},
      }
      this.UpdateAgent(agentModel).then(()=>this.$fetch())
    }
  },
}
</script>

<style scoped></style>
