"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type ClientType = "particulier" | "professionnel"

interface ClientTypeContextValue {
  clientType: ClientType
  setClientType: (value: ClientType) => void
}

const ClientTypeContext = createContext<ClientTypeContextValue | undefined>(undefined)

export function ClientTypeProvider({ children }: { children: ReactNode }) {
  const [clientType, setClientType] = useState<ClientType>("particulier")

  return (
    <ClientTypeContext.Provider value={{ clientType, setClientType }}>
      {children}
    </ClientTypeContext.Provider>
  )
}

/**
 * Accède au type de client partagé (formulaire <-> section économies).
 * Retourne un fallback local sûr si aucun provider n'est présent,
 * pour que les composants restent utilisables isolément.
 */
export function useClientType(): ClientTypeContextValue {
  const ctx = useContext(ClientTypeContext)
  // Fallback local pour éviter un crash hors provider
  const [localType, setLocalType] = useState<ClientType>("particulier")
  if (ctx) return ctx
  return { clientType: localType, setClientType: setLocalType }
}
