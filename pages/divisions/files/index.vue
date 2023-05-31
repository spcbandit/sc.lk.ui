<template>
  <div class="configurator-dashboard px-7 pt-5">
    <div>
      <div class="mt-5">
        <a :href="$config.msiURL">Скачать инсталлятор</a>
        <v-btn depressed color="primary" @click="downloadApkDialog = true">
          Скачать приложение
        </v-btn>
      </div>
    </div>
    <v-dialog v-model="downloadApkDialog" width="440px">
      <div
        class="dialog__header justify-end mb-n3 pb-0"
        style="border-bottom: none"
      >
        <v-btn icon @click="downloadApkDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div style="background-color: white" class="pa-3">
        <img
          :src="require('~/assets/images/common/qr-code.svg')"
          width="100%"
        />
        <v-divider class="mb-5" />
        <p>Отсканируйте код на телефоне или скачайте файл по прямой ссылке</p>
        <a :href="$config.apkURL">Скачать файл</a>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'FilesIndex',
  data() {
    return {
      downloadApkDialog: false,
    }
  },
  methods: {},
}
</script>

<style scoped></style>
