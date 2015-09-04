
angular.module('trabalho3bim').controller('NewCursoController', function ($scope, $location, locationParser, CursoResource , DisciplinaResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.curso = $scope.curso || {};
    
    $scope.disciplinaList = DisciplinaResource.queryAll(function(items){
        $scope.disciplinaSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("disciplinaSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.curso.disciplina = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.curso.disciplina.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Cursos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        CursoResource.save($scope.curso, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Cursos");
    };
});