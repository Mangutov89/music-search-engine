import 'bootstrap';
import $ from 'jquery';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { ArtistSearch } from './artistAPI.js';
import { EventSearch } from './artistAPI.js';

$(document).ready(function() {

  $("#artist-form").submit(function(event) {
    event.preventDefault();
    const artistInput = $("#artist").val();
    $("#artist").val("");

    let newArtist = new ArtistSearch();
    let promise = newArtist.getArtist(artistInput);

    promise.then(function(response) {
       let body =JSON.parse(response);
       console.log(body);
       $('#results').text("your artist you chose is " + artistInput + " their facebook page is " + body.artists[0].strFacebook);
       $('#results-bio').text(`Learn more about this artist: ${body.artists[0].strBiographyEN}`);
       setTimeout(function() {
         $('#results-pic').html(`here is a picture <img src="${body.artists[0].strArtistFanart}">`);
       }, 3000);
    }, function(error) {
       $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });



  });
  $("#event-form").submit(function(event) {
    event.preventDefault();
    const eventInput = $("#event").val();

    let newEvent = new EventSearch();
    let promise = newEvent.getEvent(eventInput)


    promise.then(function(response) {
      let body =JSON.parse(response);
      console.log(body._embedded.events[0]);
      $('#event-results').text(`${eventInput} next event is: ${body._embedded.events[0].name}`);
      // $('#results-bio').text(`Learn more about this artist: ${body.artists[0].strBiographyEN}`);
      // setTimeout(function() {
      //   $('#results-pic').html(`here is a picture <img src="${body.artists[0].strArtistFanart}">`);
      // }, 3000);
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
