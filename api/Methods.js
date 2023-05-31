import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export function setCookie(key, value, args) {
  Vue.$cookies.set(key, value, args)
}

export function deleteCookie(...keys) {
  keys = [...keys]
  // console.log(keys)
  keys.forEach((key) => {
    console.log(Vue.$cookies.remove(key))
    Vue.$cookies.remove(key)
  })
}

export function getCookie(key) {
  return Vue.$cookies.get(key)
}

export function InitContragent(contragents) {
  try {
    const ContragentFromCookie = getCookie('contragentId')
    if (ContragentFromCookie?.length) {
      const selectedContragent = contragents.find(
        (el) => el.id === ContragentFromCookie
      )
      console.log('Find contragent from cookie', getCookie('contragentId'))
      console.log(selectedContragent)
      return selectedContragent
    } else {
      console.log(
        'Find main contragent',
        contragents.find((el) => el.id === el.isMain)
      )
      const MainUserContragent = contragents.find((el) => el.isMain)
      setCookie('contragentId', MainUserContragent.id)
      return MainUserContragent
    }
  } catch (err) {
    console.log(err)
  }
}

export function DevLogger(obj, text = 'DEV_LOGGER', dir = false) {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    if (dir) {
      console.log(text)
      console.dir(obj)
    } else {
      console.log(text, obj)
    }
  }
}
