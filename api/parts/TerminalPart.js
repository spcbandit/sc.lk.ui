/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from '@/api/Methods'

export default class TerminalPart extends BasePart {
  /**
   * Удалить выбранный терминал
   * @param terminalId ID терминала
   * @returns https://test-back.it.scancity.ru/swagger/index.html /terminals/deleteTerminal
   * @constructor
   */
  async DeleteTerminal(terminalId) {
    return await this.instant.delete('/terminals/deleteTerminal', {
      terminalId,
    })
  }

  /**
   * Получить объект терминала по ID
   * @param terminalId ID терминала
   * @returns https://test-back.it.scancity.ru/swagger/index.html /terminals/getTerminalById?TerminalId=
   * @constructor
   */
  async GetTerminalById(terminalId) {
    return await this.instant.$get(
      '/terminals/getTerminalById?TerminalId=' + terminalId
    )
  }

  /**
   * Получить терминалы по ID подразделения
   * @param divisionId Id подразделения
   * @returns https://test-back.it.scancity.ru/swagger/index.html /terminals/getTerminalByDivisionId?DivisionId=
   * @constructor
   */
  async GetTerminalByDivisionId(divisionId) {
    return await this.instant.$get(
      '/terminals/getTerminalByDivisionId?DivisionId=' + divisionId
    )
  }

  /**
   * Получить терминалы по ID контрагента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /terminals/getTerminalByContractorId?ContractorId=
   * @constructor
   */
  async GetTerminalByContractorId() {
    return await this.instant.$get(
      '/terminals/getTerminalByContractorId?ContractorId=' +
        getCookie('contragentId')
    )
  }

   /**
   * Сохранение терминала
   * @param terminalId ID подразделения
   * @param terminalModel Объект с параметрами терминала
   * @returns https://test-back.it.scancity.ru/swagger/index.html /terminals/createTerminal
   * @constructor
   */
  async UpdateTerminal(terminalId, terminalModel) {
    return await this.instant.$put('/terminals/updateTerminal', {
      TerminalId: terminalId,
      terminal: terminalModel,
    })
  }

  /**
   * Назначение терминала в подразделение
   * @param divisionId ID подразделения
   * @param terminalsId Объект с Id терминала
   * @returns https://test-back.it.scancity.ru/swagger/index.html /terminals/createTerminal
   * @constructor
   */
  async AddTerminalsToDivision(divisionId, terminalsId) {
    return await this.instant.$put('/terminals/addTerminalsToDivision', {
      divisionId: divisionId,
      terminalsId: [ terminalsId ],
    })
  }
}
