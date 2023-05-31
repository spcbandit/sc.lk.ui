<template>
  <div class="configurations">
    <div class="px-7 pt-7" style="flex: 1 1">
      <div style="flex: 1 1" class="account-info">
        <h3 class="mb-5">Мои конфигурации</h3>
        <div class="d-flex">
          <v-text-field
            v-model="searchConfiguration"
            outlined
            dense
            color="primary"
            label="Поиск по конфигурациям"
            class="mx-0"
          />
          <v-btn
            class="ml-5"
            elevation="0"
            height="40"
            color="primary"
            @click="newConfigurationDialog = true"
          >
            Новая конфигурация
          </v-btn>
        </div>
      </div>
      <v-data-table
        :loading="$fetchState.pending"
        :headers="headers"
        :items="configurations"
        :search="searchConfiguration"
        :items-per-page="10"
        class="elevation-0"
        @click:row="selectConfiguration"
      >
        <!--<template #item.tools="{ item }">-->
        <!--  <v-icon-->
        <!--    color="success"-->
        <!--    class="mr-2"-->
        <!--    @click.stop="selectConfiguration(item)"-->
        <!--  >-->
        <!--    mdi-pencil-->
        <!--  </v-icon>-->
        <!--  &lt;!&ndash;<v-icon&ndash;&gt;-->
        <!--  &lt;!&ndash;  color="error"&ndash;&gt;-->
        <!--  &lt;!&ndash;  class="mr-2"&ndash;&gt;-->
        <!--  &lt;!&ndash;  @click.stop="selectConfiguration(item)"&ndash;&gt;-->
        <!--  &lt;!&ndash;&gt;&ndash;&gt;-->
        <!--  &lt;!&ndash;  mdi-delete&ndash;&gt;-->
        <!--  &lt;!&ndash;</v-icon>&ndash;&gt;-->
        <!--</template>-->
      </v-data-table>
      <!--<div style="flex: 1 1" class="account-info ml-2">
          <h3>Бизнесс процессы в конфигурации</h3>
          <p>Склад -> Инвентаризация</p>
          <p>Склад -> Отгрузка</p>
          <p>Склад -> Приемка</p>
          <p>Склад -> Размещение</p>
          <v-btn>Новая версия</v-btn>
          <v-btn>Сохранить как новую версию</v-btn>
          <v-btn>Сохранить эту версию</v-btn>
        </div>-->
    </div>
    <div
      class="configurations-setting-wrapper"
      :class="nav ? 'configurations-setting-wrapper--active' : ''"
    >
      <div class="pa-7 d-flex flex-column flex-grow-1">
        <div class="d-flex mb-5 align-center">
          <h3 class="mr-10">
            Настройка конфигурации: {{ selectedConfiguration }}
          </h3>
        </div>
        <div class="d-flex align-start">
          <v-select
            v-if="
              configurationsAllVersions && configurationsAllVersions.length > 0
            "
            v-model="selectedVersion"
            :items="configurationsAllVersions"
            :item-text="
              (item) =>
                'Версия: ' +
                item.configurationVersionNumber +
                (item.isActive ? '  (активна)' : '')
            "
            :item-value="(item) => item"
            label="Выберите версию для редактирования"
            outlined
            :loading="$fetchState.pending"
            dense
            class="mr-5"
            @change="getConfigurationVersion($event)"
          />
          <div v-else class="mr-auto align-self-center">
            Текущая конфигурация пуста
          </div>
          <v-btn
            height="40"
            depressed
            color="primary"
            @click="createConfigurationVersion"
          >
            Новая версия
          </v-btn>
        </div>
        <div
          v-if="
            configurationsAllVersions && configurationsAllVersions.length > 0
          "
        >
          <div
            v-if="
              GET_VERSION_BY_ID &&
              GET_VERSION_BY_ID.proceses &&
              GET_VERSION_BY_ID.proceses.$values
            "
          >
            <div>
              <div v-if="selectedVersion" class="">
                <div class="d-flex mb-5 align-center">
                  <h3>Бизнес процессы в версии</h3>
                </div>
                <draggable
                  class="d-flex"
                  :style="`
                border: 1px dashed #bbbbbb;
                padding: 20px;
                min-height: 180px;
                flex-direction: column;
                row-gap: 10px;
              `"
                  :list="businessProcessesInVersion"
                  tag="div"
                  group="businessProcesses"
                >
                  <v-chip
                    v-for="item in businessProcessesInVersion"
                    :key="item.businessProcessId"
                    close
                    label
                    @click:close="deleteBusinessProcess(item)"
                  >
                    <span class="mr-auto">{{ getNameBPbyID(item) }}</span>
                  </v-chip>
                </draggable>
                <p v-if="error">{{ error }}</p>
                <v-btn
                  class="mt-3"
                  depressed
                  color="success"
                  @click="setThisVersionActive"
                >
                  Сделать активной
                </v-btn>
                <v-btn
                  class="mt-3"
                  depressed
                  color="success"
                  @click="saveThisVersion"
                >
                  Сохранить текущую версию
                </v-btn>
                <v-btn
                  class="mt-3"
                  depressed
                  color="primary"
                  @click="saveVersionAsNew"
                >
                  Сохранить как новую версию
                </v-btn>
                <v-btn
                  class="mt-3"
                  depressed
                  color="error"
                  @click="deleteThisVersion"
                >
                  Удалить текущую версию
                </v-btn>
              </div>
              <div v-else>Выберите нужную вам версию</div>
            </div>
          </div>
          <div v-else>Выберите нужную вам версию</div>
        </div>
      </div>

      <div
        style="min-width: 280px; border-left: 1px solid #33333350"
        class="pa-7"
      >
        <div class="d-flex mb-5 mt-auto align-center">
          <h3 class="mr-10">Бизнес процессы</h3>
        </div>
        <div
          class="d-flex"
          style="flex-direction: column; row-gap: 10px; align-items: flex-start"
        >
          <v-chip
            v-for="item in businessProcesses"
            :key="item.id"
            @click="addBusinessProcess(item)"
          >
            {{ item.businessProcessName }}
          </v-chip>
        </div>
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
      v-model="confirmDeleteVersionDialog"
      max-width="600"
      @click:outside="confirmDeleteVersionDialog = false"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Удалить версию</h2>
          <v-btn icon @click="confirmDeleteVersionDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content pt-10 pb-5">
          Версия активна. Вы точно хотите удалить текущую версию.
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="confirmDeleteVersionDialog = false">
            Отмена
          </v-btn>
          <v-btn color="error" @click="deleteThisSelectedVersion">
            Удалить
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
import { DevLogger } from '@/api/Methods'

export default {
  name: 'ConfigurationsPage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  fetchOnServer: false,
  data() {
    return {
      confirmDeleteVersionDialog: false,
      snackbar: {
        state: false,
        text: '',
        color: 'primary',
      },
      nav: false,
      searchConfiguration: '',
      newConfigurationDialog: false,
      headers: [
        { text: 'Id', value: '$id' },
        {
          text: 'Конфигурации',
          align: 'start',
          sortable: false,
          value: 'nameConfig',
        },
        { text: 'Активная версия', value: 'version' },
        { text: 'Id', value: 'idConfig' },
        { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      configurations: [],
      businessProcesses: [],
      newConfigurationModel: {
        name: '',
        description: '',
      },
      configurationsAllVersions: [],
      selectedConfiguration: '',
      businessProcessesInVersion: [],
      selectedVersion: null,
      error: '',
      rules: {
        required: (value) => !!value || 'Поле обязательно к заполнению.',
      },
    }
  },
  async fetch() {
    await this.GetAllConfigurations().then(() => {
      this.configurations = this.GET_CONFIGURATIONS_All
    })
    if (this.$route.query.configuration) {
      this.GetAllConfigurationVersions(this.$route.query.configuration).then(
        () => {
          this.configurationsAllVersions = this.GET_CONFIGURATIONS_VERSION_All
          if (!this.selectedVersion) {
            this.selectedVersion = this.configurationsAllVersions.find(
              (el) => el.isActive
            )
            this.getConfigurationVersion(this.selectedVersion)
          }
          this.nav = true
        }
      )
    } else {
      this.businessProcessesInVersion = []
      this.selectedVersion = null
      this.nav = false
    }
    await this.GetAllBusinessProcess().then(() => {
      this.businessProcesses = this.GET_BUSINESS_PROCESSES_ALL
    })
    this.error = ''
  },
  computed: {
    ...mapGetters([
      'SELECTED_CONTRAGENT',
      'GET_CONFIGURATIONS_All',
      'GET_CONFIGURATIONS_VERSION_All',
      'GET_CONFIGURATIONS_BY_ID',
      'GET_BUSINESS_PROCESSES_ALL',
      'GET_VERSION_BY_ID',
    ]),
  },
  watch: {
    SELECTED_CONTRAGENT() {
      // this.$router.push({
      //   path: '/configurator/configurations',
      // })
      this.$fetch()
    },
  },
  methods: {
    ...mapActions([
      'GetAllConfigurations',
      'GetAllBusinessProcess',
      'CreateConfigurationRequest',
      'GetConfigurationById',
      'GetAllConfigurationVersions',
      'CreateConfigurationVersion',
      'GetConfigurationVersion',
      'ClearVersionById',
      'ActivateConfigurationVersion',
      'ClearAllConfigurationVersions',
      'UpdateConfigurationVersion',
      'DeleteConfigurationVersionByVersionId',
      'SaveAsConfigurationVersionAsNew',
    ]),
    // region Configuration
    closeConfigurationDialog() {
      this.$refs.newConfigurationForm.reset()
      this.newConfigurationDialog = false
    },
    async addConfiguration() {
      if (this.$refs.newConfigurationForm.validate()) {
        this.newConfigurationDialog = false
        await this.CreateConfigurationRequest(this.newConfigurationModel)
          .then(() => {
            this.snackbar.text = 'Конфигурация создана'
            this.snackbar.state = true
            this.snackbar.color = 'success'
            this.GetAllConfigurations().then(() => {
              this.configurations = this.GET_CONFIGURATIONS_All
            })
          })
          .catch(() => {
            this.snackbar.text =
              'Произошла ошибка, попробуйте через несколько секунд'
            this.snackbar.state = true
            this.snackbar.color = 'error'
          })
        this.$refs.newConfigurationForm.reset()
      }
    },
    async selectConfiguration(item) {
      console.log(item)
      if (this.$route.query.configuration === item.idConfig) {
        this.nav = false
        await this.$router.push({
          path: '/configurator/configurations',
        })
        this.selectedConfiguration = ''
        await this.ClearAllConfigurationVersions()
        await this.ClearVersionById()
        this.selectedVersion = null
      } else {
        await this.$router.push({
          path: '/configurator/configurations',
          query: { configuration: item.idConfig },
        })
        await this.GetAllConfigurationVersions(item.idConfig).then(async () => {
          this.configurationsAllVersions = this.GET_CONFIGURATIONS_VERSION_All
          try {
            this.selectedVersion = this.configurationsAllVersions.find(
              (el) => el.isActive
            )
            await this.getConfigurationVersion(this.selectedVersion)
          } catch (e) {}
        })
        this.nav = true
        this.selectedConfiguration = item.nameConfig
      }
      // await this.ClearVersionById()
      // this.selectedVersion = null
    },
    // endregion
    async createConfigurationVersion() {
      await this.CreateConfigurationVersion(
        this.$route.query.configuration
      ).then(() => {
        this.GetAllConfigurationVersions(this.$route.query.configuration)
          .then(() => {
            this.snackbar.text = 'Версия успешно создана'
            this.snackbar.state = true
            this.snackbar.color = 'success'
            this.configurationsAllVersions = this.GET_CONFIGURATIONS_VERSION_All
            this.selectedVersion =
              this.configurationsAllVersions[
                this.configurationsAllVersions.length - 1
              ]
            this.getConfigurationVersion(this.selectedVersion)
            this.nav = true
          })
          .catch(() => {
            this.snackbar.text =
              'Произошла ошибка, попробуйте через несколько секунд'
            this.snackbar.state = true
            this.snackbar.color = 'error'
          })
      })
    },
    async saveVersionAsNew() {
      const version = {
        configurationId: this.$route.query.configuration,
        isActive: false,
      }
      version.businessProceses = this.businessProcessesInVersion.map(
        (el, index) => {
          return {
            businessProcessId: el.businessProcessId,
            businessProcessNumber: index,
          }
        }
      )
      console.log(version)
      await this.SaveAsConfigurationVersionAsNew(version).then(() => {
        this.snackbar.text = 'Версия успешно создана'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.GetAllConfigurationVersions(this.$route.query.configuration).then(
          () => {
            this.configurationsAllVersions = this.GET_CONFIGURATIONS_VERSION_All
            this.selectedVersion =
              this.configurationsAllVersions[
                this.configurationsAllVersions.length - 1
              ]
            this.getConfigurationVersion(this.selectedVersion)
            this.nav = true
          }
        )
      })
    },
    async getConfigurationVersion(item) {
      console.log('Получаем версию по ид')
      await console.dir(item)
      await this.GetConfigurationVersion(item.configurationVersionId).then(
        () => {
          this.businessProcessesInVersion =
            this.GET_VERSION_BY_ID.proceses.$values
        }
      )
    },
    deleteBusinessProcess(item) {
      // this.businessProcesses.push(item)
      this.businessProcessesInVersion = this.businessProcessesInVersion.filter(
        (el) => el !== item
      )
    },
    addBusinessProcess(item) {
      if (
        !this.businessProcessesInVersion.find(
          (el) => el.businessProcessId === item.businessProcessId
        )
      ) {
        this.error = ''
        this.businessProcessesInVersion.push(item)
      } else {
        this.error = 'Такой бизнес процесс уже есть в списке'
      }
    },
    BusinessProcessPrepareToSave() {
      let i = 0
      const bPArray = []
      for (const item of this.businessProcessesInVersion) {
        const bp = {}
        bp.businessProcessId = item.businessProcessId
        bp.businessProcessNumber = i
        bPArray.push({ ...bp })
        i++
      }
      return bPArray
    },
    async saveThisVersion() {
      const version = {}
      version.configurationId = this.selectedVersion.configurationId
      version.configurationVersionId =
        this.selectedVersion.configurationVersionId
      version.businessProceses = this.BusinessProcessPrepareToSave()
      version.isActive = this.selectedVersion.isActive
      await console.log('Версия для сохранения')
      await console.dir(version)
      await this.UpdateConfigurationVersion(version)
        .then(async () => {
          // this.businessProcessesInVersion = []
          // this.selectedVersion = null
          this.error = ''
          this.snackbar.text = 'Версия сохранена'
          this.snackbar.state = true
          this.snackbar.color = 'success'
          await this.$fetch
        })
        .catch(() => {
          this.snackbar.text = 'Добавьте бизнес процессы в версию'
          this.snackbar.state = true
          this.snackbar.color = 'error'
        })
    },
    async setThisVersionActive() {
      await this.ActivateConfigurationVersion(
        this.GET_VERSION_BY_ID.configurationVersionId
      ).then(() => {
        this.snackbar.text = 'Версия активна'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.businessProcessesInVersion = []
        this.selectedVersion = null
        this.error = ''
        this.$fetch()
      })
    },
    async deleteThisVersion() {
      if (this.selectedVersion.isActive) {
        this.confirmDeleteVersionDialog = true
      } else {
        await this.deleteThisSelectedVersion()
      }
    },
    async deleteThisSelectedVersion() {
      this.confirmDeleteVersionDialog = false
      await this.DeleteConfigurationVersionByVersionId(
        this.selectedVersion.configurationVersionId
      ).then(() => {
        this.snackbar.text = 'Версия удалена'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.selectedVersion = null
        this.$fetch()
      })
    },
    getNameBPbyID(item) {
      try {
        const name = this.GET_BUSINESS_PROCESSES_ALL.find(
          (el) => el.businessProcessId === item.businessProcessId
        ).businessProcessName
        return name
      } catch (e) {
        DevLogger(e, 'getNameBPbyID Error')
      }
    },
  },
}
</script>

<style scoped></style>
