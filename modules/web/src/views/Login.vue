<template>
  <v-container>
    <h1>This is a Login page</h1>

    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4"></v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4"></v-col>
        </v-row>
        <MenuBarBtn @clicked="sendLogin" label="Log In" />
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import MenuBarBtn from '@/components/MenuBarBtn'

export default {
  name: 'Login',
  components: {
    MenuBarBtn
  },
  data: () => ({
    valid: false,
    username: '',
    email: '',
    password: '',
    nameRules: [
      v => !!v || 'Username is required'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ]
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+/.test(v) || 'E-mail must be valid'
    // ]
  }),
  methods: {
    sendLogin () {
      console.log('login hit')
      fetch(`${this.$store.state.apiUrl}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.bundleData())
      })
        .then(resp => resp.json())
        .then(resp => {
          this.$store.commit('setLoggedIn', resp)

          localStorage.setItem('activeSession', 'true')
          localStorage.setItem('token', resp.access_token)
          localStorage.setItem('firstName', resp.userInfo.firstName)
          localStorage.setItem('lastName', resp.userInfo.lastName)
          localStorage.setItem('username', resp.userInfo.username)
          localStorage.setItem('userId', resp.userInfo.id)
          localStorage.setItem('email', resp.userInfo.email)

          try {
            localStorage.setItem('kitchenIds', JSON.stringify(resp.kitchenIds))
          } catch (err) {
            console.dir(err)
          }

          window.location = '/#/home'
        })
    },
    bundleData () {
      return {
        username: this.username,
        password: this.password
      }
    }
  }
}
</script>
