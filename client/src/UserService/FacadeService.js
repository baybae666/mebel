import {$authHost, $host} from "../http/http";

const FacadeService = {
    async create(formData) {
        return new Promise((resolve) => resolve($host.post('api/facade/create', formData)))
    },

    async getAll() {
        return new Promise((resolve) => resolve($host.get('/api/facade/getAll')))
    },

    async getOne(FacadeID) {
        return new Promise((resolve) => resolve($host.get('/api/facade/' + FacadeID)))
    },

    async updateFacade(facadeId, FacadeName, Material, Backside, Batch, Cover, Patina, SpaceForGlass, Direction, Guarantee, Price, Description) {
        return await $authHost.post('/api/facade/update', {facadeId, FacadeName, Material,
            Backside, Batch, Cover, Patina, SpaceForGlass, Direction, Guarantee, Price, Description})
    },

    async deleteFacade(facadeId) {
        return await $authHost.post('/api/facade/delete', {facadeId})
    },

}

export default FacadeService;