/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import {getCookie} from "@/api/Methods";

export default class BusinessProcessPart extends BasePart {

  /**
   * Получение бизнес процесса по ID
   * @param businessProcessId ID бизнесс процесса
   * @param contragentId ID контрагента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /businessProcessConfigurator/getBusinessProcessById
   * @constructor
   */
  async GetBusinessProcessById(businessProcessId) {
    return await this.instant.$get(
      '/businessProcessConfigurator/getBusinessProcessById?ContractorId=' +
        getCookie('contragentId') +
        '&BusinessProcessId=' +
        businessProcessId
    )
  }

  /**
   * Сохранение конфига бизнесс процесса
   * @param businessProcessId ID бизнесс процесса
   * @param jsonConfig Собранная конфигурация JSON
   * @returns https://test-back.it.scancity.ru/swagger/index.html /businessProcessConfigurator/saveBusinessProcessById
   * @constructor
   */
  async SaveBusinessProcessById(businessProcessId, jsonConfig) {
    return await this.instant.$put(
      '/businessProcessConfigurator/saveBusinessProcessById',
      {
        businessProcessId: businessProcessId,
        jsonConfiguration: jsonConfig,
      },
      {
        headers: {
          'Authorization': 'Bearer ' + getCookie('token'),
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }
    )
  }


  SaveBusinessProcessByIdPost(businessProcessId, jsonConfig) {
    const form = new FormData()
    form.set('businessProcessId', businessProcessId)
    form.set('jsonConfiguration', jsonConfig)
    console.dir(form.keys())
    return this.instant.$post(
      '/businessProcessConfigurator/saveBusinessProcessByIdPost',
      // {
      //   data: form,
      //
      //   headers: {
      //     // Vary: 'Origin',
      //     Accept: `*`,
      //     // ContentType: `multipart/form-data; boundary=${form.boundary}`,
      //     ContentType: `multipart/form-data;`,
      //     Authorization: 'Bearer ' + getCookie('token'),
      //     // AccessControlAllowOrigin: '*',
      //     // AccessControlAllowHeaders: 'X-Requested-With',
      //     // AccessControlAllowMethods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //
      //     // 'accept': 'application/json'
      //   },
      //   withCredentials: false,
      //   crossdomain: true,
      //   mode: 'no-cors',
      //   AllowAllOrigins: true,
      // },
      form,
      {
          headers: {
            // Vary: 'Origin',
            Accept: `*`,
            // ContentType: `multipart/form-data; boundary=${form.boundary}`,
            ContentType: `multipart/form-data;`,
            Authorization: 'Bearer ' + getCookie('token'),
            // AccessControlAllowOrigin: '*',
            // AccessControlAllowHeaders: 'X-Requested-With',
            // AccessControlAllowMethods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

            // 'accept': 'application/json'
          },
          withCredentials: false,
          crossdomain: true,
          mode: 'no-cors',
          AllowAllOrigins: true,
      }
    )
  }

  async SaveBusinessProcessByIdGet(businessProcessId, jsonConfig) {
    return await this.instant.$post(
      `/businessProcessConfigurator/saveBusinessProcessByIdGet?BusinessProcessId=${businessProcessId}&JsonConfiguration=${ jsonConfig }`
    )
  }

  /**
   * Удалить бизнес-процесс
   * @param idBusinessProcess
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/deleteDivision
   * @constructor
   * */
  async DeleteBusinessProcess(idBusinessProcess) {
    return await this.instant.delete('/businessProcessConfigurator/deleteBusinessProcess',
      {
        data: {
          idBusinessProcess: idBusinessProcess,
        },
      }
    )
  }

  /**
   * Скопировать бизнес-процесс
   * @param idBusinessProcess
   * @returns https://test-back.it.scancity.ru/swagger/index.html /divisions/deleteDivision
   * @constructor
   * */
  CopyBusinessProcess(idBusinessProcess) {
    return this.instant.$post(
      '/businessProcessConfigurator/copyBusinessProcess', {
        idBusinessProcess: idBusinessProcess
      }
    )
  }

}
