import UserRoute from './userRoutes';
import TodoRoute from './todoRoutes';
import ItemRoute from './itemRoutes';

const routes = (router) => {
  UserRoute(router);
  TodoRoute(router);
  ItemRoute(router);
};

export default routes;
