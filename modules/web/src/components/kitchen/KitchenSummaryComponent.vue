<template>
 <v-container>
  <v-card>
    <v-card-title>
      Name: {{ name }}
    </v-card-title>
    <v-card-subtitle>
      Last Updated On: {{ lastUpdate }}
    </v-card-subtitle>
    <v-card-text>
      Member Count: {{ members }}
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
