//based on: http://cacodaemon.de/index.php?id=50
/*
USAGE:
<ul>
  <li ng-repeat="item in items | paginate:10:'xxx'">{{item}}<li>
</ul>
<paginator for-id="'xxx'"></paginator>
*/

(function() {

  'use strict';

  angular.module('angular-simpler-pagination', [])

    //the filter that is used in ng-repeat to filter the data
    .filter('paginate', ['Paginator', function (Paginator) {
      return function (input, rowsPerPage, paginatorId) {

        var paginator = Paginator.getInstance(paginatorId);

        if (!input) {
          return input;
        }

        if (rowsPerPage) {
          paginator.rowsPerPage = rowsPerPage;
        }
        
        paginator.itemCount = input.length;

        var from = parseInt(paginator.page * paginator.rowsPerPage);
        var to = parseInt((paginator.page + 1) * paginator.rowsPerPage + 1) - 1;

        //if the input length changed (data updated) and its shorter then what should be shown in the current page, then go to first page
        if (to - rowsPerPage > input.length) {
          paginator.firstPage();
        }

        return input.slice(from, to);
      };
    }])

    //paginator service - the object
    .factory('Paginator', function () {
      
      var self = this;
      this.instances = {};

      function PaginatorInstance () {
        this.page = 0;
        this.rowsPerPage = 10;
        this.itemCount = 0;
        this.maxPagesToShow = 10;

        //get current page number
        this.getPage = function () {
          return this.page;
        };

        //go to specific page
        this.setPage = function (page) {
          if (page > this.pageCount()) {
            return;
          }
          this.page = page;
        };

        //go to next page
        this.nextPage = function () {
          if (this.isLastPage()) {
            return;
          }
          this.page++;
        };

        //go to prev page
        this.perviousPage = function () {
          if (this.isFirstPage()) {
            return;
          }
          this.page--;
        };

        //go to first page
        this.firstPage = function () {
          this.page = 0;
        };

        //go to last page
        this.lastPage = function () {
          this.page = this.pageCount() - 1;
        };

        //bollean is in the first page
        this.isFirstPage = function () {
          return this.page === 0;
        };

        //bollean is in the last page
        this.isLastPage = function () {
          return this.page === this.pageCount() - 1;
        };

        //how much pages total
        this.pageCount = function () {
          return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
        };

        //first number to show in the pagination directive
        this.firstPageToShow = function () {
          var num = this.page - (this.maxPagesToShow / 2);
          if (num > 0) {
            return num;
          }
          return 0;
        };

        //last number to show in the pagination directive
        this.lastPageToShow = function () {
          var num = this.page + (this.maxPagesToShow / 2);
          if (num < this.pageCount()) {
            return num;
          }
          return this.pageCount();
        };

        //array of numbers to show in the pagination directive
        this.getPagesToShow = function () {
          var pages = [];
          for (var i = this.firstPageToShow(); i < this.lastPageToShow(); i++) {
            pages.push(i);
          }
          return pages;
        };
      }

      return {
        getInstance: function (id) { 
          if (!self.instances[id]) {
            self.instances[id] = new PaginatorInstance();
          }
          return self.instances[id]; 
        }
      };
    })

    //the paginator directive - <paginator for-id="'xxx'"></paginator>
    //will show the links to pages
    .directive('paginator', ['Paginator', function (Paginator) {
      return {
        restrict: 'E',
        scope: {
          forId: '='
        },
        link: function ($scope) {
          $scope.paginator = Paginator.getInstance($scope.forId);
        },
        template: 
        '  <div class="pagination" ng-if="paginator.pageCount() > 1">' +
        '    <ul class="inline-list">' +
        '      <li ng-click="paginator.firstPage()" ng-if="!paginator.isFirstPage() && 0 !== paginator.firstPageToShow()">' +
        '        <a>1</a>' +
        '      </li>' +
        '      <li ng-click="paginator.perviousPage()" ng-style="paginator.isFirstPage() && {\'visibility\': \'hidden\'}">' +
        '        <a>&laquo;</a>' +
        '      </li>' +
        '      <li ng-click="paginator.setPage(i)" ng-repeat="i in paginator.getPagesToShow()" ng-class="{\'active\':paginator.getPage()===i}">' +
        '        <a>{{i+1}}</a>' +
        '      </li>' +
        '      <li ng-click="paginator.nextPage()" ng-style="paginator.isLastPage() && {\'visibility\': \'hidden\'}">' +
        '        <a>&raquo;</a>' +
        '      </li>' +
        '      <li ng-click="paginator.lastPage()" ng-if="!paginator.isLastPage() && paginator.pageCount() !== paginator.lastPageToShow()">' +
        '        <a>{{paginator.pageCount()}}</a>' +
        '      </li>' +
        '    </ul>' +
        '  </div>'
      };
    }]);

})();