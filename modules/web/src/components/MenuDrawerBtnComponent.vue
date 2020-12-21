<template>
  <v-list-item v-if="!dest" @click="$emit('clicked')">
    <v-list-item-content>
      <v-list-item-title>{{ label }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-list-item v-else :to="dest">
    <v-list-item-content>
      <v-list-item-title>{{ label }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'MenuDrawerBtn',
  props: ['label', 'dest']
}
</script>
