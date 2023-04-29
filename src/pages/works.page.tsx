import { mdiAbTesting } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';

type NoSSRProps = React.PropsWithoutRef<{
  children?: React.ReactNode;
}>;

const NoSSR: React.FC<NoSSRProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : null;
};

export function Page() {
  return (
    <NoSSR>
      <Icon path={mdiAbTesting} />
    </NoSSR>
  );
}
