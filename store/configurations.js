/* eslint-disable */
import ConfigurationPart from '@/api/parts/ConfigurationPart'
import BusinessProcessPart from '@/api/parts/BusinessProcessPart';
import DivisionPart from '@/api/parts/DivisionPart';
import {DevLogger, getCookie} from "@/api/Methods";
import TerminalPart from "@/api/parts/TerminalPart";
import AgentPart from "@/api/parts/AgentPart";

export const state = () => ({
  // region ConfigurationPart
  configurationsAll: {},
  businessProcessesAll: {},
  configurationsVersionAll: {},
  divisionsTerminalsAll: {},
  configurationById: {},
  // endregion

  // region DivisionsPart
  divisionTerminalsAll: [],
  divisionsAll: [],
  division: [],
  terminalsAll: [],
  // endregion

  // region AgentsPart
  agents: [],
  // endregion
})

export const mutations = {
  CONFIGURATIONS_All(state, resp) {
    state.configurationsAll = resp
  },
  BUSINESS_PROCESSES_ALL(state, resp) {
    state.businessProcessesAll = resp
  },
  CONFIGURATIONS_BY_ID(state, resp) {
    state.configurationById = resp
  },
  CONFIGURATIONS_VERSION_All(state, resp) {
    state.configurationsVersionAll = resp
  },

  DIVISIONS_ALL(state, resp) {
    console.log(resp)
    state.divisionsAll = resp
  },
  DIVISION(state, resp) {
    state.division = resp
  },
  TERMINALS_All(state, resp) {
    console.log(resp)
    state.terminalsAll = resp
  },
  AGENTS_ALL(state, resp) {
    state.agents = resp
  },

}

export const getters = {
  GET_CONFIGURATIONS_All(state) {
    return state.configurationsAll
  },
  GET_BUSINESS_PROCESSES_ALL(state) {
    return state.businessProcessesAll
  },
  GET_CONFIGURATIONS_VERSION_All(state) {
    return state.configurationsVersionAll
  },
  GET_CONFIGURATIONS_BY_ID(state) {
    return state.configurationById
  },
  GET_DIVISIONS_ALL(state) {
    return state.divisionsAll
  },
  GET_DIVISION(state) {
    return state.division
  },
  GET_ALL_TERMINALS(state) {
    return state.terminalsAll
  },
  GET_ALL_AGENTS(state) {
    return state.agents
  },
}

export const actions = {

  // region ConfigurationPart

  async CreateConfigurationRequest({commit}, setting) {
    console.log(setting)
    const ConfigurationsClient = new ConfigurationPart(this.$axios)
    await ConfigurationsClient.CreateConfigurationRequest(
      setting.name,
      setting.description
    ).then((resp) => {
      console.log('Config created', resp)
    }).catch(err => console.dir(err))
  },

  async GetAllConfigurations({ commit }) {
    console.log('Конфиг')
    const ConfigurationsClient = new ConfigurationPart(this.$axios)
    await ConfigurationsClient.GetAllConfiguration().then(
      (resp) => {
        console.log('Все конфиги', resp.dtoResult.$values)
        commit('CONFIGURATIONS_All', resp.dtoResult.$values)
      }
    ).catch()
  },

  async ClearAllConfigurationVersions({commit}){
    commit('CONFIGURATIONS_VERSION_All', {})
  },

  async GetAllConfigurationVersions({ commit }, idVersion) {
    const ConfigurationsClient = new ConfigurationPart(this.$axios)
    await ConfigurationsClient.GetAllConfigurationVersions(idVersion).then(
      (resp) => {
        // console.log(resp)
        commit('CONFIGURATIONS_VERSION_All', resp.configurationVersions.$values)
      }
    ).catch( err => console.dir(err))
  },

  async GetConfigurationById({ commit }, idConfig) {
    const ConfigurationsClient = new ConfigurationPart(this.$axios)
    await ConfigurationsClient.GetConfigurationById(idConfig).then(() => {
      console.log('Конфигурация', resp)
      commit('CONFIGURATIONS_BY_ID', resp)
    }).catch(
      (err) => {console.dir(err)}
    )
  },

  async GetAllBusinessProcess({ commit }) {
    const ConfigurationsClient = new ConfigurationPart(this.$axios)
    await ConfigurationsClient.GetAllBusinessProcess().then(
      (resp) => {
        console.log('БП')
        console.dir(resp)
        commit('BUSINESS_PROCESSES_ALL', resp.businessProceses.$values)
      }
    ).catch()
  },

  // endregion

  // region BusinessPart

  async CreateBusinessProcess({ commit }, nameBusinessProcess) {
    DevLogger(nameBusinessProcess, 'Создаем БП с названием: ')
    const BusinessProcessClient = new ConfigurationPart(this.$axios)
    await BusinessProcessClient.CreateBusinessProcess(nameBusinessProcess).then((resp) => {
      DevLogger(resp, 'БП создан', true)
    }).catch((err) => {
      DevLogger(err, 'Ошибка при создани БП', true)
    })
  },

  // endregion

  // region DivisionsPart

  async GetInstaller(){
    const DivisionClient = new DivisionPart(this.$axios)
    await DivisionClient.GetInstaller()
      .then((resp) => {
        console.log('Получили ссылку на инсталлятор')
        console.dir(resp)
      })
      .catch((err) => {
        console.log('Ошибка при получении ссылки на инсталлятор')
        console.dir(err)
      })
  },

  async CreateDivision({commit}, divisionModel) {
    const DivisionClient = new DivisionPart(this.$axios)
    await DivisionClient.CreateDivision(divisionModel.name, divisionModel.address)
      .then((resp) => {
        DevLogger(resp, 'Create division success', true)
      })
      .catch((err) => {
        DevLogger(err, 'Create division error', true)
      })
  },

  async UpdateDivisionById({ commit }, divisionModel) {
    const DivisionClient = new DivisionPart(this.$axios)
    await DivisionClient.UpdateDivisionById(
      divisionModel.id,
      divisionModel.name,
      divisionModel.address,
      divisionModel.isActive,
    )
      .then(
        () => {
          DevLogger('DivisionUpdated')
        })
      .catch((err) => {
        DevLogger(err, 'DivisionUpdatedError', true)
      })
  },

  async DeleteDivision({ commit }, divisionId) {
    const DivisionClient = new DivisionPart(this.$axios)
    await DivisionClient.DeleteDivision(divisionId)
      .then(() => {
        DevLogger('Division deleted')
      })
      .catch((err) => {
        DevLogger(err, 'DivisionDeleteError', true)
      })
  },

  async GetAllDivisions({ commit }) {
    DevLogger('Получаем все подразделения')
    const DivisionClient = new DivisionPart(this.$axios)
    await DivisionClient.GetAllDivisions().then(
      (resp) => {
        DevLogger(resp, 'Получили подразделения', true)
        commit('DIVISIONS_ALL', resp.divisions.$values)
      }
    ).catch()
  },

  async GetDivisionById({ commit }, divisionId) {
    const DivisionClient = new DivisionPart(this.$axios)
    await DivisionClient.GetDivisionById(divisionId)
      .then(
        (resp) => {
          commit('DIVISION', resp.division)
        }
      )
      .catch((err) => {
        DevLogger(err, 'GetDivisionByIdError', true)
      })
  },

  // endregion

  // region TerminalPart

  async DeleteTerminal({ commit }, terminalId) {
    const TerminalClient = new TerminalPart(this.$axios)
    await TerminalClient.DeleteTerminal(terminalId)
      .then(()=> {
        DevLogger('Terminal deleted')
      })
      .catch(err => console.dir(err))
  },

  async GetTerminalById({ commit }, terminalId) {
    const TerminalClient = new TerminalPart(this.$axios)
    await TerminalClient.GetTerminalById(terminalId)
      .then((resp) => {
        DevLogger(resp, 'GetTerminalById', true)
      })
      .catch((err) => { DevLogger(err, 'GetTerminalByIdError', true) })
  },

  async GetTerminalsByDivisionId({ commit }, divisionId) {
    const TerminalClient = new TerminalPart(this.$axios)
    await TerminalClient.GetTerminalByDivisionId(divisionId)
      .then((resp) => {
        DevLogger(resp, 'GetTerminalsByDivisionId', true)
        commit('TERMINALS_All', resp.terminals.terminals.$values)
      })
      .catch((err) => { DevLogger(err, 'GetTerminalsByDivisionIdError', true) })
  },

  async GetTerminalsByContragentId({ commit }) {
    const TerminalClient = new TerminalPart(this.$axios)
    await TerminalClient.GetTerminalByContractorId()
      .then((resp) => {
        commit('TERMINALS_All', resp.terminals.terminals.$values)
        DevLogger(resp.terminals.terminals.$values, 'GetTerminalsByContragentId', true)
      })
      .catch((err) => { DevLogger(err, 'GetTerminalsByContragentIdError', true) })
  },

  async UpdateTerminal({ commit }, terminalModel) {
    const updatedTerminal = {
      terminalId: terminalModel.terminalId,
      terminalModel: terminalModel,
    }
    console.log(updatedTerminal)
    const TerminalClient = new TerminalPart(this.$axios)
    await TerminalClient.UpdateTerminal(
      updatedTerminal.terminalId,
      updatedTerminal.terminalModel,
    )
      .then((resp) => DevLogger('Terminal saved'))
      .catch((err) => DevLogger(err, 'UpdateTerminal Error', true) )
  },

  async AddTerminalsToDivision({commit}, addingTerminalsModel) {
    const TerminalClient = new TerminalPart(this.$axios)
    await TerminalClient.AddTerminalsToDivision(
      addingTerminalsModel.divisionId,
      addingTerminalsModel.terminalsId
    )
      .then()
      .catch()
  },

  // endregion

  // region AgentPart
  async GetAgentsByContragentId({commit}) {
    const AgentsClient = new AgentPart(this.$axios)
    await AgentsClient.GetAgentsByContragentId()
      .then((resp) => {
        DevLogger(resp.agents, 'GetAgentsByContragentId', true)
        commit('AGENTS_ALL', resp.agents.agents.$values)
      })
      .catch((err) => {
        DevLogger(err, 'GetAgentsByContragentId Error', true)
      })
  },

  async GetAgentsByDivisionId({commit}, divisionId) {
    const AgentsClient = new AgentPart(this.$axios)
    await AgentsClient.GetAgentsByDivisionId(divisionId)
      .then((resp) => {
          DevLogger(resp.agents, 'GetAgentsByDivisionId', true)
          commit('AGENTS_ALL', resp.agents.agents.$values)
        })
      .catch((err) => {
        DevLogger(err, 'GetAgentsByDivisionId Error', true)
      })
  },

  async SetAgentInDivisionId({commit}, addingAgentsModel) {
    const AgentsClient = new AgentPart(this.$axios)
    await AgentsClient.SetAgentInDivisionId(
      addingAgentsModel.divisionId,
      addingAgentsModel.agentsId
    )
      .then()
      .catch()
  },

  async UpdateAgent({ commit }, agentModel) {
    const updatedAgent = {
      idAgent: agentModel.terminalId,
      agentModel: agentModel,
    }
    console.log(updatedAgent)
    const AgentClient = new AgentPart(this.$axios)
    await AgentClient.UpdateAgent(
      updatedAgent.idAgent,
      updatedAgent.agentModel,
    )
      .then((resp) => console.log('Terminal saved'))
      .catch((err) => console.dir(err))
  },

  // endregion
}

export default { state, mutations, getters, actions }
