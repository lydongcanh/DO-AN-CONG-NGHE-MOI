"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createScore2 = _interopRequireDefault(require("./create-score"));

var _findScoreByScoreboardid = _interopRequireDefault(require("./find-score-by-scoreboardid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScoreAdapter =
/*#__PURE__*/
function () {
  function ScoreAdapter(tablename, region, endpoint) {
    _classCallCheck(this, ScoreAdapter);

    this.createScoreObj = new _createScore2["default"](tablename, region, endpoint);
    this.findScoreByScoreBoardIDObj = new _findScoreByScoreboardid["default"](tablename, region, endpoint);
  }
  /**
   * 
   * @param {Score} score 
   */


  _createClass(ScoreAdapter, [{
    key: "createScore",
    value: function () {
      var _createScore = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(score) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.createScoreObj.execute(score);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createScore(_x) {
        return _createScore.apply(this, arguments);
      }

      return createScore;
    }()
    /**
     * 
     * @param {String} scoreboardid 
     */

  }, {
    key: "findScoreByScoreBoardID",
    value: function () {
      var _findScoreByScoreBoardID = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(scoreboardid) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.findScoreByScoreBoardIDObj.execute(scoreboardid);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findScoreByScoreBoardID(_x2) {
        return _findScoreByScoreBoardID.apply(this, arguments);
      }

      return findScoreByScoreBoardID;
    }()
  }]);

  return ScoreAdapter;
}();

exports["default"] = ScoreAdapter;