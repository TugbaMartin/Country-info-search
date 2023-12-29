const countryInput = document.getElementById('countryInput');
const searchForm = document.getElementById('searchForm');
const flag = document.getElementById('flag');
const name = document.getElementById('name');
const capital = document.getElementById('capital');
const continent = document.getElementById('continent');
const population = document.getElementById('population');
const currency = document.getElementById('currency');
const currencyShort = document.getElementById('CurrencyShort');
const language = document.getElementById('language');
const searchResult = document.getElementById('search_result');
const errorMessage = document.getElementById('error');

searchForm.addEventListener('submit', (event) => {
	event.preventDefault();
	let countryName = countryInput.value;
	let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

	fetch(finalURL)
		.then((response) => {
			if (response.status !== 200) {
				throw new Error('Network response was not ok.');
			} else {
                return response.json();
            }
		})
		.then((data) => {
			if (data.length === 0) {
				throw new Error('No data found for the specified country.');
			}

			searchResult.style.display = 'block';
			const countryData = data[0];
			console.log(countryData);
			flag.src = countryData.flags.svg;
			name.innerHTML = countryData.name.common;
			capital.innerHTML = countryData.capital[0];
			continent.innerHTML = countryData.region;
			population.innerHTML = countryData.population;
			currency.innerHTML =
				countryData.currencies[Object.keys(countryData.currencies)[0]].name;
			currencyShort.innerHTML = Object.keys(countryData.currencies)[0];
			language.innerHTML = Object.values(countryData.languages).toString();
			countryInput.value = '';
			errorMessage.style.display = 'none'; // Hide error message if displayed
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
			if (error.message === 'No data found for the specified country.') {
				errorMessage.innerText = error.message;
			} else {
				errorMessage.innerText = 'Error fetching data. Please try again.';
			}
            searchResult.style.display = 'none';
			errorMessage.style.display = 'block'; // Display error message
			clearSearchResult();
		});
});

// Function to clear search result fields
function clearSearchResult() {
	flag.src = '';
	name.innerHTML = '';
	capital.innerHTML = '';
	continent.innerHTML = '';
	population.innerHTML = '';
	currency.innerHTML = '';
	currencyShort.innerHTML = '';
	language.innerHTML = '';
}
