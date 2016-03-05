$(document).ready(function() {
  aleYeah.init();
});

var aleYeah = {
  url: {
    getBeers:"/get-beers",
    createBeer: "/create-beer",
    login: "/login"
  },

  init:function () {
    aleYeah.events();
    aleYeah.styling();
  },

  events: function () {
    $('.submitLogin').on('click', function(event){
      event.preventDefault();
      console.log("you clicked login");
      $('.loginScreen').removeClass('active');
      $('.dashboardScreen').addClass('active');

      var createUser = aleYeah.createUser();
      aleYeah.addUserName(createUser);
    });

    $('.dashboardScreen').on('click', 'button', function(event){
      event.preventDefault();
      console.log("you clicked create a new review");
      $('.dashboardScreen').removeClass('active');
      $('.reviewScreen').addClass('active');
    });

    $('.reviewScreen').on('click', '.submitReview', function(event){
      event.preventDefault();
      console.log("you clicked submit a new review");
      $('.reviewScreen').removeClass('active');
      $('.confirmationScreen').addClass('active');

      var rating = aleYeah.addBeerInfo();
      console.log(rating);
      aleYeah.createBeerReview(rating);
    });

    $('.confirmationScreen').on('click', 'button', function(event){
      event.preventDefault();
      console.log("you clicked back to dashboard");
      $('.confirmationScreen').removeClass('active');
      $('.dashboardScreen').addClass('active');
    });
  //   $('.reviewScreen').on('click','input[type="submit"]',function(event) {
  //    event.preventDefault();
  //    var rating = aleYeah.getBeerInfo();
  //    console.log(rating);
  //
  //    aleYeah.createBeerReview(rating);
  //  });
  },

  styling: function () {

  },

  createUser: function(){
    var newUserName = $('input[name="name"]').val();
    var newUserPass = $('input[name="password"]').val();
    return{
      name: newUserName,
      password: newUserPass
    };
  },

  addUserName: function(userNameInput){
    $.ajax({
      method:'POST',
      url: aleYeah.url.login,
      data: userNameInput,
      success: function(newUser){
        console.log("addusername worked", newUser);
        // newUserName = aleYeah.name;
        // newUserPass = aleYeah.password;
      },
      error: function(err){
        console.log("adduser did not work", err);
      }
    });
  },

  getBeerReview: function () {
    $.ajax({
      method: 'GET',
      url: aleYeah.url.getBeers,
      success: function(beerData) {
        console.log("RECEIVED BEERS", beerData);
        // window.glob = beerData;
        aleYeah.addBeerToDom(JSON.parse(beerData));
      },
      error: function(err) {
        console.log('GET dint work', err);
      }
    });
  },

  createBeerReview: function(review){
    $.ajax({
      method:'POST',
      url: aleYeah.url.createBeer,
      data: review,
      success: function(newReview){
        console.log("YOU DID IT", newReview);
      },
      error: function(err){
        console.log("POST dint work", err);
      }
    });
  },

  addBeerInfo: function(){
    var beerName = $('input[name="beerName"]').val();
    // var imgUrl = $('input[name="imgUrl"]').val();
    var beerType = $('input[name="beerType"]').val();
    var abv = $('input[name="abv"]').val();
    var yeah = $('input[name="yeah"]').val();
    var comment = $('input[name="commentInput"]').val();
    return{
      beerName: beerName,
      // image: imgUrl,
      beerType: beerType,
      alcoholContent: abv,
      isGood: yeah,
      comment: comment
    };
  },

  addBeertoDom: function(){
    $('.dashboard').html("");
   var tmpl = _.template(templates.dashboard);
   aleYeah.forEach(function(beer) {
     $('.dashboard').append(tmpl(beer));
   });
  }
}; // end of aleyeah array
