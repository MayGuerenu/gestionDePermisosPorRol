Gestión de Usuarios, Roles y Permisos

Permisos creados - Se crearon los siguientes permisos para ejemplificar el control de acceso por rol:
- ver_usuarios
- editar_usuarios
- eliminar_usuarios
- ver_roles
- editar_roles

Asignación de permisos a roles:
- Desde la interfaz de edición de roles, se puede seleccionar qué permisos tendrá cada rol.
- Para cada rol, el sistema guarda la relación en la tabla role_permission, que vincula roles con permisos mediante sus IDs.
- Al actualizar un rol, los permisos seleccionados se actualizan automáticamente en la base de datos.

Los permisos asociados a un rol se visualizan en:
- Vista de edición de roles: aparecen como checkboxes marcados los permisos ya asignados al rol.
- Vista de detalle de usuario: al ingresar al perfil de un usuario, se muestra el nombre del rol que tiene asignado y debajo la lista de permisos que hereda de dicho rol.
