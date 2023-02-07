setInterval((hr,min,sec) => {
    console.log(hr,min,sec)
	d = new Date(); //object of date()
	hr_rotation = 30 * hr + min / 2; //converting current time
	min_rotation = 6 * min;
	sec_rotation = 6 * sec;

	hour.style.transform = `rotate(${hr_rotation}deg)`;
	minute.style.transform = `rotate(${min_rotation}deg)`;
	second.style.transform = `rotate(${sec_rotation}deg)`;

}, 1000);

const api ={
    key:"E2NZDDYS029S",
    base:"http://api.timezonedb.com"

}
const searchbox=document.getElementById("search");
console.log(searchbox)
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}
function getResults(query){
    fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${api.key}&format=json&by=zone&zone=${query}
    `)
    .then(time =>{
        return time.json();
   }).then(displayResults);
}

function displayResults (time){
    console.log("here");
    console.log(time.formatted);
    let arr=time.formatted.split(" ");
    console.log(arr);
    let city = document.querySelector('.date');
    console.log(city);
    city.innerText=`${arr[0]}`;

    let arr2=arr[1
    ].split(":");
    let hours=arr2[0]
    console.log(hours);
    setInterval(parseInt(hours),parseInt(arr2[1]),parseInt(arr2[2]));
    if(parseInt(hours)>12){
        console.log("Afternoon")
        document.body.className = "night";
    }
    else{
        console.log("Forenoon")
        document.body.className="day";
    }

    let city2 = document.querySelector('.city');
    city2.innerText=`${time.countryName}`

    let city3 = document.querySelector('.time');
    city3.innerText=`${arr[1]}`

    
    let now = new Date();
    let date = document.querySelector('.location.date');
    date.innerText = dateBuilder(now);

	


function dateBuilder(d){
    let months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return`${day} ${date} ${month} ${year}`;
}
}
 

