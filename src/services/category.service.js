import api from './api';

class CategoryService {
  list(params = {}) {
    return api.get('/categories', params);
  }
}

export default new CategoryService();