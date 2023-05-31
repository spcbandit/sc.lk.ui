<template>
  <div class="form-wrapper">
    <div class="image-wrapper">
      <img :src="require('@/assets/icons/common/svg/logo-white.svg')" alt="" />
    </div>
    <div class="form">
      <v-form ref="forgotPassword" class="form__form" action="">
        <h3 style="margin-bottom: 60px">Восстановление пароля</h3>
        <v-text-field
          v-model="loginToResetPassword"
          outlined
          dense
          prepend-inner-icon="mdi-at"
          clearable
          :rules="[rules.required, rules.email]"
          validate-on-blur
          label="E-mail адрес"
          @input="resetForgotePassword"
        />
        <div
          v-if="resetPassword"
          style="background-color: #00000010; border-radius: 5px"
          class="pa-3"
        >
          <p class="mb-5">
            Вам на почту отправлен код для сброса пароля, пожалуйста введите его
            ниже
          </p>
          <v-otp-input
            v-model="activateCode"
            length="6"
            @finish="validateResetCode"
          />
          <v-btn
            :disabled="sendConfirmCodeTimer !== null"
            color="primary"
            depressed
            @click="startSendConfirmCodeTimer"
          >
            Отправить код еще раз
          </v-btn>
          <p v-if="sendConfirmCodeTimer !== null" class="caption mt-2 mb-0">
            Запросить код повторно можно через:
            {{ sendConfirmCodeInterval }} сек.
          </p>
          <!--<p-->
          <!--  style="text-decoration: underline; cursor: pointer"-->
          <!--  @click="resetPasswordSendCode"-->
          <!--&gt;-->
          <!--  Отправить код еще раз-->
          <!--</p>-->
          <p
            v-if="validateErrorMessage"
            class="caption red--text text--lighten-2 mb-0"
          >
            {{ validateErrorMessage }}
          </p>
        </div>
        <div v-if="passwordBlock" class="mt-5">
          <v-text-field
            v-model="newPassword"
            outlined
            dense
            prepend-inner-icon="mdi-at"
            clearable
            :rules="[rules.required]"
            label="Новый пароль"
          />
          <v-text-field
            v-model="newPasswordConfirm"
            outlined
            dense
            prepend-inner-icon="mdi-at"
            clearable
            :rules="[rules.required, rules.passwordConfirm]"
            label="Повторите пароль"
          />
          <v-btn depressed color="success" @click="setNewPassword">
            Сбросить пароль
          </v-btn>
        </div>
        <v-btn
          v-if="!resetPassword"
          depressed
          color="success"
          class="mt-5"
          @click="resetPasswordSendCode"
        >
          Сбросить пароль
        </v-btn>
        <div class="mt-10 align-center">
          <v-icon color="primary">mdi-chevron-left</v-icon>
          <NuxtLink
            class="ma-0 pa-0"
            to="/login"
            style="text-decoration: underline; cursor: pointer"
            @click="backToLogin"
          >
            Назад
          </NuxtLink>
        </div>
      </v-form>
      <v-divider class="my-10" light />
      <div
        class="pa-3"
        style="background-color: #bbb9b930; border-radius: 10px"
      >
        <v-btn depressed block color="primary" nuxt to="/registration/">
          Зарегистрироваться
        </v-btn>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar.state"
      right
      top
      text
      :color="snackbar.color"
      timeout="2000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'

export default {
  name: 'ResetPage',
  meta: {
    auth: true,
  },
  layout: 'auth',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  data() {
    return {
      sendConfirmCodeInterval: 60,
      sendConfirmCodeTimer: null,
      loginToResetPassword: '',
      resetCodeState: false,
      newPassword: '',
      firstPassword: '',
      newPasswordConfirm: '',
      passwordBlock: false,
      resetPassword: false,
      user: {
        login: 'de_Coin@mail.ru',
        password: '123!123A',
        // login: '',
        // password: '',
      },
      validateErrorMessage: '',
      activateCode: '',
      userAuthState: true,
      forgotPassword: false,
      showPassword: false,
      loginErrors: {
        Login: false,
        loginErrorText: '',
      },
      rules: {
        required: (value) => !!value || 'Поле обязательно к заполнению.',
        min: (v) => (v && v.length >= 6) || 'Минимум 6 символов',
        email: (val) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(val) || 'Неверный e-mail'
        },
        passwordConfirm: (v) =>
          this.newPassword === this.newPasswordConfirm ||
          'Пароли не совпадают',
      },
      snackbar: {
        state: false,
        text: '',
        color: 'primary'
      },
    }
  },
  watch: {
    sendConfirmCodeInterval(time) {
      if (time === 0) {
        this.stopSendConfirmTimer()
      }
    },
  },
  destroyed() {
    this.stopSendConfirmTimer()
  },
  methods: {
    ...mapActions(['Login', 'SendCode', 'ValidateCode', 'PasswordReset']),
    backToLogin() {
      this.$refs.forgotPassword.reset()
      this.forgotPassword = false
    },
    UserLogin(checkCode = true) {
      if(this.$refs.loginForm.validate()) {
        this.Login(this.user).then(
          () => this.$router.push('/')
        ).catch((err) => {
          this.loginErrors.Login = true
          this.loginErrors.loginErrorText = err.response.data.errorMessage
          if (err.response.data.errorMessage.includes('Аккаунт не активирован')) {
            this.userAuthState = false
            console.log('Отправляем код')
            if(checkCode) {
              this.SendCode(this.user.login)
            }
          }
        })
      }
    },
    async resetPasswordSendCode() {
      console.log(this.loginToResetPassword)
      if(this.$refs.forgotPassword.validate()) {
        this.startSendConfirmCodeTimer()
        await this.SendCode(this.loginToResetPassword)
        this.resetPassword = true
      }
    },
    async validateCode() {
      const validateModel = {
        login: this.user.login,
        authCode: this.activateCode
      }
      await this.ValidateCode(validateModel).then((resp) => {
        console.log(resp)
        this.userAuthState = true
        this.UserLogin(false)
      }).catch((e) => {
        console.dir(e)
        this.validateErrorMessage = e.response.data.errorMessage
      })
    },
    resetForgotePassword() {
      this.resetPassword = false
      this.resetCodeState = false
      this.passwordBlock = false
    },
    async validateResetCode() {
      this.passwordBlock = true
    },
    async setNewPassword() {
      const validateModel = {
        login: this.loginToResetPassword,
        password: this.newPassword,
        authCode: this.activateCode,
      }
      this.PasswordReset(validateModel).then((resp) => {
        console.dir(resp)
        this.snackbar.text = 'Пароль успешно сброшен'
        this.snackbar.state = true
        this.snackbar.color = 'success'
        this.$router.push('/login')
      }).catch((e) => {
        console.dir(e)
        this.validateErrorMessage = e.response.data.errorMessage
      })
    },
    startSendConfirmCodeTimer() {
      this.sendConfirmCodeInterval = 60
      this.sendConfirmCodeTimer = setInterval(() => {
        this.sendConfirmCodeInterval--
      }, 1000)
    },
    stopSendConfirmTimer() {
      this.sendConfirmCodeInterval = 60
      clearTimeout(this.sendConfirmCodeTimer)
      this.sendConfirmCodeTimer = null
    },
  },
}
</script>

<style scoped lang="scss">
.form-wrapper {
  max-width: 960px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  -webkit-box-shadow: 0px 20px 50px 9px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 20px 50px 9px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 20px 50px 9px rgba(34, 60, 80, 0.2);
}
.image-wrapper {
  padding: 30px;
  display: flex;
  flex: 1 1;
  background-color: #0971c7;
  & img {
    width: 100%;
    object-fit: contain;
    position: center;
  }
}
.form {
  padding: 60px;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  background-color: #fff;

  &__form {
    display: flex;
    flex-direction: column;
    //row-gap: 10px;
  }
}
</style>
