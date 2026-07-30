import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import { getBlobToken } from '@/lib/blob-token'

// Configuration des fichiers acceptes
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Validation de la taille
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Le fichier depasse la taille maximale de 10 Mo' },
        { status: 400 }
      )
    }

    // Validation du type MIME
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format non accepte. Utilisez PDF, JPG ou PNG.' },
        { status: 400 }
      )
    }

    // Validation de l'extension
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !['pdf', 'jpg', 'jpeg', 'png'].includes(extension)) {
      return NextResponse.json(
        { error: 'Extension de fichier non valide' },
        { status: 400 }
      )
    }

    // Verifier que le stockage Blob est configure
    const blobToken = getBlobToken()
    if (!blobToken) {
      console.error(
        'Erreur upload: BLOB_READ_WRITE_TOKEN manquant. Ajoutez-le dans les variables d\'environnement du projet (integration Vercel Blob).'
      )
      return NextResponse.json(
        {
          error:
            'Le stockage des fichiers n\'est pas encore configure. Vous pouvez envoyer votre demande sans facture.',
        },
        { status: 503 }
      )
    }

    // Generer un nom unique pour le fichier.
    // addRandomSuffix ajoute un suffixe aleatoire => URL non devinable.
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const pathname = `factures/${timestamp}-${sanitizedName}`

    // Upload vers Vercel Blob.
    // Le store est configure en acces public : on utilise donc access:'public'
    // avec un suffixe aleatoire pour que l'URL reste non devinable.
    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
      token: blobToken,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      filename: file.name,
      size: file.size,
      contentType: file.type,
    })
  } catch (error) {
    console.error('Erreur upload:', error)
    return NextResponse.json(
      { error: 'Erreur lors du telechargement du fichier' },
      { status: 500 }
    )
  }
}
