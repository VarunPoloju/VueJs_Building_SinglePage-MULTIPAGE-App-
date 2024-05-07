import { createApp } from 'vue';

import App from './App.vue';

import router from './router.js';

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
