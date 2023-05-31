<template>
  <div
    class="sk-label"
    :class="
      labelPosition(element.labelPosition) +
      ' ' +
      labelAlignment(element.alignment)
    "
  >
    <div
      :style="descriptionFontStyle"
      :class="labelAlignmentItem(element.alignment)"
      class="sk-label__label"
    >
      {{ element.label ? element.label : element.label }}
    </div>
    <div
      :style="textFontStyle"
      :class="labelAlignmentItem(element.alignment)"
      class="sk-label__title"
    >
      {{ element.label ? element.defaultText : element.defaultText }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LabelPreview',
  props: {
    element: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters(['GET_FORM_STYLE']),
  },
  methods: {
    descriptionFontStyle() {
      if (this.element.fontStyle === 'compact') {
        return `color: ${this.GET_FORM_STYLE.compactFontColor}; font-size: ${
          this.GET_FORM_STYLE.compactFontSize - 3
        }px;`
      }
      if (this.element.fontStyle === 'regular') {
        return `color: ${this.GET_FORM_STYLE.regularFontColor}; font-size: ${
          this.GET_FORM_STYLE.regularFontSize - 6
        }px;`
      }
      if (this.element.fontStyle === 'strong') {
        return `color: ${this.GET_FORM_STYLE.strongFontColor}; font-size: ${
          this.GET_FORM_STYLE.strongFontSize - 9
        }px;`
      }
      return ''
      // return `color: ${this.styleComponent.compactFontColor}; font-size: ${this.styleComponent.compactFontSize}px;`
    },
    textFontStyle() {
      if (this.element.fontStyle === 'compact') {
        return `color: ${this.GET_FORM_STYLE.compactFontColor}; font-size: ${this.GET_FORM_STYLE.compactFontSize}px;`
      }
      if (this.element.fontStyle === 'regular') {
        return `color: ${this.GET_FORM_STYLE.regularFontColor}; font-size: ${this.GET_FORM_STYLE.regularFontSize}px;`
      }
      if (this.element.fontStyle === 'strong') {
        return `color: ${this.GET_FORM_STYLE.strongFontColor}; font-size: ${this.GET_FORM_STYLE.strongFontSize}px;`
      }
      return ''
      // return `color: ${this.styleComponent.compactFontColor}; font-size: ${this.styleComponent.compactFontSize}px;`
    },
    labelAlignment(prop) {
      return `sk-label-alignment--${prop}`
    },
    labelAlignmentItem(prop) {
      return `sk-label-alignment-item--${prop}`
    },
    labelPosition(prop) {
      return `sk-label-positions--${prop}`
    },
  },
}
</script>

<style scoped></style>
