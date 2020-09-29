import Vue from 'vue';
import VueRouter from 'vue-router';
import { Quizs } from '@/const';

Vue.use(VueRouter);

const createRoutes = (quizs) => {
  const routes = [];
  const quizsKeys = Object.keys(quizs);
  quizsKeys.forEach((key) => {
    const quiz = quizs[key];
    const route = {
      path: `/${quiz.path}`,
      component() {
        return import(`@/components/solution-${quiz.path}.vue`);
      },
    };
    routes.push(route);
  });
  routes.unshift({
    path: '/',
    redirect: routes[0].path,
  });
  return routes;
};

const router = new VueRouter({
  mode: 'hash',
  routes: createRoutes(Quizs),
});

export default router;
