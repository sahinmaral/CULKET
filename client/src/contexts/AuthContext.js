import React, { useState, createContext, useEffect, useContext } from 'react'
import { fetchGetUserFromAccessToken, fetchLogout } from '../services/authService';
import { useCookies } from 'react-cookie';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cookies,setCookie,removeCookie] = useCookies(["access-token","refresh-token"])

    useEffect(() => {

        (async () => {
            try {
                const me = await fetchGetUserFromAccessToken(cookies['access-token'])

                setLoggedIn(true)
                setUser(me.data.data)
                setLoading(false)

            } catch (error) {
                setLoading(false)
            }
        })()

    }, [cookies]);

    const login = (data) => {
        setLoggedIn(true)
        setUser(data.user)

        setCookie('access-token', data.accessToken, { path: '/'})
        setCookie('refresh-token', data.refreshToken, {path: '/'})
    }

    const logout = async() => {

        setLoggedIn(false)
        setUser(null)

        await fetchLogout()

        removeCookie('access-token')
        removeCookie('refresh-token')

    }

    const values = {
        loggedIn, user, login , logout , cookies
    }

    if (loading) {
        return <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
           <progress className="progress w-56 relative"></progress>
        </div>
    }

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
