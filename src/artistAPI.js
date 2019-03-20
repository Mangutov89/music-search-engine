export class ArtistSearch {
  getArtist(artist) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://theaudiodb.com/api/v1/json/${process.env.API_KEY}/search.php?s=${artist}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

export class EventSearch {
  getEvent(blah) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TICKET_MASTER}&keyword=${blah}&stateCode=OR&city=portland&sort=date,asc&size=20`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
