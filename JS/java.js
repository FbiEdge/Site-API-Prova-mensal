function searchCities() {
    var countryCode = document.getElementById("cidadeInput").value.toUpperCase();
    fetch(`https://api.citybik.es/v2/networks`)
        .then(response => response.json())
        .then(data => mostrarCidades(data, countryCode))
        .catch(error => console.error('Erro:', error));
}

function mostrarCidades(data, countryCode) {
    var procurar = document.getElementById("procurar");
    procurar.innerHTML = "";

    var redes = data.networks.filter(rede => 
        rede.location.country.toUpperCase() === countryCode
    );

    if (redes.length === 0) {
        procurar.innerHTML = "<p>Nehuma citybike encontrada ou esse pais não existe .</p>";
        return;
    }

    redes.forEach(rede => {
        var cidadeDiv = document.createElement("div");
        cidadeDiv.classList.add("cidade");
        cidadeDiv.innerHTML = `<h2>${rede.location.city}</h2><p>${rede.name}</p>`;
        procurar.appendChild(cidadeDiv);
    });
}
