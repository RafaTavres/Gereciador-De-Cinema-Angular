import { Cast } from "./cast";


export class Credito{
      cast: Cast[];
      crew: Cast[];

      constructor(cast:Cast[], crew:Cast[]){
        this.cast = cast
        this.crew = crew
    }
}