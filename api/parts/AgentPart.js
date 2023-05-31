/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from '@/api/Methods'

export default class AgentPart extends BasePart {
  /**
   * Получить список агентов по ID контрагента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /agents/getAgentsByContragentId?ContragentId=
   * @constructor
   */
  async GetAgentsByContragentId() {
    return await this.instant.$get(
      '/agents/getAgentsByContragentId?ContragentId=' + getCookie('contragentId')
    )
  }

  /**
   * Получить список агентов по ID подразделения
   * @returns https://test-back.it.scancity.ru/swagger/index.html /agents/getAgentsByDivisionId?DivisionId=
   * @constructor
   */
  async GetAgentsByDivisionId(divisionId) {
    return await this.instant.$get(
      '/agents/getAgentsByDivisionId?DivisionId=' + divisionId
    )
  }

  /**
   * Добавить агента в подразделение
   * @param divisionId Id подразделения
   * @param agentsId Id агента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /agents/setAgentsInDivision
   * @constructor
   */
  async SetAgentInDivisionId(divisionId, agentId) {
    return await this.instant.$put(
      '/agents/setAgentsInDivision', {
        DivisionId: divisionId,
        AgentsId: [ agentId ]
      }
    )
  }

  /**
   * Добавить агента в подразделение
   * @param agentId Id агента
   * @param agentModel Объект агента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /agents/setAgentsInDivision
   * @constructor
   */
  async updateAgent(agentId, agentModel) {
    return await this.instant.$put(
      '/agents/updateAgent', {
        agentId: agentId,
        agent: agentModel
      }
    )
  }
}
