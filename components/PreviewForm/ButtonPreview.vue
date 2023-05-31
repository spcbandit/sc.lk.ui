<template>
  <div class="">
    <v-btn
      block
      elevation="0"
      :style="`color: ${getContrast50(PROCESSES.style.colorTheme)}`"
      :color="PROCESSES.style.colorTheme"
    >
      {{ element.label ? element.label : 'Кнопка' }}
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ButtonPreview',
  props: {
    element: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters(['PROCESSES']),
  },
  methods: {
    getContrast50(hex) {
      if (hex) {
        const hexColor = hex.slice(1)
        const r = parseInt(hexColor.substr(0, 2), 16)
        const g = parseInt(hexColor.substr(2, 2), 16)
        const b = parseInt(hexColor.substr(4, 2), 16)
        const yiq = (r * 299 + g * 587 + b * 114) / 1000
        return yiq >= 128 ? 'black' : 'white'
      }
    },
  },
}
</script>

<style scoped></style>
