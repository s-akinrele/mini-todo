import UserRoute from './userRoutes';
import TodoRoute from './todoRoutes';

const routes = (router) => {
  UserRoute(router);
  TodoRoute(router);
};

export default routes;