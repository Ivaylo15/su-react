import React, { createContext, useState, useEffect } from 'react';
import { parseCookeis } from './util/cookie-parse';

export const UserContext = createContext({ logged: false, setingLogged: (log) => { }, user: {}, setingUser: (user) => { }, lang: '', setingLang: () => { }, ren: 0, rendering: () => { } });

const ContextWrapper = (props) => {

    const cookies = parseCookeis();

    const [logged, setLogged] = useState(!!cookies['x-auth-token']);
    const [user, setUser] = useState({});
    const [lang, setLang] = useState('bg');
    const [ren, setRen] = useState(0);

    useEffect(() => {
        fetch("//localhost:9999/api/auth", { credentials: 'include' })
            .then(res => res.status === 200
                ? res.json()
                : res.text().then(text => Promise.reject(text))
            )
            .then(user => {
                setUser(user)
            })
            .catch((err) => console.log(err))
    }, [ren]);

    const rendering = () => {
        setRen(ren => ren = ren + 1 );
    };

    const setingLang = () => {
        if (lang === 'en') {
            setLang('bg')
        } else {
            setLang('en')
        }
    };

    const setingLogged = (log) => {
        setLogged(log)
    };

    const setingUser = (user) => {
        setUser(user)
    };

    return (
        <UserContext.Provider value={{ logged, setingLogged, user: user, setingUser: setingUser, lang, setingLang, ren: ren, rendering: rendering }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default ContextWrapper;