<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow" v-bind:darkMode="true"
          isBtn="bg-gradient-success" />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <Form @submit="onSubmit">
                    <div class="mb-3">
                      <div class="form-group">
                        <div>
                          <input v-model="email" type="text" class="form-control form-control-lg" name="email"
                            placeholder="Email" />
                        </div>
                      </div>
                      <span class="form-input-error" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </span>
                    </div>
                    <div class="mb-3">
                      <div class="form-group">
                        <div>
                          <input v-model="password" type="password" class="form-control form-control-lg" name="password"
                            placeholder="Password" />
                        </div>
                      </div>
                      <span class="form-input-error" v-if="`${v$.password.$error || serverError !== null}`"> {{
                        v$.password.$errors?.[0]?.$message ?? serverError }}
                      </span>
                    </div>
                    <argon-switch id="rememberMe">Remember me</argon-switch>

                    <div class="text-center">
                      <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg">Sign
                        in</argon-button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('/startseite-familie.jpg'); background-size: cover;">
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">"Graditude, Dignity, Donation"</h4>
                <p class="text-white position-relative">Gradido is created by us humans for us humans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import useValidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    ArgonSwitch,
    ArgonButton
  },
  setup() {
    return { v$: useValidate() }
  },
  data() {
    return {
      email: '',
      password: '',
      serverError: null
    }
  },
  validations() {
    return {
      email: { required, email: helpers.withMessage('This is not a valid email', email) },
      password: { required: helpers.withMessage('Password is required', required) }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {
        this.$store.dispatch("auth/login", { email: this.email, password: this.password }).then(
          () => {
            this.$router.push("/dashboard");
          },
          (error) => {
            this.serverError = error.response?.data?.message ?? 'Something went wrong'
          }
        );
      }
    }
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showSidenav = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
