import Script from 'next/script'

const ADSTERRA_INVOKE_SCRIPT = "//brillianceremisswhistled.com/86fc2cb005c3c6b2f4f3a2daefc0de47/invoke.js"
const ADSTERRA_CONTAINER_ID = 'container-86fc2cb005c3c6b2f4f3a2daefc0de47'

export function AdsterraBanner() {
  return (
    <div className="flex justify-center px-4 py-8">
      <Script
        id="adsterra-invoke"
        src={ADSTERRA_INVOKE_SCRIPT}
        data-cfasync="false"
        strategy="afterInteractive"
      />
      <div id={ADSTERRA_CONTAINER_ID} className="w-full max-w-4xl min-h-[250px]" />
    </div>
  )
}
