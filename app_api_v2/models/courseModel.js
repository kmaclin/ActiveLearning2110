/* jshint node: true */

//************************************************************
//  courseModel.js                                          //
//  Active Learning 2110                                    //
//                                                          //
//  Created by Odell Mizrahi on 11/17/16.                   //
//  Copyright © 2016 Odell Mizrahi. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  17Nov16     O. Mizrahi  Initial Design                  //
//                                                          //
//************************************************************
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lecture_snapshot = {
    lecture_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    schedule: {
        day: {
            type: String,
            enum: ['mon', 'tue', 'wed', 'thu', 'fri']
        },
        date: String
    },
    "_id": false
};

var student_snapshot = {
    student_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending'
    },
    average: {
        type: Number,
        default: 0
    },
    "_id": false
};

var section_snapshot = {
    name: {
        type: String
    },
    _id: {
        type: String,
        required: true
    },
    section_key: {
        type: String,
        required: true,
        unique: true
    },
    students: [student_snapshot]
};

var CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    instructor: {
        instructor_id: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        photo: {
            type: String
        }
    },
    students: [String],
    schedule: {
        days: {
            type: [{
                type: String,
                enum: ['mon', 'tue', 'wed', 'thu', 'fri']
            }]
        },
        semester: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    course_key: {
        type: String,
        required: true,
        unique: true
    },
    lectures: [lecture_snapshot]
});

<<<<<<< HEAD
=======
CourseSchema.methods.lectureOneQuestions = function(question_array)
{
    var question1 =
    {
        question_num: 1,
        question_body: 'this is a test question',
        answer_choices: ['a', 'b', 'c', 'd'],
        answer: 0
    };
    question_array.push(question1);
    return question_array;
};

>>>>>>> upstream/kelsey
module.exports = mongoose.model('Course', CourseSchema);
