import React from 'react'
import Swiper from 'react-id-swiper';
import TextEllipsis from 'react-text-ellipsis';

import { getOriginalImageURL } from '../utils';

const Popular = ({ list }) => {
    const params = {
        slidesPerView: 5,
        spaceBetween: 20,
        pagination: {
            hidden: true
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1300: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }
    }

    const renderPopular = () => {
        return list.map(item => {
            const { poster_path, title, id } = item;
            const path = getOriginalImageURL(poster_path);
            return (
                <div key={id}>
                    <div className="popular___item" style={{ background: `url(${path})` }}></div>
                    <TextEllipsis
                        lines={2}
                        tag={'div'}
                        ellipsisChars={'...'}
                        tagClass={'title'}
                    >
                        {title}
                    </TextEllipsis>
                </div>
            )
        })
    }

    return (
        <div className="popular___wrap">
            <h1>Popular Movies</h1>
            <Swiper {...params}>
                {renderPopular()}
            </Swiper>
        </div>
    )
}

export default Popular
