import { getModelForClass, modelOptions, prop , Severity, mongoose} from "@typegoose/typegoose";


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

  @prop({ allowMixed: Severity.ALLOW })
  prices?:never[];

}

const productModel = getModelForClass(Product);
export default productModel;
