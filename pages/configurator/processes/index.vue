<template>
  <div class="configurator-dashboard">
    <div class="px-7 pt-7" style="flex: 1 1">
      <div style="flex: 1 1" class="account-info">
        <h3 class="mb-5">Мои бизнес-процессы</h3>
        <div class="d-flex">
          <v-text-field
            v-model="searchBusinessProcess"
            full-width
            dense
            background-color="#fff"
            hide-details
            color="primary"
            label="Искать бизнес-процессы"
            outlined
          />
          <v-btn
            class="ml-5"
            elevation="0"
            height="40"
            color="primary"
            @click="newBusinessProcessDialog = true"
          >
            Новый бизнес-процесс
          </v-btn>
        </div>
        <v-data-table
          :loading="$fetchState.pending"
          :headers="businessProcessesTable"
          :items="businessProcesses"
          :search="searchBusinessProcess"
          :items-per-page="10"
          class="elevation-0"
          @click:row="selectBusinessProcess"
        >
          <template #item.tools="{ item }">
            <!--<v-icon-->
            <!--  color="success"-->
            <!--  class="mr-2"-->
            <!--  @click.stop="selectBusinessProcess(item)"-->
            <!--&gt;-->
            <!--  mdi-pencil-->
            <!--</v-icon>-->
            <div class="d-flex">
              <v-btn
                icon
                class="mr-2"
                color="info"
                @click.stop="copyBusinessProcess(item)"
              >
                <v-icon color="warning">mdi-content-copy</v-icon>
              </v-btn>
              <v-btn
                icon
                color="error"
                class="mr-2"
                @click.stop="deleteBusinessProcess(item)"
              >
                <v-icon color="error">mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog
      v-model="newBusinessProcessDialog"
      max-width="600"
      @click:outside="closeBusinessProcessDialog"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Новый бизнес-процесс</h2>
          <v-btn icon @click="closeBusinessProcessDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          <v-form
            ref="newBusinessProcessForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
            @submit="addBusinessProcess"
          >
            <v-text-field
              v-model="newBusinessProcessModel.title"
              outlined
              dense
              :rules="[rules.required]"
              label="Название"
            />
            <!--<v-select-->
            <!--  label="Шаблон бизнес процесса"-->
            <!--  outlined-->
            <!--  dense-->
            <!--  :items="GET_BUSINESS_PROCESSES_ALL"-->
            <!--  :item-text="(item) => item.businessProcessName"-->
            <!--  :item-value="(item) => item.businessProcessId"-->
            <!--/>-->
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="addBusinessProcess">Сохранить</v-btn>
          <v-btn color="error" @click="closeBusinessProcessDialog">
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
/* eslint-disable vue/no-unused-properties */
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProcessesPage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  fetchOnServer: false,
  data() {
    return {
      snackbar: {
        state: false,
        text: '',
        color: 'primary',
      },
      searchBusinessProcess: '',
      businessProcessesTable: [
        { text: 'Id', align: 'start', value: '$id' },
        {
          text: 'Название',
          align: 'start',
          sortable: false,
          value: 'businessProcessName',
        },
        { text: 'Купленный шаблон', value: 'isTemplate' },
        { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      businessProcesses: [],
      newBusinessProcessDialog: false,
      newBusinessProcessModel: {
        title: '',
      },
      rules: {
        required: (value) => !!value || 'Поле обязательно к заполнению.',
      },
    }
  },
  fetch() {
    this.GetAllBusinessProcess().then(() => {
      this.businessProcesses = this.GET_BUSINESS_PROCESSES_ALL
    })
  },
  computed: {
    ...mapGetters(['SELECTED_CONTRAGENT', 'GET_BUSINESS_PROCESSES_ALL']),
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  methods: {
    ...mapActions([
      'GetAllConfigurations',
      'GetAllBusinessProcess',
      'CreateConfigurationRequest',
      'CreateBusinessProcess',
      'DeleteBusinessProcess',
      'CopyBusinessProcess',
    ]),
    deleteBusinessProcess(item) {
      this.DeleteBusinessProcess(item.businessProcessId).then(() => {
        this.snackbar.text = 'Бизнес-процесс удален'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.$fetch()
      })
      console.log(item)
    },
    copyBusinessProcess(item) {
      this.CopyBusinessProcess(item.businessProcessId).then(() => {
        this.snackbar.text = 'Бизнес-процесс скопирован'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.$fetch()
      })
      console.log(item)
    },
    selectBusinessProcess(item) {
      this.$router.push(`/configurator/processes/${item.businessProcessId}`)
      console.log(item.businessProcessId)
    },
    async closeBusinessProcessDialog() {
      await this.$refs.newBusinessProcessForm.reset()
      this.newBusinessProcessDialog = false
    },
    async addBusinessProcess() {
      if (this.$refs.newBusinessProcessForm.validate()) {
        await console.log(
          'Создаем БП с названием: ',
          this.newBusinessProcessModel.title
        )
        await this.CreateBusinessProcess(
          this.newBusinessProcessModel.title
        ).then(() => {
          // this.$refs.newBusinessProcessForm.reset()
          this.GetAllBusinessProcess().then(() => {
            const bp = this.GET_BUSINESS_PROCESSES_ALL
            console.log(bp)
            this.businessProcesses = bp
          })
        })
        this.snackbar.text = 'Бизнес-процесс создан'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.newBusinessProcessDialog = false
        this.newBusinessProcessModel.title = null
      }
    },
  },
}
</script>

<style scoped></style>
