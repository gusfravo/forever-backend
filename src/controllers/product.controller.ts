import { Request, Response } from 'express';
import Product from '../models/product.model';

/**Método para crear un producto
*/
export async function update(req: Request, res: Response){
  try{
    const data = req.body;

    let object = new Product();
    if(data._id != '' && data._id != undefined){
      // como existe un id obtenemos el registro
      let objectAux = await Product.findById(data._id);
      if(objectAux){
        object = objectAux;
      }
    }
    //instanciamos el objecto a crear
    object.name = data.name;
    object.sku = data.sku;
    object.ccUnit = data.ccUnit;
    object.status = data.status;

    //Guardamos en BD el objecto
    await object.save();

    res.status(200);
    return res.json({
      code: "success:product:update:001",
      object:object,
      message:'Registro creado exitosamente',
      transaction:'ok'
    });

  }catch(e){
    res.status(400);
    return res.json({
      code: "error:product:update:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}

/**Método para obtener un producto
*/

export async function get (req: Request, res: Response){
  try{
    const data = req.body;
    let object = await Product.findById(data._id);
    res.status(200);
    return res.json({
      code: "success:product:get:001",
      object:object,
      message:'Registro obtenido exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> product:get -> ",e);
    res.status(400);
    return res.json({
      code: "error:product:get:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}

/**Método para listar los productos con paginado
*/
export async function list (req: Request, res: Response){
  try{
    const data = req.body;
    let instanceList = await Product.find({}).limit(data.max).skip(data.max*data.page).sort({create_date:'asc'});
    let total = await Product.countDocuments(instanceList);
    res.status(200);
    return res.json({
      code: "success:product:list:001",
      object:{
        instanceList:instanceList,
        total:total
      },
      message:'Registro obtenido exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> product:list -> ",e);
    res.status(400);
    return res.json({
      code: "error:product:list:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}


/**Método para elliminar un producto
*/
export async function deleteOne (req: Request, res: Response){
  try{
    const data = req.body;
    let object = await Product.findById(data._id);
    object?.deleteOne();
    res.status(200);
    return res.json({
      code: "success:product:deleteOne:001",
      object:{},
      message:'Registro eliminado exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> product:deleteOne -> ",e);
    res.status(400);
    return res.json({
      code: "error:product:deleteOne:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}
