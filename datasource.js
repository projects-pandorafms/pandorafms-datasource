'use strict';

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function formatSearch($type, $search, $extra){
  return JSON.stringify({"type": $type, "search": $search, "extra": $extra});
}

var GenericDatasource = exports.GenericDatasource = function () {
  function GenericDatasource(instanceSettings, $q, backendSrv, templateSrv) {
    _classCallCheck(this, GenericDatasource);

    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': btoa(instanceSettings.jsonData.user + ':' + instanceSettings.jsonData.pass)
    };
  }

  _createClass(GenericDatasource, [{
    key: 'query', //used by panels to get data
    value: function query(options) {

      var query = this.buildQueryParameters(options);
      
      query.targets = query.targets.filter(function (t) {
        return !t.hide;
      });

      if (this.templateSrv.getAdhocFilters) {
        query.adhocFilters = this.templateSrv.getAdhocFilters(this.name);
      } else {
        query.adhocFilters = [];
      }

      return this.doRequest({
        url: this.url + '/query',
        method: 'POST',
        data: query
      }).then(function (result) {
        if (result){
          return result;
        }
        return {};
      });
    }
  }, {
    key: 'testDatasource', //used by data source configuration page to make sure the connection is working
    value: function testDatasource() {
      return this.doRequest({
        url: this.url,
        method: 'GET'
      }).then(function (response) {
        if (response.data){
          if (response.data.code == 200) {
            return { status: "success", message: "Data source is working.", title: "Success" };
          }
        }
        return { status: "error", message: "Data source connection error: " + response.data.message, title: "Error" };
      });
    }
  }, {
    key: 'metricFindGroupsQuery',
    value: function metricFindGroupsQuery(query) {
      var searchData = formatSearch('group', query, '');
      return this.doRequest({
        url: this.url + '/search',
        method: 'POST',
        data: searchData
      }).then(function (result) {
        if (result){
          return result.data;
        }
        return {};
      });
    }
  }, {
    key: 'metricFindAgentsQuery',
    value: function metricFindAgentsQuery(query, group) {
      var searchData = formatSearch('agent', query, group);
      return this.doRequest({
        url: this.url + '/search',
        method: 'POST',
        data: searchData
      }).then(function (result) {
        if (result){
          return result.data;
        }
        return {};
      });
    }
  }, {
    key: 'metricFindModulesQuery',
    value: function metricFindModulesQuery(query, agent) {
      var searchData = formatSearch('module', query, agent);
      return this.doRequest({
        url: this.url + '/search',
        method: 'POST',
        data: searchData
      }).then(function (result) {
        if (result){
          return result.data;
        }
        return {};
      });
    }
  }, {
    key: 'buildQueryParameters',
    value: function buildQueryParameters(options) {
      var _this = this;

      //remove placeholder targets
      options.targets = _.filter(options.targets, function (target) {
        return target.target !== 'select metric';
      });

      var targets = _.map(options.targets, function (target) {
        return {
          target: _this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
          refId: target.refId,
          hide: target.hide,
          type: target.type || 'timeserie'
        };
      });

      options.targets = targets;

      return options;
    }
  }, {
    key: 'doRequest',
    value: function doRequest(options) {
      options.withCredentials = this.withCredentials;
      options.headers = this.headers;

      return this.backendSrv.datasourceRequest(options);
    }
  }]);

  return GenericDatasource;
}();