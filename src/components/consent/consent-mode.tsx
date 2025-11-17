import Script from 'next/script'

export function GoogleConsentModeDefaults() {
  return (
    <Script id="google-consent-mode-defaults" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        // Consent Mode v2 defaults: deny until Funding Choices updates them
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });
      `}
    </Script>
  )
}

