import { connect } from 'mongoose';
import { config } from './keys';
// import { roleSeedClass } from './seeds/role.seed';

/**Establecemos logica de coneccion a la base de datos
*/
connect(config.db.URI).then((db)=>{
  console.log("DB is connected")
  // roleSeedClass.createSeed();
}).catch(error=>{
  console.log(error);
})
