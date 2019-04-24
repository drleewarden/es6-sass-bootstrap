import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/index.scss';
import data from './data.json';
class shares{
    constructor(data){
        this.dataset = data;
        this.title = null;
        this.content = null;
    }
    
    loadTxt(txt,place){
        const content = document.getElementById(place);
        content.innerHTML= txt;
    }
   
    eventClick(item, handler){
        handler.loadTxt(handler.title,'title');    
        handler.loadTxt(handler.content,'content');    
    }
    classClickEventHandler(classname,config){
        // pass in the title and header to the constructor
        const handler = this;
        Array.from(classname).forEach(function(element) {
            element.addEventListener('click', function(){
                handler.title = this.dataset.title;
                handler.content = this.dataset.content;
                return handler.eventClick(this,handler);
            },false);
        });

    }
    calculatePriceDifference(prices){
        // fncionality to alter the json object.
        const array1 = prices;

            // pass a function to map
            let positiveDifference = [], 
                remap = [],
                priceArray =[];
            const map1 = array1.map((x, ind )=>{ 
                let obj = x,
                current = Number(x.price),
                difference = 0,
                previous = 0,
                sign = null;
                priceArray.push(current);
                
              if(ind != 0){
              previous = Number(array1[ind-1].price);
                difference = Math.abs(current-previous).toFixed(2); 
                  if(previous<current){
                      remap[ind-1].diff;
                      obj.share = true;
                      obj.addition = {'index':ind, 'profit':difference + remap[ind-1].diff};
                    sign = '+' ;
                  }
                  if(previous>current){
                      obj.share = false;
                    sign = '-' ;
                     }
                  
                  obj.diff = Number(difference);
                  
                remap.push(obj); 
                positiveDifference.push(sign+difference); 
              }else{
                  obj.diff = 0;
                  obj.share = false;
                  remap.push(obj);
              }
                               
            });
        remap.maxMin ={'largest':Math.max(...priceArray),'smallest':Math.min(...priceArray)};
        return this.templateQuotes(remap);
        
            
    }

    templateQuotes(remap){
        // render the sickers of when to buy and sell
        return`<ul>${remap.map((unit,index)=>{
        return `<hr><li>${remap.maxMin.smallest===Number(unit.price)?`<div class="buy sticker">BUY</div>`:``}
        ${remap.maxMin.largest===Number(unit.price)?`<div class="sell sticker">SELL</div>`:``}<h4>${unit.time}:</h4><span>$${unit.price}</span><em>${unit.share?`+`:`-`}${unit.diff}</em></li>`
                    }).join('')}</ul><hr>`;
    }
    templateCard(data){
        // this is the es6 template string 
        const cardDetails = data;
        console.log(cardDetails);
        return`
        <div class="container-grid row">${ cardDetails.map((coin,index)=>{
            return `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4"><div class="card ">
            <div class="card-header">
              <img class="card-img-top" src="./src/assets/${coin.img}" alt="Card image cap">
            </div>
              <div class="card-body">
                <h5 class="card-title">${coin.currency}</h5>
 <img class="icons" src="./src/assets/${coin.icon}.svg"></img>
                <em>${coin.date}</em>

                <p>${coin.text}</p>
                ${this.calculatePriceDifference(coin.quotes)}
                <a href="#" class="btn click-btn btn-primary" data-title="${coin.title}" data-content="${coin.text}">More...</a>
              </div>
            </div></div>`;
        }).join('')}</div>`;
    }
    
}

const portFolio = new shares();
//this is where we add the data templatestring to the dom
const templateLoadingArea = document.getElementById('root');
document.getElementById('root').innerHTML= portFolio.templateCard(data);
portFolio.classClickEventHandler(document.getElementsByClassName('click-btn'));
function cat(){
console.log(this)}
// Function to add event listener to table
const classname = document.getElementsByClassName('icons');
Array.from(classname, c => c.addEventListener('click', cat ));
//el.addEventListener("click", function(){alert(this)}, false);
