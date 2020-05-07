function fetchRepos(name) {
    var username = name;
    info(name);
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
                var repoList = '<center><div class="row"><div class="col-lg-3 image-div"><img class="pt-4 mt-5 pb-2" src="' + repo[0].owner.avatar_url + '" width="250px" style="border-radius:50%"><br><br><p class="nameg">'+ nameg + '&nbsp;<a href="'+repo[0].owner.html_url + '" class="link">(@'+ repo[0].owner.login +')</a></p><div class="data mx-3"><table class="user"><tr><td colspan="2" class="pt-4">'+ publicr +'</td></tr><tr><td class="pb-4">Public Repositories</td></tr></table><table class="user" cellspacing="5" ><tr><td>'+ followers +'</td><td>'+ following +'</td></><tr><td class="px-4 pb-5">Followers</td><td class="px-4 pb-5">Following</td></tr></table></div></div><div class="col-lg-9"><br><h5 class ="mt-4" style="color:white;">Their Awesome Work</h5><div class="card-columns py-4 mt-4 px-4">';
                for (index = 0; index < repo.length; index++) {
                    repoList += `<div class="card">
           <div class="card-body">
           <h5 class="card-title"><a href="${repo[index].html_url}">${repo[index].name}</a></h5>
           <p>Last updated on : <font style="color:rgb(233, 199, 87)">${repo[index].updated_at}</font> </p>
           <!--<p class="card-text">${repo[index].description ? repo[index].description : ""}</p>-->
           <p><i class="fa fa-star">&nbsp;${repo[index].stargazers_count}&nbsp;&nbsp;&nbsp;&nbsp;</i>
           <i class="fa fa-code-fork">&nbsp;${repo[index].forks_count}&nbsp;</i></p>`
                    if (repo[index].language != null) {
                        repoList += `<p>Main language used is <font style="color:rgb(255, 123, 0);">${repo[index].language}</font></p>`
                    }
                    repoList += `</div></div><br>`
                }

                repoList += '</div></div></div></center>';
                document.getElementById('info').innerHTML = repoList;
            }


        })
        .catch(error => console.log('error', error));
}

let user;
let followers;
let following;
let publicr;
let nameg;

function info(name) {
    var username = name;
    fetch("https://api.github.com/users/" + username, {
            method: 'GET'
        })
        .then(response => response.text())
        .then((result) => {
            user = JSON.parse(result);
            followers = user.followers;
            following = user.following;
            publicr = user.public_repos;
            nameg = user.name ? user.name : "";
        })
        .catch(error => console.log('error', error));
}


