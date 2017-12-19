var app = angular.module('app', ['ui.bootstrap', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.resizeColumns', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning', 'ui.grid.exporter']);

app.controller('CardModalCtrl', ['$scope', '$uibModal', function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    $scope.modalInstance.close($scope);
  };
}]);
app.controller('databaseController', function ($scope, $uibModal, $timeout, uiGridConstants, runes, cards, skills, stages) {
  var ctrl = this;
  $scope.clanWars = false;
  $scope.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  $scope.lvl = 10;
  $scope.LevelChange = function () {
    $scope.cardsGrid.columnDefs[11] = { field: 'subGridOptions.data[' + $scope.lvl + '].Hp', displayName: 'Lvl ' + $scope.lvl + ' HP', width: 100, };
    $scope.cardsGrid.columnDefs[12] = { field: 'subGridOptions.data[' + $scope.lvl + '].Attack', displayName: 'Lvl ' + $scope.lvl + ' Atk', width: 100, };
    $scope.cardsGridApi.grid.refresh();
  }
  $scope.skillGrid = {
    data: skills.GetSkillData(),
    enableFiltering: true,
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'LoaSkills.csv',
    exporterPdfDefaultStyle: { fontSize: 9 },
    exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
    exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
    exporterPdfHeader: { text: "LoA Skills", style: 'headerStyle' },
    exporterPdfFooter: function (currentPage, pageCount) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function (docDefinition) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;
    }
  }
  $scope.runesGrid = {
    enableSorting: true,
    enableFiltering: true,
    rowHeight: 80,
    columnDefs: [
      { field: 'Name', cellTooltip: function (row, col) { return row.entity.Name } },
      { field: 'Image', cellTemplate: "<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>", width: 80, enableFiltering: false, enableSorting: false },
      { field: 'Condition', width: 250, cellTooltip: function (row, col) { return 'Conditions required to trigger the Rune' } },
      {
        field: 'TriggerCount', width: 150,
        type: 'number', cellTooltip: function (row, col) { return 'Amount of total times the Rune will trigger in a battle.' }
      },
      { field: 'Skill1', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[0] + '\r\n' + row.entity.Skill1Desc; } },
      { field: 'Skill2', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[1] + '\r\n' + row.entity.Skill2Desc; } },
      { field: 'Skill3', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[2] + '\r\n' + row.entity.Skill3Desc; } },
      { field: 'Skill4', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[3] + '\r\n' + row.entity.Skill4Desc; } },
      { field: 'Skill5', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[4] + '\r\n' + row.entity.Skill5Desc; } },

    ],
    data: runes.GetRuneData(),
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'LoARunes.csv',
    exporterPdfDefaultStyle: { fontSize: 9 },
    exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
    exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
    exporterPdfHeader: { text: "LoA Runes", style: 'headerStyle' },
    exporterPdfFooter: function (currentPage, pageCount) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function (docDefinition) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;
    }
  };

  $scope.cardsGrid = {
    enableSorting: true,
    enableFiltering: true,
    rowHeight: 80,
    columnDefs: [
      {
        field: 'Name',
        cellTooltip: function (row, col) { return row.entity.Name },
        cellTemplate: "<a href='#' ng-click='grid.appScope.CardModal(row)'>{{ row.entity.Name }}</a>",
        width: 200
      },
      { field: 'Image', cellTemplate: "<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>", width: 80, enableFiltering: false, enableSorting: false },
      {
        field: 'card.Color', displayName: 'Stars',
        type: 'number',
        filters: [
          {
            condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
            placeholder: '≤'
          },
          {
            condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
            placeholder: '≥'
          }
        ]
      },
      {
        field: 'Cost', width: 100, cellTooltip: function (row, col) { return row.entity.Cost },
        type: 'number',
        filters: [
          {
            condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
            placeholder: '≤'
          },
          {
            condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
            placeholder: '≥'
          }
        ]
      },
      {
        field: 'EvoCost', displayName: 'EvoCost', width: 100, cellTooltip: function (row, col) { return row.entity.EvoCost },
        type: 'number',
        filters: [
          {
            condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
            placeholder: '≤'
          },
          {
            condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
            placeholder: '≥'
          }
        ]
      },
      {
        field: 'Cooldown', width: 100, cellTooltip: function (row, col) { return row.entity.Cooldown },
        type: 'number',
        filters: [
          {
            condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
            placeholder: '≤'
          },
          {
            condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
            placeholder: '≥'
          }
        ]
      },
      { field: 'Race', width: 100, cellTooltip: function (row, col) { return row.entity.Race } },
      {

        name: 'Skills',
        field: 'SkillString',
        cellTemplate:
          `   <div data-toggle="tooltip" data-placement="right"  ng-show="row.entity.Skill0" title="{{row.entity.Skill0Desc}}">Level 0: {{row.entity.Skill0}}</div>
                                <div data-toggle="tooltip" data-placement="right"  ng-show="row.entity.Skill5" title="{{row.entity.Skill5Desc}}">Level 5: {{row.entity.Skill5}}</div>
                                <div data-toggle="tooltip" data-placement="right"  ng-show="row.entity.Skill10" title="{{row.entity.Skill10Desc}}">Level 10: {{row.entity.Skill10}}</div>
                            `,
        width: 300
      },

      { field: 'Skill0', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[0] + '\r\n' + row.entity.Skill0Desc; } },
      { field: 'Skill5', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[4] + '\r\n' + row.entity.Skill5Desc; } },
      { field: 'Skill10', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[9] + '\r\n' + row.entity.Skill10Desc; } },
      {
        field: 'subGridOptions.data[' + $scope.lvl + '].Hp', displayName: 'Lvl ' + $scope.lvl + ' HP', width: 100,
        type: 'number',
        filters: [
          {
            condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
            placeholder: '≤'
          },
          {
            condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
            placeholder: '≥'
          }
        ]
      },
      {
        field: 'subGridOptions.data[' + $scope.lvl + '].Attack', displayName: 'Lvl ' + $scope.lvl + ' Atk', width: 100,
        type: 'number',
        filters: [
          {
            condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
            placeholder: '≤'
          },
          {
            condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
            placeholder: '≥'
          }
        ]
      },

    ],
    expandableRowTemplate: '<div class="container-fluid"><div ui-grid="row.entity.subGridOptions" style="height:150px;"></div></div>',
    expandableRowHeight: 150,
    //subGridVariable will be available in subGrid scope
    expandableRowScope: {
      subGridVariable: 'subGridScopeVariable'
    },
    data: cards.GetCardData(),
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'LoaSkills.csv',
    exporterPdfDefaultStyle: { fontSize: 9 },
    exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
    exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
    exporterPdfHeader: { text: "LoA Cards", style: 'headerStyle' },
    exporterPdfFooter: function (currentPage, pageCount) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function (docDefinition) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;
    }
  };



  $scope.stagesGrid = {

    enableSorting: true,
    enableFiltering: true,
    rowHeight: 80,
    data: stages.GetStageData(),
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'LoAStages.csv',
    exporterPdfDefaultStyle: { fontSize: 9 },
    exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
    exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
    exporterPdfHeader: { text: "LoA Stages", style: 'headerStyle' },
    exporterPdfFooter: function (currentPage, pageCount) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function (docDefinition) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;
    }
  }


  $scope.cardsGrid.onRegisterApi = function (gridApi) {
    $scope.cardsGridApi = gridApi;
  };


  getCardList = function (datasource) {

    return {
      enableSorting: true,
      enableFiltering: true,
      rowHeight: 80,
      columnDefs: [
        {
          field: 'Name',
          cellTooltip: function (row, col) { return row.entity.Name },
          cellTemplate: "<a href='#' ng-click='grid.appScope.CardModal(row)'>{{ row.entity.Name }}</a>",
          width: 200
        },
        { field: 'Image', cellTemplate: "<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>", width: 80, enableFiltering: false, enableSorting: false },
        {
          field: 'card.Color', displayName: 'Stars',
          type: 'number',
          filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
              placeholder: '≤'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
              placeholder: '≥'
            }
          ]
        },
        {
          field: 'Cost', width: 100, cellTooltip: function (row, col) { return row.entity.Cost },
          type: 'number',
          filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
              placeholder: '≤'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
              placeholder: '≥'
            }
          ]
        },
        {
          field: 'EvoCost', displayName: 'EvoCost', width: 100, cellTooltip: function (row, col) { return row.entity.EvoCost },
          type: 'number',
          filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
              placeholder: '≤'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
              placeholder: '≥'
            }
          ]
        },
        {
          field: 'Cooldown', width: 100, cellTooltip: function (row, col) { return row.entity.Cooldown },
          type: 'number',
          filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
              placeholder: '≤'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
              placeholder: '≥'
            }
          ]
        },
        { field: 'Race', width: 100, cellTooltip: function (row, col) { return row.entity.Race } },
        {

          name: 'Skills',
          field: 'SkillString',
          cellTemplate:
            `   <div data-toggle="tooltip" data-placement="right"  ng-show="row.entity.Skill0" title="{{row.entity.Skill0Desc}}">Level 0: {{row.entity.Skill0}}</div>
                                <div data-toggle="tooltip" data-placement="right"  ng-show="row.entity.Skill5" title="{{row.entity.Skill5Desc}}">Level 5: {{row.entity.Skill5}}</div>
                                <div data-toggle="tooltip" data-placement="right"  ng-show="row.entity.Skill10" title="{{row.entity.Skill10Desc}}">Level 10: {{row.entity.Skill10}}</div>
                            `,
          width: 300
        },
        { field: 'Level', type: 'number', },
        { field: 'Skill0', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[0] + '\r\n' + row.entity.Skill0Desc; } },
        { field: 'Skill5', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[4] + '\r\n' + row.entity.Skill5Desc; } },
        { field: 'Skill10', cellTooltip: function (row, col) { return 'Exp Needed: ' + row.entity.ExpArray[9] + '\r\n' + row.entity.Skill10Desc; } },
        {
          field: 'HP', displayName: 'HP', width: 100,
          type: 'number',
          filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
              placeholder: '≤'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
              placeholder: '≥'
            }
          ]
        },
        {
          field: 'Attack',
          displayName: 'Atk', width: 100,
          type: 'number',
          filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL,
              placeholder: '≤'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL,
              placeholder: '≥'
            }
          ]
        },

      ],
      expandableRowTemplate: '<div class="container-fluid"><div ui-grid="row.entity.subGridOptions" style="height:150px;"></div></div>',
      expandableRowHeight: 150,
      //subGridVariable will be available in subGrid scope
      expandableRowScope: {
        subGridVariable: 'subGridScopeVariable'
      },
      data: datasource,
      enableGridMenu: true,
      enableSelectAll: true,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    }
  };


  $scope.UserCardList = [];
  $scope.userCardsGrid = getCardList('UserCardList','UserCards');

  findCards = function (userCard) {
    var cardsData = cards.GetCardData();
    var cardData = cardsData.find(o => o.Id == userCard.CardId);
    cardData.Level = parseInt(userCard.Level);
    cardData.Attack = parseInt(cardData.subGridOptions.data[cardData.Level].Attack);
    cardData.HP = parseInt(cardData.subGridOptions.data[cardData.Level].Hp);
    return cardData;
  }

  $scope.ParseCards = function (data) {
    $scope.UserCardList = [];
    var cardsList = angular.fromJson(data);
    cardsList.data.Cards.forEach(function (userCard) {
      $scope.UserCardList.push(findCards(userCard));
    });
    $scope.userCardsGrid.exporterCsvFilename = 'UserCards_' + (new Date(), 'yyyy-MM-dd') + '.csv';
    $scope.userCardsGridApi.grid.refresh();
  }
  $scope.userCardsGrid.onRegisterApi = function (gridApi) {
    $scope.userCardsGridApi = gridApi;
  };
  $scope.keypress = function ($event) {
    if ($event.altKey && $event.keyCode === 77) {
      $timeout(function () {
        $scope.clanWars = true;
      });
    }
  }
  $scope.attackerName = "";
  $scope.defenderName = "";
  $scope.AttackerCardList = [];
  $scope.DefenderCardList = [];
  $scope.attackerCardGrid = getCardList('AttackerCardList',$scope.attackerName);
  $scope.defenderCardGrid = getCardList('DefenderCardList',$scope.defenderName);
  $scope.ParseClanWar = function (data) {
    var cardsList = angular.fromJson(data);
    $scope.attackerName = cardsList.data.AttackPlayer.NickName;
    $scope.defenderName = cardsList.data.DefendPlayer.NickName;
    $scope.AttackerCardList = [];
    cardsList.data.AttackPlayer.Cards.forEach(function (userCard) {
      $scope.AttackerCardList.push(findCards(userCard));
    });
    $scope.DefenderCardList = [];
    cardsList.data.DefendPlayer.Cards.forEach(function (userCard) {
      $scope.DefenderCardList.push(findCards(userCard));
    });
    var d = new Date();
    var monthNames = ["Jan", "Febr", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var datestring = d.getDate()  + "-" + (monthNames[d.getMonth()]) + "-" + d.getFullYear();
    $scope.attackerCardGrid.exporterCsvFilename = $scope.attackerName + datestring + '.csv';
    $scope.defenderCardGrid.exporterCsvFilename = $scope.defenderName + datestring + '.csv';
  };

  $scope.CardModal = function (card) {
    $scope.activeCard = card.entity;
    $scope.modalInstance = $uibModal.open({
      template: `
          <div ng-controller="CardModalCtrl"  ng-keydown="keypress()">
          <div class="modal-header">
              <h3>{{activeCard.Name}}</h3>
          </div>
          <div class="modal-body">
              <div class="well">
                  <div class="panel panel-default">
                      <div class="panel-heading">Skills</div>
                      <div class="panel-body">
                          <div ng-show="activeCard.Skill0">0:  {{activeCard.Skill0}} - {{activeCard.Skill0Desc}}</div>
                          <div ng-show="activeCard.Skill5">5:  {{activeCard.Skill5}} - {{activeCard.Skill5Desc}}</div>
                          <div ng-show="activeCard.Skill10">10: {{activeCard.Skill10}} - {{activeCard.Skill10Desc}}</div>
                      </div>
                  </div>
                  <div class="panel panel-default">
                      <div class="panel-body">
                          <div class="container-fluid">
                              <div class="row">
                                  <div class="col-md-4">
                                      <div ng-show="activeCard.Cost">Cost: {{activeCard.Cost}}</div>
      
                                  </div>
                                  <div class="col-md-4">
                                      <div ng-show="activeCard.EvoCost">EvoCost: {{activeCard.EvoCost}}</div>
                                  </div>
                                  
                                  <div class="col-md-4">
                                  <div ng-show="activeCard.Cooldown">Cooldown: {{activeCard.Cooldown}}</div>
                              </div>
                              </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-primary" ng-click="ok()">OK</button>
          </div>
      </div>`,
      controller: 'CardModalCtrl',
      scope: $scope,
      size: 'lg'
    });
  }
});
