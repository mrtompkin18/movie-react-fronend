import React, { Fragment, useState, useEffect } from 'react';
import TextEllipsis from 'react-text-ellipsis';
import { useSwipeable } from 'react-swipeable';

import SideMenu from "./SlideMenu";

import { getOriginalImageURL } from "../utils";
import { getGenre } from "../api/movie.api";

import starSvg from "../star.svg";

const Slider = (props) => {
    const [list, setList] = useState(props.list);
    const [slideItem, setSlideItem] = useState({});
    const [index, setIndex] = useState(0);
    const [genreList, setGenreList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlers = useSwipeable({
        onSwipedLeft: (event) => onSlideChange(event.dir),
        onSwipedRight: (event) => onSlideChange(event.dir),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = getNextIndex(index);
            setIndex(nextIndex);
        }, 4000);
        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        const fetchDate = async () => {
            setLoading(true);
            const { data } = await getGenre();
            const { genres } = data;
            setGenreList(genres);
            setLoading(false);
        }
        fetchDate();
    }, []);

    useEffect(() => {
        setLoading(true);
        const { list } = props;
        setList(list);
        setSlideItem(list[index]);
        setLoading(false);
    }, [props, index]);

    useEffect(() => {
        setLoading(true);
        setSlideItem(list[index]);
        setLoading(false);
    }, [list, index])

    const mappingGenres = (genreIds) => {
        return genreList.filter((item) => {
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
                return <div
                    key={i}
                    className={`slider___pagination ${index === i ? 'active___pagination' : ''}`}
                    onClick={() => onClickPaginateButton(i)}>
                </div>
            })}
        </div>
    }

    if (loading) {
        return <h1>Loading...</h1>;
    } else {
        const { backdrop_path, title, overview, genre_ids, vote_average, release_date } = slideItem;
        return (
            <Fragment>
                <div className="slider___content" {...handlers}>
                    <Overview
                        title={title}
                        overview={overview}
                        voteAverage={vote_average}
                        releaseDate={release_date}
                        genres={mappingGenres(genre_ids)}
                        renderPagination={renderPagination}
                    />
                </div>
                <div className="slider___overlay"></div>
                <div className="slider___image" style={{ backgroundImage: `url(${getOriginalImageURL(backdrop_path)})` }}></div>
            </Fragment>
        )
    }
}

const Overview = ({ title,
    overview,
    genres,
    releaseDate,
    voteAverage,
    renderPagination
}) => {
    const renderGenres = () => {
        return <div className="genre___wrap">
            {genres.map(item => {
                const { id, name } = item;
                return <div key={id} className="genre___tag">{name}</div>
            })}
        </div>
    }

    return (
        <div className="overview___wrap">
            <div className="row">
                <div className="col-2">
                    <SideMenu />
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col">
                            <div className="rating">
                                <img alt="star" src={starSvg} />
                                <span>{voteAverage}</span>
                                <span className="release">({releaseDate})</span>
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
                    {renderPagination()}
                </div>
            </div>
        </div>
    )
}

export default Slider
