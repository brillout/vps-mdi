import React, { useContext } from "react";

import type { PageContext } from "./types.ts";

const Context = React.createContext<PageContext | undefined>(undefined);

export const PageContextProvider = ({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: React.ReactNode;
}) => {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
};

export const usePageContext = (): PageContext => {
  const pageContext = useContext(Context);

  if (pageContext === undefined) {
    throw new Error("PageContext is not defined!");
  }

  return pageContext;
};
