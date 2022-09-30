import { Router } from 'express';
import { update, list , get, deleteOne, findAllByProducts } from '../controllers/productLevelPrices.controller';

class ProductLevelPricesRoutes {
  public router: Router = Router();

  constructor(){
    this.config();
  }

  config(): void {
    this.router.post('/update',update);
    this.router.post('/list',list);
    this.router.post('/get',get);
    this.router.post('/deleteOne',deleteOne);
    this.router.post('/findAllByProducts',findAllByProducts);
  }

}

const productLevelPricesRoutesRoutes = new ProductLevelPricesRoutes();

export default productLevelPricesRoutesRoutes.router;
