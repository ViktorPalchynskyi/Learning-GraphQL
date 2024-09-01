import React, { ChangeEvent, useReducer } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from './getUsers.query';
import { CREATE_USER } from './createUser.query';

interface UserState {
    userName: string;
    userPassword: string;
}

type Action =
    | {
          payload: Omit<UserState, 'userPassword'>;
          type: 'name';
      }
    | {
          payload: Omit<UserState, 'userName'>;
          type: 'password';
      };

const initialState: UserState = { userName: '', userPassword: '' };

function reducer(
    state: UserState = initialState,
    { payload, type }: Action
): UserState {
    switch (type) {
        case 'name':
            return { ...state, userName: payload.userName };
        case 'password':
            return { ...state, userPassword: payload.userPassword };
        default:
            return state;
    }
}

export default function UserList() {
    const { loading, error, data } = useQuery<{
        users: { name: string; id: string }[];
    }>(GET_USERS);
    const [mutationFunction, { data: mutationData }] = useMutation(
        CREATE_USER,
        {
            refetchQueries: [GET_USERS],
        }
    );
    const [formState, dispatch] = useReducer(reducer, initialState);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(mutationData);

    return (
        <>
            <ul>
                {data!.users.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
            <form
                onSubmit={() =>
                    mutationFunction({
                        variables: {
                            name: formState.userName,
                            password: formState.userPassword,
                        },
                    })
                }
            >
                <input
                    type="text"
                    name="userName"
                    placeholder="user name"
                    value={formState.userName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                            type: 'name',
                            payload: { userName: e.target.value },
                        })
                    }
                />
                <label htmlFor="userName">User name</label>
                <input
                    type="text"
                    name="userPassword"
                    placeholder="user password"
                    value={formState.userPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                            type: 'password',
                            payload: { userPassword: e.target.value },
                        })
                    }
                />
                <label htmlFor="userPassword">User password</label>
                <button type="submit">Create User</button>
            </form>
        </>
    );
}
