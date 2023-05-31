<template>
  <div class="configurator-dashboard px-7 pt-5">
    <div class="card">
      <div class="card-header card-header--color pa-3">
        <v-avatar size="40" class="ml-2" color="primary">
          <v-icon color="white">mdi-code-json</v-icon>
        </v-avatar>
        <p class="card-header__title mb-0 ml-3">
          Конфигурации
          <br />
          <span class="card-header__description">
            всего: {{ configurations.length }}
          </span>
        </p>
        <v-text-field
          v-model="searchConfiguration"
          full-width
          class="ml-10"
          dense
          style="border-radius: 5px 0 0 5px"
          background-color="#fff"
          hide-details
          color="primary"
          label="Поиск по конфигурациям"
          outlined
        />
        <v-btn
          tile
          style="border-radius: 0 5px 5px 0"
          elevation="0"
          height="40"
          color="primary"
          @click="newConfigurationDialog = true"
        >
          Создать
        </v-btn>
      </div>
      <div class="card-content">
        <v-data-table
          :loading="$fetchState.pending"
          :headers="configurationsTable"
          :items="configurations"
          :search="searchConfiguration"
          :sort-by="['Id']"
          must-sort
          :items-per-page="5"
          hide-default-footer
          class="elevation-0"
          @click:row="selectConfiguration"
        >
          <!--<template #item.tools="{ item }">-->
          <!--  <v-icon-->
          <!--    color="success"-->
          <!--    class="mr-2"-->
          <!--    @click.stop="editConfiguration(item)"-->
          <!--  >-->
          <!--    mdi-pencil-->
          <!--  </v-icon>-->
          <!--  <v-icon-->
          <!--    color="error"-->
          <!--    class="mr-2"-->
          <!--    @click.stop="editConfiguration(item)"-->
          <!--  >-->
          <!--    mdi-delete-->
          <!--  </v-icon>-->
          <!--</template>-->
        </v-data-table>
      </div>
      <div class="card-footer pa-3">
        <v-btn nuxt to="/configurator/configurations" text color="info">
          <span>все конфигурации</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="card">
      <div class="card-header card-header--color pa-3">
        <v-avatar size="40" class="ml-2" color="primary">
          <v-icon color="white">mdi-file-code-outline</v-icon>
        </v-avatar>
        <p class="card-header__title mb-0 ml-3">
          Бизнес-процессы
          <br />
          <span class="card-header__description">
            Всего {{ GET_BUSINESS_PROCESSES_ALL.length }}, Из магазина 4
          </span>
        </p>
        <v-text-field
          v-model="searchBusinessProcess"
          full-width
          class="ml-10"
          dense
          style="border-radius: 5px 0 0 5px"
          background-color="#fff"
          hide-details
          color="primary"
          label="Искать бизнес-процессы"
          outlined
        />
        <v-btn
          tile
          style="border-radius: 0 5px 5px 0"
          elevation="0"
          height="40"
          color="primary"
          @click="newBusinessProcessDialog = true"
        >
          Создать
        </v-btn>
      </div>
      <div class="card-content">
        <v-data-table
          :loading="$fetchState.pending"
          :headers="businessProcessesTable"
          :items="businessProcesses"
          :search="searchBusinessProcess"
          hide-default-footer
          :items-per-page="5"
          class="elevation-0"
          @click:row="selectBusinessProcess"
        >
          <!--<template #item.tools="{ item }">-->
          <!--  <v-icon-->
          <!--    color="success"-->
          <!--    class="mr-2"-->
          <!--    @click.stop="editBusinessProcess(item)"-->
          <!--  >-->
          <!--    mdi-pencil-->
          <!--  </v-icon>-->
          <!--  <v-icon-->
          <!--    color="error"-->
          <!--    class="mr-2"-->
          <!--    @click.stop="editBusinessProcess(item)"-->
          <!--  >-->
          <!--    mdi-delete-->
          <!--  </v-icon>-->
          <!--</template>-->
        </v-data-table>
      </div>
      <div class="card-footer pa-3">
        <v-btn link to="/configurator/processes" text color="primary">
          <span>все бизнес-процессы</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="card card__fillwidth">
      <div class="card-header card-header--color pa-3">
        <v-avatar size="40" class="ml-2" color="primary">
          <v-icon color="white">mdi-file-code-outline</v-icon>
        </v-avatar>
        <p class="card-header__title mb-0 ml-3">
          Уведомления
          <br />
          <span class="card-header__description">уведомлений нет</span>
        </p>
      </div>
      <div class="card-content" />
      <div class="card-footer pa-3">
        <v-btn text color="primary">
          <span>все уведомления</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>

    <v-dialog
      v-model="newConfigurationDialog"
      max-width="600"
      @click:outside="closeConfigurationDialog"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Новая конфигурация</h2>
          <v-btn icon @click="closeConfigurationDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          <v-form
            ref="newConfigurationForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
            @submit="addConfiguration"
          >
            <v-text-field
              v-model="newConfigurationModel.name"
              label="Название"
              outlined
              dense
              :rules="[rules.required]"
            />
            <v-textarea
              v-model="newConfigurationModel.description"
              label="Описание"
              outlined
              dense
              :rules="[rules.required]"
            />
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="addConfiguration">Сохранить</v-btn>
          <v-btn color="error" @click="closeConfigurationDialog">Отмена</v-btn>
        </div>
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-properties */
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ConfiguratorPage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  fetchOnServer: false,
  data() {
    return {
      item: '',
      searchConfiguration: '',
      searchBusinessProcess: '',
      configurationsTable: [
        { text: 'Id', value: '$id' },
        {
          text: 'Название',
          align: 'start',
          value: 'nameConfig',
        },
        { text: 'Активная версия', value: 'version' },
        // { text: 'Id', value: 'idVersion' },
        { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      configurations: [],
      businessProcessesTable: [
        { text: 'Id', align: 'start', value: '$id' },
        {
          text: 'Название',
          align: 'start',
          sortable: false,
          value: 'businessProcessName',
        },
        { text: 'Купленный шаблон', value: 'isTemplate' },
        // { text: 'Id', value: 'idVersion' },
        { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      businessProcesses: [],
      newConfigurationDialog: false,
      newBusinessProcessDialog: false,
      newConfigurationModel: {
        name: '',
        description: '',
      },
      newBusinessProcessModel: {
        title: '',
      },
      rules: {
        required: (value) => !!value || 'Поле обязательно к заполнению.',
      },
    }
  },
  async fetch() {
    await this.GetAllConfigurations().then(() => {
      // eslint-disable-next-line no-var
      const conf = this.GET_CONFIGURATIONS_All
      this.configurations = conf.splice(-5)
    })
    await this.GetAllBusinessProcess().then(() => {
      this.businessProcesses = this.GET_BUSINESS_PROCESSES_ALL
    })
  },
  computed: {
    ...mapGetters([
      'SELECTED_CONTRAGENT',
      'GET_CONFIGURATIONS_All',
      'GET_BUSINESS_PROCESSES_ALL',
    ]),
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  // beforeMount() {
  //   this.GetAllConfigurations()
  //   this.GetAllBusinessProcess()
  //   this.configurations = this.CONFIGURATIONS_All
  // },
  methods: {
    ...mapActions([
      'GetAllConfigurations',
      'GetAllBusinessProcess',
      'CreateConfigurationRequest',
      'CreateBusinessProcess',
    ]),
    selectConfiguration(item) {
      console.log(item)
      this.$router.push({
        path: '/configurator/configurations',
        query: { configuration: item.idConfig },
      })
    },
    editBusinessProcess(item) {
      console.log(item)
    },
    editConfiguration(item) {
      console.log(item)
    },
    selectBusinessProcess(item) {
      this.$router.push(`/configurator/processes/${item.businessProcessId}`)
      console.log(item.businessProcessId)
    },
    closeConfigurationDialog() {
      this.$refs.newConfigurationForm.reset()
      this.newConfigurationDialog = false
    },
    async addConfiguration() {
      if (this.$refs.newConfigurationForm.validate()) {
        this.newConfigurationDialog = false
        await this.CreateConfigurationRequest(this.newConfigurationModel).then(
          () => {
            this.GetAllConfigurations().then(() => {
              const conf = this.GET_CONFIGURATIONS_All
              console.log(conf)
              this.configurations = conf.splice(-5)
            })
          }
        )
        this.$refs.newConfigurationForm.reset()
      }
    },
    closeBusinessProcessDialog() {
      this.$refs.newBusinessProcessForm.reset()
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
          this.GetAllBusinessProcess().then(() => {
            const bp = this.GET_BUSINESS_PROCESSES_ALL
            console.log(bp)
            this.businessProcesses = bp.splice(-5)
          })
        })
        this.$refs.newBusinessProcessForm.reset()
        this.newBusinessProcessDialog = false
      }
    },
  },
}
</script>

<style scoped></style>
