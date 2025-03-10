async function searchArcGIS() {
    let query = document.getElementById("searchInput").value.trim();
    let groupId1 = "ea72855a87fb4898bc5d1810589761ce";
    let groupId2 = "077c20f4c75546ebb35bda0bd568dd35";
    
       if (query === "") {
        alert("Please enter a search term.");
        return;
    }
//check URL
    let url = `https://sdi.liser.lu/sharing/rest/search?f=json&q=${query} AND (group:${groupId1} OR group:${groupId2})`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let resultsList = document.getElementById("results");
            resultsList.innerHTML = ""; // Clear previous results

            if (data.results.length === 0) {
                resultsList.innerHTML = "<li>No results found.</li>";
                return;
            }

            data.results.forEach(item => {
                let listItem = document.createElement("li");
                let link = document.createElement("a");
                link.href = item.url || `https://www.arcgis.com/home/item.html?id=${item.id}`;
                link.target = "_blank";
                link.textContent = item.title;
                listItem.appendChild(link);
                resultsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching results:", error);
            document.getElementById("results").innerHTML = "<li>Error loading search results.</li>";
        });
}

function resetSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}
