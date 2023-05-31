<template>
  <div class="sk-component-wrapper">
    <div class="sk-label-wrapper">
      <div class="sk-label-wrapper__tools">
        <v-btn icon small color="secondary" @click="$emit('editItem')">
          <v-icon color="secondary">mdi-cog-outline</v-icon>
        </v-btn>
        <span style="font-size: 12px; font-weight: 600; opacity: 0.5">
          Поле ввода
        </span>
        <v-btn
          class="ml-5"
          icon
          x-small
          color="accent"
          @click="showPane = !showPane"
        >
          <v-icon color="accent">mdi-cog-outline</v-icon>
        </v-btn>
        <template v-if="showPane">
          <v-divider class="mx-2" vertical />
          <v-btn-toggle dense mandatory color="deep-purple accent-3">
            <v-btn style="min-width: 0" class="pa-1 mx-0" x-small value="none">
              <v-icon small>mdi-window-close</v-icon>
            </v-btn>
            <v-btn style="min-width: 0" class="pa-1 mx-0" x-small value="left">
              <v-icon small>mdi-dock-left</v-icon>
            </v-btn>
            <v-btn style="min-width: 0" class="pa-1 mx-0" x-small value="top">
              <v-icon small>mdi-dock-top</v-icon>
            </v-btn>
            <v-btn
              style="min-width: 0"
              class="pa-1 mx-0"
              x-small
              value="bottom"
            >
              <v-icon small>mdi-dock-bottom</v-icon>
            </v-btn>
            <v-btn style="min-width: 0" class="pa-1 mx-0" x-small value="right">
              <v-icon small>mdi-dock-right</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-divider vertical class="mx-2" />
          <v-btn-toggle dense mandatory color="deep-purple accent-3">
            <v-btn
              style="min-width: 0"
              class="pa-1 mx-0"
              x-small
              value="compact"
            >
              <v-icon x-small>mdi-format-text-variant</v-icon>
            </v-btn>
            <v-btn
              style="min-width: 0"
              class="pa-1 mx-0"
              x-small
              value="regular"
            >
              <v-icon small>mdi-format-text-variant</v-icon>
            </v-btn>
            <v-btn
              style="min-width: 0"
              class="pa-1 mx-0"
              x-small
              value="strong"
            >
              <v-icon>mdi-format-text-variant</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-divider vertical class="mx-2" />
          <v-btn-toggle dense mandatory color="deep-purple accent-3">
            <v-btn style="min-width: 0" class="pa-1 mx-0" x-small value="left">
              <v-icon small>mdi-format-align-left</v-icon>
            </v-btn>
            <v-btn
              style="min-width: 0"
              class="pa-1 mx-0"
              x-small
              value="center"
            >
              <v-icon small>mdi-format-align-center</v-icon>
            </v-btn>
            <v-btn style="min-width: 0" class="pa-1 mx-0" x-small value="right">
              <v-icon small>mdi-format-align-right</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
        <v-btn
          icon
          small
          color="info"
          class="ml-auto"
          @click="$emit('delItem')"
        >
          <v-icon color="info">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="sk-label" :class="labelPosition + ' ' + labelAlignment">
        <div
          contenteditable="true"
          :class="labelAlignmentItem"
          class="sk-label__label"
          :style="descriptionFontStyle"
          @blur="change($event.target.innerText)"
        >
          {{ property.label ? property.label : attributes.label }}
        </div>
        <div
          contenteditable="true"
          :class="labelAlignmentItem"
          class="sk-label__title"
          :style="textFontStyle"
          @blur="change($event.target.innerText, 'defaultText')"
        >
          {{ property.label ? property.defaultText : attributes.defaultText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-properties */
import { mapGetters } from 'vuex'

export default {
  name: 'SKinput',
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    property: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      showPane: false,
      attributes: {
        type: 'input', // Тип поля
        sourceData: 'number', // Источник динамических данных, пока вводится вручную
        label: 'Текст описание', // статический текст подписи
        labelPosition: 'bottom', // размещение текста подписи относительно поля с динамическими данными
        alignment: 'left', // выравнивание динамических данных, возможные значения left / center / right
        defaultText: '-----', // значение, подставляемое при отсутствии динамических данных
        fontStyle: 'regular', // настройка размера цвета шрифта из стиля, возможные значения compact / regular / strong
      },
    }
  },
  computed: {
    ...mapGetters(['PROCESSES']),
    descriptionFontStyle() {
      if (this.property.fontStyle === 'compact') {
        return `color: ${this.PROCESSES.style.compactFontColor}; font-size: ${
          this.PROCESSES.style.compactFontSize - 3
        }px;`
      }
      if (this.property.fontStyle === 'regular') {
        return `color: ${this.PROCESSES.style.regularFontColor}; font-size: ${
          this.PROCESSES.style.regularFontSize - 6
        }px;`
      }
      if (this.property.fontStyle === 'strong') {
        return `color: ${this.PROCESSES.style.strongFontColor}; font-size: ${
          this.PROCESSES.style.strongFontSize - 9
        }px;`
      }
      return ''
    },
    textFontStyle() {
      if (this.property.fontStyle === 'compact') {
        return `color: ${this.PROCESSES.style.compactFontColor}; font-size: ${this.PROCESSES.style.compactFontSize}px;`
      }
      if (this.property.fontStyle === 'regular') {
        return `color: ${this.PROCESSES.style.regularFontColor}; font-size: ${this.PROCESSES.style.regularFontSize}px;`
      }
      if (this.property.fontStyle === 'strong') {
        return `color: ${this.PROCESSES.style.strongFontColor}; font-size: ${this.PROCESSES.style.strongFontSize}px;`
      }
      return ''
    },
    labelAlignment() {
      return `sk-label-alignment--${this.property.alignment}`
    },
    labelAlignmentItem() {
      return `sk-label-alignment-item--${this.property.alignment}`
    },
    labelPosition() {
      return `sk-label-positions--${this.property.labelPosition}`
    },
  },
  methods: {
    change(text, el) {
      this.$emit('change', {
        item: this.property,
        text,
        el,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.sk-label-wrapper {
  cursor: grab;
  display: flex;
  flex-direction: column;

  &__tools {
    display: flex;
    align-items: center;
    border-bottom: 1px #5a7b8630 solid;
  }
}
.sk-label {
  padding: 10px 15px;
  display: flex;
  column-gap: 12px;
  row-gap: 2px;
  flex: 1 1;

  &__label {
    cursor: text !important;
    display: flex;
    line-height: 1;
    padding: 7px 10px;
    margin: 0 -5px;
    flex-wrap: wrap;
    border-radius: 4px;
    outline: none;

    &:focus {
      background-color: #00000010;
    }
    &:active {
      background-color: #00000010;
    }
    &:hover {
      background-color: #00000020;
    }
  }

  &__title {
    cursor: text;
    display: flex;
    line-height: 1;
    padding: 6px 10px;
    margin: 0 -5px;
    flex-wrap: wrap;
    border-radius: 4px;
    outline: none;

    &:focus {
      background-color: #00000010;
    }
    &:active {
      background-color: #00000010;
    }
    &:hover {
      background-color: #00000020;
    }
  }
}
</style>
