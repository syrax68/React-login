import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DocsLayout from 'src/layouts/DocsLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/home/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/general/:parameter',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path: '/app/general/trainer',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path: '/app/general/organisations',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path: '/app/general/account',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path: '/app/general/:parameter1/:parameter2',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path: '/app/general/account/notifications',
        component: lazy(() => import('src/views/account/AccountView/General'))
      },
      {
        exact: true,
        path: '/app/general/account/security',
        component: lazy(() => import('src/views/account/AccountView/Security'))
      },
      {
        exact: true,
        path: '/app/general/account/subscription',
        component: lazy(() => import('src/views/account/AccountView/Subscription'))
      },
      {
        exact: true,
        path: '/app/calendar',
        component: lazy(() => import('src/views/calendar/CalendarView'))
      },
      {
        exact: true,
        path: [
          '/app/chat/new',
          '/app/chat/:threadKey'
        ],
        component: lazy(() => import('src/views/chat/ChatView'))
      },
      {
        exact: true,
        path: '/app/chat',
        component: () => <Redirect to="/app/chat/new" />
      },
      {
        exact: true,
        path: '/app/extra/charts/apex',
        component: lazy(() => import('src/views/extra/charts/ApexChartsView'))
      },
      {
        exact: true,
        path: '/app/extra/forms/formik',
        component: lazy(() => import('src/views/extra/forms/FormikView'))
      },
      {
        exact: true,
        path: '/app/extra/forms/redux',
        component: lazy(() => import('src/views/extra/forms/ReduxFormView'))
      },
      {
        exact: true,
        path: '/app/extra/editors/draft-js',
        component: lazy(() => import('src/views/extra/editors/DraftEditorView'))
      },
      {
        exact: true,
        path: '/app/extra/editors/quill',
        component: lazy(() => import('src/views/extra/editors/QuillEditorView'))
      },
      {
        exact: true,
        path: '/app/kanban',
        component: lazy(() => import('src/views/kanban/KanbanView'))
      },
      {
        exact: true,
        path: [
          '/app/mail/label/:customLabel/:mailId?',
          '/app/mail/:systemLabel/:mailId?'
        ],
        component: lazy(() => import('src/views/mail/MailView'))
      },
      {
        exact: true,
        path: '/app/mail',
        component: () => <Redirect to="/app/mail/all" />
      },
      {
        exact: true,
        path: '/app/management/contacts',
        component: lazy(() => import('src/views/contact/ContactListView'))
      },
      {
        exact: true,
        path: '/app/management/contacts/:contactId',
        component: lazy(() => import('src/views/contact/ContactDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/contacts/:contactId/edit',
        component: lazy(() => import('src/views/contact/ContactEditView'))
      },
      {
        exact: true,
        path: '/app/management/invoices',
        component: lazy(() => import('src/views/invoice/InvoiceListView'))
      },
      {
        exact: true,
        path: '/app/management/invoices/:invoiceId',
        component: lazy(() => import('src/views/invoice/InvoiceDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/demands',
        component: lazy(() => import('src/views/demand/DemandListView'))
      },
      {
        exact: true,
        path: '/app/management/demands/:demandId',
        component: lazy(() => import('src/views/demand/DemandDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/products',
        component: lazy(() => import('src/views/product/ProductListView'))
      },
      {
        exact: true,
        path: '/app/management/products/create',
        component: lazy(() => import('src/views/product/ProductCreateView'))
      },
      {
        exact: true,
        path: '/app/management',
        component: () => <Redirect to="/app/management/contacts" />
      },
      {
        exact: true,
        path: '/app/sessions/overview',
        component: lazy(() => import('src/views/session/OverviewView'))
      },
      {
        exact: true,
        path: '/app/sessions/browse',
        component: lazy(() => import('src/views/session/SessionBrowseView'))
      },
      {
        exact: true,
        path: '/app/sessions/create',
        component: lazy(() => import('src/views/session/SessionCreateView'))
      },
      {
        exact: true,
        path: '/app/sessions/:id',
        component: lazy(() => import('src/views/session/SessionDetailsView'))
      },
      {
        exact: true,
        path: '/app/sessions',
        component: () => <Redirect to="/app/sessions/browse" />
      },
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard-seller',
        component: lazy(() => import('src/views/reports/DashboardAlternativeView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard-trainer',
        component: lazy(() => import('src/views/reports/DashboardTrainerView'))
      },
      {
        exact: true,
        path: '/app/reports',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        exact: true,
        path: '/app/social/feed',
        component: lazy(() => import('src/views/social/FeedView'))
      },
      {
        exact: true,
        path: '/app/social/profile',
        component: lazy(() => import('src/views/social/ProfileView'))
      },
      {
        exact: true,
        path: '/app/social',
        component: () => <Redirect to="/app/social/profile" />
      },
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '/docs',
    layout: DocsLayout,
    routes: [
      {
        exact: true,
        path: '/docs',
        component: () => <Redirect to="/docs/welcome" />
      },
      {
        exact: true,
        path: '/docs/welcome',
        component: lazy(() => import('src/views/docs/WelcomeView'))
      },
      {
        exact: true,
        path: '/docs/getting-started',
        component: lazy(() => import('src/views/docs/GettingStartedView'))
      },
      {
        exact: true,
        path: '/docs/environment-variables',
        component: lazy(() => import('src/views/docs/EnvironmentVariablesView'))
      },
      {
        exact: true,
        path: '/docs/deployment',
        component: lazy(() => import('src/views/docs/DeploymentView'))
      },
      {
        exact: true,
        path: '/docs/api-calls',
        component: lazy(() => import('src/views/docs/APICallsView'))
      },
      {
        exact: true,
        path: '/docs/analytics',
        component: lazy(() => import('src/views/docs/AnalyticsView'))
      },
      {
        exact: true,
        path: '/docs/authentication',
        component: lazy(() => import('src/views/docs/AuthenticationView'))
      },
      {
        exact: true,
        path: '/docs/routing',
        component: lazy(() => import('src/views/docs/RoutingView'))
      },
      {
        exact: true,
        path: '/docs/settings',
        component: lazy(() => import('src/views/docs/SettingsView'))
      },
      {
        exact: true,
        path: '/docs/state-management',
        component: lazy(() => import('src/views/docs/StateManagementView'))
      },
      {
        exact: true,
        path: '/docs/theming',
        component: lazy(() => import('src/views/docs/ThemingView'))
      },
      {
        exact: true,
        path: '/docs/support',
        component: lazy(() => import('src/views/docs/SupportView'))
      },
      {
        exact: true,
        path: '/docs/changelog',
        component: lazy(() => import('src/views/docs/ChangelogView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: HomeView
      },
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pricing/PricingView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
