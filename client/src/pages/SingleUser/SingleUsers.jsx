import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'

function SingleUsers({token}) {
    const {id} = useParams();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getSingleUsers();
    }, []);

    const getSingleUsers = async () => {
        const response = await fetch(`/api/users/${id}`); 
        const json = await response.json();
        if (response.ok) {
            setUsers(json[0]);
        } 
    };

    return (
        <>
            {users && (
                <p>{users.username}</p>
            )}
        </>
    );
}

export default SingleUsers