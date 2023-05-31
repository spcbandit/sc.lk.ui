<template>
  <div class="sk-component-wrapper">
    <div class="sk-layout-wrapper">
      <div class="sk-layout-wrapper__bar">
        <v-btn icon small color="secondary" @click="$emit('editItem')">
          <v-icon color="secondary">mdi-cog-outline</v-icon>
        </v-btn>
        <span style="font-size: 12px; font-weight: 600; opacity: 0.5">
          Контейнер
        </span>
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
      <div class="sk-layout">
        <div class="sk-layout__draggable-area">
          <template>
            <draggable
              v-model="_property.elements"
              class="sk-layout__draggable"
              :class="
                layoutAlignment + ' ' + layoutAppearance + ' ' + layoutDirection
              "
              group="components"
              tag="div"
              @add="add"
            >
              <template v-for="element in _property.elements">
                <div
                  v-if="renderingPrimitivesList.includes(element.type)"
                  :key="element.id"
                >
                  <component
                    :is="`SK${element.type}`"
                    :property="element"
                    v-bind="dragOptions"
                    @delItem="delItem(element)"
                    @editItem="editItem(element)"
                    @change="change"
                    @editBeforeAddingComponent="
                      $emit('editBeforeAddingComponent', $event)
                    "
                    @buttonMethodDelete="$emit('buttonMethodDelete', $event)"
                  />
                </div>
              </template>
            </draggable>
          </template>
        </div>
      </div>
    </div>
    <!--region Модальное окно настройки примитивов -->
    <v-dialog v-model="showComponentSetting" max-width="600">
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>
            {{ headerText }}
          </h2>
          <v-btn icon @click="showComponentSetting = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div
          v-if="
            _property.elements[indexComponent] &&
            _property.elements[indexComponent].type === 'button'
          "
          class="dialog__content"
        >
          <form style="display: flex; flex-direction: column" action="">
            <v-text-field
              v-model="_property.elements[indexComponent].label"
              type="text"
            />
            <!--<select v-model="formGeneratorList[indexComponent].style">-->
            <!--  <option>semi</option>-->
            <!--  <option>round</option>-->
            <!--  <option>none</option>-->
            <!--</select>-->
          </form>
          <!--{{ _property.elements[indexComponent] }}-->
        </div>
        <div
          v-if="
            _property.elements[indexComponent] &&
            (_property.elements[indexComponent].type === 'label' ||
              _property.elements[indexComponent].type === 'input')
          "
        >
          <div class="dialog__content">
            <form style="display: flex; flex-direction: column" action="">
              <v-text-field
                v-model="_property.elements[indexComponent].label"
                label="Подпись"
                type="text"
              />
              <div class="d-flex align-center">
                <v-btn-toggle
                  v-model="_property.elements[indexComponent].labelPosition"
                  mandatory
                >
                  <v-btn value="none">
                    <v-icon>mdi-window-close</v-icon>
                  </v-btn>
                  <v-btn value="left">
                    <v-icon>mdi-dock-left</v-icon>
                  </v-btn>
                  <v-btn value="top">
                    <v-icon>mdi-dock-top</v-icon>
                  </v-btn>
                  <v-btn value="bottom">
                    <v-icon>mdi-dock-bottom</v-icon>
                  </v-btn>
                  <v-btn value="right">
                    <v-icon>mdi-dock-right</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <v-spacer />
                <v-btn-toggle
                  v-model="_property.elements[indexComponent].fontStyle"
                  mandatory
                >
                  <v-btn value="compact">
                    <v-icon small>mdi-format-text-variant</v-icon>
                  </v-btn>
                  <v-btn value="regular">
                    <v-icon>mdi-format-text-variant</v-icon>
                  </v-btn>
                  <v-btn value="strong">
                    <v-icon large>mdi-format-text-variant</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <v-spacer />
                <!--<v-select-->
                <!--  v-model="-->
                <!--    formGeneratorList[indexComponent].labelPosition-->
                <!--  "-->
                <!--  hide-details-->
                <!--  outlined-->
                <!--  class="mt-0 mr-5"-->
                <!--  dense-->
                <!--  label="Позиция описания"-->
                <!--  :items="labelPositions"-->
                <!--  item-text="name"-->
                <!--  item-value="position"-->
                <!--/>-->
                <v-btn-toggle
                  v-model="_property.elements[indexComponent].alignment"
                  mandatory
                >
                  <v-btn value="left">
                    <v-icon>mdi-format-align-left</v-icon>
                  </v-btn>
                  <v-btn value="center">
                    <v-icon>mdi-format-align-center</v-icon>
                  </v-btn>
                  <v-btn value="right">
                    <v-icon>mdi-format-align-right</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </div>
              <div class="mt-10 d-flex align-center flex-grow-1">
                <div class="d-flex flex-grow-1">
                  <v-text-field
                    v-model="_property.elements[indexComponent].defaultText"
                    label="Основной текст"
                    type="text"
                  />
                  <!--<v-text-field-->
                  <!--  v-model="_property.elements[indexComponent].sourceData"-->
                  <!--  class="ml-5"-->
                  <!--  label="Динамические данные"-->
                  <!--  type="text"-->
                  <!--/>-->
                  <v-select
                    v-if="DATASET && DATASET.length"
                    v-model="_property.elements[indexComponent].sourceData"
                    :items="DATASET"
                    class="ml-5"
                    label="Динамические данные"
                    type="text"
                  />
                  <v-text-field
                    v-else
                    v-model="_property.elements[indexComponent].sourceData"
                    class="ml-5"
                    label="Динамические данные"
                    type="text"
                  />
                </div>
              </div>
            </form>
          </div>
          <!--<div class="pa-3">-->
          <!--  {{ _property.elements[indexComponent] }}-->
          <!--</div>-->
        </div>
        <div
          v-if="
            _property.elements[indexComponent] &&
            _property.elements[indexComponent].type === 'layout'
          "
        >
          <div class="dialog__content">
            <form style="display: flex; flex-direction: column" action="">
              <v-select
                v-model="_property.elements[indexComponent].grouping"
                :items="primitiveSetting.layout.grouping"
                item-text="name"
                item-value="group"
              />
              <v-select
                v-model="_property.elements[indexComponent].appearance"
                :items="primitiveSetting.layout.appearance"
                item-text="name"
                item-value="view"
              />
              <v-select
                v-model="_property.elements[indexComponent].alignment"
                :items="primitiveSetting.layout.alignment"
                item-text="name"
                item-value="position"
              />
            </form>
          </div>
          <!--{{ _property.elements[indexComponent] }}-->
        </div>
        <div class="dialog__footer">
          <v-btn
            color="success"
            @keydown.enter="showComponentSetting = false"
            @click="showComponentSetting = false"
          >
            Сохранить
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!--endregion-->
  </div>
</template>

<script>
/* eslint-disable */
// import SKLabel from '@/components/Primitives/SKLabel'
// import SKSeparator from '@/components/Primitives/SKSeparator'
// import SKButton from '@/components/Primitives/SKButton'
// import SKLayout from '@/components/Primitives/SKLayout'
import {referencePrimitivesSetting} from "@/common/constants";
import {mapGetters} from "vuex";


export default {
  name: 'SKlayout',
  components: {
    SKlabel: () => import('@/components/Primitives/SKLabel'),
    SKseparator: () => import('@/components/Primitives/SKSeparator'),
    SKbutton: () => import('@/components/Primitives/SKButton'),
    SKlayout: () => import('@/components/Primitives/SKLayout'),
    SKinput: () => import('@/components/Primitives/SKInput'),
  },
  props: {
    property: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  beforeCreate() {

  },
  computed: {
    ...mapGetters(['PROCESSES', 'DATASET']),
    layoutAlignment() {
      return `layout-alignment--${this.property.alignment}`
    },
    layoutAppearance() {
      return `layout-appearance--${this.property.appearance}`
    },
    layoutDirection() {
      return `layout-grouping--${this.property.grouping}`
    },
    dragOptions() {
      return {
        animation: 200,
        group: "components",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    headerText() {
      if (this._property?.elements[this.indexComponent]) {
        return this.names[this._property.elements[this.indexComponent].type]
      }
      return ''
    }
  },
  data() {
    return {
      names: {
        label: 'Текстовое поле',
        button: 'Кнопка',
        layout: 'Контейнер',
        separator: 'Разделитель',
      },
      primitiveSetting: referencePrimitivesSetting,
      drag: false,
      globalID: 0,
      dynamicData: false,
      showComponentSetting: false,
      indexComponent: '',
      _property: {},
      renderingPrimitivesList: [
        'layout', 'label', 'separator', 'button', 'input'
      ],
    }
  },
  beforeMount() {
    this.propsInit()
  },
  methods: {
    propsInit() {
      this._property = this.property
    },
    add(evt){
      // console.log(evt)
      this.$emit('editBeforeAddingComponent', evt)
    },
    deleteMethod(item) {
      console.log('Удаление кнопки из методов')
      console.log(item)
      this.$emit('buttonMethodDelete', item.id)
    },
    delItem(item) {
      if (item.type === 'button') {
        this.deleteMethod(item)
      }
      console.log(item)
      this.property.elements = this.property.elements.filter(
        (el) => item !== el
      )
    },
    editItem(item) {
      this.indexComponent = this.property.elements.findIndex(
        (el) => item.id === el.id
      )
      console.log(item)
      this.showComponentSetting = true
    },
    change(args) {
      this.indexComponent = this._property.elements.findIndex(
        (el) => args.item.id === el.id
      )
      console.log(this.indexComponent)
      console.log(this._property.elements[this.indexComponent])
      if (!args.el) {
        this._property.elements[this.indexComponent].label = args.text
      }
      if (args.el) {
        this._property.elements[this.indexComponent][args.el] = args.text
      }
    },
  },
}
</script>

<style scoped lang="scss">
.sk-layout-wrapper {
  cursor: grab;
  display: flex;
  flex-direction: column;

  &__bar {
    display: flex;
    align-items: center;
    border-bottom: 1px #5a7b8630 solid;
  }
}
.sk-layout {
  padding: 3px 5px;
  flex-direction: column;
  display: flex;
  column-gap: 5px;
  row-gap: 10px;
  cursor: grab;
  flex: 1 1;
  min-width: 480px;

  &__draggable-area {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    padding: 15px 15px;
    background-color: #bbbbbb30;
  }
  &__draggable {
    min-width: 500px;
    display: flex;
    flex-direction: column;
    min-height: 80px;
    row-gap: 10px;
  }
}
</style>
