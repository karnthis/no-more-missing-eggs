<template>
 <v-container>
  <v-card>
    <v-card-title>
      Name: {{ completeKitchen.name }}
    </v-card-title>
    <v-card-subtitle>
      Last Updated On: {{ completeKitchen.lastUpdated }}
<!--      Member Count: {{ members }}-->
    </v-card-subtitle>
    <v-card-text>
      <span>Interesting Text Here</span>
      <v-container>
        <v-row>
          <v-col cols="6" md="3">
            <span>Current Categories</span>
            <div v-for="category in completeKitchen.categories" :key="category.id">
              <span>{{ category.name }}</span>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <span>Current Cartons</span>
            <div v-for="carton in completeKitchen.cartons" :key="carton.id">
              <span>{{ carton.name }}</span>
            </div>
          </v-col>
<!--          <v-col cols="6" md="3"></v-col>-->
        </v-row>
      </v-container>
<!--      {{ completeKitchen.cartons }}-->
    </v-card-text>
  </v-card>
 </v-container>
</template>

<script>
export default {
  name: 'KitchenSummary',
  props: ['completeKitchen']
}
</script>

<style scoped>

</style>
