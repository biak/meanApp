function demoCtrl($scope,$http){
	
	$scope.message = "MEAN STACK DEMO";
	
	$scope.add = function(){
		$http.post("/clients",$scope.client).success($scope.all);
	};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete("/clients/"+id).success($scope.all);
	};
	
	
	$scope.update = function(){
		$http.put("/clients/"+$scope.client._id,$scope.client).success($scope.all);
	};
	
	
	$scope.select = function(id){
		console.log(id);
		$http.get("/clients/"+id).success(function(response){
			$scope.client= response; //change textbox
		});
	};
	
	$scope.renderClients = function(response){
			$scope.clients = response;
	};
	$scope.all = function(res){
		$http.get("/clients").success($scope.renderClients);
	};
	$scope.all();
}