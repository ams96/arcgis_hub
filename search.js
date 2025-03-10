async function searchArcGIS() {
    let query = document.getElementById("searchInput").value.trim();
    let groupId1 = "cd0dc9bcfcd74d80b84545cec3f29e7e";
    let groupId2 = " 739da2491b674accadf423a011c8c72c";

    let url = `https://www.arcgis.com/sharing/rest/search?f=json&q=${query} AND (group:${groupId1} OR group:${groupId2})`;

       if (query === "") {
        alert("Please enter a search term.");
        return;
    }

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
