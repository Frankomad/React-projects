import { Helmet } from 'react-helmet-async';

import { RevenueView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function RevenuePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <RevenueView />
    </>
  );
}
