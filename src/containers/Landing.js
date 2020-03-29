import React, { useState, Fragment, useEffect } from 'react';
import Slider from "../components/Slider";

import { getUpcoming } from "../api/movie.api";
import { getOriginalImageURL } from "../utils";

const Landing = () => {
    const [upcomingList, setUpcomingList] = useState([]);
    const [backgrond, setBackground] = useState('');

    useEffect(() => {
        (async () => {
            const { data } = await getUpcoming();
            setUpcomingList(data);
        })()
    }, []);

    if (upcomingList.length < 1) return <></>
    const { results } = upcomingList;
    return (
        <Fragment>
            <Slider
                list={results.slice(0, 14)}
                setBackground={setBackground}
            />
            <div className="slider___overlay"></div>
            <div className="slider___image" style={{ backgroundImage: `url(${getOriginalImageURL(backgrond)})` }}></div>
        </Fragment>
    )
}

export default Landing



