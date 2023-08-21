import api from './api';

class CategoryService {
  list(params = {}) {
    return api.get('/category/list', {params: {type: 'community', ...params}});
  }
}

export default new CategoryService();