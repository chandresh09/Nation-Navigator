let div = document.querySelector(".countries-container");
const searchInput = document.querySelector(".search-Box");
const select = document.querySelector("#region");
const mode = document.querySelector(".mode");
const heading = document.querySelector(".heading");
let allData;

fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
        return res.json();
    }).then((data) => {
        countriesData(data);
        allData = data;
    })

function countriesData(data) {
    div.innerHTML = '';

    if (data && data.length > 0) {
        heading.innerHTML = "<h1>Countries</h1>";
        data.forEach((val) => {
            let card = document.createElement("a");
            card.classList.add("card");

            let inpText = `
            <img src=${val.flags.svg}>
            <p><b>Name </b> : ${val.name.common}</p>
            <p><b>Capital </b> : ${val.capital?.[0]}</p>
            <p><b>Population </b> : ${val.population.toLocaleString("en-IN")}</p>`;
            card.innerHTML = inpText;
            card.href = `country.html?name=${val.name.common}`;
            div.append(card);
        });
    } else {
        heading.innerHTML = "<h1>No Country Found!</h1>";
    }
}

searchInput.addEventListener("input", (e) => {
    let FilteredData = allData.filter((value) => {
        console.log(e.target.value);
        return value.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    });
    countriesData(FilteredData);
})

select.addEventListener("change", (e) => {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((res) => {
            return res.json();
        }).then((data) => {
            countriesData(data);
        });
})


if (mode) {
    mode.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            mode.innerHTML = '<i class="bi bi-sun"></i> <span class="mode-text"> Light Mode</span>';
        } else {
            mode.innerHTML = '<i class="bi bi-moon-stars"></i><span class="mode-text"> Dark Mode</span>';
        }
    })
}