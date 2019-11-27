export const API = class AebApi {
  constructor(opts) {
    // :)
    const apiKeys = {
      android: '6g?-1)!m.8`EEko4OguYsuxpZI)$jM',
      ios: 'z{YT>3}/+vL1a&J_uPM|+f=b)`c&Jx'
    };
    const { platform, lang = 'rus' } = opts;

    this._url = `https://api.aebrus.ru/${lang}`;
    this._headers = {
      'x-api-key': apiKeys[platform]
    };
  }

  async getNews(page, paramsForFetch = {}) {
    try {
      const params = Object.keys(paramsForFetch).reduce((acc, param) => {
        return acc + `&${param}=${paramsForFetch[param]}`;
      }, '');

      console.log('params', params);
      console.log(`${this._url}/news/list/?page=${page}${params}`);

      const response = await fetch(
        `${this._url}/news/list/?page=${page}${params}`,
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

      return {
        items: responseJson.data,
        pagination: responseJson.info
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getEvents(page, paramsForFetch = {}) {
    try {
      const params = Object.keys(paramsForFetch).reduce((acc, param) => {
        return acc + `&${param}=${paramsForFetch[param]}`;
      }, '');

      console.log('params', params);
      console.log(`${this._url}/events/list/?page=${page}${params}`);

      const response = await fetch(
        `${this._url}/events/list/?page=${page}${params}`,
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

  async getPublications(page, paramsForFetch = {}) {
    try {
      const params = Object.keys(paramsForFetch).reduce((acc, param) => {
        return acc + `&${param}=${paramsForFetch[param]}`;
      }, '');

      console.log('params', params);
      console.log(`${this._url}/publications/list/?page=${page}${params}`);

      const response = await fetch(
        `${this._url}/publications/list/?page=${page}${params}`,
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

  async getCommittees(page, { type }) {
    try {
      console.log(this._url + '/committees/list/' + type + '/?page=' + page);
      const response = await fetch(
        this._url + '/committees/list/' + type + '/?page=' + page,
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

  async getReales(page, paramsForFetch = {}) {
    try {
      const params = Object.keys(paramsForFetch).reduce((acc, param) => {
        return acc + `&${param}=${paramsForFetch[param]}`;
      }, '');

      console.log('params', params);
      console.log(`${this._url}/press/list/?page=${page}${params}`);

      const response = await fetch(
        `${this._url}/press/list/?page=${page}${params}`,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).catch(err => {
        console.log('err in getReales >>>', err);
      });

      let responseJson = await response.json();

      // TODO: чертовщина какая-то
      if (!responseJson) {
        responseJson = {};
      }

      return {
        items: responseJson.data,
        pagination: responseJson.info,
        filters: responseJson.filters
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllEventsByMonth(month) {
    try {
      const response = await fetch(
        this._url + `/events/calendar/?month=${month}`,
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
};
