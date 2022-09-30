import { Router } from 'express';
import { update, list , get, deleteOne } from '../controllers/product.controller';

class ProductRoutes {
  public router: Router = Router();

  constructor(){
    this.config();
  }

  config(): void {
    this.router.post('/update',update);
    this.router.post('/list',list);
    this.router.post('/get',get);
    this.router.post('/deleteOne',deleteOne);
  }

}

const productRoutes = new ProductRoutes();

export default productRoutes.router;
