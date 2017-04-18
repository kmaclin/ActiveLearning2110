/* jshint node: true */

//************************************************************
//  sidebar.controller.js                                   //
//  Active Learning 2110                                    //
//                                                          //
//  Created by Jeremy Carter on 01/12/17.                   //
//  Copyright © 2016 Jeremy Carter. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  12Jan17     J. Carter  Initial Design                   //
//                                                          //
//************************************************************

var app = angular.module('app');

app.controller('Sidebar.Controller', function($scope, $state, $stateParams, $rootScope, $localStorage, UserService) {

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> b07945d9a6039efedda2801547af450150053a43
    $scope.state = null;
    $rootScope.$stateParams = $stateParams;

    $scope.createCourse = function() {
        UserService.ShowCreateCourse();
    };

    $scope.createLecture = function() {
        UserService.ShowCreateLecture();
    };

    $scope.joinCourse = function() {
        UserService.ShowJoinCourse();
    };

    $scope.$watch(function() {
        return $state.current.url;
    }, function(newVal, oldVal) {
        if (newVal !== undefined) {
            $scope.state = newVal;
            if ($stateParams.selectedCourse !== undefined) {
                $scope.instructor = $localStorage.courses[$stateParams.selectedCourse].instructor;
                $scope.course = $localStorage.courses[$stateParams.selectedCourse];
            }
        }
    });
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======

        $scope.courseClick = function(index) {
            $scope.$storage.selectedCourse = index;
        };
>>>>>>> origin/kelsey
=======
>>>>>>> b07945d9a6039efedda2801547af450150053a43
>>>>>>> upstream/kelsey
});
