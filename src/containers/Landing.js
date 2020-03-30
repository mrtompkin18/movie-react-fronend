import React, { useState, Fragment, useEffect } from 'react';
import Upcomming from "../components/Upcomming";
import Popular from "../components/Popular";

import { getUpcoming, getGenre, getPopular } from "../api/movie.api";
import { getOriginalImageURL, getImageURL } from "../utils";

const Landing = () => {
    const [list, setList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [populars, setPopulars] = useState([]);
    const [backgrond, setBackground] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const [upcoming, genres, populars] = await Promise.all([
                getUpcoming(),
                getGenre(),
                getPopular()
            ]);

            setList(upcoming.data.results);
            setGenres(genres.data.genres);
            setPopulars(populars.data.results);

            setLoading(false);
        })()
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <Fragment>
                <Upcomming
                    list={list.slice(0, 14)}
                    setBackground={setBackground}
                    genres={genres}
                />
                <Popular list={populars.slice(0, 10)} />
                <div className="slider___overlay"></div>
                <div className="slider___image" style={{ backgroundImage: `url(${getImageURL(backgrond)})` }}></div>
            </Fragment>
        )
    }


}

export default Landing



