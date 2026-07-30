# Supabase Setup - Phases 2 & 3: Dashboard Features + Invoice Management

Ce document décrit les migrations SQL à exécuter dans Supabase pour Phases 2 et 3.

## Prérequis

- Supabase project créé et connecté
- Variables d'env configurées : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Tables à créer

### 1. Favorites Table

Stocke les offres d'énergie favorites des utilisateurs.

```sql
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  supplier_id text not null,
  supplier_name text not null,
  offer_type text not null check (offer_type in ('electricity', 'gas', 'both')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  unique(user_id, supplier_id)
);

alter table public.favorites enable row level security;

create policy "Users can see their own favorites" on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert their own favorites" on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites" on public.favorites for delete
  using (auth.uid() = user_id);

create index idx_favorites_user_id on public.favorites(user_id);
```

### 2. Price Alerts Table

Stocke les alertes de prix créées par les utilisateurs.

```sql
create table if not exists public.price_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  alert_name text not null,
  offer_type text not null check (offer_type in ('electricity', 'gas', 'both')),
  max_price decimal(10, 2),
  min_price decimal(10, 2),
  regions text[] not null,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  last_triggered_at timestamp with time zone
);

alter table public.price_alerts enable row level security;

create policy "Users can see their own price alerts" on public.price_alerts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own price alerts" on public.price_alerts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own price alerts" on public.price_alerts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own price alerts" on public.price_alerts for delete
  using (auth.uid() = user_id);

create index idx_price_alerts_user_id on public.price_alerts(user_id);
create index idx_price_alerts_is_active on public.price_alerts(is_active);
```

### 3. Saved Comparisons Table

Stocke les comparaisons d'offres sauvegardées par les utilisateurs.

```sql
create table if not exists public.saved_comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  monthly_consumption decimal(10, 2) not null,
  consumer_type text not null check (consumer_type in ('residential', 'business')),
  selected_suppliers text[] not null,
  estimated_savings decimal(10, 2) default 0,
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone not null
);

alter table public.saved_comparisons enable row level security;

create policy "Users can see their own saved comparisons" on public.saved_comparisons for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved comparisons" on public.saved_comparisons for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved comparisons" on public.saved_comparisons for delete
  using (auth.uid() = user_id);

create index idx_saved_comparisons_user_id on public.saved_comparisons(user_id);
create index idx_saved_comparisons_expires_at on public.saved_comparisons(expires_at);
```

## Comment exécuter les migrations

### Option 1 : Via Supabase Dashboard SQL Editor

1. Accédez à votre Supabase project
2. Allez dans SQL Editor
3. Créez une nouvelle query
4. Copiez les SQL ci-dessus
5. Exécutez

### Option 2 : Via Supabase CLI

```bash
supabase migration add create_phase2_tables
# Éditez le fichier créé avec les SQL ci-dessus
supabase migration up
```

## Vérification

Après exécution, vérifiez que les tables ont bien été créées :

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

Vous devriez voir :
- favorites
- price_alerts
- saved_comparisons

## RLS (Row Level Security)

Toutes les tables ont RLS activé avec des policies permettant aux utilisateurs de voir/modifier uniquement leurs propres données.

## Prochaines étapes (Phase 3)

Pour Phase 3 (Invoice Management), vous aurez besoin de :

```sql
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_url text not null,
  file_name text not null,
  file_size int not null,
  supplier text not null,
  monthly_consumption decimal(10, 2),
  invoice_amount decimal(10, 2),
  invoice_date date,
  uploaded_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);

alter table public.invoices enable row level security;

create policy "Users can see their own invoices" on public.invoices for select
  using (auth.uid() = user_id);

create policy "Users can insert their own invoices" on public.invoices for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own invoices" on public.invoices for delete
  using (auth.uid() = user_id);

create index idx_invoices_user_id on public.invoices(user_id);
create index idx_invoices_expires_at on public.invoices(expires_at);
```

### Blob Storage Bucket

Pour l'upload des factures, créez un bucket Supabase Storage :

```sql
-- Via Supabase Dashboard:
-- 1. Allez dans Storage
-- 2. Cliquez "New Bucket"
-- 3. Nommez-le "invoices"
-- 4. Faites-le privé (non public)
```

Puis configurez les RLS policies pour le bucket :

```sql
-- Permissions pour les fichiers dans invoices bucket
-- Allow users to upload their own invoices
create policy "Users can upload their own invoices" on storage.objects for insert with check (
  bucket_id = 'invoices' and auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own invoices
create policy "Users can view their own invoices" on storage.objects for select using (
  bucket_id = 'invoices' and auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own invoices
create policy "Users can delete their own invoices" on storage.objects for delete using (
  bucket_id = 'invoices' and auth.uid()::text = (storage.foldername(name))[1]
);
```
