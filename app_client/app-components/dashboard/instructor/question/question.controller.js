/* jshint node: true */

//************************************************************
//  course.student.controller.js                            //
//  Active Learning 2110                                    //
//                                                          //
//  Created by Jeremy Carter on 02/03/17.                   //
//  Copyright © 2016 Jeremy Carter. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  03Feb17     J. Carter  Initial Design                   //
//                                                          //
//************************************************************

var app = angular.module('app');

app.controller('Instructor.Question.Controller', function($scope, $state, $rootScope) {

    $scope.state = 'edit';
    $scope.editor = null;

    $scope.question = {
        html: {},
        trueFalse: true,
        tags: [],
        choices: [{
            id: 1,
            text: "True",
            answer: true
        }, {
            id: 2,
            text: "False",
            answer: false
        }]
    };

    $scope.setChoicesTrueFalse = function() {
        if ($scope.question.trueFalse === true) {
            $scope.question.choices = [{
                id: 1,
                text: "True",
                answer: true
            }, {
                id: 2,
                text: "False",
                answer: false
            }];
        } else {
            $scope.question.choices = [{
                id: 1,
                text: "",
                answer: true
            }];
        }
    };

    $scope.answersEmpty = function() {
        var empty = false;
        for (var i in $scope.question.choices) {
            if ($scope.question.choices[i].text === '') {
                return true;
            }
        }
        return empty;
    };

    $scope.addNewChoice = function() {
        var newItemNo = $scope.question.choices.length + 1;
        $scope.question.choices.push({
            id: newItemNo,
            text: "",
            answer: false
        });
    };

    $scope.answerSelected = function(index) {
        $scope.question.choices[index].answer = true;
        for (var i in $scope.question.choices) {
            if (i != index) {
                $scope.question.choices[i].answer = false;
            }
        }
    };

    $scope.removeChoice = function(index) {
        if ($scope.question.choices[index].answer === true) {
            $scope.question.choices.splice(index, 1);
            $scope.question.choices[0].answer = true;
        } else {
            $scope.question.choices.splice(index, 1);
        }
        if ($scope.question.choices.length == 1) {
            $scope.question.choices[0].answer = true;
        }
    };

    $scope.edit = function() {
        $scope.state = 'cancel';
        $scope.editor.start();
    };

    $scope.save = function() {
        $scope.state = 'edit';
        $scope.editor.stop(true);
    };

    $scope.cancel = function() {
        $scope.state = 'edit';
        $scope.editor.stop(false);
    };

    $rootScope.$on('$stateChangeStart', function() {
        if ($scope.editor.isEditing()) {
            $scope.editor.stop(false);
        }
    });
});
