$(document).ready(function() {
  $('#searchUser').on('keyup', function(e) {
    let username = e.target.value;

    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '34d827cb218e815f5ceb',
        client_secret: 'c0dd5a4cef74c9f2367766ba8a8beae7010d8e81'
      }
    }).done(function(user) {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '34d827cb218e815f5ceb',
          client_secret: 'c0dd5a4cef74c9f2367766ba8a8beae7010d8e81'
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $('#repos').append(`<ul class="list-group mb-3">
            <li class="list-group-item">${repo.name}</li>
            <li class="list-group-item">${repo.description}</li>
            <li class="list-group-item">Forks: ${repo.forks_count}</li>
            <li class="list-group-item"><a href="${
              repo.html_url
            }">${repo.name}</a></li>

          </ul>
          `);
        });
      });
      $('#profile').html(`
      <div class="card">
     <div class="d-flex">
     <div>
      <img class="card-img-top img-fluid" src="${
        user.avatar_url
      }" alt="Card image cap" style="width:100px;"></div><div>
       Email: ${user.email}, Company: ${user.company}</div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${user.name}</h4>
        <p class="card-text">
    ${user.bio}
        </p>
        <span class="badge badge-danger p-2">Public Repos: ${
          user.public_repos
        }</span>
        <span class="badge badge-primary p-2">Public Gists: ${
          user.public_gists
        }</span>
        <span class="badge badge-secondary p-2">Followers: ${
          user.followers
        }</span>
        <span class="badge badge-info p-2">Following:${user.following}</span>
<br>
        <a href="${
          user.html_url
        }" target="_blank" class="btn btn-primary mt-2">View Profile</a>
      </div>
    </div>
<h3 class="page-header">Latest Repos</h3>
<div id="repos"></div>
  `);
    });
  });
});
