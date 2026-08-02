-- ============================================
-- SCRIPT DE TEST - DONNÉES D'EXAMPLE
-- ============================================
-- À exécuter directement dans l'SQL Editor de Supabase
-- Remplacez user_id par un UUID réel

-- 1. Récupérez un user_id existant d'abord:
-- SELECT id FROM auth.users LIMIT 1;

-- 2. Insérez les données de test (remplacez 'YOUR_USER_ID'):

-- Insert analytics data
INSERT INTO user_analytics (user_id, monthly_savings, total_savings, total_simulations, favorite_supplier, favorite_region, total_favorites, total_alerts)
VALUES (
  '800d4fc1-4176-4843-8039-b2fa759d499e'::uuid,
  125.50,
  487.25,
  12,
  'Luminus',
  'bruxelles',
  3,
  2
) ON CONFLICT (user_id) DO UPDATE SET
  monthly_savings = 125.50,
  total_savings = 487.25,
  total_simulations = 12,
  favorite_supplier = 'Luminus',
  total_favorites = 3,
  total_alerts = 2;

-- Insert daily savings (last 10 days example)
INSERT INTO user_daily_savings (user_id, savings_amount, recorded_date) VALUES
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 15.25, CURRENT_DATE - INTERVAL '9 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 12.50, CURRENT_DATE - INTERVAL '8 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 18.75, CURRENT_DATE - INTERVAL '7 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 22.00, CURRENT_DATE - INTERVAL '6 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 10.50, CURRENT_DATE - INTERVAL '5 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 20.25, CURRENT_DATE - INTERVAL '4 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 15.75, CURRENT_DATE - INTERVAL '3 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 25.50, CURRENT_DATE - INTERVAL '2 days'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 18.00, CURRENT_DATE - INTERVAL '1 day'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 16.25, CURRENT_DATE);

-- Insert supplier interactions
INSERT INTO user_supplier_interactions (user_id, supplier_name, interaction_type, region) VALUES
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Luminus', 'view', 'bruxelles'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Luminus', 'compare', 'bruxelles'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Luminus', 'favorite', 'bruxelles'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Engie', 'view', 'bruxelles'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Engie', 'compare', 'bruxelles'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Mega', 'view', 'wallonie'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Octa+', 'view', 'bruxelles'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Octa+', 'compare', 'bruxelles'),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Ecofix', 'view', 'wallonie');

-- Insert price alerts
INSERT INTO user_price_alerts (user_id, alert_name, supplier_name, price_threshold, alert_type, is_active) VALUES
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Alerte Luminus', 'Luminus', 0.28, 'price_drop', true),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, 'Alerte Engie', 'Engie', 0.30, 'price_drop', true);

-- Insert simulations
INSERT INTO user_simulations (user_id, postal_code, region, estimated_savings, energy_type, offer_type, top_supplier, comparison_count, is_saved) VALUES
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, '1000', 'bruxelles', 125.50, 'both', 'variable', 'Luminus', 5, true),
  ('800d4fc1-4176-4843-8039-b2fa759d499e'::uuid, '1000', 'bruxelles', 95.75, 'electricite', 'fixe', 'Engie', 4, true);
