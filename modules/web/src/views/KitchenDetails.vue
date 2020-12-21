<template>
  <v-container>
    <h1>This is a Kitchen Details page</h1>
    <span>Current Kitchen: {{ $route.params.id }}</span>
    <MenuBarBtn @clicked="createItem" label="Add Item" />
    <MenuBarBtn @clicked="createCarton" label="Add Carton" />
    <MenuBarBtn @clicked="createCategory" label="Add Category" />
    <MenuBarBtn @clicked="createMember" label="Add Member" />

    <v-row >
      <v-card>
        <v-card-text v-for="option in kitchen.categories" :key="option.id">
          <input type="checkbox" :id="option.id" :value="option.id" v-model="selectedCategories">
          <label :for="option.id"> {{ option.name }}</label>
        </v-card-text>
      </v-card>
      <br>
      <span>Checked Categories: {{ selectedCategories }}</span>
    </v-row>

    <v-row>
      <v-col cols="12" md="3"></v-col>
      <v-col cols="12" md="6">
        <KitchenDetail :completeKitchen="kitchen"></KitchenDetail>
      </v-col>
      <v-col cols="12" md="3"></v-col>
    </v-row>

  </v-container>
</template>

<script>
import KitchenDetail from '@/components/KitchenDetailComponent'
import MenuBarBtn from '@/components/MenuBarBtnComponent'

export default {
  name: 'App',

  components: {
    KitchenDetail,
    MenuBarBtn
  },

  data: () => ({
    // kitchenName: '',
    // members: [],
    // lastUpdate: null,
    kitchen: {},
    selectedCategories: [],
    cartonName: ''
  }),
  methods: {
    createItem () {},
    createCarton () {
      const newCartonData = {
        kitchenId: this.kitchen.id,
        usedCategories: this.selectedCategories,
        carton: {
          name: this.cartonName,
          status: 'init'
        }
      }
      const fetchOptions = {
        ...this.$store.getters.getAuthedFetchOptions,
        body: JSON.stringify(newCartonData),
        method: 'POST'
      }
      fetch(`${this.$store.state.apiUrl}/carton`,
        fetchOptions)
        .then(resp => resp.json())
        .then(resp => {
          console.dir(resp)
          // this.kitchen = resp
        })
    },
    createCategory () {},
    createMember () {}
  },
  beforeMount () {
    // const kitchenId = this.$route.params.id
    fetch(`${this.$store.state.apiUrl}/kitchen/f/${this.$route.params.id}`,
      this.$store.getters.getAuthedFetchOptions)
      .then(resp => resp.json())
      .then(resp => {
        console.dir(resp)
        this.kitchen = resp
      })
  }
}
</script>
