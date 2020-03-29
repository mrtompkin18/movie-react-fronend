import React, { useState, Fragment, useLayoutEffect } from 'react';
import { getUpcoming } from "../api/movie.api";
import Slider from "../components/Slider";

const Landing = () => {
    const [upcomingList, setUpcomingList] = useState([]);

    useLayoutEffect(() => {
        (async () => {
            const { data } = await getUpcoming();
            setUpcomingList(data);
        })()
    }, []);

    if (upcomingList.length < 1) return <></>
    const { results } = upcomingList;
    return (
        <Fragment>
            <Slider list={results.slice(0, 8)} />
        </Fragment>
    )
}

export default Landing



