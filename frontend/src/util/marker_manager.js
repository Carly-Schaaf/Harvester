export default class MarkerManager {
    constructor(map) {
        this.map = map;
        this.markers = {};
        this.prevNode = "";
    }

    createMarkerFromProduces(produce) {
        let latLng = new window.google.maps.LatLng(produce.lat, produce.lng);
        let marker = new window.google.maps.Marker({
            position: latLng
        });
        this.markers[produce.id] = marker;
        window.google.maps.event.addListener(marker, "click", (event) => {
            window.location.hash = `#/produces/${produce.id}`
        });

        marker.setMap(this.map);
    }

    updateMarkers(produces) {
        Object.keys(this.markers)
            .filter(produceId => !produces[produceId])
            .forEach((produceId) => this.removeMarker(produceId));

        Object.values(produces)
            .forEach(produce => {
                if (!this.markers[produce.id]) {
                    this.createMarkerFromProduces(produce);
                }
            });
    }

    removeMarker(markerId) {
        (this.markers[markerId]).setMap(null);
        delete this.markers[markerId];
    }


}

