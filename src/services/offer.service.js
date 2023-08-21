import api from './api';

class OfferService {
  list(params = {}) {
    return api.get('/offers/list', {params});
  }
}

export default new OfferService();