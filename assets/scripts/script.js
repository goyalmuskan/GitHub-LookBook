function fetchRepos(name) {
    var username = name;
    fetch("https://api.github.com/users/" + username + "/repos?per_page=150", {
            method: 'GET'
        })
        .then(response => response.text())
        .then((result) => {
            var repo = JSON.parse(result);
            if (repo.length == 0) {
                document.getElementById('info').innerHTML = "<p>No repositories found.</p>";
                document.getElementById('info').style.backgroundColor = "transparent";
            } else {
                document.getElementById('main').innerHTML = "";
                document.getElementById('hidden-sec').style.display = "inline"
                document.getElementById('info').style.backgroundColor = "rgba(0, 0, 0, 0.74)";
                var repoList = '<center><div class="row"><div class="col-lg-3"><img class="py-4 mt-4" src="'+ repo[0].owner.avatar_url + '" width="250px" style="border-radius:50%"></div><div class="col-lg-9"><br><h5 style="color:white;">Their Awesome Work</h5><div class="card-columns py-4 mt-4 px-3">';
                for (index = 0; index < repo.length; index++) {
                    repoList += `<div class="card" style="width: 18rem;">
           <div class="card-body">
           <h5 class="card-title">${repo[index].name}</h5>
           <p class="card-text">${repo[index].description ? repo[index].description : ""}</p>
           <p><i class="fa fa-star">&nbsp;${repo[index].stargazers_count}&nbsp;</i>
           <i class="fa fa-code-fork">&nbsp;${repo[index].forks_count}&nbsp;</i></p>
           <a href="${repo[index].html_url}">VISIT THE REPO</a>
           </div>
           </div>
           <br>`
                }
                repoList += '</div></div></div></center>';
                document.getElementById('info').innerHTML = repoList;
            }
        
       
        })
        .catch(error => console.log('error', error));
}