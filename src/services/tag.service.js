import api from './api';

class TagService {
  list(params = {}) {
    return api.get('/tags/list', {params});
  }
}

export default new TagService();