// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const myLatLng = { lat: 42.369613159308955, lng: -71.17521044919918 };
let markers = [];
let isWatertown;
let streetNumber;
let streetName;
let streetType;
let homeMarker;
let infowindow;
let pollInfowindow;
let isdisplayed;
let draw_precincts_1;
let draw_precincts_2;
let draw_precincts_3;
let draw_precincts_4;
let draw_precincts_5;
let draw_precincts_6;
let draw_precincts_7;
let draw_precincts_8;
let draw_precincts_9;
let draw_precincts_10;
let draw_precincts_11;

let all_precincts = [];
let all_checkboxes = [];
let mapLabel;
let president;
let candidate_at_large;
let districta;
let districtb;
let districtc;
let districtd;
let library_trust;
let school_com;

const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
const icons = {
    parking: {
        name: "Polling Place",
        icon: "../img/white_voting_icon.png",
    },
    library: {
        name: "Representative",
        icon: iconBase + "library_maps.png",
    },
    info: {
        name: "Voter Info",
        icon: "https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml",
    },

};



function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.id = "trigger";
    controlUI.className = "z-depth-5"
    controlUI.style.backgroundColor = "#FF4C29";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 3px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.marginLeft = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to view precincts";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.style.color = "#fff";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "Precincts";
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
        $("#Precinct-Modal-Info").modal('toggle');
    });

}

const styles = {
    default: [{
        "featureType": "administrative",
        "stylers": [
            { "visibility": "off" }
        ]
    }, {
        "elementType": "labels",
        "stylers": [
            { "visibility": "on" }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            { "color": "#393939" },
            { "visibility": "off" }
        ]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            { "visibility": "on" }
        ]
    }],
    hide: [
        {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
    ],
};

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 14,
        mapTypeControl: false,
        disableDefaultUI: true,
        // mapId: "8e0a97af9386fef"

    });
    map.setOptions({ styles: styles["default"] });
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    const centerControlDiv = document.createElement("div");
    CenterControl(centerControlDiv, map);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);
    const centervotingDiv = document.createElement("div");
    CreateButton(centervotingDiv, map, "click on voting info", "Candidates");
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centervotingDiv);
    infowindow = new google.maps.InfoWindow();


    // Construct the polygon.
    // district A
    draw_precincts_1 = draw_my_precincts(precinct_1, "#FF9292", 1, "Blah Blah");
    draw_precincts_2 = draw_my_precincts(precinct_2, "#FFB4B4", 2, "Blah Blah");
    draw_precincts_3 = draw_my_precincts(precinct_3, "#FFDCDC", 3, "Blah Blah");
    // district B
    draw_precincts_4 = draw_my_precincts(precinct_4, "#CFF5FA", 4, "Blah Blah");
    draw_precincts_5 = draw_my_precincts(precinct_5, "#BDDDD8", 5, "Blah Blah");
    draw_precincts_6 = draw_my_precincts(precinct_6, "#93ACA8", 6, "Blah Blah");
    // district C
    draw_precincts_7 = draw_my_precincts(precinct_7, "#FF4C29", 7, "Blah Blah");
    draw_precincts_8 = draw_my_precincts(precinct_8, "#FF8169", 8, "Blah Blah");
    draw_precincts_9 = draw_my_precincts(precinct_9, "#FFB7A9", 9, "Blah Blah");
    // district D
    draw_precincts_10 = draw_my_precincts(precinct_10, "#936D99", 10, "Blah Blah");
    draw_precincts_11 = draw_my_precincts(precinct_11, "#C492CC", 11, "Blah Blah");
    draw_precincts_12 = draw_my_precincts(precinct_12, "#f5b7ff", 12, "Blah Blah");


    // make sure you add to precinct array
    // draw shape
    all_precincts = [
        draw_precincts_1, draw_precincts_2, draw_precincts_3, draw_precincts_4, draw_precincts_5, draw_precincts_6, draw_precincts_7, draw_precincts_8, draw_precincts_9, draw_precincts_10, draw_precincts_11, draw_precincts_12
    ];
    // set Map
    for (const key in all_precincts) {
        all_precincts[key].setMap(map);;
    }


    //Define position of label
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < precinct_9.length; i++) {
        bounds.extend(precinct_9[i]);
    }

    // const search_container = document.createElement('div');



    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // clear input text
    input.focus();
    input.addEventListener("click", () => {
        location.reload();
        input.value = "";
        input.focus();
    });
    const options = {
        componentRestrictions: { country: "us" },
        fields: ["formatted_address", "geometry", "name"],
        origin: map.getCenter(),
        strictBounds: false,
        types: ["address"],

    };
    // debugger;
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(card);
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    pollInfowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
    });
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const pollInfowindowContent = document.getElementById("pollInfowindow-content");
    pollInfowindow.setContent(pollInfowindowContent);

    function createHomeMarker(str_name) {
        homeMarker = new google.maps.Marker({
            map,
            anchorPoint: new google.maps.Point(0, -29),
            icon: "../img/home_icon.png",
            animation: google.maps.Animation.DROP,
        });
        google.maps.event.addListener(homeMarker, 'click', function () {
            if (!isdisplayed) {
                draw_precincts_4.setMap(map);
                draw_precincts_4.setVisible(true);
                isdisplayed = true;

            } else {
                draw_precincts_4.setVisible(false);
                isdisplayed = false;

            }

            document.getElementById("modal-title").innerHTML = str_name;

            $("#fluidModalInfo").modal('toggle')

            // infowindow.setContent("Home");
            // infowindow.open(map, homeMarker);
            draw_precincts_4.setMap(map);
        });

    }


    autocomplete.addListener("place_changed", () => {
        infowindow.close();
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        if ((/Watertown, MA/).test(place.formatted_address)) {
            isWatertown = true;
            createHomeMarker(place.formatted_address);
            homeMarker.setVisible(false);
            getInfo(place);
        } else {
            isWatertown = false;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            if (isWatertown) {
                map.fitBounds(place.geometry.viewport);
                map.setCenter(place.geometry.location);
                map.setZoom(15);
                homeMarker.setPosition(place.geometry.location);
                homeMarker.setVisible(true);
                $("#fluidModalInfo").modal('toggle')

            } else {
                map.setCenter(myLatLng);
                alert("Please try again with a valid address from Watertown MA");
                // map.setZoom(15);
                // homeMarker.setPosition(myLatLng);
            }

        }

        function create_marker(latlng, title, icon_str) {
            const polling = new google.maps.Marker({
                position: latlng,
                map,
                title: title,
                icon: icon_str,
                animation: google.maps.Animation.DROP,
                anchor: new google.maps.Point(latlng)
            });
            google.maps.event.addListener(polling, 'click', function () {
                // infowindow.setContent("Precincts 9");
                // infowindow.open(map, polling);
                var modal = document.getElementById("modal-title");
                modal.innerHTML = title;
                // $("#exampleModal").modal("show");
                // $("#fluidModalInfo").modal('toggle')
            });
            polling.setPosition(latlng);
            polling.setVisible(true);

        }

    });

    president = election_candidates(CandidateData['president'], 50);
    candidate_at_large = election_candidates(CandidateData['candidatesatlg'], 51);
    districta = election_candidates(CandidateData['districta'], 61);
    districtb = election_candidates(CandidateData['districtb'], 64);
    districtc = election_candidates(CandidateData['districtc'], 69);
    districtd = election_candidates(CandidateData['districtd'], 75);
    school_com = election_candidates(CandidateData['school'], 85);
    library_trust = election_candidates(CandidateData['library'], 95);


}

function getInfo(place) {
    var streetInfo = (place.name).split(" ");
    if (streetInfo.length == 4) {
        streetNumber = streetInfo[0];
        streetName = streetInfo[1] + "_" + streetInfo[2];
        streetType = streetInfo[3];
    } else {
        streetNumber = streetInfo[0];
        streetName = streetInfo[1];
        streetType = streetInfo[2];
    }
    var selected_precinct;
    var my_precint_info;
    var precinct_number;
    var street_side;
    var my_precint = StData[streetName + '_' + streetType]
    if (my_precint["type"] == "all") {
        my_precint_info = precinctData[my_precint["precinct"]];
        precinct_number = my_precint["precinct"];
        selected_precinct = precinctData[my_precint["precinct"]];
    }
    else if (my_precint["type"] == "multiple") {
        var my_precint_data = my_precint["from"];
        street_side = (parseInt(streetNumber) % 2 == 0) ? "even" : "odd";
        for (i = 0; i < my_precint_data.length; i++) {
            if (my_precint_data[i] != null) {

                if ((parseInt(streetNumber) >= my_precint_data[i]["start"] && parseInt(streetNumber) <= my_precint_data[i]["end"]) && (street_side == my_precint_data[i]["side"])) {
                    selected_precinct = my_precint_data[i];
                }
                else if ((parseInt(streetNumber) >= my_precint_data[i]["start"] && parseInt(streetNumber) <= my_precint_data[i]["end"]) && my_precint_data[i]["side"] == "both") {
                    selected_precinct = my_precint_data[i];
                }
                else if ((my_precint_data[i]["start"] == "" && my_precint_data[i]["end"] == "") && (street_side == my_precint_data[i]["side"])) {
                    selected_precinct = my_precint_data[i];
                }
            }
        }
        my_precint_info = precinctData[selected_precinct["precinct"]];
        precinct_number = selected_precinct["precinct"];
        district = my_precint_info["district"];

    }
    if (selected_precinct == null) {
        alert("Address not in Watertown")
    } else {

        rep_img = selected_precinct["image"]

        var modal = document.getElementById("modal-info");

        modal.innerHTML =
            '<div id="content">' +
            '<div id="bodyContent">' +
            createPrecinctDistrict(precinct_number, my_precint_info) +
            createPollingMap(my_precint_info) +
            "</div>" +
            "</div>" +
            // end-row

            createRepInfo(my_precint_info, 10) +

            '<h5 id="firstHeading" class="firstHeading mb-3 white-text"><b>At Large Representatives</b></h5>' +
            "</div>" +
            //   <!-- At Large Reps -->
            createAtLarge(atLargeData[0], 2) +
            createAtLarge(atLargeData[1], 3) +
            createAtLarge(atLargeData[2], 4) +
            createAtLarge(atLargeData[3], 5) +

            '<h5 id="firstHeading" class="firstHeading mb-3 white-text"><b>School Committee</b></h5>' +

            //   <!-- School Committee -->
            createSchoolCom(SchoolComData[0], 13) +
            createSchoolCom(SchoolComData[1], 14) +
            createSchoolCom(SchoolComData[2], 15) +
            createSchoolCom(SchoolComData[3], 16) +
            createSchoolCom(SchoolComData[4], 17) +
            createSchoolCom(SchoolComData[5], 18) +
            createSchoolCom(SchoolComData[6], 19) +
            //    end
            "</div>";

    }
}

all_checkboxes = ["#precinct1_chk", "#precinct2_chk", "#precinct3_chk", "#precinct4_chk", "#precinct5_chk", "#precinct6_chk", "#precinct7_chk", "#precinct8_chk", "#precinct9_chk", "#precinct10_chk", "#precinct11_chk", "#precinct12_chk"];



const btn1 = document.querySelector("#precinct1_chk");
btn1.onclick = () => {
    if (btn1.checked) {
        draw_precincts_1.setVisible(true);
    } else {
        draw_precincts_1.setVisible(false);
    }
};

const btn2 = document.querySelector("#precinct2_chk");
btn2.onclick = () => {
    if (btn2.checked) {
        draw_precincts_2.setVisible(true);
    } else {
        draw_precincts_2.setVisible(false);
    }
};
const btn3 = document.querySelector("#precinct3_chk");
btn3.onclick = () => {
    if (btn3.checked) {
        draw_precincts_3.setVisible(true);
    } else {
        draw_precincts_3.setVisible(false);
    }
};
const btn4 = document.querySelector("#precinct4_chk");
btn4.onclick = () => {
    if (btn4.checked) {
        draw_precincts_4.setVisible(true);
    } else {
        draw_precincts_4.setVisible(false);
    }
};
const btn5 = document.querySelector("#precinct5_chk");
btn5.onclick = () => {
    if (btn5.checked) {
        draw_precincts_5.setVisible(true);
    } else {
        draw_precincts_5.setVisible(false);
    }
};
const btn6 = document.querySelector("#precinct6_chk");
btn6.onclick = () => {
    if (btn6.checked) {
        draw_precincts_6.setVisible(true);
    } else {
        draw_precincts_6.setVisible(false);
    }
};
const btn7 = document.querySelector("#precinct7_chk");
btn7.onclick = () => {
    if (btn7.checked) {
        draw_precincts_7.setVisible(true);
    } else {
        draw_precincts_7.setVisible(false);
    }
};
const btn8 = document.querySelector("#precinct8_chk");
btn8.onclick = () => {
    if (btn8.checked) {
        draw_precincts_8.setVisible(true);
    } else {
        draw_precincts_8.setVisible(false);
    }
};
const btn9 = document.querySelector("#precinct9_chk");
btn9.onclick = () => {
    if (btn9.checked) {
        draw_precincts_9.setVisible(true);
    } else {
        draw_precincts_9.setVisible(false);
    }
};
const btn10 = document.querySelector("#precinct10_chk");
btn10.onclick = () => {
    if (btn10.checked) {
        draw_precincts_10.setVisible(true);
    } else {
        draw_precincts_10.setVisible(false);
    }
};
const btn11 = document.querySelector("#precinct11_chk");
btn11.onclick = () => {
    if (btn11.checked) {
        draw_precincts_11.setVisible(true);
    } else {
        draw_precincts_11.setVisible(false);
    }
};
const btn12 = document.querySelector("#precinct12_chk");
btn12.onclick = () => {
    if (btn12.checked) {
        draw_precincts_12.setVisible(true);
    } else {
        draw_precincts_12.setVisible(false);
    }
};
const btn_all = document.querySelector("#select_all_chk");
btn_all.onclick = () => {
    if (btn_all.checked) {
        set_all_chk(true)
    } else {
        set_all_chk(false)
    }
};

function set_all_chk(status) {
    var status = document.querySelector("#select_all_chk").checked ? true : false;
    for (var i = 0; i < all_precincts.length; i++) {
        all_precincts[i].setVisible(status);
        document.querySelector(all_checkboxes[i]).checked = status;
    }

}
function toggle_checkboxes(checkbox_id, precinct) {
    var my_btn = document.querySelector(checkbox_id);
    my_btn.onclick = () => {
        if (my_btn.checked) {
            precinct.setVisible(true);
        } else {
            precinct.setVisible(false);
        }
    };
}



function draw_my_precincts(precincts_coordinates, fill_color, title, color_str = "#FF0000") {
    var poly = new google.maps.Polygon({
        paths: precincts_coordinates,
        strokeColor: color_str,
        strokeOpacity: 0.2,
        strokeWeight: 0,
        fillColor: fill_color,
        fillOpacity: 0.35,
    });


    google.maps.event.addListener(poly, 'click', function (event) {
        document.getElementById("modal-title").innerHTML = "<b>Precinct " + title + "</b>";
        my_precint = precinctData[title];
        var modal = document.getElementById("modal-info");

        modal.innerHTML =
            '<div id="content">' +
            '<div id="bodyContent">' +
            createPrecinctDistrict(title, my_precint) +
            createPollingMap(my_precint) +
            "</div>" +
            "</div>" +
            // end-row
            createRepInfo(my_precint, 10) +

            '<h5 id="firstHeading" class="firstHeading mb-3 white-text"><b>Council President</b></h5>' +
            createAtLarge(atLargeData[5], 21) +
            '<h5 id="firstHeading" class="firstHeading mb-3 white-text"><b>At Large Representatives</b></h5>' +
            "</div>" +

            //   <!-- At Large Reps -->
            createAtLarge(atLargeData[0], 2) +
            createAtLarge(atLargeData[1], 3) +
            createAtLarge(atLargeData[2], 4) +
            createAtLarge(atLargeData[3], 5) +

            '<h5 id="firstHeading" class="firstHeading mb-3 white-text"><b>Town Manager</b></h5>' +
            createAtLarge(atLargeData[4], 20) +

            '<h5 id="firstHeading" class="firstHeading mb-3 white-text"><b>School Committee</b></h5>' +

            //   <!-- School Committee -->
            createSchoolCom(SchoolComData[0], 13) +
            createSchoolCom(SchoolComData[1], 14) +
            createSchoolCom(SchoolComData[2], 15) +
            createSchoolCom(SchoolComData[3], 16) +
            createSchoolCom(SchoolComData[4], 17) +
            createSchoolCom(SchoolComData[5], 18) +
            createSchoolCom(SchoolComData[6], 19) +
            //   School Committee end
            "</div>";

        $("#fluidModalInfo").modal('toggle')

    });


    // add color to on mouse events
    google.maps.event.addListener(poly, "mouseover", function () {
        this.setOptions({ fillColor: "#00FF00" });
    });

    google.maps.event.addListener(poly, "mouseout", function () {
        this.setOptions({ fillColor: fill_color });
    });
    return poly;
}

function createAtLarge(data, index) {

    //   <!-- Accordion card -->
    var innerHTML = '<div class="card mb-2">' +

        // <!-- Card header -->
        '<div class="card-header" role="tab" id="headingOne' + index + '"' + '>' +
        '<a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne' + index + '"' + 'aria-expanded="false"' +
        'aria-controls="collapseOne"' + index + '>' +
        '<h7 class="row container text-center">' +
        '<div class="col-sm-4">' +
        '<img src=' + data['image'] +
        ' class="img-fluid  rounded-circle"' +
        'alt=' + data['name'] + '>' +
        '</div>' +
        data['name'] + '<p class="white-text"> . <i class="fas fa-angle-down rotate-icon"></i></p>' +
        '</h7>' +
        '</div>' +
        '</a>' +
        // <!-- Card body -->
        ' <div id="collapseOne' + index + '"' + 'class="collapse" role="tabpanel" aria-labelledby="headingOne' + index + '"' + 'data-parent="#accordionEx">' +
        '<div class="card-body">' +
        "<p class='card-text'><i class='fas fa-envelope'></i> " + data['email'] + "</p>" +
        "<p class='card-text'><i class='fas fa-phone-alt'></i> " + data['phone'] + "</p>" +
        '</div>' +
        '<div>' +
        createSocialMedia(data) +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    //   <!-- Accordion card -->

    return innerHTML;
};

function createRepInfo(data, index) {

    const innerHTML = // <!-- Your Rep -->
        '<div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">' +
        //  <!-- Accordion card -->
        '<div class="card mb-2">' +

        // <!-- Card header -->
        '<div class="card-header" role="tab" id="headingOne' + index + '"' + '>' +
        '<a data-toggle="collapse" data-parent="#accordionEx" href="#collapse' + index + '"' + 'aria-expanded="false"' +
        'aria-controls="collapseOne' + index + '"' + '>' +
        '<h5 class="mb-0">' +
        'Representative' + ' ' + ' <i class="fas fa-angle-down rotate-icon"></i>' +
        '</h5>' +
        '</a>' +
        '</div>' +

        // <!-- Your Rep -->
        '<div id="collapse' + index + '"' + 'class="collapse show" role="tabpanel" aria-labelledby="headingOne"' + 'data-parent="#accordionEx">' +
        '<div class="card-body">' +
        '<div class="container col-sm-5 col-md-4 mb-3 text-center">' +
        '<img src="' + data["image"] + '" class="img-fluid z-depth-1 rounded-circle"' + 'alt=' + data["name"] + '>' +
        '</div>' +
        '<h5 class="card-title">' + data["rep"]["name"] + '</h5>' +
        '<a href="mailto:' + data["rep"]["email"] + '"' + "<button>" + data["rep"]["email"] + '</a>' +
        "<p class='card-text'><i class='fas fa-phone-alt'></i> " + data["rep"]["phone"] + "</p>" +
        createSocialMedia(data["rep"]) +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    return innerHTML;
};

function createPollingMap(data) {
    var innerHTML =

        '<div class="card map-card mb-3">' +
        '<div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 70%">' +
        '<iframe src="' + data["votingPlace"]["map"] + '"' + 'style="border:0" allowfullscreen></iframe>' +
        '</div>' +
        '<div class="card-footer">' +
        "<p class='card-title'>Polling Station</p>" +
        "<h6 class='card-subtitle mb-2 blue-text'>" + data["votingPlace"]["name"] + "</h6>" +
        "<h6 class='card-subtitle mb-2'>" + data["votingPlace"]["streetNumber"] + " " + data["votingPlace"]["streetName"].toLowerCase() + "</h6>" +
        "</div>";

    return innerHTML;
}
function createSchoolCom(data, index) {
    //   <!-- Accordion card -->
    var innerHtml = '<div class="card mb-2">' +

        // <!-- Card header -->
        '<div class="card-header" role="tab" id="heading' + index + '"' + '>' +
        '<a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne' + index + '"' + 'aria-expanded="false"' +
        'aria-controls="collapseOne' + index + '"' + '> ' +
        '<h7 class="mb-0 row container text-center">' +
        '<div class="col-sm-4">' +
        '<img src=' + data["image"] +
        ' class="img-fluid  rounded-circle"' +
        'alt=' + data["name"] + '>' +
        '</div>' +
        data["name"] + '<p class="white-text"> . <i class="fas fa-angle-down rotate-icon"></i></p>' +
        '</h7>' +
        '</a>' +
        '</div>' +

        // <!-- Card body -->
        ' <div id="collapseOne' + index + '"' + 'class="collapse" role="tabpanel" aria-labelledby="headingOne' + index + '"' + 'data-parent="#accordionEx">' +
        '<div class="card-body">' +
        '<h7>' + data["title"] + '</h7>' +
        "<p class='card-text'><i class='fas fa-envelope'></i> "
        + data["email"] + "</p>" +
        "<p class='card-text'><i class='fas fa-phone-alt'></i> "
        + data["phone"] + "</p>" +
        '<div class="mb-3">' +
        createSocialMedia(data) +
        '</div>' +
        '<div class="card-text">' +
        '<p>' + data["desc"] + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return innerHtml;
}
function createPrecinctDistrict(title, data) {
    var innerHTML = '<div class="row mb-3 text-center">' +
        '<div class="col-md-12 mb-1">' +
        "<div class='card shadow-0 z-depth-5'>" +
        '<div class="card-body">' +
        "<p class='card-title'>Precinct</p>" +
        "<h6 class='card-subtitle blue-text'>" + title + "</h6>" +
        "<p class='card-title'>District</p>" +
        "<h6 class='card-subtitle blue-text'>" + data['district'] + "</h5>" +
        '</div>' +
        '</div>' +
        '</div>' +
        "</div>";
    return innerHTML;
}

function CreateButton(controlDiv, map, title, button_text) {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.id = "trigger";
    controlUI.className = "z-depth-5 mr-3"
    controlUI.style.backgroundColor = "#334756";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 3px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.marginLeft = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = title;
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.style.color = "#fff";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = button_text;
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
        var modal = document.getElementById("candidate-info");
        // var president = election_candidates(CandidateData['president'], 50);
        // var candidate_at_large = election_candidates(CandidateData['candidatesatlg'], 51);
        // var districta = election_candidates(CandidateData['districta'], 61);
        // var districtb = election_candidates(CandidateData['districtb'], 64);
        // var districtc = election_candidates(CandidateData['districtc'], 69);
        // var districtd = election_candidates(CandidateData['districtd'], 75);
        // var school_com = election_candidates(CandidateData['school'], 85);
        // var library_trust = election_candidates(CandidateData['library'], 95);
        modal.innerHTML = president + candidate_at_large + districta + districtb + districtc + districtd + school_com + library_trust;

        $("#electionModalInfo").modal('toggle')

    });

}

function election_candidates(data, index, title) {
    var inner_htm = '<div class="card m-3">' +
        '<div class="card-body h5 blue-text" id="modal-info">' + data[0]['post'] +
        '<table class="table">' +
        '<thead class="text-center mx-5">' +
        '<tr class="text-center">' +
        '<th scope="col">Candidates</th>' +
        '<th scope="col">Seats<b class="blue-text"> ' + data[0]['seats'] + '</b> </th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

    for (let i = 1; i < data.length; i++) {
        inner_htm += createCandidate(data[i], index + i);
    };
    inner_htm +=

        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';
    return inner_htm;
}
function createCandidate(data, index) {
    //   <!-- Accordion card -->
    var innerHtml = '<tr>' +
        '<th scope="row">' +
        '<div>' +
        '<div class="mb-2">' +
        // <!-- Card header -->
        '<div role="tab" id="headingOne' + index + '"' + '>' +
        '<a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne' + index + '"' + 'aria-expanded="false"' +
        'aria-controls="collapseOne' + index + '"' + '> ' +
        '<h7 class="row">' +
        '<div class="col-md-2">' +
        '<img src=' + data["image"] +
        ' class="img-fluid  rounded-circle"' +
        'alt=' + data["name"] + '>' +
        '</div>' +
        data["name"] + '<p class="red-text">  <i class="fas fa-angle-down rotate-icon mx-3"></i></p>' +
        '</h7>' +
        '</a>' +
        '</div>' +

        // <!-- Card body -->
        ' <div id="collapseOne' + index + '"' + 'class="collapse" role="tabpanel" aria-labelledby="headingOne' + index + '"' + 'data-parent="#accordionEx">' +
        '<div class="container text-center mb-3">' +

        "<p class='card-text'><i class='fas fa-envelope mx-3'></i>"
        + data["email"] + "</p>" +
        "<p class='card-text'><i class='fas fa-phone-alt mx-3'></i>"
        + data["phone"] + "</p>" +
        '<div class="container mx-3">' +
        createSocialMedia(data) +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' + '</div></th>' +
        '<td class="text-info"><strong>' + data["desc"] + '</strong></td>' +
        '</tr>';
    return innerHtml;
}


function createSocialMedia(data) {
    // social media
    var innerHTML =
        '<div class="row col-md-12 text-center">' +
        // email
        '<div class="col-sm-3">' +
        '<a href="mailto:' + data["email"] + '"<button><i class="fas fa-envelope"></i></a>' +
        '</div>' +
        // Facebook 
        '<div class="col-sm-3">' +
        '<a style="color: #3b5998;" href="' + data["url"] + '"' +
        '<i class="fab fa-facebook-f fa-md"></i></a>' +
        '</div>' +

        // Twitter
        '<div class="col-sm-3">' +
        '<a style="color: #55acee;" href="#!" role="button">' +
        '<i class="fab fa-twitter fa-md"></i></a>' +
        '</div>' +
        // Instagram
        '<div class="col-sm-3">' +
        '<a style="color: #ac2bac;" href="#!" role="button">' +
        '<i class="fab fa-instagram fa-md"></i></a>' +
        '</div>' +
        '</div>'
    // end of social media
    return innerHTML
}