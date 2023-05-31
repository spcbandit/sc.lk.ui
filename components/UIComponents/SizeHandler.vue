<template>
  <div
    style="position: sticky; top: 0"
    class="size-handler"
    :class="leftSizeHandler ? 'left' : 'right'"
    @click="$emit('collapse')"
  >
    <v-icon v-if="leftSizeHandler" class="pa-0 ma-0">
      {{ !collapse ? 'mdi-chevron-left' : 'mdi-chevron-right' }}
    </v-icon>
    <v-icon v-else-if="rightSizeHandler" class="pa-0 ma-0">
      {{ !collapse ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'SizeHandler',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    leftSizeHandler: {
      type: Boolean,
      default: false,
    },
    rightSizeHandler: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.size-handler {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.left {
  border-right: 3px double #d1d1d1;
}
.right {
  border-left: 3px double #d1d1d1;
}
</style>
