import { Helmet } from 'react-helmet-async';

import { TypesView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function UsersPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard | Minimal UI </title>
            </Helmet>

            <TypesView />
        </>
    );
}
