import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

const sw = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js")
  );

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        {/* Fonts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: ReservaSans;
              src: url(${asset("/fonts/ReservaSans-Light.woff")}) format('woff');
              font-weight: 300;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: ReservaSans;
              src: url(${asset("/fonts/ReservaSans-Regular.woff")}) format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: ReservaSans;
              src: url(${asset("/fonts/ReservaSans-Bold.woff")}) format('woff');
              font-weight: 700;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: ReservaSerif;
              src: url(${asset("/fonts/ReservaSerif-Regular.woff")}) format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: ReservaDisplay;
              src: url(${asset("/fonts/ReservaDisplay-Regular.woff")}) format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }`,
          }}
        ></style>
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script defer src={scriptAsDataURI(sw)} />
    </>
  );
});
