import React, { useState, Fragment, useEffect } from 'react';
import Upcomming from "../components/Upcomming";
import Popular from "../components/Popular";

import { getUpcoming, getGenre, getPopular } from "../api/movie.api";
import { getOriginalImageURL } from "../utils";

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

            setList(upcoming.data.results.slice(0, 14));
            setPopulars(populars.data.results.slice(0, 14));
            setGenres(genres.data.genres);

            setLoading(false);
        })()
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <Fragment>
                <Upcomming
                    list={list}
                    setBackground={setBackground}
                    genres={genres}
                />
                <Popular list={populars} />
                <div className="slider___overlay"></div>
                <div className="slider___image" style={{ backgroundImage: `url(${getOriginalImageURL(backgrond)})` }}></div>
            </Fragment>
        )
    }


}

export default Landing



