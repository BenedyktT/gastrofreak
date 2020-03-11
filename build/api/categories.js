"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

//public
//get list of all categories

router.get("/", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios2.default.get("https://www.themealdb.com/api/json/v1/1/categories.php");

          case 3:
            response = _context.sent;
            return _context.abrupt("return", res.json(response.data));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            console.error(_context.t0);
            res.status(500).json("Internal server error");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//publick
//search for categories by name

router.get("/:category", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios2.default.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + req.params.category);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", res.json(response.data));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.error(_context2.t0);
            res.status(500).json("Internal Server error");

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=categories.js.map