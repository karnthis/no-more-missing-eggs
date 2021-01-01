<template>
  <v-container>
    <h1>This is a Kitchen page</h1>
    <span>Current Kitchen: {{ $route.params.id }}</span>
    <MenuBarBtn @clicked="showCreate = !showCreate" label="Create New Kitchen" />
    <KitchenCreateForm v-if="showCreate"></KitchenCreateForm>

      <v-row v-if="!showCreate">
        <v-col cols="12" md="3" v-for="kitchen in allKitchens" :key="kitchen.id" @click="visitKitchen(kitchen.id)">
          <KitchenSummary :members="kitchen.memberships.length" :last-update="kitchen.lastUpdated" :name="kitchen.name"></KitchenSummary>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
import KitchenSummary from '@/components/kitchen/KitchenSummaryComponent'
import KitchenCreateForm from '@/components/kitchen/KitchenCreateFormComponent'
import MenuBarBtn from '@/components/MenuBarBtnComponent'

export default {
  name: 'App',

  components: {
    KitchenSummary,
    KitchenCreateForm,
    MenuBarBtn
  },

  data: () => ({
    showCreate: false,
    valid: false,
    nameRules: [
      v => !!v || 'Kitchen Name is required'
    ],
    allKitchens: [],
    kitchenName: '',
    members: [],
    lastUpdate: null
  }),
  methods: {
    visitKitchen (key) {
      // console.dir(key)
      window.location = `/#/kitchen/${key}`
    }
  },
  beforeMount () {
    const kitchenId = this.$route.params.id
    if (!kitchenId) {
      fetch(`${this.$store.state.apiUrl}/kitchen`, this.$store.getters.getAuthedFetchOptions)
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp)
          if (!resp.length) {
            this.showCreate = !this.showCreate
          } else {
            console.log('do something')
            this.lastUpdate = resp[0].lastUpdated
            this.kitchenName = resp[0].name
            this.members = resp[0].memberships.length
            this.allKitchens = resp
          }
        })
    } else {
      fetch(`${this.$store.state.apiUrl}/kitchen/${kitchenId}`, this.$store.getters.getAuthedFetchOptions)
        .then(resp => resp.json())
        .then(resp => console.dir(resp))
    }
  }
}
</script>
