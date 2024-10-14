let countryName = new URLSearchParams(location.search).get("name");
const mode = document.querySelector(".mode");

async function countryData() {
    let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    let data = await response.json();
    // console.log(data[0]);

    let languages = Object.values(data[0].languages);
    languages = languages.join(", ")

    let subRegion = data[0].subregion;
    if(subRegion && subRegion.length > 0) {
        subRegion;
    } else {
        subRegion = "N/A";
    }

    let img = document.querySelector("img");
    img.src=data[0].flags.svg;

    let countryDetails = document.querySelector(".country-details");
    // console.log(countryDetails);
    let countryText = document.createElement("div");
    countryText.classList.add("country-text");
    countryDetails.append(countryText);

    let inpText = `
            <h1>${data[0].name.common}</h1>
            <p><b>Capital :</b> ${data[0].capital?.[0]}</p>
            <p><b>Population :</b> ${data[0].population.toLocaleString("en-IN")}</p>
            <p><b>Region :</b> ${data[0].region}</p>
            <p><b>Sub Region :</b> ${subRegion}</p>
            <p><b>Area :</b> ${data[0].area.toLocaleString("en-IN")} sq km</p>
            <p><b>Languages :</b> ${languages}</p>
            <p><b>Car Side :</b> ${data[0].car.side}</p>
            <a href=${data[0].maps.googleMaps} class="g-map">View on Google Map</a>
            <p class=border><b>Borders :</b></p>
        `;
    countryText.innerHTML=inpText;
    let border = document.querySelector(".border");
    if(data[0].borders && data[0].borders.length > 0) {
        data[0].borders.forEach((ele)=> {
        fetch(`https://restcountries.com/v3.1/alpha/${ele}`)
        .then((response)=> {
            return response.json();
        }).then(([data])=> {
            // console.log(data);
            const borderAnchor = document.createElement('a');
            borderAnchor.classList.add("BorderBtn");
            borderAnchor.href = `country.html?name=${data.name.common}`;
            borderAnchor.innerText += data.name.common;
            border.append(borderAnchor);
        });
    });
    } else {
        border.innerHTML += "N/A";
    }
}
countryData();


if(mode) {
    mode.addEventListener("click",()=> {
        document.body.classList.toggle("dark");
        if(document.body.classList.contains("dark")) {
            mode.innerHTML = '<i class="bi bi-sun"></i> Light Mode';
        } else {
            mode.innerHTML = '<i class="bi bi-moon-stars"></i> Dark Mode';
        }
    })
}