import { Request, Response } from 'express';
import Level from '../models/level.model';

/**Método para crear un nivel
*/
export async function update(req: Request, res: Response){
  try{
    const data = req.body;

    let level = new Level();
    if(data._id != '' && data._id != undefined){
      // como existe un id obtenemos el registro
      let levelAux = await Level.findById(data._id);
      if(levelAux){
        level = levelAux;
      }
    }
    //instanciamos el objecto a crear
    level.name = data.name;
    level.status = data.status;

    //Guardamos en BD el objecto
    await level.save();

    res.status(200);
    return res.json({
      code: "success:level:update:001",
      object:level,
      message:'Registro creado exitosamente',
      transaction:'ok'
    });

  }catch(e){
    res.status(400);
    return res.json({
      code: "error:level:update:002",
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
    let level = await Level.findById(data._id);
    res.status(200);
    return res.json({
      code: "success:level:get:001",
      object:level,
      message:'Registro obtenido exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> level:get -> ",e);
    res.status(400);
    return res.json({
      code: "error:level:get:002",
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
    let instanceList = await Level.find({});
    res.status(200);
    return res.json({
      code: "success:level:list:001",
      object:{
        instanceList:instanceList,
      },
      message:'Registro obtenido exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> level:list -> ",e);
    res.status(400);
    return res.json({
      code: "error:level:list:002",
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
    let level = await Level.findById(data._id);
    level?.deleteOne();
    res.status(200);
    return res.json({
      code: "success:level:deleteOne:001",
      object:{},
      message:'Registro eliminado exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> level:deleteOne -> ",e);
    res.status(400);
    return res.json({
      code: "error:level:deleteOne:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}
