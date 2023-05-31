/* eslint-disable */
import {deleteCookie, getCookie} from "@/api/Methods";

export default function ({ $axios, redirect }) {

  $axios.defaults.timeout = 5000,

  // $axios.defaults.headers = {
  //   Vary: 'Origin',
  //   Accept: `*`,
  //   // Authorization: 'Bearer ' + getCookie('token'),
  //   // ContentType: `multipart/form-data; boundary=${form.boundary}`,
  //   // 'ContentType': `multipart/form-data;`,
  //   // 'Authorization': 'Bearer ' + getCookie('token'),
  //   'AccessControlAllowOrigin': 'test-back.it.scancity.ru',
  //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'X-Requested-With',
  //   'accept': 'application/json'
  // }

  $axios.onRequest((config) => {
    console.log('Запрос токена')
    const token = getCookie('token')
    if (token) {
      console.log('Получили токен: ', token)
      $axios.setToken(token, 'Bearer')
    }
  })

  $axios.onError((error) => {
    console.log('Ошибка запроса на сервер')
    console.dir(error)
    // if (error.response.status === 400 && error.response.data.title.includes('validation errors')) {
    //   console.dir( error.response)
    //   console.log('400', error.response)
    //   console.info(error.response)
    //   deleteCookie('user', 'token')
    //   // redirect('/login')
    //   window.location = '/login'
    // }
    // if (error.response.status === 401) {
    //   deleteCookie('user', 'token')
    //   redirect('/login')
    //   // window.location = '/login'
    // }
    if (error.response.status === 403) {
      console.log('403 error')
    }
  })
}
