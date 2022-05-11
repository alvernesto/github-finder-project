import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = (props) => {
    const { users, loading } = props;

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {users.map(u => (
                    <UserItem key={u.id} user={u} />
                ))}
            </div>
        )
    }

}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}



export default Users;