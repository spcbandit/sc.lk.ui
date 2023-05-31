<template>
  <v-app>
    <div class="layout-wrapper">
      <nuxt />
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.layout-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: #0971c720;
}
</style>
