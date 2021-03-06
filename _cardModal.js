<div ng-controller="CardModalCtrl">
    <div class="modal-header">
        <h3>{{ activeCard.name }}</h3>
    </div>
    <div class="modal-body">
        <div class="well">
            <div class="panel panel-default">
                <div class="panel-heading">Skills</div>
                <div class="panel-body">
                    <div ng-show="activeCard.skill0">0:  {{ activeCard.skill0.Name }} - {{ activeCard.skill0.Desc }}</div>
                    <div ng-show="activeCard.skill5">5:  {{ activeCard.skill5.Name }} - {{ activeCard.skill5.Desc }}</div>
                    <div ng-show="activeCard.skill10">10: {{ activeCard.skill10.Name }} - {{ activeCard.skill10.Desc }}</div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6">
                                <div ng-show="activeCard.price">Price: {{ activeCard.price }}</div>

                            </div>
                            <div class="col-md-6">
                                <div ng-show="activeCard.baseExp">BaseExp: {{ activeCard.baseExp }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" ng-click="ok()">OK</button>
        </div>
    </div>
</div>
