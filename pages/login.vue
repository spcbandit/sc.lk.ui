<template>
  <div class="form-wrapper">
    <div class="image-wrapper">
      <img :src="require('@/assets/icons/common/svg/logo-white.svg')" alt="" />
    </div>
    <div class="form">
      <span
        v-if="errors.validation.active"
        style="cursor: pointer"
        @click="resetLoginForm"
      >
        {{ '< вернуться назад' }}
      </span>
      <v-form ref="loginForm" class="form__form">
        <!--<h3 style="margin-bottom: 60px">Войти в ScanCity</h3>-->
        <div v-if="!errors.validation.active" class="">
          <v-text-field
            v-model="loginForm.login"
            prepend-inner-icon="mdi-at"
            :error="errors.loginForm.loginInput.active"
            :error-messages="errors.loginForm.loginInput.text"
            :rules="[rules.required, rules.email]"
            validate-on-blur
            label="E-mail адрес"
            @input="resetErrors"
          />
          <v-text-field
            v-model="loginForm.password"
            :error="errors.loginForm.passwordInput.active"
            :error-messages="errors.loginForm.passwordInput.text"
            :append-icon="
              showPassword.loginPassword ? 'mdi-eye' : 'mdi-eye-off'
            "
            :type="showPassword.loginPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :rules="[rules.required, rules.min]"
            validate-on-blur
            label="Пароль"
            @input="resetErrors"
            @click:append="
              showPassword.loginPassword = !showPassword.loginPassword
            "
          />
        </div>
        <div
          v-if="errors.validation.active"
          style="background-color: #00000010; border-radius: 5px"
          class="mt-5 pa-3"
        >
          <p class="caption mb-0">
            Для входа в аккаунт смените первоначальный пароль. Код для изменения
            пароля отправлен на почту:
            <span style="font-weight: 700">{{ loginForm.login }}</span>
          </p>
          <v-text-field
            v-model="setNewPasswordForm.oldPassword"
            :error="errors.setNewPasswordForm.oldPasswordInput.active"
            :error-messages="errors.setNewPasswordForm.oldPasswordInput.text"
            :append-icon="showPassword.oldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword.oldPassword ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            validate-on-blur
            background-color="white"
            class="mt-5"
            dense
            outlined
            label="Пароль из письма"
            @click:append="showPassword.oldPassword = !showPassword.oldPassword"
          />
          <v-text-field
            v-model="setNewPasswordForm.newPassword"
            :error="errors.setNewPasswordForm.newPasswordInput.active"
            :error-messages="errors.setNewPasswordForm.newPasswordInput.text"
            :append-icon="showPassword.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword.newPassword ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            validate-on-blur
            background-color="white"
            dense
            outlined
            label="Ваш новый пароль"
            @click:append="showPassword.newPassword = !showPassword.newPassword"
          />
          <p class="caption mb-2">Код подтвеждения:</p>
          <v-otp-input
            v-model="setNewPasswordForm.confirmCode"
            :error="errors.setNewPasswordForm.confirmCodeInput.active"
            :error-messages="errors.setNewPasswordForm.confirmCodeInput.text"
            label="Код подтверждения"
            length="6"
            :rules="[rules.required]"
          />
          <p
            v-if="errors.validation.text"
            class="caption red--text text--lighten-2"
          >
            {{ errors.validation.text }}
          </p>
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
          <!--<p style="text-decoration: underline; cursor: pointer">
            Отправить код еще раз
          </p>-->
        </div>
        <v-btn
          v-if="!errors.validation.active"
          depressed
          color="success"
          class="mt-5"
          @click="login"
        >
          Войти
        </v-btn>
        <v-btn
          v-if="errors.validation.active"
          depressed
          color="success"
          class="mt-5"
          @click="createNewPassword"
        >
          Изменить пароль
        </v-btn>
        <div class="mt-10">
          <NuxtLink to="/reset">Забыли пароль?</NuxtLink>
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
  name: 'AuthPage',
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
      showPassword: {
        loginPassword: false,
        oldPassword: false,
        newPassword: false,
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
          this.newPassword === this.newPasswordConfirm || 'Пароли не совпадают',
      },
      snackbar: {
        state: false,
        text: '',
        color: 'primary',
      },
      loginForm: {
        login: '',
        password: '',
      },
      setNewPasswordForm: {
        login: '',
        oldPassword: '',
        newPassword: '',
        confirmCode: '',
      },
      errors: {
        loginForm: {
          loginInput: {
            active: false,
            text: '',
          },
          passwordInput: {
            active: false,
            text: '',
          },
        },
        validation: {
          active: false,
          text: '',
        },
        setNewPasswordForm: {
          loginInput: {
            active: false,
            text: '',
          },
          oldPasswordInput: {
            active: false,
            text: '',
          },
          newPasswordInput: {
            active: false,
            text: '',
          },
          confirmCodeInput: {
            active: false,
            text: '',
          },
        },
      },
      tempErrors: {
        loginForm: {
          loginInput: {
            active: false,
            text: '',
          },
          passwordInput: {
            active: false,
            text: '',
          },
        },
        validation: {
          active: false,
          text: '',
        },
        setNewPasswordForm: {
          loginInput: {
            active: false,
            text: '',
          },
          oldPasswordInput: {
            active: false,
            text: '',
          },
          newPasswordInput: {
            active: false,
            text: '',
          },
          confirmCodeInput: {
            active: false,
            text: '',
          },
        },
      },
      sendConfirmCodeInterval: 60,
      sendConfirmCodeTimer: null,
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
    ...mapActions([
      'Login',
      'SendCode',
      'ValidateCode',
      'PasswordReset',
      'CreateNewPassword',
    ]),
    resetErrors() {
      this.errors = {
        loginForm: {
          loginInput: {
            active: false,
            text: '',
          },
          passwordInput: {
            active: false,
            text: '',
          },
        },
        validation: {
          active: false,
          text: '',
        },
        setNewPasswordForm: {
          loginInput: {
            active: false,
            text: '',
          },
          oldPasswordInput: {
            active: false,
            text: '',
          },
          newPasswordInput: {
            active: false,
            text: '',
          },
          confirmCodeInput: {
            active: false,
            text: '',
          },
        },
      }
    },
    login() {
      if (this.$refs.loginForm.validate()) {
        this.resetErrors()
        this.Login(this.loginForm)
          .then(() => {
            this.$router.push('/')
          })
          .catch((err) => {
            console.dir(err)
            if (
              err.response.status === 400 &&
              err.response.data.errorMessage &&
              err.response.data.errorMessage.includes('Аккаунт не активирован')
            ) {
              this.SendCode(this.loginForm.login).then(() => {
                this.startSendConfirmCodeTimer()
                this.errors.validation.active = true
                this.errors.validation.text = err.response.data.errorMessage
              })
            }
            if (
              err.response.status === 400 &&
              err.response.data.errorMessage &&
              err.response.data.errorMessage.includes('Введенный пароль не верен')
            ) {
                this.errors.loginForm.passwordInput.active = true
                this.errors.loginForm.passwordInput.text = err.response.data.errorMessage
            }
            if (
              err.response.status === 400 &&
              err.response.data.errorMessage &&
              err.response.data.errorMessage.includes('Введенный логин не найден')
            ) {
                this.errors.loginForm.loginInput.active = true
                this.errors.loginForm.loginInput.text = err.response.data.errorMessage
              }
          })
      }
    },
    resetLoginForm() {
      this.$refs.loginForm.reset()
      this.stopSendConfirmTimer()
      this.errors.validation = {
        active: false,
        text: '',
      }
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
    async createNewPassword() {
      if (this.$refs.loginForm.validate()) {
        this.setNewPasswordForm.login = this.loginForm.login
        await this.CreateNewPassword(this.setNewPasswordForm).then((resp) => {
          console.dir(resp)
          this.loginForm.password = this.setNewPasswordForm.newPassword
          this.login()
        }).catch((e) => {
          console.dir(e)
          this.errors.validation.text = e.response.data.errorMessage
        })
      }
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
