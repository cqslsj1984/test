import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ShowPosts from './ShowPosts';

function Home() {
    const [pageNum, setPageNum] = useState(1);
    const { data, loading, error } = useQuery(queries.GET_UNSPLASHIMAGES, {
        variables: { pageNum: pageNum }
    });

    const getMore = () => {
        setPageNum(pageNum + 1);
    }

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>{error.message}</div>
    }

    const { unsplashImages } = data;

    return (
        <div>
            {unsplashImages.map((image) => {
                return <ShowPosts image={image} key={image.id} />
            })}
            <button className="button" onClick={getMore}>Get More</button>
        </div>
    )
}

export default Home;