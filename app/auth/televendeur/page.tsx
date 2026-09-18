import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Connexion télévendeurs | jeconomisemonenergie.eu',
  description: 'Espace sécurisé réservé aux télévendeurs autorisés.',
}

export default function TelevendeurLoginPage() {
  redirect('/auth/login?audience=televendeur&redirectTo=%2Fdashboard%2Fencodage')
}
