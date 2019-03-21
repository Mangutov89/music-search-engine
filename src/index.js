import 'bootstrap';
import $ from 'jquery';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { ArtistSearch, EventSearch } from './artistAPI.js';


$(document).ready(function() {
  $("#artist-form").submit(function(event) {
    event.preventDefault();
    const artistInput = $("#artist").val();
    $("#artist").val("");

    function artistCall(artistInput) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `http://theaudiodb.com/api/v1/json/${process.env.API_KEY}/search.php?s=${artistInput}`;
        // let newArtist = new ArtistSearch();
        // let promise = newArtist.getArtist(artistInput);

        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
         request.open('GET', url, true);
         request.send();
      });
    }

    function eventSearch(artistName) {
      return new Promise(function(resolve,reject) {
        let request = new XMLHttpRequest();
        let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKET_MASTER}&keyword=${artistName}&stateCode=OR&city=portland&sort=date,asc`;

        request.onload = function() {
          if (this.status === 200){
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();
      });
    }

    artistCall(artistInput)
      .then(function(response) {
        let body =JSON.parse(response);
        let artistName = body.artists[0].strArtist;
        return eventSearch(artistName);
      })
      .then(function(response) {
        let eventResponse = JSON.parse(response);
        let newArtistName = eventResponse._embedded.events[0].name;
        $("#new-event-response").text(newArtistName);
      })


  // $("#artist-form").submit(function(event) {
  //   event.preventDefault();
  //   const artistInput = $("#artist").val();
  //   $("#artist").val("");
  //
//     let newArtist = new ArtistSearch();
//     let promise = newArtist.getArtist(artistInput);
//
//     promise.then(function(response) {
//        let body =JSON.parse(response);
//        console.log(body.artists[0].strArtist);
//        $('#results').text("your artist you chose is " + artistInput + " their facebook page is " + body.artists[0].strFacebook);
//        $('#results-bio').text(`Learn more about this artist: ${body.artists[0].strBiographyEN}`);
//        setTimeout(function() {
//          $('#results-pic').html(`here is a picture <img src="${body.artists[0].strArtistFanart}">`);
//        }, 3000);
//     }, function(error) {
//        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     });
//
//
//
//   });
//   $("#event-form").submit(function(event) {
//     event.preventDefault();
//     const eventInput = $("#event").val();
//
//     let newEvent = new EventSearch();
//     let promise = newEvent.getEvent(eventInput)
//
//
//     promise.then(function(response) {
//       let body =JSON.parse(response);
//       console.log(body._embedded.events[0]);
//       $('#event-results').text(`${eventInput} next event is: ${body._embedded.events[0].name}`);
//       // $('#results-bio').text(`Learn more about this artist: ${body.artists[0].strBiographyEN}`);
//       // setTimeout(function() {
//       //   $('#results-pic').html(`here is a picture <img src="${body.artists[0].strArtistFanart}">`);
//       // }, 3000);
//   }, function(error) {
//     $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     });
//   });
});
});
