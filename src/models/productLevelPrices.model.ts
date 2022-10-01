import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Product } from './product.model';
import { Level } from './level.model';

/**Se define la interfaz del doctor
*/
@modelOptions({
  schemaOptions: {
    timestamps:true
  }
})
export class ProductLevelPrice {

  @prop({ required: true})
  price: number;

  @prop({ ref: () => Product })
  public product?: Ref<Product>;

  @prop({ ref: () => Level })
  public level?: Ref<Level>;

}

const productLevelPriceModel = getModelForClass(ProductLevelPrice);
export default productLevelPriceModel;
