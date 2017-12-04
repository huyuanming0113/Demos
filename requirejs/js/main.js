require(['jquery', 'student', 'class'], function ($, createStudent, allStudents){
		// some code here
});

require.config({
	baseUrl: "js",
	paths: {
		"jquery": "jquery-1.11.3.min",
		"student": "student",
		"class": "class"
	}
});
