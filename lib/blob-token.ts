/**
 * Recupere le token Vercel Blob de maniere robuste.
 *
 * La valeur de BLOB_READ_WRITE_TOKEN peut parfois etre stockee sous une forme
 * "sale" (guillemets, prefixe "BLOB_READ_WRITE_TOKEN=", espaces...) selon la
 * facon dont elle a ete saisie. Cette fonction extrait toujours le token propre
 * au format `vercel_blob_rw_...` s'il est present, sinon renvoie la valeur
 * nettoyee (sans guillemets ni espaces superflus).
 *
 * @returns le token propre, ou undefined si aucun token exploitable n'est defini.
 */
export function getBlobToken(): string | undefined {
  const raw = process.env.BLOB_READ_WRITE_TOKEN
  if (!raw) return undefined

  // Cas ideal : la vraie valeur du token est presente quelque part dans la chaine.
  const match = raw.match(/vercel_blob_rw_[A-Za-z0-9]+_[A-Za-z0-9]+/)
  if (match) return match[0]

  // Repli : on retire les guillemets et espaces superflus.
  const cleaned = raw.trim().replace(/^["']|["']$/g, '').trim()
  return cleaned.length > 0 ? cleaned : undefined
}
