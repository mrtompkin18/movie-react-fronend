import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getDetail } from "../api/movie.api";

const Detail = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [detail, setDetail] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await getDetail(id);
            setDetail(data);
            setLoading(false);
        })()
    }, [id]);

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <div>
            Movie {id}
        </div>
    )
}

export default Detail;
