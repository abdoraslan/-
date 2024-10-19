function getTime() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

document.getElementById("time").innerHTML += getTime();

document.getElementById("fetch-times").addEventListener('click', function() {
    let city = document.getElementById("city-select").value;
    fetchPrayerTimings(city, getTime());
});

function fetchPrayerTimings(city, time) {
    axios.get(`https://api.aladhan.com/v1/timingsByCity/${time}?city=${city}&country=Egypt&method=5`)
    .then(function(response) {
        let initialData = response.data;
        let finalData = initialData["data"]["timings"];
        document.getElementById("bottom").innerHTML = `
            <div class="prayer-times">
                <h2>Prayer Times for ${city}</h2>
                <h3><span>Fajr:</span> ${finalData.Fajr}</h3>
                <h3><span>Sunrise:</span> ${finalData.Sunrise}</h3>
                <h3><span>Dhuhr:</span> ${finalData.Dhuhr}</h3>
                <h3><span>Asr:</span> ${finalData.Asr}</h3>
                <h3><span>Maghrib:</span> ${finalData.Maghrib}</h3>
                <h3><span>Isha:</span> ${finalData.Isha}</h3>
            </div>`;
    })
    .catch(function(error) {
        console.log(error);
    });
}

// Fetch prayer times for Cairo by default
fetchPrayerTimings("Cairo", getTime());