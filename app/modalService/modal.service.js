'use strict';

angular.module('myApp')

.factory("modalFactory", ["$http", "$uibModal", function($http, $uibModal) {

    var openModal = function(templateUrl, controller, scope) {

        var opts = {
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: templateUrl,
            controller: controller,
            // resolve: {} // empty storage
        };

        /*     scope.opts.resolve.item = function() {
            return angular.copy({ name: scope.name }); // pass name to Dialog
        }
*/
        return $uibModal.open(opts);

        //return modalInstance;

    };
    return {
        openModal: openModal
    }


}])