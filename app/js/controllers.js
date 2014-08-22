'use strict';

/* Controllers */

var dashboardControllers = angular.module('dashboardControllers', []);


/* Jobs Controller */
dashboardControllers.controller('JobsCtrl', ['$scope', 'Dashboard', '$timeout',
  function($scope, Dashboard, $timeout) {

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

    //Hide and display jobs
    $scope.showDisplayJobsMenu = false;
    $scope.tempDisplayedJobs = [];
    $scope.deleteName = function (jobName)
    {
        for(var i = 0; i < $scope.displayedJobs.length; i++)
        {
            if($scope.displayedJobs[i]===jobName)
            {
                $scope.displayedJobs.splice(i, 1);
                $scope.hiddenJobs.push(jobName);
                $scope.updateJobsToLocalStorage();
            }
        }
    };
    $scope.addName = function(jobName)
    {
        for(var i = 0; i < $scope.displayedJobs.length; i++)
        {
            if($scope.hiddenJobs[i]===jobName)
            {
                $scope.hiddenJobs.splice(i, 1);
                $scope.displayedJobs.push(jobName);
                $scope.updateJobsToLocalStorage();
            }
        }
    };
    $scope.updateJobsToLocalStorage = function()
    {
        //Update the hide and displayed arrays
        localStorage.setItem("displayedJobs", JSON.stringify($scope.displayedJobs));
        localStorage.setItem("hiddenJobs", JSON.stringify($scope.hiddenJobs));
    }
    $scope.refreshDisplayedJobs = function() {
          localStorage.removeItem("displayedJobs");
          localStorage.removeItem("hiddenJobs");
          location.reload();
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
                $scope.tempDisplayedJobs.push(result.jobs[i].name);
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
        $scope.allJobsSorted.push($scope.allRed, $scope.allYellow, $scope.allGreen, $scope.allDisabled);

        //Check if there is stored hide/display data, if not create two arrays: hidden & displayed jobs
        if(localStorage.getItem("displayedJobs")===null && localStorage.getItem("hiddenJobs")===null)
        {
            localStorage.setItem("displayedJobs", JSON.stringify($scope.tempDisplayedJobs));
            localStorage.setItem("hiddenJobs", JSON.stringify([]));
        }
        $scope.displayedJobs = JSON.parse(localStorage.getItem("displayedJobs"));
        $scope.hiddenJobs = JSON.parse(localStorage.getItem("hiddenJobs"));
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

    //Set default preferences in local storage if local storage is empty
    if(localStorage.getItem("userPrefs")===null)
    {
        $scope.tempUserPrefs = {
                                   "hideInfo"                  : false,
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
        $scope.infoData = JSON.parse(localStorage.getItem("userPrefs"));
    }

    $scope.showPreferences = false;
    if(localStorage.getItem("userPrefs")!=null)
    {
        var a = localStorage.getItem("userPrefs");
        $scope.infoData = JSON.parse(a);
    }

    //Rewrite preferences to local storage
    $scope.submit = function() {
        localStorage.setItem("userPrefs", JSON.stringify($scope.infoData));
        $scope.infoData = JSON.parse(localStorage.getItem("userPrefs"));
    }
  }]);