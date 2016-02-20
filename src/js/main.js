app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'public/html/home.html',
      controller: 'MainCtrl'
    })
    .state('weather', {
      url: '/weather',
      templateUrl: 'public/html/weather.html',
      controller: 'MainCtrl'
    })
})
