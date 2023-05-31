/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from '@/api/Methods'

export default class ContragentPart extends BasePart {
  /**
   * Получение контрагента по пользователю
   * @param userId
   * @returns https://test-back.it.scancity.ru/swagger/index.html /contractor/getContractors
   * @constructor
   */
  async GetContragents() {
    return await this.instant.$get(
      '/contractor/getContractors?UserId=' + getCookie('userId')
    )
  }

  /**
   * Получение пинкода по контрагенту
   * @param pinCode Пин код
   * @returns https://test-back.it.scancity.ru/swagger/index.html /contractor/getContractors
   * @constructor
   */
  async GetPinCodeByContragentId() {
    return await this.instant.$get(
      'contractor/getPinCodeByContragentId?KontrAgentId=' + getCookie('contragentId')
      // + '&PinCode=' +
      //   pinCode
    )
  }

  /**
   * Создание дочернего контрагента
   * @param userId
   * @param contractorINN
   * @param contractorName
   * @param contractorType
   * @returns https://test-back.it.scancity.ru/swagger/index.html /contractor/createChildContragent
   * @constructor
   */
  async CreateChildContragent(contractorINN, contractorName, contractorType) {
    return await this.instant.$post(
      '/contractor/createChildContragent',{
        UserId: getCookie('userId'),
        ContractorINN: contractorINN,
        ContractorName: contractorName,
        ContractorType: contractorType,
      }
    )
  }

  /**
   * Получение дочерних контрагентов
   * @param contragentId
   * @param userId
   * @returns https://test-back.it.scancity.ru/swagger/index.html /contractor/createChildContragent
   * @constructor
   */
  async GetChildContragents(contragentId=getCookie('contragentId'), userId=getCookie('userId')) {
    return await this.instant.$get(
      `contractor/getChildContragents?MainContractorId=${contragentId}&UserId=${userId}`)
  }

}
