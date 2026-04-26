import Script from 'next/script'

/**
 * Tracking scripts — solo renderizan si la env var correspondiente está seteada.
 * Para activar después: agregar el ID en .env.local + Vercel y redeploy.
 *
 * Stack actual:
 * - GTM: Google Tag Manager (analytics + conversiones)
 * - Meta Pixel: Facebook/Instagram tracking + ads optimization
 * - Microsoft Clarity: heatmaps + session recordings (free, sin límite)
 */
export function Trackers() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <>
      {clarityId && <Clarity id={clarityId} />}
      {metaPixelId && <MetaPixel id={metaPixelId} />}
      {gtmId && <GoogleTagManager id={gtmId} />}
    </>
  )
}

function Clarity({ id }: { id: string }) {
  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  )
}

function MetaPixel({ id }: { id: string }) {
  return (
    <>
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${id}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

function GoogleTagManager({ id }: { id: string }) {
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${id}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="GTM"
        />
      </noscript>
    </>
  )
}
