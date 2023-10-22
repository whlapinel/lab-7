"use strict";

const MAX_LENGTH = 200;

const authors = [
  "Tyrone",
  "Ava",
  "Elijah",
  "Lucas",
  "Ebony",
  "Keisha",
  "Jemila",
  "Daniel"
];

const articles = [
  {
    title: "HTML Semantic Tags",
    author: "Ava",
    date: new Date(2023, 2, 11),
    content:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta cupiditate sint ullam fugiat fugit magni, aliquam quae voluptate, quo eos minima numquam repellendus rerum ipsa ea est. Maxime, dicta de lectus eum a minus iure optio eveniet culpa, ipsum iste repellendus laudantium eos deserunt commodi animi distinctio ex hic? At amet dolore nemo accusamus nisi quae, ratione nam. Totam harum expedita temporibus dolore unde sed id debitis suscipit odio voluptates doloremque rem nobis aperiam quasi assumenda doloribus ad vero repellat, alias adipisci tenetur aspernatur vel. Culpa inventore architecto aspernatur dolor natus labore."
  },
  {
    title: "CSS Selectors",
    author: "Tyrone",
    date: new Date(2023, 1, 20),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!"
  },

  {
    title: "Cascading",
    author: "Jemila",
    date: new Date(2023, 2, 1),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptatum iste? Nisi exercitationem, consectetur unde ab placeat nemo deserunt consequuntur."
  },

  {
    title: "CSS Grid",
    author: "Larry",
    date: new Date(2023, 2, 12),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam aliquam debitis dolores dolorem corporis ipsum itaque culpa, et eaque? Aliquam, est eveniet voluptatem nemo doloremque esse odit dolorum dicta consectetur ipsam corrupti perspiciatis voluptas cupiditate et sapiente. Eligendi modi fugiat pariatur facere, molestiae nihil accusamus animi a impedit laboriosam tempora, eum in iure tenetur fugit praesentium consectetur mollitia ut obcaecati delectus ipsa dolores commodi? Rerum, temporibus velit eum iste praesentium modi amet molestiae illum enim quos pariatur quasi vero quidem, minus placeat assumenda recusandae fugit sunt voluptatem est neque qui! Ut optio quis accusamus placeat ipsa laboriosam laborum debitis."
  }
];

const articlesWrapper = document.querySelector(".articles-wrapper");

/**
 * This function creates a DOM elment with information from the article, and returns the element to the caller.
 * @param {string} date - date the article is posted
 * @return {object} header - DOM element
 */

function createArticleHeader(name, date) {
  const header = document.createElement("div");
  header.classList.add("article-header");

  let index = authors.findIndex((author) => author === name);

  const avatar = document.createElement("img");
  if (index !== -1) avatar.src = `images/avatar${index}.png`;
  else avatar.src = "images/default.jpeg";
  avatar.alt = "profile picture";
  avatar.classList.add("avatar");

  const content = document.createElement("div");
  content.textContent = `${name} · ${date.toDateString()}`;
  header.append(avatar, content);
  return header;
}

/**
 * This function splits the given string into two substrings based on the index, and returns the array which stores the substrings.
 * @param {string} text - a string
 * @param {index} number - index at which the string is being splitted at
 * @return {array} nextText - an array stores the two substrings
 */

function splitText(text, index) {
  let newText = [];
  newText[0] = text.substring(0, index);
  newText[1] = text.substring(index, text.length);
  return newText;
}

/**
 * This function creates a DOM elment with information from an article, and returns the element to the caller.
 * @param {string} title - title of an article
 * @param {string} content - content of an article
 * @return {object} body - a DOM element
 */

function createArticleBody(title, content) {
  const body = document.createElement("div");
  body.classList.add("article-body");
  const articleTitle = document.createElement("h3");
  articleTitle.textContent = title;

  const articleContent = document.createElement("p");

  if (content.length > MAX_LENGTH) {
    const texts = splitText(content, MAX_LENGTH);
    articleContent.textContent = texts[0];

    const dotSpan = document.createElement("span");
    dotSpan.textContent = "...";

    const moreContentSpan = document.createElement("span");
    moreContentSpan.textContent = texts[1];
    moreContentSpan.classList.add("hidden");

    const moreBtn = document.createElement("button");
    moreBtn.textContent = "Read More";
    moreBtn.classList.add("btn");
    articleContent.append(dotSpan, moreContentSpan);
    body.append(articleTitle, articleContent, moreBtn);
  } else {
    articleContent.textContent = content;
    body.append(articleTitle, articleContent);
  }

  return body;
}

/**
 * This function creates a DOM elment with information from the article object, and adds the element into the DOM.
 * @param {object} article - an article
 */
function addEntry(article) {
  const articleContainer = document.createElement("article");
  articleContainer.classList.add("article-container");

  const articleHeader = createArticleHeader(article.author, article.date);
  const articleBody = createArticleBody(article.title, article.content);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "✕";

  articleContainer.append(deleteBtn, articleHeader, articleBody);
  articlesWrapper.append(articleContainer);
}

articles.forEach((article) => {
  addEntry(article);
});

const submitBtn = document.querySelector('button[type="submit"]');
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (document.querySelector("form").reportValidity()) {
    const title = document.getElementById("title").value;
    console.log(title);
    document.getElementById("title").value = "";

    const author = document.getElementById("author").value;
    console.log(author);
    document.getElementById("author").value = "";

    const content = document.getElementById("content").value;
    console.log(content);
    document.getElementById("content").value = "";

    const date = new Date();
    const article = {
      title,
      content,
      date,
      author
    };
    articles.push(article);
    addEntry(article);
  }
});

articlesWrapper.addEventListener("click", (e) => {
  if (e.target.getAttribute("class") === "delete-btn") {
    delArticle(e);
  }
  if (e.target.getAttribute("class") === "btn") {
    readMoreBtn(e);
  }
});

function delArticle(e) {
  // need to remove article with same title as
  const clickedTitle = e.target.parentNode.querySelector("h3").textContent;
  articles.splice(articles.indexOf(clickedTitle));
  e.target.parentNode.remove();
  // if (e.target.getAttribute('class') === 'delete-btn') {
  //   console.log('delete button was clicked')
  //   console.log(articles.indexOf()
  // }
}

function readMoreBtn(e) {
  e.target.textContent = 'Read Less';
  console.log("read more button clicked!");
  console.log(e.target.previousSibling.children);
  if (e.target.previousSibling.children !== undefined){
  Array.from(e.target.previousSibling.children).forEach((element) => {
    console.log(`node: ${element}`);
    console.log(`class list: ${element.classList}`);
    // node.classList.toggle('hidden');
    if (element.classList !== undefined) {
      element.classList.toggle("hidden");
    }
  });
}
}
