import React from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';

function ShowPosts(props) {
    const [updateImage] = useMutation(queries.UPDATE_BINNEDIMAGES, {
        update(cache, { data: { updateImage } }) {
            const { binnedImages } = cache.readQuery({ query: queries.GET_BINNEDIMAGES });
            if (updateImage.binned) {
                cache.writeQuery({
                    query: queries.GET_BINNEDIMAGES,
                    data: { binnedImages: binnedImages.concat([updateImage]) }
                });
            } else {
                cache.writeQuery({
                    query: queries.GET_BINNEDIMAGES,
                    data: { binnedImages: binnedImages.filter((e) => e.id !== props.image.id) }
                });
            }
        }
    });
    const [deleteImage] = useMutation(queries.DELETE_USERPOSTEDIMAGES, {
        update(cache, { data: { deleteImage } }) {
            const { userPostedImages } = cache.readQuery({ query: queries.GET_USERPOSTEDIMAGES });
            cache.writeQuery({
                query: queries.GET_USERPOSTEDIMAGES,
                data: { userPostedImages: userPostedImages.filter((e) => e.id !== props.image.id) }
            });
        }
    });
    let option = null;

    const deleteButtone = () => {
        return (
            <button className="button" onClick={(e) => {
                deleteImage({
                    variables: { id: props.image.id }
                })
            }}>Delete Post</button>
        )
    }

    if (props.postPage) {
        option = deleteButtone();
    }

    return (
        <div className="card">
            <div className="card-body">
                {props.image.description}
                <br />
                by: {props.image.posterName}
                <img alt="missing" src={props.image.url} />
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
                {option}
            </div>
        </div>
    )
}

export default ShowPosts;