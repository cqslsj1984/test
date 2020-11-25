import React from 'react';
import { Link } from 'react-router-dom';
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
            <br />
            <Link to="/new-post">Upload a post</Link>
            <br />
            <br />
            {userPostedImages.map((image) => {
                return <ShowPosts image={image} postPage={true} key={image.id} />
            })}
        </div>
    )
}

export default MyPosts;