import { Model, Document } from "mongoose";

interface PaginationParams {
    page?: number;
    limit?: number;
}

interface SearchParams {
    regex?: RegExp
    filter?: string
}

class ProductsAPIFeatures<T extends Document> {
    private model: Model<T>
    private query: any
    private paginationOptions: PaginationParams;
    private searchOptions: SearchParams

    constructor(model: Model<T>, paginationOptions: PaginationParams = {}, searchOptions: SearchParams = {}) {
        this.model = model;
        this.query = this.model;
        this.paginationOptions = paginationOptions;
        this.searchOptions = searchOptions // Set the values using this
    }

    search() {
        const {regex} = this.searchOptions;

        if (regex) {
             this.query = this.model.find({ $or: [{ name: regex }, { description: regex }]});
          }
      
        return this;

    }

    paginate() {
        const {page = 1, limit = 10} = this.paginationOptions;
        const pagesToSkip = (page - 1) * limit;

        this.query = this.query.skip(pagesToSkip).limit(limit);

        return this;

    }
}

export {ProductsAPIFeatures}