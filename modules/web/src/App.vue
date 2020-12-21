<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center" @click="toggleDrawer">
        <v-img
          alt="Squirrellogic Logo"
          class="shrink mr-2"
          contain
          src="./assets/Squirrellogic.png"
          width="60"
        />
        <span v-if="$store.state.activeSession">Hi, {{ $store.state.firstName }}</span>
      </div>

      <v-spacer></v-spacer>
      <div v-if="!$store.state.activeSession">
        <MenuBarBtn dest="/signup" label="Sign Up" />
        <span>|</span>
        <MenuBarBtn dest="/login" label="Log In" />
      </div>

    </v-app-bar>

    <v-main>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <MenuDrawerBtn label="Kitchen" dest="/kitchen" />
        <MenuDrawerBtn label="test2" dest="/sample2" />
        <MenuDrawerBtn label="test3" dest="/sample3" />

        <v-divider></v-divider>

        <MenuDrawerBtn label="Log Out" @clicked="logout" />

      </v-navigation-drawer>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MenuBarBtn from '@/components/MenuBarBtnComponent'
import MenuDrawerBtn from '@/components/MenuDrawerBtnComponent'

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
    },
    logout () {
      this.$store.commit('resetState')
      window.location = '/'
    }
  }
}
</script>

<style>
html, body {
  overflow: visible;
}
</style>
