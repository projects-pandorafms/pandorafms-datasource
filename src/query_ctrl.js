'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericDatasourceQueryCtrl = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _sdk = require('app/plugins/sdk');

//require('./css/query-editor.css!');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass, enumerable: false, writable: true, configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function formatTarget($label, $agent, $module, $tip){
  return JSON.stringify({"target": $label, "agent": $agent.value, "module": $module.value, "tip": $tip});
}

var GenericDatasourceQueryCtrl = exports.GenericDatasourceQueryCtrl = function (_QueryCtrl) {
  _inherits(GenericDatasourceQueryCtrl, _QueryCtrl);

  function GenericDatasourceQueryCtrl($scope, $injector) {
    _classCallCheck(this, GenericDatasourceQueryCtrl);

    var _this = _possibleConstructorReturn(this, (GenericDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(GenericDatasourceQueryCtrl)).call(this, $scope, $injector));

    _this.scope = $scope;
    
    _this.target.label = _this.target.label || '';
    _this.target.group = _this.target.group || [];
    _this.target.agent = _this.target.agent || [];
    _this.target.module = _this.target.module || [];
    _this.target.tip = _this.target.tip || 0;

    _this.target.target = formatTarget(_this.target.label, _this.target.agent, _this.target.module, _this.target.tip);
    _this.target.type = _this.target.type || 'timeserie';
    return _this;
  }

  _createClass(GenericDatasourceQueryCtrl, [{
    key: 'getGroupOptions',
    value: function getGroupOptions(query) {
      var filter = query || '';
      return this.datasource.metricFindGroupsQuery(filter);
    }
  }, {
    key: 'getAgentOptions',
    value: function getAgentOptions(query) {
      var filter = query || '';
      var group = this.target.group.value;
      return this.datasource.metricFindAgentsQuery(filter, group);
    }
  }, {
    key: 'getModuleOptions',
    value: function getModuleOptions(query) {
      var filter = query || '';
      var agent = this.target.agent.value;
      return this.datasource.metricFindModulesQuery(filter, agent);
    }
  }, {
    key: 'groupChanged',
    value: function groupChanged() {
      this.target.agent = [];
      this.target.module = [];
      this.refresh();
    }
  }, {
    key: 'agentChanged',
    value: function agentChanged() {
      this.target.module = [];
      this.refresh();
    }
  }, {
    key: 'moduleChanged',
    value: function moduleChanged() {
      this.refresh();
    }
  }, {
    key: 'tipChange',
    value: function tipChange() {
      this.refresh();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.target.target = formatTarget(this.target.label, this.target.agent, this.target.module, this.target.tip);
      this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }
  }]);

  return GenericDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

GenericDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';