export class Show {
    constructor(
        private id: string,
        private weekDay: WeekDay,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ) { }

    public getId = (): string => this.id;
    public getWeekDay = (): WeekDay => this.weekDay;
    public getStartTime = (): number => this.startTime;
    public getEndTime = (): number => this.endTime;
    public getBandId = (): string => this.bandId;

    static stringToWeekDay(input: string): WeekDay {
        switch (input.toUpperCase()) {
            case "FRIDAY":
                return WeekDay.FRIDAY;
            case "SATURDAY":
                return WeekDay.SATURDAY;
            case "SUNDAY":
                return WeekDay.SUNDAY;
            default:
                throw new Error("Invalid week day");
        }
    }
}

export interface ShowInputDTO {
    bandId: string;
    weekDay: string;
    startTime: number;
    endTime: number;
    token: string;
}

export interface ShowDB {
    id: string;
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}

export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}