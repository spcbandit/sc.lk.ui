<template>
  <div class="configurations">
    <div class="px-7 pt-5" style="flex: 1 1">
      <div class="mb-5">
        <h3>Терминалы</h3>
      </div>
      <v-btn
        class="mb-5"
        depressed
        height="40"
        color="primary"
        @click="$fetch()"
      >
        Обновить терминалы
      </v-btn>
      <div class="d-flex align-start" style="column-gap: 10px">
        <v-select
          v-model="selectedDivision"
          style="max-width: 200px"
          :items="divisions"
          :item-value="(item) => item.id"
          :item-text="(item) => item.name"
          outlined
          dense
          label="Подразделения"
          @change="getTerminalsByDivisionId($event)"
        />
        <v-text-field
          v-model="searchTerminal"
          outlined
          dense
          label="Найти терминал"
        />
        <!--<v-btn depressed height="40" color="primary">Найти</v-btn>-->
        <v-btn depressed height="40" color="primary" @click="$fetch()">
          Все терминалы
        </v-btn>
        <v-btn
          depressed
          height="40"
          color="primary"
          @click="getTerminalsWithoutDivision"
        >
          Терминалы без подразделений
        </v-btn>
      </div>
      <v-btn
        color="primary"
        depressed
        class="mb-5"
        :disabled="!selectedTerminals.length"
        @click="addTerminalsArrayToDivision"
      >
        Прикрепить к подразделению
      </v-btn>
      <v-data-table
        v-model="selectedTerminals"
        :loading="$fetchState.pending"
        :headers="terminalsTable"
        :items="terminals"
        :search="searchTerminal"
        :sort-by="['Id']"
        must-sort
        :items-per-page="20"
        class="elevation-0"
        item-key="terminalId"
        show-select
      >
        <template #item.isActive="{ item }">
          <v-switch
            v-model="item.isActive"
            class="ma-2 pa-0"
            hide-details
            @click.stop
            @change="toggleActiveTerminal(item)"
          />
        </template>
        <template #item.terminalName="{ item }">
          {{ item.terminalName ? item.terminalName : 'Безымянный терминал' }}
        </template>
        <template #item.update="{ item }">
          {{ item.update.slice(0, 10) }}
          {{ item.update.slice(11, 19) }}
        </template>
        <template #item.subscriptionsEnd="{ item }">
          {{ item.subscriptionsEnd.slice(0, 10) }}
          {{ item.subscriptionsEnd.slice(11, 19) }}
        </template>
        <template #item.ids="{ item }">
          <div class="d-flex flex-column py-1">
            <span style="word-break: keep-all">
              <pre style="font-size: 12px; font-family: 'Roboto', sans-serif">
Контрагент: {{ item.kontragentId }}</pre
              >
            </span>
            <span>
              <pre style="font-size: 12px; font-family: 'Roboto', sans-serif">
Конфигурация: {{ item.configurationId }}</pre
              >
            </span>
            <span>
              <pre style="font-size: 12px; font-family: 'Roboto', sans-serif">
Агент: {{ item.agentId }}</pre
              >
            </span>
            <span>
              <pre style="font-size: 12px; font-family: 'Roboto', sans-serif">
Подразделение: {{ item.divisionId }}</pre
              >
            </span>
            <span>
              <pre style="font-size: 12px; font-family: 'Roboto', sans-serif">
Терминал: {{ item.terminalId }}</pre
              >
            </span>
          </div>
        </template>
        <template #item.tools="{ item }">
          <div class="d-flex">
            <v-btn
              class="mr-2"
              icon
              @click.stop="openUpdateTerminalDialog(item)"
            >
              <v-icon color="success">mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mr-2" icon @click.stop="deleteTerminal(item)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
        <template #item.divisionName="{ item }">
          <div class="d-flex align-center">
            <span v-if="item.divisionName" class="mr-auto">
              {{ item.divisionName }}
            </span>
            <v-btn
              v-if="item.divisionName"
              class="ml-1"
              icon
              @click.stop="deleteTerminalFromDivision(item)"
            >
              <v-icon color="error">mdi-link-variant-off</v-icon>
            </v-btn>
            <v-btn
              v-else
              class="ml-1"
              icon
              color="success"
              @click.stop="openTerminalToDivisionDialog(item.terminalId)"
            >
              <v-icon>mdi-link-variant-plus</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
      <!--{{ divisions }}-->
      <!--<br />-->
      <!--<br />-->
      <!--{{ terminals }}-->
    </div>
    <v-dialog
      v-model="updateTerminalsDialog"
      max-width="600"
      @click:outside="
        closeTerminalDialog('updateTerminalsDialog', 'updateTerminalForm')
      "
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Изменить терминал</h2>
          <v-btn
            icon
            @click="
              closeTerminalDialog('updateTerminalsDialog', 'updateTerminalForm')
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          <v-form
            ref="updateTerminalForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
            @submit="updateTerminal"
          >
            <v-text-field
              v-model="terminal.terminalName"
              label="Название"
              outlined
              dense
              :rules="[rules.required]"
            />
            <v-switch
              v-model="terminal.isActive"
              class="pt-0 mt-0"
              label="Активность"
              outlined
              dense
            />
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Модель</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="d-flex flex-column">
                    <span>terminalId: {{ terminal.terminalId }}</span>
                    <span>kontragentId: {{ terminal.kontragentId }}</span>
                    <span>divisionId: {{ terminal.divisionId }}</span>
                    <span>
                      subscriptionsEnd: {{ terminal.subscriptionsEnd }}
                    </span>
                    <span>
                      subscriptionsEnd: {{ terminal.subscriptionsEnd }}
                    </span>
                    <span>agentId: {{ terminal.agentId }}</span>
                    <span>configurationId: {{ terminal.configurationId }}</span>
                    <span>updateBy: {{ terminal.updateBy }}</span>
                    <span>update: {{ terminal.update }}</span>
                    <span>hardwareId: {{ terminal.hardwareId }}</span>
                    <!--<span>isActive: {{ terminal.isActive }}</span>-->
                    <span>isDeleted: {{ terminal.isDeleted }}</span>
                    <span>currentVersion: {{ terminal.currentVersion }}</span>
                    <span>distributiveId: {{ terminal.distributiveId }}</span>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="updateTerminal">Сохранить</v-btn>
          <v-btn
            color="error"
            @click="
              closeTerminalDialog('updateTerminalsDialog', 'updateTerminalForm')
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
    <v-dialog
      v-model="terminalToDivisionDialog"
      max-width="600"
      @click:outside="
        closeTerminalDialog(
          'terminalToDivisionDialog',
          'terminalToDivisionForm'
        )
      "
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Добавить агента к подразделению</h2>
          <v-btn
            icon
            @click="
              closeTerminalDialog(
                'terminalToDivisionDialog',
                'terminalToDivisionForm'
              )
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          <v-form
            ref="terminalToDivisionForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
            @submit="addTerminalToDivision"
          >
            <v-select
              v-model="selectedDivisionId"
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
          <v-btn color="success" @click="addTerminalToDivision">
            Сохранить
          </v-btn>
          <v-btn
            color="error"
            @click="
              closeTerminalDialog(
                'terminalToDivisionDialog',
                'terminalToDivisionForm'
              )
            "
          >
            Отмена
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LicenseIndex',
  fetchOnServer: false,
  data() {
    return {
      selectedTerminals: [],
      selectedTerminalsId: [],
      addedTerminalId: null,
      selectedDivision: null,
      selectedDivisionId: null,
      terminalToDivisionDialog: false,
      updateTerminalsDialog: false,
      selectedTerminal: null,
      divisions: [],
      searchTerminal: '',
      terminals: [],
      terminalsTable: [
        // { text: 'Id', value: '$id',},
        { text: 'Название', align: 'start', value: 'terminalName', },
        { text: 'Подразделение', align: 'center', value: 'divisionName', },
        { text: 'Агент', align: 'start', value: 'agentName', },
        { text: 'Конфигурация', align: 'start', value: 'configurationName', },
        { text: 'Активен', value: 'isActive', sortable: false, },
        // { text: 'Агент', value: 'agentId' },
        // { text: 'Контрагент', value: 'kontragentId' },
        // { text: 'Подразделение', value: 'divisionId' },
        { text: 'Окончание подписки', value: 'subscriptionsEnd' },
        // { text: 'Загруженная конфигурация', value: 'configurationId' },
        { text: 'Текущая версия', value: 'currentVersion' },
        { text: 'Обновлен', value: 'updateBy' },
        { text: 'Последнее обновление', value: 'update' },
        // { text: 'Id терминала', value: 'terminalId' },
        { text: `Id's`, value: 'ids', sortable: false,},
        { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      snackbar: {
        state: false,
        text: '',
        color: 'primary',
      },
      rules: {
        required: (value) => !!value || 'Поле обязательно к заполнению.',
      },
      terminal: {
        name: ''
      },
      newTerminalModel: {
        terminalId: '',
        kontragentId: '',
        divisionId: '',
        terminalName: '',
        subscriptionsEnd: '',
        agentId: '',
        configurationId: '',
        updateBy: '',
        update: '',
        hardwareId: '',
        isActive: true,
        isDeleted: false,
        currentVersion: '',
        distributiveId: '',
      },
    }
  },
  async fetch() {
    if (!this.divisions.length) {
      await this.GetAllDivisions().then(() => {
        this.divisions = this.GET_DIVISIONS_ALL
      })
    }
    await this.GetTerminalsByContragentId().then(() => {
      this.terminals = this.GET_ALL_TERMINALS
      this.selectedTerminal = null
    })
    this.selectedDivision = null
  },
  computed: {
    ...mapGetters([
      'GET_DIVISIONS_ALL',
      'GET_DIVISION',
      'SELECTED_CONTRAGENT',
      'GET_ALL_TERMINALS',
      'SELECTED_CONTRAGENT',
    ]),
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  methods: {
    ...mapActions([
      'GetAllDivisions',
      'GetTerminalsByContragentId',
      'GetTerminalsByDivisionId',
      'DeleteTerminal',
      'GetTerminalById',
      'UpdateTerminal',
      'AddTerminalsToDivision',
    ]),
    closeTerminalDialog(dialogName, refName) {
      this.$refs[refName].reset()
      this[dialogName] = false
    },
    async openUpdateTerminalDialog(item) {
      this.terminal = await Object.assign({}, item)
      this.updateTerminalsDialog = true
    },
    async openTerminalToDivisionDialog(item) {
      this.addedTerminalId = item
      console.log(this.selectedTerminal)
      this.terminalToDivisionDialog = true
    },
    async updateTerminal() {
      if (this.$refs.updateTerminalForm.validate()) {
        for (let item of Object.keys(this.terminal)) {
          if (this.terminal[item] === null) {
            this.terminal[item] = '00000000-0000-0000-0000-000000000000'
          }
        }
        console.log(this.terminal)
        const updatedTerminal = {
          ...this.newTerminalModel,
          ...this.terminal
        }
        console.log(updatedTerminal)
        await this.UpdateTerminal(this.terminal).then(() => {
          this.$fetch()
          this.snackbar.text = 'Изменения сохранены'
          this.snackbar.state = true
          this.snackbar.color = 'success'
          this.closeTerminalDialog('updateTerminalsDialog', 'updateTerminalForm')
        })
      }
    },
    async getTerminalsByDivisionId(divisionId) {
      console.log(divisionId)
      await this.GetTerminalsByDivisionId(divisionId).then(() => {
        this.terminals = this.GET_ALL_TERMINALS
      })
    },
    async getTerminalsWithoutDivision() {
      await this.GetTerminalsByContragentId().then(() => {
        console.log(
          this.GET_ALL_TERMINALS.filter((el) => el.divisionId === '00000000-0000-0000-0000-000000000000')
        )
        this.terminals = this.GET_ALL_TERMINALS.filter(
          (el) => el.divisionId === '00000000-0000-0000-0000-000000000000'
        )
        this.selectedTerminal = null
      })
    },
    addTerminalToDivision() {
      const addingTerminalModel = {
        divisionId: this.selectedDivisionId,
        terminalsId: this.addedTerminalId
      }
      console.log(addingTerminalModel)
      this.AddTerminalsToDivision(addingTerminalModel).then(() => {
        this.closeTerminalDialog(
          'terminalToDivisionDialog',
          'terminalToDivisionForm'
        )
        this.$fetch()
      })
    },
    addTerminalsArrayToDivision() {
      console.log(this.selectedTerminals)
      this.selectedTerminalsId = this.selectedTerminals.map(el => el.terminalId)
    },
    deleteTerminalFromDivision(item) {
      const addingTerminalModel = {
        divisionId: '00000000-0000-0000-0000-000000000000',
        terminalsId: item.terminalId
      }
      this.AddTerminalsToDivision(addingTerminalModel).then(() => this.$fetch())
    },
    async deleteTerminal(item) {
      item.isDeleted = true
      item.isActive = false
      console.log(item)
      await this.UpdateTerminal(item).then(() => {
        this.snackbar.text = 'Изменения сохранены'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.$fetch()
      })
    },
    async toggleActiveTerminal(item) {
      await this.UpdateTerminal(item).then(() => {
        this.snackbar.text = 'Изменения сохранены'
        this.snackbar.state = true
        this.snackbar.color = 'success'
      })
    },
  },
}
</script>

<style scoped></style>
