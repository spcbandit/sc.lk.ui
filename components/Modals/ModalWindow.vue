<template>
  <div class="modal">
    <div class="modal-close" @click="closeModal">&#10006;</div>
    <slot name="title">
      <h3 class="modal-title">Заголовок</h3>
    </slot>
    <slot name="body">
      <div class="modal-content">Дефолтный контент модального окна</div>
    </slot>
    <slot name="footer">
      <div class="modal-footer">
        <button class="modal-footer__button" @click="$emit('accept')">
          Ок
        </button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss"></style>
