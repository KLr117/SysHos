-- =========================================================
-- BASE DE DATOS
-- =========================================================
CREATE DATABASE expediente_hospital;
USE expediente_hospital;

-- =========================================================
-- TABLAS CATÁLOGO
-- =========================================================
CREATE TABLE tbl_cat_sexos (
    pk_id_sexo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_cat_estados_expediente (
    pk_id_estado_expediente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_cat_unidades_peso (
    pk_id_unidad_peso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(10) NOT NULL
);

CREATE TABLE tbl_cat_unidades_temp (
    pk_id_unidad_temp INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(10) NOT NULL
);

CREATE TABLE tbl_cat_estados_cumplimiento (
    pk_id_estado_cumplimiento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_cat_categorias_gasto (
    pk_id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- =========================================================
-- TABLAS DE SEGURIDAD Y USUARIOS
-- =========================================================
CREATE TABLE tbl_roles (
    pk_id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

CREATE TABLE tbl_usuarios (
    pk_id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_rol INT NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    numero_registro VARCHAR(50),
    email VARCHAR(120),
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (fk_id_rol) REFERENCES tbl_roles(pk_id_rol)
);

-- =========================================================
-- PACIENTE Y EXPEDIENTE
-- =========================================================
CREATE TABLE tbl_pacientes (
    pk_id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    edad INT NOT NULL,
    fk_id_sexo INT NOT NULL,
    direccion TEXT,
    FOREIGN KEY (fk_id_sexo) REFERENCES tbl_cat_sexos(pk_id_sexo)
);

CREATE TABLE tbl_expedientes (
    pk_id_expediente INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_paciente INT NOT NULL,
    fecha_apertura DATETIME NOT NULL,
    fk_id_estado_expediente INT DEFAULT 1,
    FOREIGN KEY (fk_id_paciente) REFERENCES tbl_pacientes(pk_id_paciente),
    FOREIGN KEY (fk_id_estado_expediente) REFERENCES tbl_cat_estados_expediente(pk_id_estado_expediente)
);

CREATE TABLE tbl_asignacion_cama (
    pk_id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    cama VARCHAR(50) NOT NULL,
    fecha_hora DATETIME NOT NULL,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente)
);

-- =========================================================
-- INGRESO AL PACIENTE
-- =========================================================
CREATE TABLE tbl_ingreso_paciente (
    pk_id_ingreso INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    motivo_consulta TEXT,
    hea TEXT,
    antecedentes_m TEXT,
    antecedentes_q TEXT,
    antecedentes_al TEXT,
    antecedentes_tx TEXT,
    antecedentes_menopausia TEXT,
    antecedentes_gyo_menarquia TEXT,
    antecedentes_g INT,
    antecedentes_p INT,
    antecedentes_ab INT,
    antecedentes_cstp INT,
    peso DECIMAL(5,2),
    fk_id_unidad_peso INT DEFAULT 1,
    talla_cm DECIMAL(5,2),
    hv TEXT,
    hm TEXT,
    fc INT,
    pa VARCHAR(20),
    fr INT,
    t DECIMAL(4,2),
    spo2 INT,
    examen_cabeza TEXT,
    examen_cuello TEXT,
    examen_torax TEXT,
    examen_pulmonar TEXT,
    examen_cardiovascular TEXT,
    examen_gastrointestinal TEXT,
    examen_genitales TEXT,
    examen_extremidades TEXT,
    examen_neurologico TEXT,
    impresion_clinica TEXT,
    nuevos_datos TEXT,
    plan_diagnostico TEXT,
    plan_tratamiento TEXT,
    fecha_hora_crea DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_id_usuario_crea INT,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente),
    FOREIGN KEY (fk_id_usuario_crea) REFERENCES tbl_usuarios(pk_id_usuario),
    FOREIGN KEY (fk_id_unidad_peso) REFERENCES tbl_cat_unidades_peso(pk_id_unidad_peso)
);

-- =========================================================
-- EVOLUCIÓN
-- =========================================================
CREATE TABLE tbl_evoluciones (
    pk_id_evolucion INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    evolucion TEXT NOT NULL,
    depto VARCHAR(100),
    servicio VARCHAR(100),
    responsable_visible VARCHAR(150),
    fk_id_usuario_crea INT,
    fecha_hora_crea DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente),
    FOREIGN KEY (fk_id_usuario_crea) REFERENCES tbl_usuarios(pk_id_usuario)
);

-- =========================================================
-- ORDENES MÉDICAS
-- =========================================================
CREATE TABLE tbl_ordenes_medicas (
    pk_id_orden INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    comentario_libre TEXT,
    fk_id_usuario_crea INT,
    fecha_hora_crea DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente),
    FOREIGN KEY (fk_id_usuario_crea) REFERENCES tbl_usuarios(pk_id_usuario)
);

CREATE TABLE tbl_ordenes_items (
    pk_id_item INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_orden INT NOT NULL,
    secuencia INT NOT NULL,
    categoria VARCHAR(100),
    descripcion TEXT NOT NULL,
    FOREIGN KEY (fk_id_orden) REFERENCES tbl_ordenes_medicas(pk_id_orden)
);

CREATE TABLE tbl_ordenes_item_cumplimiento (
    pk_id_cumplimiento INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_item INT NOT NULL,
    fk_id_estado_cumplimiento INT DEFAULT 1,
    fecha_hora_estado DATETIME,
    motivo_cambio TEXT,
    responsable_visible VARCHAR(150),
    fk_id_usuario_cambia INT,
    FOREIGN KEY (fk_id_item) REFERENCES tbl_ordenes_items(pk_id_item),
    FOREIGN KEY (fk_id_usuario_cambia) REFERENCES tbl_usuarios(pk_id_usuario),
    FOREIGN KEY (fk_id_estado_cumplimiento) REFERENCES tbl_cat_estados_cumplimiento(pk_id_estado_cumplimiento)
);

-- =========================================================
-- CONTROL / ADMINISTRACIÓN DE MEDICAMENTOS
-- =========================================================
CREATE TABLE tbl_medicacion_horario (
    pk_id_mh INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha_inicio DATE,
    medicamento VARCHAR(150),
    dosis VARCHAR(100),
    via VARCHAR(50),
    frecuencia VARCHAR(50),
    fecha_omision DATE,
    pendientes TEXT,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente)
);

CREATE TABLE tbl_medicacion_horario_horas (
    pk_id_mhh INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_mh INT NOT NULL,
    hora TIME,
    FOREIGN KEY (fk_id_mh) REFERENCES tbl_medicacion_horario(pk_id_mh)
);

CREATE TABLE tbl_medicacion_stat (
    pk_id_ms INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha DATE,
    medicamento VARCHAR(150),
    dosis VARCHAR(100),
    via VARCHAR(50),
    hora TIME,
    responsable_visible VARCHAR(150),
    fk_id_usuario_crea INT,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente),
    FOREIGN KEY (fk_id_usuario_crea) REFERENCES tbl_usuarios(pk_id_usuario)
);

CREATE TABLE tbl_soluciones (
    pk_id_sol INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha DATE,
    tipo_solucion VARCHAR(100),
    volumen_n DECIMAL(6,2),
    volumen_pasar VARCHAR(50),
    medicamentos TEXT,
    dosis VARCHAR(100),
    frecuencia VARCHAR(50),
    nota TEXT,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente)
);

CREATE TABLE tbl_glucometrias (
    pk_id_gluco INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha DATE,
    frecuencia VARCHAR(50),
    insulina_am VARCHAR(50),
    insulina_pm VARCHAR(50),
    nota TEXT,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente)
);

CREATE TABLE tbl_glucometrias_horas (
    pk_id_gh INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_gluco INT NOT NULL,
    hora TIME,
    FOREIGN KEY (fk_id_gluco) REFERENCES tbl_glucometrias(pk_id_gluco)
);

CREATE TABLE tbl_nebulizaciones (
    pk_id_nebu INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha DATE,
    medicamento VARCHAR(100),
    dosis VARCHAR(100),
    dilucion VARCHAR(100),
    frecuencia VARCHAR(50),
    horario TIME,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente)
);

-- =========================================================
-- SIGNOS VITALES
-- =========================================================
CREATE TABLE tbl_signos_vitales (
    pk_id_sv INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha DATE,
    hora TIME,
    pa VARCHAR(20),
    fc INT,
    fc_nomenclatura VARCHAR(10),
    fr INT,
    fr_nomenclatura VARCHAR(10),
    temperatura DECIMAL(4,2),
    fk_id_unidad_temp INT DEFAULT 1,
    spo2 INT,
    oxigeno VARCHAR(50),
    gmt VARCHAR(50),
    insulina_c VARCHAR(50),
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente),
    FOREIGN KEY (fk_id_unidad_temp) REFERENCES tbl_cat_unidades_temp(pk_id_unidad_temp)
);

-- =========================================================
-- NOTAS DE ENFERMERÍA
-- =========================================================
CREATE TABLE tbl_notas_enfermeria (
    pk_id_nota INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    nota TEXT NOT NULL,
    depto VARCHAR(100),
    servicio VARCHAR(100),
    responsable_visible VARCHAR(150),
    fk_id_usuario_crea INT,
    fecha_hora_crea DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente),
    FOREIGN KEY (fk_id_usuario_crea) REFERENCES tbl_usuarios(pk_id_usuario)
);

-- =========================================================
-- REGISTRO DE MEDICAMENTOS (Medicamentos Aplicados)
-- =========================================================
CREATE TABLE tbl_registro_medicamentos (
    pk_id_registro_med INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    area_servicio VARCHAR(100) DEFAULT 'Encamamiento',
    diagnostico TEXT,
    medico VARCHAR(150),
    fecha_ingreso DATE,
    fecha_salida DATE,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente)
);

CREATE TABLE tbl_registro_med_grupos (
    pk_id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_registro_med INT NOT NULL,
    nombre_grupo VARCHAR(100),
    subtotal DECIMAL(10,2),
    FOREIGN KEY (fk_id_registro_med) REFERENCES tbl_registro_medicamentos(pk_id_registro_med)
);

CREATE TABLE tbl_registro_med_detalles (
    pk_id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_grupo INT NOT NULL,
    cantidad_valor DECIMAL(6,2),
    cantidad_texto VARCHAR(50),
    medicamento_insumo VARCHAR(150),
    precio_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    FOREIGN KEY (fk_id_grupo) REFERENCES tbl_registro_med_grupos(pk_id_grupo)
);

CREATE TABLE tbl_registro_med_revisiones (
    pk_id_revision INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_detalle INT NOT NULL,
    verificado BOOLEAN DEFAULT FALSE,
    fk_id_usuario_verifica INT,
    rol_usuario VARCHAR(100),
    fecha_hora_verifica DATETIME,
    FOREIGN KEY (fk_id_detalle) REFERENCES tbl_registro_med_detalles(pk_id_detalle),
    FOREIGN KEY (fk_id_usuario_verifica) REFERENCES tbl_usuarios(pk_id_usuario)
);

CREATE TABLE tbl_registro_med_totales (
    pk_id_total INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_registro_med INT NOT NULL,
    total DECIMAL(10,2),
    FOREIGN KEY (fk_id_registro_med) REFERENCES tbl_registro_medicamentos(pk_id_registro_med)
);

-- =========================================================
-- GASTOS GENERALES
-- =========================================================
CREATE TABLE tbl_gastos_generales (
    pk_id_gasto_general INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_expediente INT NOT NULL,
    habitacion VARCHAR(50),
    fecha_hora_ingreso DATETIME,
    dx TEXT,
    medicos TEXT,
    FOREIGN KEY (fk_id_expediente) REFERENCES tbl_expedientes(pk_id_expediente)
);

CREATE TABLE tbl_gasto_detalles (
    pk_id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_gasto_general INT NOT NULL,
    fk_id_categoria INT NOT NULL,
    columna1 TEXT,
    columna2 TEXT,
    columna3 TEXT,
    columna4 TEXT,
    verificado BOOLEAN DEFAULT FALSE,
    fk_id_usuario_verifica INT,
    fecha_hora_verifica DATETIME,
    FOREIGN KEY (fk_id_gasto_general) REFERENCES tbl_gastos_generales(pk_id_gasto_general),
    FOREIGN KEY (fk_id_categoria) REFERENCES tbl_cat_categorias_gasto(pk_id_categoria),
    FOREIGN KEY (fk_id_usuario_verifica) REFERENCES tbl_usuarios(pk_id_usuario)
);
