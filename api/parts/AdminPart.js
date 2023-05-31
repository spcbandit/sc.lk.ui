/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from '@/api/Methods'

export default class AdminPart extends BasePart {

  /**
   * Изменить статус партнера
   * @param contractorId Id контрагента
   * @param statusPartner boolean
   * @returns https://test-back.it.scancity.ru/swagger/index.html /admin/switchStatusPartner
   * @constructor
   */
  async SwitchStatusPartner(contractorId, statusPartner=true)  {
    return await this.instant.$post(
      '/admin/switchStatusPartner', {
        ContractorId: contractorId,
        StatusPartner: statusPartner,
      }
    )
  }
}
