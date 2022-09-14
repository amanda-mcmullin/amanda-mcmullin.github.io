const repoSection = document.querySelector("#repo-section")
const profileSection = document.querySelector("#profile-section")

// fetching profile information
let githubUrl = "https://api.github.com/users/amanda-mcmullin"
fetch(githubUrl, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
})
    .then(function(response) {
        // the response is the promised data
        return response.json()
        // put the response in JSON format
    })
    .then(function (data){
        // data refers to what the above promise returned (reponse.json())

        // Profile Name
        let nameElement = document.createElement("h3")
        nameElement.classList.add("header")
        nameElement.innerText = data.name
        profileSection.appendChild(nameElement)

        // Profile Picture
        let imageElement = document.createElement("img")
        imageElement.classList.add("header")
        imageElement.src = data.avatar_url
        profileSection.appendChild(imageElement)

        // My Location
        let locationElement = document.createElement("p")
        locationElement.classList.add("location")
        locationElement.innerText = `\nLocation: ${data.location}`
        profileSection.appendChild(locationElement)

        // GitHub URL
        let urlElement = document.createElement("p");
        urlElement.classList.add("giturl")
        urlElement.href = data.html_url;
        urlElement.innerText = `GitHub URL:  ${data.login}`;
        profileSection.appendChild(urlElement)

        // GitHub Username
        let usernameElement = document.createElement("p")
        usernameElement.classList.add("username")
        usernameElement.href = data.html_url
        usernameElement.innerText = `GitHub username: ${data.login}`
        profileSection.appendChild(usernameElement)
    })

// fetching repos
let githubRepoUrl = "https://api.github.com/users/amanda-mcmullin/repos"
fetch(githubRepoUrl, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
})
    .then(function(response) {
        return response.json()
    })
    .then(function (repoArray){
        buildRepos(repoArray)
    })

    function buildRepos(repoData) {
        let names = []
        for (let repo of repoData) {
            buildRepoElement(repo)
            names.push(repo.name)
        }} 

function buildRepoElement(repo) {
    let el = document.createElement("a")
    el.href = repo.html_url
    el.innerText = repo.name 
    repoSection.appendChild(el)
    return el
}
