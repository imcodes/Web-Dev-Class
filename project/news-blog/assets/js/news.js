import moment from '../../node_modules/moment/dist/moment.js'
export class News{
    constructor(url,apiKey,keyword){
        this.setKeyword(keyword) //set the keyword upon instantiation
        this.setBaseUrl(url)
        this.setApiKey(apiKey)
    }

    //method to set the base url
    setBaseUrl(url){
        this.baseUrl = url
    }
    setApiKey(key){
        this.key=key
    }
    //method to set paramter for the url
    setParams(param){

    }
    // Method to set the keyword prop
    setKeyword(keyword){
        this.keyword = keyword
    }
    getKeyword(){
        return this.keyword
    }

    getUrl(){
        return this.baseUrl
    }
    getApiKey(){
        return this.key
    }

    getNewsList(){
        const url = this.getUrl() + '&q='+this.getKeyword()
        
        const response = fetch(url,{
            method: 'get',
            headers: {
                'Authorization' : `${this.getApiKey()}`
                
            }
        })
        .then(res => {return res.json()})
        .catch(err => err)
        this.newsList = response
        return response
        
        
    }

    getNewsDetail(title){
        const List = this.newsList //get the stroed news list
        return List.then(NewsList => {
            const News = NewsList
            
            const news = News.articles.filter(t => {
                return t.title == title
           })
           return news
        })
    }

    // Method to display the news list
    // this takes an argument of the target DOM
    displayNewsList(target){
        return new Promise(resolve => {
            target.innerHTML = 'loading'
            this.newsList.then(list => {
                const Articles = list.articles
                target.innerHTML = ''
                Articles.map(article => {
                    target.innerHTML += this.showListTemplate(article)
                })
                resolve(target)
                
            })
           
        })
        
    }

    showListTemplate(Article){
        const img = (Article.urlToImage) ? Article.urlToImage : 'https://placehold.co/600x400'
        return `<div class="col-12 col-sm-6 col-md-3">
        <div class="card border-success" data-title="${Article.title}">
            <div class="card-header p-0">
                <a href="javascript:void(0)">
                    <img src="${img}" class="openModal w-100" alt="">
                </a>
            </div>
            <div class="card-body">
                <h2 class="openModal title h6"><a href="javascript:void(0)" title="${Article.title}">${Article.title.substr(0,40)}</a></h2>
            </div>
            <div class="card-footer">
                <div class="row g-2">
                    <div class="col-12 col-xl-6 author">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <span>${Article.author ? Article.author.substr(0,30) : 'Nill'}</span>
                    </div>
                    <div class="col-12 col-xl-6 pub-date">
                        <i class="fa fa-calendar-o" aria-hidden="true"></i>
                        <span>${Article.publishedAt}</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>`
    }

    showModalTemplate(Detail){
        let {author,url,urlToImage,content,title,source,publishedAt} = Detail
        urlToImage = urlToImage ? urlToImage : "https://placehold.co/600x400"
        author = author ? author : 'Anonymous'

        publishedAt = moment(publishedAt).toNow()

        const section = document.createElement('section')
        section.classList.add('my-modal')
        const output = `
        
        <div class="my-modal-content">
            <div class="modal-display">
                <div class="card">
                    <div class="card-header p-0 float-title">
                        <img class="title-image w-100" src="${urlToImage}" alt="${title}">
                        <h2 class="card-title px-5 py-2">${title}</h2>
                    </div>
                    <div class="card-body px-5 py-2">
                        <aside class="meta-data row py-3">
                            <div class="col-12 col-md-6" id="detail-author">
                                <i class="fa fa-user" aria-hidden="true"></i>
                                    <span>${author}</span>
                            </div>
                            <div class="col-12 col-md-6" id="detail-pub-date">
                                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                                    <span>${publishedAt}</span>
                            </div>
                        </aside>
                        <div class="py-3">
                            <p>${content}</p>
                        </div>

                    </div>
                    <div class="card-footer bg-white px-5 py-3">
                        <div class="row">
                            <div class="col-12 col-md-6" id="detail-source">News Source: <span>${source.name}</span></div>
                            <div class="col-12 col-md-6"><a href="${url}"> Read Full content on source website &rarr;</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        section.innerHTML=output
        return section
    }

    // Method that receives News Title/Caption as argument 
    //It calls the getNewsDetail() method to fileter list of news by the recived title and return an array of on news object
    //It then calls the showModalTemplate() method to create the template for the modal
    //Finally it appends the Modal template to the document body
    pop(title){
        this.getNewsDetail(title).then(detail => {
            // get template from the showModalTeplate method by passing the filtered data to the method
            const mTemplate = this.showModalTemplate(detail[0]) //this method returns the template as HTML DOM
            const bodyElement = document.querySelector('body') //get the body DOM from the document
            
            //listen for click event on the HTML modal template
            //The goal is to remove the template from the document once user clicks on it.
            mTemplate.onclick = e => {
                //remove the clicked target from the document body
                bodyElement.removeChild(e.target)
            }

            //add the Modal template to the document body alongside the event Listner and handler
            bodyElement.appendChild(mTemplate)
        })
    }

    // Method to handle the Modal open and close when some elements on the webpage are click
    handlePop (tag) {
        tag.querySelectorAll('[data-title]').forEach(card => {
            const title = card.getAttribute('data-title')
            card.querySelectorAll('.openModal').forEach( link => {
                link.onclick = () => {
                    this.pop(title)
                }
                console.log
            })
        })
        
    }

}