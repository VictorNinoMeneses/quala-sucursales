-- Crear tabla de monedas si no existe
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='vn_mon_moneda' AND xtype='U')
BEGIN
    CREATE TABLE vn_mon_moneda (
        Codigo NVARCHAR(10) PRIMARY KEY,
        Nombre NVARCHAR(100) NOT NULL
    );
END

-- Insertar monedas base (verifica si ya existen)
IF NOT EXISTS (SELECT Codigo, Nombre FROM vn_mon_moneda)
BEGIN
    INSERT INTO vn_mon_moneda (Codigo, Nombre) VALUES 
    ('COP', 'Peso Colombiano'),
    ('USD', 'Dólar Estadounidense'),
    ('EUR', 'Euro'),
    ('PE', 'Sol Peruano'),
    ('VEF', 'Bolívar Venezolano');
END

-- Crear tabla de sucursales si no existe
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='vn_suc_sucursal' AND xtype='U')
BEGIN
    CREATE TABLE vn_suc_sucursal (
        Codigo INT PRIMARY KEY,
        Descripcion NVARCHAR(250) NOT NULL,
        Direccion NVARCHAR(250) NOT NULL,
        Identificacion NVARCHAR(50) NOT NULL,
        FechaCreacion DATETIME NOT NULL,
        Moneda NVARCHAR(10) NOT NULL
    );
END

-- Agregar la relación si no existe
IF NOT EXISTS (
    SELECT * 
    FROM sys.foreign_keys 
    WHERE name = 'FK_Sucursal_Moneda'
)
BEGIN
    ALTER TABLE vn_suc_sucursal
    ADD CONSTRAINT FK_Sucursal_Moneda
    FOREIGN KEY (Moneda)
    REFERENCES vn_mon_moneda(Codigo);
END

-- Eliminar procedimientos existentes (para evitar errores al volver a ejecutar)
IF EXISTS (SELECT * FROM sysobjects WHERE name='vn_suc_obtener_todos' AND xtype='P') DROP PROCEDURE vn_suc_obtener_todos;
IF EXISTS (SELECT * FROM sysobjects WHERE name='vn_suc_obtener_por_codigo' AND xtype='P') DROP PROCEDURE vn_suc_obtener_por_codigo;
IF EXISTS (SELECT * FROM sysobjects WHERE name='vn_suc_insertar' AND xtype='P') DROP PROCEDURE vn_suc_insertar;
IF EXISTS (SELECT * FROM sysobjects WHERE name='vn_suc_actualizar' AND xtype='P') DROP PROCEDURE vn_suc_actualizar;
IF EXISTS (SELECT * FROM sysobjects WHERE name='vn_suc_eliminar' AND xtype='P') DROP PROCEDURE vn_suc_eliminar;
IF EXISTS (SELECT * FROM sysobjects WHERE name='vn_mon_obtener_todos' AND xtype='P') DROP PROCEDURE vn_mon_obtener_todos;


CREATE PROCEDURE [dbo].[vn_suc_obtener_todos]
AS
BEGIN
    SELECT 
        Codigo,
        Descripcion,
        Direccion,
        Identificacion,
        FechaCreacion,
        Moneda
    FROM vn_suc_sucursal;
END


CREATE PROCEDURE [dbo].[vn_suc_obtener_por_codigo]
    @codigo INT
AS
BEGIN
    SELECT 
        Codigo,
        Descripcion,
        Direccion,
        Identificacion,
        FechaCreacion,
        Moneda
    FROM vn_suc_sucursal
    WHERE Codigo = @codigo;
END

CREATE PROCEDURE [dbo].[vn_suc_insertar]
    @Codigo INT,
    @Descripcion NVARCHAR(250),
    @Direccion NVARCHAR(250),
    @Identificacion NVARCHAR(50),
    @FechaCreacion DATETIME,
    @Moneda NVARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validación fecha de creación
    IF @FechaCreacion < CAST(GETDATE() AS DATE)
    BEGIN
        RAISERROR('La fecha de creación no puede ser anterior a hoy.', 16, 1);
        RETURN;
    END

    INSERT INTO vn_suc_sucursal (
        Codigo,
        Descripcion,
        Direccion,
        Identificacion,
        FechaCreacion,
        Moneda
    )
    VALUES (
        @Codigo,
        @Descripcion,
        @Direccion,
        @Identificacion,
        @FechaCreacion,
        @Moneda
    );
END

CREATE PROCEDURE [dbo].[vn_suc_actualizar]
    @Codigo INT,
    @Descripcion NVARCHAR(250),
    @Direccion NVARCHAR(250),
    @Identificacion NVARCHAR(50),
    @FechaCreacion DATETIME,
    @Moneda NVARCHAR(10)
AS
BEGIN
    UPDATE vn_suc_sucursal
    SET Descripcion = @Descripcion,
        Direccion = @Direccion,
        Identificacion = @Identificacion,
        FechaCreacion = @FechaCreacion,
        Moneda = @Moneda
    WHERE Codigo = @Codigo;
END

CREATE PROCEDURE [dbo].[vn_suc_eliminar]
    @codigo INT
AS
BEGIN
    DELETE FROM vn_suc_sucursal WHERE Codigo = @codigo;
END

CREATE PROCEDURE [dbo].[vn_mon_obtener_todos]
AS
BEGIN
    SELECT Codigo, Nombre FROM vn_mon_moneda;
END