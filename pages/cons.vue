<template>
  <div class="constructor-wrap">
    <v-expand-x-transition>
      <div v-show="!collapse.primitives" class="form-constructor-wrapper">
        123412341234
      </div>
    </v-expand-x-transition>
    <SizeHandler
      left-size-handler
      :collapse="collapse.primitives"
      @collapse="collapse.primitives = !collapse.primitives"
    />
    <SizeHandler
      right-size-handler
      :collapse="collapse.methods"
      @collapse="collapse.methods = !collapse.methods"
    />
    <v-expand-x-transition>
      <div
        v-show="!collapse.methods"
        class="methods-constructor-wrapper square-background"
        style="
          position: relative;
          height: 400px;
          border: 1px solid blue;
          margin: 1em;
          box-sizing: border-box;
        "
      >
        <resize-observer @notify="handleResize" />
        <DragNDrop
          style="background-color: #f37759"
          :resizable="false"
          :w="150"
          :h="150"
          parent
          :parent-el-height="parentHeight"
          :parent-el-width="parentWidth"
        />
      </div>
    </v-expand-x-transition>
  </div>
</template>

<script>
import SizeHandler from '@/components/UIComponents/SizeHandler'
import DragNDrop from '@/components/VueDraggable/dragndrop'
export default {
  name: 'ConsPage',
  components: { DragNDrop, SizeHandler },
  data() {
    return {
      collapse: {
        primitives: false,
        formConstructor: false,
        methods: false,
        methodsList: false,
      },
      parentWidth: null,
      parentHeight: null,
    }
  },
  mounted() {},
  methods: {
    handleResize({ width, height }) {
      console.log('resized', width, height)
      this.parentHeight = height
      this.parentWidth = width
    },
  },
}
</script>

<style scoped></style>
