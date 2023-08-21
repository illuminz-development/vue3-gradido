import api from './api';

class CommunityService {
  list(params = {}) {
    return api.get('/community/list', {params});
  }

  add(data) {
    return api.post('/community', data);
  }

  edit(id, data) {
    return api.patch(`/community/${id}`, data);
  }

  fetchById(id) {
    return api.get(`/community/${id}`);
  }

  remove(id) {
    return api.delete(`/community/${id}`);
  }
}

export default new CommunityService();