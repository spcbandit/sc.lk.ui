<template>
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
      <p class="form-list__size-handler-text">ФОРМЫ В БИЗНЕС ПРОЦЕССЕ</p>
      <img
        :src="
          show
            ? require('@/assets/icons/UI/svg/chevron-down.svg')
            : require('@/assets/icons/UI/svg/chevron-up.svg')
        "
        alt=""
      />
    </div>
    <div v-show="show" class="form-list__block">
      <ul>
        <li
          v-for="(form, index) of formList"
          :key="index"
          @click="$emit('formSelect', index)"
        >
          <div class="">{{ form.name || 'Без названия' }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SKFormList',
  props: {
    formList: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      show: true,
    }
  },
  methods: {
    showFormListPane() {
      this.show = !this.show
      setTimeout(() => {
        console.dir(this.$refs.formListWrapper.clientHeight)
        this.$emit('changeHeight', this.$refs.formListWrapper.clientHeight)
      }, 0)
    },
  },
}
</script>
