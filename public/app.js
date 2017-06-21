var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.addEventListener( 'load', getData);
  request.send();

  var select = getHtmlObjectById( 'select' );
  select.addEventListener('change', handleSelect );
}

var handleSelect =  function( event ) {
  displayBeerInfo( this.value );
  getBeerObject( this.value );
};

var displayBeerInfo = function( aBeer ) {
  displayName( aBeer );

};

var getBeerObject = function( beerSelected ){
  for(var beer of beerData){
    if(beerSelected === beer.name){
      console.log( beer )
      return beer;
    }
  }
  
  return null;
}


var displayName = function( aBeer ) {
  var name = getHtmlObjectById('name');
  name.innerHTML = "";//clear
  name.innerText = aBeer;
};


var getData = function( event ) {
  var jsonString = this.responseText;
  beerData = JSON.parse( jsonString );
  populateDropDown(beerData);

};

var populateDropDown = function( beerData ){
  var beerNames =  getBeerNames( beerData );
  
  beerNames.forEach(function( beerName ) {
    var option = document.createElement('option');
    option.value = beerName;
    option.innerText = beerName;
    select.appendChild( option );
  }, this);
};

var getHtmlObjectById = function( id ) {
  return document.getElementById( id );
};

var getBeerNames= function( beerData ){
  var beers = [];
  for(var beer of beerData){
    beers.push(beer.name);
  }
  return beers;
}.bind(this);


window.addEventListener('load', app);

// var populateDropdown = function(countries, select){
// 	// console.log("countries", countries);
// 	countries.forEach(function(country){
// 		var option = document.createElement('option');
// 		option.value = country.name;
// 		option.innerText = country.name;
// 		select.appendChild( option );
// 	});
// }