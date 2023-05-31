/* eslint-disable */
import BusinessProcessPart from "@/api/parts/BusinessProcessPart";
import {referenceFormStyle} from "@/common/constants";
import cons from "@/pages/cons";
import {DevLogger} from "@/api/Methods";

export const state = () => ({
  businessProcess: {},
  processes: {
    style: {},
    forms: {
      methods: {},
    },
    info: {},
  },
})

export const mutations = {
  SET_BUSINESS_PROCESS(state, businessProcess) {
    state.businessProcess = businessProcess
  },
  SET_PROCESSES(state, process) {
    DevLogger(process)
    state.processes = {
      info: {
        active: 'true',
        id: 0,
        globalID: 1,
        start_form: 'form_0',
        url: '',
        authorization: '',
        name: state.businessProcess.businessProcessName,
        ...process.info
      },
      style: {
        ...referenceFormStyle,
        ...process.style
      }
    }
    if (Object.keys(process.forms).length) {
      DevLogger(process.forms)
      state.processes.forms = {
        ...process.forms
      }
    }
    else {
      state.processes.forms = {
        form_0: {
          id: 0,
          name: '',
          annotation: '',
          data: '',
          type: 'object',
          object_type: '',
          events: {
            operation: '',
            type: 'form_events',
            loaded: '',
            resume: '',
            closed: '',
            scan: '',
            id: 0, x: 20, y: 20, w: 250, h: 60,
            expanded: true,
          },
          elements: [],
          methods: {
            form_events: {
              operation: '',
              type: 'form_events',
              loaded: '',
              resume: '',
              closed: '',
              scan: '',
              id: 0, x: 20, y: 20, w: 250, h: 60,
              expanded: true,
            }
          },
        }
      }
    }
  },

  INCREMENT_ID(state) {
    state.processes.info.globalID++
  },

  UPDATE_PROCESSES(state, form) {
    DevLogger(form)
    state.processes.forms[form[1]].elements = form[0]
  },

  SET_STYLES(state, styles) {
    state.processes.style = styles
  },

  ADD_FORM(state, event) {},

  SET_INFO(state, info) {
    state.processes.info = info
  },

  ADD_METHOD(state, event) {},

  DELETE_METHOD(state, event) {},

}

export const getters = {
  BUSINESS_PROCESS(state) {
    return state.businessProcess
  },
  PROCESSES(state) {
    return state.processes
  },
}

export const actions = {
  async GetBusinessProcessById({ commit }, bpId) {
    const BusinessProcessClient = new BusinessProcessPart(this.$axios)
    await BusinessProcessClient.GetBusinessProcessById(bpId).then(
      (resp) => {
        DevLogger(resp.businessProcess, 'Получили БП', true)
        commit('SET_BUSINESS_PROCESS', resp.businessProcess)
        commit('SET_PROCESSES', JSON.parse(resp.businessProcess.jsonBody))

      }
    ).catch()
  },

  async SaveBusinessProcessById({commit}, process) {
    const BusinessProcessClient = new BusinessProcessPart(this.$axios)
    await BusinessProcessClient.SaveBusinessProcessById(
      process.id,
      process.jsonConfig
    ).then((resp)=> {
      DevLogger(resp, 'УСПЕХ', true)
    })
  },

  async SaveBusinessProcessByIdPost({commit}, process) {
    const BusinessProcessClient = new BusinessProcessPart(this.$axios)
    await BusinessProcessClient.SaveBusinessProcessByIdPost(
      process.id,
      process.jsonConfig
    ).then((resp)=> {
      DevLogger(resp, 'УСПЕХ', true)
    })
  },

  async SaveBusinessProcessByIdGet({commit}, process) {
    const BusinessProcessClient = new BusinessProcessPart(this.$axios)
    await BusinessProcessClient.SaveBusinessProcessByIdGet(
      process.id,
      process.jsonConfig
    ).then((resp)=> {
      DevLogger(resp, 'УСПЕХ', true)
    })
  },

  async DeleteBusinessProcess({commit}, idBusinessProcess) {
    const BusinessProcessClient = new BusinessProcessPart(this.$axios)
    await BusinessProcessClient.DeleteBusinessProcess(idBusinessProcess).then((resp)=> {
      DevLogger(resp, 'Бизнес-процесс удален', true)
    })
  },

  async CopyBusinessProcess({commit}, idBusinessProcess) {
    const BusinessProcessClient = new BusinessProcessPart(this.$axios)
    await BusinessProcessClient.CopyBusinessProcess(idBusinessProcess).then((resp)=> {
      DevLogger(resp, 'Бизнес-процесс скопирован', true)
    })
  },
  async SaveForm({ commit }, processes) {
    commit('SET_PROCESSES', processes)
  },
  async IncrementBusinessProcessGlobalId({ commit }) {
    commit('INCREMENT_ID')
  },
  UpdatePROСESSES({ commit }, form) {
    DevLogger(form)
    commit('UPDATE_PROCESSES', form)
  },
  UpdateStore({ commit }, process) {
    commit('SET_PROCESSES', process)
  },
}

export default { state, mutations, getters, actions }
