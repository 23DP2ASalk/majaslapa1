function showCatFact() {
    fetch("https://catfact.ninja/fact")
        .then(response => response.json())
        .then(data => {
            document.getElementById("catFact").innerText = data.fact;
        })
        .catch(error => console.error("Kļūda:", error));
}

document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});