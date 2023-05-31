/* eslint-disable */
import ConfigurationPart from '@/api/parts/ConfigurationPart'
import BusinessProcessPart from '@/api/parts/BusinessProcessPart';
import DivisionPart from '@/api/parts/DivisionPart';
import {DevLogger, getCookie} from "@/api/Methods";
import ConfigurationVersionPart from "@/api/parts/ConfigurationVersionPart";

export const state = () => ({
  versionById: {},
})

export const mutations = {
  VERSION_BY_ID(state, resp) {
    state.versionById = resp
  }
}

export const getters = {
  GET_VERSION_BY_ID(state) {
    return state.versionById
  }
}

export const actions = {
  async GetConfigurationVersion({commit}, versionId) {
    const ConfigurationVersionClient = new ConfigurationVersionPart(this.$axios)
    await ConfigurationVersionClient.GetConfigurationVersion(versionId).then((resp) => {
        DevLogger(resp, '', true)
        commit('VERSION_BY_ID', resp.configurationVersionViewDto)
      }).catch((err) => {
        console.dir(err)
      }
    )
  },
  async ActivateConfigurationVersion({commit}, configurationVersionId) {
    const ConfigurationVersionClient = new ConfigurationVersionPart(this.$axios)
    await ConfigurationVersionClient.ActivateConfigurationVersion(configurationVersionId).then((resp) => {
        console.dir(resp)
      }
    ).catch()
  },
  async UpdateConfigurationVersion({commit}, version) {
    const ConfigurationVersionClient = new ConfigurationVersionPart(this.$axios)
    await ConfigurationVersionClient.UpdateConfigurationVersion(
      version.configurationId,
      version.configurationVersionId,
      version.businessProceses,
      version.isActive,
    ).then((resp) => { console.dir(resp)}).catch()
  },
  async CreateConfigurationVersion({commit}, configurationId, isActive) {
    const ConfigurationVersionClient = new ConfigurationVersionPart(this.$axios)
    await ConfigurationVersionClient.CreateConfigurationVersion(configurationId, isActive)
      .then((resp) => {
        console.dir(resp)
      })
      .catch((err) => {
        console.dir(err)
      })
  },
  async SaveAsConfigurationVersionAsNew({commit}, version) {
    const ConfigurationVersionClient = new ConfigurationVersionPart(this.$axios)
    await ConfigurationVersionClient.SaveAsConfigurationVersionAsNew(version.configurationId, version.isActive, version.businessProceses)
      .then((resp) => {
        console.dir(resp)
      })
      .catch((err) => {
        console.dir(err)
      })
  },
  async ClearVersionById({commit}) {
    commit('VERSION_BY_ID', {})
  },
  async DeleteConfigurationVersionByVersionId({commit}, versionId) {
    const ConfigurationVersionClient = new ConfigurationVersionPart(this.$axios)
    await ConfigurationVersionClient.DeleteConfigurationVersionByVersionId(versionId)
      .then((resp) => {
        console.log('Версия удалена')
        console.dir(resp)
      })
      .catch((err) => {
        console.log('При удалении произошла ошибка')
        console.dir(err)
      })
  }
}

export default { state, mutations, getters, actions }
