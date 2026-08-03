'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Copy, Check } from 'lucide-react'

interface UserMenuProps {
  email: string
  userId: string
  createdAt: string
  lastSignIn: string | null
}

export function UserMenu({ email, userId, createdAt, lastSignIn }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition text-sm text-foreground"
      >
        <span className="truncate max-w-xs">{email}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed top-[60px] inset-x-0 mx-4 sm:mx-0 sm:left-auto sm:right-4 sm:w-96 bg-card border border-border rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-border bg-muted/30 sticky top-0">
            <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Profil Utilisateur</h3>
            <p className="text-xs text-muted-foreground">Vos informations de compte</p>
          </div>

          {/* Table Content */}
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Email
              </label>
              <div className="flex items-center gap-2 bg-muted/30 rounded px-2 sm:px-3 py-2 sm:py-2.5 border border-border min-w-0">
                <span className="text-xs sm:text-sm text-foreground flex-1 truncate">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 hover:bg-muted rounded transition"
                  title="Copier"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* User ID */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                ID Utilisateur
              </label>
              <div className="flex items-center gap-2 bg-muted/30 rounded px-2 sm:px-3 py-2 sm:py-2.5 border border-border min-w-0">
                <span className="text-[0.65rem] sm:text-xs text-foreground font-mono flex-1 truncate">{userId}</span>
                <button
                  onClick={handleCopyId}
                  className="p-1.5 hover:bg-muted rounded transition"
                  title="Copier"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Created Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Créé le
              </label>
              <div className="bg-muted/30 rounded px-2 sm:px-3 py-2 sm:py-2.5 border border-border">
                <span className="text-xs sm:text-sm text-foreground break-words">
                  {new Date(createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {/* Last Sign In */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Dernière connexion
              </label>
              <div className="bg-muted/30 rounded px-2 sm:px-3 py-2 sm:py-2.5 border border-border">
                <span className="text-xs sm:text-sm text-foreground break-words">
                  {lastSignIn
                    ? new Date(lastSignIn).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Jamais'}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-border bg-muted/10 rounded-b-lg sticky bottom-0">
            <p className="text-xs text-muted-foreground text-center">
              Besoin d&apos;aide? Contactez le support
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
