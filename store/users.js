/* eslint-disable */
import {getCookie} from "@/api/Methods";
import UserPart from "@/api/parts/UserPart";
import ProfilePart from "@/api/parts/ProfilePart";

export const state = () => ({
  allUsers: [],
  allPermissions: {},
  allRoles: {},
})

export const mutations = {
  ALL_USERS(state, resp) {
    state.allUsers = resp
  },
  ALL_PERMISSIONS(state, resp) {
    state.allPermissions = resp
  },
  ALL_ROLES(state, resp) {
    state.allRoles = resp
  }
}

export const getters = {
  GET_ALL_USERS(state) {
    return state.allUsers
  },
  GET_ALL_PERMISSIONS(state) {
    return state.allPermissions
  },
  GET_ALL_ROLES(state) {
    return state.allRoles
  }
}

export const actions = {
  async CreateUser({ commit }, user) {
    const UsersClient = new UserPart(this.$axios)
    console.log(user)
    await UsersClient.CreateUser(
      user.roleType,
      user.password,
      user.login,
      user.accessType,
      user.roleName,
      user.contractorId,
    )
  },
  async GetAllUsers({ commit }) {
    const UsersClient = new UserPart(this.$axios)
    await UsersClient.GetAllUsers().then((resp) => {
      console.log('Получаем всех пользоваталей')
      console.dir(resp)
      commit('ALL_USERS', resp.users.$values)
    }).catch((err) => {
      console.log('Ошибка получения пользователей')
      console.dir(err)
    })
  },
  async GetAllPermissions({ commit }) {
    const UsersClient = new UserPart(this.$axios)
    await UsersClient.GetAllPermissions().then((resp) => {
      console.log('Получаем все пермишены')
      console.dir(resp)
      commit('ALL_PERMISSIONS', resp.permissions.$values)
    }).catch((err) => {
      console.log('Ошибка получения пермишенов')
      console.dir(err)
    })
  },
  async GetAllRoles({ commit }) {
    const UsersClient = new UserPart(this.$axios)
    await UsersClient.GetAllRoles().then((resp) => {
      console.log('Получаем все роли')
      console.dir(resp)
      commit('ALL_ROLES', resp.roles.$values)
    }).catch((err) => {
      console.log('Ошибка получения пермишенов')
      console.dir(err)
    })
  },
  async DeleteUser({ commit }, userId) {
    const UsersClient = new UserPart(this.$axios)
    await UsersClient.DeleteUser(userId).then((resp) => {
        console.dir(resp)
      }
    ).catch((err) => {
      console.dir(err)
    })
  },
  UpdateUser({ commit }, user) {
    const UsersClient = new UserPart(this.$axios)
    UsersClient.UpdateUser(
      user
    ).then((resp) => {
        console.dir(resp)
      }
    ).catch((err) => {
      console.dir(err)
    })
  },

  async SendCode({ commit }, login) {
    const ProfileClient = new ProfilePart(this.$axios)
    await ProfileClient.SendCode(login)
  },
  async ValidateCode({ commit }, validateModel) {
    const ProfileClient = new ProfilePart(this.$axios)
    await ProfileClient.ValidateCode(validateModel.login, validateModel.authCode)
  },
  async PasswordReset({ commit }, validateModel) {
    const ProfileClient = new ProfilePart(this.$axios)
    await ProfileClient.PasswordReset(validateModel.login,validateModel.password, validateModel.authCode)
  },
  async CreateNewPassword({ commit }, setNewPasswordForm) {
    const ProfileClient = new ProfilePart(this.$axios)
    await ProfileClient.CreateNewPassword(setNewPasswordForm.login, setNewPasswordForm.oldPassword, setNewPasswordForm.newPassword, setNewPasswordForm.confirmCode)
  }
}
export default { state, mutations, getters, actions }
