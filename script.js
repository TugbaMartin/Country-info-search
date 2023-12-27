const countryInput = document.getElementById("countryInput");
const search = document.getElementById("search");
const flag = document.getElementById("flag");
const name = document.getElementById("name");
const capital = document.getElementById("capital");
const continent = document.getElementById("continent");
const population = document.getElementById("population");
const currency = document.getElementById("currency");
const currencyShort = document.getElementById("CurrencyShort");
const language = document.getElementById("language");
const searchResult = document.getElementById("search_result");

search.addEventListener("click", () => {
    let countryName = countryInput.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            searchResult.style.display = 'block';
            const countryData = data[0];
            console.log(countryData);
            flag.src = countryData.flags.svg;
            name.innerHTML = countryData.name.common;
            capital.innerHTML = countryData.capital[0];
            continent.innerHTML = countryData.region;
            population.innerHTML = countryData.population;
            currency.innerHTML = countryData.currencies[Object.keys(countryData.currencies)[0]].name;
            currencyShort.innerHTML = Object.keys(countryData.currencies)[0];
            language.innerHTML = Object.values(countryData.languages).toString();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
});
