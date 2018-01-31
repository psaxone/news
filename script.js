var listaID = []


$(document).ready(function(){
    $('#page3').hide()
    var urlSources = 'https://newsapi.org/v2/sources?apiKey=a692b837987549b1bc6d7fdf69e82b38'
   $.get(urlSources, function(response) {
        console.log(response);
        response.sources.forEach(function(source) {
            var icon1 = 'https://besticon-demo.herokuapp.com/icon?url='
            var icon3 = '&size=80..120..200'
            var icon2 = source.url
            var iconURL = icon1+icon2+icon3
            var li = getIconLi(source.id, iconURL, source.name)
            $('ul').append(li)
        })
        $('li').click(function() {
            console.log(this.id)
            if (listaID.indexOf(this.id) === -1) {
                listaID.push(this.id)
            }else {
                listaID.splice(listaID.indexOf(this.id),1)
            }console.log(listaID)
            $('#seleccion').html('')
            listaID.forEach(function(id, index) {
                var source = response.sources.find(function(source) {
                    return source.id === id
                })
                if (index === listaID.length - 1) {
                    $('#seleccion').append(source.name+'.')
                } else {
                    $('#seleccion').append(source.name+', ')
                }
                
            })
        })
        $('#button-done').click(function() {
            $('#page1').hide()
            $('#page2').show()
            $('#page3').hide()
            listaID.forEach(function(id, index) {
                var source = response.sources.find(function(source) {
                    return source.id === id
                })
                if (index === listaID.length - 1) {
                    $('#selection-page2').append(source.name+'.')
                } else {
                    $('#selection-page2').append(source.name+', ')
                }
                backButtonp2()
            })
        })
        $('#search').click(function() {
            var url = 'https://newsapi.org/v2/everything?q='
            var search = $('#input-search').val();
            var listadoIds = '&sources='
            var APIkey = '&apiKey=a692b837987549b1bc6d7fdf69e82b38'
            var urlCompleta = url+search+listadoIds+listaID+APIkey
            $.get(urlCompleta, function(response) {
                console.log(urlCompleta);
                response.articles.forEach(function(articles) {
                    var div = getBox(articles.source.name, articles.title, articles.description, articles.url, articles.urlToImage)
                    $('#page1').hide()
                    $('#page2').hide()
                    $('#page3').show()
                    $('#articulos').append(div)
                    backButtonp3()
                })
            })
        })
    })
   
})
// <img src="${url}" />
function getIconLi(id, url, name) {
    return (
        `<li id="${id}" class="source" style="background-image: url('${url}')">
            <div class="source-overlay"><p>${name}</p></div>
        </li>`
    )
}

function getBox(name, title, description, url, image) {
    return (
        `<div class="noticia">
            <div class="img-container">
                <img src='${image}'/>
            </div>
            <div class="texto-container">
                <h1>${name}</h1>
                <h2>${title}</h2>
                <h4><i>${description}</i></h4>
                <a href=${url} target="_blank"><p>More</p></a>
            </div>
        </div>`
    )
}

function backButtonp2() {
    $('#button-back-p2').click(function() {
        $('#page1').show()
        $('#page2').hide()
        $('#page3').hide()
    })
}

function backButtonp3() {
    $('#button-back-p3').click(function() {
        $('#page1').hide()
        $('#page2').show()
        $('#page3').hide()
    })
}

