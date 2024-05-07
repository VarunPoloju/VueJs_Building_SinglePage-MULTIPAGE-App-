import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from '@/components/teams/TeamMembers';
import NotFound from '@/components/nav/NotFound';
import UsersFooter from './components/users/UsersFooter.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';

import App from './App.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      // beforeEnter(to, from, next) {
      //   console.log(to, from, next);
      // },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  },
});

router.beforeEach(function (to, from, next) {
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs Auth');
    next();
  } else {
    next();
  }
  next();
});

router.afterEach(function (to, from) {
  //runs only once navigation confirmed
  // used for sending analytics data
  console.log(to, from);
});

const app = createApp(App);
app.use(router);

app.mount('#app');
