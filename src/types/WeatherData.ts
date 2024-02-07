
export interface WeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    daily: Daily[];
    hourly: Hourly[];
    minutely: Minutely[];
}

export interface Current {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    temp:       number;
    feels_like: number;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    uvi:        number;
    clouds:     number;
    visibility: number;
    wind_speed: number;
    wind_deg:   number;
    weather:    CurrentWeather[];
}

export interface CurrentWeather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Daily {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    moonrise:   number;
    moonset:    number;
    moon_phase: number;
    summary:    string;
    temp:       Temp;
    feels_like: FeelsLike;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    DailyWeather[];
    clouds:     number;
    pop:        number;
    uvi:        number;
    rain?:      number;
    snow?:      number;
}

export interface FeelsLike {
    day:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface Temp {
    day:   number;
    min:   number;
    max:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface DailyWeather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Hourly {
    dt:         number;
    temp:       number;
    feels_like: number;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    uvi:        number;
    clouds:     number;
    visibility: number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    HourlyWeather[];
    pop:        number;
}

export interface HourlyWeather {
    id:          number;
    main:        Main;
    description: Description;
    icon:        Icon;
}

export enum Description {
    BrokenClouds = "broken clouds",
    FewClouds = "few clouds",
    OvercastClouds = "overcast clouds",
    ScatteredClouds = "scattered clouds",
}

export enum Icon {
    The02D = "02d",
    The02N = "02n",
    The03N = "03n",
    The04D = "04d",
    The04N = "04n",
}

export enum Main {
    Clouds = "Clouds",
}

export interface Minutely {
    dt:            number;
    precipitation: number;
}



