import {$host} from "../http/http";

const FacadeService = {
    async create(formData) {
        return new Promise((resolve) => resolve($host.post('api/facade/create', formData)))
    },

    async getAll() {
        return new Promise((resolve) => resolve($host.get('/api/facade/getAll')))
    },

    async getOne(FacadeID) {
        return new Promise((resolve) => resolve($host.get('/api/facade/' + FacadeID)))
    }
}

export default FacadeService;