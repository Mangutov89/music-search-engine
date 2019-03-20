import 'bootstrap';
import $ from 'jquery';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { ArtistSearch } from './artistAPI.js';

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
       $('#results').text(`Your artist is ${artistInput} and his facebook is <a href=${body.artists[0].strFacebook}>click here</a>`);
    }, function(error) {
       $('.showErrors').text(`There was an error processing your request: ${error.message}`);

    });
  });
});
