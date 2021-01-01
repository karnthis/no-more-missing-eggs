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
              ><h3>{{ activeCarton.name }}</h3></v-toolbar>
              <v-card-text>
                <div class="font-weight-medium pt-5">Items in Carton: {{ activeCarton.items.length }}</div>
                <div class="font-weight-medium" v-if="activeCarton.items.length">First Three Items:</div>
                <div class="font-weight-medium" v-for="item in activeCarton.items" :key="item.id"> - {{ item.name }} (Expires {{ item.expiration }})</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="green"
                  @click="goToCartonDetails"
                >Open</v-btn>
                <v-btn
                  @click="detailsDialog = false"
                >Close</v-btn>
                <v-btn
                  color="red"
                  @click="deleteCarton"
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
              >New Carton</v-toolbar>
              <v-card-text>
                <div class="pt-5">Coming Soon</div>
<!--                <v-form-->
<!--                  ref="form"-->
<!--                  v-model="valid"-->
<!--                  lazy-validation-->
<!--                >-->
<!--                  <v-text-field-->
<!--                    v-model="newCarton.name"-->
<!--                    :rules="nameRules"-->
<!--                    label="Name"-->
<!--                    required-->
<!--                    outlined-->
<!--                  ></v-text-field>-->
<!--                  <v-text-field-->
<!--                    v-model="newCarton.count"-->
<!--                    :rules="countRules"-->
<!--                    label="Quantity"-->
<!--                    type="number"-->
<!--                    required-->
<!--                    outlined-->
<!--                  ></v-text-field>-->
<!--                  <v-menu-->
<!--                    v-model="dateSelect"-->
<!--                    :close-on-content-click="false"-->
<!--                    :nudge-right="40"-->
<!--                    transition="scale-transition"-->
<!--                    offset-y-->
<!--                    min-width="290px"-->
<!--                  >-->
<!--                    <template v-slot:activator="{ on, attrs }">-->
<!--                      <v-text-field-->
<!--                        v-model="formattedDate"-->
<!--                        :rules="expirationRules"-->
<!--                        v-bind="attrs"-->
<!--                        v-on="on"-->
<!--                        label="Expiration"-->
<!--                        prepend-icon="mdi-calendar"-->
<!--                        readonly-->
<!--                        required-->
<!--                        outlined-->
<!--                      ></v-text-field>-->
<!--                    </template>-->
<!--                    <v-date-picker-->
<!--                      v-model="internalDate"-->
<!--                      @input="dateSelect = false"-->
<!--                    ></v-date-picker>-->
<!--                  </v-menu>-->
<!--                  <v-text-field-->
<!--                    v-model="newCarton.barcode"-->
<!--                    label="Barcode"-->
<!--                    outlined-->
<!--                  ></v-text-field>-->
<!--                </v-form>-->
              </v-card-text>
              <v-card-actions class="justify-end">
<!--                <v-btn-->
<!--                  color="green"-->
<!--                  @click="createCarton"-->
<!--                >Save</v-btn>-->
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
        <h1>This is a CategoryDetails page: {{ categoryData.name }} ({{ categoryData.cartons.length }})</h1>
        <v-card>
          <v-card-title>
<!--            Category Last Updated: {{ categoryData.lastUpdated }}-->
          </v-card-title>
          <v-card-subtitle>
          </v-card-subtitle>
          <v-card-text>
            <h2>Cartons in the Category:</h2>
            <v-btn color="green" @click="triggerCreate"><v-icon dark>mdi-plus-box</v-icon> Add Carton</v-btn>
            <v-container>
              <v-row>
                <v-col cols="6" md="3">
                  <div v-for="carton in categoryData.cartons" :key="carton.id">
                    <MenuBarBtn @clicked="triggerDetails(carton.id)" :label="`${carton.name} (Last Update: ${carton.lastUpdated})`" />
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
    categoryData: { cartons: [] },
    activeCarton: { items: [] },
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
    newCarton: {}
  }),
  computed: {
    ...mapState([
      'kitchenNav',
      'kitchenNav',
      'apiUrl'
    ]),
    formattedDate () {
      return new Date(this.internalDate).toDateString()
    }
  },
  methods: {
    ...mapMutations([
      'setCategoryNav'
    ]),
    ...mapGetters([
      'getAuthedFetchOptions'
    ]),
    goToCartonDetails () {
      this.$router.push({ name: 'CartonDetails', params: { id: this.activeId } })
    },
    triggerDetails (id) {
      this.activeId = id
      this.activeCarton = this.categoryData.cartons.filter(carton => carton.id === id)[0]
      this.detailsDialog = true
    },
    triggerCreate () {
      this.createDialog = true
    },
    cancelCreateItem () {
      this.newCarton = {}
      this.internalDate = new Date().toISOString().substr(0, 10)
      this.$refs.form.resetValidation()
      this.createDialog = false
    },
    deleteCarton () {
      const options = {
        ...this.$store.getters.getAuthedFetchOptions,
        method: 'DELETE'
      }
      fetch(`${this.$store.state.apiUrl}/carton/${this.activeId}`, options)
        .then(resp => resp.json())
        .then(resp => {
          // todo
          console.log(resp)
          if (resp.id) {
            this.categoryData.cartons = this.categoryData.cartons.filter(carton => carton.id !== resp.id)
          } else {
            console.log('unable to update')
          }
          this.detailsDialog = false
        })
    },
    createCarton () {
      this.$refs.form.validate()
      if (!this.newCarton.barcode) {
        this.newCarton.barcode = 0
      }
      this.newCarton.count = Number(this.newCarton.count)
      this.newCarton.expiration = this.formattedDate

      const rightNow = new Date()
      this.newCarton.status = 'init'
      this.newCarton.lastUpdated = rightNow.toDateString()
      this.newCarton.added = rightNow.toDateString()

      const options = {
        ...this.$store.getters.getAuthedFetchOptions,
        body: JSON.stringify({
          cartonId: this.cartonNav,
          item: this.newCarton
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
            this.categoryData.cartons.push(resp)
          } else {
            console.log('unable to update')
          }
        })
    }
  },
  created () {
    if (this.$route.params.id) {
      console.log(this.$route.params.id)
      this.setCategoryNav(this.$route.params.id)
      fetch(`${this.apiUrl}/category/f/${this.$route.params.id}`, this.getAuthedFetchOptions())
        .then(resp => resp.json())
        .then(resp => {
          this.categoryData = resp
          console.dir(this.categoryData.cartons)
        })
    } else {
      console.log(this.$route.params.id)
      if (this.categoryNav) {
        this.$router.push({ name: 'CategoryDetails', params: { id: this.categoryNav } })
      } else {
        this.$router.push('kitchen')
      }
    }
  }
}
</script>
