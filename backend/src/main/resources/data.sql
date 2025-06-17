DELETE
FROM products;
DELETE
FROM categories;

INSERT INTO categories (id, name)
VALUES (1, 'Tecnología'),
       (2, 'Hogar'),
       (3, 'Ropa'),
       (4, 'Libros'),
       (5, 'Juguetes');


INSERT INTO products (id, name, description, image_url, price, stock, category_id)
VALUES (1, 'Auriculares Inalámbricos Gamer',
        'Auriculares Bluetooth 5.0 con cancelación activa de ruido y micrófono integrado.',
        'https://images.unsplash.com/photo-1583360173899-b3124bc238d9?q=80&w=1470&auto=format&fit=crop',
        79.99, 10, 1),

       (2, 'Lámpara de Escritorio LED',
        'Lámpara LED con control táctil, 3 niveles de brillo y cuello flexible.',
        'https://images.unsplash.com/photo-1652161854022-91f94b974d73?q=80&w=1472&auto=format&fit=crop',
        39.50, 10, 2),

       (3, 'Zapatillas Deportivas Hombre',
        'Zapatillas de running transpirables y con amortiguación para hombre.',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop',
        59.00, 15, 3),

       (4, 'Libro: El Señor de los Anillos',
        'Edición de bolsillo de la clásica novela de fantasía de J.R.R. Tolkien.',
        'https://images.unsplash.com/photo-1689289850637-65e74bf075f5?q=80&w=1450&auto=format&fit=crop',
        12.75, 3, 4),

       (5, 'Monitor 27\" Full HD IPS',
        'Monitor de 27 pulgadas con resolución Full HD (1920x1080) y panel IPS.',
        'https://plus.unsplash.com/premium_photo-1680721575441-18d5a0567269?q=80&w=1404&auto=format&fit=crop',
        299.99, 5, 1),

       (6, 'Silla Gamer Ergonómica',
        'Silla de gaming con soporte lumbar, reposabrazos ajustables y reclinación.',
        'https://images.unsplash.com/photo-1594501252356-79ebbbb10dd9?q=80&w=1470&auto=format&fit=crop',
        199.00, 7, 2),

       (7, 'Camiseta de Algodón Mujer',
        'Camiseta básica de manga corta confeccionada en algodón 100% orgánico.',
        'https://images.unsplash.com/photo-1652794121425-3994156518ba?q=80&w=1528&auto=format&fit=crop',
        18.99, 20, 3),

       (8, 'Novela Gráfica: Watchmen',
        'Aclamada novela gráfica de Alan Moore y Dave Gibbons.',
        'https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?q=80&w=3087&auto=format&fit=crop',
        25.50, 12, 4),

       (9, 'Tablet Android 10\"',
        'Tablet con pantalla de 10 pulgadas, 32GB de almacenamiento y sistema Android.',
        'https://plus.unsplash.com/premium_photo-1661342522661-b91c165a083c?q=80&w=2940&auto=format&fit=crop',
        149.00, 9, 1),

       (10, 'Juego de Construcción de Bloques',
        'Set de bloques de construcción con 200 piezas de diferentes formas y colores.',
        'https://images.unsplash.com/photo-1635536360947-886f9a65e647?q=80&w=2942&auto=format&fit=crop',
        29.99, 6, 5),

       (11, 'Juego de Mesa: Catán',
        'Juego de mesa estratégico para 3-4 jugadores.',
        'https://images.unsplash.com/photo-1682445629126-e0a7dad4faa7?q=80&w=3087&auto=format&fit=crop',
        45.00, 20, 5),

       (12, 'Pantalones Vaqueros Slim Fit',
        'Pantalones vaqueros de corte ajustado para hombre, disponibles en varios talles.',
        'https://images-ext-1.discordapp.net/external/GelNd3uauZRgJH3-P_K_bbLUZlUn9h7amh64-o2ILYg/%3Fq%3D80%26w%3D3086%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D/https/plus.unsplash.com/premium_photo-1688497831384-e40b2e5615cd?format=webp&width=436&height=655',
        69.99, 10, 3);
