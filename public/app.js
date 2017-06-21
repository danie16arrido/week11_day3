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
  var selectedBeer = getBeerObject( this.value );
  displayBeerInfo( selectedBeer );
};

var displayIngredientsInfo = function( beerIngredients ) {
  var ingredients = createIngredients( beerIngredients );  
  var ingredientsElement = getHtmlObjectById('ingredients')
  ingredientsElement.innerHTML = "";
  ingredientsElement.appendChild(ingredients)
}

var createIngredients = function( beerIngredients ){

  var ingredientsData = document.createElement( 'dl' );
  addHopsData( ingredientsData, beerIngredients);
  addMaltData( ingredientsData, beerIngredients );
  addYeastData ( ingredientsData, beerIngredients );
  
  return ingredientsData;
}

var addYeastData = function( ingredientsData, beerIngredients ) {
  var yeastData = document.createElement( 'dt' );
  yeastData.innerText = "Yeast";
  ingredientsData.appendChild(yeastData)
  var dd = document.createElement('dd')
  dd.innerText = beerIngredients.yeast
  ingredientsData.appendChild(dd)
}

var addMaltData = function( ingredientsData, beerIngredients ){
  var malt = beerIngredients.malt;
  var maltData = document.createElement( 'dt' );
  maltData.innerText = "Malta";
  ingredientsData.appendChild(maltData)
  for( var element of malt){
    var dd = document.createElement( 'dd' );
    dd.innerText = element.amount.value + " g. of " + element.name;
    ingredientsData.appendChild(dd)
  }
}

var addHopsData =  function( ingredientsData, beerIngredients){
  var hops = beerIngredients.hops;
  var hopsData = document.createElement( 'dt' );
  hopsData.innerText = "Hops";
  ingredientsData.appendChild(hopsData)
  for( var element of hops){
    var dd = document.createElement( 'dd' );
    dd.innerText = element.amount.value + " g. of " +element.attribute + " " + element.name;
    ingredientsData.appendChild(dd)
  }
}

var displayImg = function( url ){
  var imgElement = getHtmlObjectById('image');
  imgElement.src = url;
}

var displayBeerInfo = function( aBeer ) {
  displayName( aBeer.name );
  displayDescription( aBeer.tagline);
  displayImg( aBeer.image_url );
  displayIngredientsInfo( aBeer.ingredients );

};

var displayDescription = function( tagline ) {
  var description = getHtmlObjectById('description');
  description.innerText = tagline;
}

var getBeerObject = function( beerSelected ){
  for(var beer of beerData){
    if(beerSelected === beer.name){
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