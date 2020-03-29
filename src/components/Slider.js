import React, { Fragment, useState, useEffect } from 'react';
import TextEllipsis from 'react-text-ellipsis';
import { useSpring, animated } from "react-spring";
import { useSwipeable } from 'react-swipeable';

import { getOriginalImageURL } from "../utils";
import { getGenre } from "../api/movie.api";

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
        setIndex(() => {
            setLoading(true);
            return index;
        });
        setLoading(false);
    }

    const onSlideChange = (direction) => {
        const size = list.length;
        setLoading(true);
        switch (direction) {
            case "Left":
                var nextIndex = index + 1
                if (nextIndex === size) nextIndex = 0;
                setIndex(nextIndex); break;
            case "Right":
                var prevIndex = index - 1;
                if (prevIndex < 0) prevIndex = size - 1;
                setIndex(prevIndex); break;
            default: break;
        }
        setLoading(false);
    }

    if (loading) {
        return <h1>Loading...</h1>;
    } else {
        const { backdrop_path, title, overview, genre_ids } = slideItem;
        return (
            <Fragment>
                <div className="slider___content" {...handlers}>
                    <Overview
                        title={title}
                        overview={overview}
                        genres={mappingGenres(genre_ids)}
                    />
                    <div className="slider___pagination___wrap">
                        {list.map((val, i) => {
                            return <div
                                key={i}
                                className={`slider___pagination ${index === i ? 'active___pagination' : ''}`}
                                onClick={() => onClickPaginateButton(i)}>
                            </div>
                        })}
                    </div>
                </div>
                <div className="slider___overlay"></div>
                <div className="slider___image" style={{ backgroundImage: `url(${getOriginalImageURL(backdrop_path)})` }}></div>
            </Fragment>
        )
    }
}

const Overview = (props) => {
    const fadeUp = useSpring({
        config: { duration: 500, mass: 100 },
        from: { opacity: 0, bottom: -100 },
        to: { opacity: 1, bottom: 0 }
    });

    const { title, overview, genres } = props;

    const renderGenres = () => {
        return <div className="genre___wrap">
            {genres.map(item => {
                const { id, name } = item;
                return <div key={id} className="genre___tag">{name}</div>
            })}
        </div>
    }

    return (
        <animated.div className="overview___wrap" style={fadeUp}>
            <div className="row">
                <div className="col">
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
        </animated.div>
    )
}

export default Slider
