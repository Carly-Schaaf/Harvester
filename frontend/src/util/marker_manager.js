import React from 'react';

export default class MarkerManager {
    constructor(map, cb) {
        this.map = map;
        this.markers = {};
        this.setClickedMarker = cb;
        this.prevNode = "";
    }

    createMarkerFromProduces(produce) {
        let latLng = new window.google.maps.LatLng(produce.lat, produce.lng);
        let marker = new window.google.maps.Marker({
            position: latLng
        });
        this.markers[produce.id] = marker;
        window.google.maps.event.addListener(marker, "click", (event) => {
            if (this.prevNode !== "") {this.prevNode.style.backgroundColor = ""};
            const node = document.getElementById(produce.id);
            this.prevNode = node;
            const scrollBox = document.getElementById("scroll-container");
            node.style.backgroundColor = "antiquewhite";
            scrollBox.scroll({ top: node.offsetTop, behavior: 'smooth' })
            this.setClickedMarker(node);
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
