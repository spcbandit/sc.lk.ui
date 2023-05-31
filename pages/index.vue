<template>
  <div class="configurator-wrapper">
    <div v-if="!$route.params.bprocessId" class="page-header px-7 pt-5">
      <!--<div class="d-flex mb-10">-->
      <!--  <v-chip color="info">Временно приостановлен</v-chip>-->
      <!--  <v-chip class="ml-5" color="error">Пополните баланс</v-chip>-->
      <!--  <v-chip class="ml-5" color="success">Активен</v-chip>-->
      <!--  <v-chip class="ml-5" color="warning">-->
      <!--    Недостаточно средств для продления-->
      <!--  </v-chip>-->
      <!--</div>-->
      <!--<p>Баланс: 0 р</p>-->
      <!--<p>Всякое: Тут всякое</p>-->
      <!--<p>Еще всякое: Тут еще всякое</p>-->
      <!--<p>И еще немного всякого: Тут еще немного всякого</p>-->
    </div>
    <div class="configurator-dashboard px-7 pt-5">
      <NuxtLink
        v-if="$store.getters.USER_ROLE.Type === 2"
        to="/administration"
        class="card"
      >
        <div class="card-header pa-3">
          <v-avatar color="#0971c715" size="68">
            <v-icon large color="#0971c7">mdi-account-supervisor</v-icon>
          </v-avatar>
          <div class="ml-5">
            <!--<h2 class="card-header__title">82</h2>-->
            <span class="card-header__description" style="font-size: 13px">
              Пользователи
            </span>
          </div>
          <v-btn class="ml-auto" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
        </div>
      </NuxtLink>
      <NuxtLink to="/configurator" class="card">
        <div class="card-header pa-3">
          <v-avatar color="#0971c715" size="68">
            <v-icon large color="#0971c7">mdi-code-json</v-icon>
          </v-avatar>
          <div class="ml-5">
            <!--<h2 class="card-header__title">3 568</h2>-->
            <span class="card-header__description" style="font-size: 13px">
              Конфигурации
            </span>
          </div>
          <v-btn class="ml-auto" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
        </div>
      </NuxtLink>
      <NuxtLink to="/divisions/terminals" class="card">
        <div class="card-header pa-3">
          <v-avatar color="#0971c715" size="68">
            <v-icon large color="#0971c7">mdi-barcode-scan</v-icon>
          </v-avatar>
          <div class="ml-5">
            <!--<h2 class="card-header__title">505</h2>-->
            <span class="card-header__description" style="font-size: 13px">
              Терминалы
            </span>
          </div>
          <v-btn class="ml-auto" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
        </div>
      </NuxtLink>
      <div class="card">
        <div class="card-header pa-3">
          <v-avatar color="#0971c715" size="68">
            <v-icon large color="#0971c7">mdi-cloud-download-outline</v-icon>
          </v-avatar>
          <div class="ml-5">
            <!--<h2 class="card-header__title">4</h2>-->
            <span class="card-header__description" style="font-size: 13px">
              Обновления (в разработке)
            </span>
          </div>
          <v-btn class="ml-auto" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
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
            <!--<span>все уведомления</span>-->
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <!--<div class="account-info">-->
    <!--  <h2>Аккаунт</h2>-->
    <!--  <v-form ref="accountForm" class="mt-5">-->
    <!--    <div class="d-flex align-start">-->
    <!--      <span-->
    <!--        class="d-flex align-center mr-5"-->
    <!--        style="height: 40px; width: 100px"-->
    <!--      >-->
    <!--        Фамилия:-->
    <!--      </span>-->
    <!--      <v-text-field-->
    <!--        v-model="userProfile.family"-->
    <!--        :loading="loading"-->
    <!--        style="max-width: 500px"-->
    <!--        label="Введите вашу фамилию"-->
    <!--        height="40px"-->
    <!--        solo-->
    <!--        :disabled="!formEditable"-->
    <!--        :outlined="formEditable"-->
    <!--        elevation="0"-->
    <!--        dense-->
    <!--        flat-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div class="d-flex align-start">-->
    <!--      <span-->
    <!--        class="d-flex align-center mr-5"-->
    <!--        style="height: 40px; width: 100px"-->
    <!--      >-->
    <!--        Имя:-->
    <!--      </span>-->
    <!--      <v-text-field-->
    <!--        v-model="userProfile.name"-->
    <!--        :loading="loading"-->
    <!--        style="max-width: 500px"-->
    <!--        height="40px"-->
    <!--        label="Введите ваш имя"-->
    <!--        solo-->
    <!--        :disabled="!formEditable"-->
    <!--        :outlined="formEditable"-->
    <!--        elevation="0"-->
    <!--        dense-->
    <!--        flat-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div class="d-flex align-start">-->
    <!--      <span-->
    <!--        class="d-flex align-center mr-5"-->
    <!--        style="height: 40px; width: 100px"-->
    <!--      >-->
    <!--        Отчество-->
    <!--      </span>-->
    <!--      <v-text-field-->
    <!--        v-model="userProfile.parent"-->
    <!--        :loading="loading"-->
    <!--        style="max-width: 500px"-->
    <!--        height="40px"-->
    <!--        label="Введите ваше отчество"-->
    <!--        solo-->
    <!--        :disabled="!formEditable"-->
    <!--        :outlined="formEditable"-->
    <!--        elevation="0"-->
    <!--        dense-->
    <!--        flat-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div class="d-flex align-start">-->
    <!--      <span-->
    <!--        class="d-flex align-center mr-5"-->
    <!--        style="height: 40px; width: 100px"-->
    <!--      >-->
    <!--        E-mail-->
    <!--      </span>-->
    <!--      <v-text-field-->
    <!--        v-model="userProfile.login"-->
    <!--        :loading="loading"-->
    <!--        style="max-width: 500px"-->
    <!--        height="40px"-->
    <!--        label="Введите ваш e-mail"-->
    <!--        solo-->
    <!--        :disabled="!formEditable"-->
    <!--        :outlined="formEditable"-->
    <!--        elevation="0"-->
    <!--        dense-->
    <!--        flat-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div class="d-flex align-start">-->
    <!--      <span-->
    <!--        class="d-flex align-center mr-5"-->
    <!--        style="height: 40px; width: 100px"-->
    <!--      >-->
    <!--        Адрес-->
    <!--      </span>-->
    <!--      <v-text-field-->
    <!--        v-model="userProfile.address"-->
    <!--        :loading="loading"-->
    <!--        style="max-width: 500px"-->
    <!--        height="40px"-->
    <!--        label="Введите ваш адрес"-->
    <!--        solo-->
    <!--        :disabled="!formEditable"-->
    <!--        :outlined="formEditable"-->
    <!--        elevation="0"-->
    <!--        dense-->
    <!--        flat-->
    <!--      />-->
    <!--    </div>-->
    <!--  </v-form>-->
    <!--  <div class="d-flex my-5">-->
    <!--    <v-btn-->
    <!--      v-if="!formEditable"-->
    <!--      elevation="0"-->
    <!--      :color="!formEditable ? 'primary' : 'success'"-->
    <!--      @click="EditProfile"-->
    <!--    >-->
    <!--      <v-icon class="mr-3">mdi-account-edit-outline</v-icon>-->
    <!--      Редактировать-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      v-if="formEditable"-->
    <!--      elevation="0"-->
    <!--      color="success"-->
    <!--      @click="UpdateUserInfo"-->
    <!--    >-->
    <!--      <v-icon class="mr-3">mdi-check</v-icon>-->
    <!--      Сохранить-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      v-if="formEditable"-->
    <!--      class="ml-8"-->
    <!--      elevation="0"-->
    <!--      color="error"-->
    <!--      @click="CancelChanges"-->
    <!--    >-->
    <!--      <v-icon class="mr-3">mdi-format-color-marker-cancel</v-icon>-->
    <!--      Отменить-->
    <!--    </v-btn>-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'IndexPage',
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
      'InitContragent',
      'SelectContragent',
      'InitUserRole',
      'ChangeData',
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
