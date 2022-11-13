const api_url = "https://restcountries.com/v2/all";
fetch(api_url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let countryData = data
        let lastSearch;
        const countryList = document.createElement("ul");
        document.getElementById("listContainer").appendChild(countryList);

        function checkRegion(region) {
            switch (region) {
                case "Africa":
                    return "blue"
                case "Asia":
                    return "red"
                case "Europe":
                    return "yellow"
                case "Americas":
                    return "green"
                case "Oceania":
                    return "purple"
            }
        }

        const worldMap = document.createElement("img");
        worldMap.src = new URL("assets/world_map.png", import.meta.url)
        worldMap.setAttribute("id", "worldMap")
        document.getElementById("imgContainer").appendChild(worldMap)

        countryData.sort((a, b) => {
            return a.population - b.population;
        });

        countryData.map(c => {
            const countryData = document.createElement("li");
            const contentContainer = document.createElement("dd")
            const populationContainer = document.createElement("dd")
            const content = document.createTextNode(c.name + " ");
            const population = document.createTextNode("Has a population of " + c.population + " people")
            const imgContainer = document.createElement("dd")
            const img = document.createElement("img");
            img.src = c.flag;
            img.setAttribute("class", "flags")
            contentContainer.appendChild(content);
            populationContainer.appendChild(population);
            imgContainer.appendChild(img)
            countryData.appendChild(contentContainer)
            countryData.appendChild(populationContainer)
            countryData.appendChild(imgContainer)
            countryData.setAttribute("class", checkRegion(c.region))
            countryList.appendChild(countryData);
        })
//----------------------------------------------------------------------------------------------//
        const displayCountry = (countrys) => {
            if (countrys.length !== 0) {
                document.getElementById("errorContainer").style.display = "none";
                document.getElementById("listContainer").style.display = "block";
            if (lastSearch !== document.getElementById("cSearch").value) {

                countryList.innerHTML = countrys
                    .map((countrys) => {
                        countrys.currency = "";
                        if (countrys.name !== "Antarctica") {
                            for (let i = 0; i < countrys.currencies.length; i++) {
                                countrys.currency = countrys.currency + countrys.currencies[i].name + " and "
                            }
                            countrys.currency = countrys.currency.substring(0, countrys.currency.length - 4);
                        } else {
                            countrys.currency = "Chickens"
                        }
                        return `
            <li class="country">
            <img src="${countrys.flag}" style="width: 50px; padding-top: 20px; row-gap: 20px">
                <h2>${countrys.name}</h2>
                <p>${countrys.name} is situated in ${countrys.region} It has a population of ${countrys.population} people.
                 The capital is ${countrys.capital} and you can pay with ${countrys.currency}</p>
            </li>
                `;
                    })
                    .join('');
            }
            } else {
                document.getElementById("errorContainer").style.display = "block";
                document.getElementById("listContainer").style.display = "none";
            }
        };

        const searchbar = document.createElement("input");
        searchbar.setAttribute("id", "cSearch");
        document.getElementById("search").appendChild(searchbar)

        const countryButton = document.createElement("button");
        countryButton.textContent = "Get country";
        countryButton.setAttribute("id", "countryButton");
        document.getElementById("cButton").appendChild(countryButton)


        document.getElementById("countryButton").addEventListener("click", (e) => {
            const searchString = document.getElementById("cSearch").value;
            const filteredCountry = countryData.filter((countrys) => {
                return countrys.name.toLowerCase().includes(searchString)
            })
            displayCountry(filteredCountry)
            lastSearch = document.getElementById("cSearch").value;
            document.getElementById("cSearch").value = ""
        })

        searchbar.addEventListener("keypress", (e) => {
            if (event.key === "Enter") {
                const searchString = e.target.value;
                const filteredCountry = countryData.filter((countrys) => {
                    return countrys.name.toLowerCase().includes(searchString)
                })
                displayCountry(filteredCountry)
                lastSearch = document.getElementById("cSearch").value;
                document.getElementById("cSearch").value = ""
            }
        });

    })

