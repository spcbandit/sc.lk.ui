<template>
  <div v-if="registrationStep === 0" style="width: 600px" class="form-wrapper">
    <div class="form">
      <v-form ref="contractorValidate" class="form__form" @submit="ValidateInn">
        <h3 style="margin-bottom: 60px">Регистрация</h3>
        <div class="d-flex align-start">
          <v-text-field
            v-model="signUpForm.contragentINN"
            outlined
            dense
            tile
            clearable
            :error="validate.error"
            :error-messages="`${validate.message}`"
            :rules="[rules.required]"
            validate-on-blur
            label="Введите ИНН вашeй компании"
            @input="resetForm"
          />
          <v-btn
            height="40px"
            depressed
            tile
            color="success"
            text
            class="ml-auto"
            @click.stop="ValidateInn"
          >
            Проверить
          </v-btn>
        </div>
        <v-expand-transition>
          <p v-show="!validate.error && successMsg">
            {{ successMsg }}
            <br />
            Продолжить регистрацию с найденной компанией?
          </p>
        </v-expand-transition>
      </v-form>
      <v-divider class="my-5" light />
      <div class="d-flex align-center justify-space-between">
        <v-btn depressed text color="primary" nuxt to="/login/">НАЗАД</v-btn>
        <div
          class="pa-3"
          style="background-color: #bbb9b930; border-radius: 10px"
        >
          <v-btn
            depressed
            block
            color="primary"
            :disabled="validate.status !== 200"
            @click="registrationStep = 1"
          >
            Продолжить
          </v-btn>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="registrationStep === 1"
    style="width: 600px"
    class="form-wrapper"
  >
    <div class="form">
      <v-form
        ref="regValidate"
        class="form__form"
        lazy-validation
        @submit="ValidateRegistration"
      >
        <h3 class="mb-3">Регистрация в ScanCity</h3>
        <h4 class="d-flex mb-8 align-center justify-space-between">
          <span class="text--disabled">
            Компания: {{ signUpForm.contragentName }}
          </span>
          <span class="text--disabled">
            ИНН: {{ signUpForm.contragentINN }}
          </span>
        </h4>
        <div class="d-flex align-start">
          <v-text-field
            v-model="signUpForm.login"
            :rules="[rules.required, rules.email]"
            :error="!!registrationErrors.Login"
            :error-messages="`${
              registrationErrors.Login && registrationErrors.Login[0]
                ? registrationErrors.Login[0]
                : ''
            }`"
            outlined
            dense
            tile
            prepend-inner-icon="mdi-at"
            clearable
            validate-on-blur
            label="Введите ваш e-mail"
            @input="registrationErrors.Login = false"
          />
        </div>
        <div class="d-flex align-start">
          <v-text-field
            v-model="signUpForm.name"
            :rules="[rules.required]"
            outlined
            dense
            tile
            prepend-inner-icon="mdi-account"
            clearable
            validate-on-blur
            label="Введите ваше имя"
          />
        </div>
        <div class="d-flex align-start">
          <v-text-field
            v-model="signUpForm.family"
            :rules="[rules.required]"
            outlined
            dense
            tile
            prepend-inner-icon="mdi-account"
            clearable
            validate-on-blur
            label="Введите вашу фамилию"
          />
        </div>
        <div class="d-flex align-start">
          <v-text-field
            v-model="signUpForm.parent"
            :rules="[rules.required]"
            outlined
            dense
            tile
            prepend-inner-icon="mdi-account"
            clearable
            validate-on-blur
            label="Введите ваше отчество"
          />
        </div>
        <div class="d-flex align-start">
          <v-text-field
            v-model="signUpForm.password"
            outlined
            dense
            tile
            :error="!!registrationErrors.Password"
            :error-messages="`${
              registrationErrors.Password
                ? registrationErrors.registrationErrorText
                : ''
            }`"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :rules="[rules.required, rules.min, rules.passwordConfirm]"
            label="Пароль"
            validate-on-blur
            @click:append="showPassword = !showPassword"
            @input="registrationErrors.Password = false"
          />
        </div>
        <div class="d-flex align-start">
          <v-text-field
            v-model="passwordConfirm"
            outlined
            dense
            tile
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :rules="[rules.required, rules.min, rules.passwordConfirm]"
            label="Повторите пароль"
            validate-on-blur
            @click:append="showPassword = !showPassword"
          />
        </div>
      </v-form>
      <v-divider class="my-5" light />
      <div class="d-flex align-center justify-space-between">
        <v-btn depressed text color="primary" @click="registrationStep = 0">
          НАЗАД
        </v-btn>
        <div
          class="pa-3"
          style="background-color: #bbb9b930; border-radius: 10px"
        >
          <v-btn depressed block color="primary" @click="ValidateRegistration">
            Зарегистрироваться
          </v-btn>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="registrationStep === 2" class="">
    <div
      style="background-color: white; border-radius: 5px"
      class="mt-5 pa-3 form-wrapper"
    >
      <div class="form">
        <p class="mb-5">
          Вам на почту отправлен код для активации, пожалуйста введите его ниже
        </p>
        <v-otp-input v-model="activateCode" length="6" @finish="validateCode" />
        <p
          v-if="validateErrorMessage"
          class="caption red--text text--lighten-2 mb-0"
        >
          {{ validateErrorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ProfilePart from '@/api/parts/ProfilePart'
import {mapActions} from "vuex";

export default {
  name: 'RegistrationPage',
  layout: 'auth',
  meta: {
    auth: true,
  },
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  data() {
    return {
      userAuthState: true,
      validateErrorMessage: '',
      activateCode: '',
      loginErrors: {
        Login: false,
        loginErrorText: '',
      },
      successMsg: '',
      registrationErrors: {
        Login: false,
        Password: false,
        registrationErrorText: '',
      },
      signUpForm: {
        isActive: true,
        name: '',
        contragentINN: '',
        contragentName: '',
        parent: '',
        family: '',
        login: '',
        password: '',
        isDelete: false,
      },
      validate: {
        error: false,
        status: '',
        message: '',
      },
      passwordConfirm: '',
      registrationStep: 0,
      showPassword: false,
      rules: {
        required: (v) => !!v || 'Поле обязательно к заполнению.',
        min: (v) => (v && v.length >= 3) || 'Минимум 6 символов',
        email: (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Неверный e-mail'
        },
        passwordConfirm: (v) =>
          this.signUpForm.password === this.passwordConfirm ||
          'Пароли не совпадают',
      },
    }
  },
  methods: {
    ...mapActions(['Login', 'SendCode', 'ValidateCode']),
    UserLogin() {
      const user = {
        login: this.signUpForm.login,
        password: this.signUpForm.password,
      }
      this.Login(user).then(
        () => this.$router.push('/')
      ).catch((err) => {
        this.loginErrors.Login = true
        this.loginErrors.loginErrorText = err.response.data.errorMessage
        if (err.response.data.errorMessage.includes('Аккаунт не активирован')) {
          this.userAuthState = false
          console.log('Отправляем код')
          this.SendCode()
        }
      })
    },
    async GetInn() {
      this.validate = {
        error: false,
        message: '',
        status: '',
      }
      const ClientAuth = new ProfilePart(this.$axios)
      console.log(this.signUpForm.contragentINN)
      await ClientAuth.GetContragentInn(this.signUpForm.contragentINN)
        .then((resp) => {
          console.log(resp)
          this.validate.status = 200
          this.successMsg = resp.contractorName
          this.signUpForm.contragentName = resp.contractorName
        })
        .catch((err) => {
          console.dir(err)
          this.validate = {
            error: true,
            message: err.response.data.errorMessage,
            status: err.response.status,
          }
        })
    },
    async SignUpClient() {
      const ClientAuth = new ProfilePart(this.$axios)
      await ClientAuth.SingUp(
        this.signUpForm.isActive,
        this.signUpForm.name,
        this.signUpForm.contragentINN,
        this.signUpForm.contragentName,
        this.signUpForm.parent,
        this.signUpForm.family,
        this.signUpForm.login,
        this.signUpForm.password,
        this.signUpForm.isDelete
      ).then((resp) => {
        console.log('success', resp)
        this.registrationStep = 2
      }).catch((err) => {
        console.log('err', err)
        this.registrationErrors.Password = true
        this.registrationErrors.registrationErrorText = err.response.data.errorMessage
      })
    },
    async ValidateInn() {
      if (this.$refs.contractorValidate.validate()) {
        await this.GetInn()
      }
    },
    async ValidateRegistration() {
      if (this.$refs.regValidate.validate()) {
        await console.log(this.signUpForm)
        await this.SignUpClient()
      }
    },
    resetForm() {
      this.validate.status = ''
      this.validate.error = false
      this.validate.message = ''
      this.successMsg = ''
    },
    async validateCode() {
      const validateModel = {
        login: this.signUpForm.login,
        authCode: this.activateCode
      }
      await this.ValidateCode(validateModel).then((resp) => {
        console.log(resp)
        this.userAuthState = true
        this.UserLogin()
      }).catch((e) => {
        console.dir(e)
        this.validateErrorMessage = e.response.data.errorMessage
      })
    }
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
