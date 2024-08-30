import gql from 'graphql-tag';

export const addLikeToLyric = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;
