import ServerLayout from '@/components/server/ServerLayout';

import Desktop from './_layout/Desktop';
import Mobile from './_layout/Mobile';

const Layout = ServerLayout<any>({ Desktop, Mobile });

Layout.displayName = 'agentListLayout';

export default Layout;
