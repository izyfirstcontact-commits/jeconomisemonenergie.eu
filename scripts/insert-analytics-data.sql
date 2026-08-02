-- Insert analytics data for new users
-- User 1: e57e9d67-0147-4fee-9988-707c5a281905
INSERT INTO user_energy_consumption (user_id, date, consumption_kwh, cost_eur, provider)
VALUES
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-03', 45.2, 12.50, 'Engie'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-10', 52.8, 14.20, 'Engie'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-17', 38.5, 10.80, 'Luminus'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-24', 41.2, 11.50, 'Luminus'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-31', 35.8, 9.90, 'TotalEnergie'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-08-01', 48.5, 13.40, 'Eneco');

INSERT INTO user_savings (user_id, date, savings_amount_eur, comparison_provider)
VALUES
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-03', 3.50, 'Bolt'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-10', 4.20, 'Octa+'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-17', 2.80, 'Ecofix'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-24', 3.15, 'Mega'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-07-31', 2.50, 'Bolt'),
  ('e57e9d67-0147-4fee-9988-707c5a281905', '2026-08-01', 4.80, 'Eneco');

INSERT INTO supplier_consultations (user_id, supplier_name, consultation_date, comparison_count)
VALUES
  ('e57e9d67-0147-4fee-9988-707c5a281905', 'Engie', '2026-07-15', 3),
  ('e57e9d67-0147-4fee-9988-707c5a281905', 'Luminus', '2026-07-22', 2),
  ('e57e9d67-0147-4fee-9988-707c5a281905', 'TotalEnergie', '2026-07-29', 4),
  ('e57e9d67-0147-4fee-9988-707c5a281905', 'Eneco', '2026-08-01', 2);

-- User 2: f0234018-ecf5-4c85-bf02-4bb8a06bd0ad
INSERT INTO user_energy_consumption (user_id, date, consumption_kwh, cost_eur, provider)
VALUES
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-05', 62.3, 17.80, 'TotalEnergie'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-12', 58.7, 16.50, 'TotalEnergie'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-19', 71.4, 20.10, 'Bolt'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-26', 55.2, 15.30, 'Octa+'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-08-02', 49.8, 13.80, 'Ecofix');

INSERT INTO user_savings (user_id, date, savings_amount_eur, comparison_provider)
VALUES
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-05', 6.20, 'Engie'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-12', 5.80, 'Mega'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-19', 8.50, 'Luminus'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-07-26', 5.20, 'Eneco'),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', '2026-08-02', 4.95, 'Bolt');

INSERT INTO supplier_consultations (user_id, supplier_name, consultation_date, comparison_count)
VALUES
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', 'TotalEnergie', '2026-07-10', 5),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', 'Bolt', '2026-07-17', 3),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', 'Octa+', '2026-07-24', 4),
  ('f0234018-ecf5-4c85-bf02-4bb8a06bd0ad', 'Ecofix', '2026-08-01', 2);

-- User 3: 92154921-a84e-4c7e-9a9f-fb3a3f130b68
INSERT INTO user_energy_consumption (user_id, date, consumption_kwh, cost_eur, provider)
VALUES
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-08', 39.5, 11.20, 'Luminus'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-15', 44.2, 12.80, 'Luminus'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-22', 36.8, 10.50, 'Eneco'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-29', 42.1, 12.10, 'Mega'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-08-02', 37.4, 10.80, 'Bolt');

INSERT INTO user_savings (user_id, date, savings_amount_eur, comparison_provider)
VALUES
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-08', 2.95, 'Engie'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-15', 3.50, 'TotalEnergie'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-22', 2.80, 'Octa+'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-07-29', 3.90, 'Ecofix'),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', '2026-08-02', 3.10, 'Luminus');

INSERT INTO supplier_consultations (user_id, supplier_name, consultation_date, comparison_count)
VALUES
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', 'Luminus', '2026-07-12', 2),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', 'Eneco', '2026-07-19', 3),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', 'Mega', '2026-07-26', 2),
  ('92154921-a84e-4c7e-9a9f-fb3a3f130b68', 'Bolt', '2026-08-01', 1);
