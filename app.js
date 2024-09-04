const apikey = "522ee3d2bde740d4a49b748778762e23";



const container = document.querySelector(".blog-con")
const input = document.querySelector("#input")
const btn = document.querySelector("#btn")
const heading = document.querySelector("#heading")
const explorebtn = document.querySelector(".explore")

const fetchRandomnews = async() => {
    try {
        const apiurl =  `https://newsapi.org/v2/everything?q=tesla&pageSize=21&sortBy=publishedAt&apiKey=${apikey}`

     const res = await fetch(apiurl)
     const data =  await res.json()
      return data.articles;
      
    } catch (error) {
        console.log("error in fetching data",error);
        
    }
     
    
}

btn.addEventListener("click",async() => {
    const inputval = input.value.trim();
    if(inputval !== "")
        try {
            const articles  = await fetchsearchnews(inputval);
            displayblog(articles)
           
        } catch (error) {
            console.log("search errror",error);
            
        }
        
})

const fetchsearchnews = async(inputval) => {
    container.innerHTML = ""
    heading.textContent = "Loading News..."
     
    try {
        const apiurl =  `https://newsapi.org/v2/everything?q=${inputval}&pageSize=21&sortBy=publishedAt&apiKey=${apikey}`

     const res = await fetch(apiurl)
     const data =  await res.json()
     heading.textContent = `${inputval.toUpperCase()} News`
    
    
    
     return data.articles;
     
      
    } catch (error) {
        console.log("error in fetching data",error);
        
    }
}

explorebtn.addEventListener("click", async() => {
    const inputval = input.value.trim();
   try {
    const articles = await fetexplore(inputval)
    displayblog(articles)
   } catch (error) {
      console.log("explore error",error);
      
   }
})

const fetexplore = async(inputval) => {
    try {
        const apiurl =  `https://newsapi.org/v2/everything?q=${inputval}&pageSize=21&sortBy=publishedAt&apiKey=${apikey}`

     const res = await fetch(apiurl)
     const data =  await res.json()
      return data.articles;
      
    } catch (error) {
        console.log("error in fetching data",error);
        
    }
}


const displayblog = (articles) => {

    articles.forEach((article) => {
       
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")
   
        const img = document.createElement("img")
      
        img.src = article.urlToImage
   
        
        
   
        const title = document.createElement("h2")
        const trimtitle = article.title.length > 45
        ? article.title.slice(0,45) +"..." : article.title;
        title.textContent = trimtitle
   
        const description = document.createElement("p")
        const trimdes = article.description.length > 120
        ? article.description.slice(0,120) + "..." :article.description;
        description.textContent = trimdes

        const date = document.createElement("p")
        date.classList.add("date")
        date.textContent = `published At:${article.publishedAt.slice(0,10)}  `
   
        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.append(description)
        blogCard.appendChild(date)
        img.addEventListener("click",() => {
            window.open(article.url,"_blank")
        })
        container.appendChild(blogCard)
        console.log( container);
        

       });
 
}

(async() => {
    try {
        const articles = await fetchRandomnews();
        console.log(articles);
        
        displayblog(articles)
    } catch (error) {
        console.log("errro occur",error);
        
    }
})();