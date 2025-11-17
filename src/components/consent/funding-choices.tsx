import Script from 'next/script'

interface FundingChoicesProps {
  /** Publisher ID in the form of `pub-XXXXXXXXXXXXXXX` */
  pubId: string
}

export function FundingChoices({ pubId }: FundingChoicesProps) {
  const src = `https://fundingchoicesmessages.google.com/i/${pubId}?ers=2`
  return (
    <>
      <Script id="funding-choices-script" src={src} async strategy="beforeInteractive" />
      <Script id="funding-choices-present" strategy="beforeInteractive">
        {`
          (function() {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe');
                  iframe.style.cssText = 'width:0;height:0;border:0;display:none;';
                  iframe.name = 'googlefcPresent';
                  document.body.appendChild(iframe);
                } else {
                  setTimeout(signalGooglefcPresent, 0);
                }
              }
            }
            signalGooglefcPresent();
          })();
        `}
      </Script>
    </>
  )
}

