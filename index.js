window.setInterval(() => {
  if (!dlButtonAlreadyPresent() && moreThanOneDlLink() && allLinksLoaded()) {
    retrieveLinksAndAddDlButton();
  }
}, 2000);

function dlButtonAlreadyPresent() {
  const button = document.getElementsByClassName("addButton");
  if (button.length !== 0) {
    return true;
  }
}

function moreThanOneDlLink() {
  const container = document.getElementById("links-container");
  if (container.children.length > 1) {
    return true;
  }
}

function allLinksLoaded() {
  const container = document.getElementById("links-container");

  let linkNotGenerated = 0;
  for (let i = 0; i < container.children.length; i++) {
    const individualLinkDiv = container.children[i];
    if (individualLinkDiv.className === "link-not-generated") {
      linkNotGenerated++;
    }
  }
  if (linkNotGenerated === 0) {
    return true;
  }
}

function retrieveLinksAndAddDlButton() {
  const toDl = getAllDlLinks();
  makeDlButton(toDl);
}

function getAllDlLinks() {
  let toDl = [];

  const container = document.getElementById("links-container");
  for (let i = 0; i < container.children.length; i++) {
    const individualLinkDiv = container.children[i];
    for (let j = 0; j < individualLinkDiv.children.length; j++) {
      const childrenEl = individualLinkDiv.children[j];
      if (
        childrenEl.tagName === "A" &&
        childrenEl.textContent.startsWith("TELECHARGER")
      ) {
        toDl.push(childrenEl.href);
      }
    }
  }
  return toDl;
}

function makeDlButton(toDl) {
  const container = document.getElementById("links-container");
  let button = document.createElement("button");
  button.textContent = "Download all";
  button.className = "addButton";
  container.appendChild(button);
  button.addEventListener("click", () => {
    dlAll(toDl);
  });
}

function dlAll(toDl) {
  for (let link of toDl) {
    window.open(link);
  }
}
