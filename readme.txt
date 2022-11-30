---URLS---
/api/productos

GET: '/' - Lista todos los productos.
GET: '/:id?' - Busca un producto por id.
POST: '/' - Agrega un producto al listado.
PUT: '/:id' - Modifica un  producto por id.
DELETE: '/:id' - Borra un producto por id.

/api/carrito

POST: '/' - Crea un carrito y devuelve su id.
DELETE: '/:id' - borra un carrito.
GET: '/:id/productos' - Lista todos los productos guardados en el carrito.
POST: '/:id/productos' - Agrega productos al carrito por id.
DELETE: '/:id/productos/:id_prod' - Elimina un producto del carrito por su id de carrito y de producto.
