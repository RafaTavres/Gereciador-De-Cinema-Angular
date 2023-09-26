import { Genero } from "./genero";

export class Filme{
    id?:number;
    title:string;
    overview:string;
    video: boolean;
    poster:string;
    vote_count:number;
    genres:Genero[];
    favorito:boolean;

    constructor(title:string,overview:string,video:boolean,poster:string,vote_count:number,genres:Genero[],id?: number){
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.video = video;
        this.poster = poster;
        this.vote_count = vote_count;
        this.genres = genres;
        this.favorito = false
    }
}