# Supabase Authentication Setup Guide

Cette guide vous aide à configurer Supabase Auth correctement pour que les utilisateurs puissent s'inscrire et se connecter avec email/password et Google OAuth.

## 1. Vérifier vos env vars Supabase

Assurez-vous que vous avez ajouté ces variables d'environnement dans votre projet Vercel :

- `NEXT_PUBLIC_SUPABASE_URL` - L'URL de votre projet Supabase (ex: `https://xxxxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - La clé anonyme Supabase (clé publique)

**Comment les trouver :**

1. Allez sur https://supabase.com et connectez-vous
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** (publique) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Allez dans votre projet Vercel → **Settings** → **Environment Variables**
6. Ajoutez ces deux variables

## 2. Configurer Email/Password Authentication

C'est déjà configuré par défaut dans Supabase !

**Pour tester :**
1. Allez sur `/auth/sign-up`
2. Entrez un email et password (min 8 caractères)
3. Cliquez "Sign up"
4. Vous devriez voir un message de succès ou une erreur claire

## 3. Activer Google OAuth dans Supabase

Google OAuth n'est PAS activé par défaut. Voici comment l'activer :

### Étape 1 : Créer une application Google OAuth

1. Allez sur https://console.cloud.google.com
2. Créez un nouveau projet (si pas déjà fait)
3. Allez dans **APIs & Services** → **Credentials**
4. Cliquez **+ Create Credentials** → **OAuth client ID**
5. Choisissez **Web application**
6. Ajoutez ces URIs autorisées :
   ```
   http://localhost:3000/auth/callback
   https://xxxxx.supabase.co/auth/v1/callback?provider=google
   https://yourprojectname.vercel.app/auth/callback
   ```
   (Remplacez `xxxxx` par votre ID projet Supabase et `yourprojectname` par votre domaine Vercel)

7. Copiez votre **Client ID** et **Client Secret**

### Étape 2 : Ajouter Google OAuth à Supabase

1. Allez sur https://supabase.com → votre projet
2. Allez dans **Authentication** → **Providers**
3. Cherchez **Google** et cliquez dessus
4. Activez le toggle
5. Collez votre **Client ID** et **Client Secret** de Google Cloud Console
6. Cliquez **Save**

### Étape 3 : Vérifier la configuration

1. Allez sur `/auth/sign-up`
2. Vous devriez voir le bouton "Google"
3. Cliquez dessus - vous devriez être redirigé vers Google pour vous connecter

## 4. Configurer l'URL de Redirect

L'authentification OAuth a besoin d'une URL de redirection correcte après connexion.

**Par défaut**, le code utilise :
```
${window.location.origin}/auth/callback
```

Cela fonctionne automatiquement avec :
- Local : `http://localhost:3000/auth/callback`
- Vercel preview : `https://v0-...vercel.app/auth/callback`
- Production : `https://yourdomain.com/auth/callback`

**Ou vous pouvez définir une variable optionnelle :**
```
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL = https://yourdomain.com/auth/callback
```

## 5. Dépannage

### "Failed to fetch" sur la page sign-up

**Cause :** Env vars Supabase manquantes

**Solution :**
1. Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont définis
2. Attendez ~60 secondes pour que les env vars se propagent
3. Rechargez la page

### "Unsupported provider: provider is not enabled"

**Cause :** Google OAuth n'est pas activé dans Supabase

**Solution :**
1. Allez dans Supabase → votre projet → **Authentication** → **Providers**
2. Cherchez **Google**
3. Activez le toggle
4. Ajoutez votre Client ID et Client Secret
5. Cliquez **Save**

### Page noire après clic sur "Google"

**Cause :** URL de redirection manquante ou incorrecte dans Google Cloud Console

**Solution :**
1. Allez sur https://console.cloud.google.com
2. Sélectionnez votre projet OAuth
3. Allez dans **Credentials**
4. Cliquez sur votre OAuth 2.0 Client ID
5. Vérifiez que `https://xxxxx.supabase.co/auth/v1/callback?provider=google` est dans les URIs autorisées
6. Sauvegardez

### "Invalid credentials" ou erreur d'authentification

**Cause :** Client ID/Secret incorrect

**Solution :**
1. Vérifiez que vous avez copié le bon Client ID et Secret
2. Dans Supabase, cliquez sur le fournisseur Google et vérifiez les valeurs
3. Réessayez

## 6. Données utilisateur après authentification

Après un sign-up/login réussi, l'utilisateur est redirigé vers `/dashboard` avec sa session établie.

### Pour accéder aux données utilisateur :

```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
console.log(user?.email)
```

### Informations disponibles :

- `user.id` - UUID unique
- `user.email` - Email de l'utilisateur
- `user.user_metadata` - Métadonnées personnalisées
- `user.created_at` - Date de création du compte
- `user.last_sign_in_at` - Dernière connexion

## 7. Sécurité

✅ Les passwords sont hashés (bcrypt) dans Supabase
✅ Les sessions sont gérées par Supabase
✅ Google OAuth utilise OAuth 2.0 standard
✅ Row Level Security (RLS) protège les données utilisateur

## 8. Checklist de déploiement

- [ ] `NEXT_PUBLIC_SUPABASE_URL` ajouté à env vars Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` ajouté à env vars Vercel
- [ ] Google OAuth Client ID et Secret créés sur Google Cloud Console
- [ ] Google OAuth activé dans Supabase avec Client ID/Secret
- [ ] URLs de redirection correctes dans Google Cloud Console
- [ ] Tester sign-up avec email
- [ ] Tester login avec email
- [ ] Tester sign-up avec Google
- [ ] Tester login avec Google
- [ ] Dashboard accessible après login

## Besoin d'aide ?

Si vous rencontrez des erreurs :

1. Vérifiez la console du navigateur (F12) → onglet **Console** pour les logs `[v0]`
2. Vérifiez la page `/auth/sign-up` ou `/auth/login` pour les messages d'erreur
3. Consultez la [documentation Supabase Auth](https://supabase.com/docs/guides/auth)
4. Consultez la [documentation Google OAuth](https://developers.google.com/identity/protocols/oauth2)
