'use strict';

/* Controllers */

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('DashboardCtrl', ['$scope', 'Dashboard', '$timeout',
  function($scope, Dashboard, $timeout) {

    var a = localStorage.getItem("userPrefs");
    $scope.infoData = JSON.parse(a);

    //Calculate width of boxes
    $scope.getBoxWidth = function() {
    switch($scope.infoData.boxesInline)
        {
            case "12":
                return 1;
            case "6":
                return 2;
            case "4":
                return 3;
            case "3":
                return 4;
            case "2":
                return 6;
            case "1":
                return 12;
        }
    }

    //Animation of loading dots
    $scope.dots = ["", "", "", ""];
    var counter = 0;
    $scope.onTimeOut = function(){
        if(counter === 4)
        {
            counter = 0;
            $scope.dots = ["", "", "", ""];
        }
        if(counter!=0){
            $scope.dots[counter-1] = ".";
        }
        counter++;
        animateDots = $timeout($scope.onTimeOut, 200);
    }
    var animateDots = $timeout($scope.onTimeOut, 200);

    //Different arrays for sorting all jobs
    $scope.allData = Dashboard.query();
    $scope.allRed = [];
    $scope.allGreen = [];
    $scope.allYellow = [];
    $scope.allDisabled = [];
    $scope.allJobsSorted = [];

    //Get all data and sort in separate arrays
    $scope.allData.$promise.then(function (result) {

        $timeout.cancel(animateDots);

        for(var i = 0; i < result.jobs.length; i++)
            {
                switch(result.jobs[i].color)
                    {
                        case "red":
                        $scope.allRed.push(result.jobs[i]);
                        break;
                        case "blue":
                        $scope.allGreen.push(result.jobs[i]);
                        break;
                        case "yellow":
                        $scope.allYellow.push(result.jobs[i]);
                        break;
                        case "disabled":
                        $scope.allDisabled.push(result.jobs[i]);
                        break;
                    }
            }
        $scope.allJobsSorted.push($scope.allRed, $scope.allYellow, $scope.allGreen, $scope.allDisabled)
    });

    //Remove underscore from job name
    $scope.removeUnderscore = function(name)
    {
        var newName = name;
        while(newName.search("_") != -1)
        {
            newName = newName.replace("_", " ");
        }

        return newName;
    }

    //Get heading for each sorted array
    $scope.getHeading = function(index, type)
    {
        var heading = "";
        var subHeading = "";

        switch(index)
        {
            case 0:
            heading = "Failed Jobs";
            subHeading = "No failed jobs!";
            break;
            case 1:
            heading = "Building Jobs";
            subHeading = "No jobs building";
            break;
            case 2:
            heading = "Successful Jobs";
            subHeading = "No successful jobs...";
            break;
            case 3:
            heading = "Disabled Jobs";
            subHeading = "No disabled jobs";
            break;
        }
        if(type==="h1")
            {
                return heading;
            } else return subHeading;
    }
  }]);

dashboardControllers.controller('PreferencesCtrl', ['$scope',
  function($scope)
  {
    if(localStorage.getItem("userPrefs")===null)
    {
        console.log("nee");
        $scope.tempUserPrefs = {
                                   "showInfo"                  : false,
                                   "showHealthReports"         : false,
                                   "showNumberOfBuilds"        : false,
                                   "showLastCompletedBuild"    : false,
                                   "showLastStableBuild"       : false,
                                   "showLastFailedBuild"       : false,
                                   "showLastSuccessfulBuild"   : false,
                                   "showLastUnstableBuild"     : false,
                                   "showLastUnsuccessfulBuild" : false,
                                   "fontSize"                  : "s",
                                   "HRSize"                    : "s",
                                   "boxesInline"               : "4",
                                   "boxHeight"                 : 250
                               };
        localStorage.setItem("userPrefs", JSON.stringify($scope.tempUserPrefs));
    }

    $scope.showPreferences = false;
    if(localStorage.getItem("userPrefs")!=null)
    {
        var a = localStorage.getItem("userPrefs");
        $scope.tempUserPrefs = JSON.parse(a);
    }

    $scope.submit = function() {
        localStorage.setItem("userPrefs", JSON.stringify($scope.tempUserPrefs));
    }

  }]);