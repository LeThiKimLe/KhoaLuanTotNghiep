import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useContext, useEffect } from 'react';

export const useBlocker = (blocker, when = true) => {
//   const navigator = React.useContext(UNSAFE_NavigationContext).navigator;
    const { navigator } = useContext(NavigationContext);

    React.useEffect(() => {
        if (!when) return;

        const push = navigator.push;

        navigator.push = (...args) => {
            blocker(...args)
        };

        return () => {
            navigator.push = push;
        };
  }, [navigator, blocker, when]);
}