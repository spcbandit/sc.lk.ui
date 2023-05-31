/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from "@/api/Methods";

export default class ConfigurationPart extends BasePart {

  /**
   * Создание конфигурации по контрагенту
   * @param name Название конфигурации
   * @param description Описание конфигурации
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurations/createConfiguration
   * @constructor
   */
  async CreateConfigurationRequest(name, description) {
    return await this.instant.$post('/configurations/createConfiguration', {
      ContractorId: getCookie('contragentId'),
      Name: name,
      Description: description
    })
  }

  /**
   * Получить конфигурацию по ID версии
   * @param configurationVersionId ID Версии конфигурации
   * @param contragentId ID контрагента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurations/getConfigurationById
   * @constructor
   */
  async GetConfigurationById(configurationVersionId) {
    return await this.instant.$get(
      '/configurations/getConfigurationById?ContractorId=' +
        getCookie('contragentId') +
        '&ConfigurationVersionId=' +
        configurationVersionId
    )
  }

  /**
   * Получить все конфигурации по ID
   * @param contragentId ID контрагента
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurations/getAllConfigurations
   * @constructor
   */
  async GetAllConfiguration() {
    return await this.instant.$get(
      '/configurations/getAllConfigurations?ContractorId=' +
        getCookie('contragentId')
    )
  }

  /**
   * Получить список всех версий одной конфигурации
   * @param configurationId ID конфигурации
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurations/getAllConfigurationVersion
   * @constructor
   */
  async GetAllConfigurationVersions(configurationId) {
    return await this.instant.$get(
      '/configurationVersion/getAllConfigurationsVersion?ConfigurationId=' +
        configurationId
    )
  }

  /**
   * Получить все пары Подразделение - терминал
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurations/getAllDivisionsTerminals
   * @constructor
   */
  async GetAllDivisionsTerminals() {
    return await this.instant.$get(
      '/configurations/getAllDivisionsTerminals?ContractorId=' +
      getCookie('contragentId')
    )
  }

  /**
   * Создание бизнесс процесса
   * @param nameBusinessProcess Название бизнесс процесса
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurations/createBusinessProcess
   * @constructor
   */
  async CreateBusinessProcess(nameBusinessProcess) {
    return await this.instant.$post('/businessProcessConfigurator/createBusinessProcess', {
      ContractorId: getCookie('contragentId'),
      NameBusinessProcess: nameBusinessProcess,
    })
  }

  /**
   * Получить список всех бизнесс процессов
   * @returns https://test-back.it.scancity.ru/swagger/index.html /configurations/getAllBusinessProcess
   * @constructor
   */
  async GetAllBusinessProcess() {
    return await this.instant.$get(
      '/businessProcessConfigurator/getAllBusinessProcess?ContractorId=' +
        getCookie('contragentId')
    )
  }
}
