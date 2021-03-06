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
              ><h3>{{ activeCategory.name }}</h3></v-toolbar>
              <v-card-text>
                <div class="font-weight-medium pt-5">Linked Cartons: {{ activeCategory.cartons.length }}</div>
                <div class="font-weight-medium" v-if="activeCategory.cartons.length">First Three Cartons:</div>
                <div class="font-weight-medium" v-for="carton in activeCategory.cartons" :key="carton.id"> - {{ carton.name }} (Last Update: {{ carton.lastUpdated }})</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="green"
                  @click="goToCategoryDetails"
                >Open</v-btn>
                <v-btn
                  @click="detailsDialog = false"
                >Close</v-btn>
                <v-btn
                  color="red"
                  @click="deleteCategory"
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
              >New Category</v-toolbar>
              <v-card-text>
                <div class="pt-5">Coming Soon</div>
<!--                <v-form-->
<!--                  ref="form"-->
<!--                  v-model="valid"-->
<!--                  lazy-validation-->
<!--                >-->
<!--                  <v-text-field-->
<!--                    v-model="newCategory.name"-->
<!--                    :rules="nameRules"-->
<!--                    label="Name"-->
<!--                    required-->
<!--                    outlined-->
<!--                  ></v-text-field>-->
<!--                  <v-text-field-->
<!--                    v-model="newCategory.count"-->
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
<!--                    v-model="newCategory.barcode"-->
<!--                    label="Barcode"-->
<!--                    outlined-->
<!--                  ></v-text-field>-->
<!--                </v-form>-->
              </v-card-text>
              <v-card-actions class="justify-end">
<!--                <v-btn-->
<!--                  color="green"-->
<!--                  @click="createCategory"-->
<!--                >Save</v-btn>-->
                <v-btn
                  color="red"
                  @click="cancelCreateCategory"
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
        <h1>This is a KitchenDetails page: {{ kitchenData.name }} ({{ kitchenData.lastUpdated }})</h1>
        <v-card>
          <v-card-title>
            <!--            Category Last Updated: {{ categoryData.lastUpdated }}-->
          </v-card-title>
          <v-card-subtitle>
          </v-card-subtitle>
          <v-card-text>
            <h2>Categories in the Kitchen:</h2>
            <v-btn color="green" @click="triggerCreate"><v-icon dark>mdi-plus-box</v-icon> Add Category</v-btn>
            <v-container>
              <v-row>
                <v-col cols="6" md="3">
                  <div v-for="category in kitchenData.categories" :key="category.id">
                    <MenuBarBtn @clicked="triggerDetails(category.id)" :label="`${category.name} (Tagged Cartons: ${category.cartons.length})`" />
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
    kitchenData: { kitchens: [] },
    activeCategory: { cartons: [] },
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
    newCategory: {}
  }),
  computed: {
    ...mapState([
      'kitchenNav',
      'apiUrl'
    ]),
    formattedDate () {
      return new Date(this.internalDate).toDateString()
    }
  },
  methods: {
    ...mapMutations([
      'setKitchenNav'
    ]),
    ...mapGetters([
      'getAuthedFetchOptions'
    ]),
    goToCategoryDetails () {
      this.$router.push({ name: 'CategoryDetails', params: { id: this.activeId } })
    },
    triggerDetails (id) {
      this.activeId = id
      this.activeCategory = this.kitchenData.categories.filter(category => category.id === id)[0]
      this.detailsDialog = true
    },
    triggerCreate () {
      this.createDialog = true
    },
    cancelCreateCategory () {
      this.newCategory = {}
      this.internalDate = new Date().toISOString().substr(0, 10)
      this.$refs.form.resetValidation()
      this.createDialog = false
    },
    deleteCategory () {
      const options = {
        ...this.$store.getters.getAuthedFetchOptions,
        method: 'DELETE'
      }
      fetch(`${this.$store.state.apiUrl}/category/${this.activeId}`, options)
        .then(resp => resp.json())
        .then(resp => {
          // todo
          console.log(resp)
          if (resp.id) {
            this.kitchenData.categories = this.kitchenData.categories.filter(category => category.id !== resp.id)
          } else {
            console.log('unable to update')
          }
          this.detailsDialog = false
        })
    },
    createCategory () {
      this.$refs.form.validate()
      // if (!this.newCategory.barcode) {
      //   this.newCategory.barcode = 0
      // }
      // this.newCategory.count = Number(this.newCategory.count)
      // this.newCategory.expiration = this.formattedDate

      const rightNow = new Date()
      this.newCategory.status = 'init'
      this.newCategory.lastUpdated = rightNow.toDateString()
      // this.newCategory.added = rightNow.toDateString()

      const options = {
        ...this.$store.getters.getAuthedFetchOptions,
        body: JSON.stringify({
          kitchenId: this.kitchenNav,
          category: this.newCategory
        }),
        method: 'POST'
      }
      fetch(`${this.$store.state.apiUrl}/category`, options)
        .then(resp => resp.json())
        .then(resp => {
          // todo
          console.log(resp)
          if (resp.id) {
            this.cancelCreateCategory()
            this.kitchenData.cartons.push(resp)
          } else {
            console.log('unable to update')
          }
        })
    }
  },
  created () {
    if (this.$route.params.id) {
      console.log(this.$route.params.id)
      this.setKitchenNav(this.$route.params.id)
      fetch(`${this.apiUrl}/kitchen/cat/${this.$route.params.id}`, this.getAuthedFetchOptions())
        .then(resp => resp.json())
        .then(resp => {
          this.kitchenData = resp
          console.dir(this.kitchenData)
        })
    } else {
      console.log(this.$route.params.id)
      if (this.categoryNav) {
        this.$router.push({ name: 'KitchenDetails', params: { id: this.kitchenNav } })
      } else {
        this.$router.push('kitchen')
      }
    }
  }
}
</script>
