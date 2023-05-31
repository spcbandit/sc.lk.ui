<template>
  <div class="sk-separator-wrapper">
    <div class="sk-separator">
      <v-btn icon class="ml-auto" color="info" @click="$emit('delItem')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-properties */
import { mapGetters } from 'vuex'

export default {
  name: 'SKseparator',
  data() {
    return {
      attributes: {
        type: 'separator',
      },
    }
  },
  computed: {
    ...mapGetters(['PROCESSES']),
  },
}
</script>

<style scoped lang="scss">
.sk-separator-wrapper {
  display: flex;
  flex: 1 1;
  align-items: stretch;
  cursor: grab;
  flex-direction: column;
}
.sk-separator {
  padding: 5px 0;
  display: flex;
  flex: 1 1;
  background: repeating-linear-gradient(
    -45deg,
    #f1f1f1 0,
    #f1f1f1 1px,
    transparent 2px,
    transparent 7px
  );
  border-top: 3px double #bbbbbb;
  border-bottom: 3px double #bbbbbb;

  //&__spacer {
  //  display: flex;
  //  flex: 1 1;
  //  border-top: 3px double #bbbbbb;
  //  border-bottom: 3px double #bbbbbb;
  //}
}
</style>
