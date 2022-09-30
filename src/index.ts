import { App } from './app';

/** funcion para incializar el servidor*/
async function main(){
  const app = new App();
  await app.start();
}

/*Inicializamos el servidor*/
main();
