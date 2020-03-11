"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _auth = require("./helper/auth");

var _auth2 = _interopRequireDefault(_auth);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressValidator = require("express-validator");

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();


// @route GET api/auth
// @desc
// @access Public
router.get("/", _auth2.default, function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var user;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _User2.default.findById(req.user).select("-password");

					case 3:
						user = _context.sent;

						res.json(user);
						_context.next = 11;
						break;

					case 7:
						_context.prev = 7;
						_context.t0 = _context["catch"](0);

						console.error(_context.t0.message);
						res.send(500).json({ msg: "server error" });

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

// @route POST api/auth
// @desc login user
// @access Public

router.post("/", [(0, _expressValidator.check)("email", "Please include a valid email").isEmail(), (0, _expressValidator.check)("password", "password is required").exists()], function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var errors, _req$body, email, password, user, isMatch, payload;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						errors = (0, _expressValidator.validationResult)(req);

						if (errors.isEmpty()) {
							_context2.next = 4;
							break;
						}

						console.log(req);
						return _context2.abrupt("return", res.status(400).json({ errors: errors.array() }));

					case 4:
						_req$body = req.body, email = _req$body.email, password = _req$body.password;
						_context2.prev = 5;
						_context2.next = 8;
						return _User2.default.findOne({ email: email });

					case 8:
						user = _context2.sent;

						if (user) {
							_context2.next = 11;
							break;
						}

						return _context2.abrupt("return", res.status(400).json({ errors: [{ msg: "invalid credentials" }] }));

					case 11:
						_context2.next = 13;
						return _bcryptjs2.default.compare(password, user.password);

					case 13:
						isMatch = _context2.sent;

						if (isMatch) {
							_context2.next = 16;
							break;
						}

						return _context2.abrupt("return", res.status(400).json({ errors: [{ msg: "invalid credentials" }] }));

					case 16:
						payload = {
							user: user.id
						};


						_jsonwebtoken2.default.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, function (err, token) {
							if (err) throw err;
							res.json({ token: token });
						});
						_context2.next = 24;
						break;

					case 20:
						_context2.prev = 20;
						_context2.t0 = _context2["catch"](5);

						console.error(_context2.t0.message);
						res.status(500).send("server error");

					case 24:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this, [[5, 20]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=auth.js.map