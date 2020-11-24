import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ShowPosts from './ShowPosts';

function MyPosts() {
    const { data, error, loading } = useQuery(queries.GET_USERPOSTEDIMAGES);

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>{error.message}</div>
    }

    const { userPostedImages } = data;

    return (
        <div>
            {userPostedImages.map((image) => {
                return (
                    <div key={image.id}>
                        <ShowPosts image={image} />
                    </div>
                );
            })}
        </div>
    )
}

export default MyPosts;