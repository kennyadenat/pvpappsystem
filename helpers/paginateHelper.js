/**
 *
 * @param {number} offset - offset number
 * @param {number} limit - limit number
 * @param {object} ratings
 * @returns {object} pagination - with the limit and offset fields
 * to query database
 */


const paginate = ({
  page,
  pageSize
}) => {

  if (!page) {
    page = 0;
  }
  if (!pageSize) {
    pageSize = 50;
  }
  const offset = page * pageSize;
  const limit = pageSize;
  return {
    offset,
    limit,
  };
};

module.exports = paginate;