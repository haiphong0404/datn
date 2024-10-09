// Kiểm tra xem phần tử có tồn tại hay không
$.fn.elExists = function() {
    return this.length > 0;
};

// Vị trí trung tâm của bản đồ
var myCenter = new google.maps.LatLng(-37.840935, 144.946457);

// Hàm khởi tạo bản đồ
function initialize() {
    var mapProp = {
        center: myCenter,
        scrollwheel: false,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Tạo bản đồ
    var map = new google.maps.Map(document.getElementById("google-map"), mapProp);

    // Thêm đánh dấu (marker)
    var marker = new google.maps.Marker({
        position: myCenter,
        map: map,
    });

    // Định nghĩa kiểu dáng tùy chỉnh cho bản đồ
    var styles = [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                { "saturation": "-100" }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                { "saturation": -100 },
                { "lightness": 65 },
                { "visibility": "on" }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                { "saturation": "-100" }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                { "hue": "#ffff00" },
                { "lightness": -25 },
                { "saturation": -97 }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                { "lightness": -25 },
                { "saturation": -100 }
            ]
        }
    ];

    // Áp dụng kiểu dáng tùy chỉnh cho bản đồ
    map.setOptions({ styles: styles });

    // Đặt đánh dấu trên bản đồ
    marker.setMap(map);
}

// Kiểm tra xem phần tử google-map có tồn tại không và khởi tạo bản đồ
if ($('#google-map').elExists()) {
    // Thêm sự kiện lắng nghe khi tải trang
    google.maps.event.addDomListener(window, 'load', initialize);
} else {
    console.error("Phần tử với id 'google-map' không tồn tại.");
}
