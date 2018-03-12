import Authorization from '../middlewares/auth';
import ItemController from '../controllers/itemController';

const authorize = new Authorization();
const itemlist = new ItemController();

const itemRoute = (router) => {
  router.route('/todos/:id/item')
    .post(authorize.verifyToken, itemlist.createItemList)
    .put(authorize.verifyToken, itemlist.updateItemList)
}

export default itemRoute;
