export class Experience {

    id!: number;
    nombreExp: string;
    descripcionExp: string;
    imgExperience: string;

    constructor(nombreExp: string, descripcionExp: string, imgExperience: string){

        this.nombreExp = nombreExp;
        this.descripcionExp = descripcionExp;
        this.imgExperience = imgExperience;
    }
}