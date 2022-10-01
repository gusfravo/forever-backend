import { getModelForClass, modelOptions, prop, pre } from "@typegoose/typegoose";

/**Se define la interfaz del doctor
*/
@modelOptions({
  schemaOptions: {
    timestamps:true
  }
})
export class Product {

  @prop({ required: true})
  sku: string;

  @prop({ required: true, trim:true })
  name: string;

  @prop()
  ccUnit: Number;

  @prop({ required: true })
  status: boolean;

}

const productModel = getModelForClass(Product);
export default productModel;
