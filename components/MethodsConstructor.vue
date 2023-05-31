<template>
  <div class="methods-constructor-wrapper">
    <!-- region Конструктор методов -->
    <div
      class="methods-constructor-block"
      :class="linkMethodName ? 'methods-constructor-block--adding-method' : ''"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <!--<resize-observer @notify="handleResize" />-->
      <div style="position: absolute">
        {{ dragEl.x }}
        {{ dragEl.y }}
        {{ dragEl.id }}
      </div>
      <div style="position: absolute; right: 0; z-index: 0">
        <span>elementsList:</span>
        <v-btn small @click="copyMethods">Копировать</v-btn>
        <pre
          :style="`
          max-width: 300px;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          opacity: 0.7;
          text-align: left;
          height: 600px;
          overflow: auto;
          `"
        >
          {{ elementsList }}
        </pre>
      </div>
      <svg
        :height="svgHeight()"
        :width="svgWight()"
        style="position: absolute; z-index: 0"
      >
        <template v-for="(value, elementName) in elementsList">
          <path
            v-if="value.success && value.success.length"
            :key="'lineSuccess' + value.id"
            fill="transparent"
            stroke="#88b471"
            stroke-width="3"
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
            stroke="#e38068"
            stroke-width="3"
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
        </template>
      </svg>
      <template v-for="(value, methodName) in elementsList">
        <DragNDrop
          :id="methodName"
          :key="methodName"
          :ref="methodName"
          :x="value.x"
          :y="value.y"
          :class-name="'method-button'"
          :class-name-dragging="'method-button--drag'"
          :class-name-active="'method-button--active'"
          :drag-handle="'.method-button__header'"
          :enable-native-drag="true"
          :resizable="false"
          :w="value.w"
          :z="GlobalMethodId"
          h="auto"
          :on-drag="onDragCallback"
          @dragging="(left, top) => dragStop(methodName, value, left, top)"
          @dragstop="(left, top) => dragStop(methodName, value, left, top)"
        >
          <!--@dragging="(left, top) => onDragCallback(element.id, left, top)"-->
          <!--:style="linkMethodName ? 'background-color: red' : ''"-->
          <div
            :class="
              linkMethodName ? 'method-button__header--adding_method' : ''
            "
            class="method-button__header"
            @click="addMethodLink(methodName)"
            @dblclick="collapseElement(value, methodName)"
          >
            <v-icon class="ml-1" @click="collapseElement(value, methodName)">
              {{ value.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </v-icon>
            <p class="mr-auto">{{ value.operation }}</p>
            <v-icon class="mr-2" @click="deleteMethod(methodName)">
              mdi-close
            </v-icon>
          </div>
          <div class="method-button__content">
            <div
              class="method-button__parameters"
              :class="
                !value.expanded ? 'method-button__parameters--collapse' : ''
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
            <span
              class="py-2"
              @drop.stop="onDrop($event, 'onSuccess', methodName)"
              @click="selectMethod(methodName, 'success', value)"
            >
              {{
                linkMethodName === methodName && linkMethodType === 'success'
                  ? `&times;`
                  : '{ success }'
              }}
            </span>
            <span
              @drop.stop="onDrop($event, 'onFailure', methodName)"
              @click="selectMethod(methodName, 'failure', value)"
            >
              {{
                linkMethodName === methodName && linkMethodType === 'failure'
                  ? `&times;`
                  : '{ failure }'
              }}
            </span>
          </div>
        </DragNDrop>
      </template>
    </div>
    <!-- endregion -->
    <!-- region Список методов -->
    <div class="methods-list-wrapper">
      <SizeHandler
        right-size-handler
        :collapse="collapse.methods"
        @collapse="collapse.methods = !collapse.methods"
      />
      <div
        class="methods-list"
        :class="collapse.methods ? 'collapse-block' : ''"
      >
        <div
          v-for="value in methodsList"
          :key="value.id"
          class="method-item"
          draggable="true"
          @dragstart="startDrag($event, value)"
        >
          <img
            width="18"
            :src="require('@/assets/icons/UI/svg/script-text-play-outline.svg')"
            alt=""
          />
          <span>{{ value.operation }}</span>
        </div>
      </div>
    </div>
    <!-- endregion -->
  </div>
</template>

<script>
/* eslint-disable */
import DragNDrop from '@/components/VueDraggable/dragndrop'
import SizeHandler from "@/components/UIComponents/SizeHandler";
export default {
  name: 'MethodsConstructor',
  components: {SizeHandler, DragNDrop },
  data: () => ({
    // region
    collapse: {
      primitives: false,
      formConstructor: false,
      methods: false,
    },
    methodsList: [
      {
        operation: 'net.get.tasks',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 1, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'net.put.task',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 2, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'show.alert',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 3, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'show.toast',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 5, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'show.error',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 6, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'show.frame',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 7, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'show.back',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 8, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'it.reload',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 9, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'it.notnull',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 10, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'it.increase',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 11, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'repo.handle',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 12, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'fetch.first',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 13, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'repo.new',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 14, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
      {
        operation: 'format.is',
        parameters: '',
        success: '',
        failure: '',
        _input: null,
        _annotation: '',
        type: 'event', id: 15, x: 0, y: 0, w: 200, h: 0, expanded: true,
      },
    ],
    elementsList: {
      // reload_0: { operation: 'frame.reload', parameters: [], success: '', failure: '', type: 'event', id: 'reload_0', x: 260, y: 40, w: 180, h: 110, },
    },
    dragEl: {
      x: 15,
      y: 15,
      id: '',
    },
    linkMethodType: '',
    linkMethodName: '',
    GlobalMethodId: 999,
  }),
  computed: {

  },
  mounted() {},
  methods: {
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
      const newArray = Object.assign({}, this.elementsList)
      if (this.linkMethodName && this.linkMethodType) {
        newArray[this.linkMethodName][this.linkMethodType] = methodName
        this.elementsList = newArray
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
    },
    startDrag: (event, value) => {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('value', JSON.stringify(value))
    },
    onDrop (event, target, method) {
      if (target === 'onSuccess') {
        const item = {}
        const value = JSON.parse(event.dataTransfer.getData('value'))
        const methodName = `${value.type}_${this.GlobalMethodId}`
        item[methodName] = { ...value }
        item[methodName].id = this.GlobalMethodId
        item[methodName].x = this.elementsList[method].x
        item[methodName].y = this.elementsList[method].y + document.getElementById(method).clientHeight + 20
        this.elementsList[method].success = methodName
        this.GlobalMethodId++
        this.elementsList = Object.assign(this.elementsList, item)
        // this.svgWight()
        // this.svgHeight()
        this.matchHeight(value, method)
        this.$forceUpdate()
      } else if (target === 'onFailure') {
        const item = {}
        const value = JSON.parse(event.dataTransfer.getData('value'))
        const methodName = `${value.type}_${this.GlobalMethodId}`
        item[methodName] = { ...value }
        item[methodName].id = this.GlobalMethodId
        item[methodName].x = this.elementsList[method].x + document.getElementById(method).clientWidth + 20
        item[methodName].y = this.elementsList[method].y + document.getElementById(method).clientHeight + 20
        this.elementsList[method].failure = methodName
        this.GlobalMethodId++
        this.elementsList = Object.assign( this.elementsList, item)
        this.matchHeight(value, method)
        this.$forceUpdate()
      } else {
        const item = {}
        const value = JSON.parse(event.dataTransfer.getData('value'))
        const methodName = `${value.type}_${this.GlobalMethodId}`
        item[methodName] = { ...value }
        item[methodName].id = this.GlobalMethodId
        const coords = this.getCoords(event)
        item[methodName].x = coords.x
        item[methodName].y = coords.y
        this.GlobalMethodId++
        this.elementsList = Object.assign( this.elementsList, item)
        this.matchHeight(value, methodName)
        this.$forceUpdate()
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
      this.matchHeight(value, methodName)
      // this.elementsList[methodName].parameters
    },
    saveInput (event, value, methodName) {
      // console.log($event.target.innerText)
      const text = event.target.innerText
      this.elementsList[methodName].parameters = text
      this.matchHeight(value, methodName)
      // this.elementsList[methodName].parameters
    },
    async matchHeight(value, methodName) {
      // const height = await this.$refs[methodName][0].clientHeight
      await setTimeout(() => {
        // console.log('MethodName: ', methodName)
        // console.log('height: ', height)
        const height = document.getElementById(methodName).clientHeight
        this.elementsList[methodName].h = parseInt(height)
        this.svgWight()
        this.svgHeight()
      }, 0)
      this.$forceUpdate()
    },
    async collapseElement(value, methodName) {
      this.elementsList[methodName].expanded =  !this.elementsList[methodName].expanded
      await this.matchHeight(value, methodName)
    },
    async deleteMethod(methodName) {
      this.elementsList[methodName].success = ''
      this.elementsList[methodName].failure = ''
      setTimeout(() => {
        for (let i of (Object.values(this.elementsList).filter((el) => el.success === methodName))) {
          i.success = ''
        }
        for (let i of (Object.values(this.elementsList).filter((el) => el.failure === methodName))) {
          i.failure = ''
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
  },
}
</script>

<style scoped>
@import "~/assets/styles/scss/components/vue-draggable-resizable.css";
</style>
