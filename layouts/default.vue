<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      :style="`box-shadow:0 100px 80px rgba(0,0,0,.07),0 41.7776px 33.4221px rgba(0,0,0,.0503198),0 22.3363px 17.869px rgba(0,0,0,.0417275),0 12.5216px 10.0172px rgba(0,0,0,.035),0 6.6501px 5.32008px rgba(0,0,0,.0282725),0 2.76726px 2.21381px rgba(0,0,0,.0196802)`"
      fixed
      dark
      floating
      app
      clipped
    >
      <v-list v-if="!$fetchState.pending">
        <v-list-item three-line>
          <!--<v-subheader>-->
          <!--  <p>{{ USER_ACCOUNT.name }}</p>-->
          <!--  <p>{{ SELECTED_CONTRAGENT.name }}</p>-->
          <!--</v-subheader>-->
          <v-list-item-content>
            <v-list-item-title>
              {{ SELECTED_CONTRAGENT.name }}
            </v-list-item-title>
            <v-list-item-subtitle
              class="mt-1 d-flex justify-space-between align-center"
            >
              {{ USER_ACCOUNT.name + ' ' + USER_ACCOUNT.parent }}
              <v-icon small>mdi-exit-to-app</v-icon>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-5" />
        <template v-for="item in leftNavigation">
          <v-list-item
            v-if="
              item.permission.includes(USER_ROLE.Type) ||
              item.permission.includes(USER_ROLE.type)
            "
            :key="item.title"
            class="main-menu__link"
            active-class="main-menu__link--active"
            dark
            color="#0971c750"
            link
            :to="item.link"
          >
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-content class="ml-5">
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
        </template>

        <!--<v-list-item color="#0971c750" nuxt link to="/">
          &lt;!&ndash;<v-list-item-icon>&ndash;&gt;
          &lt;!&ndash;  <v-icon>mdi-account</v-icon>&ndash;&gt;
          &lt;!&ndash;</v-list-item-icon>&ndash;&gt;
          <v-icon>mdi-account</v-icon>
          <NuxtLink
            exact
            active-class="main-menu__link&#45;&#45;active"
            class="main-menu__link"
            to="/"
          >
            Профиль
          </NuxtLink>
          &lt;!&ndash;<v-list-item-content>&ndash;&gt;
          &lt;!&ndash;  <v-list-item-title>Профиль</v-list-item-title>&ndash;&gt;
          &lt;!&ndash;</v-list-item-content>&ndash;&gt;
        </v-list-item>
        <v-list-item color="#0971c750" nuxt link to="/users">
          <v-list-item-icon>
            <v-icon>mdi-user</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Пользователи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#0971c750" nuxt link to="#321">
          <v-list-item-icon>
            <v-icon>mdi-user</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Подразделения</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="#0971c750" nuxt link to="#123">
          <v-list-item-icon>
            <v-icon>mdi-user</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Магазин бизнес процессов</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
      </v-list>
      <!--<nav class="main-menu">
        <ul class="main-menu__menu-list">
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="/">Профиль</NuxtLink>
          </li>
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="/users">
              Пользователи
            </NuxtLink>
          </li>
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="#">Подразделения</NuxtLink>
          </li>
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="#">
              Магазин бизнес процессов
            </NuxtLink>
          </li>
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="/configurations">
              Мастер конфигураций
            </NuxtLink>
          </li>
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="#">Финансы</NuxtLink>
          </li>
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="#">
              Печатные формы(dev)
            </NuxtLink>
          </li>
          <li class="main-menu__item">
            <NuxtLink class="main-menu__link" to="/constructor/">
              Конструктор(dev)
            </NuxtLink>
          </li>
        </ul>
        <v-spacer />
      </nav>-->
    </v-navigation-drawer>
    <v-app-bar
      style="border-bottom: 1px solid #d6dbe1 !important"
      short
      dense
      color="white"
      elevation="0"
      underline
      clipped-left
      app
    >
      <img
        :src="require('@/assets/icons/common/svg/logo-color.svg')"
        height="50"
        width="190px"
        style="object-fit: contain; object-position: left"
      />
      <v-app-bar-nav-icon color="primary" @click="drawer = !drawer" />
      <v-row justify="end" class="pr-3">
        <!--<v-btn text class="mr-10" color="#0971c7">-->
        <!--  {{ SELECTED_CONTRAGENT.name }}-->
        <!--</v-btn>-->
        <!--<v-select-->
        <!--  v-if="GET_ALL_PERMISSIONS.length"-->
        <!--  class="mr-5 mb-0 pt-2 ml-5"-->
        <!--  style="max-width: 200px"-->
        <!--  :items="GET_ALL_PERMISSIONS"-->
        <!--  :item-text="(item) => item.accessName"-->
        <!--  :item-value="(item) => item.accessType"-->
        <!--  background-color="#ffffff"-->
        <!--  dense-->
        <!--  hide-details-->
        <!--  color="#0971c7"-->
        <!--  placeholder="Пермишешны"-->
        <!--  @change="SetUserPermissions($event)"-->
        <!--/>-->
        <!--<v-select-->
        <!--  v-if="GET_ALL_ROLES.length"-->
        <!--  class="mr-5 mb-0 pt-2 ml-5"-->
        <!--  style="max-width: 200px"-->
        <!--  :items="GET_ALL_ROLES"-->
        <!--  :item-text="(item) => item.name"-->
        <!--  :item-value="(item) => item"-->
        <!--  background-color="#ffffff"-->
        <!--  dense-->
        <!--  hide-details-->
        <!--  color="#0971c7"-->
        <!--  placeholder="Роли"-->
        <!--  @change="SetUserRole($event)"-->
        <!--/>-->
        <!--<div-->
        <!--  v-if="SELECTED_CONTRAGENT.partner"-->
        <!--  class="d-flex"-->
        <!--  style="margin-bottom: -10px; margin-top: 10px"-->
        <!--&gt;-->
        <!--  <v-switch-->
        <!--    v-model="SELECTED_CONTRAGENT.partner"-->
        <!--    dense-->
        <!--    label="Партнер"-->
        <!--  />-->
        <!--</div>-->
        <v-select
          v-if="contragents_list.length"
          class="mr-5 mb-0 pt-2 ml-auto"
          style="max-width: 200px"
          :value="SELECTED_CONTRAGENT"
          :items="contragents_list"
          :item-text="(item) => item.name"
          :item-value="(item) => item"
          background-color="#ffffff"
          dense
          hide-details
          color="#0971c7"
          placeholder="Выберите контрагента"
          @change="SetContragent($event)"
        />
        <v-btn depressed outlined color="#0971c7" @click="Logout">Выход</v-btn>
      </v-row>
    </v-app-bar>
    <v-main class="main-layout">
      <nuxt />
    </v-main>
    <v-snackbar
      v-model="alert"
      elevation="12"
      color="primary"
      text
      centered
      vertical
    >
      <p>
        Наш сайт, как и большинство других, использует файлы cookie, чтобы
        сделать использование наших сервисов максимально комфортным для вас. Мы
        используем файлы cookies только для авторизации на сайте и не храним
        персональные данные.
      </p>
      <p>
        При использовании данного сайта, вы подтверждаете свое согласие на
        использование файлов cookie
      </p>
      <template #action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="acceptCookies">
          Принять и продолжить
        </v-btn>
      </template>
    </v-snackbar>
    <!--<div class="main-layout">

      <div class="main-wrapper">
        <div class="left-menu-wrapper">1234</div>
        <div class="content-wrapper">
          <nuxt />
        </div>
      </div>
    </div>-->
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getCookie, setCookie } from '@/api/Methods'
export default {
  name: 'DefaultLayout',
  fetchOnServer: false,
  data() {
    return {
      alert: false,
      leftNavigation: [
        {
          title: 'Главная',
          link: '/',
          icon: 'mdi-view-dashboard-outline',
          permission: [0, 1, 2, 3, 4],
        },
        {
          title: 'Подразделения',
          link: '/divisions',
          icon: 'mdi-graph-outline',
          permission: [0, 1, 2, 3, 4],
        },
        {
          title: 'Магазин бизнес процессов',
          link: '/market',
          icon: 'mdi-shopping-outline',
          permission: [0, 1, 2, 3, 4],
        },
        {
          title: 'Мастер конфигураций',
          link: '/configurator',
          icon: 'mdi-cog-transfer-outline',
          permission: [0, 2, 3, 4],
        },
        {
          title: 'Финансы',
          link: '/finance',
          icon: 'mdi-cash-fast',
          permission: [2, 1, 4],
        },
        {
          title: 'Печатные формы(dev)',
          link: '/reports',
          icon: 'mdi-cloud-print-outline',
          permission: [0, 1, 2, 3, 4],
        },
        {
          title: 'Администрирование',
          link: '/administration',
          icon: 'mdi-account-group-outline',
          permission: [2, 4],
        },
        // { title: 'Конструктор', link: '/constructor', icon: 'mdi-account' },
        {
          title: 'Профиль(dev)',
          link: '/account',
          icon: 'mdi-account',
          permission: [0, 1, 2, 3, 4],
        },
      ],
      drawer: true,
      userRole: {},
      contragents_list: [],
      // loading: true,
    }
  },
  async fetch() {
    await this.GetContragents().then(async () => {
      await this.InitUserRole()
      this.userRole = this.USER_ROLE
      this.contragents_list = [this.CONTRAGENTS, ...this.CHILD_CONTRAGENTS]
      console.log('this.contragents_list')
      console.dir(this.contragents_list)
    })
    if (this.USER_ACCOUNT.id) {
      this.userProfile = Object.assign({}, this.USER_ACCOUNT)
    } else {
      this.GetUserInfo().then(() => {
        this.userProfile = Object.assign({}, this.USER_ACCOUNT)
      })
    }
    await this.GetAllRoles()
    await this.GetAllPermissions()
  },
  // watch: {
  //   SELECTED_CONTRAGENT() {
  //     this.$fetch()
  //   },
  // },
  // async beforeMount() {
  //   this.loading = true
  //   await this.GetContragents().then(() => this.InitUserRole())
  //   if (this.USER_ACCOUNT.id) {
  //     this.userProfile = Object.assign({}, this.USER_ACCOUNT)
  //   } else {
  //     await this.GetUserInfo().then(() => {
  //       this.userProfile = Object.assign({}, this.USER_ACCOUNT)
  //     })
  //   }
  //   this.loading = false
  // },
  computed: {
    ...mapGetters([
      'CONTRAGENTS',
      'USER_ACCOUNT',
      'SELECTED_CONTRAGENT',
      'CHILD_CONTRAGENTS',
      'USER_INIT',
      'USER_ROLE',
      'GET_ALL_PERMISSIONS',
      'GET_ALL_ROLES',
    ]),
  },
  beforeMount() {
    setTimeout(() => {
      console.log(getCookie('cookieAccept'))
      if (getCookie('cookieAccept') !== 'true') {
        this.alert = true
      }
    }, 500)
  },
  methods: {
    ...mapActions([
      'Logout',
      'GetUserInfo',
      'GetContragents',
      'SelectContragent',
      'InitUserRole',
      'GetChildContragents',
      'GetAllRoles',
      'GetAllPermissions',
    ]),
    acceptCookies() {
      this.alert = false
      setCookie('cookieAccept', true)
    },
    async SetContragent(item) {
      await this.SelectContragent(item).then(() => {
        if (this.$route.params?.bprocessId) {
          this.$router.push('/configurator/processes')
        }
      })
    },
    // SetUserPermissions(item) {
    //   console.log(item)
    //   this.$store.commit('SET_USER_PERMISSION', item)
    // },
    // SetUserRole(item) {
    //   console.log(item)
    //   this.$store.commit('SET_USER_TYPE', item)
    //   this.userRole = this.USER_ROLE
    // },
  },
}
</script>

<style lang="scss">
.v-main__wrap {
  display: flex !important;
}
</style>
