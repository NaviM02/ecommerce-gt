DROP TABLE IF EXISTS notification CASCADE;
DROP TABLE IF EXISTS sanction CASCADE;
DROP TABLE IF EXISTS rating CASCADE;
DROP TABLE IF EXISTS order_detail CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS credit_card CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS product_category CASCADE;

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
    -- Ej: 'COMUN', 'MODERADOR', 'LOGISTICA', 'ADMIN'
);

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password VARCHAR(200) NOT NULL,
    role_id INT REFERENCES role(role_id) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
	description VARCHAR (100)
);

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    seller_id INT REFERENCES "user"(user_id) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    image_url VARCHAR(500),
    price NUMERIC(10,2) NOT NULL,
    stock INT NOT NULL CHECK (stock >= 1),
    condition INT CHECK (condition IN (1, 2)), -- 1: Nuevo, 2: Usado
    status INT DEFAULT 1 CHECK (status IN (1, 2, 3)), -- 1: Pendiente, 2: Aprobado, 3: Rechazado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_category (
    product_id INT REFERENCES product(product_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(user_id) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT DEFAULT 1 CHECK (status IN (1, 2)), -- 1: En curso, 2: Entregado
    delivery_date DATE,
	total_price NUMERIC(10,2) NOT NULL
);

CREATE TABLE order_detail (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES "order"(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES product(product_id),
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

CREATE TABLE credit_card (
    credit_card_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(user_id),
    card_number VARCHAR(20) NOT NULL,
    cardholder_name VARCHAR(100) NOT NULL,
    expiration_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE rating (
    rating_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES product(product_id),
    user_id INT REFERENCES "user"(user_id),
    stars INT CHECK (stars BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sanction (
    sanction_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(user_id),
    moderator_id INT REFERENCES "user"(user_id),
    reason TEXT NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('ACTIVA','LEVANTADA'))
);

CREATE TABLE notification (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(user_id),
    message TEXT NOT NULL,
    type VARCHAR(50), -- 'PEDIDO', 'PRODUCTO', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    was_sent BOOLEAN DEFAULT FALSE
);

INSERT INTO role (role_name) VALUES 
('ADMIN'),
('COMUN'),
('MODERADOR'),
('LOGISTICA');

-- password: admin
INSERT INTO "user" (full_name, username, email, phone, password, role_id) VALUES
('Luis Cifuentes', 'admin', 'admin@mail.com', '555-4001', '$2a$11$23VuA7/GPthnnT546ITyfONpxI.nh6L/b2zxeBgrEOP3vfcoIwpkO', 1);
-- password: 123
INSERT INTO "user" (full_name, username, email, phone, password, role_id) VALUES
('Juan Pérez', 'juan.perez', 'juan.perez@mail.com', '555-1001', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('María Gómez', 'maria.gomez', 'maria.gomez@mail.com', '555-1002', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('Carlos Ramírez', 'carlos.ramirez', 'carlos.ramirez@mail.com', '555-1003', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('Ana López', 'ana.lopez', 'ana.lopez@mail.com', '555-1004', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('Pedro Hernández', 'pedro.hernandez', 'pedro.hernandez@mail.com', '555-1005', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('Lucía Martínez', 'lucia.martinez', 'lucia.martinez@mail.com', '555-1006', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('Diego Sánchez', 'diego.sanchez', 'diego.sanchez@mail.com', '555-1007', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('Laura Morales', 'laura.morales', 'laura.morales@mail.com', '555-1008', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('José Castillo', 'jose.castillo', 'jose.castillo@mail.com', '555-1009', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2),
('Sofía Reyes', 'sofia.reyes', 'sofia.reyes@mail.com', '555-1010', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 2);

INSERT INTO "user" (full_name, username, email, phone, password, role_id) VALUES
('Marco Torres', 'marco.torres', 'marco.torres@mail.com', '555-2001', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 3),
('Paola Vargas', 'paola.vargas', 'paola.vargas@mail.com', '555-2002', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 3),
('Esteban Cruz', 'esteban.cruz', 'esteban.cruz@mail.com', '555-2003', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 3),
('Andrea Navarro', 'andrea.navarro', 'andrea.navarro@mail.com', '555-2004', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 3),
('Fernando Díaz', 'fernando.diaz', 'fernando.diaz@mail.com', '555-2005', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 3);

INSERT INTO "user" (full_name, username, email, phone, password, role_id) VALUES
('Luis Campos', 'luis.campos', 'luis.campos@mail.com', '555-3001', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 4),
('Marta Jiménez', 'marta.jimenez', 'marta.jimenez@mail.com', '555-3002', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 4),
('Ricardo Mejía', 'ricardo.mejia', 'ricardo.mejia@mail.com', '555-3003', '$2a$11$kich2N0hk.Wv32YCvBTsHu0Yy2ENbxaLzfB20KXxow.16RE1bQalm', 4);

INSERT INTO category (name, description) VALUES
('Electrónica', 'Teléfonos, tablets, computadoras y accesorios tecnológicos.'),
('Gaming', 'Relacionado a jugadores'),
('Ropa', 'Prendas de vestir para hombres, mujeres y niños.'),
('Hogar y Cocina', 'Artículos para el hogar, cocina, limpieza y decoración.'),
('Deportes', 'Equipo deportivo, ropa y accesorios para entrenamiento.'),
('Juguetes', 'Juguetes, juegos de mesa y productos para niños.'),
('Salud y Belleza', 'Productos de cuidado personal, cosméticos y bienestar.'),
('Automotriz', 'Accesorios y repuestos para vehículos.'),
('Libros', 'Libros físicos y electrónicos de distintos géneros.'),
('Mascotas', 'Productos y alimentos para mascotas.'),
('Electrodomésticos', 'Aparatos para el hogar como licuadoras, refrigeradoras y más.');

-- Usuario 2: Juan Pérez
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(2, 'Camisa de Algodón', 'Camisa casual de algodón para hombre.', '/uploads/products/camisa_algodon.jpg', 149.99, 25, 1, 2),
(2, 'Pantalón de Mezclilla', 'Pantalón clásico azul oscuro.', '/uploads/products/pantalon_mezclilla.jpg', 299.99, 20, 1, 2),
(2, 'Sudadera Deportiva', 'Sudadera ligera ideal para entrenar.', '/uploads/products/sudadera_deportiva.jpg', 199.99, 30, 1, 2),
(2, 'Chaqueta de Cuero', 'Chaqueta sintética resistente al agua.', '/uploads/products/chaqueta_cuero_hombre.jpg', 399.99, 15, 1, 2),
(2, 'Camiseta Gráfica', 'Camiseta con estampado moderno.', '/uploads/products/camiseta_grafica.jpg', 129.99, 40, 1, 2),
(2, 'Tenis Urbanos', 'Tenis cómodos para uso diario.', '/uploads/products/tenis_urbanos.jpg', 349.99, 20, 1, 2),
(2, 'Gorra Negra', 'Gorra ajustable de algodón.', '/uploads/products/gorra_negra.jpg', 79.99, 50, 1, 2),
(2, 'Cinturón de Cuero', 'Cinturón clásico de piel.', '/uploads/products/cinturon_cuero.jpg', 119.99, 25, 1, 2),
(2, 'Reloj Casual', 'Reloj analógico resistente al agua.', '/uploads/products/reloj_casual.jpg', 499.99, 10, 1, 2),
(2, 'Lentes de Sol', 'Lentes con protección UV.', '/uploads/products/lentes_sol.jpg', 179.99, 35, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(1, 3), (2, 3), (3, 3), (4, 3), (5, 3), (6, 3), (7, 3), (8, 3), (9, 3), (10, 3);

-- Usuario 3: María Gómez
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(3, 'Smartphone Galaxy X', 'Pantalla AMOLED y cámara triple.', '/uploads/products/smartphone_galaxyx.jpg', 4999.99, 10, 1, 2),
(3, 'Laptop HP Pavilion', 'Laptop con Intel i5 y 8GB RAM.', '/uploads/products/laptop_hp_pavilion.jpg', 5699.99, 8, 1, 2),
(3, 'Tablet Lenovo Tab M10', 'Pantalla 10", ideal para streaming.', '/uploads/products/tablet_lenovo_m10.jpg', 2999.99, 15, 1, 2),
(3, 'Teclado Mecánico RGB', 'Switches azules y retroiluminación.', '/uploads/products/teclado123.jpg', 499.99, 25, 1, 2),
(3, 'Mouse Gamer', 'Sensor óptico y luces RGB.', '/uploads/products/mouse_gamer.jpg', 199.99, 30, 1, 2),
(3, 'Monitor Samsung 27"', 'Resolución 2K con panel IPS.', '/uploads/products/monitor_samsung_27.jpg', 1999.99, 12, 1, 2),
(3, 'Auriculares Bluetooth', 'Cancelación activa de ruido.', '/uploads/products/auriculares_bt.jpg', 699.99, 18, 1, 2),
(3, 'Smartwatch FitPro', 'Resistente al agua, monitor de ritmo.', '/uploads/products/smartwatch_fitpro.jpg', 799.99, 14, 1, 2),
(3, 'Cámara Web Full HD', 'Ideal para videollamadas.', '/uploads/products/camara_web_hd.jpg', 249.99, 20, 1, 2),
(3, 'Router WiFi 6', 'Velocidad máxima y cobertura extendida.', '/uploads/products/router_wifi6.jpg', 999.99, 10, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(11, 1), (12, 1), (13, 1), (14, 2), (15, 2),
(16, 1), (17, 1), (18, 1), (19, 1), (20, 1);

-- Usuario 4: Carlos Ramírez
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(4, 'Licuadora Oster Pro', 'Motor potente de 600W con vaso de vidrio.', '/uploads/products/licuadora_oster_pro.jpg', 549.99, 15, 1, 2),
(4, 'Tostadora Black+Decker', 'Para dos rebanadas, ajuste de dorado.', '/uploads/products/tostadora_blackdecker.jpg', 279.99, 25, 1, 2),
(4, 'Microondas Samsung', 'Capacidad de 20L, múltiples programas.', '/uploads/products/microondas_samsung.jpg', 999.99, 10, 1, 2),
(4, 'Cafetera Philips', 'Cafetera de goteo con jarra térmica.', '/uploads/products/cafetera_philips.jpg', 399.99, 12, 1, 2),
(4, 'Plancha de Ropa', 'Suela antiadherente con vapor.', '/uploads/products/plancha_ropa.jpg', 249.99, 20, 1, 2),
(4, 'Batidora Manual', 'Con dos velocidades.', '/uploads/products/batidora_manual.jpg', 189.99, 30, 1, 2),
(4, 'Freidora de Aire', 'Freidora sin aceite de 4L.', '/uploads/products/freidora_aire.jpg', 899.99, 8, 1, 2),
(4, 'Olla Arrocera', 'Capacidad de 1.8L con función mantener caliente.', '/uploads/products/olla_arrocera.jpg', 299.99, 18, 1, 2),
(4, 'Set de Cuchillos', 'Acero inoxidable con soporte.', '/uploads/products/set_cuchillos.jpg', 349.99, 20, 1, 2),
(4, 'Sandwichera Eléctrica', 'Antiadherente y compacta.', '/uploads/products/sandwichera_electrica.jpg', 249.99, 25, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(21, 4), (22, 4), (23, 11), (24, 4), (25, 4),
(26, 4), (27, 11), (28, 4), (29, 4), (30, 11);

-- Usuario 5: Ana López
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(5, 'Secadora de Cabello Remington', 'Secadora profesional con tecnología iónica.', '/uploads/products/secadora_remington.jpg', 299.99, 12, 1, 2),
(5, 'Smart TV Samsung 55"', 'Televisor 4K UHD con control por voz.', '/uploads/products/tv_samsung.jpg', 5999.99, 5, 1, 2),
(5, 'Pantalón Levi’s 501', 'Clásico jean Levi’s para dama.', '/uploads/products/pantalon_levis.jpg', 349.99, 20, 1, 2),
(5, 'Set de Ollas Tramontina', 'Juego de ollas de acero inoxidable de 10 piezas.', '/uploads/products/ollas_tramontina.jpg', 999.99, 6, 1, 2),
(5, 'Toalla de Microfibra', 'Secado rápido, ideal para gimnasio.', '/uploads/products/toalla_microfibra.jpg', 79.99, 50, 1, 2),
(5, 'Perfume Dior Sauvage', 'Fragancia elegante y moderna para hombre.', '/uploads/products/perfume_dior.jpg', 749.99, 10, 1, 2),
(5, 'Set de Maquillaje Maybelline', 'Kit completo con sombras, base y labiales.', '/uploads/products/maquillaje_maybelline.jpg', 299.99, 20, 1, 2),
(5, 'Zapatillas Adidas Ultraboost', 'Zapatillas running con suela Boost.', '/uploads/products/ultraboost.jpg', 999.99, 8, 1, 2),
(5, 'Tablet Amazon Fire HD 10', 'Pantalla 10.1", 64GB de almacenamiento.', '/uploads/products/tablet_fire.jpg', 1399.99, 7, 1, 2),
(5, 'Collar para Mascotas', 'Collar ajustable con diseño divertido.', '/uploads/products/collar_mascota.jpg', 49.99, 40, 1, 2);

-- Categorías
INSERT INTO product_category (product_id, category_id) VALUES
(31, 7), (31, 11),
(32, 1), (32, 11),
(33, 3),
(34, 4),
(35, 5),
(36, 7),
(37, 7),
(38, 5),
(39, 1),
(40, 10);

-- Usuario 6: Pedro Hernández
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(6, 'Consola PlayStation 5', 'Consola de nueva generación con control DualSense.', '/uploads/products/ps5.jpg', 8499.99, 4, 1, 2),
(6, 'Juego FIFA 25', 'Última edición con licencias oficiales.', '/uploads/products/fifa25.jpg', 999.99, 15, 1, 2),
(6, 'Audífonos Razer Kraken', 'Auriculares gamer con sonido envolvente.', '/uploads/products/razer_kraken.jpg', 699.99, 10, 1, 2),
(6, 'Monitor LG UltraGear 27"', 'Monitor gamer 165Hz con resolución QHD.', '/uploads/products/monitor_lg.jpg', 2999.99, 6, 1, 2),
(6, 'Control Xbox Elite 2', 'Control personalizable de alto rendimiento.', '/uploads/products/control_elite.jpg', 2299.99, 5, 1, 2),
(6, 'Camiseta Zelda', 'Camiseta temática de The Legend of Zelda.', '/uploads/products/camiseta_zelda.jpg', 179.99, 20, 1, 2),
(6, 'Mouse Gamer Logitech G502', 'Mouse de alto rendimiento con RGB.', '/uploads/products/mouse_g502.jpg', 699.99, 12, 1, 2),
(6, 'Silla Gamer Cougar Armor', 'Silla ergonómica para largas sesiones de juego.', '/uploads/products/silla_cougar.jpg', 3299.99, 3, 1, 2),
(6, 'Teclado Redragon Kumara', 'Teclado mecánico con retroiluminación roja.', '/uploads/products/teclado_kumara.jpg', 499.99, 15, 1, 2),
(6, 'Auriculares HyperX Cloud II', 'Sonido 7.1 con comodidad premium.', '/uploads/products/hyperx_cloud2.jpg', 899.99, 8, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(41, 2),
(42, 2),
(43, 2),
(44, 1), (44, 2),
(45, 2),
(46, 3), (46, 2),
(47, 1), (47, 2),
(48, 2),
(49, 1), (49, 2),
(50, 2);

-- Usuario 7: Lucía Martínez 
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(7, 'Aspiradora Xiaomi Mi Vacuum', 'Aspiradora robot con limpieza automática.', '/uploads/products/aspiradora_xiaomi.jpg', 2599.99, 6, 1, 2),
(7, 'Cafetera Nespresso', 'Cafetera de cápsulas con diseño elegante.', '/uploads/products/cafetera_nespresso.jpg', 1299.99, 8, 1, 2),
(7, 'Set de Ropa Interior Calvin Klein', 'Set de dos piezas para dama.', '/uploads/products/ropa_ck.jpg', 349.99, 20, 1, 2),
(7, 'Cojín Decorativo', 'Cojín con funda lavable para sala.', '/uploads/products/cojin.jpg', 79.99, 40, 1, 2),
(7, 'Rímel L’Oréal', 'Máscara de pestañas waterproof.', '/uploads/products/rimel_loreal.jpg', 129.99, 30, 1, 2),
(7, 'Espejo con Luz LED', 'Ideal para maquillaje, recargable USB.', '/uploads/products/espejo_led.jpg', 199.99, 15, 1, 2),
(7, 'Bolsos Michael Kors', 'Bolso de cuero genuino.', '/uploads/products/bolso_mk.jpg', 1499.99, 6, 1, 2),
(7, 'Cortina Opaca', 'Cortina blackout para dormitorio.', '/uploads/products/cortina.jpg', 199.99, 10, 1, 2),
(7, 'Plancha de Cabello Babyliss', 'Plancha profesional de cerámica.', '/uploads/products/plancha_babyliss.jpg', 399.99, 12, 1, 2),
(7, 'Silla de Comedor Moderna', 'Diseño escandinavo, patas de madera.', '/uploads/products/silla_comedor.jpg', 499.99, 10, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(51, 4), (51, 11),
(52, 4), (52, 11),
(53, 3),
(54, 4),
(55, 7),
(56, 7),
(57, 3), (57, 7),
(58, 4),
(59, 7),
(60, 4);

-- Usuario 8: Diego Sánchez 
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(8, 'Smartwatch Amazfit GTS', 'Reloj deportivo con monitoreo de sueño y pasos.', '/uploads/products/amazfit_gts.jpg', 999.99, 10, 1, 2),
(8, 'Zapatillas Reebok Nano', 'Ideales para entrenamiento funcional.', '/uploads/products/reebok_nano.jpg', 849.99, 8, 1, 2),
(8, 'Guantes de Box Everlast', 'Guantes de cuero sintético.', '/uploads/products/guantes_box.jpg', 299.99, 20, 1, 2),
(8, 'Bicicleta GW Rin 29', 'Bicicleta de montaña con marco de aluminio.', '/uploads/products/bici_gw.jpg', 3499.99, 4, 1, 2),
(8, 'Proteína Whey ON', 'Suplemento de proteína de suero de leche 5lb.', '/uploads/products/proteina_on.jpg', 699.99, 15, 1, 2),
(8, 'Cuerda para Saltar Pro', 'Cuerda ajustable con rodamientos metálicos.', '/uploads/products/cuerda_saltar.jpg', 129.99, 25, 1, 2),
(8, 'Short Deportivo Under Armour', 'Short liviano para correr.', '/uploads/products/short_ua.jpg', 199.99, 20, 1, 2),
	(8, 'Mochila Deportiva Nike', 'Espaciosa con compartimentos ventilados.', '/uploads/products/mochila_nike.jpg', 299.99, 10, 1, 2),
(8, 'Botella de Agua Camelbak', 'Botella térmica libre de BPA.', '/uploads/products/botella_camelbak.jpg', 249.99, 25, 1, 2),
(8, 'Banda Elástica de Entrenamiento', 'Set de bandas de resistencia.', '/uploads/products/bandas_resistencia.jpg', 199.99, 30, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(61, 5), (61, 7),
(62, 5),
(63, 5),
(64, 5),
(65, 5), (65, 7),
(66, 5),
(67, 5),
(68, 5),
(69, 5),
(70, 5);

-- === Usuario 9: Laura Morales ===
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(9, 'Rimel Maybelline Lash', 'Aumenta el volumen de las pestañas.', '/uploads/products/rimel_lash.jpg', 89.99, 50, 1, 2),
(9, 'Crema Hidratante Nivea', 'Hidratación intensiva por 24 horas.', '/uploads/products/crema_nivea.jpg', 49.99, 60, 1, 2),
(9, 'Set de Brochas Real Techniques', 'Set de maquillaje profesional.', '/uploads/products/brochas_rt.jpg', 199.99, 25, 1, 2),
(9, 'Perfume Channel No.5', 'Fragancia icónica y elegante.', '/uploads/products/channel5.jpg', 1299.99, 8, 1, 2),
(9, 'Crema Facial L’Oréal', 'Antiedad con ácido hialurónico.', '/uploads/products/crema_loreal.jpg', 299.99, 30, 1, 2),
(9, 'Esponjas de Maquillaje', 'Set de 6 esponjas para aplicar base.', '/uploads/products/esponjas.jpg', 99.99, 40, 1, 2),
(9, 'Mascarilla Facial Coreana', 'Hidratación intensa y rejuvenecedora.', '/uploads/products/mascarilla.jpg', 39.99, 100, 1, 2),
(9, 'Secadora de Uñas', 'Secado rápido con luz UV.', '/uploads/products/secadora_unas.jpg', 249.99, 10, 1, 2),
(9, 'Removedor de Maquillaje Garnier', 'Micelar 400ml para todo tipo de piel.', '/uploads/products/micelar_garnier.jpg', 69.99, 60, 1, 2),
(9, 'Plancha para Cabello Revlon', 'Plancha profesional de cerámica.', '/uploads/products/plancha_revlon.jpg', 299.99, 15, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(71, 7),
(72, 7),
(73, 7),
(74, 7),
(75, 7),
(76, 7),
(77, 7),
(78, 7),
(79, 7),
(80, 7);

-- Usuario 10: José Castillo
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(10, 'Aceite para Motor Castrol GTX', 'Aceite sintético 5W-30 de alto rendimiento.', '/uploads/products/castrol_gtx.jpg', 199.99, 20, 1, 2),
(10, 'Limpiaparabrisas Bosch', 'Juego de escobillas 22” y 20”.', '/uploads/products/limpiaparabrisas.jpg', 89.99, 30, 1, 2),
(10, 'Luz LED para Auto', 'Focos LED H7 de alta potencia.', '/uploads/products/led_auto.jpg', 179.99, 25, 1, 2),
(10, 'Cera para Auto Turtle Wax', 'Brillo intenso y protección duradera.', '/uploads/products/cera_auto.jpg', 99.99, 40, 1, 2),
(10, 'Aspiradora Portátil para Auto', 'Limpieza rápida para interiores.', '/uploads/products/aspiradora_auto.jpg', 249.99, 10, 1, 2),
(10, 'Soporte para Celular', 'Soporte magnético para auto.', '/uploads/products/soporte_auto.jpg', 59.99, 50, 1, 2),
(10, 'Cámara de Retroceso', 'Cámara con visión nocturna y sensor.', '/uploads/products/camara_retroceso.jpg', 399.99, 8, 1, 2),
(10, 'Compresor de Aire Portátil', 'Infla llantas en minutos.', '/uploads/products/compresor_auto.jpg', 499.99, 10, 1, 2),
(10, 'Tapetes de Goma', 'Juego de tapetes universales para auto.', '/uploads/products/tapetes.jpg', 149.99, 25, 1, 2),
(10, 'Cargador para Auto USB', 'Cargador doble de carga rápida.', '/uploads/products/cargador_auto.jpg', 79.99, 40, 1, 2);

INSERT INTO product_category (product_id, category_id) VALUES
(81, 8),
(82, 8),
(83, 8),
(84, 8),
(85, 8),
(86, 8),
(87, 8),
(88, 8),
(89, 8),
(90, 8);

-- Usuario 11: Sofía Reyes 
INSERT INTO product (seller_id, name, description, image_url, price, stock, condition, status) VALUES
(11, 'Collar para Gato con Campana', 'Collar ajustable con diseño colorido.', '/uploads/products/collar_gato.jpg', 39.99, 50, 1, 2),
(11, 'Arena Sanitaria para Gato', 'Arena absorbente con control de olores.', '/uploads/products/arena_gato.jpg', 89.99, 40, 1, 2),
(11, 'Juguete para Perro Mordedor', 'Juguete de caucho resistente.', '/uploads/products/juguete_perro.jpg', 59.99, 30, 1, 2),
(11, 'Cama para Mascota', 'Cama acolchada lavable.', '/uploads/products/cama_mascota.jpg', 199.99, 20, 1, 2),
(11, 'Alimento para Perro Pedigree', 'Bolsa de 21kg sabor carne.', '/uploads/products/pedigree.jpg', 349.99, 15, 1, 2),
(11, 'Rascador para Gato', 'Rascador con base estable.', '/uploads/products/rascador_gato.jpg', 249.99, 10, 1, 2),
(11, 'Transportadora para Mascotas', 'Transportadora mediana con ventilación.', '/uploads/products/transportadora.jpg', 399.99, 8, 1, 2),
(11, 'Shampoo para Perros', 'Fórmula hipoalergénica para cuidado del pelaje.', '/uploads/products/shampoo_perro.jpg', 79.99, 25, 1, 2),
(11, 'Pelota para Perro', 'Pelota con sonido para juegos activos.', '/uploads/products/pelota_perro.jpg', 39.99, 50, 1, 2),
(11, 'Plato Doble para Mascotas', 'Comedero doble antideslizante con base de silicona.', '/uploads/products/plato_mascota.jpg', 69.99, 35, 1, 2);

-- Relaciones de categorías (todas en “Mascotas” + alguna otra afín para variedad)
INSERT INTO product_category (product_id, category_id) VALUES
(91, 10),
(92, 10),
(93, 10),
(94, 10),
(95, 10),
(96, 10),
(97, 10),
(98, 10), (98, 7), 
(99, 10),
(100, 10);