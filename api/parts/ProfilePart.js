/* eslint-disable */
import BasePart from '@/api/parts/BasePart'
import { getCookie } from "@/api/Methods";

export default class ProfilePart extends BasePart {
  /**
   * Регистрация нового пользователя
   * @param isActive Активность учетки Bool
   * @param name Имя пользователя
   * @param contragentINN ИНН организации
   * @param contragentName Название организации
   * @param parent Отчество
   * @param family Фамилия
   * @param login Логин
   * @param password Пароль
   * @param isDelete Статус удаленной учетки Bool
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/registration
   * @constructor
   */
  async SingUp(
    isActive,
    name,
    contragentINN,
    contragentName,
    parent,
    family,
    login,
    password,
    isDelete
  ) {

    password = password.replace(/[\r\n]+/g, '')
    login = login.replace(/[\r\n]+/g, '')
    name = name.replace(/[\r\n]+/g, '')
    parent = parent.replace(/[\r\n]+/g, '')
    family = family.replace(/[\r\n]+/g, '')

    return await this.instant.$post('/profile/registration', {
      IsActive: isActive,
      Name: name,
      ContractorINN: contragentINN,
      ContractorName: contragentName,
      Parent: parent,
      Family: family,
      Login: login,
      Password: password,
      IsDelete: isDelete,
    })
  }

  /**
   * Логин пользователя
   * @param login
   * @param password
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/login
   * @constructor
   */
  async Login(login, password) {

    password = password.replace(/[\r\n]+/g, '')
    login = login.replace(/[\r\n]+/g, '')

    return await this.instant.$put('/profile/login', {
      Login: login,
      Password: password,
    })
  }

  /**
   * Получение Название компании по ИНН
   * @param innNumber
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/getContractorNameById
   * @constructor
   */
  async GetContragentInn(innNumber) {
    return await this.instant.$get(
      '/profile/getContractorNameByINN?INN=' + innNumber
    )
  }

  /**
   * Получение информации о пользователе
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/getUserInfo
   * @constructor
   */
  async GetUserInfo() {
    return await this.instant.$get('/profile/getUserInfo?UserId='
      + getCookie('userId'))
  }

  /**
   * Изменить информацию основного пользователя
   * @param userName
   * @param userParent
   * @param userFamily
   * @param userEmail
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/changeData
   * @constructor
   */
  // TODO поправить Email на Login или наоборот. Email - будет ожидаемо
  async ChangeData(userName, userParent, userFamily, userEmail) {
    return await this.instant.$put('/profile/changeData', {
      Id: getCookie('userId'),
      Name: userName,
      Parent: userParent,
      Family: userFamily,
      Email: userEmail,
    })
  }

  /**
   * Сброс и изменение пароля
   * @param login
   * @param password
   * @param authCode
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/passwordReset
   * @constructor
   */
  async PasswordReset(login, password, authCode) {
    return await this.instant.$put('/profile/passwordReset', {
      Login: login,
      Password: password,
      AuthCode: authCode
    })
  }

  /**
   * Создание нового пароля
   * @param login
   * @param oldPassword
   * @param newPassword
   * @param authCode
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/passwordReset
   * @constructor
   */
  async CreateNewPassword(login, oldPassword, newPassword, authCode) {
    return await this.instant.$post('/profile/createNewPassword', {
      Login: login,
      Password: oldPassword,
      NewPassword: newPassword,
      Code: authCode
    })
  }

  /**
   * Отправить код подтверждения профиля
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/sendCode
   * @constructor
   */
  async SendCode(login) {
    return await this.instant.$put('/profile/sendCode', {
      Login: login,
      // Password: password,
      // AuthCode: authCode
    })
  }

  /**
   * Проверка кода подтверждения
   * @param login
   * @param authCode
   * @returns https://test-back.it.scancity.ru/swagger/index.html /profile/validateCode
   * @constructor
   */
  async ValidateCode(login, authCode) {
    return await this.instant.$put('/profile/validateCode', {
      Login: login,
      AuthCode: authCode
    })
  }
}
