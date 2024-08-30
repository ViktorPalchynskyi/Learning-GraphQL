import gql from 'graphql-tag';

export const fetchSongById = gql`
    query FetchSong($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`;
