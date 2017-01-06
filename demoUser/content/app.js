/// <reference path="angular.min.js" />

var app = angular.module("userapp", [])
                .directive("passwordVerify", function () {
                    return {
                        require: "ngModel",
                        scope: {
                            passwordVerify: '='
                        },
                        link: function (scope, element, attrs, ctrl) {
                            scope.$watch(function () {
                                var combined;

                                if (scope.passwordVerify || ctrl.$viewValue) {
                                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                                }
                                return combined;
                            }, function (value) {
                                if (value) {
                                    ctrl.$parsers.unshift(function (viewValue) {
                                        var origin = scope.passwordVerify;
                                        if (origin !== viewValue) {
                                            ctrl.$setValidity("passwordVerify", false);
                                            return undefined;
                                        } else {
                                            ctrl.$setValidity("passwordVerify", true);
                                            return viewValue;
                                        }
                                    });
                                }
                            });
                        }
                    };
                })
            .controller("UserController", function($scope) {
                $scope.user= { username: "", password: "", fullname: "", birthday: "", sex:"",email:[],phone:[],job:"",introduce:""};
                $scope.flag = false;
                $scope.flagemail = false;
      
                if ($scope.user.email.length==0) {
                    $scope.flagemail = true;
                }
                $scope.submit = function () {
                    console.log($scope.user);
                    $scope.user.username = $scope.username;
                    $scope.user.password = $scope.password;
                    $scope.user.fullname = $scope.fullname;
                    $scope.user.birthday = $scope.birthday;
                    $scope.user.sex = $scope.sex;
                    var flag = 0;
                    
                    for (i = 0; i < $scope.user.email.length; i++) {
                        if ($scope.user.email[i] == $scope.email) {
                            flag = 1;
                        }
                    }
                    if (flag == 0 && $scope.user.email.length < 5) {
                        $scope.user.email.push($scope.email);
                    }
                    console.log($scope.user.email.length);
                    var flagphone = 0;

                    
                    for (i = 0; i < $scope.user.phone.length; i++) {
                        if ($scope.user.phone[i] == $scope.phone) {
                            flagphone = 1;
                            
                        }
                    }
                    console.log($scope.phone);
                    if (flagphone == 0 && $scope.user.phone.length < 5 && $scope.phone) {
                        $scope.user.phone.push($scope.phone);
                    }
                    $scope.user.job = $scope.job;
                    $scope.user.introduce = $scope.introduce;
                    $scope.flag = true;
                   

                }
                $scope.edit = function () {
                
                    
                    $scope.$watch(function() {
                            return $scope.user.email;
                        },
                        function(newval, oldval) {
                            $scope.user.email = newval;
                        });
                    $scope.flag = false;

                }
                $scope.addemail = function () {
                    var flag = 0;
                    console.log($scope.user.email.length);
                    for (i = 0; i < $scope.user.email.length; i++) {
                        if ($scope.user.email[i] == $scope.emailadd) {
                            flag = 1;
                        }
                    }
                    if (flag == 0 && $scope.user.email.length<5) {
                        $scope.user.email.push($scope.emailadd);
                    }
                }
                $scope.addphone = function () {
                    var flag = 0;
       
                    console.log($scope.user.phone.length);
                        for (i = 0; i < $scope.user.phone.length; i++) {
                            if ($scope.user.phone[i] == $scope.phoneadd) {
                                flag = 1;
                            }
                        }
                        if (flag == 0 && $scope.user.phone.length < 5) {
                            $scope.user.phone.push($scope.phoneadd);
                        }
                    }
                $scope.$watch(function () {
                    return $scope.user.email;
                },
                    function(newval, oldval) {
                        $scope.user.email = newval;
                    })
                $scope.$watch(function () {
                    return $scope.user.phone;
                },
                   function (newval, oldval) {
                       $scope.user.phone = newval;
                   })

    })