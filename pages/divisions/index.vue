<template>
  <div class="configurations">
    <div class="px-7 pt-5" style="flex: 1 1">
      <div class="mb-5">
        <h3>Подразделения</h3>
      </div>
      <div class="d-flex align-start" style="column-gap: 10px">
        <v-text-field
          v-model="searchDivision"
          outlined
          dense
          label="Найти подразделение"
        />
        <v-btn depressed height="40" color="primary">Найти</v-btn>
        <v-btn
          depressed
          height="40"
          color="primary"
          @click="newDivisionDialog = true"
        >
          Создать подразделение
        </v-btn>
      </div>
      <v-data-table
        :loading="$fetchState.pending"
        :headers="divisionTable"
        :items="divisions"
        :search="searchDivision"
        :sort-by="['Id']"
        must-sort
        :items-per-page="20"
        class="elevation-0"
        @click:row="getDivisionInfo"
      >
        <template #item.name="{ item }">
          <span>
            {{ item.name }}
          </span>
        </template>
        <!--<template #item.isActive="{ item }">-->
        <!--  <v-switch-->
        <!--    v-model="item.isActive"-->
        <!--    class="ma-2 pa-0"-->
        <!--    hide-details-->
        <!--    @click.stop-->
        <!--    @change="toggleActiveDivision($event, item)"-->
        <!--  />-->
        <!--</template>-->
        <template #item.updated="{ item }">
          {{ item.updated.slice(0, 10) }}
          {{ item.updated.slice(11, 19) }}
        </template>
        <template #item.tools="{ item }">
          <div class="d-flex">
            <v-btn
              class="mr-2"
              icon
              @click.stop="openUpdateDivisionDialog(item)"
            >
              <v-icon color="success">mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mr-2" icon @click.stop="deleteDivision(item)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
        <template #item.agents="{ item }">
          <span v-if="agents && agents.length">
            {{
              agents.find((el) => el.divisionId === item.id)
                ? agents.find((el) => el.divisionId === item.id).hostName
                : 'Нет подключенных агентов'
            }}
          </span>
        </template>
      </v-data-table>
    </div>
    <div
      class="configurations-setting-wrapper"
      :class="nav ? 'configurations-setting-wrapper--active' : ''"
    >
      <div class="mx-7 d-flex flex-column flex-grow-1">
        <h3 class="my-5">{{ selectDivision.name }}</h3>
        <div style="column-gap: 20px; flex: 1 1" class="d-flex">
          <div style="flex: 1 1">
            <h4 class="mb-5">Терминалы подразделения</h4>
            <div
              v-for="terminal in terminalsInDivision"
              :key="terminal.terminalId"
            >
              <p>
                <span>
                  {{
                    terminal.terminalName
                      ? terminal.terminalName
                      : 'Безымянный терминал'
                  }}
                </span>
                <br />
                <span style="font-size: 12px">{{ terminal.terminalId }}</span>
              </p>
            </div>
            <v-btn depressed color="primary" nuxt to="/divisions/terminals">
              Перейти к управлению терминалами
            </v-btn>
          </div>
          <div style="flex: 0.75 0">
            <h4 class="mb-5">Подключенный агент</h4>
            <div
              v-if="agentsInDivision && agentsInDivision.length"
              class="pa-3 mb-5"
              style="background-color: #bbbbbb30"
            >
              <template v-for="(item, index) in agentsInDivision[0]">
                <p :key="index" class="mb-1" style="font-size: 12px">
                  <span style="font-weight: 500; letter-spacing: 0.5px">
                    {{ index }}:
                  </span>
                  <br />
                  <span style="word-break: break-all">{{ item }}</span>
                </p>
              </template>
              <v-btn
                class="mt-3"
                color="primary"
                depressed
                @click="deleteAgentFromDivision"
              >
                Отвязать агента
              </v-btn>
            </div>
            <div v-else class="">
              <p>Нет подключенных агентов</p>
              <v-btn
                color="primary"
                depressed
                @click="addAgentToTerminalDialog = true"
              >
                Подключить агента
              </v-btn>
            </div>
            <!--<p style="word-break: break-all">{{ agents }}</p>-->
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="newDivisionDialog"
      max-width="600"
      @click:outside="
        closeDivisionDialog('newDivisionDialog', 'newDivisionForm')
      "
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Новое подразделение</h2>
          <v-btn
            icon
            @click="closeDivisionDialog('newDivisionDialog', 'newDivisionForm')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          <v-form
            ref="newDivisionForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
            @submit="addDivision"
          >
            <v-text-field
              v-model="newDivisionModel.name"
              label="Название"
              outlined
              dense
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="newDivisionModel.address"
              label="Адрес"
              outlined
              dense
              :rules="[rules.required]"
            />
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="addDivision">Сохранить</v-btn>
          <v-btn
            color="error"
            @click="closeDivisionDialog('newDivisionDialog', 'newDivisionForm')"
          >
            Отмена
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="updateDivisionDialog"
      max-width="600"
      @click:outside="
        closeDivisionDialog('updateDivisionDialog', 'updateDivisionForm')
      "
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Редактировать подразделение</h2>
          <v-btn
            icon
            @click="
              closeDivisionDialog('updateDivisionDialog', 'updateDivisionForm')
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          <v-form
            ref="updateDivisionForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
            @submit="updateDivision"
          >
            <v-text-field
              v-model="division.name"
              label="Название"
              outlined
              dense
              validate-on-blur
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="division.address"
              label="Адрес"
              outlined
              dense
              validate-on-blur
              :rules="[rules.required]"
            />
            <!--<v-text-field-->
            <!--  v-model="division.host"-->
            <!--  label="Хост"-->
            <!--  outlined-->
            <!--  dense-->
            <!--  validate-on-blur-->
            <!--/>-->
            <v-switch v-model="division.isActive" label="Активность" />
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="updateDivision">Сохранить</v-btn>
          <v-btn
            color="error"
            @click="
              closeDivisionDialog('updateDivisionDialog', 'updateDivisionForm')
            "
          >
            Отмена
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
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
            @submit="addAgentToTerminal"
          >
            <v-select
              v-model="addAgentToTerminalSelectedAgent"
              dense
              outlined
              :items="agents"
              :item-value="(item) => item.agentId"
              :item-text="(item) => item.hostName"
              label="Выберите агента из списка"
            />
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="addAgentToTerminal">Сохранить</v-btn>
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
import createStore from "@/store";

export default {
  name: 'DivisionsIndexPage',
  fetchOnServer: false,
  layout: 'default',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  data() {
    return {
      nav: false,
      rules: {
        required: (value) => !!value || 'Поле обязательно к заполнению.',
      },
      newDivisionDialog: false,
      updateDivisionDialog: false,
      newDivisionModel: {
        name: '',
        address: '',
      },
      divisions: [],
      division: {},
      selectDivision: '',
      searchDivision: '',
      divisionTable: [
        // { text: 'Id', value: '$id' },
        {
          text: 'Название',
          align: 'start',
          value: 'name',
        },
        // { text: 'Активен', value: 'isActive', align: 'center', sortable: false, width: 50 },
        // { text: 'Хост', value: 'host' },
        { text: 'Адрес', value: 'address' },
        { text: 'Создание', value: 'updated' },
        { text: 'Агент', value: 'agents' },
        // { text: 'Id', value: 'idVersion' },
        { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      snackbar: {
        state: false,
        text: '',
        color: 'primary'
      },
      terminalsInDivision: {},
      agentsInDivision: {},
      agents: {},
      addAgentToTerminalDialog: false,
      addAgentToTerminalSelectedAgent: null,
    }
  },
  async fetch() {
    await this.GetAllDivisions().then(() => {
      this.divisions = this.GET_DIVISIONS_ALL
    })
    await this.GetAgentsByContragentId().then(() => {
      console.log('Получили агентов контрагента')
      this.agents = this.GET_ALL_AGENTS
    })
    if (this.$route.query.division) {
      await this.GetDivisionById(this.$route.query.division).then(() => {
        this.selectDivision = this.GET_DIVISION
        this.nav = true
      })
      await this.GetTerminalsByDivisionId(this.selectDivision.id).then(() => {
          console.log('Получили терминалы дивизиона:' + this.selectDivision.id)
          this.terminalsInDivision = this.GET_ALL_TERMINALS
        }
      )
      await this.GetAgentsByDivisionId(this.selectDivision.id).then(() => {
        console.log('Получили агентов дивизиона:' + this.selectDivision.id)
        this.agentsInDivision = this.GET_ALL_AGENTS
      })
    } else {
      this.nav = false
    }
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  computed: {
    ...mapGetters([
      'GET_DIVISIONS_ALL',
      'GET_DIVISION',
      'SELECTED_CONTRAGENT',
      'GET_ALL_TERMINALS',
      'GET_ALL_AGENTS',
    ]),
  },
  beforeMount() {},
  methods: {
    ...mapActions([
      'CreateDivision',
      'GetAllDivisions',
      'DeleteDivision',
      'UpdateDivisionById',
      'GetDivisionById',
      'GetTerminalsByDivisionId',
      'GetAgentsByDivisionId',
      'GetAgentsByContragentId',
      'SetAgentInDivisionId',
    ]),
    closeDivisionDialog(dialogName, refName) {
      this.$refs[refName].reset()
      this[dialogName] = false
    },
    addDivision() {
      if (this.$refs.newDivisionForm.validate()) {
        this.CreateDivision(this.newDivisionModel).then(() => {
          this.closeDivisionDialog('newDivisionDialog', 'newDivisionForm')
          this.snackbar.text = 'Подразделение успешно добавлено'
          this.snackbar.state = true
          this.snackbar.color = 'success'
          this.$fetch()
        })
      }
    },
    async updateDivision() {
      if (this.$refs.updateDivisionForm.validate()) {
        await this.UpdateDivisionById(this.division).then(() => {
          this.$fetch()
          this.snackbar.text = 'Изменения сохранены'
          this.snackbar.state = true
          this.snackbar.color = 'success'
          this.closeDivisionDialog('updateDivisionDialog', 'updateDivisionForm')
        })
      }
    },
    async toggleActiveDivision(active, item) {
      console.log(item)
      const division = {}
      division.id = item.id
      division.name = '12'
      division.address = item.address
      division.isActive = active
      await this.UpdateDivisionById(division).then(() => {
        this.$fetch()
        this.snackbar.text = 'Изменения сохранены'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        // this.closeDivisionDialog('updateDivisionDialog', 'updateDivisionForm')
      })
    },
    async deleteDivision(division) {
      console.log(division)
      await this.DeleteDivision(division.id).then(()=> {
        this.snackbar.color = 'success'
        this.snackbar.text = 'Удалено'
        this.snackbar.state = true
        this.$fetch()
      }).catch(() => {
        this.snackbar.color = 'error'
        this.snackbar.text = 'Произошла ошибка'
        this.snackbar.state = true
      })
    },
    async openUpdateDivisionDialog(item) {
      this.division = await Object.assign({}, item)
      this.updateDivisionDialog = true
    },

    async getDivisionInfo(item) {
      const itemId = item.id
      if (this.$route.query.division === itemId) {
        await this.$router.push({
          path: '/divisions',
        })
        this.nav = false
        this.selectDivision = ''
      } else {
        await this.$router.push({
          path: '/divisions',
          query: { division: item.id },
        })
        this.nav = true
        await this.GetDivisionById(itemId).then(() => {
          this.selectDivision = this.GET_DIVISION
        })
        await this.GetTerminalsByDivisionId(this.selectDivision.id).then(() => {
            console.log('Получили терминалы дивизиона:' + this.selectDivision.id)
            this.terminalsInDivision = this.GET_ALL_TERMINALS
          }
        )
        // this.agentsInDivision = null
        // this.agents = null
          await this.GetAgentsByDivisionId(this.selectDivision.id).then(() => {
          console.log('Получили агентов дивизиона:' + this.selectDivision.id)
          this.agentsInDivision = this.GET_ALL_AGENTS
        })
        await this.GetAgentsByContragentId().then(() => {
          console.log('Получили агентов контрагента')
          this.agents = this.GET_ALL_AGENTS
        })
      }
    },

    addAgentToTerminal() {
      console.log(this.addAgentToTerminalSelectedAgent)
      const addingAgentsModel = {
        divisionId: this.selectDivision.id,
        agentsId: this.addAgentToTerminalSelectedAgent
      }
      this.SetAgentInDivisionId(addingAgentsModel).then(() => {
        this.closeDivisionDialog(
          'addAgentToTerminalDialog',
          'addAgentToTerminalForm'
        )
        this.$fetch()
      })
    },
    deleteAgentFromDivision() {
      console.log(this.addAgentToTerminalSelectedAgent)
      const addingAgentsModel = {
        divisionId: '00000000-0000-0000-0000-000000000000',
        agentsId: this.agentsInDivision[0].agentId
      }
      this.SetAgentInDivisionId(addingAgentsModel).then(() => this.$fetch())
    }
  },
}
</script>

<style scoped></style>
