/**
 *
 * @param {object} items - offset number
 * @param {number} rows - limit number
 * @returns {object} pagination - Return pagination object
 * to query database
 */
const paginationObject = (items, page, pageSize) => {

  const {
    count,
    rows
  } = items;

  const total = Math.floor(Number(count) / Number(pageSize));
  const nextPage = total > 0 ? Number(page) + 1 : Number(page);

  return {
    total: total,
    currentPage: Number(page),
    nextPage: nextPage,
    isNext: page < total && total > 0 ? true : false,
    isPrev: page > 0 && total > 0 ? true : false,
    count: count,
    items: rows
  };
};

module.exports = paginationObject;