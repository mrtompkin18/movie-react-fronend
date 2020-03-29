import axios from "axios";

export const getSearch = async (params) => {
    const url = getUrl("/search/movie", params);
    return await axios.get(url).then(res => res)
        .catch(error => error);
}

export const getDetail = async (movieId) => {
    const url = getUrl(`/movie/${movieId}`);
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getCasts = async (movieId) => {
    const url = getUrl(`/movie/${movieId}/credits`);
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getTopRate = async (params) => {
    const url = getUrl("/movie/top_rated", params);
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getPopular = async (params) => {
    const url = getUrl("/movie/popular", params);
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getImages = async (movieId, params) => {
    const url = getUrl(`/movie/${movieId}/images`, params);
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getVideo = async (movieId) => {
    const url = getUrl(`/movie/${movieId}/videos`);
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getUpcoming = async (params) => {
    const url = getUrl(`/movie/upcoming`, params);
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getGenre = async () => {
    const url = getUrl("/genre/movie/list");
    return await axios.get(url).then(res => res).catch(error => error);
}

export const getPeople = async (personId) => {
    const url = getUrl(`/person/${personId}`);
    return await axios.get(url).then(res => res).catch(error => error);
}

const getUrl = (type, params = {}) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const url = process.env.REACT_APP_MOVIE_URL;

    const query = Object.values(params).reduce((acc, val) => {
        return acc.concat("&")
            .concat(Object.keys(params).find(key => params[key] === val))
            .concat("=")
            .concat(val)
    }, "");

    return url
        .concat(type)
        .concat(`?api_key=${api_key}`)
        .concat(query);
}