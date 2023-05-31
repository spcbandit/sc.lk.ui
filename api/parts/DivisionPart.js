/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import {getCookie} from "@/api/Methods";

export default class DivisionPart extends BasePart  {

  /**
   * Скачать инсталлер
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/getInstaller
   * @constructor
   */
  async GetInstaller(divisionId) {
    return await this.instant.$get(
      '/divisions/getInstaller'
    )
  }

  /**
   * Создание подразделения
   * @param name
   * @param address
   * @param contragentId ID контрагента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/createDivision
   * @constructor
   */
  async CreateDivision(name, address) {
    return await this.instant.$post(
      '/divisions/createDivision',
      {
        Name: name,
        Address: address,
        ContractorId: getCookie('contragentId'),
      }
    )
  }

  /**
   * Обновить информацию выбранного подразделения
   * @param divisionId
   * @param name
   * @param address
   * @param isActive
   * @param host
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/updateDivisionById
   * @constructor
   * */
  async UpdateDivisionById(divisionId, name, address, isActive, host) {
    return await this.instant.$put('/divisions/updateDivisionById',
      {
        DivisionId: divisionId,
        Name: name,
        Address: address,
        IsActive: isActive,
        Host: host,
      }
    )
  }

  /**
   * Удалить подразделение
   * @param divisionId
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/deleteDivision
   * @constructor
   * */
  async DeleteDivision(divisionId) {
    return await this.instant.delete('/divisions/deleteDivision',
      {
        data: {
          DivisionId: divisionId,
        },
      }
    )
  }

  /**
   * Получить все подразделения контрагента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/updateDivisionById
   * @constructor
   * */
  async GetAllDivisions() {
    return await this.instant.$get('/divisions/getAllDivisions?ContractorId=' +
      getCookie('contragentId')
    )
  }


  /**
   * Получить объект выбранного подразделения
   * @param divisionId
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/updateDivisionById
   * @constructor
   * */
  async GetDivisionById(divisionId) {
    return await this.instant.$get('/divisions/getDivisionById?DivisionId=' +
      divisionId
    )
  }
}
