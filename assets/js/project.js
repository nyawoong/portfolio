/* ----------------------------------
   1. 주소에서 프로젝트 번호 읽기
---------------------------------- */

const urlParams = new URLSearchParams(window.location.search);
const projectId = Number(urlParams.get("id"));

/* ----------------------------------
   2. 상세 내용을 넣을 HTML 요소 찾기
---------------------------------- */

const detailCategory = document.querySelector("#detail-category");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailCover = document.querySelector("#detail-cover");

const detailPeriod = document.querySelector("#detail-period");
const detailRole = document.querySelector("#detail-role");
const detailContribution = document.querySelector("#detail-contribution");
const detailClient = document.querySelector("#detail-client");

const detailOverview = document.querySelector("#detail-overview");
const detailProblem = document.querySelector("#detail-problem");
const detailSolution = document.querySelector("#detail-solution");
const detailResult = document.querySelector("#detail-result");
const detailTools = document.querySelector("#detail-tools");
const detailGallery = document.querySelector("#detail-gallery");

/* ----------------------------------
   3. JSON 파일 불러오기
---------------------------------- */

async function loadProjectDetail() {
  try {
    const response = await fetch("../data/projects.json");

    if (!response.ok) {
      throw new Error("프로젝트 데이터를 불러오지 못했습니다.");
    }

    const projects = await response.json();

    /* ----------------------------------
       4. 주소 번호와 같은 프로젝트 찾기
    ---------------------------------- */

    const project = projects.find(function (item) {
      return item.id === projectId;
    });

    if (!project) {
      showProjectError();
      return;
    }

    /* ----------------------------------
       5. 찾은 프로젝트를 화면에 출력
    ---------------------------------- */

    renderProjectDetail(project);
  } catch (error) {
    console.error(error);
    showProjectError();
  }
}

/* ----------------------------------
   프로젝트 내용을 HTML에 넣기
---------------------------------- */

function renderProjectDetail(project) {
  document.title = `${project.title} | NYAWOONG`;

  detailCategory.textContent =
    project.categoryName || "Project";

  detailTitle.textContent =
    project.title || "제목 없음";

  detailDescription.textContent =
    project.description || "";

  detailPeriod.textContent =
    project.period || "정보 없음";

  detailRole.textContent =
    project.role || "정보 없음";

  detailContribution.textContent =
    project.contribution || "정보 없음";

  detailClient.textContent =
    project.client || "비공개";

  detailOverview.textContent =
    project.overview || "프로젝트 소개를 준비 중입니다.";

  detailProblem.textContent =
    project.problem || "문제점 내용을 준비 중입니다.";

  detailSolution.textContent =
    project.solution || "해결 방법을 준비 중입니다.";

  detailResult.textContent =
    project.result || "결과 내용을 준비 중입니다.";

  detailTools.textContent =
    project.tools || "정보 없음";

  /* 대표 이미지 경로 변환 */
  const coverPath = convertImagePath(project.image);

  detailCover.src = coverPath;
  detailCover.alt = `${project.title} 대표 이미지`;

  detailCover.addEventListener("error", function () {
    this.style.display = "none";
    document.querySelector(".project-cover").classList.add("no-image");
  });

  renderGallery(project.detailImages || []);
}

/* ----------------------------------
   상세 이미지 목록 출력
---------------------------------- */

function renderGallery(images) {
  if (images.length === 0) {
    detailGallery.innerHTML = `
      <p class="gallery-empty">
        상세 이미지를 준비 중입니다.
      </p>
    `;

    return;
  }

  detailGallery.innerHTML = images
    .map(function (image, index) {
      return `
        <img
          src="${convertImagePath(image)}"
          alt="프로젝트 상세 이미지 ${index + 1}"
        >
      `;
    })
    .join("");
}

/* ----------------------------------
   이미지 경로를 상세페이지 기준으로 변환
---------------------------------- */

function convertImagePath(path) {
  if (!path) {
    return "";
  }

  /*
    메인용 경로:
    ./assets/img/example.jpg

    상세페이지에서 필요한 경로:
    ../assets/img/example.jpg
  */

  if (path.startsWith("./assets/")) {
    return path.replace("./assets/", "../assets/");
  }

  return path;
}

/* ----------------------------------
   프로젝트가 없을 때 오류 화면
---------------------------------- */

function showProjectError() {
  const projectDetail = document.querySelector("#project-detail");

  projectDetail.innerHTML = `
    <section class="project-error-page">
      <p class="project-label">ERROR</p>
      <h1>프로젝트를 찾을 수 없습니다.</h1>
      <p>
        주소의 프로젝트 번호가 잘못되었거나<br>
        프로젝트 정보가 존재하지 않습니다.
      </p>
      <a href="../index.html#portfolio">
        포트폴리오로 돌아가기
      </a>
    </section>
  `;
}

/* 실행 */

loadProjectDetail();