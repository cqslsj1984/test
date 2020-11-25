import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ShowPosts from './ShowPosts';

function MyBin() {
    const { data, loading, error } = useQuery(queries.GET_BINNEDIMAGES);

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>{error.message}</div>
    }

    const { binnedImages } = data;

    return (
        <div>
            {binnedImages.map((image) => {
                return <ShowPosts image={image} key={image.id} />
            })}
        </div>
    )
}

export default MyBin;