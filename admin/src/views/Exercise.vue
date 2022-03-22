<template>
  <div>
    <LoadingMessage
      v-if="!loaded"
      :load-failed="loadFailed"
    />
    <div v-else>
      <div class="govuk-grid-row print-none">
        <div class="govuk-grid-column-one-quarter">
          <router-link
            class="govuk-back-link govuk-!-margin-top-0"
            :to="goBack"
          >
            Back
          </router-link>
        </div>
      </div>
      <div class="govuk-grid-row clearfix govuk-!-margin-bottom-2">
        <div class="govuk-grid-column-full">
          <span class="govuk-caption-xl">
            {{ exercise.referenceNumber }}
          </span>
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-0">
            {{ exerciseName }}
          </h1>
          <router-link
            v-if="!hasJourney && isEditable"
            class="govuk-link print-none"
            :to="{name: 'exercise-edit-name'}"
          >
            Edit name
          </router-link>
        </div>
      </div>
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-full">
          <SubNavigation
            v-if="!hasJourney && subNavigation.length > 1"
            :pages="subNavigation"
          />
        </div>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script>
import LoadingMessage from '@jac-uk/jac-kit/draftComponents/LoadingMessage';
import { mapState } from 'vuex';
import { isEditable, hasQualifyingTests, isProcessing } from '@/helpers/exerciseHelper';

export default {
  components: {
    LoadingMessage,
  },
  data() {
    return {
      loaded: false,
      loadFailed: false,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.currentUser.uid,
    }),
    exercise() {
      return this.$store.state.exerciseDocument.record;
    },
    isEditable() {
      return isEditable(this.exercise);
    },
    hasQualifyingTests() {
      return hasQualifyingTests(this.exercise);
    },
    isProcessing() {
      return isProcessing(this.exercise);
    },
    hasJourney() {
      return this.$store.getters['exerciseCreateJourney/hasJourney'];
    },
    exerciseName() {
      return this.exercise.name && this.exercise.name.length < 80 ? this.exercise.name : `${this.exercise.name.substring(0,79)}..`;
    },
    isInFavourites() {
      return this.userId && this.exercise && this.exercise.favouriteOf && this.exercise.favouriteOf.indexOf(this.userId) >= 0;
    },
    hasOpened() {
      if (this.exercise && this.exercise.applicationOpenDate <= new Date()) {
        return true;
      }
      return false;
    },
    subNavigation() {
      if (!this.exercise) { return []; }
      const path = `/exercise/${this.exercise.id}`;
      const subNavigation = [];
      subNavigation.push({ path: `${path}/details`, title: 'Exercise' });
      if (this.hasQualifyingTests || this.isProcessing) {
        subNavigation.push({ path: `${path}/tasks`, title: 'Tasks' });
      }
      if (this.isProcessing) {
        subNavigation.push({ path: `${path}/reports`, title: 'Reports' });
      }
      return subNavigation;
    },
    goBack() {
      if (this.$route.name === 'exercise-overview') {
        return {
          name: 'exercises',
        };
      } else {
        return {
          name: 'exercise-overview',
          params: {
            id: this.exercise ? this.exercise.id : this.$route.params.id,
          },
        };
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch('exerciseDocument/bind', id)
      .then((data) => {
        if (data === null) {
          this.redirectToErrorPage();
        }
        else {
          this.loaded = true;
        }
      }).catch((e) => {
        this.loadFailed = true;
        throw e;
      });
  },
  methods: {
    redirectToErrorPage() {
      this.$router.replace({ name: 'exercise-not-found' });
    },
  },
};
</script>
<style>
.govuk-heading-xl {
  margin-bottom: 0;
}
</style>
