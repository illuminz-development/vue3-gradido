import api from './api';

class CategoryService {
  list(params = {}) {
    return api.get('/category/list', {params: {type: 'tags', allLanguage: 1, ...params}});
  }

  manageStatus(data) {
    return api.patch(`/category-tags/status`, data);
  }

  edit(id, data) {
    return api.patch(`/category-tags/${id}`, data);
  }

  fetchById(id) {
    return api.get(`/category/${id}`);
  }

}

export default new CategoryService();