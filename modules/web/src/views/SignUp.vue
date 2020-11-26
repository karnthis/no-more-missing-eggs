<template>
  <v-container>
    <h1>This is a SignUp page</h1>

    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4"></v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="firstName"
              :rules="nameRules"
              label="First name"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              :rules="nameRules"
              label="Last name"
              required
            ></v-text-field>
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="Desired Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
              label="Confirm Password"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4"></v-col>
        </v-row>
        <MenuBarBtn @clicked="sendRegistration" label="Register" />
      </v-container>
    </v-form>

  </v-container>
</template>

<script>
// @ is an alias to /src
import MenuBarBtn from '@/components/MenuBarBtn.vue'

export default {
  name: 'SignUp',
  components: {
    MenuBarBtn
  },
  data: () => ({
    valid: false,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    confirmPasswordRules: [
      v => !!v || 'Password Confirmation is required'
    ],

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    sendRegistration () {
      console.log('reg hit')
      fetch(`${this.$store.state.apiUrl}/auth/signup`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.bundleData())
      })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    },
    bundleData () {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
    }
  }
}
</script>
