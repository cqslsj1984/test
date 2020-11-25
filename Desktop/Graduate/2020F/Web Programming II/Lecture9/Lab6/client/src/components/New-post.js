import React from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';

function NewPost() {
    const [uploadImage] = useMutation(queries.ADD_USERPOSTEDIMAGES, {
        update(cache, { data: { uploadImage } }) {
            const { userPostedImages } = cache.readQuery({ query: queries.GET_USERPOSTEDIMAGES });
            cache.writeQuery({
                query: queries.GET_USERPOSTEDIMAGES,
                data: { userPostedImages: userPostedImages.concat([uploadImage]) }
            });
        }
    });
    let url;
    let description;
    let posterName;

    return (
        <div className="card">
            <div className="card-body">
                <h2>Create a Post</h2>
                <br />
                <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    uploadImage({
                        variables: {
                            url: url.value,
                            description: description.value,
                            posterName: posterName.value
                        }
                    });
                    url.value = '';
                    description.value = '';
                    posterName = '';
                    alert('post added');
                }}>
                    <div className="form-group">
                        <label>
                            url:
                    <br />
                            <input ref={(node) => url = node} required autoFocus />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            description:
                    <input ref={(node) => description = node} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            posterName:
                    <input ref={(node) => posterName = node} />
                        </label>
                    </div>
                    <br />
                    <br />
                    <button className="button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewPost;