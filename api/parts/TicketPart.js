/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from '@/api/Methods'

export default class TicketPart extends BasePart {

  /**
   * Создать заявку
   * @param ticketType Id типа заявки
   * {
   *   Partner, Text
   * }
   * @param ticketStatusType Id статуса
   * {
   *   Open,
   *   Read,
   *   Closed,
   *   Wait,
   *   Declined
   * }
   * @returns https://test-back.it.scancity.ru/swagger/index.html /ticket/createTicket
   * @constructor
   */
  async CreateTicket(ticketType, ticketStatusType=0, message='') {
    return await this.instant.$post(
      '/tickets/createTicket', {
        TicketType: ticketType,
        TicketStatusType: ticketStatusType,
        FromUser: getCookie('userId'),
        FromContragent: getCookie('contragentId'),
        Message: message
      }
    )
  }

  /**
   * Получить все заявки
   // * @param contragentID Id типа заявки
   * @returns https://test-back.it.scancity.ru/swagger/index.html /ticket/getAllTickets
   * @constructor
   */
  async GetAllTickets() {
    return await this.instant.$get(
      `/tickets/getAllTickets?ContractorId=${getCookie('contragentId')}`,
    )
  }
}
