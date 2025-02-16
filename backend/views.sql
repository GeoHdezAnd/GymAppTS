/* 
!!  IMPORTANTE !!!
Estas son las vistas que se utilizan para mostrar registros de las compras de la base de datos, estos no se crean automaticamente como los "modelos"
Crea estas vistas directamente en tu base de datos ya sea desde consola (recomendado) o en la interfaz de PostgreSQL que estés usando :)
 */

CREATE VIEW vista_membresia_cliente AS
SELECT
  vm.id AS venta_id,
  vm.fecha_compra,
  vm.fecha_expiracion,
  vm.fecha_renovacion,
  vm.total,
  c.id AS cliente_id,
  c.nombre AS cliente_nombre,
  c.email AS cliente_email,
  m.id AS membresia_id,
  m.nombre AS membresia_nombre,
  CASE
    WHEN vm.fecha_renovacion::DATE IS NOT NULL THEN 'renovada'
    WHEN CURRENT_DATE < vm.fecha_expiracion::DATE THEN 'activa'
    ELSE 'expirada'
  END AS estado
FROM
  ventas_membresia vm
  JOIN cliente c ON vm.cliente_id = c.id
  JOIN membresia m ON vm.membresia_id = m.id;
  ORDER BY
  c.id, vm.fecha_compra DESC;


CREATE VIEW vista_ultima_membresia_cliente AS
SELECT DISTINCT ON (c.id)
  vm.id AS venta_id,
  vm.fecha_compra,
  vm.fecha_expiracion,
  vm.fecha_renovacion,
  vm.total,
  c.id AS cliente_id,
  c.nombre AS cliente_nombre,
  c.email AS cliente_email,
  m.id AS membresia_id,
  m.nombre AS membresia_nombre,
  CASE
    WHEN vm.fecha_renovacion::DATE IS NOT NULL THEN 'renovada'
    WHEN CURRENT_DATE < vm.fecha_expiracion::DATE THEN 'activa'
    ELSE 'expirada'
  END AS estado
FROM
  ventas_membresia vm
  JOIN cliente c ON vm.cliente_id = c.id
  JOIN membresia m ON vm.membresia_id = m.id
ORDER BY
  c.id, vm.fecha_compra DESC;