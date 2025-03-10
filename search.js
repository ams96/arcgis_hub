async function searchArcGIS() {
    let query = document.getElementById("searchInput").value.trim().toLowerCase();
    let groupId1 = "ea72855a87fb4898bc5d1810589761ce";
    let groupId2 = "077c20f4c75546ebb35bda0bd568dd35";
    
    if (query === "") {
        alert("Please enter a search term.");
        return;
    }

    // Build the URL for the search query
    let url = `https://sdi.liser.lu/portal/sharing/rest/search?f=json&q=${query}* AND (group:${groupId1} OR group:${groupId2})&token=z03igA4ddPZKlLcgJgWv7_hPmH2pw92lY44xVlatrbzZwyoYjdplSa8PD7TtG6IwLCXSJLA2cfNunDxy-dD8ceVTv7BRxC4-hgRsfpWPwDkLcCHg78NJhR3lk-m-yCvFWArb79FPBIZAsUtDNIKR5Vvheb1Sm8h2zMpUC6rxPdFK_aVgQ4h0R5ihGtyqIwe4`;

    // Log the URL to the console for debugging
    console.log("Constructed URL: ", url);
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Check if the response status is not ok
                console.error(`Error: Network response was not ok, status: ${response.status}`);
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let resultsList = document.getElementById("results");
            resultsList.innerHTML = "";

            if (data.results.length === 0) {
                resultsList.innerHTML = "<li>No results found.</li>";
                return;
            }

            // Loop through the results and display them
            data.results.forEach(item => {
                let listItem = document.createElement("li");
                let link = document.createElement("a");

                // Handle the URL: if item.url is not available, build the link manually
                link.href = item.url || `https://sdi.liser.lu/portal/home/item.html?id=${item.id}`;
                link.target = "_blank";
                link.textContent = item.title;

                listItem.appendChild(link);
                resultsList.appendChild(listItem);
            });
        })
        .catch(error => {
            // Handle errors in the fetch process
            console.error("Error fetching results:", error);
            document.getElementById("results").innerHTML = "<li>Error loading search results. Check console for more details.</li>";
        });
}

function resetSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}
