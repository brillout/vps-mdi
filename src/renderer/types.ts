import React from "react";

import type {
  PageContextBuiltIn,
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from "vite-plugin-ssr/types";

type Page = (pageProps: PageProps) => React.ReactElement;
export type PageProps = Record<string, never>; // Empty object until we add props

type DocumentProps = {
  title?: string;
  description?: string;
};

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?:
      | DocumentProps
      | ((pageContext: PageContext) => DocumentProps);
  };
};

export type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
export type PageContextClient = PageContextBuiltInClient<Page> &
  PageContextCustom;

export type PageContext = PageContextClient | PageContextServer;
