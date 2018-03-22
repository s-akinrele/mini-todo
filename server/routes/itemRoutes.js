import Authorization from '../middlewares/auth';
import ItemController from '../controllers/itemController';

const authorize = new Authorization();
const itemlist = new ItemController();

const itemRoute = (router) => {
  router.route('/todos/:id/items')
    .post(authorize.verifyToken, itemlist.createItemList)
    .get(authorize.verifyToken, itemlist.fetchItemList)

  router.route('/todos/:id/items/:item_id')
    .get(authorize.verifyToken, itemlist.fetchItem)
    .put(authorize.verifyToken, itemlist.updateItemList)
    .delete(authorize.verifyToken, itemlist.deleteItem)
}

export default itemRoute;
