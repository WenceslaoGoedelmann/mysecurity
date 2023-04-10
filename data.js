const datosProductos = [
    {
      id: 1,
      name: 'Central Alarma',
      price: 18581,
      category: 'alarmas',
      cardImg: './img/img_Central_Alarma.jpg',
    },
    {
        id: 2,
        name: 'Teclado Display',
        price: 18218,
        category: 'alarmas',
        cardImg: './img/img_Teclado_Display.jpg',
      },
      {
        id: 3,
        name: 'Teclado LED',
        price: 15258,
        category: 'alarmas',
        cardImg: './img/img_Teclado_Led.jpg',
      },
      {
        id: 4,
        name: 'Sensor Infrarrojo Inalámbrico',
        price: 10367,
        category: 'alarmas',
        cardImg: './img/img_Sensor_Movimiento.jpg',
      },
      {
        id: 5,
        name: 'Sensor Infrarrojo Cableado',
        price: 7144,
        category: 'alarmas',
        cardImg: './img/img_Sensor_Movimiento.jpg',
      },
      {
        id: 6,
        name: 'Sensor Magnético Inalámbrico',
        price: 6842,
        category: 'alarmas',
        cardImg: './img/img_Sensor_Magnetico_Inalambrico.jpg',
      },
      {
        id: 7,
        name: 'Sensor Magnético Cableado',
        price: 3691,
        category: 'alarmas',
        cardImg: './img/img_Sensor_Magnetico.jpg',
      },
      {
        id: 8,
        name: 'Sensor de Humo',
        price: 13111,
        category: 'alarmas',
        cardImg: './img/img_Detector_Humo.jpg',
      },
      {
        id: 9,
        name: 'Sirena',
        price:  9898,
        category: 'alarmas',
        cardImg: './img/img_Sirena.jpg',
      },
      {
        id: 10,
        name: 'Barrera Infrarroja',
        price: 12008,
        category: 'alarmas',
        cardImg: './img/img_Barrera_Infraroja.jpg',
      },
      {
        id: 11,
        name: 'Batería',
        price: 6022,
        category: 'alarmas',
        cardImg: './img/img_Bateria.jpg',
      },
      {
        id: 12,
        name: 'Control Remoto',
        price: 4412,
        category: 'alarmas',
        cardImg: './img/img_Control_Remoto.jpg',
      },
      {
        id: 13,
        name: 'Receptor Sensores Inalámbricos',
        price: 7359,
        category: 'alarmas',
        cardImg: './img/img_Receptor_Inalambrico.jpg',
      },
      {
        id: 14,
        name: 'Cámara Bullet',
        price: 18475,
        category: 'camaras',
        cardImg: './img/img_Camara_Bulet.jpg',
      },
      {
        id: 15,
        name: 'Cámara Domo',
        price: 10743,
        category: 'camaras',
        cardImg: './img/img_Camara_Domo.jpg',
      },
      {
        id: 16,
        name: 'DVR',
        price: 49545,
        category: 'camaras',
        cardImg: './img/img_DVR.jpg',
      },
      {
        id: 17,
        name: 'Disco Rígido 1TB',
        price: 17329,
        category: 'camaras',
        cardImg: './img/img_Disco_1TB.jpg',
      },
      {
        id: 18,
        name: 'Disco Rígido 2TB',
        price: 20999,
        category: 'camaras',
        cardImg: './img/img_Disco_2TB.jpg',
      },
      {
        id: 19,
        name: 'Disco Rígido 4TB ',
        price: 33990,
        category: 'camaras',
        cardImg: './img/img_Disco_4TB.jpg',
      },
      
];

const divirProductos = tamanio => {
    let productosDivididos = [];
    for (let i = 0; i < datosProductos.length; i += tamanio)
    productosDivididos.push(datosProductos.slice(i, i + tamanio)); 
    return productosDivididos;
  };
  
 const controlProductos = {
    productosDivididos: divirProductos(8),
    siguientesProductosIndex: 1,
    limiteProductos: divirProductos(8).length,
  };