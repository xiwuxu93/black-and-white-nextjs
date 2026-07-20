import { redirect } from 'next/navigation'

interface Props {
  params: { locale: string }
}

export default function BatchPageRedirect({ params }: Props) {
  redirect(`/${params.locale || 'en'}/batch-black-and-white-converter/`)
}
