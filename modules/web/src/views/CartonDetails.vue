<template>
  <v-container>

<!--    View details of an existing Item-->
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          transition="fab-transition"
          max-width="600"
          v-model="detailsDialog"
        >
          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              ><h3>{{ activeItem.name }}</h3></v-toolbar>
              <v-card-text>
                <div class="font-weight-medium pt-5">Total: {{ activeItem.count }}</div>
                <div class="font-weight-medium">Date Added: {{ activeItem.added }}</div>
                <div class="font-weight-medium">Expiration: {{ activeItem.expiration }}</div>
                <div class="font-weight-medium">Barcode: {{ activeItem.barcode }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  @click="detailsDialog = false"
                >Close</v-btn>
                <v-btn
                  color="red"
                  @click="deleteItem"
                >Delete</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>

<!--    Create a new Item-->
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          transition="scroll-x-transition"
          max-width="600"
          v-model="createDialog"
        >
          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >New Item</v-toolbar>
              <v-card-text>
                <div class="pt-5"></div>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="newItem.name"
                    :rules="nameRules"
                    label="Name"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="newItem.count"
                    :rules="countRules"
                    label="Quantity"
                    type="number"
                    required
                    outlined
                  ></v-text-field>
                  <v-menu
                    v-model="dateSelect"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formattedDate"
                        :rules="expirationRules"
                        v-bind="attrs"
                        v-on="on"
                        label="Expiration"
                        prepend-icon="mdi-calendar"
                        readonly
                        required
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="internalDate"
                      @input="dateSelect = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model="newItem.barcode"
                    label="Barcode"
                    outlined
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="green"
                  @click="createItem"
                >Save</v-btn>
                <v-btn
                  color="red"
                  @click="cancelCreateItem"
                >Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2" md="2"></v-col>
      <v-col cols="8" md="8">
        <h1>{{ cartonData.name }} ({{ cartonData.items.length }})</h1>
        <v-card>
          <v-card-title>
            Carton Last Updated: {{ cartonData.lastUpdated }}
          </v-card-title>
          <v-card-subtitle>
          </v-card-subtitle>
          <v-card-text>
            <h2>Items in the Carton:</h2>
            <v-btn color="green" @click="triggerCreate"><v-icon dark>mdi-plus-box</v-icon> Add Item</v-btn>
            <v-container>
              <v-row>
                <v-col cols="6" md="3">
                  <div v-for="item in cartonData.items" :key="item.id">
                    <MenuBarBtn @clicked="triggerDetails(item.id)" :label="`${item.name} (expires: ${item.expiration})`" />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="2" md="2"></v-col>
    </v-row>

  </v-container>
</template>

<script>
// @ is an alias to /src
import MenuBarBtn from '@/components/MenuBarBtnComponent.vue'

import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'CartonDetails',
  components: {
    MenuBarBtn
  },
  data: () => ({
    cartonData: { items: [] },
    activeItem: {},
    activeId: null,
    detailsDialog: false,
    createDialog: false,
    // Create New Item variables
    valid: false,
    nameRules: [v => !!v || 'Name is required'],
    countRules: [
      v => !!v || 'Count is required and must be a number'
    ],
    expirationRules: [
      v => !!v || 'Expiration is required',
      v => !!(new Date(v)) || 'Must be a valid Date'
    ],
    internalDate: new Date().toISOString().substr(0, 10),
    dateSelect: false,
    newItem: {}
  }),
  computed: {
    ...mapState([
      'cartonNav',
      'kitchenNav',
      'apiUrl'
    ]),
    formattedDate () {
      return new Date(this.internalDate).toDateString()
    }
  },
  methods: {
    ...mapMutations([
      'setCartonNav'
    ]),
    ...mapGetters([
      'getAuthedFetchOptions'
    ]),
    triggerDetails (id) {
      this.activeId = id
      this.activeItem = this.cartonData.items.filter(item => item.id === id)[0]
      this.detailsDialog = true
    },
    triggerCreate () {
      this.createDialog = true
    },
    cancelCreateItem () {
      this.newItem = {}
      this.internalDate = new Date().toISOString().substr(0, 10)
      this.$refs.form.resetValidation()
      this.createDialog = false
    },
    deleteItem () {
      const options = {
        ...this.$store.getters.getAuthedFetchOptions,
        method: 'DELETE'
      }
      fetch(`${this.$store.state.apiUrl}/item/${this.activeId}`, options)
        .then(resp => resp.json())
        .then(resp => {
          // todo
          console.log(resp)
          if (resp.id) {
            this.cartonData.items = this.cartonData.items.filter(item => item.id !== resp.id)
          } else {
            console.log('unable to update')
          }
          this.detailsDialog = false
        })
    },
    createItem () {
      this.$refs.form.validate()
      if (!this.newItem.barcode) {
        this.newItem.barcode = 0
      }
      this.newItem.count = Number(this.newItem.count)
      this.newItem.expiration = this.formattedDate

      const rightNow = new Date()
      this.newItem.status = 'init'
      this.newItem.lastUpdated = rightNow.toDateString()
      this.newItem.added = rightNow.toDateString()

      const options = {
        ...this.$store.getters.getAuthedFetchOptions,
        body: JSON.stringify({
          cartonId: this.cartonNav,
          item: this.newItem
        }),
        method: 'POST'
      }
      fetch(`${this.$store.state.apiUrl}/item`, options)
        .then(resp => resp.json())
        .then(resp => {
          // todo
          console.log(resp)
          if (resp.id) {
            this.cancelCreateItem()
            this.cartonData.items.push(resp)
          } else {
            console.log('unable to update')
          }
        })
    }
  },
  created () {
    if (this.$route.params.id) {
      console.log(this.$route.params.id)
      this.setCartonNav(this.$route.params.id)
      fetch(`${this.apiUrl}/carton/f/${this.$route.params.id}`, this.getAuthedFetchOptions())
        .then(resp => resp.json())
        .then(resp => {
          this.cartonData = resp
          console.dir(this.cartonData.items)
        })
    } else {
      console.log(this.$route.params.id)
      if (this.cartonNav) {
        this.$router.push({ name: 'CartonDetails', params: { id: this.cartonNav } })
      } else {
        this.$router.push('category')
      }
    }
  }
}
</script>
