import { makeAutoObservable } from "mobx";
import FacadeService from "../UserService/FacadeService";
import OrderService from "../UserService/OrderService";
import facades from "../components/facade/Facades";

export default class FacadeStore {
    constructor() {
        this._facdeList = [];
        this._facadeItem = {};
        this._filters = {
            batch: '',
            thickness: '',
            patina: '',
            priceRange: [0, 99999]
        };
        this._sorting = {
            byPrice: null,
            byName: null,
        };
        this._currentPage = 1;
        this._itemsPerPage = 12;
        this._searchQuery = '';
        makeAutoObservable(this);
    }

    setCurrentPage(page) {
        this._currentPage = page;
    }

    setSearchQuery(query) {
        this._searchQuery = query.toLowerCase();
    }

    get searchQuery() {
        return this._searchQuery;
    }

    get currentPage() {
        return this._currentPage;
    }

    get itemsPerPage() {
        return this._itemsPerPage;
    }

    get facades() {
        return this._facdeList
    }


    setFacadeList(facadeList) {
        this._facdeList = facadeList;
    }

    setFacade(facade) {
        this._facadeItem = facade;
    }

    setFilters(key, val) {
        this._filters[key] = val;
        this._currentPage = 1;
    }

    setSorting(key, val) {
        this._sorting[key] = val;
        this._currentPage = 1;
    }


    async getAll() {
        const response = await FacadeService.getAll();
        this.setFacadeList(response.data);
        return response.data;
    }

    async getById(FacadeID) {
        const response = await FacadeService.getOne(FacadeID);
        this.setFacade(response.data);
        return true;
    }

    async create(formData) {
        const response = await FacadeService.create(formData);
        this.setFacade(response.data)
    }

    searchFacades() {
        return this._facdeList.filter(facade => this._searchQuery
                ? facade.FacadeName.toLowerCase().includes(this._searchQuery)
                : true).sort((a, b) => a.FacadeID - b.FacadeID)
    }

    filterFacades() {
        let filtered = this._facdeList.filter(facade => {
            const { batch, thickness, priceRange, patina } = this._filters;

            const matchesBatch = batch ? facade.Batch === batch : true;
            const matchesThickness = thickness ? facade.Material.split(',').includes(thickness) : true;
            const matchesPatina = patina ? patina === 'Да' ? facade.Patina.split(' ').includes('лак') : !facade.Patina.split(' ').includes('лак') : true;
            const matchesMinPrice = facade.Price >= +priceRange[0]
            const matchesMaxPrice = facade.Price <= +priceRange[1]
            const matchesSearch = this._searchQuery
                ? facade.FacadeName.toLowerCase().includes(this._searchQuery)
                : true;

            return (
                matchesBatch &&
                matchesThickness &&
                matchesPatina &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesSearch
            );
        });

        if (this._sorting.byPrice) {
            filtered.sort((a, b) => {
                return this._sorting.byPrice === 'asc' ? a.Price - b.Price : b.Price - a.Price;
            });
        }

        if (this._sorting.byName) {
            filtered.sort((a, b) => {
                return this._sorting.byName === 'asc'
                    ? a.FacadeName.localeCompare(b.FacadeName)
                    : b.FacadeName.localeCompare(a.FacadeName);
            });
        }

        const startIndex = (this._currentPage - 1) * this._itemsPerPage;
        const endIndex = startIndex + this._itemsPerPage;

        return filtered.slice(startIndex, endIndex);
    }

    getFilteredFacadesCount() {
        return this._facdeList.filter(facade => {
            const { batch, thickness, priceRange} = this._filters;

            const matchesBatch = batch ? facade.Batch === batch : true;
            const matchesThickness = thickness ? facade.Material.split(',').includes(thickness) : true;
            const matchesMinPrice = facade.Price >= +priceRange[0];
            const matchesMaxPrice = facade.Price <= +priceRange[1];
            const matchesSearch = this._searchQuery
                ? facade.FacadeName.toLowerCase().includes(this._searchQuery)
                : true;

            return (
                matchesBatch &&
                matchesThickness &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesSearch
            );
        }).length;
    }


    async updateFacade(facadeId, FacadeName, Material, Backside, Batch, Cover, Patina, SpaceForGlass, Direction, Guarantee, Price, Description){
        try {
            const {data} = await FacadeService.updateFacade(facadeId, FacadeName, Material, Backside, Batch, Cover, Patina, SpaceForGlass, Direction, Guarantee, Price, Description)
            this.setFacade(data)
            return true
        } catch (e) {
            return e
        }
    }

    async delFacade(facadeId){
        try {
            const {data} = await FacadeService.deleteFacade(facadeId)
            this.setFacade({})
            return true
        } catch (e) {
            return e
        }
    }

}



