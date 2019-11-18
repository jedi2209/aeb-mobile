export const API = class AebApi {
  constructor(opts) {
    // :)
    const apiKeys = {
      android: '6g?-1)!m.8`EEko4OguYsuxpZI)$jM',
      ios: 'z{YT>3}/+vL1a&J_uPM|+f=b)`c&Jx'
    };
    const { platform, lang = 'rus' } = opts;

    this._url = `http://api.aebrus.ru/${lang}`;
    this._headers = {
      'x-api-key': apiKeys[platform]
    };
  }

  async getNews(page) {
    try {
      console.log(this._url);
      const response = await fetch(this._url + '/news/list/?page=' + page, {
        method: 'GET',
        headers: {
          ...this._headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseJson = await response.json();

      return {
        items: responseJson.data,
        pagination: responseJson.info
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getEvents() {
    const response = await fetch(this._url + '/news/?page=' + 1, {
      method: 'GET',
      headers: {
        ...this._headers,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return {
      items: [
        {
          created: 1572598800,
          name: 'Reliable internet - a regulatory challenge For business',
          img: {
            preview: [
              'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg'
            ]
          }
        },
        {
          created: 1572598800,
          name: 'Reliable internet - a regulatory challenge For business',
          img: {
            preview: [
              'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg'
            ]
          }
        },
        {
          created: 1572598800,
          name: 'Reliable internet - a regulatory challenge For business',
          img: {
            preview: [
              'https://aebrus.ru/upload/resize_cache/iblock/905/1200_1200_1/mec-meeting.png.jpg'
            ]
          }
        }
      ],
      pagination: {
        pages: {
          next: null
        }
      }
    };
  }
  async getPublications(page) {
    try {
      const response = await fetch(
        this._url + '/publications/list/?page=' + page,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

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

  async getReales(page) {
    try {
      const response = await fetch(this._url + '/press/list/?page=' + page, {
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
};
