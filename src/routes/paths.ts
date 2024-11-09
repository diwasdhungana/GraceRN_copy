export const paths = {
  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    otp: '/auth/otp',
    terms: '/auth/terms',
    privacy: '/auth/privacy',
  },

  dashboard: {
    root: '/dashboard',
    home: '/dashboard/home',
    admin: {
      root: '/dashboard/admin',
      addQuestions: {
        root: '/dashboard/admin/add-questions',
      },
      viewQuestions: {
        root: '/dashboard/admin/view-questions/',
        viewSpecificQuestions: '/dashboard/admin/view-questions/:questionId',
      },
      viewSubjectSystem: {
        root: '/dashboard/admin/subjects-systems',
      },
    },
    student: {
      root: '/dashboard/student',
      createTest: {
        root: '/dashboard/student/create-test',
      },
      attemptTest: {
        root: '/dashboard/student/test',
      },
      viewResults: {
        root: '/dashboard/student/view-results',
        viewSpecificResults: '/dashboard/student/view-results/:resultId',
      },
    },
  },
};
