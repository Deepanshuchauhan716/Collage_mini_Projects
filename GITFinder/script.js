const inputValue = document.getElementById("first-inp");
const SearchBtn = document.getElementById("searchbtn");
const card = document.getElementById("result");
const repoListContainer = document.getElementById("repo-list-container");

SearchBtn.addEventListener('click', async function (event) {
    const username = inputValue.value.trim();

    if (username === "") {
        alert("Please enter a valid username");
        return;
    }

    card.style.display = "block";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            alert("User not found!");
            card.style.display = "none";
            return;
        }

        const data = await response.json();

        document.getElementById("user-avatar").src = data.avatar_url;
        document.getElementById("user-name").innerText = data.name || data.login;
        document.getElementById("user-login").innerText = "@" + data.login;
        document.getElementById("user-bio").innerText = data.bio || "No bio available";
        document.getElementById("user-location").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.location || "Unknown"}`;

        const userLink = document.getElementById("user-link");
        userLink.href = data.html_url;
        userLink.target = "_blank";
        userLink.innerHTML = `<i class="fa-solid fa-link"></i> ${data.html_url.replace("https://", "")}`;

        document.getElementById("user-repos").innerText = data.public_repos;
        document.getElementById("user-followers").innerText = data.followers;
        document.getElementById("user-following").innerText = data.following;
        document.getElementById("user-gists").innerText = data.public_gists;
        document.getElementById("user-about-bio").innerText = data.bio || "No bio available.";

        const repoResult = await fetch(data.repos_url);

        if (repoResult.ok) {
            const repos = await repoResult.json();

            repoListContainer.innerHTML = "";

            if (repos.length > 0) {
                const languages = new Set();

                for (let i = 0; i < repos.length; i++) {
                    const repoDiv = document.createElement("div");
                    repoDiv.classList.add("repo-first");

                    repoDiv.innerHTML = `
                            <div class="repo-icon">
                                <i class="fa-solid fa-file-code"></i>
                                <div style="overflow: hidden;">
                                    <h4>${repos[i].name}</h4>
                                </div>
                            </div>
                            <div class="repo-star">
                                <i class="fa-solid fa-star"></i>
                                ${repos[i].stargazers_count}
                            </div>
                        `;
                    repoListContainer.appendChild(repoDiv);

                    if (repos[i].language) {
                        languages.add(repos[i].language);
                    }
                }

                const tagsContainer = document.getElementById("user-tags");
                tagsContainer.innerHTML = "";

                if (languages.size === 0) {
                    tagsContainer.innerHTML = `<span>No languages found</span>`;
                } else {
                    languages.forEach(lang => {
                        const span = document.createElement("span");
                        span.innerText = lang;
                        tagsContainer.appendChild(span);
                    });
                }

            } else {
                repoListContainer.innerHTML = "<p>No repositories found</p>";
                document.getElementById("user-tags").innerHTML = `<span>No languages found</span>`;
            }
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Network error, please try again.");
        card.style.display = "none";
    }
});
