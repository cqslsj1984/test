const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');
const uuid = require('uuid');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const typeDefs = gql`
    type Query {
        unsplashImages(pageNum: Int): [ImagePost]
        binnedImages: [ImagePost]
        userPostedImages: [ImagePost]
    }

    type ImagePost {
        id: ID!
        url: String!
        posterName: String!
        description: String
        userPosted: Boolean!
        binned: Boolean!
    }

    type Mutation {
        uploadImage(url: String!, description: String, posterName: String): ImagePost
        updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean): ImagePost
        deleteImage(id: ID!): ImagePost
    }
`;

const resolvers = {
    Query: {
        unsplashImages: async (_, args) => {
            try {
                const { data } = await axios.get(`https://api.unsplash.com/photos/?page=${args.pageNum}&client_id=djrBRy_N9JvYjGTSVe2rgDnYpKhn5FlGq_W52jK4DPY`);
                return data.map((photo) => {
                    return {
                        id: photo.id,
                        url: photo.urls.small,
                        posterName: photo.user.username,
                        description: photo.description,
                        userPosted: false,
                        binned: false
                    };
                });
            } catch (e) {
                console.log(e);
            }
        },
        binnedImages: async () => {
            const posts = await client.smembersAsync('binned');
            return posts.map((post) => {
                return JSON.parse(post);
            });
        },
        userPostedImages: async () => {
            const posts = await client.smembersAsync('posted');
            return posts.map((post) => {
                return JSON.parse(post);
            });
        }
    },
    Mutation: {
        uploadImage: async (_, args) => {
            const newImage = {
                id: uuid.v4(),
                url: args.url,
                posterName: args.posterName,
                description: args.description,
                userPosted: true,
                binned: false
            };
            const newString = JSON.stringify(newImage);
            await client.saddAsync('posted', newString);
            return newImage;
        },
        updateImage: async (_, args) => {
            try {
                const { data } = await axios.get(`https://api.unsplash.com/photos/${args.id}/?client_id=djrBRy_N9JvYjGTSVe2rgDnYpKhn5FlGq_W52jK4DPY`);
                let image = {
                    id: data.id,
                    url: data.urls.small,
                    posterName: data.user.username,
                    description: data.description,
                    userPosted: false,
                    binned: true
                }
                const stringInCache = JSON.stringify(image);
                if (args.binned) {
                    await client.saddAsync('binned', stringInCache);
                } else {
                    image.binned = false;
                    await client.sremAsync('binned', stringInCache);
                }
                return image;
            } catch (e) {
                console.log(e);
            }
        },
        deleteImage: async (_, args) => {
            const strings = await client.smembersAsync('posted');
            const images = strings.map((s) => {
                return JSON.parse(s);
            });
            let removedImage = {};
            images.map(async (image) => {
                if (image.id === args.id) {
                    removedImage = image;
                    const removedString = JSON.stringify(image);
                    await client.sremAsync('posted', removedString);
                }
                return image;
            });
            return removedImage;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});