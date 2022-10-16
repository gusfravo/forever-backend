import { Router } from 'express';
import { update, list , get, deleteOne, printTicket } from '../controllers/sale.controller';

class SaleRoutes {
  public router: Router = Router();

  constructor(){
    this.config();
  }

  config(): void {
    this.router.post('/update',update);
    this.router.post('/list',list);
    this.router.post('/get',get);
    this.router.post('/deleteOne',deleteOne);
    this.router.post('/printTicket',printTicket);
  }

}

const saleRoutes = new SaleRoutes();

export default saleRoutes.router;
