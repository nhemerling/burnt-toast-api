'use strict';

const CategoriesService = {
  getAllCategories(db) {
    return db.select('*').from('category').orderBy('id');
  },
};

module.exports = CategoriesService;
