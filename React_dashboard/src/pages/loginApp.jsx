import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function LoginPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard | Minimal UI </title>
            </Helmet>

            <LoginView />
        </>
    );
}
