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

  async getNews() {
    try {
      const response = await fetch(this._url + '/news/', {
        method: 'GET',
        headers: {
          ...this._headers,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      console.log(error);
    }
  }
};
