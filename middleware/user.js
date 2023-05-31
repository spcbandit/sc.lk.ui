export default function ({ store, redirect, route }) {
  /** Инициализация по User */
  // if (!store?.state?.userAccount.id) {
  //   // console.log(route.fullPath, 'В сторе отсутствует запись о пользователе')
  //   if (!route?.meta[0]?.auth) {
  //     redirect('/login/')
  //   } else {
  //     // console.log(route.fullPath, 'Странички регистрации')
  //   }
  // }
  // if (store?.state?.userAccount.id) {
  //   // console.log(route.fullPath, 'Пользователь авторизирован')
  //   if (route?.meta[0]?.auth) {
  //     redirect('/')
  //   } else {
  //     // console.log(route.fullPath, 'Странички ЛК')
  //   }
  // }
  if (
    !store?.state?.authorizationState?.auth ||
    !store?.state?.authorizationState?.userId?.length
  ) {
    console.log('В сторе отсутствует запись о пользователе')
    if (!route?.meta[0]?.auth) {
      redirect('/login')
    } else {
      console.log(route.fullPath, 'Странички регистрации')
    }
  }
  if (store?.state?.authorizationState.auth) {
    console.log(route.fullPath, 'Пользователь авторизирован')
    if (route?.meta[0]?.auth) {
      redirect('/')
    } else {
      // console.log(route.fullPath, 'Странички ЛК')
    }
  }
}
