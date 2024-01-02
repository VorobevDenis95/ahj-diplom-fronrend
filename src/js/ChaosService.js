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
}