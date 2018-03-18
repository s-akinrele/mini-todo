import Authorization from '../middlewares/auth';
import ItemController from '../controllers/itemController';

const authorize = new Authorization();
const itemlist = new ItemController();

const itemRoute = (router) => {
  router.route('/todos/:id/items')
    .post(authorize.verifyToken, itemlist.createItemList)
    .get(authorize.verifyToken, itemlist.fetchItemList)

  router.route('/todo/:id/items/:item_id')
    .put(authorize.verifyToken, itemlist.updateItemList)
}

export default itemRoute;
