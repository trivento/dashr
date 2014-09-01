var dashboardFilters = angular.module('dashboardFilters', []).filter('filterMultiple',['$filter',function ($filter) {
	return function (items, bannedJobs) {
		var filterObj =
		{
            filteredData    : [],
            applyFilter     : function(obj,key)
            {
                var fData = [];
                this.filteredData = items;
                if(obj){
                    var fObj = {};
                    if(obj.length > 0){
                        for(var i=0;i<obj.length;i++){
                            if(angular.isString(obj[i])){
                                fObj[key] = obj[i];
                                fData = fData.concat($filter('filter')(this.filteredData,fObj));
                            }
                        }
                    }
                    if(fData.length > 0){
                        this.filteredData = fData;
                    }
                }
            }
		};
		if(bannedJobs) {
			angular.forEach(bannedJobs,function(obj,key){
				filterObj.applyFilter(obj,key);
			});
		}
		return filterObj.filteredData;
	}
}]);