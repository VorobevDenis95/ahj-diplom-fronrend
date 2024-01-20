/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { API_URL, URLES } from './const';

export default class ChaosService {
  async list() {
    try {
      const request = await fetch(`${API_URL}${URLES.all}`);
      const data = await request.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async listLength() {
    try {
      const request = await fetch(`${API_URL}${URLES.length}`);
      const data = await request.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(data) {
    try {
      const response = await fetch(`${API_URL}${URLES.create}`, {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        const jsonResponce = await response.json();
        return jsonResponce;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async lazyList(data) {
    try {
      const response = await fetch(`${API_URL}${URLES.all}`, {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        const jsonResponce = await response.json();
        return jsonResponce;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fileToBlob(src) {
    try {
      const request = await fetch(src, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const blob = await request.blob();
      return blob;
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchMessage(message) {
    try {
      const request = await fetch(`${API_URL}${URLES.search}`, {
        method: 'POST',
        body: message.toLowerCase(),
      });
      if (request.ok) {
        const jsonResponce = await request.json();
        return jsonResponce;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchPin() {
    try {
      const request = await fetch(`${API_URL}${URLES.searchPin}`);
      if (request.ok) {
        const data = await request.json();
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async changePin(id) {
    try {
      const request = await fetch(`${API_URL}${URLES.changePin}`, {
        method: 'POST',
        body: id,
      });
      if (request.ok) {
        return request.ok;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFavorite() {
    try {
      const request = await fetch(`${API_URL}${URLES.favorites}`);
      if (request.ok) {
        const data = await request.json();
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
