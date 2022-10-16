import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import multer from "multer";

import indexRoutes from "./routes/index.routes";
import levelRoutes from './routes/level.routes';
import productRoutes from './routes/product.routes';
import productLevelPricesRoutes from './routes/productLevelPrices.routes';
import saleRoutes from './routes/sale.routes';

import './database';

export class App {
  private app:Application;

  constructor(private port?: number | string){
    this.app = express();
    this.config();
    this.routers();
  }
  /** Método para inicializar la configuración del servidor
  */
  config(){
    this.app.set('port', this.port || process.env.PORT || 3000);
    /**
    Middlewares
    */
    this.app.use(morgan('dev')); // modulo utilizado para ver la peticion del cliente al servidor.
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:false}));
    this.app.use(multer().single('file')); // for parsing multipart/form-data

  }

  /**Metodo para definir la rutas de la aplicación
  */
  routers(){
    this.app.use(indexRoutes);
    this.app.use('/api/level', levelRoutes);
    this.app.use('/api/product', productRoutes);
    this.app.use('/api/productLevelPrice', productLevelPricesRoutes);
    this.app.use('/api/sale', saleRoutes);

  }
  /**Metodo para inicirar el servidor.
  */
  async start(){
    await this.app.listen(this.app.get('port'));
    console.log("[ APP ] server on port ", this.app.get('port'));
  }
}
