export interface Movie { imdbID: string; Title: string; Year: string; Type: string; Poster: string }
export interface MovieDetail extends Movie { Plot: string; Genre: string; Director: string; Actors: string; Runtime: string; imdbRating: string; Released: string; Language: string; Country: string; Awards: string; Rated: string; totalSeasons?: string }
export interface SearchResult { Search?: Movie[]; totalResults?: string; Response: 'True' | 'False'; Error?: string }
export interface Pokemon { name: string; sprites: { front_default: string | null }; types: { type: { name: string } }[] }
export interface Weather { current_weather: { temperature: number; windspeed: number; weathercode: number; time: string }; current_weather_units: { temperature: string; windspeed: string } }
