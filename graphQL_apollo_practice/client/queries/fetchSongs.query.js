import gql from 'graphql-tag';

export const fetchSong = gql`
    {
        songs {
            title
            id
        }
    }
`;
