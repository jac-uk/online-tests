<template>
  <div class="page-container">
    <LoadingMessage
      v-if="loaded === false"
      :load-failed="loadFailed"
    />
    <template v-else>
      <Header v-if="!fullPageMode" />

      <main
        id="main-content"
        class="govuk-width-container"
        role="main"
      >
        <div
          :class="fullPageMode ? 'govuk-!-margin-0' : 'govuk-main-wrapper govuk-main-wrapper--auto-spacing govuk-!-padding-top-0'"
        >
          <Breadcrumb />
          <RouterView />
        </div>
      </main>

      <Footer
        v-if="!fullPageMode"
      />
    </template>
  </div>
</template>

<script>
import Header from '@/components/Page/Header';
import Footer from '@/components/Page/Footer';
import LoadingMessage from '@/components/LoadingMessage';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'App',
  components: {
    LoadingMessage,
    Header,
    Footer,
    Breadcrumb,
  },
  data() {
    return {
      loaded: false,
      loadFailed: false,
    };
  },
  computed: {
    fullPageMode() {
      return this.$route.meta.fullPageMode;
    },
    isSignedIn() {
      return this.$store.getters['auth/isSignedIn'];
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('session/load');
      this.loaded = true;
    } catch {
      this.loadFailed = true;
    }
  },
};
</script>

<style lang="scss" scoped>

  .page-container {
    position: relative;
    min-height: 100%;
    overflow: hidden;
  }
</style>
