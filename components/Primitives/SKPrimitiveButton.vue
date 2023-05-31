<template>
  <div class="sk-label">
    <div class="sk-label__icon">
      <img
        v-if="primitive.type"
        class="sk-label__icon-img"
        width="24px"
        height="24px"
        :src="
          require(`@/assets/icons/UI/svg/primitives/${primitive.type.toLowerCase()}.svg`)
        "
        alt=""
      />
    </div>
    <div class="sk-label__title-wrapper">
      <p class="ma-0">{{ primitiveName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SKPrimitiveButton',
  props: {
    primitive: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    primitiveName() {
      const type = {
        label: 'Поле текста',
        button: 'Кнопка',
        separator: 'Разделитель',
        layout: 'Контейнер',
        input: 'Поле ввода',
      }
      return type[this.primitive.type]
    },
  },
}
</script>

<style scoped lang="scss">
.sk-label {
  background-color: #fff;
  display: flex;
  border-radius: 3px;
  cursor: grab;
  border: 1px solid #33333330;

  &__icon {
    padding: 5px;
    border-right: 3px double #33333330;
  }
  &__icon-img {
    display: flex;
  }
  &__title-wrapper {
    display: flex;
    align-items: center;
    padding: 0 12px 0 12px;
    & p {
      user-select: none;
    }
  }
}
</style>
