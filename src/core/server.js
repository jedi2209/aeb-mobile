export const API = class AebApi {
  constructor(opts) {
    // :)
    const apiKeys = {
      android: '6g?-1)!m.8`EEko4OguYsuxpZI)$jM',
      ios: 'z{YT>3}/+vL1a&J_uPM|+f=b)`c&Jx'
    };
    const { platform, lang = 'rus' } = opts;

    this._url = `http://api.aebrus.ru/${lang}`;
    console.log(lang);
    this._headers = {
      'x-api-key': apiKeys[platform]
    };
  }

  async getNews(page) {
    try {
      console.log('this._url', this._url); // http://api.aebrus.ru/rus
      const response = await fetch(this._url + '/news/?page=' + page, {
        method: 'GET',
        headers: {
          ...this._headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseJson = await response.json();
      console.log(responseJson);

      return {
        items: responseJson.data,
        pagination: responseJson.info
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getEvents() {
    return [
      {
        title: 'Reliable internet - a regulatory challenge For business',
        uri:
          'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
        date: new Date()
      },
      {
        title: 'Reliable internet - a regulatory challenge For business',
        uri:
          'https://aebrus.ru/upload/iblock/245/whatsapp-image-2019_07_12-at-17.41.49.jpeg',
        date: new Date()
      },
      {
        title: 'Reliable internet - a regulatory challenge For business',
        uri:
          'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg',
        date: new Date()
      }
    ];
  }
  async getPublications() {
    return [
      ({
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'Business Quarterly (Spring 2019)',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'How to invest in Russia',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'Business Quarterly (Spring 2019)',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'How to invest in Russia',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'Business Quarterly (Spring 2019)',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      })
    ];
  }

  async getCommittees() {
    return [
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'Business Quarterly (Spring 2019)',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'How to invest in Russia',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'Business Quarterly (Spring 2019)',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'How to invest in Russia',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      },
      {
        image:
          'https://aebrus.ru/upload/resize_cache/iblock/950/269_386_0/cover.jpg',
        title: 'Business Quarterly (Spring 2019)',
        url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
      }
    ];
  }

  async getReales() {
    return [
      {
        date: '2019-10-01',
        items: [
          {
            title: 'Sales of cars and light commercial vehicles in June 2014',
            commit: 'Automobile Manufacturers Committee',
            date: Date.now(),
            url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
          },
          {
            title: 'Sales of cars and light commercial vehicles in June 2014',
            commit: 'Automobile Manufacturers Committee',
            date: Date.now(),
            url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
          }
        ]
      },
      {
        date: '2019-09-01',
        items: [
          {
            title: 'Sales of cars and light commercial vehicles in June 2014',
            commit: 'Automobile Manufacturers Committee',
            date: Date.now(),
            url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
          }
        ]
      },
      {
        date: '2019-08-01',
        items: [
          {
            title: 'Sales of cars and light commercial vehicles in June 2014',
            commit: 'Automobile Manufacturers Committee',
            date: Date.now(),
            url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
          },
          {
            title: 'Sales of cars and light commercial vehicles in June 2014',
            commit: 'Automobile Manufacturers Committee',
            date: Date.now(),
            url: 'https://aebrus.ru/upload/iblock/fa7/bq_2_2019_web_final.pdf'
          }
        ]
      }
    ];
  }
};
