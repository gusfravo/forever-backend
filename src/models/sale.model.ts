import { getModelForClass, modelOptions, prop , Severity, mongoose, Ref, pre} from "@typegoose/typegoose";
import { Product } from './product.model';

//Subdocumento de productSale
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
class ProductSale{
  @prop()
  public unitPrice: number;

  @prop()
  public quantity: number;

  @prop()
  public subtotal: number;

  @prop()
  public total: number;

  @prop()
  public concept: string;

  @prop({ ref: () => Product })
  public product: Ref<Product>; // referecia a un producto

}

@modelOptions({
  schemaOptions: {
    timestamps:true
  }
})
@pre<Sale>('save', function() {
  //creamos el folio completo
  if(!this.folio){
    this.folio = Math.floor((Math.random() * (10000000 - 1 + 1)) + 1);
  }
})

export class Sale {
  @prop()
  public folio: number; // folio

  @prop()
  public subtotal: number;

  @prop()
  public total: number;

  @prop({ type: () => ProductSale })
  public products: ProductSale[]; // listado de productos de la venta

}

const saleModel = getModelForClass(Sale);
export default saleModel;
