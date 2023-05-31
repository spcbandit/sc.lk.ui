<template>
  <div class="configurator-wrapper">
    <!--<div class="page-header px-7 pt-5">
      <h2 class="mb-5">Пользователи</h2>
      <v-btn
        class="mb-5"
        elevation="0"
        color="primary"
        @click="addNewUserDialog = true"
      >
        Добавить пользователя
      </v-btn>
      &lt;!&ndash;<v-tabs background-color="transparent">&ndash;&gt;
      &lt;!&ndash;  <v-tab exact link to="/configurator">&ndash;&gt;
      &lt;!&ndash;    <v-icon>mdi-view-dashboard-outline</v-icon>&ndash;&gt;
      &lt;!&ndash;  </v-tab>&ndash;&gt;
      &lt;!&ndash;  <v-tab link to="/configurator/configurations">&ndash;&gt;
      &lt;!&ndash;    <span style="text-transform: none !important">Все конфигурации</span>&ndash;&gt;
      &lt;!&ndash;  </v-tab>&ndash;&gt;
      &lt;!&ndash;  <v-tab link to="/configurator/processes">&ndash;&gt;
      &lt;!&ndash;    <span style="text-transform: none !important">Бизнес-процессы</span>&ndash;&gt;
      &lt;!&ndash;  </v-tab>&ndash;&gt;
      &lt;!&ndash;  <v-tab link to="/configurator/terminals">&ndash;&gt;
      &lt;!&ndash;    <span style="text-transform: none !important">Терминалы</span>&ndash;&gt;
      &lt;!&ndash;  </v-tab>&ndash;&gt;
      &lt;!&ndash;</v-tabs>&ndash;&gt;
    </div>-->
    <div class="pt-5 px-7">
      <div class="mb-5">
        <h3>Пользователи</h3>
      </div>
      <div class="d-flex">
        <v-text-field
          v-model="searchUsers"
          outlined
          dense
          color="primary"
          label="Искать"
          class="mx-0"
        />
        <v-btn
          class="mb-5 ml-5"
          height="40"
          elevation="0"
          :disabled="$store.getters.USER_ROLE.AccessType === 1"
          color="primary"
          @click="addNewUserDialog = true"
        >
          Добавить пользователя
        </v-btn>
      </div>
      <v-data-table
        :loading="$fetchState.pending"
        :headers="usersTable"
        :items="users"
        :search="searchUsers"
        :items-per-page="10"
        class="elevation-0"
      >
        <template #item.tools="{ item }">
          <div class="d-flex">
            <v-btn
              icon
              color="success"
              class="mr-2"
              @click="openUpdateUserDialog(item)"
            >
              <v-icon color="success">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteUser(item)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
      <!--<p>-->
      <!--  {{ GET_ALL_ROLES }}-->
      <!--</p>-->
      <!--<p>-->
      <!--  {{ GET_ALL_PERMISSIONS }}-->
      <!--</p>-->
    </div>
    <v-dialog
      v-model="addNewUserDialog"
      max-width="600"
      @click:outside="closeNewUser"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Добавить пользователя</h2>
          <v-btn icon @click="closeNewUser">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content px-5">
          <v-form
            ref="newUserForm"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
            lazy-validation
          >
            <v-text-field
              v-model="newUserModel.login"
              outlined
              dense
              :error-messages="errors.newUserModel.login.text"
              :error="errors.newUserModel.login.state"
              :rules="[rules.email, rules.required]"
              label="E-mail"
            />
            <v-select
              v-model="newUserModel.roleType"
              :items="GET_ALL_ROLES"
              :rules="[rules.required]"
              item-value="type"
              item-text="name"
              label="Роль"
              outlined
              dense
            />
            <v-radio-group
              v-model="newUserModel.accessType"
              :rules="[rules.required]"
              class="mt-0"
            >
              <v-radio
                v-for="permission in GET_ALL_PERMISSIONS"
                :key="permission.accessType"
                :label="permission.accessName"
                :value="permission.accessType"
              />
            </v-radio-group>
            <!--{{ GET_ALL_ROLES }}-->
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="CreateNewUser">Сохранить</v-btn>
          <v-btn color="error" @click="closeNewUser">Отмена</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="updateUserDialog"
      max-width="600"
      @click:outside="closeUpdateUser"
    >
      <v-card v-if="selectedUserToUpdate" class="dialog">
        <div class="dialog__header">
          <h2>Редактировать пользователя</h2>
          <v-btn icon @click="closeUpdateUser">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content px-5">
          <v-form
            ref="updateUserForm"
            style="display: flex; flex-direction: column; row-gap: 0px"
            action=""
            lazy-validation
          >
            <v-text-field
              v-model="selectedUserToUpdate.login"
              label="Логин"
              disabled
              dense
              outlined
            />
            <v-text-field
              v-model="selectedUserToUpdate.name"
              label="Имя"
              dense
              outlined
            />
            <v-text-field
              v-model="selectedUserToUpdate.parent"
              label="Отчество"
              dense
              outlined
            />
            <v-text-field
              v-model="selectedUserToUpdate.family"
              label="Фамилия"
              dense
              outlined
            />
            <v-select
              v-model="selectedUserToUpdate.role.type"
              :items="GET_ALL_ROLES"
              :rules="[rules.required]"
              item-value="type"
              item-text="name"
              label="Роль"
              outlined
              dense
            />
            <v-radio-group
              v-model="selectedUserToUpdate.role.accessType"
              class="mt-0"
            >
              <v-radio
                v-for="permission in GET_ALL_PERMISSIONS"
                :key="permission.accessType"
                :label="permission.accessName"
                :value="permission.accessType"
              />
            </v-radio-group>
            <!--{{ selectedUserToUpdate }}-->
            <!--{{ GET_ALL_ROLES }}-->
          </v-form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="updateUser">Сохранить</v-btn>
          <v-btn color="error" @click="closeUpdateUser">Отмена</v-btn>
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
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable */
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'UsersPage',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  layout: 'default',
  fetchOnServer: false,
  data() {
    return {
      snackbar: {
        state: false,
        text: '',
        color: 'primary',
      },
      errors: {
        newUserModel: {
          login: {
            state: false,
            text: '',
          }
        }
      },
      rules: {
        required: (value) => (!!value || value === 0) || 'Поле обязательно к заполнению.',
        min: (v) => (v && v.length >= 6) || 'Минимум 6 символов',
        email: (val) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(val) || 'Неверный e-mail'
        },
      },
      newUserModel: {
        roleType: '',
        password: '',
        login: '',
        accessType: 0,
      },
      users: [],
      addNewUserDialog: false,
      updateUserDialog: false,
      searchUsers: '',
      usersTable: [
        { text: 'Id', value: '$id' },
        {
          text: 'ФИО',
          align: 'start',
          sortable: false,
          value: 'nameConfig',
        },
        { text: 'E-mail', value: 'login' },
        { text: 'Активный', value: 'idVersion' },
        { text: 'Роль', value: 'idVersion' },
        { text: '', value: 'tools', sortable: false, width: 100 },
      ],
      selectedUserToUpdate: null,
    }
  },
  watch: {
    SELECTED_CONTRAGENT() {
      this.$fetch()
    },
  },
  async fetch() {
    this.GetAllUsers().then(()=> {
      this.users = this.GET_ALL_USERS
    })
    await this.GetAllRoles()
    await this.GetAllPermissions()
  },
  computed: {
    ...mapGetters(['GET_ALL_USERS', 'SELECTED_CONTRAGENT', 'GET_ALL_ROLES', 'GET_ALL_PERMISSIONS', 'USER_ACCOUNT', 'SELECTED_CONTRAGENT'])
  },
  beforeMount() {},
  methods: {
    ...mapActions(['GetAllUsers', 'CreateUser', 'GetAllRoles', 'GetAllPermissions', 'DeleteUser', 'UpdateUser']),
    CreateNewUser() {
      if (this.$refs.newUserForm.validate()) {
        this.errors.newUserModel.login.text = ''
        this.errors.newUserModel.login.state = false
        const role = this.GET_ALL_ROLES.find((el) => el.type === this.newUserModel.roleType).name
        const createdUser = {
          ...this.newUserModel,
          roleName: role,
          contractorId: this.SELECTED_CONTRAGENT.id
        }
        console.log(createdUser)
        this.CreateUser(createdUser).then(() => {
          this.snackbar.text = 'Пользователь создан'
          this.snackbar.state = true
          this.snackbar.color = 'success'
          this.$fetch()
          this.closeNewUser()
        }).catch((e) => {
          console.dir(e)
          this.errors.newUserModel.login.text = e.response.data.errorMessage
          this.errors.newUserModel.login.state = true
        })
      }
    },
    async openUpdateUserDialog(item){
      this.updateUserDialog = true
      this.selectedUserToUpdate = await Object.assign({}, item)
    },
    updateUser() {
      const user = {
        userId: this.selectedUserToUpdate.id,
        name: this.selectedUserToUpdate.name,
        parent: this.selectedUserToUpdate.parent,
        family: this.selectedUserToUpdate.family,
        roleType: this.selectedUserToUpdate.role.type,
        role: {
          id: this.selectedUserToUpdate.role.id,
          updated: this.selectedUserToUpdate.role.updated,
          type: this.selectedUserToUpdate.role.type,
          name: this.GET_ALL_ROLES.find((el) => el.type === this.selectedUserToUpdate.role.type).name,
          accessType: this.selectedUserToUpdate.role.accessType,
        }
      }
      this.UpdateUser(user).then(() => {
        this.closeUpdateUser()
      })
      console.log(user)
    },
    async deleteUser(item) {
      await this.DeleteUser(item.id).then(() => this.$fetch())
    },
    async closeNewUser() {
      await this.$refs.newUserForm.reset()
      this.addNewUserDialog = false
      this.errors.newUserModel.login.text = ''
      this.errors.newUserModel.login.state = false
    },
    async closeUpdateUser() {
      await this.$refs.updateUserForm.reset()
      this.selectedUserToUpdate = null
      this.updateUserDialog = false
    },
  },
}
</script>

<style scoped></style>
