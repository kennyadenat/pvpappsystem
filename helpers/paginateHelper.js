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
  size
}) => {

  page = Number(page);
  size = Number(size);

  if (!page) {
    page = 0;
  }
  if (!size) {
    size = 50;
  }
  const offset = page * size;
  const limit = size;
  return {
    offset,
    limit,
  };
};

module.exports = paginate;