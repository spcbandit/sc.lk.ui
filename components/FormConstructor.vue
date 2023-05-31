<template>
  <div class="forms-list-block">
    <div class="forms-constructor-wrapper">
      <!-- region Примитивы -->
      <div class="primitive-wrapper">
        <draggable
          v-model="primitiveList"
          :group="{
            name: 'components',
            pull: 'clone',
            put: false,
          }"
          :sort="false"
          :clone="cloneComponent"
          class="primitive-list"
          :class="collapse.primitives ? 'collapse-block' : ''"
        >
          <template v-for="element in primitiveList">
            <SKPrimitiveButton :key="element.type" :primitive="element" />
          </template>
        </draggable>
        <SizeHandler
          left-size-handler
          :collapse="collapse.primitives"
          @collapse="collapse.primitives = !collapse.primitives"
        />
      </div>
      <!-- endregion -->
      <!-- region Конструктор формы-->
      <div ref="formConstructor" class="forms-constructor-block">
        <div
          class="forms-constructor"
          :class="collapse.formConstructor ? 'collapse-block' : ''"
        >
          <!--<div style="word-break: break-all" class="">{{ temporaryForm }}</div>-->
          <div class="forms-constructor__tools">
            <v-tooltip open-delay="300" top color="#fff">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  depressed
                  large
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
                  @click="$emit('setStyle')"
                >
                  <v-icon color="secondary">mdi-cog-outline</v-icon>
                </v-btn>
              </template>
              <span style="color: #000">Настроить глобальные стили формы</span>
            </v-tooltip>
            <v-tooltip open-delay="300" top color="#fff">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  depressed
                  large
                  color="secondary"
                  v-bind="attrs"
                  v-on="on"
                  @click="$emit('addForm')"
                >
                  <v-icon color="secondary">mdi-plus</v-icon>
                </v-btn>
              </template>
              <span style="color: #000">Добавить форму</span>
            </v-tooltip>
            <v-divider vertical class="mx-1" />
            <v-tooltip open-delay="300" top color="#fff">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  depressed
                  large
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="saveForm()"
                >
                  <v-icon color="primary">mdi-cloud-upload-outline</v-icon>
                </v-btn>
              </template>
              <span style="color: #000">Сохранить форму</span>
            </v-tooltip>
            <v-tooltip open-delay="300" top color="#fff">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  depressed
                  large
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="$emit('preview')"
                >
                  <v-icon color="primary">mdi-eye-outline</v-icon>
                </v-btn>
              </template>
              <span style="color: #000">Предпросмотр</span>
            </v-tooltip>
            <v-divider vertical class="mx-1" />
            <v-tooltip open-delay="300" top color="#fff">
              <template #activator="{ on, attrs }">
                <v-btn
                  class="mr-auto"
                  icon
                  depressed
                  large
                  color="success"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="success">mdi-cloud-upload</v-icon>
                </v-btn>
              </template>
              <span style="color: #000">
                Сохранить конфигурацию бизнес процесса
              </span>
            </v-tooltip>
            <v-tooltip open-delay="300" top color="#fff">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  depressed
                  large
                  color="warning"
                  v-bind="attrs"
                  v-on="on"
                  @click="clearThisForm"
                >
                  <v-icon color="warning">mdi-autorenew</v-icon>
                </v-btn>
              </template>
              <span style="color: #000">Очистить текущую форму</span>
            </v-tooltip>
            <v-divider vertical class="mx-1" />
            <v-tooltip open-delay="300" top color="#fff">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  depressed
                  large
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                  @click="$emit('deleteAll')"
                >
                  <v-icon color="error">mdi-nuke</v-icon>
                </v-btn>
              </template>
              <span style="color: #000">Удалить все формы бизнес процесса</span>
            </v-tooltip>
            <v-btn icon :loading="loading" />
          </div>
          <div class="forms-constructor__area">
            <draggable
              :list="temporaryForm"
              class="forms-constructor__list"
              tag="div"
              group="components"
              v-bind="dragOptions"
              @add="editBeforeAddingComponent"
              @start="drag = true"
              @end="drag = false"
            >
              <component
                :is="`SK${element.type}`"
                v-for="element in temporaryForm"
                :key="element.id"
                :property="element"
                @delItem="delItem(element)"
                @editItem="editItem(element)"
                @change="change"
              />
            </draggable>
          </div>
        </div>
        <SizeHandler
          left-size-handler
          :collapse="collapse.formConstructor"
          @collapse="collapse.formConstructor = !collapse.formConstructor"
        />
      </div>
      <!-- endregion -->
      <!--region Модальные окна настройки компонента-->
      <v-dialog v-model="showComponentSetting" max-width="600">
        <v-card class="dialog">
          <div class="dialog__header">
            <h2>
              {{
                temporaryForm[indexComponent] &&
                temporaryForm[indexComponent].type
                  ? temporaryForm[indexComponent].type
                  : 'Настройка компонента'
              }}
            </h2>
            <v-btn icon @click="showComponentSetting = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <div
            v-if="
              temporaryForm[indexComponent] &&
              temporaryForm[indexComponent].type === 'button'
            "
            class="dialog__content"
          >
            <form style="display: flex; flex-direction: column" action="">
              <v-text-field
                v-model="temporaryForm[indexComponent].label"
                type="text"
              />
              <!--<select v-model="temporaryForm[indexComponent].style">-->
              <!--  <option>semi</option>-->
              <!--  <option>round</option>-->
              <!--  <option>none</option>-->
              <!--</select>-->
            </form>
            {{ temporaryForm[indexComponent] }}
          </div>
          <div
            v-if="
              temporaryForm[indexComponent] &&
              temporaryForm[indexComponent].type === 'label'
            "
          >
            <div class="dialog__content">
              <form style="display: flex; flex-direction: column" action="">
                <v-text-field
                  v-model="temporaryForm[indexComponent].label"
                  label="Описание"
                  type="text"
                />
                <div class="d-flex align-center">
                  <v-btn-toggle
                    v-model="temporaryForm[indexComponent].labelPosition"
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
                    v-model="temporaryForm[indexComponent].fontStyle"
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
                  <!--    temporaryForm[indexComponent].labelPosition-->
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
                    v-model="temporaryForm[indexComponent].alignment"
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
                      v-model="temporaryForm[indexComponent].defaultText"
                      label="Основной текст"
                      type="text"
                    />
                    <v-text-field
                      v-model="temporaryForm[indexComponent].sourceData"
                      label="Динамические данные"
                      type="text"
                    />
                  </div>
                </div>
              </form>
            </div>
            {{ temporaryForm[indexComponent] }}
          </div>
          <div
            v-if="
              temporaryForm[indexComponent] &&
              temporaryForm[indexComponent].type === 'layout'
            "
          >
            <div class="dialog__content">
              <form style="display: flex; flex-direction: column" action="">
                <v-select
                  v-model="temporaryForm[indexComponent].grouping"
                  :items="primitiveSetting.layout.grouping"
                  item-text="name"
                  item-value="group"
                />
                <v-select
                  v-model="temporaryForm[indexComponent].appearance"
                  :items="primitiveSetting.layout.appearance"
                  item-text="name"
                  item-value="view"
                />
                <v-select
                  v-model="temporaryForm[indexComponent].alignment"
                  :items="primitiveSetting.layout.alignment"
                  item-text="name"
                  item-value="position"
                />
              </form>
            </div>
            {{ temporaryForm[indexComponent] }}
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
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import SKPrimitiveButton from '@/components/Primitives/SKPrimitiveButton'
import ModalWindow from '@/components/Modals/ModalWindow'
import SizeHandler from '@/components/UIComponents/SizeHandler'
import {
  referencePrimitiveList,
  referencePrimitivesSetting,
} from '@/common/constants'

export default {
  name: 'FormConstructor',
  components: {
    SizeHandler,
    ModalWindow,
    SKlabel: () => import('@/components/Primitives/SKLabel'),
    SKseparator: () => import('@/components/Primitives/SKSeparator'),
    SKbutton: () => import('@/components/Primitives/SKButton'),
    SKlayout: () => import('@/components/Primitives/SKLayout'),
    SKPrimitiveButton,
  },
  layout: 'default',
  props: {
    form: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      drag: false,
      primitiveList: referencePrimitiveList,
      primitiveSetting: referencePrimitivesSetting,
      temporaryForm: [],
      dynamicData: false,
      labelAligment: [
        {
          position: 'center',
          name: '',
        },
        {
          position: 'left',
          name: 'Слева',
        },
        {
          position: 'right',
          name: 'Справа',
        },
      ],
      labelPositions: [
        {
          position: 'none',
          name: 'Нет',
        },
        {
          position: 'left',
          name: 'Слева',
        },
        {
          position: 'right',
          name: 'Справа',
        },
        {
          position: 'top',
          name: 'Сверху',
        },
        {
          position: 'bottom',
          name: 'Снизу',
        },
      ],
      colorPickerMenu: {
        compactFontColor: false,
        regularFontColor: false,
        strongFontColor: false,
        background: false,
        backgroundColor: false,
      },
      collapse: {
        primitives: false,
        formConstructor: false,
        methods: false,
      },
      textComponent: '',
      indexComponent: '',
      showFormSetting: false,
      showComponentSetting: false,
      IdGlobal: 0,
      cornerStyle: [
        {
          name: 'Rounded',
          value: 'round',
        },
        {
          name: 'Crisp',
          value: 'none',
        },
        {
          name: 'Semi',
          value: 'semi',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['PROCESSES', 'BUSINESS_PROCESS']),
    dragOptions() {
      return {
        animation: 200,
        group: 'components',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
  beforeMount() {
    this.temporaryForm = this.PROCESSES.forms[this.form].elements
  },
  methods: {
    clearThisForm() {
      this.temporaryForm = []
      this.PROCESSES.forms[this.form].elements = this.temporaryForm
    },
    loggerList(evt) {
      console.log('onChange', evt)
    },
    move(evt) {
      console.log('move', evt)
    },
    cloneComponent(evt) {
      console.log('Clone', evt)
      evt.id = `formElement__${this.IdGlobal++}`
      return { ...evt }
    },
    editBeforeAddingComponent(evt) {
      console.log(evt.clone.innerText)
      this.indexComponent = evt.newIndex
      if (evt?.clone?.innerText !== ' Разделитель') {
        // this.showComponentSetting = true
      }
    },
    delItem(item) {
      this.temporaryForm = this.temporaryForm.filter((el) => item !== el)
    },
    editItem(item) {
      console.log(item)
      this.indexComponent = this.temporaryForm.findIndex(
        (el) => item.id === el.id
      )
      this.showComponentSetting = true
    },
    change(args) {
      console.log(this.temporaryForm)

      this.indexComponent = this.temporaryForm.findIndex(
        (el) => args.item.id === el.id
      )
      if (!args.el) {
        this.temporaryForm[this.indexComponent].label = args.text
      }
      if (args.el) {
        this.temporaryForm[this.indexComponent][args.el] = args.text
      }
    },
  },
}
</script>

<style scoped lang="scss">
.forms-list-block {
  position: sticky;
  bottom: 0;
  display: flex;
  background-color: #fff;
}

.forms-constructor-wrapper {
  display: flex;
  flex: 1 1;
}
.primitive-wrapper {
  display: flex;
  flex: 0 1;
  padding: 0;
  background-color: #fafafa;
}
.primitive-list {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  padding: 24px 0 24px 24px;
}
.forms-constructor-block {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex: 1 1;
  justify-content: center;
}
.forms-constructor {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1;

  &__tools {
    display: flex;
    flex-wrap: nowrap;
    padding: 10px 6px 3px 0;
    margin-left: 30px;
    column-gap: 5px;
    border-bottom: 1px solid #0971c750;
  }

  &__area {
    min-width: 650px;
    position: relative;
    border-radius: 6px;
    padding: 3px;
    display: flex;
    border: 2px solid #5a7b8650;
    flex-direction: column;
    flex: 1 1;
    background-color: white;
    margin: 30px 6px 30px 30px;
    -webkit-box-shadow: 0px 4px 23px 0px rgba(34, 60, 80, 0.1);
    -moz-box-shadow: 0px 4px 23px 0px rgba(34, 60, 80, 0.1);
    box-shadow: 0px 4px 23px 0px rgba(34, 60, 80, 0.1);

    &::before {
      display: flex;
      text-align: center;
      align-self: center;
      align-content: center;
      justify-content: center;
      content: 'максимальная ширина терминала, 480px';
      text-transform: uppercase;
      position: absolute;
      top: -15px;
      width: 480px;
      height: 15px;
      color: #777;
      border-left: 1px solid #d0d0d0;
      font-size: 10px;
      font-weight: 300;
      border-right: 1px solid #d0d0d0;
    }

    &__footer {
      margin: 20px;
      display: flex;
      justify-content: center;
      padding-top: 20px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    flex: 1 1;
  }
}

.tools-button {
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  background-color: #f37759;
  border-radius: 3px;
  padding: 5px 10px 5px 10px;
}
.collapse-block {
  padding: 0 !important;
  min-width: 0 !important;
  max-width: 0 !important;
  width: 0 !important;
  overflow: hidden;
}

.form-row {
  column-gap: 15px;
  &__label {
    flex: 1 1;
  }
}
</style>
