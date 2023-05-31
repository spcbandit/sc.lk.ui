import Vue from 'vue'
import Vuex from 'vuex'
import cookieParser from 'cookieparser'
import configurations from './configurations'
import users from './users'
import businessProcessConstructor from './businessProcessConstructor'
import configurationVersions from './configurationVersions'
import {
  deleteCookie,
  getCookie,
  InitContragent,
  setCookie,
} from '@/api/Methods'
import ContractorPart from '@/api/parts/ContractorPart'
import ProfilePart from '@/api/parts/ProfilePart'
import TicketPart from '@/api/parts/TicketPart'
import AdminPart from '@/api/parts/AdminPart'
const cookieClient = process.server ? cookieParser : undefined

let store
Vue.use(Vuex)

const createStore = () => {
  return (
    store ||
    (store = new Vuex.Store({
      namespaced: true,
      modules: {
        configurations,
        configurationVersions,
        users,
        businessProcessConstructor,
      },
      state: () => ({
        authorizationState: {
          auth: false,
          userId: null,
        },
        userAccount: {},
        userRole: {},
        contragents: [],
        childContragents: [],
        selectedContragent: [],
        PIN: '',
        DATASET: [],
        TICKETS: [],
      }),
      mutations: {
        LOGIN(state, userId) {
          state.authorizationState.auth = true
          state.authorizationState.userId = userId
        },
        LOGOUT(state) {
          state.userAccount = {}
          state.userRole = {}
          state.contragents = {}
          state.selectedContragent = {}
          state.authorizationState.userId = null
          state.authorizationState.auth = null
        },
        UPDATE_USER(state, user) {
          state.userAccount = { ...state.userAccount, ...user }
        },
        SET_CONTRAGENTS(state, contragents) {
          state.contragents = contragents
        },
        SET_CHILD_CONTRAGENTS(state, contragents) {
          state.childContragents = contragents
        },
        SET_USER_ROLE(state, userRole) {
          state.userRole = userRole
        },
        SET_USER_TYPE(state, userRole) {
          state.userRole.Type = userRole.type
        },
        SET_USER_PERMISSION(state, accessType) {
          state.userRole.AccessType = accessType
        },
        SELECT_CONTRAGENT(state, contragent) {
          state.selectedContragent = contragent
        },
        SET_PIN(state, pin) {
          state.PIN = pin
        },
        SET_SELECTED_INPUT_DATASET(state, source) {
          state.DATASET = source
        },
        SET_TICKETS(state, source) {
          state.TICKETS = source
        },
      },
      getters: {
        USER_INIT(state) {
          return state.authorizationState.userId
        },
        USER_ACCOUNT(state) {
          return state.userAccount
        },
        USER_ROLE(state) {
          return state.userRole
        },
        CONTRAGENTS(state) {
          return state.contragents
        },
        CHILD_CONTRAGENTS(state) {
          return state.childContragents
        },
        SELECTED_CONTRAGENT(state) {
          return state.selectedContragent
        },
        DATASET(state) {
          return state.DATASET
        },
        TICKETS(state) {
          return state.TICKETS
        },
      },
      actions: {
        /** Инициализация через user */
        /* nuxtServerInit({ commit }, { req }) {
          let user = {}
          // console.log(req.headers.cookie)
          if (req.headers.cookie) {
            try {
              const parsedCookie = cookieClient.parse(req.headers.cookie)
              if (parsedCookie) {
                try {
                  user = JSON.parse(parsedCookie.user)
                } catch {
                  console.log('user & token false')
                }
              }
            } catch (err) {
              console.log('Ошибка nuxtServerInit')
              console.dir(err)
            }
          } else {
            console.log('Куков нету')
          }
          // console.log(user)
          commit('UPDATE_USER', user)
        }, */
        /** Инициализация через token */
        nuxtServerInit(ctx, { req }) {
          let token = {}
          let userId = {}
          if (req.headers.cookie) {
            try {
              const parsedCookie = cookieClient.parse(req.headers.cookie)
              if (parsedCookie) {
                // console.log(parsedCookie)
                try {
                  token = parsedCookie.token
                  userId = parsedCookie.userId
                  if (token?.length && userId?.length) {
                    console.log('Authorization success')
                    ctx.commit('LOGIN', userId)
                  } else {
                    // console.log('Cookies read error')
                    ctx.commit('LOGOUT')
                  }
                } catch (err) {
                  // console.log('Cookies read error')
                  console.dir(err)
                  ctx.commit('LOGOUT')
                }
              }
            } catch (err) {
              console.log('nuxtServerInit Error')
              console.dir(err)
            }
          } else {
            console.log('Cookies is null')
            ctx.commit('LOGOUT')
          }
        },

        /** Auth part */
        async Login({ commit }, user) {
          const AuthClient = new ProfilePart(this.$axios)
          await AuthClient.Login(user.login, user.password).then((resp) => {
            console.dir(resp)
            setCookie('token', resp.token)
            setCookie('userId', resp.userId, '1d')
            commit('LOGIN', resp.userId)
          })
        },
        async Logout({ commit }) {
          await deleteCookie('userId', 'token', 'contragentId')
          await commit('LOGOUT')
          await this.$router.push('/login')
        },
        async GetUserInfo({ commit }) {
          const UserClient = new ProfilePart(this.$axios)
          await UserClient.GetUserInfo()
            .then((resp) => {
              // console.log('User', resp.userInfo)
              commit('UPDATE_USER', resp.userInfo)
            })
            .catch((err) => console.dir(err))
          // await UserClient.GetUserInfo()
          //   .then((resp) => {
          //     console.log('User', resp.userInfo)
          //     commit('UPDATE_USER', resp.userInfo)
          //   })
          //   .catch((err) => console.dir(err))
        },
        async ChangeData({ commit }, user) {
          const UserClient = new ProfilePart(this.$axios)
          await UserClient.ChangeData(
            user.name,
            user.parent,
            user.family,
            user.login
          ).then((resp) => {
            commit('UPDATE_USER', resp.userEntity)
          })
        },
        async InitUserRole({ commit }) {
          const token = getCookie('token')
          console.log(token)
          const base64Payload = token.split('.')[1]
          const payloadBuffer = Buffer.from(base64Payload, 'base64')
          const decodeToken = JSON.parse(payloadBuffer.toString())
          const role = JSON.parse(
            decodeToken[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ]
          )
          await commit('SET_USER_ROLE', role)
          // console.log(role)
        },

        /** Contactor part */
        async GetContragents({ commit }) {
          const ContragentClient = new ContractorPart(this.$axios)
          await ContragentClient.GetContragents()
            .then(async (resp) => {
              console.log('Contragents')
              console.dir(resp)
              const mainContragent = resp.contractors.$values[0]
              console.log('mainContragent')
              console.dir(mainContragent)
              commit('SET_CONTRAGENTS', mainContragent)
              console.log('Получаем дочерних контрагентов')
              await ContragentClient.GetChildContragents(mainContragent.id)
                .then((resp) => {
                  const childContragent = resp.contractors.$values
                  const allContragents = [mainContragent, ...childContragent]
                  console.log('allContragents')
                  console.dir(allContragents)
                  commit('SET_CHILD_CONTRAGENTS', resp.contractors.$values)
                  commit('SELECT_CONTRAGENT', InitContragent(allContragents))
                })
                .catch((e) => {
                  console.log(e)
                })
            })
            .catch((err) => console.dir(err))
        },
        /* async InitContragent({ commit, state }) {
          try {
            const ContragentFromCookie = getCookie('contragentId')
            if (ContragentFromCookie?.length) {
              const selectedContragent = state.contragents.find(
                (el) => (el.id = ContragentFromCookie)
              )
              console.log('Find contragent from cookie', selectedContragent.id)
              commit('SELECT_CONTRAGENT', selectedContragent)
            } else {
              console.log(
                'Find main contragent',
                state.contragents.find((el) => (el.id = !el.isMain))
              )
              const MainUserContragent = state.contragents.find(
                (el) => !el.isMain
              )
              await setCookie('contragentId', MainUserContragent.id)
              commit('SELECT_CONTRAGENT', MainUserContragent)
            }
          } catch (err) {
            console.log(err)
          }
        }, */
        async SelectContragent({ commit }, contragent) {
          // console.log('Выбираем контрагента')
          // console.log(contragent.id)
          await setCookie('contragentId', contragent.id)
          commit('SELECT_CONTRAGENT', contragent)
        },

        async GetPinCodeByContragentId({ commit }) {
          const ContragentClient = new ContractorPart(this.$axios)
          await ContragentClient.GetPinCodeByContragentId().then((resp) => {
            // console.log(resp.pinCode)
            commit('SET_PIN', resp.pinCode)
          })
        },

        SetSelectedFormData({ commit }, source) {
          console.log(source)
          commit('SET_SELECTED_INPUT_DATASET', source)
        },

        async CreateChildContragent({ commit }, contragentModel) {
          console.log('СОЗДАЕМ КОНТРАГЕНТА')
          console.dir(contragentModel)
          const ContragentClient = new ContractorPart(this.$axios)
          await ContragentClient.CreateChildContragent(
            contragentModel.contragentINN,
            contragentModel.contragentName,
            contragentModel.contragentType
          ).then((resp) => {
            console.log(resp)
          })
        },

        async GetChildContragents({ commit }) {
          const ContragentClient = new ContractorPart(this.$axios)
          await ContragentClient.GetChildContragents()
            .then((resp) => {
              console.log(resp.contractors.$values)
              commit('SET_CHILD_CONTRAGENTS', resp.contractors.$values)
            })
            .catch((e) => {
              console.log(e)
            })
        },

        async CreateTicket({ commit }, message) {
          const TicketClient = new TicketPart(this.$axios)
          await TicketClient.CreateTicket(1, 0, message)
        },
        async CreatePartnerTicket({ commit }, ticketModel) {
          const TicketClient = new TicketPart(this.$axios)
          await TicketClient.CreateTicket(0, 0, 'Заявка партнера')
        },
        async GetAllTickets({ commit }) {
          const TicketClient = new TicketPart(this.$axios)
          await TicketClient.GetAllTickets()
            .then((resp) => {
              console.log('тикиты')
              console.dir(resp)
              commit('SET_TICKETS', resp.tickets.$values)
            })
            .catch((e) => {
              console.dir(e)
            })
        },
        async SetStatusPartner({ commit }, contragentId) {
          const AdminClient = new AdminPart(this.$axios)
          await AdminClient.SwitchStatusPartner(contragentId)
            .then((resp) => {
              console.log(resp)
            })
            .catch((e) => {
              console.log(e)
            })
        },
        async DeleteStatusPartner({ commit }, contragentId) {
          const AdminClient = new AdminPart(this.$axios)
          await AdminClient.SwitchStatusPartner(contragentId, false)
        },
      },
    }))
  )
}

export default createStore
