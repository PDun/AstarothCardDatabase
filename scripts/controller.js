var app = angular.module('app', ['ui.grid','ui.grid.autoResize','ui.grid.resizeColumns', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning']);

app.controller('databaseController',  function ($scope, runes,cards,skills) { 
    var ctrl = this;
    $scope.runesGrid = {
        enableSorting: true,
        enableFiltering: true,
        rowHeight:80,
        columnDefs: [
          { field: 'Name' },
          { field: 'Image', cellTemplate:"<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>", width:80,enableFiltering: false, enableSorting: false},
          { field: 'Condition', width: 250 },
          { field: 'TriggerCount', width: 150  },
          { field: 'Skill1',  cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[0] + '\r\n' + row.entity.Skill1Desc; }},
          { field: 'Skill2',  cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[1] + '\r\n' +row.entity.Skill2Desc; }},
          { field: 'Skill3'  , cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[2] + '\r\n' +row.entity.Skill3Desc; }},
          { field: 'Skill4'  , cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[3] + '\r\n' +row.entity.Skill4Desc; }},
          { field: 'Skill5'  , cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[4] + '\r\n' +row.entity.Skill5Desc; }},
          
        ],
        data:runes.GetRuneData()
      };
      
    $scope.cardsGrid = {
        enableSorting: true,
        enableFiltering: true,
        rowHeight:80,
        columnDefs: [
            {field: 'Id'},
          { field: 'Name' },
          { field: 'Image', cellTemplate:"<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>", width:80, enableFiltering: false, enableSorting: false},
          { field: 'Cost', width: 100  },
          { field: 'Cooldown', width: 100  },
          { field: 'Race', width: 100   },
          { field: 'Skill0',  cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[0] + '\r\n' + row.entity.Skill0Desc; }},
          { field: 'Skill5',  cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[4] + '\r\n' +row.entity.Skill5Desc; }},
          { field: 'Skill10'  , cellTooltip : function(row,col) { return 'Exp Needed: ' + row.entity.ExpArray[9] + '\r\n' +row.entity.Skill10Desc; }},
          
        ],
        expandableRowTemplate: '<div class="container"><div ui-grid="row.entity.subGridOptions" style="height:150px;"></div></div>',
        expandableRowHeight: 150,
        //subGridVariable will be available in subGrid scope
        expandableRowScope: {
          subGridVariable: 'subGridScopeVariable'
        },
        data:cards.GetCardData()
      };

      ctrl.skillsData = skills.GetSkillData();
});