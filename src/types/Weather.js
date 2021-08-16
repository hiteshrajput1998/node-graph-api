import { gql } from 'apollo-server';

export default gql`
    type Location{
        name: String
        region: String
        country: String
        lat: Float
        lon: Float
        tz_id: String
        localtime_epoch: Float
        localtime: String
    }
    type Current{
        last_updated: String
        temp_c: Float
        temp_f: Float
        icon: String
        wind_mph: Float
        wind_kph: Float
    }
    type DayInfo{
        maxtemp_c: Float
        maxtemp_f: Float
        mintemp_c: Float
        mintemp_f: Float
        avgtemp_c: Float
        icon: String
    }
    type AstroInfo{
        sunrise: String
        sunset: String
        moonrise: String
        moonset: String
    }
    type HourlyData{
        time: String
        temp_c: Float
        temp_f: Float
        icon: String
        wind_mph: Float
        wind_kph: Float
        wind_degree: Float
    }
    type ForecastDay{
        date: String
        dayInfo: DayInfo
        astroInfo: AstroInfo
        hourlyData: [HourlyData]
    }
    type WeatherForecastResponse{
        location: Location
        current: Current
        forecastDay: ForecastDay
    }
    type Query{
        getWeatherForecastDay(cityName: String, days: Float): WeatherForecastResponse
    }
`;