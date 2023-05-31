<template>
  <div
    class="ma-10"
    :style="`display: flex; flex-direction: column; row-gap: 5px; width: 480px; height: 800px; border: 1px solid #00000020`"
  >
    <div
      v-if="form"
      class="pa-1"
      :style="`display: flex; flex-direction: column; row-gap: 5px; height: 800px;`"
    >
      <template v-for="el in PROCESSES.forms[form].elements">
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
  </div>
  <!--<div class="">-->
  <!--  <div v-for="el in form" :key="el.id">-->
  <!--    <div v-if="el.type === 'Layout'">-->
  <!--      <template v-if="el.elements && el.elements.length">-->
  <!--        <div v-for="childEl in el.elements" :key="childEl.id">-->
  <!--          <div v-if="childEl.type === 'Layout'">-->
  <!--            <template v-if="childEl.elements && childEl.elements.length">-->
  <!--              <div v-if="childEl.type === 'Button'">КНОПКА 1lvl</div>-->
  <!--              <div v-if="childEl.type === 'Label'">ТЕКСТ 1lvl</div>-->
  <!--              <div v-if="childEl.type === 'Separator'">РАЗДЕЛИТЕЛЬ 1lvl</div>-->
  <!--            </template>-->
  <!--          </div>-->
  <!--          <div v-if="childEl.type === 'Button'">КНОПКА</div>-->
  <!--          <div v-if="childEl.type === 'Label'">ТЕКСТ</div>-->
  <!--          <div v-if="childEl.type === 'Separator'">РАЗДЕЛИТЕЛЬ</div>-->
  <!--        </div>-->
  <!--      </template>-->
  <!--    </div>-->
  <!--    <div v-if="el.type === 'Button'">КНОПКА</div>-->
  <!--    <div v-if="el.type === 'Label'">ТЕКСТ</div>-->
  <!--    <div v-if="el.type === 'Separator'">РАЗДЕЛИТЕЛЬ</div>-->
  <!--  </div>-->
  <!--</div>-->
</template>

<script>
import { mapGetters } from 'vuex'
import LabelPreview from '@/components/PreviewForm/LabelPreview'
import SeparatorPreview from '@/components/PreviewForm/SeparatorPreview'
import LayoutPreview from '@/components/PreviewForm/LayoutPreview'
import ButtonPreview from '@/components/PreviewForm/ButtonPreview'
// import InputPreview from '@/components/PreviewForm/InputPreview'
export default {
  name: 'PreviewForm',
  components: {
    ButtonPreview,
    LayoutPreview,
    SeparatorPreview,
    LabelPreview,
  },
  props: {
    form: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['PROCESSES']),
  },
  watch: {},
  methods: {
    layoutItemAppearance(prop) {
      return `preview-layout-appearance-item--${prop}`
    },
  },
}
</script>
