var edtApp = angular.module('edtApp', ['ngRoute','ngTable','ui.bootstrap']);

edtApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});

edtApp.controller('CheckinCtrl', function ($scope, $http) {
	$scope.dni = '';
	$scope.sectorEncolado = '';
	$scope.turno = {};
	$scope.creandoTurno = false;
	$scope.validandoTurno = true;
	$scope.nuevoTurnoDni = '';
	$scope.nuevoTurnoApellido = '';
	$scope.nuevoTurnoNombre = '';
	$scope.nuevoTurnoEsJubilado = false;
	$scope.nuevoTurnoEsDiscapacitado = false;
	
	$scope.validar = function () {
		console.log('Validar: ' + $scope.dni);
		if($scope.dni.length == 0){
			alert('No se ha ingresado DNI');
			return;
		}
		$scope.sectorEncolado = '';
		$http({
	        method: 'POST',
	        url: '../validarTurno/' + $scope.dni,
	    }).success(function (result) {
	    	console.log(result);
	    	$scope.turno = result.turno[0].fields;
	    	$scope.turno.valido = result.valido;
	    	$scope.turno.sector = result.sector;
	    	$scope.turno.retenido = result.retenido;
	    	theDateTime = new Date($scope.turno.fechaHoraTumera);
	    	$scope.turno.fecha = theDateTime.toLocaleDateString();
	    	$scope.turno.hora = theDateTime.toLocaleTimeString();
	    	$scope.turno.turnoId = result.turno[0].pk;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	$scope.turno = {};
	    });
	};
	
	$scope.confirmar = function() {
		console.log('Confirmar Turno:' + $scope.turno.dni );
		if($scope.turno.turnoId == null) {
			alert('No se ha seleccionado un turno');
			return;
		}
		$http({
	        method: 'POST',
	        data: {'email':$scope.supervisorEmail, 'password':$scope.supervisorPassword},
	        url: '../confirmarCheckin/' + $scope.turno.turnoId
	    }).
	    success(function (result) {
	    	console.log(result);
	    	$scope.sectorEncolado = result[0].fields.nombre;
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	$scope.sectorEncolado = '';
	    	alert(data.Error);
	    });
	};
	
	$scope.crearTurno = function() {
		console.log('Crear Turno:' + $scope.nuevoTurnoDni);
		$http({
	        method: 'POST',
	        data: {'email':$scope.supervisorEmail, 
	        	   'password':$scope.supervisorPassword,
	        	   'turno':{'dni':$scope.nuevoTurnoDni,
	        		   		'apellido':$scope.nuevoTurnoApellido,
	        		   		'nombre':$scope.nuevoTurnoNombre,
	        		   		'esJubilado':$scope.nuevoTurnoEsJubilado,
	        		   		'esDiscapacitado':$scope.nuevoTurnoEsDiscapacitado}},
	        url: '../crearTurno/'
	    }).
	    success(function (result) {
	    	console.log(result);
	    	$scope.creandoTurno = false;
			$scope.validandoTurno = true;
			$scope.dni = $scope.nuevoTurnoDni;
			$scope.validar();
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	$scope.sectorEncolado = '';
	    	alert(data.Error);
	    });
		
	};
});

edtApp.controller('LogoutCtrl', function ($scope, $http) {
	
	$scope.cerrarPuesto = function () {
		console.log('cerrarPuesto');
		$http({
	        method: 'POST',
	        url: '../logout/',
	    }).success(function (result) {
	    	console.log(result);
	    	window.location = '../';
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	window.location = '../';
	    });
	};	
});

edtApp.controller('EdtCtrl', function ($scope, $http, $filter, ngTableParams) {
	$scope.sectorEncolado = '';
	$scope.sectorRetenido = '';
	$scope.turnoCongelado = true;
	$scope.noExisteRetenido = true;
	$scope.turno = {};
	$scope.turnosGrupo = [];
	$scope.turnosGrupoDisplay = [];
	$scope.turnosGrupoSinFinalizar = [];
	$scope.turnosGrupoSinFinalizarDisplay = [];
	$scope.cantidadGrupo = 16;
	$scope.grupoId = 0;
	$scope.grupoAbierto = false;
	$scope.esGrupal = false;
	$scope.administraGrupo = false;
	
	$scope.init = function(){
		console.log('Edt.init');
		$http({
	        method: 'GET',
	        url: '../estadoDelSector/',
	    }).success(function (result) {
	    	console.log(result)
	    	$scope.esGrupal = result.esGrupal;
	    	if ($scope.esGrupal) {
	    		$scope.administraGrupo = result.administraGrupo;
	    		if(result.grupo){
	    			$scope.grupoAbierto = result.grupo[0].fields.estaAbierto;
	    			$scope.cantidadGrupo = result.grupo[0].fields.cantidad;
	    			$scope.grupoId = result.grupo[0].pk;
	    			$scope.refrescarGrupo(null);
	    			$scope.refrescarGrupoSinFinalizar(null);
	    		}
	    	}
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    });
	};
	
	$scope.refrescarTurno = function(result){
		console.log('refrescarTurno',result);
    	$scope.turno = result[0].fields;
    	$scope.turno.valido = result.valido;
    	$scope.turno.sectorRetenido = result.sectorRetenido;
    	theDateTime = new Date($scope.turno.fechaHoraTumera);
    	$scope.turno.fecha = theDateTime.toLocaleDateString();
    	$scope.turno.hora = theDateTime.toLocaleTimeString();
    	$scope.turno.turnoId = result[0].pk;
    	$scope.turnoCongelado = false;
    	$scope.noExisteRetenido = true;
	};
	
	$scope.llamarProximo = function () {
		console.log('Llamar Proximo');
		$scope.sectorEncolado = '';
		$http({
	        method: 'GET',
	        url: '../llamarProximo/',
	    }).success(function (result) {
	    	$scope.refrescarTurno(result);
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	$scope.turno = {};
	    });
	};
	
	$scope.rellamar = function() {
		console.log('Re-Llamar');
		$scope.sectorEncolado = '';
		$http({
	        method: 'GET',
	        url: '../reLlamar/',
	    }).success(function (result) {
	    	$scope.refrescarTurno(result);
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	$scope.turno = {};
	    });
	};
	
	$scope.derivarTurno = function() {
		console.log('derivarTurno');
		if($scope.turno.turnoId == null) {
			alert('No se ha seleccionado un turno');
			return;
		}
		$http({
	        method: 'POST',
	        url: '../derivarTurno/' + $scope.turno.turnoId,
	    }).success(function (result) {
	    	$scope.sectorEncolado = result.siguienteSector[0].fields.nombre;
	    	$scope.turnoCongelado = true;
	    	if($scope.grupoId > 0){
	    		$scope.init();
	    	}
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	$scope.sectorEncolado = '';
	    });
	};
	
	$scope.finalizarTurno = function() {
		console.log('finalizarTurno');
		if($scope.turno.turnoId == null) {
			alert('No se ha seleccionado un turno');
			return;
		}
		$http({
	        method: 'POST',
	        url: '../finalizarTurno/' + $scope.turno.turnoId,
	    }).success(function (result) {
	    	$scope.turnoCongelado = true;
	    	$scope.sectorEncolado = 'Turno Finalizado';
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);	    	
	    });
	};
	
	$scope.enviarRetenido = function() {
		console.log('enviarRetenido');
		if($scope.turno.turnoId == null) {
			alert('No se ha seleccionado un turno');
			return;
		}
		$http({
	        method: 'POST',
	        url: '../enviarRetenido/' + $scope.turno.turnoId,
	    }).success(function (result) {
	    	$scope.sectorRetenido = result.SectorRetenidoNombre;
	    	$scope.turnoCongelado = true;
	    	$scope.noExisteRetenido = false;
	    	if($scope.grupoId > 0){
	    		$scope.init();
	    	}
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	$scope.sectorRetenido = '';
	    });
	};
	
	$scope.deshacerUltimoRetenido = function() {
		$http({
	        method: 'POST',
	        url: '../deshacerUltimoRetenido/',
	    }).success(function (result) {
	    	console.log(result);
	    	$scope.refrescarTurno(result);
	    	$scope.sectorRetenido = '';
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	$scope.sectorRetenido = '';
	    });
	};
	
	$scope.abrirGrupo = function() {
		console.log('abrirGrupo',$scope.cantidadGrupo);
		$http({
	        method: 'POST',
	        url: '../abrirGrupo/',
	        data: {cantidad: parseInt($scope.cantidadGrupo,10)}
	    }).success(function (result) {
	    	console.log(result);
	    	$scope.grupoAbierto = result[0].fields.estaAbierto;
			$scope.cantidadGrupo = result[0].fields.cantidad;
			$scope.grupoId = result[0].pk;
			$scope.refrescarGrupo(null);
			$scope.init();
			
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    	$scope.sectorRetenido = '';
	    });
	};
	
	$scope.refrescarGrupo = function(turnos){
		console.log('refrescarGrupo');
		if (turnos != null) {
			$scope.turnosGrupo = turnos;
			$scope.turnosGrupoDisplay = turnos;
		}else{
			$http({
		        method: 'GET',
		        url: '../listarGrupo/'+$scope.grupoId,
		    }).success(function (result) {
		    	console.log(result);
		    	$scope.refrescarGrupo(result.turnos);
		    }).
		    error(function(data, status, headers, config){
		    	console.log(data);
		    	alert(data.Error);
		    });
		}
	};
	
	$scope.refrescarGrupoSinFinalizar = function(turnos){
		console.log('refrescarGrupoSinFinalizar');
		if (turnos != null) {
			$scope.turnosGrupoSinFinalizar = turnos;
			$scope.turnosGrupoSinFinalizarDisplay = turnos;
		}else{
			$http({
		        method: 'GET',
		        url: '../listarGrupoSinFinalizar/',
		    }).success(function (result) {
		    	console.log(result);
		    	$scope.refrescarGrupoSinFinalizar(result.turnos);
		    }).
		    error(function(data, status, headers, config){
		    	console.log(data);
		    	alert(data.Error);
		    });
		}
	};
	
	$scope.agregarAlGrupo = function() {
		console.log('agregarAlGrupo');
		$http({
	        method: 'POST',
	        url: '../agregarAlGrupo/'+$scope.grupoId,
	        data: {turnoId: $scope.turno.turnoId}
	    }).success(function (result) {
	    	console.log(result);
	    	$scope.refrescarGrupo(result.turnos);
	    	$scope.init();
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    });
	};
	
	$scope.entregarTarea = function() {
		console.log('entregarTarea');
		$http({
	        method: 'POST',
	        url: '../entregarTarea/'+$scope.grupoId,
	        data: {turnoId: $scope.turno.turnoId}
	    }).success(function (result) {
	    	console.log(result);
	    	$scope.refrescarGrupo(result.turnos);
	    	$scope.init();
	    }).
	    error(function(data, status, headers, config){
	    	console.log(data);
	    	alert(data.Error);
	    });
	};
	
	//ngTable configuración
	$scope.tablaGrupo = new ngTableParams({
		page: 1,            // show first page
        count: 20,          // count per page 
    }, {
    	counts: [], // hide page counts control
        total: 1,  // value less than count hide pagination 
        getData: function($defer, params) {
        	// use build-in angular filter
            var filteredData = params.filter() ? $filter('filter')($scope.turnosGrupo, params.filter()) : $scope.turnosGrupo;
            var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
            params.total(orderedData.length); // set total for recalc pagination
            $scope.turnosGrupoDisplay = orderedData;
            $defer.resolve($scope.turnosGrupoDisplay); 
        }
    });
	
	$scope.tablaGrupoSinFinalizar = new ngTableParams({
		page: 1,            // show first page
        count: 20,          // count per page 
    }, {
    	counts: [], // hide page counts control
        total: 1,  // value less than count hide pagination 
        getData: function($defer, params) {
        	// use build-in angular filter
            var filteredData = params.filter() ? $filter('filter')($scope.turnosGrupoSinFinalizar, params.filter()) : $scope.turnosGrupoSinFinalizar;
            var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
            params.total(orderedData.length); // set total for recalc pagination
            $scope.turnosGrupoSinFinalizarDisplay = orderedData;
            $defer.resolve($scope.turnosGrupoSinFinalizarDisplay); 
        }
    });
	
	$scope.changeSelection = function(turnoGrupo) {
        $scope.turno = turnoGrupo;
    	$scope.turno.valido = true;
    	$scope.turno.sectorRetenido = '';    	
    	theDateTime = new Date($scope.turno.fechaHoraTumera);
    	$scope.turno.fecha = theDateTime.toLocaleDateString();
    	$scope.turno.hora = theDateTime.toLocaleTimeString();
    	$scope.turno.turnoId = $scope.turno.turnoId;
    	
    	$scope.turnoCongelado = $scope.turno.finalizado;
    	$scope.noExisteRetenido = true;
    	$scope.sectorEncolado = '';
    	$scope.sectorRetenido = '';
    };

});