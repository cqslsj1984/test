import { gql } from '@apollo/client';

const GET_UNSPLASHIMAGES = gql`
    query ($pageNum: Int){
        unsplashImages(pageNum: $pageNum) {
            id
            url
            posterName
            description
            binned
            userPosted
        }
    }
`;

const GET_BINNEDIMAGES = gql`
    query {
        binnedImages {
            id
            url
            posterName
            description
            binned
            userPosted
        }
    }
`;

const GET_USERPOSTEDIMAGES = gql`
    query {
        userPostedImages {
            id
            url
            posterName
            description
            binned
            userPosted
        }
    }
`;

const ADD_USERPOSTEDIMAGES = gql`
    mutation ($url: String!, $description: String, $posterName: String) {
        uploadImage(url: $url, description: $description, posterName: $posterName) {
            id
            url
            posterName
            description
            binned
            userPosted
        }
    }
`;

const UPDATE_BINNEDIMAGES = gql`
    mutation ($id: ID!, $url: String, $posterName: String, $description: String, $userPosted: Boolean, $binned: Boolean) {
        updateImage(id: $id, url: $url, posterName: $posterName, description: $description, userPosted: $userPosted, binned: $binned) {
            id
            url
            posterName
            description
            binned
            userPosted
        }
    }
`;

const DELETE_USERPOSTEDIMAGES = gql`
    mutation ($id: ID!) {
        uploadImage(id: $id) {
            id
            url
            posterName
            description
            binned
            userPosted
        }
    }
`;

export default {
    GET_UNSPLASHIMAGES,
    GET_BINNEDIMAGES,
    GET_USERPOSTEDIMAGES,
    ADD_USERPOSTEDIMAGES,
    UPDATE_BINNEDIMAGES,
    DELETE_USERPOSTEDIMAGES
}