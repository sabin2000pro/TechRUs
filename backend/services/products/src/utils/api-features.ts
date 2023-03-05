
interface SearchParams {
    keyword?: any;
    filter?: any
}

interface PaginationParams {
    page?: number
    limit?: number
}
class ProductsAPIFeatures {

    public query: any;
    public queryString: SearchParams;
    public paginationParams: PaginationParams

   constructor(query: any, queryString: SearchParams, paginationParams: PaginationParams = {}) {
     this.query = query;
     this.queryString = queryString;
     this.paginationParams = paginationParams;
   }

    search() {
        const keyword = this.queryString.keyword ? {name: {$regex: this.queryString.keyword, $options: "i"}} : {}

        this.query = this.query.find({...keyword}); // Find the search result by the keywrod
        return this;

    }

    paginate(productsPerPage) {
        // By default we are on page 1 and limit 4 products per page
        const {page = 1, limit = productsPerPage} = this.paginationParams;

        if(page && limit) {
            const pagesToSkip = (page - 1) * limit

            this.query = this.query.skip(pagesToSkip).limit(limit);
            const totalProducts = this.query.model.countDocuments({});

            return this;
        }
    }

    filter() {

        const queryCopy = { ...this.queryString }; // 1. Create a copy of the query string

        // Removing fields from the query
        const queryFieldsToRemove = ['keyword', 'limit', 'page']
        queryFieldsToRemove.forEach(param => delete queryCopy[param]);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }
}

export {ProductsAPIFeatures}