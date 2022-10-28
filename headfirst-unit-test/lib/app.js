"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cube = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Cube = /*#__PURE__*/function () {
  function Cube(length) {
    _classCallCheck(this, Cube);
    this.length = length;
  }
  _createClass(Cube, [{
    key: "getSideLength",
    value: function getSideLength() {
      return this.length;
    }
  }, {
    key: "getSurfaceArea",
    value: function getSurfaceArea() {
      return this.length * this.length * 6;
    }
  }, {
    key: "getVolume",
    value: function getVolume() {
      return Math.pow(this.length, 3);
    }
  }]);
  return Cube;
}();
exports.Cube = Cube;