/* jshint node: true */

//************************************************************
//  live_lecture.controller.js                             //
//  Active Learning 2110                                    //
//                                                          //
//  Created by Jeremy Carter on 02/03/17.                   //
//  Copyright © 2016 Jeremy Carter. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  07Apr17     J. Carter  Initial Design                   //
//                                                          //
//************************************************************

var app = angular.module('app');

app.controller('Student.Live.Lecture.Controller', function($scope, $localStorage, $rootScope, $stateParams, $state, UserService, SocketService, ngNotify) {
    $scope.time = 60;
    $scope.timeMax = 60;
    $scope.timerEnabled = false;
    $scope.end_time = 0;
    $rootScope.$stateParams = $stateParams;
    $scope.answer = "";
    $scope.submitted = false;
    $scope.correct = null;
    $scope.loading = false;
    var course = $localStorage.courses[$stateParams.selectedCourse];
    var lidx = $stateParams.selectedLecture;
    $scope.total = 0;
    $scope.totalCorrect = 0;
    $scope.percent = 100;

    $scope.submitAnswer = function() {
        SocketService.AnswerQuestion({
            question_id: $scope.question_id,
            answer: $scope.answer
        });
        $scope.submitted = true;
        $scope.loading = true;
    };

    $rootScope.$on('new_end', function(evt, data) {
        var old = $scope.end_time;
        $scope.end_time = new Date(data.time);
        $scope.timeMax = data.timeMax;
        var time = Math.round(($scope.end_time.getTime() - old.getTime()) / 1000);
        if (time > 0) {
            $scope.$broadcast('timer-add-cd-seconds', time);
        }
    });

    $rootScope.$on('answer_result', function(evt, correct) {
        $scope.loading = false;
        $scope.correct = correct;
        if (correct) {
            $scope.totalCorrect++;
        }
        calculatePercent();
    });

    $rootScope.$on('coursesUpdated', function() {
        if ($stateParams.selectedCourse !== null && $state.current.name === 'main.student_live_lecture') {
            course = $localStorage.courses[$stateParams.selectedCourse];
            if (!course.lectures[lidx].live) {
                ngNotify.set('Live lecture has ended', 'info');
                $state.go('main.student');
            }
        }
    });

    $rootScope.$on('new_question', function(evt, info) {
        $scope.$apply(function() {
            $scope.total++;
            $scope.question_id = info.question_id;
            $scope.title = info.question.html_title;
            $scope.body = info.question.html_body;
            $scope.choices = info.question.answer_choices;
            $scope.timerEnabled = true;
            var myTime = new Date();
            var endTime = new Date(info.end_time);
            $scope.end_time = endTime;
            $scope.time = Math.round(($scope.end_time.getTime() - myTime.getTime()) / 1000);
            $scope.timeMax = info.max_time;
            $scope.$broadcast('timer-set-countdown-seconds', $scope.time);
            $scope.$broadcast('timer-start');
        });
    });

    $rootScope.$on('end_question', function() {
        $scope.$apply(function() {
            $scope.$broadcast('timer-stop');
            $scope.timerEnabled = false;
            $scope.answer = "";
            $scope.submitted = false;
            $scope.correct = null;
            $scope.end_time = 0;
            $scope.time = 60;
            $scope.timeMax = 60;
        });
    });

    $scope.$on('timer-tick', function(event, data) {
        var myTime = new Date();
        $scope.time = Math.round(($scope.end_time.getTime() - myTime.getTime()) / 1000);
        if ($scope.time <= 0) {
            $scope.$broadcast('timer-stop');
            $scope.timerEnabled = false;
            $scope.answer = "";
            $scope.submitted = false;
            $scope.correct = null;
            $scope.end_time = 0;
        } else {
            $scope.timerEnabled = true;
        }
    });

    function calculatePercent() {
        if ($scope.total !== 0) {
            $scope.percent = ($scope.totalCorrect / $scope.total) * 100;
        }
    }
});
