import { Request, Response } from 'express';
import ProductLevelPrices from '../models/productLevelPrices.model';

/**Método para crear un nivel
*/
export async function update(req: Request, res: Response){
  try{
    const data = req.body;

    let object = new ProductLevelPrices();
    if(data._id != '' && data._id != undefined){
      // como existe un id obtenemos el registro
      let objectAux = await ProductLevelPrices.findById(data._id);
      if(objectAux){
        object = objectAux;
      }
    }
    //instanciamos el objecto a crear
    object.price = data.price;
    object.product = data.product._id;
    object.level = data.level._id;
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
    console.log("[ERROR] -> productLevelPrices:update -> ",e);
    res.status(500);
    return res.json({
      code: "error:productLevelPrices:update:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}

/**Método para obtener un nivel
*/

export async function get (req: Request, res: Response){
  try{
    const data = req.body;
    let level = await ProductLevelPrices.findById(data._id).populate('product',['id','name']).populate('level',['id','name']);
    res.status(200);
    return res.json({
      code: "success:product:get:001",
      object:level,
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

/**Método para listar los niveles
*/
export async function list (req: Request, res: Response){
  try{
    const data = req.body;
    let instanceList = await ProductLevelPrices.find({});
    res.status(200);
    return res.json({
      code: "success:product:list:001",
      object:{
        instanceList:instanceList,
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

/**Método para listar de precios por productos
*/
export async function findAllByProduct (req: Request, res: Response){
  try{
    const data = req.body;
    let instanceList = await ProductLevelPrices.find({product:data.product._id}).populate('product',['id','name']).populate('level',['id','name']);
    res.status(200);
    return res.json({
      code: "success:product:list:001",
      object:{
        instanceList:instanceList,
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


/**Método para elliminar un nivel
*/
export async function deleteOne (req: Request, res: Response){
  try{
    const data = req.body;
    let level = await ProductLevelPrices.findById(data._id);
    level?.deleteOne();
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
