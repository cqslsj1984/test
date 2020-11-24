import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import queries from '../queries';
import ShwoPosts from './ShowPosts';

function Home() {
    const [pageNum, setPageNum] = useState(1);
    const [arr, setArr] = useState([]);
    const { data, loading, error } = useQuery(queries.GET_UNSPLASHIMAGES, {
        variables: { pageNum: pageNum }
    });

    useEffect(() => {
        if (data) {
            const { unsplashImages } = data;
            setArr(arr.concat(unsplashImages));
        }
    }, [data]);

    const getMore = () => {
        setPageNum(pageNum + 1);
    }

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>{error.message}</div>
    }

    return (
        <div>
            {arr.map((image) => {
                return (
                    <div className="card" key={image.id}>
                        <div className="card-body">
                            {image.description}
                            <br />
                            by: {image.posterName}
                            <img alt="" src={image.url} />
                            <br />
                            <br />
                        </div>
                    </div>
                )
            })}
            <button className="button" onClick={getMore}>Get More</button>
        </div>
    )
}

export default Home;