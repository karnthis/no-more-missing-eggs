<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center" @click="toggleDrawer">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/SquirrellogicEve.png"
          transition="scale-transition"
          width="60"
        />
      </div>

      <v-spacer></v-spacer>
      <div>
        <MenuBarBtn dest="signup" label="Sign Up" />
        <span>|</span>
        <MenuBarBtn dest="login" label="Log In" />
      </div>

    </v-app-bar>

    <v-main>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <MenuDrawerBtn label="test" dest="sample" />
        <MenuDrawerBtn label="test2" dest="sample2" />
        <MenuDrawerBtn label="test3" dest="sample3" />

        <v-divider></v-divider>

<!--        <LeftMenu :client="$store.state.mainName" />-->

      </v-navigation-drawer>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MenuBarBtn from './components/MenuBarBtn'
import MenuDrawerBtn from './components/MenuDrawerBtn'

export default {
  name: 'App',

  components: {
    MenuBarBtn,
    MenuDrawerBtn
  },

  data: () => ({
    drawer: false
  }),
  methods: {
    alert () {
      window.alert('clicked!')
    },
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
