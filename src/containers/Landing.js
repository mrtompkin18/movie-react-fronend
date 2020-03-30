import React, { useState, Fragment, useEffect } from 'react';
import Upcomming from "../components/Upcomming";

import { getUpcoming, getGenre } from "../api/movie.api";
import { getOriginalImageURL } from "../utils";

const Landing = () => {
    const [list, setList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [backgrond, setBackground] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const [upcoming, genres] = await Promise.all([
                getUpcoming(),
                getGenre()
            ]);

            setList(upcoming.data.results);
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
                    list={list.slice(0, 14)}
                    setBackground={setBackground}
                    genres={genres}
                />
                <div className="slider___overlay"></div>
                <div className="slider___image" style={{ backgroundImage: `url(${getOriginalImageURL(backgrond)})` }}></div>
            </Fragment>
        )
    }


}

export default Landing



