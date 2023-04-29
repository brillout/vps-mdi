import type { PageContext } from './types.ts';
import { PageContextProvider } from './usePageContext.tsx';

const PageShell = ({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) => {
  return (
    <PageContextProvider pageContext={pageContext}>
      {children}
    </PageContextProvider>
  );
};

export default PageShell;
