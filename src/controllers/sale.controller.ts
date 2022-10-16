import { Request, Response } from 'express';
import Sale from '../models/sale.model';
import { generatePdf } from 'html-pdf-node';
import { render } from 'mustache';
import { readFileSync } from 'fs';
import path from 'path';

/**Método para crear un nivel
*/
export async function update(req: Request, res: Response){
  try{
    const data = req.body;

    let sale = new Sale();
    if(data._id != '' && data._id != undefined){
      // como existe un id obtenemos el registro
      let saleAux = await Sale.findById(data._id);
      if(saleAux){
        sale = saleAux;
      }
    }
    //instanciamos el objecto a crear

    sale.subtotal = data.subtotal;
    sale.total = data.total;
    sale.products = data.products;

    //Guardamos en BD el objecto
    await sale.save();

    res.status(200);
    return res.json({
      code: "success:sale:update:001",
      object:sale,
      message:'Registro creado exitosamente',
      transaction:'ok'
    });

  }catch(e){
    console.log(e);
    res.status(400);
    return res.json({
      code: "error:sale:update:002",
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
    let sale = await Sale.findById(data._id);
    res.status(200);
    return res.json({
      code: "success:sale:get:001",
      object:sale,
      message:'Registro obtenido exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> sale:get -> ",e);
    res.status(400);
    return res.json({
      code: "error:sale:get:002",
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
    let instanceList = await Sale.find({});
    res.status(200);
    return res.json({
      code: "success:sale:list:001",
      object:{
        instanceList:instanceList,
      },
      message:'Registro obtenido exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> sale:list -> ",e);
    res.status(400);
    return res.json({
      code: "error:sale:list:002",
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
    let sale = await Sale.findById(data._id);
    sale?.deleteOne();
    res.status(200);
    return res.json({
      code: "success:sale:deleteOne:001",
      object:{},
      message:'Registro eliminado exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> sale:deleteOne -> ",e);
    res.status(400);
    return res.json({
      code: "error:sale:deleteOne:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}

/**Método para imprimir un pdf
*/
export async function printTicket (req: Request, res: Response){
  try{
    const data = req.body;
    let sale = await Sale.findById(data._id);
    let options = {
      width:'80mm'
    }
    let saleAux:any = sale;
    saleAux.dateAux = saleAux.createdAt.toLocaleString('es-MX');

    const template = readFileSync(path.join(__dirname, '../views/saleTicket.html'), { encoding: 'utf8' });
    var rendered = render(template, sale);
    let fileTpPDF = { content: rendered };

    let pdfFile = await generatePdf(fileTpPDF,options);

    res.status(200);
    return res.json({
      code: "success:sale:get:001",
      object:pdfFile,
      message:'Registro obtenido exitosamente',
      transaction:'ok'
    });
  }catch(e){
    console.log("[ERROR] -> sale:get -> ",e);
    res.status(400);
    return res.json({
      code: "error:sale:get:002",
      object:{},
      message:'Hubo un error verifique su información',
      transaction:'bad'
    });
  }
}
