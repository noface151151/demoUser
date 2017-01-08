/// <reference path="angular.min.js" />

var app = angular.module("userapp", ["ngRoute", "ui.bootstrap"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider
            .when("/register", {
                templateUrl: "UserRegister.html",
                controller: "UserRegisterController"
            })
             .when("/detail", {
                 templateUrl: "UserDetail.html",
                 controller: "UserDetailController"
             })
             .when("/edit", {
                 templateUrl: "EditUser.html",
                 controller: "EditUserController"
             })
             .otherwise({
                 redirectTo: "/register"
             })
        $locationProvider.html5Mode(true)
    })
    .factory("SessionService", function () {
        return {
            set: function (key, val) {
                return localStorage.setItem(key, val);
            },
            get: function (key) {
                return localStorage.getItem(key);
            },
            destroy: function (key) {
                return localStorage.removeItem(key);
            },
        }
    })
    .factory("UserService", function (SessionService) {
        var user = {};
        if (SessionService.get("userdata")) {
            user = JSON.parse(SessionService.get("userdata"))
            console.log(user)
        }
        return {
            AddUser: function (username, password, fullname, birthday, sex, email, phone, job, introduce) {
                 user = {};
                if (SessionService.get("userdata")) {
                    SessionService.destroy("userdata")
                }
                var emailarr = [];
                var phonearr = [];
                emailarr.push(email);
                if (fullname == null)
                {
                    fullname = "";
                }
                if (sex == null)
                {
                    sex = "";
                }
                if (phone == null)
                {
                    phone = [];
                }
                else {
                    phonearr.push(phone)
                }
                if (job == null)
                {
                    job = "";
                }
                if (introduce == null)
                {
                    introduce = "";
                }
                var usernew = { username: username, password: password, fullname: fullname, birthday: birthday, sex: sex, email: emailarr, phone: phonearr, job: job, introduce: introduce };
                SessionService.set("userdata", JSON.stringify(usernew))
                user = usernew;
            },
            EditUser: function (username, fullname, birthday, sex, job, introduce) {                       
                if (fullname == null) {
                    fullname = "";
                }
                if (sex == null) {
                    sex = "";
                }              
                if (job == null) {
                    job = "";
                }
                if (introduce == null) {
                    introduce = "";
                }

                user.username = username;
                user.fullname = fullname;
                user.birthday = birthday;
                user.sex = sex;
                user.job = job;
                user.introduce = introduce;                
                SessionService.set("userdata", JSON.stringify(user))

            },
            addemail: function (email) {
                var flag = 0;
                for (i = 0; i < user.email.length; i++)
                {
                    if(email.toLowerCase()==user.email[i].toLowerCase())
                    {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1)
                {
                    alert("Email already exists");
                }
                else if (user.email.length > 4)
                {
                    alert("Maximum 5 email");
                }
                else
                {
                    user.email.push(email);
                    SessionService.set("userdata", JSON.stringify(user))
                    alert("Add Email success")
                }
                
            },
            addphone:function(phone){
                var flag = 0;
                for (i = 0; i < user.phone.length; i++) {
                    if (phone.toLowerCase() == user.phone[i].toLowerCase()) {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1) {
                    alert("Phone already exists");
                }
                else if (user.phone.length > 4) {
                    alert("Maximum 5 phone number");
                }
                else {
                    user.phone.push(phone);
                    SessionService.set("userdata", JSON.stringify(user))
                    alert("Add Phone number success")
                }
            },
            editemail: function (oldemail,newemail) {
                var flag = 0;
                for(i=0;i<user.email.length;i++)
                {
                    if (user.email[i].toLowerCase() == newemail.toLowerCase())
                    {
                        flag = 1;
                        break;
                    }
                   else if(user.email[i]==oldemail)
                    {
                        user.email[i] = newemail;
                        break;
                    }
                }
                if (flag == 1) {
                    alert("New Email already exists")
                }
                else {
                    SessionService.set("userdata", JSON.stringify(user))
                    alert("Save change Email success")
                }

            },
            deleteemail: function (email) {
                for (i = 0; i < user.email.length; i++) {
                    if (user.email[i].toLowerCase() == email.toLowerCase()) {
                        user.email.splice(i, 1);
                        break;
                    }
                }
                SessionService.set("userdata", JSON.stringify(user))
                alert("Delete Email success")
            },
            editphone: function (oldphone, newphone) {
                var flag = 0;
                for (i = 0; i < user.phone.length; i++) {
                    if (user.phone[i].toLowerCase() == newphone.toLowerCase()) {
                        flag = 1;
                        break;
                    }
                    else if (user.phone[i] == oldphone) {
                        user.phone[i] = newphone;
                        break;
                    }
                }
                if (flag == 1) {
                    alert("New Phone number already exists")
                }
                else {
                    SessionService.set("userdata", JSON.stringify(user))
                    alert("Save change Phone number success")
                }

            },
            deletephone: function (phone) {
                for (i = 0; i < user.phone.length; i++) {
                    if (user.phone[i].toLowerCase() == phone.toLowerCase()) {
                        user.phone.splice(i, 1);
                        break;
                    }
                }
                SessionService.set("userdata", JSON.stringify(user))
                alert("Delete Email success")
            },
            userdata: function () {
                return user;
            }
        }

    })
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
      .controller("UserRegisterController", function ($scope, UserService, SessionService, $location,$window) {

          $scope.submit = function () {          
              UserService.AddUser($scope.username, $scope.password, $scope.fullname, $scope.birthday, $scope.sex, $scope.email, $scope.phone, $scope.job, $scope.introduce);
              $window.alert("Register Success!")
              // console.log(SessionService.userdata);
              $location.path('/detail');
          }
      })
.controller("UserDetailController", function ($scope, SessionService, UserService, $uibModal, $location) {
    $scope.user = UserService.userdata();
    $scope.addemail = function () {
        var $modalInstance = $uibModal.open({
            templateUrl: 'AddEmail.html',
            controller: 'AddEmailController'
        });

    }
    $scope.editRedirect = function () {
        $location.path('/edit');
    }
    $scope.addphone = function () {
        var $modalInstance = $uibModal.open({
            templateUrl: 'AddPhone.html',
            controller: 'AddPhoneController'
        });

    }
    $scope.$watch(function () {
        return SessionService.get("userdata")
    }, function (newval, oldval) {
        $scope.user = JSON.parse(newval);
    })
})
.controller("AddEmailController", function ($scope, $uibModalInstance, $uibModal, UserService) {
    $scope.addemail = function () {
        UserService.addemail($scope.email);
    }
    $scope.quit = function () {
        $uibModalInstance.dismiss('cancel');
    }
    
})
.controller("AddPhoneController", function ($scope, $uibModalInstance, $uibModal, UserService) {
    $scope.addphone = function () {
        UserService.addphone($scope.phone);
    }
    $scope.quit = function () {
        $uibModalInstance.dismiss('cancel');
    }

})
.controller("EditUserController", function ($scope, UserService, SessionService, $window, $location,$uibModal) {
    $scope.user = UserService.userdata();
    $scope.edit = function () {
        UserService.EditUser($scope.user.username, $scope.user.fullname, $scope.user.birthday, $scope.user.sex, $scope.user.job, $scope.user.introduce)
        $window.alert("Save change success")
        $location.path('/detail')
    }
    $scope.$watch(function () {
        return SessionService.get("userdata")
    }, function (newval, oldval) {
        $scope.user = JSON.parse(newval);
    })
    $scope.editemail = function () {
        var $modalInstance = $uibModal.open({
            templateUrl: 'EditEmail.html',
            controller: 'EditEmailController'
        });
    }
    $scope.editphone = function () {
        var $modalInstance = $uibModal.open({
            templateUrl: 'EditPhone.html',
            controller: 'EditPhoneController'
        });
    }
})
.controller("EditEmailController", function ($scope, $uibModalInstance, $uibModal, UserService) {
    $scope.user = UserService.userdata();
    $scope.editemail = function () {
        UserService.editemail($scope.oldemail, $scope.newemail);
        $scope.oldemail = null;
        $scope.newemail = null;
    }
    $scope.quit = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.deleteemail = function () {
        UserService.deleteemail($scope.oldemail);
        $scope.oldemail = null;
        $scope.newemail = null;
    }
})
.controller("EditPhoneController", function ($scope, $uibModalInstance, $uibModal, UserService) {
    $scope.user = UserService.userdata();
    $scope.editphone = function () {
        UserService.editphone($scope.oldphone, $scope.newphone);
        $scope.oldphone = null;
        $scope.newphone = null;
    }
    $scope.quit = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.deletephone = function () {
        UserService.deletephone($scope.oldphone);
        $scope.oldphone = null;
        $scope.newemail = null;
    }
})