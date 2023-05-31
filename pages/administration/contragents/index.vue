<template>
  <div class="configurator-wrapper">
    <div class="pt-5 px-7">
      <div class="mb-5">
        <h3>Управление контрагентами</h3>
      </div>
      <p>Ваш основной контрагент: {{ mainContragent.name }}</p>
      <div class="d-flex">
        <v-text-field
          v-model="searchContragents"
          outlined
          dense
          color="primary"
          label="Искать"
          class="mx-0"
        />
        <v-btn
          :disabled="$store.getters.USER_ROLE.AccessType === 1"
          class="mb-5 ml-5"
          height="40"
          elevation="0"
          color="primary"
          @click="addNewContragent = true"
        >
          Добавить контрагента
        </v-btn>
      </div>
      <v-data-table
        :loading="$fetchState.pending"
        :headers="contragentsTable"
        :items="CHILD_CONTRAGENTS"
        :search="searchContragents"
        :items-per-page="10"
        class="elevation-0"
      >
        <template #item.tools="{ item }">
          <div class="d-flex">
            <v-btn
              icon
              color="success"
              class="mr-2"
              @click="openUpdateUserDialog"
            >
              <v-icon color="success">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteUser(item)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
        <template
          v-if="USER_ROLE.Type === 4 || USER_ROLE.type === 4"
          #item.state="{ item }"
        >
          <v-btn
            v-if="item.partner"
            elevation="0"
            color="primary"
            @click="deleteStatusPartner(item.id)"
          >
            Отменить партнерство
          </v-btn>
          <v-btn
            v-else
            elevation="0"
            color="success"
            @click="setContragentToPartner(item.id)"
          >
            Сделать партнером
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog
      v-model="addNewContragent"
      max-width="600"
      @click:outside="closeNewContragentDialog"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Добавить контрагента</h2>
          <v-btn icon @click="closeNewContragentDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content px-5">
          <v-form
            ref="contractorValidate"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
          >
            <div class="d-flex align-start">
              <v-text-field
                v-model="newContragentModel.contragentINN"
                outlined
                dense
                tile
                clearable
                :error="validate.error"
                :error-messages="`${validate.message}`"
                :rules="[rules.required]"
                validate-on-blur
                label="Введите ИНН компании"
                @input="resetForm"
              />
              <v-btn
                height="40px"
                depressed
                tile
                color="success"
                text
                class="ml-5"
                @click.stop="ValidateInn"
              >
                Проверить
              </v-btn>
            </div>
            <v-expand-transition>
              <p v-show="!validate.error && successMsg">
                {{ successMsg }}
                <br />
              </p>
            </v-expand-transition>
            <!--{{ GET_ALL_ROLES }}-->
          </v-form>
          <v-form
            ref="newContragentForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
          >
            <!--{{ GET_ALL_ROLES }}-->
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn
            :disabled="!successMsg"
            color="success"
            @click="createChildContragent"
          >
            Добавить контрагента
          </v-btn>
          <v-btn color="error" @click="closeNewContragentDialog">Отмена</v-btn>
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
  name: 'ContragentsPage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  layout: 'default',
  fetchOnServer: false,
  data() {
    return {
      contragentsTable: [
        { text: 'Название', value: 'name' },
        { text: 'Id', value: 'id' },
        { text: 'Партнер', value: 'partner' },
        { text: '', value: 'state', sortable: false, width: 100 },
        // {
        //   text: 'ФИО',
        //   align: 'start',
        //   sortable: false,
        //   value: 'nameConfig',
        // },
        // { text: 'E-mail', value: 'login' },
        // { text: 'Активный', value: 'idVersion' },
        // { text: 'Роль', value: 'idVersion' },
        // { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      validate: {
        error: false,
        status: '',
        message: '',
      },
      rules: {
        required: (v) => !!v || 'Поле обязательно к заполнению.',
      },
      newContragentINN: '',
      successMsg: '',
      searchContragents: '',
      addNewContragent: false,
      newContragentModel: {
        contragentINN: '',
        contragentName: '',
        contragentType: 0,
      },
      mainContragent: {},
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
      'USER_ROLE',
    ]),
  },
  beforeMount() {},
  methods: {
    ...mapActions(['GetContragents','CreateChildContragent','GetChildContragents', 'SetStatusPartner', 'DeleteStatusPartner']),
    async closeNewContragentDialog() {
      await this.$refs.newContragentForm.reset()
      await this.$refs.contractorValidate.reset()
      this.addNewContragent = false
    },
    resetForm() {
      this.validate.status = ''
      this.validate.error = false
      this.validate.message = ''
      this.successMsg = ''
    },
    async ValidateInn() {
      if (this.$refs.contractorValidate.validate()) {
        await this.GetInn()
      }
    },
    async GetInn() {
      this.validate = {
        error: false,
        message: '',
        status: '',
      }
      const ClientAuth = new ProfilePart(this.$axios)
      await ClientAuth.GetContragentInn(this.newContragentModel.contragentINN)
        .then((resp) => {
          console.log(resp)
          this.validate.status = 200
          this.successMsg = resp.contractorName
          this.newContragentModel.contragentName = resp.contractorName
        })
        .catch((err) => {
          console.dir(err)
          this.validate = {
            error: true,
            message: err.response.data.errorMessage,
            status: err.response.status,
          }
        })
    },
    async createChildContragent() {
      this.CreateChildContragent(this.newContragentModel).then(async () => {
        await this.closeNewContragentDialog()
        this.$fetch()
      })
    },
    deleteStatusPartner(id) {
      console.log(id)
      console.log('Назначаем партнерку')
      this.DeleteStatusPartner(id)
      this.GetChildContragents()
      this.$fetch()
    },
    setContragentToPartner(id) {
      console.log(id)
      console.log('Назначаем партнерку')
      this.SetStatusPartner(id)
      this.GetChildContragents()
      this.$fetch()
    }
  },
}
</script>

<style scoped></style>
