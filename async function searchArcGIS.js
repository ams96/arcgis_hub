async function searchArcGIS() {
    let query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    let url = `https://www.arcgis.com/sharing/rest/search?q=${query}*&f=json`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let resultsList = document.getElementById("results");
        resultsList.innerHTML = "";

        if (data.results && data.results.length > 0) {
            data.results.forEach(item => {
                let li = document.createElement("li");
                li.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a>`;
                resultsList.appendChild(li);
            });
        } else {
            resultsList.innerHTML = "<li>Aucun résultat trouvé</li>";
        }
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
}
console.log("JavaScript file is connected!");
