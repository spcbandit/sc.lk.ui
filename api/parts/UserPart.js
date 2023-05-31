/* eslint-disable */
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import BasePart from '@/api/parts/BasePart'
Vue.use(VueCookies)

export default class UserPart extends BasePart {
  /**
   * Создание нового пользователя изнутри лк (не тоже самое что регистрация)
   * @param contragentId ID Контрагента
   * @param userId ID пользователя создателя
   * @param roleType Тип нового пользователя
   * @param password Пароль нового пользователя
   * @param login Логин нового пользователя
   * @param accessType Логин нового пользователя
   * @param roleName Логин нового пользователя
   * @returns https://test-back.it.scancity.ru/swagger/index.html /user/createUser
   * @constructor
   */
  async CreateUser(roleType, password, login, accessType, roleName, contractorId) {
    return await this.instant.$post(
      '/users/createUser',
      {
        ContractorId: contractorId,
        CreatorUserId: Vue.$cookies.get('userId'),
        Login: login,
        // Password: password,
        RoleType: roleType,
        AccessType: accessType,
        RoleName: roleName,
      }
    )
  }

  /**
   * Получить всех пользователей лк.
   * @returns https://test-back.it.scancity.ru/swagger/index.html /user/getAllUsers
   * @constructor
   */
  async GetAllUsers() {
    return await this.instant.$get(
      '/users/getAllUsers?ContractorId=' +
        Vue.$cookies.get('contragentId') +
        '&UserId=' +
        Vue.$cookies.get('userId')
    )
  }

  /**
   * Получить все разрешения.
   * @returns https://test-back.it.scancity.ru/swagger/index.html /users/getAllPermissions
   * @constructor
   */
  async GetAllPermissions() {
    return await this.instant.$get('/users/getAllPermissions')
  }

  /**
   * Получить все роли.
   * @returns https://test-back.it.scancity.ru/swagger/index.html /users/getAllRoles
   * @constructor
   */
  async GetAllRoles() {
    return await this.instant.$get('/users/getAllRoles')
  }

  /**
   * Удаление клиента
   * @param userId ID удаляемого пользователя
   * @returns https://test-back.it.scancity.ru/swagger/index.html /user/deleteUser
   * @constructor
   */
  async DeleteUser(userId) {
    return await this.instant.delete('/users/deleteUser', {
      data: {
        UserId: userId,
      },
    })
  }

  /**
   * Обновление информации профиля
   * @param name Имя
   * @param parent Отчество
   * @param family Фамилия
   * @param login Логин
   * @param password Пароль
   * @returns https://test-back.it.scancity.ru/swagger/index.html /user/updateUser
   * @constructor
   */
  async UpdateUser(user) {
    return await this.instant.$put('/users/updateUser', {
        ...user
    })
  }

}
