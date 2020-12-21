<template>
  <v-btn v-if="!dest" @click="$emit('clicked')" text>
    <span>{{ label }}</span>
  </v-btn>
  <v-btn v-else :to="dest" text>
    <span>{{ label }}</span>
  </v-btn>
</template>

<script>
export default {
  name: 'MenuBarBtn',
  props: ['label', 'dest']
}
</script>
