export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lon: location.lon }; // { lat: 02320, lon: 92302 }
    this.id = id;
  }
}
