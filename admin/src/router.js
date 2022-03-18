import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import EmptyRouterView from '@/components/EmptyRouterView';

import SignIn from '@/views/SignIn';

// Exercises
import Exercises from '@/views/Exercises';
import ExercisesExport from '@/views/ExercisesExport';
import Exercise from '@/views/Exercise';

// Exercise details
import ExerciseDetails from '@/views/Exercise/Details';
import ExerciseDetailsOverview from '@/views/Exercise/Details/Overview';
import ExerciseDetailsEditName from '@/views/Exercise/Details/EditName';
import ExerciseDetailsApplicationContent from '@/views/Exercise/Details/ApplicationContent/View';
import ExerciseDetailsApplicationContentEdit from '@/views/Exercise/Details/ApplicationContent/Edit';
import ExerciseDetailsAssessments from '@/views/Exercise/Details/Assessments/View';
import ExerciseDetailsAssessmentsEdit from '@/views/Exercise/Details/Assessments/Edit';
import ExerciseDetailsContacts from '@/views/Exercise/Details/Contacts/View';
import ExerciseDetailsContactsEdit from '@/views/Exercise/Details/Contacts/Edit';
import ExerciseDetailsDownloads from '@/views/Exercise/Details/Downloads/View';
import ExerciseDetailsDownloadsEdit from '@/views/Exercise/Details/Downloads/Edit';
import ExerciseDetailsEligibility from '@/views/Exercise/Details/Eligibility/View';
import ExerciseDetailsEligibilityEdit from '@/views/Exercise/Details/Eligibility/Edit';
import ExerciseDetailsInvitations from '@/views/Exercise/Details/Invitations/View';
import ExerciseDetailsInvitationsEdit from '@/views/Exercise/Details/Invitations/Edit';
import ExerciseDetailsShortlisting from '@/views/Exercise/Details/Shortlisting/View';
import ExerciseDetailsShortlistingEdit from '@/views/Exercise/Details/Shortlisting/Edit';
import ExerciseDetailsSummary from '@/views/Exercise/Details/Summary/View';
import ExerciseDetailsSummaryEdit from '@/views/Exercise/Details/Summary/Edit';
import ExerciseDetailsTimeline from '@/views/Exercise/Details/Timeline/View';
import ExerciseDetailsTimelineEdit from '@/views/Exercise/Details/Timeline/Edit';
import ExerciseDetailsVacancy from '@/views/Exercise/Details/Vacancy/View';
import ExerciseDetailsVacancyEdit from '@/views/Exercise/Details/Vacancy/Edit';
import ExerciseDetailsPreferences from '@/views/Exercise/Details/Preferences/View';
import ExerciseDetailsPreferencesEdit from '@/views/Exercise/Details/Preferences/Edit';

// Exercise reports
import ExerciseReports from '@/views/Exercise/Reports';
import ExerciseReportsQualifyingTestReports from '@/views/Exercise/Reports/QualifyingTestReports/QualifyingTestReports';
import QualifyingTestReportCreate from '@/views/Exercise/Reports/QualifyingTestReports/Create';
import QualifyingTestReport from '@/views/Exercise/Reports/QualifyingTestReports/QualifyingTestReport';
import QualifyingTestReports from '@/views/Exercise/Reports/QualifyingTestReports/QualifyingTestReports';
import QualifyingTestReportEdit from '@/views/Exercise/Reports/QualifyingTestReports/QualifyingTestReport/Edit';
import QualifyingTestReportView from '@/views/Exercise/Reports/QualifyingTestReports/QualifyingTestReport/View';
import QualifyingTestReportViewScore from '@/views/Exercise/Reports/QualifyingTestReports/QualifyingTestReport/ViewScore';

// Exercise tasks
import ExerciseTasks from '@/views/Exercise/Tasks';
import QualifyingTests from '@/views/Exercise/Tasks/QualifyingTests/Cover';
import QualifyingTest from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest';
import QualifyingTestNew from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/New';
import QualifyingTestNewFromClipboard from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/NewFromClipboard';
import QualifyingTestEdit from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/Edit';
import QualifyingTestView from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/View';
import QualifyingTestQuestionBuilder from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/TestBuilder';
import QualifyingTestDryRun from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/DryRun';
import QualifyingTestReview from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/Review';
import QualifyingTestResponses from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/Responses';
import QualifyingTestResponse from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/Response';
import QualifyingTestResponseView from '@/views/Exercise/Tasks/QualifyingTests/QualifyingTest/Response/View';
import QualifyingTestsCover from '@/views/Exercise/Tasks/QualifyingTests/Cover';

// Candidates
import Candidates from '@/views/Candidates/Candidates';
import CandidatesList from '@/views/Candidates/CandidatesList';
import CandidatesView from '@/views/Candidates/CandidatesView';

// Error pages
import ExerciseNotFound from '@/views/Errors/ExerciseNotFound';
import PageNotFound from '@/views/Errors/PageNotFound';

import Sandbox from '@/views/Sandbox';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/exercises',
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercises,
      meta: {
        requiresAuth: true,
        title: 'Exercises',
      },
    },
    {
      path: '/exercise/export',
      name: 'exercises-export',
      component: ExercisesExport,
      meta: {
        requiresAuth: true,
        title: 'Exercises Export',
      },
    },
    // sandbox component VV
    {
      path: '/sandbox',
      component: Sandbox,
      meta: {
        requiresAuth: true,
        title: 'sandbox',
      },
    },
    // sandbox component ^^
    {
      path: '/candidates',
      component: Candidates,
      children: [
        {
          path: '',
          component: CandidatesList,
          name: 'candidates-list',
          meta: {
            requiresAuth: true,
            title: 'Candidate | List',
          },
        },
        {
          path: ':id',
          component: CandidatesView,
          name: 'candidates-view',
          meta: {
            requiresAuth: true,
            title: 'Candidate | View',
          },
        },
      ],
    },
    {
      path: '/exercise/:id',
      component: Exercise,
      children: [
        {
          path: 'details',
          component: ExerciseDetails,
          children: [
            {
              path: '',
              redirect: 'overview',
            },
            {
              name: 'exercise-overview',
              path: 'overview',
              component: ExerciseDetailsOverview,
              meta: {
                requiresAuth: true,
                title: 'Overview | Exercise Details',
              },
            },
            {
              name: 'exercise-edit-name',
              path: 'edit-name',
              component: ExerciseDetailsEditName,
              meta: {
                requiresAuth: true,
                title: 'Edit Name | Exercise Details',
              },
            },
            {
              path: 'assessments',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-assessments',
                  path: '',
                  component: ExerciseDetailsAssessments,
                  meta: {
                    requiresAuth: true,
                    title: 'Assessment Options | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-assessments-edit',
                  path: 'edit',
                  component: ExerciseDetailsAssessmentsEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Assessment Options | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'contacts',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-contacts',
                  path: '',
                  component: ExerciseDetailsContacts,
                  meta: {
                    requiresAuth: true,
                    title: 'Contacts | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-contacts-edit',
                  path: 'edit',
                  component: ExerciseDetailsContactsEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Contacts | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'downloads',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-downloads',
                  path: '',
                  component: ExerciseDetailsDownloads,
                  meta: {
                    requiresAuth: true,
                    title: 'Downloads | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-downloads-edit',
                  path: 'edit',
                  component: ExerciseDetailsDownloadsEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Downloads | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'eligibility',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-eligibility',
                  path: '',
                  component: ExerciseDetailsEligibility,
                  meta: {
                    requiresAuth: true,
                    title: 'Eligibility | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-eligibility-edit',
                  path: 'edit',
                  component: ExerciseDetailsEligibilityEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Eligibility | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'invitations',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-invitations',
                  path: '',
                  component: ExerciseDetailsInvitations,
                  meta: {
                    requiresAuth: true,
                    title: 'Invitations | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-invitations-edit',
                  path: 'edit',
                  component: ExerciseDetailsInvitationsEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Invitations | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'shortlisting',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-shortlisting',
                  path: '',
                  component: ExerciseDetailsShortlisting,
                  meta: {
                    requiresAuth: true,
                    title: 'Shortlisting | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-shortlisting-edit',
                  path: 'edit',
                  component: ExerciseDetailsShortlistingEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Shortlisting | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'summary',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-summary',
                  path: '',
                  component: ExerciseDetailsSummary,
                  meta: {
                    requiresAuth: true,
                    title: 'Summary | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-summary-edit',
                  path: 'edit',
                  component: ExerciseDetailsSummaryEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Summary | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'timeline',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-timeline',
                  path: '',
                  component: ExerciseDetailsTimeline,
                  meta: {
                    requiresAuth: true,
                    title: 'Timeline | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-timeline-edit',
                  path: 'edit',
                  component: ExerciseDetailsTimelineEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Timeline | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'vacancy',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-vacancy',
                  path: '',
                  component: ExerciseDetailsVacancy,
                  meta: {
                    requiresAuth: true,
                    title: 'Vacancy Information | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-vacancy-edit',
                  path: 'edit',
                  component: ExerciseDetailsVacancyEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Vacancy Information | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'preferences',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-preferences',
                  path: '',
                  component: ExerciseDetailsPreferences,
                  meta: {
                    requiresAuth: true,
                    title: 'Preferences | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-preferences-edit',
                  path: 'edit',
                  component: ExerciseDetailsPreferencesEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Preferences | Exercise Details',
                  },
                },
              ],
            },
            {
              path: 'application-content',
              component: EmptyRouterView,
              children: [
                {
                  name: 'exercise-details-application-content',
                  path: '',
                  component: ExerciseDetailsApplicationContent,
                  meta: {
                    requiresAuth: true,
                    title: 'Application Content | Exercise Details',
                  },
                },
                {
                  name: 'exercise-details-application-content-edit',
                  path: 'edit',
                  component: ExerciseDetailsApplicationContentEdit,
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Application Content | Exercise Details',
                  },
                },
              ],
            },
          ],
        },
        {
          path: 'tasks',
          component: ExerciseTasks,
          children: [
            {
              path: '',
              redirect: 'qualifying-tests',
            },
            {
              path: 'equal-merit-tie-breakers',
              component: QualifyingTestsCover,
              props: {
                tieBreakers: true,
              },
              name: 'exercise-tasks-equal-merit-tie-breakers',
              meta: {
                requiresAuth: true,
                title: 'Equal Merit Tie-Breakers',
              },
            },
            {
              path: 'equal-merit-tie-breakers/new',
              component: QualifyingTestNew,
              props: {
                isTieBreaker: true,
              },
              name: 'equal-merit-tie-breaker-new',
              meta: {
                requiresAuth: true,
                title: 'Equal Merit Tie-Breakers | New',
              },
            },
            {
              path: 'equal-merit-tie-breakers/:qualifyingTestId',
              component: QualifyingTest,
              children: [
                {
                  path: '',
                  component: QualifyingTestView,
                  name: 'equal-merit-tie-breaker-view',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-Breaker | View',
                  },
                },
                {
                  path: 'edit',
                  component: QualifyingTestEdit,
                  name: 'equal-merit-tie-breaker-edit',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-Breaker | Edit',
                  },
                },
                {
                  path: 'build',
                  component: QualifyingTestQuestionBuilder,
                  name: 'equal-merit-tie-breaker-question-builder',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-Breaker | Question Builder',
                  },
                },
                {
                  path: 'dry-run',
                  component: QualifyingTestDryRun,
                  name: 'equal-merit-tie-breaker-dry-run',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-Breaker | Dry Run',
                  },
                },
                {
                  path: 'review',
                  component: QualifyingTestReview,
                  name: 'equal-merit-tie-breaker-review',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-Breaker | Review',
                  },
                },
                {
                  path: 'responses/:status',
                  component: QualifyingTestResponses,
                  name: 'equal-merit-tie-breaker-responses',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-Breaker | Responses',
                  },
                },
                {
                  path: 'response/:responseId',
                  component: QualifyingTestResponse,
                  children: [
                    {
                      path: '',
                      component: QualifyingTestResponseView,
                      name: 'equal-merit-tie-breaker-response-view',
                      meta: {
                        requiresAuth: true,
                        title: 'Equal Merit Tie-Breaker | Response View',
                      },
                    },
                  ],
                },
              ],
            },
            {
              path: 'qualifying-tests',
              component: QualifyingTests,
              props: {
                tieBreakers: false,
              },
              name: 'exercise-tasks-qualifying-tests',
              meta: {
                requiresAuth: true,
                title: 'Qualifying Tests | Exercise Tasks',
              },
            },
            {
              path: 'qualifying-tests/new',
              component: QualifyingTestNew,
              props: {
                isTieBreaker: false,
              },
              name: 'qualifying-test-new',
              meta: {
                requiresAuth: true,
                title: 'Create Qualifying Test | Exercise Tasks',
              },
            },
            {
              path: 'qualifying-tests/new-from-clipboard',
              component: QualifyingTestNewFromClipboard,
              name: 'qualifying-test-new-from-clipboard',
              meta: {
                requiresAuth: true,
                title: 'Create Qualifying Test from Clipboard | Exercise Tasks',
              },
            },
            {
              path: 'qualifying-tests/:qualifyingTestId',
              component: QualifyingTest,
              children: [
                {
                  path: '',
                  component: QualifyingTestView,
                  name: 'qualifying-test-view',
                  meta: {
                    requiresAuth: true,
                    title: 'Qualifying Test | Exercise Tasks',
                  },
                },
                {
                  path: 'edit',
                  component: QualifyingTestEdit,
                  name: 'qualifying-test-edit',
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Qualifying Test | Exercise Tasks',
                  },
                },
                {
                  path: 'build',
                  component: QualifyingTestQuestionBuilder,
                  name: 'qualifying-test-question-builder',
                  meta: {
                    requiresAuth: true,
                    title: 'Edit Questions | Qualifying Test | Exercise Tasks',
                  },
                },
                {
                  path: 'dry-run',
                  component: QualifyingTestDryRun,
                  name: 'qualifying-test-dry-run',
                  meta: {
                    requiresAuth: true,
                    title: 'Dry Run | Qualifying Test | Exercise Tasks',
                  },
                },
                {
                  path: 'review',
                  component: QualifyingTestReview,
                  name: 'qualifying-test-review',
                  meta: {
                    requiresAuth: true,
                    title: 'Review | Qualifying Test | Exercise Tasks',
                  },
                },
                {
                  path: 'responses/:status',
                  component: QualifyingTestResponses,
                  name: 'qualifying-test-responses',
                  meta: {
                    requiresAuth: true,
                    title: 'Responses | Qualifying Test | Exercise Tasks',
                  },
                },
                {
                  path: 'response/:responseId',
                  component: QualifyingTestResponse,
                  children: [
                    {
                      path: '',
                      component: QualifyingTestResponseView,
                      name: 'qualifying-test-response-view',
                      meta: {
                        requiresAuth: true,
                        title: 'Response | Qualifying Test | Exercise Tasks',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: 'reports',
          component: ExerciseReports,
          children: [
            {
              path: 'qualifying-test-reports',
              component: EmptyRouterView,
              children: [
                {
                  path: '',
                  component: ExerciseReportsQualifyingTestReports,
                  props: {
                    tieBreakers: false,
                  },
                  meta: {
                    requiresAuth: true,
                    title: 'Qualifying Test Reports | Exercise Reports',
                  },
                },
                {
                  path: 'create',
                  name: 'qualifying-test-report-create',
                  component: QualifyingTestReportCreate,
                  props: {
                    tieBreakers: false,
                  },
                  meta: {
                    requiresAuth: true,
                    title: 'Create Qualifying Test Report | Exercise Reports',
                  },
                },
                {
                  path: ':qualifyingTestReportId',
                  component: QualifyingTestReport,
                  children: [
                    {
                      path: '',
                      component: QualifyingTestReportView,
                      name: 'qualifying-test-report-view',
                      meta: {
                        requiresAuth: true,
                        title: 'Qualifying Test Report | Exercise Reports',
                      },
                    },
                    {
                      path: 'edit',
                      component: QualifyingTestReportEdit,
                      name: 'qualifying-test-report-edit',
                      meta: {
                        requiresAuth: true,
                        title: 'Edit Qualifying Test Report | Exercise Reports',
                      },
                    },
                    {
                      path: ':score',
                      component: QualifyingTestReportViewScore,
                      name: 'qualifying-test-report-view-score',
                      meta: {
                        requiresAuth: true,
                        title: 'Score | Qualifying Test Report | Exercise Reports',
                      },
                    },
                  ],
                },
              ],
            },
            {
              path: 'equal-merit-tie-breaker-reports',
              component: QualifyingTestReports,
              props: {
                tieBreakers: true,
              },
              name: 'equal-merit-tie-breaker-reports',
              meta: {
                requiresAuth: true,
                title: 'Equal Merit Tie-breaker Reports',
              },
            },
            {
              path: 'equal-merit-tie-breaker-report-create',
              component: QualifyingTestReportCreate,
              props: {
                tieBreakers: true,
              },
              name: 'equal-merit-tie-breaker-report-create',
              meta: {
                requiresAuth: true,
                title: 'Equal Merit Tie-breaker Report | New',
              },
            },
            {
              path: 'equal-merit-tie-breaker-reports/:qualifyingTestReportId',
              component: QualifyingTestReport,
              children: [
                {
                  path: '',
                  component: QualifyingTestReportView,
                  name: 'equal-merit-tie-breaker-report-view',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-breaker Report | View',
                  },
                },
                {
                  path: 'edit',
                  component: QualifyingTestReportEdit,
                  name: 'equal-merit-tie-breaker-report-edit',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-breaker Report | Edit',
                  },
                },
                {
                  path: ':score',
                  component: QualifyingTestReportViewScore,
                  name: 'equal-merit-tie-breaker-report-view-score',
                  meta: {
                    requiresAuth: true,
                    title: 'Equal Merit Tie-breaker Report | View Score',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/errors/exercise-not-found',
      name: 'exercise-not-found',
      component: ExerciseNotFound,
      meta: {
        requiresAuth: true,
        title: 'Exercise Not Found',
      },
    },
    {
      path: '/errors/page-not-found',
      name: 'page-not-found',
      component: PageNotFound,
      meta: {
        requiresAuth: true,
        title: 'Page Not Found',
      },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        title: 'Sign In',
      },

      beforeEnter: (to, from, next) => {
        const isSignedIn = store.getters['auth/isSignedIn'];
        if (isSignedIn) {
          return next({ name: 'exercises' });
        }
        return next();
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Global before guard to verify if a user can have access to other than sign-in pages.
// It redirects unauthorized users to a sign-in page.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isSignedIn = store.getters['auth/isSignedIn'];

  if (requiresAuth && !isSignedIn) {
    return next({ name: 'sign-in' });
  }

  return next();
});

// Global after hook to set an appropriate title for the page
router.afterEach((to) => {
  document.title = `${to.meta.title} | JAC Digital Platform`;
});

export default router;
