<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-full">
      <form
        ref="formRef"
        @submit.prevent="login"
      >
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">
            Sign in
          </h1>

          <p class="govuk-body-l">
            Or
            <RouterLink
              class="govuk-link"
              data-module="govuk-button"
              :to="{ name: 'sign-up' }"
            >
              create an account
            </RouterLink>
            if you do not have one.
          </p>

          <!-- <p>
            <button
              type="button"
              class="govuk-button button-image"
              @click="loginWithGoogle"
            >
              <img
                alt="Sign in with Google"
                src="@/assets/btn_google_signin_light_normal_web@2x.png"
                width="191"
              >
            </button>
          </p> -->

          <ErrorSummary :errors="errors" />

          <TextField
            id="email"
            v-model="formData.email"
            label="Email address"
            type="email"
          />

          <TextField
            id="password"
            v-model="formData.password"
            label="Password"
            type="password"
          />

          <button class="govuk-button">
            Continue
          </button>

          <p class="govuk-body">
            Problems signing in?
            <RouterLink
              class="govuk-link"
              data-module="govuk-button"
              :to="{ name: 'reset-password' }"
            >
              Reset your password
            </RouterLink>
            here.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ErrorSummary from '@/components/Form/ErrorSummary';
import TextField from '@/components/Form/TextField';
import { auth } from '@/firebase';

export default {
  components: {
    ErrorSummary,
    TextField,
  },
  data () {
    return {
      formData: {},
      errors: [],
    };
  },
  methods: {
    // loginWithGoogle() {
    //   const provider = new auth.GoogleAuthProvider();
    //   auth().signInWithPopup(provider);
    // },
    login() {
      if (this.formData.email && this.formData.password) {
        this.errors = [];
        auth().signInWithEmailAndPassword(this.formData.email, this.formData.password)
          .then((userCredential) => {
            const objToLog = {
              type: 'login',
              id: userCredential.user.uid,
              data: {
                uid: userCredential.user.uid,
                meta: this.$browserDetect.meta,
              },
            };
            this.$store.dispatch('logs/save', objToLog);
            this.$store.dispatch('auth/setCurrentUser', userCredential.user);
            this.$router.push({ name: 'qualifying-tests' });
          })
          .catch((error) => {
            this.errors.push({ id: 'email', message: error.message });
          });
      }
    },
  },
};
</script>

<style scoped>
  .login-container {
    max-width: 360px;
    margin: 0 auto;
  }
  .button-image {
    padding: 0;
    border: none;
    margin: 0;
    box-shadow: none;
    background-color: transparent;
  }

</style>
