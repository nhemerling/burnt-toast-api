'use strict';

const CategoriesService = {
  getAllCategories(db){
    return db
      .select('*')
      .from('category');
  }
};

module.exports = CategoriesService;