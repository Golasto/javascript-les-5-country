async function getApi() {
    const api_url = "https://restcountries.com/v2/all";
    let data = "";
    await axios.get(api_url).then(response => {
        data = response.data

    })
    return data
}
let countryData = await getApi("all")

const countryList = document.createElement("ul");
document.getElementById("listContainer").appendChild(countryList)

function checkRegion(region){
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
worldMap.src = "assets/world_map.png"
worldMap.setAttribute("id", "worldMap")
document.getElementById("imgContainer").appendChild(worldMap)

countryData.sort((a,b) => {
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


