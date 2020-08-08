import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';


const Logout = (props) => {
    const { setingLogged, setingUser } = useContext(UserContext);
    useEffect(() => {
        servises.logout(setingLogged, setingUser, () => props.history.push('/books'))
    });


    return null;
}

export default Logout;
