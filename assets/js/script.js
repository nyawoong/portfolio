const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    navigation.classList.toggle("open");
  });

  const menuLinks = document.querySelectorAll(".navigation a");

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("open");
    });
  });
}

/* 포트폴리오 */

const projectList = document.querySelector("#project-list");
const filterButtons = document.querySelectorAll(".filter-button");

let projects = [];

async function loadProjects() {
  try {
    const response = await fetch("./data/projects.json");

    if (!response.ok) {
      throw new Error("프로젝트 파일을 불러오지 못했습니다.");
    }

    projects = await response.json();

    renderProjects(projects);
  } catch (error) {
    console.error(error);

    projectList.innerHTML = `
      <p class="project-error">
        프로젝트를 불러오지 못했습니다.<br>
        GitHub Pages 또는 Live Server에서 확인해주세요.
      </p>
    `;
  }
}

function renderProjects(projectItems) {
  if (projectItems.length === 0) {
    projectList.innerHTML = `
      <p class="project-empty">
        해당 카테고리의 프로젝트가 없습니다.
      </p>
    `;

    return;
  }

  projectList.innerHTML = projectItems
    .map(function (project) {
      return `
        <article class="project-card">
          <a href="${project.link}">
            <div class="project-image-wrap">
              <img
                class="project-image"
                src="${project.image}"
                alt="${project.title}"
                onerror="
                  this.style.display='none';
                  this.nextElementSibling.style.display='flex';
                "
              >

              <div
                class="project-image-placeholder"
                style="display:none;"
              >
                PROJECT ${String(project.id).padStart(2, "0")}
              </div>

              <span class="project-category">
                ${project.categoryName}
              </span>
            </div>

            <div class="project-content">
              <h3 class="project-title">
                ${project.title}
              </h3>

              <p class="project-description">
                ${project.description}
              </p>

              <div class="project-info">
                <p>
                  <strong>Role</strong>
                  <span>${project.role}</span>
                </p>

                <p>
                  <strong>Tools</strong>
                  <span>${project.tools}</span>
                </p>
              </div>

              <span class="project-link">
                프로젝트 보기
              </span>
            </div>
          </a>
        </article>
      `;
    })
    .join("");
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const selectedFilter = button.dataset.filter;

    if (selectedFilter === "all") {
      renderProjects(projects);
      return;
    }

    const filteredProjects = projects.filter(function (project) {
      return project.category === selectedFilter;
    });

    renderProjects(filteredProjects);
  });
});

loadProjects();