import React from "react";
import ReactDOM, { hydrateRoot } from "react-dom/client";

import PageShell from "./PageShell.tsx";
import type { PageContextClient } from "./types.ts";

export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;

  const rootElement = document.getElementById("root");

  if (rootElement === null) {
    throw new Error(
      "Failed to hydrate root because no root element was found!"
    );
  }

  if (rootElement.innerHTML === "" || !pageContext.isHydration) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      </React.StrictMode>
    );
  } else {
    hydrateRoot(
      rootElement,
      <React.StrictMode>
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      </React.StrictMode>
    );
  }
}

export const clientRouting = true;
export const prefetchStaticAssets = window.matchMedia("(any-hover: none)")
  .matches
  ? { when: "VIEWPORT" }
  : { when: "HOVER" };
export const hydrationCanBeAborted = true;
