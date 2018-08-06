import { Injectable } from '@angular/core';

@Injectable()
export class EventsService {
  public allEvents:any = [
      { 
        start: new Date('2018-08-31T00:00:00'), 
        end: new Date('2018-08-31T00:00:00'), 
        title: 'Ronda de Boltaña con la Banda de Música de Ejea', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Ronda de Boltaña y Banda de Música de Ejea', 
        type: 'Música',
        place: 'Plaza de España',
        icon: 'musical-note'
    },{ 
        start: new Date('2018-09-01T00:00:00'), 
        end: new Date('2018-09-01T00:00:00'), 
        title: 'Fórmula V', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Fórmula V', 
        type: 'Música',
        place: 'Avenida Cosculluela',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-01T00:00:00'), 
        end: new Date('2018-09-01T00:00:00'), 
        title: 'Fiesta Ejea I LOVE \'90', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Desconocido', 
        type: 'Música',
        place: 'Plaza de España',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-02T00:00:00'), 
        end: new Date('2018-09-02T00:00:00'), 
        title: 'Elefantes', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Elefantes', 
        type: 'Música',
        place: 'Plaza de la diputación',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-02T00:00:00'), 
        end: new Date('2018-09-02T00:00:00'), 
        title: 'El Silencio de los Heroes', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'El Silencio de los Heroes', 
        type: 'Música',
        place: 'Plaza de la diputación',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-03T00:00:00'), 
        end: new Date('2018-09-03T00:00:00'), 
        title: 'Villa y sus dorados', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Villa y sus dorados', 
        type: 'Música',
        place: 'Plaza de España',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-03T00:00:00'), 
        end: new Date('2018-09-03T00:00:00'), 
        title: 'Euphonic Tropical', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Euphonic Tropical', 
        type: 'Música',
        place: 'Plaza de España',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-03T00:00:00'), 
        end: new Date('2018-09-03T00:00:00'), 
        title: 'Fiesta Ejea Dance', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Desconocido', 
        type: 'Música',
        place: 'Plaza de España',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-04T00:00:00'), 
        end: new Date('2018-09-04T00:00:00'), 
        title: 'Frecuencia Musical', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Frecuencia Musical', 
        type: 'Música',
        place: 'Plaza de España',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-04T00:00:00'), 
        end: new Date('2018-09-04T00:00:00'), 
        title: 'Orquesta Ingenio', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Orquesta Ingenio', 
        type: 'Música',
        place: 'Plaza de España',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-05T00:00:00'), 
        end: new Date('2018-09-05T00:00:00'), 
        title: 'David Bustamante', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'David Bustamante', 
        type: 'Música',
        place: 'Plaza de toros',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-05T00:00:00'), 
        end: new Date('2018-09-05T00:00:00'), 
        title: 'Alejo Stivel (Tequila)', 
        description: 'Alejo Stivel es un cantante, compositor y productor musical. Voz de la banda hispano-argentina Tequila.', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Alejo Stivel', 
        type: 'Música',
        place: 'Avenida Cosculluela',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-06T00:00:00'), 
        end: new Date('2018-09-06T00:00:00'), 
        title: 'Brothers in Band', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Brothers in Band', 
        type: 'Música',
        place: 'Plaza de la diputación',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-06T00:00:00'), 
        end: new Date('2018-09-06T00:00:00'), 
        title: 'Corto Alcance (Rap Ejea)', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Corto Alcance (Rap Ejea)', 
        type: 'Música',
        place: 'Plaza de la diputación',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-06T00:00:00'), 
        end: new Date('2018-09-06T00:00:00'), 
        title: 'La Pandilla de Drilo', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'La Pandilla de Drilo', 
        type: 'Música',
        place: 'Plaza de la diputación',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-07T00:00:00'), 
        end: new Date('2018-09-07T00:00:00'), 
        title: 'Tako', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: 'Tako', 
        type: 'Música',
        place: 'Avenida Cosculluela',
        icon: 'musical-note'
    },
    { 
        start: new Date('2018-09-07T00:00:00'), 
        end: new Date('2018-09-07T00:00:00'), 
        title: 'Quedada y Herrerias 2000', 
        description: '', 
        colaborators: 'Ayuntamiento de Ejea', 
        artists: '', 
        type: 'Otros',
        place: 'Herrerias',
        icon: 'megaphone'
    }
  ];
}