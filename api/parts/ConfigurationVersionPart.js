/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from "@/api/Methods";


export default class ConfigurationVersionPart extends BasePart {

  /**
   * Создание новой версии конфигурации
   * @param configurationId ID конфигурации
   * @param isActive :boolean Активность версии конфигурации
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurationVersion/createConfigurationVersion
   * @constructor
   */
  async CreateConfigurationVersion(
    configurationId,
    isActive = false
  ) {
    return await this.instant.$post('/configurationVersion/createConfigurationVersion', {
      configurationId: configurationId,
      isActive: isActive,
      businessProceses: [], // При создании новой конфигурации передается пустым
    })
  }

  /**
   * Сохранение конфигурации как новой
   * @param configurationId ID конфигурации
   * @param isActive :boolean Активность версии конфигурации
   * @param businessProceses :array Массив бизнес процессов вида
   * {
   *   "businessProcessId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
   *   "businessProcessNumber": 0
   * }
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurationVersion/createConfigurationVersion
   * @constructor
   */

  async SaveAsConfigurationVersionAsNew(
    configurationId,
    isActive = false,
    businessProceses
  ) {
    return await this.instant.$post('/configurationVersion/createConfigurationVersion', {
      configurationId: configurationId,
      isActive: isActive,
      businessProceses: businessProceses, // При создании новой конфигурации передается пустым
    })
  }

  /**
   * Обновление версии конфигурации
   * @param configurationId ID конфигурации
   * @param configurationVersionId ID конфигурации
   * @param isActive :boolean Активность версии конфигурации
   * @param businessProceses Массив бизнес процессов
   *        {
   *          businessProcessId       --- GUID
   *          businessProcessNumber   --- Индекс, порядковый номер при выгрузке
   *        }
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurationVersion/updateConfigurationVersion
   * @constructor
   */
  async UpdateConfigurationVersion(
    configurationId,
    configurationVersionId,
    businessProceses,
    isActive=false
  ) {
    return await this.instant.$put('/configurationVersion/updateConfigurationVersion', {
      configurationId: configurationId,
      configurationVersionId: configurationVersionId,
      isActive: isActive,
      businessProceses: businessProceses,
    })
  }

  /**
   * Активация версии конфигурации
   * @param configurationVersionId ID версии
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurationVersion/activateConfigurationVersion
   * @constructor
   */
  async ActivateConfigurationVersion(configurationVersionId) {
    return await this.instant.$put('/configurationVersion/activateConfigurationVersion', {
      configurationVersionId: configurationVersionId,
    })
  }

  /**
   * Получение версии по ID
   * @param versionId ID версии
   * @returns https://test-back.it.scancity.ru/swagger/index.html configurationVersion/getConfigurationVersion?ConfigurationVersionId=
   * @constructor
   */
  async GetConfigurationVersion(versionId) {
    return await this.instant.$get('/configurationVersion/getConfigurationVersion?ConfigurationVersionId='
      + versionId
    )
  }


  /**
   * Удаление версии по ID
   * @param versionId ID версии
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurationVersion/deleteConfigurationVersionByVersionId
   * @constructor
   */
  async DeleteConfigurationVersionByVersionId(versionId) {
    return await this.instant.delete('/configurationVersion/deleteConfigurationVersionByVersionId',
      {
        data: {
          сonfigurationVersionId: versionId
        }
      }
    )
  }

}
