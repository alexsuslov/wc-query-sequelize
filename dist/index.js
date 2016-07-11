"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = exports.vents = undefined;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vents = exports.vents = {
  "!": function _(name, value) {
    return { name: name, value: { $ne: value } };
  },
  ">": function _(name, value) {
    return { name: name, value: { $gt: value } };
  },
  "<": function _(name, value) {
    return { name: name, value: { $lt: value } };
  },
  "]": function _(name, value) {
    return { name: name, value: { $gte: value } };
  },
  "[": function _(name, value) {
    return { name: name, value: { $lte: value } };
  },

  "@": function _(name, value) {
    return { name: name, value: { $in: value.split('|') } };
  },
  "#": function _(name, value) {
    return { name: name, value: { $nin: value.split('|') } };
  },
  "~": function _(name, value) {
    return {
      name: name,
      value: _sequelize2.default.where(_sequelize2.default.fn('lower', _sequelize2.default.col(name)), { $like: "%" + value.toLowerCase() + "%" })
    };
  }
}; /**
    * Convert http req to sequelize find object
    */


var Query = exports.Query = function Query(query) {
  var limit = query.limit;
  var skip = query.skip;
  var order = query.order;

  var resp = {};
  // limit
  if (limit) {
    resp['limit'] = limit;
    delete query.limit;
  }
  // skip
  if (skip) {
    resp['offset'] = skip;
    delete query.skip;
  }
  // order
  if (order) {
    if (order[0] === '-') resp['order'] = [[order.slice(1), 'DESC']];else resp['order'] = [[order, 'ASC']];
    delete query.order;
  }

  // EQ
  Object.keys(query).forEach(function (name) {
    var vent = vents[query[name][0]];
    if (vent) {
      var r = vent(name, query[name].slice(1));
      resp[r.name] = r.value;
    } else {
      resp[name] = query[name];
    }
  });
  return resp;
};

exports.default = Query;