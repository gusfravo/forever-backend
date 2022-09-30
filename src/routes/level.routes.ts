import { Router } from 'express';
import { update, list , get, deleteOne } from '../controllers/level.controller';

class LevelRoutes {
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

const levelRoutes = new LevelRoutes();

export default levelRoutes.router;
