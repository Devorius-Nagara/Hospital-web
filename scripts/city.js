const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const closeBtn = document.getElementById('closeBtn');
const selectRegion = document.getElementById('searchRegion');
const selectDistrict = document.getElementById('searchDistrict');
const selectSettlement = document.getElementById('searchSettlment');
const selectHospital = document.getElementById('searchHospital');
const dataTable = document.getElementById('table');
const errorText = document.querySelector('.errorText');
let logged;

$(document).ready(function() {
    $('.select2').select2();
});



/** ЗМІНА ТЕМИ **/
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);

    if (themedata === "dark") {
        changeTheme()
    }
});
function changeTheme() {
    let themedata;

    if (css.href.match('styles/city-white.css')) {
        css.href = 'styles/city-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/city-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
}


/** Перехід на профіль **/
document.getElementById('profileCase').addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});
closeBtn.addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});



/** ЗАПИТИ **/
let token = localStorage.getItem('auth_token');
let locations;
let hospitals;
$.ajax({
    url: host + '/Locations',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        logged = true;
        console.log(data)
        locations = data;
        for(var regionNum = 0; regionNum < data.regions.length; regionNum++){
            var optionForRegion = document.createElement("option");
            optionForRegion.value = data.regions[regionNum].id;
            optionForRegion.text = data.regions[regionNum].name;
            selectRegion.add(optionForRegion);
        }
        for (var districtNum = 0; districtNum < data.districts.length; districtNum++){
            var optionForDistrict = document.createElement("option");
            optionForDistrict.value = data.districts[districtNum].regionId;
            optionForDistrict.text = data.districts[districtNum].name;
            selectDistrict.add(optionForDistrict);
        }
        for (var settlementNum = 0; settlementNum < data.settlements.length; settlementNum++) {
            var optionForSettlement = document.createElement("option");
            optionForSettlement.value = data.settlements[settlementNum].districtId;
            optionForSettlement.text = data.settlements[settlementNum].name;
            selectSettlement.add(optionForSettlement);
        }
    },
    error: function (error) {
        console.log(error)
    }
});
$.ajax({
    url: host + '/Hospitals',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        logged = true;
        console.log(data)
        hospitals = data;
        for (var HospitalNum = 0; HospitalNum < data.length; HospitalNum++) {
            var optionForHospital = document.createElement("option");
            optionForHospital.value = data[HospitalNum].id;
            optionForHospital.text = data[HospitalNum].name;
            selectHospital.add(optionForHospital);
        }
    },
    error: function (error) {
        console.log(error)
    }
});





const selectRegionQ = $('#searchRegion');
const searchDistrictQ = $('#searchDistrict');
const selectSettlmentQ = $('#searchSettlment');
const selectHospitalQ = $('#searchHospital');
const formSumbitDoc = document.getElementById('formSumbitDoc');

selectRegionQ.change(function() {
    let selectedRegion = $(selectRegionQ).find(':selected').val() || null;
    let selectedDistrict = $(searchDistrictQ).find(':selected').val() || null;
    let selectedSettlment = $(selectSettlmentQ).find(':selected').val() || null;
    let selectedHospital = $(selectHospitalQ).find(':selected').val() || null;

    var districtRemove = $("#searchDistrict option:not(:first)");
    districtRemove.remove();
    $("#searchDistrict").trigger("change");
    var settlmentRemove = $("#searchSettlment option:not(:first)");
    settlmentRemove.remove();
    $("#searchSettlment").trigger("change");
    var hospitalRemove = $("#searchHospital option:not(:first)");
    hospitalRemove.remove();
    $("#searchHospital").trigger("change");

    console.log(selectedRegion, selectedDistrict, selectedSettlment, selectedHospital)

    if (selectedRegion === null){
        for (var districtNum = 0; districtNum < locations.districts.length; districtNum++){
            var optionForDistrict = document.createElement("option");
            optionForDistrict.value = locations.districts[districtNum].regionId;
            optionForDistrict.text = locations.districts[districtNum].name;
            selectDistrict.add(optionForDistrict);
        }
        for (var settlementNum = 0; settlementNum < locations.settlements.length; settlementNum++) {
            var optionForSettlement = document.createElement("option");
            optionForSettlement.value = locations.settlements[settlementNum].districtId;
            optionForSettlement.text = locations.settlements[settlementNum].name;
            selectSettlement.add(optionForSettlement);
        }
        for (var HospitalNum = 0; HospitalNum < hospitals.length; HospitalNum++) {
            var optionForHospital = document.createElement("option");
            optionForHospital.value = hospitals[HospitalNum].id;
            optionForHospital.text = hospitals[HospitalNum].name;
            selectHospital.add(optionForHospital);
        }
    }

    for (var districtNum = 0; districtNum < locations.districts.length; districtNum++){
        if (locations.districts[districtNum].regionId === selectedRegion){

            var optionForDistrict = document.createElement("option");
            optionForDistrict.value = locations.districts[districtNum].regionId;
            optionForDistrict.text = locations.districts[districtNum].name;
            selectDistrict.add(optionForDistrict);

            for (var settlementNum = 0; settlementNum < locations.settlements.length; settlementNum++) {
                if (locations.settlements[settlementNum].districtId === locations.districts[districtNum].id){

                    var optionForSettlement = document.createElement("option");
                    optionForSettlement.value = locations.settlements[settlementNum].districtId;
                    optionForSettlement.text = locations.settlements[settlementNum].name;
                    selectSettlement.add(optionForSettlement);

                    for (var HospitalNum = 0; HospitalNum < hospitals.length; HospitalNum++) {
                        if (locations.settlements[settlementNum].name === hospitals[HospitalNum].settlementDesc){

                            var optionForHospital = document.createElement("option");
                            optionForHospital.value = hospitals[HospitalNum].id;
                            optionForHospital.text = hospitals[HospitalNum].name;
                            selectHospital.add(optionForHospital);
                        }

                    }
                }

            }
        }
    }
})
searchDistrictQ.change(function(){
    let selectedRegion = $(selectRegionQ).find(':selected').val() || null;
    let selectedDistrict = $(searchDistrictQ).find(':selected').text() || null;

    let selectedSettlment = $(selectSettlmentQ).find(':selected').val() || null;
    let selectedHospital = $(selectHospitalQ).find(':selected').val() || null;

    var settlmentRemove = $("#searchSettlment option:not(:first)");
    settlmentRemove.remove();
    $("#searchSettlment").trigger("change");
    var hospitalRemove = $("#searchHospital option:not(:first)");
    hospitalRemove.remove();
    $("#searchHospital").trigger("change");


    if (selectedDistrict === 'Район не вказаний'){
        selectedDistrict = null;


        for (var settlementNum = 0; settlementNum < locations.settlements.length; settlementNum++) {
            var optionForSettlement = document.createElement("option");
            optionForSettlement.value = locations.settlements[settlementNum].districtId;
            optionForSettlement.text = locations.settlements[settlementNum].name;
            selectSettlement.add(optionForSettlement);
        }
        for (var HospitalNum = 0; HospitalNum < hospitals.length; HospitalNum++) {
            var optionForHospital = document.createElement("option");
            optionForHospital.value = hospitals[HospitalNum].id;
            optionForHospital.text = hospitals[HospitalNum].name;
            selectHospital.add(optionForHospital);
        }
    }
    console.log(selectedRegion, selectedDistrict, selectedSettlment, selectedHospital)

    for (var districtNum = 0; districtNum < locations.districts.length; districtNum++){
        if (locations.districts[districtNum].name === selectedDistrict){
            for (var settlementNum = 0; settlementNum < locations.settlements.length; settlementNum++) {
                if (locations.settlements[settlementNum].districtId === locations.districts[districtNum].id){

                    var optionForSettlement = document.createElement("option");
                    optionForSettlement.value = locations.settlements[settlementNum].districtId;
                    optionForSettlement.text = locations.settlements[settlementNum].name;
                    selectSettlement.add(optionForSettlement);

                    for (var HospitalNum = 0; HospitalNum < hospitals.length; HospitalNum++) {
                        if (locations.settlements[settlementNum].name === hospitals[HospitalNum].settlementDesc){

                            var optionForHospital = document.createElement("option");
                            optionForHospital.value = hospitals[HospitalNum].id;
                            optionForHospital.text = hospitals[HospitalNum].name;
                            selectHospital.add(optionForHospital);
                        }

                    }
                }

            }
        }
    }
})
selectSettlmentQ.change(function(){
    let selectedRegion = $(selectRegionQ).find(':selected').val() || null;
    let selectedDistrict = $(searchDistrictQ).find(':selected').text() || null;
    if (selectedDistrict === 'Район не вказаний'){
        selectedDistrict = null;
    }
    let selectedSettlment = $(selectSettlmentQ).find(':selected').text() || null;
    if (selectedSettlment === 'Місто/нас.пункт не вказано'){
        selectedSettlment = null;
    }
    let selectedHospital = $(selectHospitalQ).find(':selected').val() || null;
    var hospitalRemove = $("#searchHospital option:not(:first)");
    hospitalRemove.remove();
    $("#searchHospital").trigger("change");

    if (selectedDistrict === 'Район не вказаний' || selectedSettlment === null){
        selectedDistrict = null;

        for (var HospitalNum = 0; HospitalNum < hospitals.length; HospitalNum++) {
            var optionForHospital = document.createElement("option");
            optionForHospital.value = hospitals[HospitalNum].id;
            optionForHospital.text = hospitals[HospitalNum].name;
            selectHospital.add(optionForHospital);
        }

    }

    console.log(selectedRegion, selectedDistrict, selectedSettlment, selectedHospital)

    for (var settlementNum = 0; settlementNum < locations.settlements.length; settlementNum++) {
        if (locations.settlements[settlementNum].name === selectedSettlment){

            for (var HospitalNum = 0; HospitalNum < hospitals.length; HospitalNum++) {
                if (locations.settlements[settlementNum].name === hospitals[HospitalNum].settlementDesc){

                    var optionForHospital = document.createElement("option");
                    optionForHospital.value = hospitals[HospitalNum].id;
                    optionForHospital.text = hospitals[HospitalNum].name;
                    selectHospital.add(optionForHospital);
                }

            }
        }

    }
})

formSumbitDoc.addEventListener('submit', function (){
    event.preventDefault();
    dataTable.innerHTML = "";
    let selectedHospital = $(selectHospitalQ).find(':selected').val() || $(selectHospitalQ).find('option').map(function() {
        return $(this).val();
    }).get().filter(function(val) {
        return val !== "";
    }) || null;
    console.log(selectedHospital);
    for (var HospitalNum = 0; HospitalNum < hospitals.length; HospitalNum++){
            for (let selectedHospitalNum = 0; selectedHospitalNum < selectedHospital.length; selectedHospitalNum++){

                if (selectedHospital[selectedHospitalNum] === hospitals[HospitalNum].id || selectedHospital === hospitals[HospitalNum].id && dataTable.innerHTML === ""){
                    var infoTitleDiv = $("<div>", {"class": "infoTitle"});
                    var leftInfoTitleDiv = $("<div>", {"class": "leftInfoTitle"});
                    var leftInfoTitleP = $("<p>").text();
                    var centerInfoTitleDiv = $("<div>", {"class": "centerInfoTitle"});
                    var infoTitleTextP = $("<p>", {"class": "infoTitleText"}).text("Заявка");
                    var regionDescP = $("<p>").text();
                    var settlementDescP = $("<p>").text();
                    var rightInfoTitleDiv = $("<div>", {"class": "rightInfoTitle"});
                    var rightInfoTitleP = $("<p>").text();

// Додавання дочірніх елементів до елементу з класом "infoTitle"
                    leftInfoTitleDiv.append(leftInfoTitleP);
                    centerInfoTitleDiv.append(infoTitleTextP, regionDescP, settlementDescP);
                    rightInfoTitleDiv.append(rightInfoTitleP);
                    infoTitleDiv.append(leftInfoTitleDiv, centerInfoTitleDiv, rightInfoTitleDiv);

// Додавання доч
                    var div = document.createElement('div');
                    $(div).addClass('infoCase');

                    var infoTitle = document.createElement('div');
                    $(infoTitle).addClass('infoTitle');

                    var leftInfoTitle = document.createElement('div');
                    $(leftInfoTitle).addClass('leftInfoTitle');
                    $(leftInfoTitle).append('<p>' + hospitals[HospitalNum].name + '</p>');
                    $(infoTitle).append(leftInfoTitle);

                    var centerInfoTitle = document.createElement('div');
                    $(centerInfoTitle).addClass('centerInfoTitle');
                    $(centerInfoTitle).append('<p class="infoTitleText">Місто/Нас.пункт</p>');
                    $(centerInfoTitle).append('<p>' + hospitals[HospitalNum].regionDesc + '</p>');
                    $(centerInfoTitle).append('<p>' + hospitals[HospitalNum].settlementDesc + '</p>');
                    $(infoTitle).append(centerInfoTitle);

                    var rightInfoTitle = document.createElement('div');
                    $(rightInfoTitle).addClass('rightInfoTitle');
                    $(rightInfoTitle).append('<p>Розгорнути</p>');
                    $(infoTitle).append(rightInfoTitle);

                    $(div).append(infoTitle);

                    var infoSpoiler = document.createElement('div');
                    $(infoSpoiler).addClass('infoSpoiler');

                    var infoSpoilerCase = document.createElement('div');
                    $(infoSpoilerCase).addClass('infoSpoilerCase');

                    var leftSpoilerTitle = document.createElement('div');
                    $(leftSpoilerTitle).addClass('leftSpoilerTitle');

                    var leftSpoilerTitle_LeftCase = document.createElement('div');
                    $(leftSpoilerTitle_LeftCase).addClass('leftSpoilerTitle_LeftCase');
                    $(leftSpoilerTitle_LeftCase).append('<p>' + hospitals[HospitalNum].name + '</p>');
                    $(leftSpoilerTitle_LeftCase).append('<p>' + hospitals[HospitalNum].typeDesc + '</p>');
                    $(leftSpoilerTitle).append(leftSpoilerTitle_LeftCase);

                    var contactInfo = document.createElement('div');
                    $(contactInfo).append('<p class="infoTitleText">Контактні дані</p>');
                    $(contactInfo).append('<p>' + hospitals[HospitalNum].contactNumber + '</p>');
                    $(contactInfo).append('<p>' + hospitals[HospitalNum].adressDesc + '</p>');
                    $(leftSpoilerTitle).append(contactInfo);

                    $(infoSpoilerCase).append(leftSpoilerTitle);

                    var centerSpoilerTitle = document.createElement('form');
                    $(centerSpoilerTitle).addClass('centerSpoilerTitle');
                    $(centerSpoilerTitle).append('<button class="infoBtns" id="GoToDoc" data-hospital-num="' + HospitalNum + '">Перейти до запису</button>');
                    $(infoSpoilerCase).append(centerSpoilerTitle);

                    var rightSpoilerTitle = document.createElement('form');
                    $(rightSpoilerTitle).addClass('rightSpoilerTitle');
                    $(rightSpoilerTitle).append('<p>' + hospitals[HospitalNum].additionalInformation + '</p>');
                    $(infoSpoilerCase).append(rightSpoilerTitle);

                    $(infoSpoiler).append(infoSpoilerCase);
                    $(div).append(infoSpoiler);

                    dataTable.appendChild(div);
                }
            }
    }
    /** ІНФО ПАНЕЛЬ **/
    $(document).ready(function (){
        $('.infoTitle').click(function (event){
            var isActive = $(this).hasClass('active');
            $(this).toggleClass('active');
            $(this).css('border-radius', '20px 20px 0px 0px');
            $(this).find('.rightInfoTitle').html(isActive ? '<p>Розгорнути</p>' : '<p>Згорнути</p>');
            $(this).next().slideToggle(300, function() {
                if (isActive) {
                    $(this).prev('.infoTitle').css('border-radius', '20px');
                    $(this).prev('.infoTitle').find('.rightInfoTitle').html('<p>Розгорнути</p>');
                }
            });
        });
    });
    if (dataTable.innerHTML === ""){
        errorText.textContent = 'Данних не знайдено';
        $("#errorWin").animate({top: '70'}, 400);
        setTimeout(function() {
            $("#errorWin").animate({top: '-100'}, 400);
        }, 5000);
    }
})


$(document).on('click', '#GoToDoc', function() {
    event.preventDefault();
    var hospitalNum = $(this).data('hospital-num');

    localStorage.setItem('hospitalId', hospitals[hospitalNum].id);
    window.location.href = "choosing.html";
});













