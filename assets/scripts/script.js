function fetchRepos(e) {
    var username = document.getElementById('name').value;
    fetch("https://api.github.com/users/"+username+"/repos?per_page=150", {method : 'GET'})
    .then(response => response.text())
    .then((result) => {
        var repo = JSON.parse(result);
        if(repo.length == 0)
        {
            document.getElementById('no-user').innerHTML = "No repositories found.";   
        }
        else
        {
        window.location.replace("info.html");
        var repoList = '<div class="container"><center>';
        for (index = 0; index < repo.length; index++) {
           repoList += `<div class="card" style="width: 18rem;">
           <div class="card-body">
           <h5 class="card-title">${repo[index].name}</h5>
           <p class="card-text">${repo[index].description ? repo[index].description : ""}</p>
           <p><i class="fa fa-star">&nbsp;${repo[index].stargazers_count}&nbsp;</i>
           <i class="fa fa-code-fork">&nbsp;${repo[index].forks_count}&nbsp;</i></p>
           <a href="${repo[index].html_url}" class="btn btn-primary">VISIT THE REPO</a>
           </div>
           </div>
           <br>`
        }
        repoList += '</center></div>';
        document.getElementById('info').innerHTML = repoList;
        }
    })
    .catch(error => console.log('error', error));
}