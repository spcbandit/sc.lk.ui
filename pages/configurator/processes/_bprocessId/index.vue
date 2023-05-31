<template>
  <div class="constructor-wrapper">
    <!--<div
      :style="`min-height: calc(100vh - ${formListHeight}px); max-height: calc(100vh - ${formListHeight}px);`"
      class="constructor-block"
    >
      <div class="constructor-forms">
        <div class="primitives-list-wrapper">
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
        </div>
        <div v-if="!$fetchState.pending" class="form-constructor-wrapper">
          &lt;!&ndash;<span style="word-break: break-all">&ndash;&gt;
          &lt;!&ndash;  {{ Object.keys(processes.forms) }}&ndash;&gt;
          &lt;!&ndash;  {{ $fetchState.pending }}&ndash;&gt;
          &lt;!&ndash;</span>&ndash;&gt;
          <draggable
            :list="processes.forms[indexForm].elements"
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
              v-for="element in processes.forms[indexForm].elements"
              :key="element.id"
              :style-component="processes.style"
              :property="element"
              :text-color="getContrast50(processes.style.colorTheme)"
              @delItem="delItem(element)"
              @editItem="editItem(element)"
              @change="change"
            />
          </draggable>
        </div>
      </div>
      <div class="constructor-methods">
        <div class="method-constructor-wrapper">123</div>
        <div class="methods-list-wrapper">123</div>
      </div>
    </div>
    <div class="forms-list">
      <SKFormList
        :form-list="processes.forms"
        @formSelect="changeForms"
        @changeHeight="heightConstructor"
      />
    </div>-->

    <div
      :style="`min-height: calc(100vh - ${
        formListHeight + 48
      }px); max-height: calc(100vh - ${formListHeight + 48}px);`"
      class="constructor-block"
    >
      <!-- region Конструктор форм -->

      <div class="forms-list-block">
        <div class="forms-constructor-wrapper">
          <!-- region Примитивы -->
          <div class="primitive-wrapper">
            <div
              class="primitive-list"
              :class="collapse.primitives ? 'collapse-block' : ''"
            >
              <v-btn
                text
                color="primary"
                class="justify-start align-self-start"
                nuxt
                to="/configurator/processes"
              >
                <v-icon>mdi-chevron-left</v-icon>
                Назад
              </v-btn>
              <v-divider class="my-1" />
              <draggable
                v-model="primitiveList"
                :group="{
                  name: 'components',
                  pull: 'clone',
                  put: false,
                }"
                :sort="false"
                :clone="cloneComponent"
                class="d-flex"
                style="flex-direction: column; row-gap: 10px"
              >
                <template v-for="element in primitiveList">
                  <SKPrimitiveButton :key="element.type" :primitive="element" />
                </template>
              </draggable>
            </div>
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
                      @click="businessProcessStyleDialog = true"
                    >
                      <v-icon color="secondary">mdi-format-color-fill</v-icon>
                    </v-btn>
                  </template>
                  <span style="color: #000">Настроить стили для форм</span>
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
                      @click="businessProcessSettingDialog = true"
                    >
                      <v-icon color="secondary">mdi-cog-outline</v-icon>
                    </v-btn>
                  </template>
                  <span style="color: #000">Настройки бизнесс процесса</span>
                </v-tooltip>
                <!--<v-tooltip open-delay="300" top color="#fff">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      depressed
                      large
                      color="secondary"
                      v-bind="attrs"
                      v-on="on"
                      @click="addFormDialog = true"
                    >
                      <v-icon color="secondary">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span style="color: #000">Добавить форму</span>
                </v-tooltip>-->
                <v-divider vertical class="mx-1" />
                <!--<v-tooltip open-delay="300" top color="#fff">
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
                </v-tooltip>-->
                <v-tooltip open-delay="300" top color="#fff">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      depressed
                      large
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      @click="previewForm = !previewForm"
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
                      <v-icon color="success" @click="saveBusinessProcess">
                        mdi-cloud-upload
                      </v-icon>
                    </v-btn>
                  </template>
                  <span style="color: #000">
                    Сохранить конфигурацию бизнес процесса
                  </span>
                </v-tooltip>
                <!--<v-tooltip open-delay="300" top color="#fff">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      class="mr-auto"
                      icon
                      depressed
                      large
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="primary" @click="saveBusinessProcessPost">
                        mdi-cloud-upload
                      </v-icon>
                    </v-btn>
                  </template>
                  <span style="color: #000">
                    Сохранить конфигурацию бизнес процесса (POST)
                  </span>
                </v-tooltip>-->
                <!--<v-tooltip open-delay="300" top color="#fff">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      class="mr-auto"
                      icon
                      depressed
                      large
                      color="warning"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="warning" @click="saveBusinessProcessGet">
                        mdi-cloud-upload
                      </v-icon>
                    </v-btn>
                  </template>
                  <span style="color: #000">
                    Сохранить конфигурацию бизнес процесса (GET)
                  </span>
                </v-tooltip>-->
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
                      <v-icon color="warning">mdi-delete-outline</v-icon>
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
                      @click="deleteAllForms"
                    >
                      <v-icon color="error">mdi-nuke</v-icon>
                    </v-btn>
                  </template>
                  <span style="color: #000">
                    Удалить все формы бизнес процесса
                  </span>
                </v-tooltip>
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
                  <template v-for="element in temporaryForm">
                    <component
                      :is="`SK${element.type}`"
                      v-if="renderingPrimitivesList.includes(element.type)"
                      :key="element.id"
                      :property="element"
                      @delItem="delItem(element)"
                      @editItem="editItem(element)"
                      @buttonMethodDelete="deleteMethod"
                      @editBeforeAddingComponent="editBeforeAddingComponent"
                      @change="change"
                    />
                  </template>
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
        </div>
      </div>
      <!-- endregion -->

      <!--region Конструктор методов-->
      <!--<MethodsConstructor />-->

      <div class="methods-constructor-wrapper">
        <!-- region Конструктор методов -->
        <div
          v-if="!$fetchState.pending"
          class="methods-constructor-block"
          :class="
            linkMethodName ? 'methods-constructor-block--adding-method' : ''
          "
          @drop="onDrop($event)"
          @dragover.prevent
          @dragenter.prevent
        >
          <!--<resize-observer @notify="handleResize" />-->
          <!--<div style="position: absolute">-->
          <!--  {{ dragEl.x }}-->
          <!--  {{ dragEl.y }}-->
          <!--  {{ dragEl.id }}-->
          <!--</div>-->
          <!--<div style="position: absolute; right: 0; z-index: 0">
            <pre
              :style="`
                max-width: 300px;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 12px;
                opacity: 0.7;
                text-align: left;
                height: 700px;
                overflow: auto;
                `"
            >
              {{ processes.forms[selectedForm] }}
            </pre>
          </div>-->

          <svg
            :height="svgHeight()"
            :width="svgWight()"
            style="position: absolute; z-index: 0"
          >
            <template v-for="(value, elementName) in elementsList">
              <path
                v-if="
                  value.success && value.success.length && value.x && value.y
                "
                :key="'lineSuccess' + value.id"
                fill="transparent"
                stroke="#ceeba8"
                stroke-width="2"
                :d="`
                M ${value.x + value.w / 4} ${value.y + value.h}
                C ${value.x + value.w / 4} ${value.y + value.h + 30}
                  ${
                    elementsList[value.success].x +
                    elementsList[value.success].w / 2
                  }
                  ${elementsList[value.success].y - 30}
                  ${
                    elementsList[value.success].x +
                    elementsList[value.success].w / 2
                  }
                  ${elementsList[value.success].y}
                `"
                @click="deleteMethodLink(elementName, 'success')"
              />
              <path
                v-if="value.failure && value.failure.length"
                :key="'lineError' + value.id"
                fill="transparent"
                stroke="#e9cfcb"
                stroke-width="2"
                :d="`
                M ${value.x + value.w / 4 + value.w / 2} ${value.y + value.h}
                C ${value.x + value.w / 4 + value.w / 2} ${
                  value.y + value.h + 30
                }
                  ${
                    elementsList[value.failure].x +
                    elementsList[value.failure].w / 2
                  }
                  ${elementsList[value.failure].y - 30}
                  ${
                    elementsList[value.failure].x +
                    elementsList[value.failure].w / 2
                  }
                  ${elementsList[value.failure].y}
                `"
                @click="deleteMethodLink(elementName, 'failure')"
              />
              <path
                v-if="value.loaded && value.loaded.length"
                :key="'lineLoaded' + value.id"
                fill="transparent"
                stroke="#ceeba8"
                stroke-width="2"
                :d="`
                M ${value.x + value.w / 8} ${value.y + value.h}
                C ${value.x + value.w / 8} ${value.y + value.h + 30}
                  ${
                    elementsList[value.loaded].x +
                    elementsList[value.loaded].w / 2
                  }
                  ${elementsList[value.loaded].y - 30}
                  ${
                    elementsList[value.loaded].x +
                    elementsList[value.loaded].w / 2
                  }
                  ${elementsList[value.loaded].y}
                `"
                @click="deleteMethodLink(elementName, 'loaded')"
              />
              <path
                v-if="value.resume && value.resume.length"
                :key="'lineResume' + value.id"
                fill="transparent"
                stroke="#ebe9a8"
                stroke-width="2"
                :d="`
                M ${value.x + value.w / 8 + value.w / 4} ${value.y + value.h}
                C ${value.x + value.w / 8 + value.w / 4} ${
                  value.y + value.h + 30
                }
                  ${
                    elementsList[value.resume].x +
                    elementsList[value.resume].w / 2
                  }
                  ${elementsList[value.resume].y - 30}
                  ${
                    elementsList[value.resume].x +
                    elementsList[value.resume].w / 2
                  }
                  ${elementsList[value.resume].y}
                `"
                @click="deleteMethodLink(elementName, 'resume')"
              />
              <path
                v-if="value.closed && value.closed.length"
                :key="'lineClosed' + value.id"
                fill="transparent"
                stroke="#e6cfab"
                stroke-width="2"
                :d="`
                M ${value.x + value.w / 8 + value.w / 2} ${value.y + value.h}
                C ${value.x + value.w / 8 + value.w / 2} ${
                  value.y + value.h + 30
                }
                  ${
                    elementsList[value.closed].x +
                    elementsList[value.closed].w / 2
                  }
                  ${elementsList[value.closed].y - 30}
                  ${
                    elementsList[value.closed].x +
                    elementsList[value.closed].w / 2
                  }
                  ${elementsList[value.closed].y}
                `"
                @click="deleteMethodLink(elementName, 'closed')"
              />
              <path
                v-if="value.scan && value.scan.length"
                :key="'lineScan' + value.id"
                fill="transparent"
                stroke="#aadfdb"
                stroke-width="2"
                :d="`
                M ${value.x + value.w / 8 + value.w / 2 + value.w / 4} ${
                  value.y + value.h
                }
                C ${value.x + value.w / 8 + value.w / 2 + value.w / 4} ${
                  value.y + value.h + 30
                }
                  ${elementsList[value.scan].x + elementsList[value.scan].w / 2}
                  ${elementsList[value.scan].y - 30}
                  ${elementsList[value.scan].x + elementsList[value.scan].w / 2}
                  ${elementsList[value.scan].y}
                `"
                @click="deleteMethodLink(elementName, 'scan')"
              />
              <path
                v-if="value.click && value.click.length"
                :key="'lineClick' + value.id"
                fill="transparent"
                stroke="#aadfdb"
                stroke-width="2"
                :d="`
                M ${value.x + value.w / 2} ${value.y + value.h}
                C ${value.x + value.w / 2} ${value.y + value.h + 30}
                  ${
                    elementsList[value.click].x +
                    elementsList[value.click].w / 2
                  }
                  ${elementsList[value.click].y - 30}
                  ${
                    elementsList[value.click].x +
                    elementsList[value.click].w / 2
                  }
                  ${elementsList[value.click].y}
                `"
                @click="deleteMethodLink(elementName, 'scan')"
              />
            </template>
          </svg>

          <template v-for="(value, methodName) in elementsList">
            <DragNDrop
              :id="methodName"
              :key="methodName"
              :ref="methodName"
              :x="value.x"
              :y="value.y"
              :class-name="'method'"
              :class-name-dragging="'method--drag'"
              :class-name-active="'method--active'"
              :drag-handle="'.method--header'"
              :enable-native-drag="false"
              :resizable="false"
              :w="value.w"
              :z="processes.info.globalID"
              h="auto"
              :on-drag="onDragCallback"
              @dragstop="(left, top) => dragStop(methodName, value, left, top)"
            >
              <!--@dragging="(left, top) => dragStop(methodName, value, left, top)"-->
              <!--@dragging="(left, top) => onDragCallback(element.id, left, top)"-->
              <!--:style="linkMethodName ? 'background-color: red' : ''"-->
              <!--<div v-if="methodName === 'form_events'" class="method&#45;&#45;header">
                <p class="mr-auto">
                  {{ 'Форма: ' + processes.forms[selectedForm].name }}
                </p>
              </div>
              <div
                v-else-if="methodName.includes('button')"
                class="method&#45;&#45;header"
              >
                <p class="mr-auto">{{ value.operation }}</p>
              </div>
              <div
                v-else
                :class="
                  linkMethodName ? 'method-button__header&#45;&#45;adding_method' : ''
                "
                class="method&#45;&#45;header"
                @click="addMethodLink(methodName)"
                @dblclick="collapseElement(value, methodName)"
              >
                <v-icon
                  class="ml-1"
                  @click="collapseElement(value, methodName)"
                >
                  {{ value.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
                <p class="mr-auto">{{ value.operation }}</p>
                <v-icon class="mr-2" @click="deleteMethod(methodName)">
                  mdi-close
                </v-icon>
              </div>
              <div
                v-if="
                  methodName !== 'form_events' || methodName.includes('button')
                "
                class="method-button__content"
              >
                <div
                  class="method-button__parameters"
                  :class="
                    !value.expanded ? 'method-button__parameters&#45;&#45;collapse' : ''
                  "
                >
                  <p
                    class="ma-0 pa-0"
                    style="opacity: 0.6"
                    @input="parametersInput($event, value, methodName)"
                    @blur="saveInput($event, value, methodName)"
                  >
                    id: {{ methodName }}
                  </p>
                  <p
                    class="method-button__editable-text"
                    contenteditable="true"
                    @input="parametersInput($event, value, methodName)"
                    @blur="saveInput($event, value, methodName)"
                  >
                    {{ value.parameters }}
                  </p>
                </div>
              </div>
              <div class="method-button__footer">
                <template v-if="methodName === 'form_events'">
                  <span
                    style="background-color: #777777"
                    class="py-2"
                    @drop.stop="onDrop($event, 'onLoaded', methodName)"
                    @click="selectMethod(methodName, 'loaded', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'loaded'
                        ? `&times;`
                        : '{ loaded }'
                    }}
                  </span>
                  <span
                    style="background-color: #777777"
                    class="py-2"
                    @drop.stop="onDrop($event, 'onResume', methodName)"
                    @click="selectMethod(methodName, 'resume', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'resume'
                        ? `&times;`
                        : '{ resume }'
                    }}
                  </span>
                  <span
                    style="background-color: #777777"
                    class="py-2"
                    @drop.stop="onDrop($event, 'onClosed', methodName)"
                    @click="selectMethod(methodName, 'closed', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'closed'
                        ? `&times;`
                        : '{ closed }'
                    }}
                  </span>
                  <span
                    style="background-color: #777777"
                    class="py-2"
                    @drop.stop="onDrop($event, 'onScan', methodName)"
                    @click="selectMethod(methodName, 'scan', value)"
                  >
                    {{
                      linkMethodName === methodName && linkMethodType === 'scan'
                        ? `&times;`
                        : '{ scan }'
                    }}
                  </span>
                </template>
                <template v-else-if="methodName.includes('button')">
                  <span
                    :style="`background-color: #FFC107`"
                    class="py-2"
                    @drop.stop="onDrop($event, 'onClick', methodName)"
                    @click="selectMethod(methodName, 'click', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'click'
                        ? `&times;`
                        : '{ click }'
                    }}
                  </span>
                </template>
                <template v-else>
                  <span
                    class="py-2"
                    @drop.stop="onDrop($event, 'onSuccess', methodName)"
                    @click="selectMethod(methodName, 'success', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'success'
                        ? `&times;`
                        : '{ success }'
                    }}
                  </span>
                  <span
                    @drop.stop="onDrop($event, 'onFailure', methodName)"
                    @click="selectMethod(methodName, 'failure', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'failure'
                        ? `&times;`
                        : '{ failure }'
                    }}
                  </span>
                </template>
              </div>-->
              <div
                v-if="value.type === 'form_events'"
                class="method__form_events"
              >
                <div class="method__form_events--header method--header">
                  <p class="mr-auto ma-0">
                    {{
                      processes.forms[selectedForm].name
                        ? 'Форма: ' + processes.forms[selectedForm].name
                        : 'Форма: Без названия'
                    }}
                  </p>
                  <v-btn icon small @click="copyId">
                    <v-icon small>mdi-content-copy</v-icon>
                  </v-btn>
                  <v-btn icon small @click="copyMethods">
                    <v-icon small>mdi-download</v-icon>
                  </v-btn>
                </div>
                <div class="method__form_events--footer">
                  <span
                    style="background-color: #c3dfaa"
                    @drop.stop="onDrop($event, 'onLoaded', methodName)"
                    @click="selectMethod(methodName, 'loaded', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'loaded'
                        ? `&times;`
                        : '{ loaded }'
                    }}
                  </span>
                  <span
                    style="background-color: #ebe9a8"
                    @drop.stop="onDrop($event, 'onResume', methodName)"
                    @click="selectMethod(methodName, 'resume', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'resume'
                        ? `&times;`
                        : '{ resume }'
                    }}
                  </span>
                  <span
                    style="background-color: #e6cfab"
                    @drop.stop="onDrop($event, 'onClosed', methodName)"
                    @click="selectMethod(methodName, 'closed', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'closed'
                        ? `&times;`
                        : '{ click }'
                    }}
                  </span>
                  <span
                    style="background-color: #aadfdb"
                    @drop.stop="onDrop($event, 'onScan', methodName)"
                    @click="selectMethod(methodName, 'scan', value)"
                  >
                    {{
                      linkMethodName === methodName && linkMethodType === 'scan'
                        ? `&times;`
                        : '{ scan }'
                    }}
                  </span>
                </div>
              </div>
              <div v-else-if="value.type === 'event'" class="method__event">
                <div
                  class="method__event--header method--header"
                  :class="linkMethodName ? 'method--header--adding_method' : ''"
                  @click="addMethodLink(methodName)"
                  @dblclick="collapseElement(value, methodName)"
                >
                  <v-btn small icon @click="collapseElement(value, methodName)">
                    <v-icon>
                      {{
                        value.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
                      }}
                    </v-icon>
                  </v-btn>

                  <p
                    class="ml-2 mr-auto mb-0"
                    :style="`overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;`"
                  >
                    {{ value.name }}
                  </p>
                  <v-btn small icon @click="deleteMethod(methodName)">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </div>
                <div
                  class="method__event--content pt-2"
                  :class="
                    !value.expanded ? 'method-button__parameters--collapse' : ''
                  "
                >
                  <div style="flex: 1 1" class="d-flex align-center">
                    <!--<span-->
                    <!--  class="ml-2"-->
                    <!--  style="font-size: 12px; letter-spacing: 0.5px"-->
                    <!--&gt;-->
                    <!--  {{ value.operation }}-->
                    <!--</span>-->
                    <!--<v-btn-->
                    <!--  class="ml-auto"-->
                    <!--  icon-->
                    <!--  small-->
                    <!--  @click="addParameters(methodName)"-->
                    <!--&gt;-->
                    <!--  <v-icon color="#aaa">mdi-help-circle-outline</v-icon>-->
                    <!--</v-btn>-->
                  </div>
                  <!--<v-divider v-if="value.parameters.length" class="mb-1" />-->
                  <div
                    v-for="(item, index) of value.parameters"
                    :key="`parameters_${index}`"
                    class="d-flex align-start ml-1 mb-1"
                    style="flex-direction: column"
                  >
                    <span style="font-size: 11px; opacity: 60%">
                      {{ item.label }}
                    </span>
                    <div class="d-flex">
                      <div
                        v-if="
                          elementsList[methodName].parameters[index].type ===
                          'input'
                        "
                        class="method__event--content__input"
                      >
                        <v-textarea
                          v-model="
                            elementsList[methodName].parameters[index].value
                          "
                          hide-details
                          dense
                          full-width
                          color="primary"
                          outlined
                          auto-grow
                          rows="1"
                          row-height="15px"
                          class="ma-0 pa-0"
                        />
                      </div>
                      <div
                        v-if="
                          elementsList[methodName].parameters[index].type ===
                          'select'
                        "
                        class="method__event--content__select"
                      >
                        <v-select
                          v-if="
                            elementsList[methodName].operation === 'show.frame'
                          "
                          v-model="
                            elementsList[methodName].parameters[index].value
                          "
                          :items="Object.values(processes.forms)"
                          item-text="name"
                          item-value="name"
                          hide-details
                          outlined
                          full-width
                          dense
                          class="method__event--content__select ma-0 pa-0"
                        />
                        <v-select
                          v-if="
                            elementsList[methodName].operation !== 'show.frame'
                          "
                          v-model="
                            elementsList[methodName].parameters[index].value
                          "
                          :items="
                            elementsList[methodName].parameters[index].enum
                          "
                          item-text="label"
                          item-value="value"
                          hide-details
                          dense
                          outlined
                          class="method__event--content__select ma-0 pa-0"
                        />
                      </div>

                      <v-tooltip
                        max-width="300px"
                        right
                        color="primary"
                        z-index="999999999999"
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            class="ml-auto"
                            icon
                            small
                            v-bind="attrs"
                            v-on="on"
                          >
                            <!--@click="deleteParameters(methodName, index)"-->
                            <v-icon color="#aaa">
                              mdi-help-circle-outline
                            </v-icon>
                          </v-btn>
                        </template>
                        <span v-html="item.description" />
                      </v-tooltip>
                    </div>
                  </div>
                </div>
                <div class="method__event--footer">
                  <span
                    style="background-color: #c3dfaa"
                    @drop.stop="onDrop($event, 'onSuccess', methodName)"
                    @click="selectMethod(methodName, 'success', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'success'
                        ? `&times;`
                        : '{ success }'
                    }}
                  </span>
                  <span
                    style="background-color: #e9cfcb"
                    @drop.stop="onDrop($event, 'onFailure', methodName)"
                    @click="selectMethod(methodName, 'failure', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'failure'
                        ? `&times;`
                        : '{ failure }'
                    }}
                  </span>
                </div>
              </div>
              <div v-else-if="value.type === 'button'" class="method__button">
                <div class="method__button--header method--header">
                  <p class="mr-auto mb-0">Кнопка: {{ value.operation }}</p>
                </div>
                <div class="method__button--footer">
                  <span
                    style="background-color: #aadfdb"
                    class="py-2"
                    @drop.stop="onDrop($event, 'onClick', methodName)"
                    @click="selectMethod(methodName, 'click', value)"
                  >
                    {{
                      linkMethodName === methodName &&
                      linkMethodType === 'click'
                        ? `&times;`
                        : '{ click }'
                    }}
                  </span>
                </div>
              </div>
            </DragNDrop>
          </template>
        </div>
        <!-- endregion -->

        <!-- region Список методов -->
        <div
          class="methods-list-wrapper"
          style="z-index: 3; position: relative"
        >
          <SizeHandler
            right-size-handler
            :collapse="collapse.methods"
            @collapse="collapse.methods = !collapse.methods"
          />
          <div
            class="methods-list"
            :class="collapse.methods ? 'collapse-block' : ''"
          >
            <v-tooltip
              v-for="value in computedMethodList"
              :key="value.id"
              max-width="300"
              z-index="9999999999999999"
              left
            >
              <template #activator="{ on, attrs }">
                <div
                  class="method-item"
                  draggable="true"
                  style="max-width: 220px"
                  v-bind="attrs"
                  v-on="on"
                  @dragstart="startDrag($event, value)"
                >
                  <img
                    width="18"
                    :src="
                      require('@/assets/icons/UI/svg/script-text-play-outline.svg')
                    "
                    alt=""
                  />
                  <p
                    :style="`overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;`"
                    class="ma-0"
                  >
                    {{ value.name }}
                  </p>
                </div>
              </template>
              <div>
                <p style="font-weight: 600" class="mb-2">{{ value.name }}</p>
                <span v-html="value.description" />
              </div>
            </v-tooltip>
            <!--<div
              v-for="value in computedMethodList"
              :key="value.id"
              class="method-item"
              draggable="true"
              style="max-width: 220px"
              @dragstart="startDrag($event, value)"
            >
              <img
                width="18"
                :src="
                  require('@/assets/icons/UI/svg/script-text-play-outline.svg')
                "
                alt=""
              />
              <p
                :style="`overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;`"
                class="ma-0"
              >
                {{ value.name || value.operation }}
              </p>
            </div>-->
          </div>
        </div>
        <!-- endregion -->
      </div>

      <!--endregion-->
    </div>

    <!-- region Формы -->

    <!--<SKFormList
      v-if="!$fetchState.pending"
      :form-list="processes.forms"
      @formSelect="selectForms"
      @changeHeight="heightConstructor"
    />-->
    <div ref="formListWrapper" class="form-list__wrapper">
      <div class="form-list__size-handler" @click="showFormListPane">
        <img
          :src="
            show
              ? require('@/assets/icons/UI/svg/chevron-down.svg')
              : require('@/assets/icons/UI/svg/chevron-up.svg')
          "
          alt=""
        />
        <span class="form-list__size-handler-text">
          ФОРМЫ В БИЗНЕС ПРОЦЕССЕ
        </span>
        <img
          :src="
            show
              ? require('@/assets/icons/UI/svg/chevron-down.svg')
              : require('@/assets/icons/UI/svg/chevron-up.svg')
          "
          alt=""
        />
      </div>
      <div v-show="show" class="form-list__block" style="overflow-x: auto">
        <ul class="pa-3">
          <li
            v-for="(form, index) of processes.forms"
            :key="index"
            @click="selectForms(index)"
          >
            <div
              style="display: flex; flex: 1 1; align-items: center"
              class="d-flex flex-column"
            >
              <p style="font-size: 10px" class="mb-2">Название формы:</p>
              <span>{{ form.name || 'Без названия' }}</span>
              <!--<span>id: {{ index }}</span>-->
            </div>
            <div class="d-flex" style="column-gap: 10px">
              <v-btn
                outlined
                text
                color="primary"
                @click.stop="editFormInformation(index)"
              >
                <v-icon>mdi-cogs</v-icon>
              </v-btn>
              <v-btn
                outlined
                text
                color="error"
                @click.stop="deleteFormInformation(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </li>
          <li style="" @click="addFormDialog = true">
            <span style="text-align: center; font-size: 12px">
              Добавить
              <br />
              новую форму
            </span>
            <v-btn large icon><v-icon large>mdi-plus</v-icon></v-btn>
          </li>
        </ul>
      </div>
    </div>

    <!-- endregion -->

    <!-- region Модалки-->

    <!-- region Настройки стиля бизнесс процесса -->

    <v-dialog
      v-if="!$fetchState.pending"
      v-model="businessProcessStyleDialog"
      max-width="600"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Настройки стилей бизнес процесса</h2>
          <v-btn icon @click="businessProcessStyleDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content">
          <form
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
          >
            <p class="mb-0">Настройки текста:</p>
            <div class="d-flex align-center form-row">
              <span
                class="form-row__label ml-auto"
                :style="`color: ${processes.style.compactFontColor}; font-size: ${processes.style.compactFontSize}px`"
              >
                Мелкий текст:
              </span>
              <v-select
                v-model="processes.style.compactFontSize"
                :items="primitiveSetting.commonSetting.fontSize"
                style="max-width: 100px"
                dense
                suffix="px"
                outlined
                hide-details
                type="text"
                height="40"
                class="mt-0"
              />
              <v-menu v-model="colorPickerMenu.compactFontColor" left offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    elevation="0"
                    :color="processes.style.compactFontColor"
                    v-on="on"
                  >
                    <v-row align="center" class="flex-column" justify="center">
                      <v-icon
                        :color="getContrast50(processes.style.compactFontColor)"
                      >
                        mdi-format-color-text
                      </v-icon>
                      <v-sheet
                        tile
                        style="margin-top: -4px"
                        height="4"
                        width="26"
                        :color="getContrast50(processes.style.compactFontColor)"
                      />
                    </v-row>
                  </v-btn>
                </template>
                <v-card>
                  <v-color-picker
                    v-model="processes.style.compactFontColor"
                    show-swatches
                    hide-sliders
                    hide-canvas
                    hide-inputs
                  />
                </v-card>
              </v-menu>
            </div>
            <div class="d-flex align-center form-row">
              <span
                class="form-row__label ml-auto"
                :style="`color: ${processes.style.regularFontColor}; font-size: ${processes.style.regularFontSize}px`"
              >
                Средний текст:
              </span>
              <v-select
                v-model="processes.style.regularFontSize"
                :items="primitiveSetting.commonSetting.fontSize"
                style="max-width: 100px"
                suffix="px"
                dense
                outlined
                hide-details
                type="text"
                height="40"
                class="mt-0"
              />
              <v-menu v-model="colorPickerMenu.regularFontColor" left offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    elevation="0"
                    :color="processes.style.regularFontColor"
                    v-on="on"
                  >
                    <v-row align="center" class="flex-column" justify="center">
                      <v-icon
                        :color="getContrast50(processes.style.regularFontColor)"
                      >
                        mdi-format-color-text
                      </v-icon>
                      <v-sheet
                        tile
                        style="margin-top: -4px"
                        height="4"
                        width="26"
                        :color="getContrast50(processes.style.regularFontColor)"
                      />
                    </v-row>
                  </v-btn>
                </template>
                <v-card>
                  <v-color-picker
                    v-model="processes.style.regularFontColor"
                    show-swatches
                    hide-sliders
                    hide-canvas
                    hide-inputs
                  />
                </v-card>
              </v-menu>
            </div>
            <div class="d-flex align-center form-row">
              <span
                class="form-row__label ml-auto"
                :style="`color: ${processes.style.strongFontColor}; font-size: ${processes.style.strongFontSize}px`"
              >
                Крупный текст:
              </span>
              <v-select
                v-model="processes.style.strongFontSize"
                :items="primitiveSetting.commonSetting.fontSize"
                style="max-width: 100px"
                suffix="px"
                dense
                outlined
                hide-details
                type="text"
                height="40"
                class="mt-0"
              />
              <v-menu v-model="colorPickerMenu.strongFontColor" left offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    elevation="0"
                    :color="processes.style.strongFontColor"
                    v-on="on"
                  >
                    <v-row align="center" class="flex-column" justify="center">
                      <v-icon
                        :color="getContrast50(processes.style.strongFontColor)"
                      >
                        mdi-format-color-text
                      </v-icon>
                      <v-sheet
                        tile
                        style="margin-top: -4px"
                        height="4"
                        width="26"
                        :color="getContrast50(processes.style.strongFontColor)"
                      />
                    </v-row>
                  </v-btn>
                </template>
                <v-card>
                  <v-color-picker
                    v-model="processes.style.strongFontColor"
                    show-swatches
                    hide-sliders
                    hide-canvas
                    hide-inputs
                  />
                </v-card>
              </v-menu>
            </div>
            <v-divider />
            <p class="mb-0">Настройки кнопок:</p>
            <div class="d-flex align-center form-row">
              <div class="form-row__label mr-auto">
                <v-btn
                  :tile="processes.style.cornerStyle === 'none'"
                  :rounded="processes.style.cornerStyle === 'round'"
                  depressed
                  :color="processes.style.colorTheme"
                >
                  <span
                    :style="`color: ${getContrast50(
                      processes.style.colorTheme
                    )}`"
                  >
                    Кнопка
                  </span>
                </v-btn>
              </div>
              <v-select
                v-model="processes.style.cornerStyle"
                style="max-width: 130px"
                :items="cornerStyle"
                :item-text="(item) => item.name"
                :item-value="(item) => item.value"
                dense
                outlined
                hide-details
                type="text"
                height="40"
                class="mt-0"
              />
              <v-menu v-model="colorPickerMenu.colorTheme" left offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-ripple="false"
                    height="40"
                    depressed
                    retain-focus-on-click
                    :color="processes.style.colorTheme"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon :color="getContrast50(processes.style.colorTheme)">
                      mdi-format-color-fill
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-color-picker
                    v-model="processes.style.colorTheme"
                    hide-canvas
                    hide-inputs
                    hide-sliders
                    show-swatches
                  />
                </v-card>
              </v-menu>
            </div>
            <v-divider />
            <div class="d-flex align-center form-row">
              <span class="form-row__label mr-auto">Цвет фона формы:</span>
              <v-menu
                v-model="colorPickerMenu.backgroundColor"
                :close-on-content-click="false"
                :nudge-width="200"
                :nudge-left="150"
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    height="40"
                    elevation="0"
                    style="border: 1px solid #d1d1d1"
                    :color="processes.style.backgroundColor"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      :color="getContrast50(processes.style.backgroundColor)"
                    >
                      mdi-format-color-fill
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-color-picker
                    v-model="processes.style.backgroundColor"
                    hide-canvas
                    hide-inputs
                    hide-sliders
                    show-swatches
                  />
                </v-card>
              </v-menu>
            </div>
          </form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="businessProcessStyleDialog = false">
            Сохранить
          </v-btn>
          <v-btn color="error" @click="businessProcessStyleDialog = false">
            Сбросить
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- endregion -->

    <!-- region Настройки бизнесс процесса -->

    <v-dialog
      v-if="!$fetchState.pending"
      v-model="businessProcessSettingDialog"
      max-width="600"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Настройки бизнес процесса</h2>
          <v-btn icon @click="businessProcessSettingDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content">
          <div class="d-flex align-center">
            <v-text-field
              v-model="processes.info.name"
              label="Название бизнес процесса"
              outlined
              dense
            />
            <v-switch
              v-model="processes.info.active"
              :label="processes.info.active ? 'Активен' : 'Не активен'"
              outlined
              class="mt-n1 py-0 ml-10"
              dense
            />
          </div>
          <v-text-field
            v-model="processes.info.url"
            label="Url"
            outlined
            dense
          />
          <v-text-field
            v-model="authorization.login"
            label="Логин"
            outlined
            dense
            @input="base64Authorization"
          />
          <v-text-field
            v-model="authorization.password"
            label="Пароль"
            outlined
            dense
            @input="base64Authorization"
          />
          <v-select
            v-model="processes.info.start_form"
            label="Начальная форма"
            :items="formNames"
            outlined
            dense
          />
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="businessProcessSettingDialog = false">
            Сохранить
          </v-btn>
          <v-btn color="error" @click="businessProcessSettingDialog = false">
            Сбросить
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- endregion -->

    <!-- region Добавление новой формы -->

    <v-dialog
      v-if="!$fetchState.pending"
      v-model="addFormDialog"
      max-width="600"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Добавить новую форму</h2>
          <v-btn icon @click="addFormDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content">
          <form
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
          >
            <!--<v-text-field v-model="newFormModel.name" label="Название формы" />-->
            <v-text-field
              v-model="newFormModel.name"
              label="Название формы"
              dense
              outlined
              :rules="rules"
            />
            <v-text-field
              v-model="newFormModel.annotation"
              label="Описание формы"
              dense
              outlined
            />
            <v-select
              v-model="newFormModel.data"
              :items="formData"
              :item-text="(item) => item.text"
              :item-value="(item) => item.value"
              label="Data"
              dense
              outlined
            />
            <v-select
              v-model="newFormModel.type"
              :items="formTypes"
              label="Тип формы"
              dense
              outlined
              :rules="rules"
            />
            <!--<v-text-field-->
            <!--  v-model="newFormModel.object_type"-->
            <!--  label="Object type"-->
            <!--  dense-->
            <!--  outlined-->
            <!--/>-->
            <!--<v-text-field-->
            <!--  v-model="newFormModel.data"-->
            <!--  label="Data"-->
            <!--  dense-->
            <!--  outlined-->
            <!--/>-->
          </form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="addNewForm">Добавить форму</v-btn>
          <v-btn color="info" @click="resetNewForm">Сбросить</v-btn>
          <v-btn color="error" @click="closeNewForm">Закрыть</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- endregion -->

    <!-- region Настройки формы -->

    <v-dialog
      v-if="!$fetchState.pending"
      v-model="editFormDialog"
      max-width="600"
    >
      <v-card class="dialog">
        <div class="dialog__header">
          <h2>Настроить форму</h2>
          <v-btn icon @click="editFormDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="dialog__content">
          <form
            v-if="editedFormId"
            style="display: flex; flex-direction: column; row-gap: 15px"
            action=""
          >
            <v-text-field
              v-model="processes.forms[editedFormId].name"
              label="Название формы"
              dense
              outlined
            />
            <v-text-field
              v-model="processes.forms[editedFormId].annotation"
              label="Описание"
              dense
              outlined
            />
            <v-select
              v-model="processes.forms[editedFormId].data"
              :items="formData"
              :item-text="(item) => item.text"
              :item-value="(item) => item.value"
              label="Data"
              dense
              outlined
            />
            <v-select
              v-model="processes.forms[editedFormId].type"
              :items="formTypes"
              label="Тип формы"
              dense
              outlined
            />
            <!--<v-text-field-->
            <!--  v-model="processes.forms[editedFormId].object_type"-->
            <!--  label="Object type"-->
            <!--  hint="Заполнять только опытным пользователям"-->
            <!--  persistent-hint-->
            <!--/>-->
          </form>
        </div>
        <div class="dialog__footer">
          <v-btn color="success" @click="saveFormInformation">Сохранить</v-btn>
          <v-btn color="info" @click="resetFormInformation">Сбросить</v-btn>
          <v-btn color="error" @click="closeFormInformation">Закрыть</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- endregion -->

    <!-- region Предпросмотр -->

    <v-navigation-drawer
      v-if="!$fetchState.pending && Object.keys(processes.forms).length"
      v-model="previewForm"
      width="560px"
      right
      absolute
      hide-overlay
      style="z-index: 9999"
    >
      <div
        class="ma-10 pa-1"
        :style="`display: flex; flex-direction: column; row-gap: 5px; width: 480px; height: 800px; border: 1px solid #00000020`"
      >
        <template v-for="el in temporaryForm">
          <LabelPreview
            v-if="el.type === 'label'"
            :key="el.id"
            :class="layoutItemAppearance(el.appearance)"
            :element="el"
          />
          <SeparatorPreview
            v-if="el.type === 'separator'"
            :key="el.id"
            :class="layoutItemAppearance(el.appearance)"
          />
          <LayoutPreview
            v-if="el.type === 'layout'"
            :key="el.id"
            :class="layoutItemAppearance(el.appearance)"
            :elements="el.elements && el.elements.length ? el.elements : null"
            :element="el"
          />
          <ButtonPreview
            v-if="el.type === 'button'"
            :key="el.id"
            :class="layoutItemAppearance(el.appearance)"
            :element="el"
          />
        </template>
      </div>
    </v-navigation-drawer>

    <!-- endregion -->

    <!--region Модальные окна настройки компонента-->

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
          <!--<div class="pa-3">-->
          <!--  {{ temporaryForm[indexComponent] }}-->
          <!--</div>-->
        </div>
        <div
          v-if="
            temporaryForm[indexComponent] &&
            (temporaryForm[indexComponent].type === 'label' ||
              temporaryForm[indexComponent].type === 'input')
          "
        >
          <div class="dialog__content">
            <form style="display: flex; flex-direction: column" action="">
              <v-text-field
                v-model="temporaryForm[indexComponent].label"
                label="Подпись"
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
                <!--{{ formDataSource }}-->
                <div class="d-flex flex-grow-1">
                  <v-text-field
                    v-model="temporaryForm[indexComponent].defaultText"
                    label="Основной текст"
                    type="text"
                  />
                  <v-select
                    v-if="DATASET && DATASET.length"
                    v-model="temporaryForm[indexComponent].sourceData"
                    :items="DATASET"
                    class="ml-5"
                    label="Динамические данные"
                    type="text"
                  />
                  <v-text-field
                    v-else
                    v-model="temporaryForm[indexComponent].sourceData"
                    class="ml-5"
                    label="Динамические данные"
                    type="text"
                  />
                </div>
              </div>
            </form>
          </div>
          <!--<div class="pa-3">-->
          <!--  {{ temporaryForm[indexComponent] }}-->
          <!--</div>-->
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
          <!--<div class="pa-3">-->
          <!--  {{ temporaryForm[indexComponent] }}-->
          <!--</div>-->
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

    <!-- endregion -->

    <v-snackbar
      v-model="snackbar.state"
      right
      top
      text
      :color="snackbar.color"
      timeout="2000"
    >
      {{ snackbar.text }}
      <!--<template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar.state = false">
          Закрыть
        </v-btn>
      </template>-->
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from 'vuex'
import FormConstructor from '@/components/FormConstructor'
import SKFormList from '@/components/SKFormList'
import SizeHandler from '@/components/UIComponents/SizeHandler'
import {
  referenceForm,
  referenceFormStyle,
  referencePrimitivesSetting,
  referencePrimitiveList
} from '@/common/constants'
import PreviewForm from '@/components/PreviewForm/PreviewForm'
import MethodsConstructor from '@/components/MethodsConstructor'
import SKPrimitiveButton from '@/components/Primitives/SKPrimitiveButton'
import ModalWindow from '@/components/Modals/ModalWindow'
import SKlabel from '@/components/Primitives/SKLabel'
import SKseparator from '@/components/Primitives/SKSeparator'
import SKbutton from '@/components/Primitives/SKButton'
import SKlayout from '@/components/Primitives/SKLayout'
import SKinput from '@/components/Primitives/SKInput'
import LabelPreview from "@/components/PreviewForm/LabelPreview";
import SeparatorPreview from "@/components/PreviewForm/SeparatorPreview";
import LayoutPreview from "@/components/PreviewForm/LayoutPreview";
import ButtonPreview from "@/components/PreviewForm/ButtonPreview";
import DragNDrop from '@/components/VueDraggable/dragndrop'

export default {
  name: 'BusinessProcessPage',
  fetchOnServer: false,
  components: {
    DragNDrop,
    ButtonPreview,
    LayoutPreview,
    SeparatorPreview,
    LabelPreview,
    ModalWindow,
    SKPrimitiveButton,
    MethodsConstructor,
    PreviewForm,
    SizeHandler,
    SKFormList,
    FormConstructor,
    SKlabel,
    SKseparator,
    SKbutton,
    SKlayout,
    SKinput,
  },
  layout: 'default',
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  data() {
    return {
      authorization: {
        login: '',
        password: '',
      },
      formData: [
        {
          text: 'Нет данных', value: ''
        },
        {
          text: 'Таблица товаров', value: 'Product', label: [
            {text: 'Идентификатор товара', value: 'uuid',},
            {text: 'Код товара', value: 'code',},
            {text: 'Артикул товара', value: 'article',},
            {text: 'Наименование товара', value: 'description',},
            {text: 'Признак маркировки', value: 'marked',},
            {text: 'Цена товара', value: 'price',},
            {text: 'Цена товара(руб)', value: 'price.rur',},
            {text: 'Остаток', value: 'rest',},
          ]
        },
        {
          text: 'Таблица характеристик', value: 'Product', label: [
            {text: 'Идентификатор характеристики', value: 'uuid',},
            {text: 'Наименование характеристики', value: 'description',},
            // Товар
            {text: 'Идентификатор товара', value: 'product.uuid',},
            {text: 'Код товара', value: 'product.code',},
            {text: 'Артикул товара', value: 'product.article',},
            {text: 'Наименование товара', value: 'product.description',},
            {text: 'Признак маркировки', value: 'product.marked',},
            {text: 'Цена товара', value: 'product.price',},
            {text: 'Цена товара(руб)', value: 'product.price.rur',},
            {text: 'Остаток', value: 'product.rest',},
          ]
        },
        {
          text: 'Таблица штрихкодов', value: 'Barcode', label: [
            { text: 'Идентификатор записи', value: 'uuid', },
            { text: 'Представление штрихкода', value: 'value', },
            // Товар
            {text: 'Идентификатор товара', value: 'product.uuid',},
            {text: 'Код товара', value: 'product.code',},
            {text: 'Артикул товара', value: 'product.article',},
            {text: 'Наименование товара', value: 'product.description',},
            {text: 'Признак маркировки', value: 'product.marked',},
            {text: 'Цена товара', value: 'product.price',},
            {text: 'Цена товара(руб)', value: 'product.price.rur',},
            {text: 'Остаток', value: 'product.rest',},
            // Характеристика
            {text: 'Идентификатор характеристики', value: 'characteristic.uuid',},
            {text: 'Наименование характеристики', value: 'characteristic.description',},
            // Товар из характеристики
            {text: 'Идентификатор товара', value: 'characteristic.product.uuid',},
            {text: 'Код товара', value: 'characteristic.product.code',},
            {text: 'Артикул товара', value: 'characteristic.product.article',},
            {text: 'Наименование товара', value: 'characteristic.product.description',},
            {text: 'Признак маркировки', value: 'characteristic.product.marked',},
            {text: 'Цена товара', value: 'characteristic.product.price',},
            {text: 'Цена товара(руб)', value: 'characteristic.product.price.rur',},
            {text: 'Остаток', value: 'characteristic.product.rest',},
            // Ячейка
            {text: 'Идентификатор ячейки', value: 'cell.uuid',},
            {text: 'Наименование ячейки', value: 'cell.description',},
          ]
        },
        { text: 'Таблица ячеек', value: 'Cell', label: [
            {text: 'Идентификатор ячейки', value: 'uuid',},
            {text: 'Наименование ячейки', value: 'description',},
          ]
        },
        { text: 'Таблица документов', value: 'HeaderData', label: [
            // Идентификатор документа
            {text: 'Идентификатор документа', value: 'uuid',},
            // Номер документа
            {text: 'номер документа', value: 'number',},
            // Дата документа
            {text: 'Дата документа', value: 'date.dateString',},
            {text: 'Дата документа (время)', value: 'date.time',},
            // Тип документа
            {text: 'Тип документа', value: 'type',},
            // Комментарий
            {text: 'Комментарий', value: 'comment',},
            // Статус
            {text: 'Статус', value: 'status',},
            // Автор
            {text: 'Автор', value: 'author',},
            // Синтетические поля
            {text: 'Количество строк в документе', value: 'quantity',},
            {text: 'Сумма фактически собранных товаров', value: 'amount',},
          ]
        },
        { text: 'Таблица содержимого документов', value: 'ContentData', label: [
            // Документ
            {text: 'Идентификатор документа', value: 'owner.uuid',},
            {text: 'номер документа', value: 'owner.number',},
            {text: 'Дата документа', value: 'owner.date.dateString',},
            {text: 'Дата документа (время)', value: 'owner.date.time',},
            {text: 'Тип документа', value: 'owner.type',},
            {text: 'Комментарий', value: 'owner.comment',},
            {text: 'Статус', value: 'owner.status',},
            {text: 'Автор', value: 'owner.author',},
            // Номер строки
            {text: 'Номер строки', value: 'index',},
            // Товар
            {text: 'Идентификатор товара', value: 'product.uuid',},
            {text: 'Код товара', value: 'product.code',},
            {text: 'Артикул товара', value: 'product.article',},
            {text: 'Наименование товара', value: 'product.description',},
            {text: 'Признак маркировки', value: 'product.marked',},
            {text: 'Цена товара', value: 'product.price',},
            {text: 'Цена товара(руб)', value: 'product.price.rur',},
            {text: 'Остаток', value: 'product.rest',},
            // Характеристика
            {text: 'Идентификатор характеристики', value: 'characteristic.uuid',},
            {text: 'Наименование характеристики', value: 'characteristic.description',},
            // Товар из характеристики
            {text: 'Идентификатор товара', value: 'characteristic.product.uuid',},
            {text: 'Код товара', value: 'characteristic.product.code',},
            {text: 'Артикул товара', value: 'characteristic.product.article',},
            {text: 'Наименование товара', value: 'characteristic.product.description',},
            {text: 'Признак маркировки', value: 'characteristic.product.marked',},
            {text: 'Цена товара', value: 'characteristic.product.price',},
            {text: 'Цена товара(руб)', value: 'characteristic.product.price.rur',},
            {text: 'Остаток', value: 'characteristic.product.rest',},
            // Транспортная упаковка
            {text: 'Транспортная упаковка', value: 'container',},
            // Описание
            {text: 'Описание', value: 'description',},
            // Количество
            {text: 'Количество фактическое', value: 'quantity',},
            {text: 'Количество учетное', value: 'quantityAcc',},
          ]
        },
        { text: 'Таблица штрихкодов содержимого', value: 'ContentBarcode', label: [
            // Строка документа
            // Документ
            {text: 'Идентификатор документа', value: 'owner.owner.uuid',},
            {text: 'номер документа', value: 'owner.owner.number',},
            {text: 'Дата документа', value: 'owner.owner.date.dateString',},
            {text: 'Дата документа (время)', value: 'owner.owner.date.time',},
            {text: 'Тип документа', value: 'owner.owner.type',},
            {text: 'Комментарий', value: 'owner.owner.comment',},
            {text: 'Статус', value: 'owner.owner.status',},
            {text: 'Автор', value: 'owner.owner.author',},
            // Номер строки
            {text: 'Номер строки', value: 'owner.index',},
            // Товар
            {text: 'Идентификатор товара', value: 'owner.product.uuid',},
            {text: 'Код товара', value: 'owner.product.code',},
            {text: 'Артикул товара', value: 'owner.product.article',},
            {text: 'Наименование товара', value: 'owner.product.description',},
            {text: 'Признак маркировки', value: 'owner.product.marked',},
            {text: 'Цена товара', value: 'owner.product.price',},
            {text: 'Цена товара(руб)', value: 'owner.product.price.rur',},
            {text: 'Остаток', value: 'owner.product.rest',},
            // Характеристика
            {text: 'Идентификатор характеристики', value: 'owner.characteristic.uuid',},
            {text: 'Наименование характеристики', value: 'owner.characteristic.description',},
            // Товар из характеристики
            {text: 'Идентификатор товара', value: 'owner.characteristic.product.uuid',},
            {text: 'Код товара', value: 'owner.characteristic.product.code',},
            {text: 'Артикул товара', value: 'owner.characteristic.product.article',},
            {text: 'Наименование товара', value: 'owner.characteristic.product.description',},
            {text: 'Признак маркировки', value: 'owner.characteristic.product.marked',},
            {text: 'Цена товара', value: 'owner.characteristic.product.price',},
            {text: 'Цена товара(руб)', value: 'owner.characteristic.product.price.rur',},
            {text: 'Остаток', value: 'owner.characteristic.product.rest',},
            // Транспортная упаковка
            {text: 'Транспортная упаковка', value: 'owner.container',},
            // Описание
            {text: 'Описание', value: 'owner.description',},
            // Количество
            {text: 'Количество по строке фактическое', value: 'owner.quantity',},
            {text: 'Количество по строке учетное', value: 'owner.quantityAcc',},
            // Штрихкод
            {text: 'Штрихкод', value: 'barcode',},
            {text: 'Номер акцизной марки', value: 'egaishr',},
            // Количество
            {text: 'Количество по штрихкоду фактическое', value: 'quantity',},
            {text: 'Количество по штрихкоду учетное', value: 'quantityAcc',},
          ]
        },
      ],
      snackbar: {
        state: false,
        text: '',
        color: 'primary'
      },
      show: true,
      previewForm: false,
      addFormDialog: false,
      editFormDialog: false,
      editFormDialogTempForm: {},
      editedFormId: '',
      names: {
        label: 'Текстовое поле',
        button: 'Кнопка',
        layout: 'Контейнер',
        separator: 'Разделитель',
      },
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
      formTypes: [
        { value: 'object', text: 'Объекты' },
        { value: 'list', text: 'Список' },
      ],
      rules: [
        value => !!value || 'Обязательное поле',
      ],
      collapse: {
        primitives: false,
        formConstructor: false,
        methods: false,
      },
      textComponent: '',
      indexComponent: '',
      businessProcessStyleDialog: false,
      businessProcessSettingDialog: false,
      showComponentSetting: false,
      cornerStyle: [
        {
          name: 'Круглая',
          value: 'round',
        },
        {
          name: 'Остроугольная',
          value: 'none',
        },
        {
          name: 'Скругленная',
          value: 'semi',
        },
      ],
      formListHeight: 180,
      selectedForm: '',
      processes: {},
      renderingPrimitivesList: [
        'layout', 'label', 'separator', 'button', 'input'
      ],
      newFormModel: {
        name: '',
        annotation: '',
        data: '',
        type: 'object',
        object_type: '',
        events: {
          operation: '',
          type: 'form_events',
          loaded: '',
          resume: '',
          closed: '',
          scan: '',
          id: 1, x: 20, y: 20, w: 250, h: 60,
          expanded: true,
        },
        elements: [],
        methods: {
          form_events: {
            operation: '',
            type: 'form_events',
            loaded: '',
            resume: '',
            closed: '',
            scan: '',
            id: 0, x: 20, y: 20, w: 250, h: 60,
            expanded: true,
          }
        },
      },
      referenceFormModel: {
        name: '',
        annotation: '',
        data: '',
        type: 'object',
        object_type: '',
        events: {
          operation: '',
          type: 'form_events',
          loaded: '',
          resume: '',
          closed: '',
          scan: '',
          id: 0, x: 20, y: 20, w: 250, h: 60,
          expanded: false,
        },
        elements: [],
        methods: {
          form_events: {
            operation: '',
            type: 'form_events',
            loaded: '',
            resume: '',
            closed: '',
            scan: '',
            id: 0, x: 20, y: 20, w: 250, h: 60,
            expanded: false,
          }
        },
      },
      // region Methods constructor
      methodsList: [
        {
          operation: 'net.get.tasks',
          name: 'Запрос данных через Rest API ERP',
          description: 'Инструкция отправляет GET запрос<br/>tasks/{device_id}/{task_type} в ERP систему.',
          parameters: [
            {type: 'input', label: 'Тип запрашиваемых данных', hint: '', value: '', enum: [], description: 'Тип запрашиваемых данных.<br/>Пример: Классификаторы.'},
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 1, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'net.put.task',
          name: 'Передача результатов через Rest API ERP',
          description: 'Инструкция отправляет PUT запрос<br/>tasks/{task_type}/{task_id} в ERP систему.<br/>В теле запроса передается результат сбора данных в json формате.',
          parameters: [
            {type: 'input', label: 'Тип передаваемых данных', hint: '', value: '', enum: [], description: 'Тип передаваемых данных.<br/>Пример: ПересчетТоваров.'},
            {type: 'select', label: 'Формат передаваемых данных', hint: '', value: '', enum: [
                {
                  "label": 'Штрихкод / Количество',
                  "value": 'first'
                },
                {
                  "label": 'Документ / Штрихкод / Количество (dev)',
                  "value": 'second'
                }
              ], description: 'Формат передаваемых данных.'}
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 2, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'repo.handle',
          name: 'Запись данных в базу',
          description: 'Инструкция обработки и записи входящих данных в базу.<br/><b>На вход ожидается:</b> результат запроса данных из товароучетной системы.<br/><b>На выходе:</b> null.',
          parameters: [],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 3, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'show.frame',
          name: 'Переход к форме',
          description: 'Инструкция перехода на выбранную форму.',
          parameters: [
            {type: 'select', label: 'Имя формы для перехода', hint: '', value: '', enum: [], description: 'Имя формы для перехода'},
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 4, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'show.back',
          name: 'Закрытие формы',
          description: 'Инструкция выполняет закрытие текущей формы и возвращает на предыдущую.<br/>При вызове инструкции на начальной форме производится закрытие бизнес-процесса и возврат к их списку.',
          parameters: [],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 5, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'show.prolonged',
          name: 'Длительная операция',
          description: 'Инструкция управления формой блокировки интерфейса</br>для выполнения длительной операциии.',
          parameters: [
            {type: 'select', label: '', hint: '', value: '', enum: [
                {
                  "label": 'Начало',
                  "value": 'start'
                },
                {
                  "label": 'Завершение',
                  "value": 'finish'
                }
              ], description: 'Признак начала / завершения отображения формы длительной операции.'},
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 6, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'show.alert',
          name: 'Подтверждение действия',
          description: 'Отображение всплывающего окна подтверждения дальнейшего действия.',
          parameters: [
            {type: 'input', label: 'Текст сообщения', hint: '', value: '', enum: [], description: 'Основной текст описания подтверждаемого действия.'},
            {type: 'input', label: 'Текст кнопки', hint: '', value: '', enum: [], description: 'Текст кнопки подтверждения действия.'}
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 7, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'show.toast',
          name: 'Сообщение пользователю',
          description: 'Отображение всплывающего сообщения.<br/><b>На вход ожидается:</b> произвольные данные.<br/><b>На выходе:</b> входящие данные без изменения формата.',
          parameters: [
            {type: 'input', label: 'Текст сообщения', hint: '', value: '', enum: [], description: 'Выводимый текст сообщения.<br/>Допустимо использование символа $ для подстановки входящих данных.'},
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 8, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'show.error',
          name: 'Сообщение об ошибке',
          description: 'Отображение всплывающего сообщения об ошибке с воспроизведением звукового оповещения.<br/><b>На вход ожидается:</b> произвольные данные.<br/><b>На выходе:</b> входящие данные без изменения формата.',
          parameters: [
            {type: 'input', label: 'Текст сообщения', hint: '', value: '', enum: [], description: 'Выводимый текст сообщения.<br/>Допустимо использование символа $ для подстановки входящих данных.'},
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 9, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'show.scan',
          name: 'Модуль сканирования',
          description: 'Открытие модуля сканирования камерой устройства.<br/><b>На вход ожидается:</b> не используется.<br/><b>На выходе:</b> представление штрихкода, распознаного камерой.',
          parameters: [],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 10, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'it.reload',
          name: 'Обновление данных',
          description: 'Инструкция обновления данных формы.<br/><b>На вход ожидается:</b> объект данных, соответствующий типу данных формы.<br/><b>На выходе:</b> входящие данные без изменения формата.',
          parameters: [],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 11, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'it.delete',
          name: 'Удаление данных',
          description: 'Инструкция удаления данных, отображенных на форме.<br/><b>На вход опционально:</b> произвольные данные.<br/><b>На выходе:</b> входящие данные без изменения формата.',
          parameters: [],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 12, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'it.equal',
          name: 'Сравнение',
          description: 'Инструкция сравнения входящих данных с данными, отображенными на форме.<br/><b>На вход ожидается:</b> произвольные данные.<br/><b>На выходе:</b> входящие данные без изменения формата.',
          parameters: [
            {type: 'input', label: 'Модификатор данных формы', hint: '', value: '', enum: [], description: 'Параметер модификации данных формы перед сравнением.<br/>Пример: product.code.'},
            {type: 'input', label: 'Модификатор входящего значения', hint: '', value: '', enum: [], description: 'Параметер модификации входящего значения перед сравнением.<br/>Пример: owner.product.code.'}
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 13, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'it.notnull',
          name: 'Не нулевое количество',
          description: 'Инструкция проверки входящего значения на нулевое количество.<br/><b>На вход ожидается:</b> объект таблицы состава документа или таблицы штрихкодов документа.<br/><b>На выходе:</b> входящие данные без изменения формата.',
          parameters: [],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 14, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'it.increase',
          name: 'Увеличение количества',
          description: 'Инструкция увеличения количества на единицу.<br/><b>На вход ожидается:</b> объект таблицы состава документа или таблицы штрихкодов документа.<br/><b>На выходе:</b> входящие данные после изменения.',
          parameters: [],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 15, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'format.is',
          name: 'Соответствие формату',
          description: 'Инструкция проверки входящего сообщение на соответствие формату.<br/><b>На вход ожидается:</b> проверяемое представление штрихкода.<br/><b>На выходе:</b> входящие данные без изменения формата.',
          parameters: [
            {type: 'select', label: 'Формат штрихкода', hint: '', value: '', enum: [
                {
                  "label": 'EAN',
                  "value": 'EAN'
                },
                {
                  "label": 'EGAIS.DATAMATRIX',
                  "value": 'EGAIS.DATAMATRIX'
                },
              ], description: 'Проверяемый формат штрихкода.'}
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 16, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'repo.new',
          name: 'Создание нового элемента',
          description: 'Инструкция создания нового объекта базы данных.<br/><b>На вход ожидается:</b>.<br/><b>На выходе:</b> созданный объект / сообщение об ошибке.',
          parameters: [
            {type: 'input', label: 'Тип создаваемого объекта', hint: '', value: '', enum: [], description: 'Тип создаваемого объекта.<br/>Пример: HeaderData.'},
            {type: 'input', label: 'Предопределенное значение реквизита', hint: '', value: '', enum: [], description: 'Предопределенное значение реквизита.<br/>Пример: number=ОУ-00124.'},
            {type: 'input', label: 'Предопределенное значение реквизита', hint: '', value: '', enum: [], description: 'Предопределенное значение реквизита.<br/>Пример: author=Алексей Алешин.'}
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 17, x: 0, y: 0, w: 250, h: 0, expanded: true,
        },
        {
          operation: 'fetch.first',
          name: 'Поиск объекта в базе данных',
          description: 'Инструкция производит поиск объекта в базе по указанным параметрам.<br/><b>На вход ожидается:</b> значение поиска.<br/><b>На выходе:</b> найденный объект / сообщение об ошибке.',
          parameters: [
            {type: 'select', label: 'Таблица для поиска объекта', hint: '', value: '', enum: [
                {
                  "label": 'Таблица документов',
                  "value": 'HeaderData'
                },
                {
                  "label": 'Таблица строк документа',
                  "value": 'ContentData'
                },
                {
                  "label": 'Таблица штрихкодов документа',
                  "value": 'ContentBarcode'
                },
                {
                  "label": 'Таблица штрихкодов',
                  "value": 'Barcode'
                },
                {
                  "label": 'Таблица товаров',
                  "value": 'Product'
                },
                {
                  "label": 'Таблица характеристик',
                  "value": 'Characteristic'
                }
              ], description: 'Таблица для поиска объекта.'},
            {type: 'input', label: 'Имя реквизита для поиска', hint: '', value: '', enum: [], description: 'Имя реквизита для поиска.<br/>Пример: value.'},
            {type: 'input', label: 'Модификатор входящего значения', hint: '', value: '', enum: [], description: 'Модификатор входящего значения'},
            {type: 'input', label: 'Модификатор исходящего значения', hint: '', value: '', enum: [], description: 'Модификатор исходящего значения'}
          ],
          success: '',
          failure: '',
          _input: null,
          _annotation: '',
          type: 'event', id: 18, x: 0, y: 0, w: 250, h: 0, expanded: true,
        }
      ],
      elementsList: {},
      dragEl: {
        x: 15,
        y: 15,
        id: '',
      },
      linkMethodType: '',
      linkMethodName: '',
      // endregion
    }
  },
  async fetch() {
    await this.GetBusinessProcessById(this.$route.params.bprocessId).then(()=> {
      this.processes = Object.assign({}, this.PROCESSES)
      this.selectedForm = this.processes.info.start_form
      this.formDataSource()
      setTimeout(()=> {
        this.base64Decode()
        this.temporaryForm = this.processes.forms[this.selectedForm].elements
        this.elementsList = this.processes.forms[this.selectedForm].methods
      }, 1)
    })
    await this.flatForms()
  },
  computed: {
    ...mapGetters([
      'BUSINESS_PROCESS',
      'PROCESSES',
      'DATASET',
    ]),
    computedMethodList() {
      const prepareMethodList = [
        // {
        //   name: 'Формы',
        //   operation: 'show.frame',
        //   parameters: [
        //     { type: 'select', label: 'Формы', hint: '', value: '' },
        //   ],
        //   success: '',
        //   failure: '',
        //   _input: null,
        //   _annotation: '',
        //   type: 'event', id: 7, x: 0, y: 0, w: 200, h: 0, expanded: true,
        // },
      ]
      return { ...this.methodsList, ...prepareMethodList }
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'components',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
    headerText() {
      if (this.temporaryForm[this.indexComponent]) {
        return this.names[this.temporaryForm[this.indexComponent].type]
      }
      return ''
    },
    formNames() {
      const formsSelector = []
      const forms = Object.keys(this.processes.forms)
      for (let form of forms) {
        const item = {
          text: this.processes.forms[form]?.name || 'Без названия',
          value: form
        }
        formsSelector.push(item)
      }
      return formsSelector
    },
  },
  watch: {},
  methods: {
    ...mapActions([
      'GetBusinessProcessById',
      'SaveBusinessProcessById',
      'SaveBusinessProcessByIdPost',
      'SaveBusinessProcessByIdGet',
      'SetSelectedFormData',
    ]),
    async flatForms() {
      await console.log(this.processes.forms[this.selectedForm].elements.flat())
    },
    // editItem(item) {
    //   console.log(item)
    //   this.indexComponent = this.temporaryForm.findIndex(
    //     (el) => item.id === el.id
    //   )
    //   this.showComponentSetting = true
    // },
    // change(args) {
    //   console.log(this.temporaryForm)
    //
    //   this.indexComponent = this.temporaryForm.findIndex(
    //     (el) => args.item.id === el.id
    //   )
    //   if (!args.el) {
    //     this.temporaryForm[this.indexComponent].label = args.text
    //   }
    //   if (args.el) {
    //     this.temporaryForm[this.indexComponent][args.el] = args.text
    //   }
    // },
    // formsMatch() {
    //   const forms = this.GET_BUSINESS_PROCESSES_BY_ID_PROCESSES.forms
    //   console.log('Формы в бизнес процессе', forms)
    // },
    // ...mapActions(['GetBusinessProcessById']),
    showFormListPane() {
      this.show = !this.show
      setTimeout(() => {
        console.dir(this.$refs.formListWrapper.clientHeight)
        this.heightConstructor(this.$refs.formListWrapper.clientHeight)
      }, 0)
    },
    deleteAllForms() {
      this.processes.forms = {}
      this.temporaryForm = []
      this.elementsList = {}
      this.selectedForm = ''
      this.snackbar.text = 'Все формы удалены'
      this.snackbar.state = true
      this.snackbar.color = 'success'
      this.$forceUpdate()
    },
    clearThisForm() {
      this.processes.forms[this.selectedForm].elements = []
      this.processes.forms[this.selectedForm].methods = {
        form_events: {
          operation: '',
          type: 'form_events',
          loaded: '',
          resume: '',
          closed: '',
          scan: '',
          id: 0, x: 20, y: 20, w: 250, h: 60,
          expanded: false,
        }
      }
      this.temporaryForm = []
      this.elementsList = this.processes.forms[this.selectedForm].methods
      this.snackbar.text = 'Форма очищена'
      this.snackbar.state = true
      this.snackbar.color = 'success'
    },
    loggerList(evt) {
      console.log('onChange', evt)
    },
    move(evt) {
      console.log('move', evt)
    },
    cloneComponent(evt) {
      console.log('Clone', evt)
      evt.id = `${evt.type}__${this.processes.info.globalID++}`
      return { ...evt }
    },
    formDataSource() {
      const source = this.formData.find((el) => el.value === this.processes.forms[this.selectedForm].data).label
      console.log(source)
      this.SetSelectedFormData(source)
      return source
    },
    editBeforeAddingComponent(evt) {
      console.log(evt.clone.innerText)
      this.indexComponent = evt.newIndex
      console.log(evt)
      if (evt.item._underlying_vm_.type === 'button') {
        this.elementsList[evt.item._underlying_vm_.id] = {
          operation: evt.item._underlying_vm_.id,
          parameters: [],
          click: '',
          _input: null,
          _annotation: '',
          type: 'button', id: this.processes.info.globalID, x: 20, y: 20, w: 200, h: 60, expanded: false,
        }
      }
      if (evt?.clone?.innerText !== ' Разделитель') {
        // this.showComponentSetting = true
      }
      this.$forceUpdate()
    },
    base64Authorization() {
      this.processes.info.authorization = 'Basic ' + window.btoa(this.authorization.login + ':' + this.authorization.password)
    },
    base64Decode() {
      if (this.processes.info.authorization && this.processes.info.authorization.length) {
        try {
          let auth = window.atob(this.processes.info.authorization.split(' ')[1]).split(':')
          this.authorization.login = auth[0]
          this.authorization.password = auth[1]
        } catch (e) {
          console.log('Поле авторизации заполненно некоректно')
        }
      }
    },
    selectForms(formName) {
      if (this.selectedForm !== formName) {
        this.selectedForm = formName
        this.elementsList = {}
        console.dir(this.selectedForm)
        setTimeout(()=> {
          this.temporaryForm = this.processes.forms[this.selectedForm].elements
          this.elementsList = this.processes.forms[this.selectedForm].methods
          this.formDataSource()
          this.$forceUpdate()
        }, 0)

      }
    },
    heightConstructor(h) {
      this.formListHeight = h
    },
    async delItem(item) {
      console.log(item)
      if (item.type === 'button') {
        await this.deleteMethod(item.id)
      }
      const temp = this.temporaryForm.filter((el) => item !== el)
      this.processes.forms[this.selectedForm].elements = temp
      this.temporaryForm = temp
    },
    editItem(item) {
      console.log(item)
      this.indexComponent = this.temporaryForm.findIndex(
        (el) => item.id === el.id
      )
      this.showComponentSetting = true
    },
    change(args) {
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
    layoutItemAppearance(prop) {
      return `preview-layout-appearance-item--${prop}`
    },
    saveBusinessProcess() {
      let process = {}
      process.id = this.$route.params.bprocessId
      process.jsonConfig = JSON.stringify(this.processes)
      console.log('Процесс')
      console.dir(process)
      this.SaveBusinessProcessById(process).then(() => {
        this.snackbar.text = 'Бизнес процесс успешно сохранен'
        this.snackbar.state = true
        this.snackbar.color = 'success'
      }).catch((err) => {
        console.log("ОШИБКА")
        console.dir(err)
        this.snackbar.text = 'Произошла ошибка, попробуйте через несколько секунд'
        this.snackbar.state = true
        this.snackbar.color = 'error'
      })
    },
    saveBusinessProcessPost() {
      let process = {}
      process.id = this.$route.params.bprocessId
      process.jsonConfig = JSON.stringify(this.processes)
      console.log('Процесс')
      console.dir(process)
      this.SaveBusinessProcessByIdPost(process).then(() => {
        this.snackbar.text = 'Бизнес процесс успешно сохранен'
        this.snackbar.state = true
        this.snackbar.color = 'success'
      }).catch((err) => {
        console.dir(err)
        this.snackbar.text = 'Произошла ошибка, попробуйте через несколько секунд'
        this.snackbar.state = true
        this.snackbar.color = 'error'
      })
    },
    saveBusinessProcessGet() {
      let process = {}
      process.id = this.$route.params.bprocessId
      process.jsonConfig = JSON.stringify(this.processes)
      console.log('Процесс')
      console.dir(process)
      this.SaveBusinessProcessByIdGet(process).then(() => {
        this.snackbar.text = 'Бизнес процесс успешно сохранен'
        this.snackbar.state = true
        this.snackbar.color = 'success'
      }).catch((err) => {
        console.dir(err)
        this.snackbar.text = 'Произошла ошибка, попробуйте через несколько секунд'
        this.snackbar.state = true
        this.snackbar.color = 'error'
      })
    },

    // region Methods constructor
    selectMethod(methodName, methodType, value) {
      // console.log(this.$refs[value.id])
      if (methodType && this.linkMethodName !== methodName) {
        // console.log('Добавление метода')
        this.linkMethodType = methodType
        this.linkMethodName = methodName
      } else {
        // console.log('Удаление метода')
        this.linkMethodType = ''
        this.linkMethodName = ''
        this.elementsList[methodName][methodType] = ''
      }
    },
    addMethodLink(methodName) {
      // const newArray = Object.assign({}, this.elementsList)
      if (this.linkMethodName && this.linkMethodType) {
        this.elementsList[this.linkMethodName][this.linkMethodType] = methodName
        // this.elementsList = newArray
        this.linkMethodType = ''
        this.linkMethodName = ''
      }
    },
    async deleteMethodLink(elementName, methodType) {
      // const parent = Object.assign({}, item)
      // console.log('Родительский элемент', elementName)
      this.elementsList[elementName][methodType] = ''
      this.$forceUpdate()
      // console.log(this.elementsList.filter((el) => el.method_name !== parent[methodType]))
      // this.elementsList.find(el => el === item)[methodType] = ''
      // this.elementsList = this.elementsList.filter((el) => el.method_name !== parent[methodType])
    },
    onDragCallback(x, y) {
      if(x < 10) {
        x = 20
        return false
      }
      if(y < 10) {
        y = 20
        return false
      }
    },
    dragStop(methodName, value, left, top) {
      this.dragEl.x = left
      this.dragEl.y = top
      this.dragEl.id = value.id
      this.elementsList[methodName].x = left
      this.elementsList[methodName].y = top
      setTimeout( () => {
        this.matchHeight(methodName)
      }, 0)
    },
    startDrag: (event, value) => {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('value', JSON.stringify(value))
    },
    async onDrop (event, target, method) {
      console.log(event, target, method)
      try {
        if (target === 'onSuccess') {
          const item = {}
          const value = JSON.parse(event.dataTransfer.getData('value'))
          const methodName = `${value.type}_${this.processes.info.globalID++}`
          item[methodName] = { ...value }
          item[methodName].id = this.processes.info.globalID
          item[methodName].x = this.elementsList[method].x
          item[methodName].y = this.elementsList[method].y + document.getElementById(method).clientHeight + 20
          this.elementsList[method].success = methodName
          this.elementsList = await Object.assign( this.elementsList, item)
          setTimeout( async () => {
            await this.matchHeight(method)
          }, 0)
        } else if (target === 'onFailure') {
          const item = {}
          const value = JSON.parse(event.dataTransfer.getData('value'))
          const methodName = `${value.type}_${this.processes.info.globalID++}`
          item[methodName] = { ...value }
          item[methodName].id = this.processes.info.globalID
          item[methodName].x = this.elementsList[method].x + document.getElementById(method).clientWidth + 20
          item[methodName].y = this.elementsList[method].y + document.getElementById(method).clientHeight + 20
          this.elementsList[method].failure = methodName
          this.elementsList = await Object.assign( this.elementsList, item)
          setTimeout( async () => {
            await this.matchHeight(method)
          }, 0)
        } else {
          const item = {}
          const value = JSON.parse(event.dataTransfer.getData('value'))
          const methodName = `${value.type}_${this.processes.info.globalID++}`
          item[methodName] = { ...value }
          item[methodName].id = this.processes.info.globalID
          const coords = this.getCoords(event)
          item[methodName].x = coords.x
          item[methodName].y = coords.y
          this.elementsList = await Object.assign( this.elementsList, item)
          setTimeout( async () => {
            console.log(methodName)
            await this.matchHeight(methodName)
          }, 0)
        }
      } catch (e) {
        console.dir(e)
      }

    },
    getCoords(event) {
      let offsetX = event.offsetX%20
      let offsetY = event.offsetY%20
      // console.log(event.offsetX, offsetX)
      let x = event.offsetX < 20 ? 20 : event.offsetX - offsetX
      let y = event.offsetY < 20 ? 20 : event.offsetY - offsetY
      return { x, y }
    },
    svgWight(vW) {
      let max
      if (Object.keys(this.elementsList)?.length) {
        max = Object.values(this.elementsList).reduce((acc, curr) => (acc.x + acc.w) > (curr.x + curr.w) ? acc : curr);
        // console.log(max)
        const w = vW || 220
        return max.x + w
      }
      return '100%'
    },
    svgHeight() {
      let max
      if (Object.keys(this.elementsList)?.length) {
        max = Object.values(this.elementsList).reduce((acc, curr) => {
          if(acc.y + acc?.h > curr.y + curr?.h) {
            // console.log(acc.y + acc?.h)
            return acc
          } else {
            // console.log(curr.y + curr?.h)
            return curr
          }
        });
        // console.log(max)
        return max.y + max?.h + 40
      }
      return '100%'
    },
    parametersInput (event, value, methodName) {
      // console.log($event.target.innerText)
      this.matchHeight(methodName)
      // this.elementsList[methodName].parameters
    },
    saveInput (event, value, methodName, index) {
      // console.log($event.target.innerText)
      const text = event.target.innerText
      this.elementsList[methodName].parameters[index] = text
      this.matchHeight(methodName)
      // this.elementsList[methodName].parameters
    },
    matchHeight(methodName) {
      // const height = await this.$refs[methodName][0].clientHeight
      const height = document.getElementById(methodName).clientHeight
      this.elementsList[methodName].h = parseInt(height)
      this.svgWight()
      this.svgHeight()
      setTimeout(() => {
        this.$forceUpdate()
      }, 0)
    },
    collapseElement(value, methodName) {
      this.elementsList[methodName].expanded = !this.elementsList[methodName].expanded
      this.$forceUpdate()
      setTimeout(() => {
        this.matchHeight(methodName)
      }, 0)
    },
    async deleteMethod(methodName) {
      if (methodName === 'form_events') {
        this.elementsList[methodName].loaded = ''
        this.elementsList[methodName].resume = ''
        this.elementsList[methodName].closed = ''
        this.elementsList[methodName].scan = ''
      } else if (methodName.includes('button')) {
        this.elementsList[methodName].click = ''
      }
      else {
        this.elementsList[methodName].success = ''
        this.elementsList[methodName].failure = ''
      }
      setTimeout(() => {
        for (let i of (Object.values(this.elementsList).filter((el) => el.success === methodName))) {
          i.success = ''
        }
        for (let i of (Object.values(this.elementsList).filter((el) => el.failure === methodName))) {
          i.failure = ''
        }
        for (let i of (Object.values(this.elementsList).filter((el) => el.loaded === methodName))) {
          i.loaded = ''
        }
        for (let i of (Object.values(this.elementsList).filter((el) => el.resume === methodName))) {
          i.resume = ''
        }
        for (let i of (Object.values(this.elementsList).filter((el) => el.closed === methodName))) {
          i.closed = ''
        }
        for (let i of (Object.values(this.elementsList).filter((el) => el.scan === methodName))) {
          i.scan = ''
        }
        for (let i of (Object.values(this.elementsList).filter((el) => el.click === methodName))) {
          i.click = ''
        }
      }, 0)
      setTimeout(() => {
        delete this.elementsList[methodName]
        this.$forceUpdate()
      }, 0)
    },
    copyMethods() {
      navigator.clipboard.writeText(JSON.stringify(this.elementsList))
    },
    copyId() {
      navigator.clipboard.writeText(this.selectedForm)
    },
    addParameters(methodName) {
      this.elementsList[methodName].parameters.push('')
      this.$forceUpdate()
      setTimeout( () => {
        this.matchHeight(methodName)
      }, 0)
    },
    deleteParameters(methodName, index) {
      this.elementsList[methodName].parameters.splice(index, 1)
      this.$forceUpdate()
      setTimeout( () => {
        this.matchHeight(methodName)
      }, 0)
    },
    // endregion


    // region ModalDialog Methods
    editFormInformation(index){
      this.editFormDialogTempForm = Object.assign({}, this.processes.forms[index])
      setTimeout(() => {
        this.editedFormId = index
        this.editFormDialog = true
      }, 0)
    },
    resetFormInformation() {
      this.processes.forms[this.editedFormId] = Object.assign({}, this.editFormDialogTempForm)
    },
    saveFormInformation() {
      this.editFormDialog = false
      this.editFormDialogTempForm = {}
      this.formDataSource()
    },
    closeFormInformation() {
      this.editFormDialog = false
      this.editFormDialogTempForm = {}
    },
    deleteFormInformation(index) {
      if (index === this.selectedForm) {
        this.temporaryForm = []
        this.elementsList = {}
        this.selectedForm = ''
      }
      this.processes.forms[index] = {}
      setTimeout(()=> {
        delete this.processes.forms[index]
        this.$forceUpdate()
      }, 0)
    },

    addNewForm() {
      const key = `form_${this.processes.info.globalID}`
      this.processes.forms[key] = {
        ...this.newFormModel,
        id: this.processes.info.globalID
      }
      this.processes.info.globalID++
      // this.$forceUpdate()
      this.newFormModel = Object.assign({}, this.referenceFormModel)
      this.addFormDialog = false
    },
    resetNewForm() {
      this.newFormModel = Object.assign({}, this.referenceFormModel)
    },
    closeNewForm() {
      this.newFormModel = Object.assign({}, this.referenceFormModel)
      this.addFormDialog = false
    },
    editProcessesStyle(){},
    editProcessesInfo(){},

    // endregion
  },
}
</script>
<!--<style>
.ghost {
  opacity: 0.5;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>-->

<!--<style scoped lang="scss">
.constructor-wrapper {
  display: flex;
  flex: 1 1;
  flex-direction: column;
}
.constructor-block {
  display: flex;
  flex: 1 1;
}

.methods-constructor-wrapper {
  display: flex;
  flex: 1 1 100%;
}
.methods-constructor-block {
  display: block;
  flex: 1 1;
}
.methods-list-wrapper {
  display: flex;
}
.methods-list {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  flex: 0 1;
  width: 240px;
  min-width: 240px;
  padding: 24px 24px 24px 0;
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
.method-item {
  border-radius: 999px;
  display: flex;
  column-gap: 5px;
  align-self: flex-start;
  flex: 0 1;
  padding: 6px 14px 6px 10px;
  background-color: #ddd;
  cursor: grab;
  font-size: 14px;
  font-weight: 600;

  & img {
    opacity: 0.5;
  }
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
</style>-->
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
  background-color: #faf9fb;
}
.primitive-list {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  row-gap: 5px;
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
