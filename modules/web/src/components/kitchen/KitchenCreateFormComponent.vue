<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4"></v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="kitchenName"
            :rules="nameRules"
            label="New Kitchen Name"
            required
          ></v-text-field>
          <MenuBarBtn @clicked="createKitchen" label="Create" />

        </v-col>

        <v-col cols="12" md="4"></v-col>
      </v-row>

    </v-container>
  </v-form>
</template>

<script>
import MenuBarBtn from '@/components/MenuBarBtnComponent'

export default {
  name: 'KitchenSummary',
  components: {
    MenuBarBtn
  },
  data: () => ({
    valid: false,
    nameRules: [
      v => !!v || 'Kitchen Name is required'
    ],
    kitchenName: ''
  }),
  methods: {
    createKitchen () {
      const options = {
        ...this.$store.getters.getAuthedFetchOptions,
        body: JSON.stringify({
          ownerId: this.$store.state.userId,
          name: this.kitchenName,
          status: 'init'
        }),
        method: 'POST'
      }
      fetch(`${this.$store.state.apiUrl}/kitchen`, options)
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp)
          if (resp.id) {
            this.$store.commit('addKitchenId', resp.id)
            window.location = `/#/kitchen/${resp.id}`
          } else {
            console.log('unable to update')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
