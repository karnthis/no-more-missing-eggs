<template>
 <v-container>
  <v-card>
    <v-card-title>
      Name: {{ name }}
    </v-card-title>
    <v-card-subtitle>
      Member Count: {{ members }}
    </v-card-subtitle>
    <v-card-text>
      Last Updated On: {{ lastUpdate }}
    </v-card-text>
  </v-card>
 </v-container>
</template>

<script>
export default {
  name: 'KitchenSummary',
  props: ['name', 'lastUpdate', 'members']
}
</script>

<style scoped>

</style>
