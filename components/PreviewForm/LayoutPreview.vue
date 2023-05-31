<template>
  <div
    class="preview-layout"
    :class="
      layoutAlignment(element.alignment) +
      ' ' +
      layoutAppearance(element.appearance) +
      ' ' +
      layoutDirection(element.grouping)
    "
  >
    <template v-for="el in elements">
      <LabelPreview
        v-if="el.type === 'label'"
        :key="el.id"
        :class="layoutItemAppearance(element.appearance)"
        :element="el"
      />
      <SeparatorPreview
        v-if="el.type === 'separator'"
        :key="el.id"
        :class="layoutItemAppearance(element.appearance)"
      />
      <LayoutPreview
        v-if="el.type === 'layout'"
        :key="el.id"
        :class="layoutItemAppearance(element.appearance)"
        :elements="el.elements && el.elements.length ? el.elements : null"
        :element="el"
      />
      <ButtonPreview
        v-if="el.type === 'button'"
        :key="el.id"
        :class="layoutItemAppearance(element.appearance)"
        :element="el"
      />
    </template>
  </div>
</template>

<script>
import LabelPreview from '@/components/PreviewForm/LabelPreview'
import SeparatorPreview from '@/components/PreviewForm/SeparatorPreview'
import ButtonPreview from '@/components/PreviewForm/ButtonPreview'
export default {
  name: 'LayoutPreview',
  components: { ButtonPreview, SeparatorPreview, LabelPreview },
  props: {
    elements: {
      type: Array,
      default() {
        return []
      },
    },
    element: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    layoutAlignment(prop) {
      return `preview-layout-alignment--${prop}`
    },
    layoutAppearance(prop) {
      return `preview-layout-appearance--${prop}`
    },
    layoutItemAppearance(prop) {
      return `preview-layout-appearance-item--${prop}`
    },
    layoutDirection(prop) {
      return `preview-layout-grouping--${prop}`
    },
  },
}
</script>

<style scoped lang="scss">
.preview-layout {
  display: flex;
}
.preview-layout-alignment--left {
  justify-content: flex-start;
}
.preview-layout-alignment--center {
  justify-content: center;
}
.preview-layout-alignment--right {
  justify-content: flex-end;
}
.preview-layout-grouping--vertical {
  flex-direction: column;

  .preview-layout-appearance-item--separated {
    & > * {
      padding: 5px;
      border-bottom: 1px solid #00000010;
    }
  }
}
.preview-layout-grouping--horizontal {
  flex-direction: row;
  flex-wrap: nowrap;

  .preview-layout-appearance-item--separated {
    & > * {
      padding: 5px;
      margin-left: 5px;
      border-right: 1px solid #00000010;
      &:last-child {
        margin-left: 0;
      }
    }
  }
}

.preview-layout-appearance--tablet {
  padding: 3px;
  border: 1px solid #00000019;
}

.preview-layout-appearance--none {
  padding: 5px;
}
</style>
