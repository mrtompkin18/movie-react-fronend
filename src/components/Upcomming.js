import React, { Fragment, useState, useEffect } from 'react';
import TextEllipsis from 'react-text-ellipsis';
import { useSwipeable } from 'react-swipeable';
import posed from "react-pose";

import Menu from "./Menu";

import starSvg from "../star.svg";

const Box = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
});

const Upcomming = (props) => {
    const [list, setList] = useState(props.list);
    const [index, setIndex] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: (event) => onSlideChange(event.dir),
        onSwipedRight: (event) => onSlideChange(event.dir),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });
    useEffect(() => {
        const { backdrop_path } = list[index];
        const { setBackground } = props;

        setBackground(backdrop_path);

        const nextIndex = getNextIndex(index);
        const interval = setInterval(() => {
            setIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval)
    }, [index, props]);

    useEffect(() => {
        const { list } = props;
        setList(list);
    }, [list]);

    const mappingGenres = (genreIds) => {
        const { genres } = props
        return genres.filter((item) => {
            return item.id === genreIds.find(id => id === item.id)
        });
    }

    const onClickPaginateButton = (index) => {
        setIndex(index);
    }

    const getNextIndex = (index) => {
        const size = list.length;
        var nextIndex = index + 1
        if (nextIndex === size) nextIndex = 0;

        return nextIndex;
    }

    const getPrevIndex = (index) => {
        const size = list.length;
        var prevIndex = index - 1;
        if (prevIndex < 0) prevIndex = size - 1;

        return prevIndex;
    }

    const onSlideChange = (direction) => {
        switch (direction) {
            case "Left":
                const nextIndex = getNextIndex(index);
                setIndex(nextIndex); break;
            case "Right":
                const prevIndex = getPrevIndex(index);
                setIndex(prevIndex); break;
            default: break;
        }
    }

    const renderPagination = () => {
        return <div className="slider___pagination___wrap">
            {list.map((val, i) => {
                return <span
                    key={i}
                    className={`slider___pagination ${index === i ? 'active___pagination' : ''}`}
                    onClick={() => onClickPaginateButton(i)}>
                </span>
            })}
        </div>
    }

    console.log("REDNER : SLIDE");

    const { title, overview, genre_ids, vote_average, release_date } = list[index];
    return (
        <Fragment>
            <Box className="slider___content fadeIn animated" {...handlers}>
                {<Overview
                    style={props}
                    title={title}
                    overview={overview}
                    voteAverage={vote_average}
                    releaseDate={release_date}
                    genres={mappingGenres(genre_ids)}
                />}
                {renderPagination()}
            </Box>
        </Fragment>
    )
}

const Overview = (props) => {
    const { title, overview, genres, releaseDate, voteAverage, style } = props;

    console.log("REDNER : OVERVIEW");

    const renderGenres = () => {
        return <div className="genre___wrap">
            {genres.map(item => {
                const { id, name } = item;
                return <div key={id} className="genre___tag">{name}</div>
            })}
        </div>
    }

    return (
        <div className="overview___wrap" style={style}>
            <div className="overview___left___section">
                <Menu />
            </div>
            <div className="overview___right___section">
                <div className="row">
                    <div className="col m-0">
                        <div className="rating">
                            <img alt="star" src={starSvg} />
                            <span>{voteAverage}</span>
                            <span className="release">(Release {releaseDate})</span>
                        </div>
                        <h1 className="title">{title}</h1>
                        <TextEllipsis
                            lines={3}
                            tag={'span'}
                            ellipsisChars={'...'}
                            tagClass={'overview'}
                        >{overview}
                        </TextEllipsis>
                        {renderGenres()}
                        <div className="button___wrap">
                            <div className="watch__btn">Watch</div>
                            <div className="keep__btn">Add to List</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upcomming
