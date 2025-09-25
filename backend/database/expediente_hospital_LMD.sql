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


-- Roles iniciales
INSERT INTO tbl_roles (nombre, descripcion)
VALUES
('admin', 'Acceso completo al sistema'),
('medico', 'Acceso a funciones médicas: ingreso, evolución, órdenes, etc.'),
('enfermeria', 'Acceso a control de medicamentos, signos vitales, notas y gastos');
 
 
 -- Usuario admin de prueba
 INSERT INTO tbl_usuarios (fk_id_rol, nombre_completo, nombre_usuario, contrasena, email, activo)
VALUES (
  1, -- id del rol admin
  'Administrador General',
  'admin',
  '$2b$10$FPVNheLXDoJPkGabb7sb0uzQfuIVjsfHwi8CJkfaLOtRjpCDuJitS', -- tu hash bcrypt
  'admin@hospital.com',
  TRUE
);
