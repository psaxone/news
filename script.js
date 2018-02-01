var listaID = [];
var urlSources = "https://newsapi.org/v2/sources?";
var iconURL = "https://besticon-demo.herokuapp.com/icon?url=";
var iconSize = "&size=80..120..200";
var newsURL = "https://newsapi.org/v2/everything?q=";
var listadoIds = "&sources=";
var APIkey = "&apiKey=a692b837987549b1bc6d7fdf69e82b38";

$(document).ready(function() {
  $("#button-next").prop("disabled", true);
  $.get(urlSources + APIkey, function(response) {
    response.sources.forEach(function(source) {
      var iconCompleteURL = iconURL + source.url + iconSize;
      var li = getIconLi(source.id, iconCompleteURL, source.name);
      $("ul").append(li);
    });
    $("#loading").hide();
    $("#page1").show();
    $("li").click(function() {
      if (listaID.indexOf(this.id) === -1) {
        listaID.push(this.id);
      } else {
        listaID.splice(listaID.indexOf(this.id), 1);
      }
      $("#selection").html("");
      listaID.forEach(function(id, index) {
        var source = response.sources.find(function(source) {
          return source.id === id;
        });
        if (index === listaID.length - 1) {
          $("#selection").append(source.name + ".");
        } else {
          $("#selection").append(source.name + ", ");
        }
      });
      if (listaID.length === 0) {
        $("#button-next").prop("disabled", true);
      } else {
        $("#button-next").prop("disabled", false);
      }
    });
    $("#button-next").click(function() {
      $("#page1").hide();
      $("#page2").show();
      $("#page3").hide();

      listaID.forEach(function(id, index) {
        var source = response.sources.find(function(source) {
          return source.id === id;
        });
        if (index === listaID.length - 1) {
          $("#selection-page2").append(source.name + ".");
        } else {
          $("#selection-page2").append(source.name + ", ");
        }
        backButtonp2();
      });
    });
    $("#search").click(function() {
      var search = $("#input-search").val();
      var urlCompleta = newsURL + search + listadoIds + listaID + APIkey;
      $.get(urlCompleta, function(response) {
        response.articles.forEach(function(articles) {
          var div = getBox(
            articles.source.name,
            articles.title,
            articles.description,
            articles.url,
            articles.urlToImage
          );
          $("#page1").hide();
          $("#page2").hide();
          $("#page3").show();
          $("#articles").append(div);
          backButtonp3();
        });
      });
    });
  });
});

// <img src="${url}" />
function getIconLi(id, url, name) {
  return `<li id="${id}" class="source" style="background-image: url('${url}')">
            <div class="source-overlay"><p>${name}</p></div>
        </li>`;
}

function getBox(name, title, description, url, image) {
  return `<div class="noticia">
            <div class="img-container">
                <img src='${image}'/>
            </div>
            <div class="texto-container">
                <h1>${name}</h1>
                <h2>${title}</h2>
                <h4><i>${description}</i></h4>
                <a href=${url} target="_blank"><p>More</p></a>
            </div>
        </div>`;
}

function backButtonp2() {
  $("#button-back-p2").click(function() {
    $("#selection-page2").empty();
    $("#page1").show();
    $("#page2").hide();
    $("#page3").hide();
  });
}

function backButtonp3() {
  $("#button-back-p3").click(function() {
    $("#articles").empty();
    $("#page1").hide();
    $("#page2").show();
    $("#page3").hide();
  });
}
