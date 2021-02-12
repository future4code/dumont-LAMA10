export class Band {

    constructor (
        private id: string,
        private name: string,
        private genre: string,
        private responsible: string
    ) {}

    

    public getId = (): string => this.id
    public getName = (): string => this.name
    public getGenre = (): string => this.genre
    public getResponsible = (): string => this.responsible
}

export interface BandI {
    id: string,
    name: string,
    genre: string,
    responsible: string
}

export interface InputBand {
    name: string,
    genre: string,
    responsible: string
}
