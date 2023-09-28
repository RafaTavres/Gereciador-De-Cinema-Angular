
import { Filme } from "./Filme";

export class Cast{
    id:number;
    known_for_department: string
    name: string;
    profile_path: string | null;
    movie_credits_cast:Filme[];
    movie_credits_crew:Filme[];
    biography:string;

    constructor(id:number,departamento:string, name:string,profile_path:string | null,movie_credits_cast:Filme[],movie_credits_crew:Filme[],biography:string){
        this.known_for_department =departamento
        this.name = name,
        this.profile_path = profile_path
        this.id = id,
        this.movie_credits_cast = movie_credits_cast,
        this.movie_credits_crew = movie_credits_crew
        this.biography = biography
    }
}