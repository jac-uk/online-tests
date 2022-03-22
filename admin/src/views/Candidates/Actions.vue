<template>
  <div>
    <form
      ref="form"
      @submit.prevent="validateAndSave"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-three-quarters">
          <h1
            class="govuk-heading-l govuk-!-margin-top-9 govuk-!-margin-bottom-6"
          >
            Update candidate login email address
          </h1>
        </div>
      </div>

      <div class="govuk-grid-row">
        <div class="govuk-grid-column-one-half">
          <Banner
            v-if="status"
            :message="message"
            :status="status"
          />
        </div>
      </div>

      <div class="govuk-grid-row">
        <div class="govuk-grid-column-three-quarters">
          <span
            v-if="submitted && !status"
            class="govuk-body govuk-!-margin-top-6 govuk-!-margin-bottom-2"
          >
            Please wait... Your request is being processed.
          </span>
        </div>
      </div>

      <div class="govuk-grid-row">
        <div class="govuk-grid-column-three-quarters">
          <h2
            class="govuk-heading-m govuk-!-margin-top-6 govuk-!-margin-bottom-6"
          >
            Current email address: {{ currentEmail }}
          </h2>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from '@firebase/app';
import { functions } from '@/firebase';
import { authorisedToPerformAction }  from '@/helpers/authUsers';
import Banner from '@jac-uk/jac-kit/draftComponents/Banner';
import Form from '@jac-uk/jac-kit/draftComponents/Form/Form';

export default {
  name: 'Actions',
  components: {
    Banner,
  },
  extends: Form,
  props: {
    candidateId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      authorisedToPerformAction: false,
      currentEmailAddress: 'unknown',
      newEmailAddress: null,
      message: '',
      status: null,
      submitted: false,
    };
  },
  computed: {
    currentEmail() {
      return this.currentEmailAddress;
    },
  },
  async created() {
    const email = firebase.auth().currentUser.email;
    this.authorisedToPerformAction = await authorisedToPerformAction(email);
    if (this.authorisedToPerformAction) {
      this.getCurrentEmailAddress(this.candidateId);
    }
  },
  methods: {
    async getCurrentEmailAddress() {
      try {
        const response = await functions.httpsCallable('getUserEmailByID')({
          candidateId: this.candidateId });

        if (response.data === false) {
          this.setMessage('Current email address could not be retrieved.', 'warning');
        } else {
          this.currentEmailAddress = response.data;
        }
      }
      catch (error) {
        this.setMessage('Failed to perform action.', 'warning');
      }
    },
    setMessage(message, status) {
      this.status = status;
      this.message = message;
    },
  },
};
</script>
