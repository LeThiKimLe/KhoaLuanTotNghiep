import React, { useEffect } from 'react'

const ErrorBoundary = ({ children }) => {
    useEffect(() => {
        const errorHandler = (error) => {
            // Log the error to the console
            console.log('Error:', error)
        }

        // Assign the error handler to the window object
        window.onerror = errorHandler

        // Clean up the error handler on unmount
        return () => {
            window.onerror = null
        }
    }, [])

    return children
}

export default ErrorBoundary
