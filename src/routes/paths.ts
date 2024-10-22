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
        category: {
          root: '/dashboard/admin/add-questions/category',
          extDropDown: '/dashboard/admin/add-questions/category/extDropDown',
          Highlight: '/dashboard/admin/add-questions/category/Highlight',
          matrixNGrid: '/dashboard/admin/add-questions/category/matrixNGrid',
          dragNDrop: '/dashboard/admin/add-questions/category/dragNDrop',
          bowTie: '/dashboard/admin/add-questions/category/bowTie',
          selectOne: '/dashboard/admin/add-questions/category/selectOne',
          mcq: '/dashboard/admin/add-questions/category/mcq',
        },
      },
    },
    requests: {
      root: '/dashboard/requests/',
      loan: '/dashboard/requests/loan',
      leave: '/dashboard/requests/leave',
    },
    management: {
      root: '/dashboard/management',
      customers: {
        root: '/dashboard/management/customers',
        list: '/dashboard/management/customers/list',
        view: (customerId: string) => `/dashboard/management/customers/${customerId}`,
      },
    },
    apps: {
      root: '/dashboard/apps',
      kanban: '/dashboard/apps/kanban',
    },
    widgets: {
      root: '/dashboard/widgets',
      metrics: '/dashboard/widgets/metrics',
      charts: '/dashboard/widgets/charts',
      tables: '/dashboard/widgets/tables',
    },
  },
};
