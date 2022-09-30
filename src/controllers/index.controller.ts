import { Request, Response } from 'express';
// import connection  from '../database';

class IndexController {

   public async index (req:Request, res: Response){
     // const db = await connection;
    res.json({
      code: "Bienvenido.",
      message:'Estas consultado el API REST de la calculadora de precios Forever.',
      transaction:'ok'
    });
  }

}


export const indexController = new IndexController();
