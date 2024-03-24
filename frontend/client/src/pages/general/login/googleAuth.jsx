import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
 
export const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* The rest of your app */}
      {children}
    </GoogleOAuthProvider>
  )
}
