// Importing API REST of GitHub
import { Octokit, App } from "https://esm.sh/octokit"; 

// Setting the userAgent
const octokit = new Octokit({
  userAgent: "script.js/v1.2.3",
});

// Getting repos
try {
  const allRepositoriesFromGitHub = await octokit.request("GET /users/{username}/repos",
    {
      username: "t3staa"
    }
  );
  console.log(allRepositoriesFromGitHub);

  const repositories = allRepositoriesFromGitHub.data;
  console.log(repositories);

  let repositoriesInfo = [];
  repositories.forEach(repository => {
    repositoriesInfo.push({"name": repository.name, "link": repository.html_url, "desc": repository.description})
  });
  console.log(repositoriesInfo);

  const cardsRepositories = document.querySelector('#carousel');

  repositoriesInfo.forEach(repository => {
    cardsRepositories.innerHTML += `<li id="card">
                                      <img src="img/githubimg.png" alt="Projeto ${repository.name}">
                                      <h3><a href="${repository.link}" target="_blank">${repository.name}</a></h3>
                                      <p>${repository.desc}</p>
                                      <a href="${repository.link}" target="_blank" id="arrowBtn"><i class="fa-solid fa-arrow-right"></i></a>
                                    </li>`
  });

  const projects = document.querySelectorAll(".projects-items p");
  const LIMIT = 50;

  for (let p of projects){
    const aboveLimit = p.innerText.length > LIMIT;
    const dotsOrEmpty = aboveLimit ? '...' : '';
    p.innerText = p.innerText.substring(0, LIMIT) + dotsOrEmpty;
  }
} catch (error) {
  console.log(error);
  throw new Error(error);
}

const carousel = document.querySelector("#carousel");
const arrowBtns = document.querySelectorAll(".button-carousel");
const fisrtCardWidth = carousel.querySelector("#card").offsetWidth;

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -fisrtCardWidth : fisrtCardWidth;
  })
});