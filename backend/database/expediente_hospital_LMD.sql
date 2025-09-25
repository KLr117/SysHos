USE expediente_hospital;

-- =========================================================
-- CATALOGOS
-- =========================================================

-- Sexos
INSERT INTO tbl_cat_sexos (nombre) VALUES ('M'), ('F');

-- Estado del expediente
INSERT INTO tbl_cat_estados_expediente (nombre) VALUES ('activo'), ('cerrado');

-- Unidad de peso
INSERT INTO tbl_cat_unidades_peso (nombre) VALUES ('Kg'), ('Lb');

-- Unidad de temperatura
INSERT INTO tbl_cat_unidades_temp (nombre) VALUES ('C'), ('F');

-- Estado cumplimiento orden
INSERT INTO tbl_cat_estados_cumplimiento (nombre) VALUES ('Pendiente'), ('Cumplida'), ('Suspendida');

-- Categorías de gasto
INSERT INTO tbl_cat_categorias_gasto (nombre) VALUES
('Medicamentos de Farmacia'),
('Medicamentos Hospital'),
('Laboratorios'),
('Laboratorios fuera de hora'),
('Comida'),
('Uso de quirófano'),
('Habitación'),
('Ultrasonido'),
('EKG'),
('Rayos X'),
('Interconsulta'),
('Sangre'),
('Oxígeno'),
('Bomba de infusión'),
('Patología'),
('Anestésico'),
('Monitor/MAPA'),
('PREOPERATORIO'),
('Medicos que entran a SOP'),
('Referencias'),
('Ambulancia'),
('Sutura'),
('Otros');
