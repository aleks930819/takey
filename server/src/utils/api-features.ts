type KVP = { [key: string]: any };

class APIFeatures {
  query: KVP;
  queryString: KVP;
  page: number;
  limit: number;

  constructor(query: KVP, queryString: KVP, page: number = 1, limit: number = 21) {
    this.query = query;
    this.queryString = queryString;
    this.page = page;
    this.limit = limit;
  }

  filter() {
    const queryObj: KVP = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field: string) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ne)\b/g, (match: string) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  pagination() {
    const page = Number(this.queryString.page) || this.page;
    const limit = Number(this.queryString.limit) || this.limit;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
