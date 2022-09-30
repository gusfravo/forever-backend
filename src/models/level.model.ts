import { getModelForClass, modelOptions, prop, pre } from "@typegoose/typegoose";

/**Se define la interfaz del doctor
*/
@modelOptions({
  schemaOptions: {
    timestamps:true
  }
})
export class Level {

  @prop({ required: true})
  name: string;

  @prop()
  status: boolean;

}

const levelModel = getModelForClass(Level);
export default levelModel;
