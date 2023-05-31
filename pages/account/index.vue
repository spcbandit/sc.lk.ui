<template>
  <div class="configurator-wrapper">
    <div v-if="!$route.params.bprocessId" class="page-header px-7 pt-5">
      <h2 class="mb-5">Аккаунт</h2>
      <v-tabs background-color="transparent">
        <v-tab>
          <span style="text-transform: none !important">Ваш профиль</span>
        </v-tab>
        <v-tab>
          <span style="text-transform: none !important">
            Профиль организации
          </span>
        </v-tab>
        <v-tab>
          <span style="text-transform: none !important">
            Настройки аккаунта
          </span>
        </v-tab>
      </v-tabs>
    </div>
    <div class="px-7 pt-5">
      <div class="d-flex">
        <div class="flex-grow-1 flex-shrink-1">
          <div class="">
            <h3>Общие настройки</h3>
          </div>
          <v-form ref="accountForm" class="mt-5">
            <div class="d-flex align-start">
              <span
                class="d-flex align-center mr-5"
                style="height: 40px; width: 100px"
              >
                Фамилия:
              </span>
              <v-text-field
                v-model="userProfile.family"
                :loading="loading"
                style="max-width: 500px"
                label="Введите вашу фамилию"
                height="40px"
                solo
                :disabled="!formEditable"
                :outlined="formEditable"
                elevation="0"
                dense
                flat
              />
            </div>
            <div class="d-flex align-start">
              <span
                class="d-flex align-center mr-5"
                style="height: 40px; width: 100px"
              >
                Имя:
              </span>
              <v-text-field
                v-model="userProfile.name"
                :loading="loading"
                style="max-width: 500px"
                height="40px"
                label="Введите ваш имя"
                solo
                :disabled="!formEditable"
                :outlined="formEditable"
                elevation="0"
                dense
                flat
              />
            </div>
            <div class="d-flex align-start">
              <span
                class="d-flex align-center mr-5"
                style="height: 40px; width: 100px"
              >
                Отчество
              </span>
              <v-text-field
                v-model="userProfile.parent"
                :loading="loading"
                style="max-width: 500px"
                height="40px"
                label="Введите ваше отчество"
                solo
                :disabled="!formEditable"
                :outlined="formEditable"
                elevation="0"
                dense
                flat
              />
            </div>
            <div class="d-flex align-start">
              <span
                class="d-flex align-center mr-5"
                style="height: 40px; width: 100px"
              >
                E-mail
              </span>
              <v-text-field
                v-model="userProfile.login"
                :loading="loading"
                style="max-width: 500px"
                height="40px"
                label="Введите ваш e-mail"
                solo
                :disabled="!formEditable"
                :outlined="formEditable"
                elevation="0"
                dense
                flat
              />
            </div>
            <div class="d-flex align-start">
              <span
                class="d-flex align-center mr-5"
                style="height: 40px; width: 100px"
              >
                Адрес
              </span>
              <v-text-field
                v-model="userProfile.address"
                :loading="loading"
                style="max-width: 500px"
                height="40px"
                label="Введите ваш адрес"
                solo
                :disabled="!formEditable"
                :outlined="formEditable"
                elevation="0"
                dense
                flat
              />
            </div>
          </v-form>
          <div class="d-flex my-5">
            <v-btn
              v-if="!formEditable"
              elevation="0"
              :color="!formEditable ? 'primary' : 'success'"
              @click="EditProfile"
            >
              <v-icon class="mr-3">mdi-account-edit-outline</v-icon>
              Редактировать
            </v-btn>
            <v-btn
              v-if="formEditable"
              elevation="0"
              color="success"
              @click="UpdateUserInfo"
            >
              <v-icon class="mr-3">mdi-check</v-icon>
              Сохранить
            </v-btn>
            <v-btn
              v-if="formEditable"
              class="ml-8"
              elevation="0"
              color="error"
              @click="CancelChanges"
            >
              <v-icon class="mr-3">mdi-format-color-marker-cancel</v-icon>
              Отменить
            </v-btn>
          </div>
        </div>
        <div class="ml-10 flex-grow-1 flex-shrink-1">
          <h3 class="mb-5">Доступы</h3>
          <div class="d-flex flex-column align-start">
            <v-chip :color="USER_ROLE.FinanceRole ? 'success' : 'error'">
              Управление финансами
            </v-chip>
            <v-chip
              class="mt-3"
              :color="USER_ROLE.ChangingContractorProfile ? 'success' : 'error'"
            >
              Изменение профиля контрагента
            </v-chip>
            <v-chip
              class="mt-3"
              :color="
                USER_ROLE.CreatingChangingUserProfile ? 'success' : 'error'
              "
            >
              Управление и создание пользователей
            </v-chip>
            <v-chip
              class="mt-3"
              :color="USER_ROLE.ChangingConfiguration ? 'success' : 'error'"
            >
              Изменение конфигураций
            </v-chip>
          </div>
        </div>
      </div>
      {{ GET_ALL_PERMISSIONS }}
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AccountPage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  components: {},
  fetchOnServer: false,
  async fetch() {
    if (this.USER_ACCOUNT.id) {
      this.userProfile = Object.assign({}, this.USER_ACCOUNT)
    } else {
      this.GetUserInfo().then(() => {
        this.userProfile = Object.assign({}, this.USER_ACCOUNT)
      })
    }
    await this.GetAllPermissions()
  },
  data: () => ({
    drawer: true,
    leftNavigation: [
      { title: 'Профиль', link: '/', icon: 'mdi-account' },
      { title: 'Пользователи', link: '/users', icon: 'mdi-account' },
      { title: 'Подразделения', link: '/divisions', icon: 'mdi-account' },
      {
        title: 'Магазин бизнес процессов',
        link: '/market',
        icon: 'mdi-account',
      },
      {
        title: 'Мастер конфигураций',
        link: '/configurations',
        icon: 'mdi-account',
      },
      { title: 'Финансы', link: '/finance', icon: 'mdi-account' },
      { title: 'Печатные формы(dev)', link: '/reports', icon: 'mdi-account' },
      { title: 'Конструктор', link: '/constructor', icon: 'mdi-account' },
    ],
    loading: false,
    userProfile: {},
    selectContragent: {},
    temporaryUser: {},
    formEditable: false,
    contragents: [],
  }),
  // beforeMount() {
  //   this.userProfile = Object.assign({}, this.USER_ACCOUNT)
  // },
  computed: {
    ...mapGetters([
      'CONTRAGENTS',
      'USER_ACCOUNT',
      'SELECTED_CONTRAGENT',
      'USER_INIT',
      'USER_ROLE',
      'GET_ALL_PERMISSIONS'
    ]),
  },
  // beforeMount() {
  //   this.GetUser()
  // },
  methods: {
    ...mapActions([
      'Logout',
      'GetUserInfo',
      'GetContragents',
      // 'InitContragent',
      'SelectContragent',
      'InitUserRole',
      'ChangeData',
      'GetAllPermissions'
    ]),
    EditProfile() {
      this.formEditable = true
    },
    CancelChanges() {
      this.userProfile = Object.assign({}, this.USER_ACCOUNT)
      this.formEditable = false
    },
    UpdateUserInfo() {
      this.ChangeData(this.userProfile).then(
        () => this.formEditable = false
      ).catch(err => console.dir(err))
    },
  },
}
</script>
<style scoped lang="scss"></style>
