<template>
  <v-container>
    <h1>This is a Kitchen page</h1>
    <span>Current Kitchen: {{ $route.params.id }}</span>
    <MenuBarBtn @clicked="showCreate = !showCreate" label="Create New Kitchen" />
    <KitchenCreateForm v-if="showCreate"></KitchenCreateForm>
    <KitchenSummary v-if="!showCreate" :members="members" :last-update="lastUpdate" :name="kitchenName"></KitchenSummary>

  </v-container>
</template>

<script>
import KitchenSummary from '@/components/KitchenSummary'
import KitchenCreateForm from '@/components/KitchenCreateForm'
import MenuBarBtn from '@/components/MenuBarBtn'

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
    kitchenName: '',
    members: [],
    lastUpdate: null
  }),
  methods: {

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
