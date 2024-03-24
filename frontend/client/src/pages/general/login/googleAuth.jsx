import React from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'
 
const GoogleAuthContext = React.createContext()
const clientId = "764886878937-m1j9glnjhm59c6e59gu41rluj46hpktv.apps.googleusercontent.com"
 
export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: clientId, // Your clientID from Google.
    scope: 'email profile', // Scopes for your app.
  })
  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {/* The rest of your app */}
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)
