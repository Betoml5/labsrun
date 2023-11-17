export function displayModal(title, description) {
  const $modal = document.querySelector("#modal");
  $modal.innerHTML = "";
  const $title = document.createElement("h1");
  const $description = document.createElement("p");
  const $button = document.createElement("button");
  $button.textContent = "Cerrar";
  $button.addEventListener("click", () => {
    $modal.style = "display: none";
  });
  $title.textContent = title;
  $description.textContent = description;
  $modal.appendChild($title);
  $modal.appendChild($description);
  $modal.appendChild($button);
  $modal.style = "display: block";
}
