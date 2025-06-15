document.addEventListener('DOMContentLoaded', function() {
    
// selectors
    
    const form = document.querySelector('#github-form')
    const userList = document.querySelector('#user-list')
    const reposList = document.querySelector('#repos-list')

// functions

    function displayUsers(users) {
        userList.innerHTML = ''

        users.forEach(user => {
            const li = document.createElement('li')
            
            li.innerHTML = `
                <img src='${user.avatar_url}' width='25'/>
                <a href='${user.html_url}'>${user.login}</a>
                <button>View Repos</button>
                `
            userList.appendChild(li)

            li.querySelector('button').addEventListener('click', () => {
                fetchRepos(user.login)
            })
        })
    }

    function fetchUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.items)
            displayUsers(data.items)
        })
    }

    function displayRepos(repos) {
        reposList.innerHTML = ''

        repos.forEach(repo => {
            const li = document.createElement('li')
            li.innerHTML = `<a href='${repo.html_url}'>${repo.name}</a>`
            reposList.appendChild(li)
        })
    }

    function fetchRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(data => displayRepos(data))
    }

// event listeners

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const searchValue = document.querySelector('#search').value
        fetchUsers(searchValue)
    })
})
    
