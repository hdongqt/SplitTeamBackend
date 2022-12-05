const _ = require("lodash");

exports.calculateMatch = (list) => {
  return _.map(list, (item) => {
    const amountMatch = item.teams.length || 0;
    const amountMatchFinish = _.filter(_.get(item, "teams"), (column) => {
      return column.result !== "PENDING";
    }).length;
    const amountWin = _.filter(_.get(item, "teams"), (column) => {
      return column.result === "WIN";
    }).length;
    const amountLose = amountMatchFinish - amountWin;
    // add properties to response
    item.amountMatch = amountMatch;
    item.amountMatchFinish = amountMatchFinish;
    item.amountWin = amountWin;
    item.amountLose = amountLose;
    if (amountMatchFinish > 0) {
      const winRateNow = (amountWin / amountMatchFinish) * 100;
      if (item.winRateDefault != null && amountMatchFinish <= 10) {
        const winRateAverage = (winRateNow + +item.winRateDefault) / 2;
        item.winRate = _.round(winRateAverage, 2);
      } else {
        item.winRate = _.round(winRateNow, 2);
      }
    } else {
      item.winRate = _.round(item.winRateDefault, 2);
    }
    return item;
  });
};

exports.handleConvertPagination = (page, limit) => {
  let size = Number.parseInt(limit);
  let pageCurrent = Number.parseInt(page);
  if (!pageCurrent || pageCurrent < 0) pageCurrent = 0;
  if (!limit) size = 10;
  return {
    size,
    pageCurrent,
  };
};

exports.handleGeneratePagination = (totalItem, size, pageCurrent) => {
  return {
    totalItems: totalItem,
    totalPages: Math.ceil(totalItem / size),
    limit: size,
    currentPage: pageCurrent,
  };
};
