var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function getIpAddress() {
  var ip = document.getElementById("input-ip-add").value;
  var api_key = "at_e4KcqOBkt8cxlxgguokWDDb2VEOBS";
  $(function () {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      data: { apiKey: api_key, domain: ip, ipAddress: ip },
      success: function (data) {
        console.log(data);
        document.getElementById("ip-add").innerHTML = data.ip;
        document.getElementById("ip-location").innerHTML =
          data.location.city + ", " + data.location.region;
        document.getElementById("ip-timezone").innerHTML =
          "UTC" + data.location.timezone;
        document.getElementById("ip-isp").innerHTML = data.isp;

        // Map Location
        map.setView([data.location.lat, data.location.lng]);

        // Marker
        var myIcon = L.icon({
          iconUrl: "./assets/images/icon-location.svg",
          iconSize: [44, 56],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
        });

        L.marker([data.location.lat, data.location.lng], {
          icon: myIcon,
        }).addTo(map);
      },
    });
  });
}
