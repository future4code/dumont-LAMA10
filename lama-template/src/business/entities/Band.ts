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

export interface BandDB {
    id: string,
    name: string,
    music_genre: string,
    responsible: string
}

export interface BandInputDTO {
    name: string,
    genre: string,
    responsible: string,
    token: string
}
