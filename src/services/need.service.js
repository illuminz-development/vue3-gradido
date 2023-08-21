import api from './api';

class NeedService {
  list(params = {}) {
    return api.get('/needs/list', {params});
  }
}

export default new NeedService();