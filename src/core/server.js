export const API = class AebApi {
  constructor(opts) {
    // :)
    const apiKeys = {
      android: '6g?-1)!m.8`EEko4OguYsuxpZI)$jM',
      ios: 'z{YT>3}/+vL1a&J_uPM|+f=b)`c&Jx'
    };
    const {platform, lang = 'rus'} = opts;

    this._url = `https://api.aebrus.ru/${lang}`;
    this._headers = {
      'x-api-key': apiKeys[platform]
    };
  }

  async login({email, password}) {
    try {
      const response = await fetch(this._url + '/user/auth/', {
        method: 'POST',
        body: JSON.stringify({login: email, pass: password}),
        headers: {
          ...this._headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseJson = await response.json();
      // TODO: Доббавить проверку на наличие даннных
      console.log('>>>>>>>>> responseJson login', responseJson.data);

      // if (responseJson.data.length === 0) {
      //   throw new Error('Не правильный пароль или логин');
      // }

      return {
        name: responseJson.data.NAME,
        id: responseJson.data.ID,
        email: responseJson.data.EMAIL,
        login: responseJson.data.LOGIN,
        phone: responseJson.data.PERSONAL_MOBILE,
        second_name: responseJson.data.SECOND_NAME,
        last_name: responseJson.data.LAST_NAME
      };
    } catch (err) {
      console.log('>>>>>>>> login', err);
    }
  }

  async profile(data, id) {
    try {
      const response = await fetch(this._url + `/user/edit/${id}/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          ...this._headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseJson = await response.json();

      console.log('>>>>>>>>> responseJson profile', responseJson.data);

      return {
        name: responseJson.data.NAME,
        email: responseJson.data.EMAIL,
        login: responseJson.data.LOGIN,
        phone: responseJson.data.PERSONAL_MOBILE,
        second_name: responseJson.data.SECOND_NAME,
        last_name: responseJson.data.LAST_NAME,
        id
      };
    } catch (err) {
      console.log('>>>>>>>> profile', err);
    }
  }

  async getNews(page, paramsForFetch = {}) {
    try {
      const params = Object.keys(paramsForFetch).reduce((acc, param) => {
        return acc + `&${param}=${paramsForFetch[param]}`;
      }, '');

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

  async getNewsItem(itemID) {
    try {
      const response = await fetch(`${this._url}/news/item/${itemID}/`, {
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

  async getCommittees(page, {type}) {
    try {
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

      return {
        items: responseJson.data,
        pagination: responseJson.info
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCommitteeItem(id) {
    try {
      const response = await fetch(this._url + '/committees/item/' + id + '/', {
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

  async getReleases(page, paramsForFetch = {}) {
    try {
      const params = Object.keys(paramsForFetch).reduce((acc, param) => {
        if (paramsForFetch[param] === null) {
          return acc;
        }
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
        console.log('err in getReleases >>>', err);
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

  async getContacts() {
    try {
      const response = await fetch(`${this._url}/contacts/list/`, {
        method: 'GET',
        headers: {
          ...this._headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseJson = await response.json();

      return {
        items: responseJson.data
      };
    } catch (error) {
      console.log(error);
    }
  }
};
