<template>
  <div class="sk-component-wrapper">
    <div class="sk-button-wrapper">
      <div class="sk-button-wrapper__tools">
        <v-btn icon color="secondary" @click="$emit('editItem')">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
        <span style="font-size: 12px; font-weight: 600; opacity: 0.5">
          Кнопка: {{ property.id }}
        </span>
        <v-btn icon color="info" class="ml-auto" @click="$emit('delItem')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div style="padding: 10px">
        <div
          class="sk-button"
          :style="`background-color:${PROCESSES.style.colorTheme}; ${cornerRadius}`"
        >
          <div
            contenteditable="true"
            class="sk-button__title"
            :style="`color: ${getContrast50(PROCESSES.style.colorTheme)}`"
            :class="!background ? '' : 'sk-button__title--active'"
            @click="background = true"
            @blur="change($event.target.innerText)"
          >
            {{ property.label ? property.label : 'Кнопка' }}
          </div>
        </div>
      </div>
      <!--<div class="sk-component-icon-button" @click="$emit('editItem')">-->
      <!--  <img-->
      <!--    :src="require('@/assets/icons/UI/svg/cog-outline.svg')"-->
      <!--    width="24px"-->
      <!--    height="24px"-->
      <!--  />-->
      <!--</div>-->
      <!--<div class="sk-button" :class="property.style">-->
      <!--  <p>-->
      <!--    {{ property.label ? property.label : 'Кнопка' }}-->
      <!--  </p>-->
      <!--</div>-->
      <!--<div-->
      <!--  class="sk-component-icon-button sk-component-icon-button__delete"-->
      <!--  @click="$emit('delItem')"-->
      <!--&gt;-->
      <!--  &times;-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-properties */
import { mapGetters } from 'vuex'

export default {
  name: 'SKbutton',
  props: {
    ...['btnSourceData', 'label', 'click'],
    editable: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: 'black',
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
      background: false,
      attributes: {
        type: 'Button',
        label: '',
        click: '',
      },
    }
  },
  computed: {
    ...mapGetters(['PROCESSES']),
    cornerRadius() {
      if (this.PROCESSES.style.cornerStyle === 'round') {
        return 'border-radius: 999px;'
      } else if (this.PROCESSES.style.cornerStyle === 'none') {
        return 'border-radius: 0;'
      }
      return 'border-radius: 4px;'
    },
  },
  beforeMount() {
    // console.log(this.property)
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
    change(text) {
      this.$emit('change', {
        item: this.property,
        text,
      })
      this.background = false
    },
  },
}
</script>
<style>
.sk-component-wrapper {
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid #5a7b8620;
  border-radius: 4px;
}
</style>
<style scoped lang="scss">
.sk-button-wrapper {
  display: flex;
  flex-direction: column;
  cursor: grab;

  &__tools {
    display: flex;
    align-items: center;
    border-bottom: 1px #5a7b8630 solid;
  }
}
.sk-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab !important;
  min-height: 40px;
  max-height: 40px;
  padding: 10px;
  flex: 1 1;

  &__title {
    display: flex;
    padding: 5px 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: none;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    white-space: nowrap;
    font-size: 0.875rem;

    &--active {
      background-color: #ffffff30;
    }

    &:hover {
      background-color: #ffffff50;
    }
  }
}

.none {
  border-radius: 0px;
}
.round {
  border-radius: 999px;
}
.semi {
  border-radius: 5px;
}
.sk-component-icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;

  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  &__delete {
    background-color: #e16969;
    color: #fff;
  }
}
</style>
