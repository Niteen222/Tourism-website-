import { useEffect, useCallback } from 'react';

// Decode Google's JWT credential to get user info (name, email, picture)
function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * useGoogleAuth — Initializes Google Identity Services and exposes
 * a `signIn(callback)` function that calls back with the decoded user object
 * containing: { name, email, picture, given_name, family_name }
 */
export function useGoogleAuth(onSuccess) {
    useEffect(() => {
        if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') return;
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
                const payload = decodeJwt(response.credential);
                if (payload && onSuccess) {
                    onSuccess({
                        name: payload.name,
                        given_name: payload.given_name,
                        email: payload.email,
                        avatar: payload.picture,   // real Google profile photo
                        role: 'tourist',
                        provider: 'google',
                    });
                }
            },
        });
    }, []);  // eslint-disable-line

    const signIn = useCallback(() => {
        if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
            // No real Client ID configured – use the mock picker modal
            return false;
        }
        if (!window.google) return false;
        window.google.accounts.id.prompt();
        return true;
    }, []);

    const isConfigured = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE';

    return { signIn, isConfigured };
}
