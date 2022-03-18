import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
Vue.use(Vuex);

// Vuex modules
import auth from '@/store/auth';
import services from '@/store/services';
import exerciseCollection from '@/store/exercise/collection';
import exerciseCreateJourney from '@/store/exercise/createJourney';
import exerciseDocument from '@/store/exercise/document';
import assessment from '@/store/assessment';
import assessments from '@/store/assessments';
import notifications from '@/store/notifications';
import invitations from '@/store/invitations';
import events from '@/store/events';

import characterChecks from '@/store/characterChecks/characterChecks';
import candidates from '@/store/candidates';
import notes from '@/store/notes';
import qualifyingTest from '@/store/qualifyingTest/qualifyingTest';
import qualifyingTestResponses from '@/store/qualifyingTest/qualifyingTestResponses';
import connectionMonitor from '@/store/connectionMonitor';
import qualifyingTestReports from '@/store/qualifyingTestReports/collection';
import qualifyingTestReport from '@/store/qualifyingTestReports/document';
import panels from '@/store/panels';

const store = new Vuex.Store({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    services,
    exerciseCollection,
    exerciseCreateJourney,
    exerciseDocument,
    assessment,
    assessments,
    events,
    notifications,
    invitations,
    candidates,
    notes,
    qualifyingTest,
    qualifyingTestResponses,
    connectionMonitor,
    qualifyingTestReports,
    qualifyingTestReport,
    panels,
    characterChecks,
  },
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0',
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {},
  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
  },
});

export default store;
