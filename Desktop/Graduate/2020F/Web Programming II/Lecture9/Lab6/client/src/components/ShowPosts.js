import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import queries from '../queries';

function ShowPosts(props) {
    // const [updateImage] = useMutation(queries.UPDATE_BINNEDIMAGES, {
    //     update(cache, { data: { updateImage } }) {
    //         const { binnedImages } = cache.readQuery({ query: queries.GET_BINNEDIMAGES });
    //         if (props.image.binned) {
    //             cache.writeQuery({
    //                 query: queries.GET_BINNEDIMAGES,
    //                 data: { binnedImages: binnedImages.filter((e) => e.id !== props.image.id) }
    //             });
    //         } else {
    //             cache.writeQuery({
    //                 query: queries.GET_BINNEDIMAGES,
    //                 data: { binnedImages: binnedImages.concat() }
    //             });
    //         }
    //     }
    // });
    const [updateImage] = useMutation(queries.UPDATE_BINNEDIMAGES);

    return (
        <div className="card">
            <div className="card-body">
                {props.image.description}
                <br />
                by: {props.image.posterName}
                <img alt="image" src={props.image.url} />
                <br />
                <br />
                <button className="button" onClick={(e) => {
                    updateImage({
                        variables: {
                            id: props.image.id,
                            binned: !props.image.binned
                        }
                    });
                }}>
                    {props.image.binned ? 'Remove from bin' : 'Add to bin'}
                </button>
            </div>
        </div>
    )
}

export default ShowPosts;