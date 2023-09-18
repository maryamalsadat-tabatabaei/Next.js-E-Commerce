class APIFilters {
  query: any;
  //   readonly queryStr: {
  //     [key: string]: any;
  //   };
  queryStr: Record<string, string>;
  constructor(query: any, queryStr: Record<string, string>) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(fields: string[]) {
    const { keyword } = this.queryStr;
    if (keyword) {
      const keywordFilter = {
        $or: fields.map((field) => ({
          [field]: {
            $regex: keyword,
            $options: "i",
          },
        })),
      };
      this.query.find(keywordFilter);
    }
    return this;
  }

  pagination(numPerPage: number, currentPage: number) {
    const skipNumber = numPerPage * (currentPage - 1);

    this.query.limit(numPerPage).skip(skipNumber);
    return this;
  }
  filter() {
    const { keyword, page, minPrice, maxPrice, ratings, ...restParams } = this
      .queryStr as Record<string, string | number>;

    const filterObject: Record<string, any> = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      filterObject.price = {};

      if (maxPrice !== undefined) {
        filterObject.price.$lte = Number(maxPrice);
      }
      if (minPrice !== undefined) {
        filterObject.price.$gte = Number(minPrice);
      }
    }

    if (ratings !== undefined) {
      filterObject.ratings = { $gte: Number(ratings) };
    }

    for (const key in restParams) {
      if (Object.prototype.hasOwnProperty.call(restParams, key)) {
        filterObject[key] = restParams[key];
      }
    }

    this.query.find(filterObject);

    return this;
  }

  async execute() {
    return await this.query.exec();
  }
}

export default APIFilters;
