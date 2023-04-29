import React from "react";
import ReactDOMServer from "react-dom/server";

import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";

import PageShell from "./PageShell.tsx";
import type { PageContextServer } from "./types.ts";

// https://vite-plugin-ssr.com/data-fetching
export const passToClient = import.meta.env.DEV
  ? ["pageProps", "$$typeof"]
  : ["pageProps"];

export async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;

  let pageHtml;
  if (Page) {
    pageHtml = ReactDOMServer.renderToString(
      <React.StrictMode>
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      </React.StrictMode>
    );
  } else {
    pageHtml = "";
  }

  // https://vite-plugin-ssr.com/head
  let { documentProps } = pageContext.exports;

  if (typeof documentProps === "function") {
    documentProps = documentProps(pageContext);
  }

  const title = (documentProps && documentProps.title) || "Untitled";
  const desc = (documentProps && documentProps.description) || "";

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}
