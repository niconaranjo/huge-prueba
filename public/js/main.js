DatosMenu()

  function DatosMenu(){
    var ObjMenu = document.getElementById("menu");
    var ajax;

    if(window.XMLHttpRequest){
      ajax = new XMLHttpRequest();
    }else{
      ajax = new ActiveXobject("Microsoft.XMLHTTP");
    }

    ajax.open("GET", "../data/nav.json", true);
    ajax.setRequestHeader("Content-type", "application/json", true);

    ajax.onreadystatechange = function(){
      if (ajax.readyState == 4 && ajax.status == 200) {
        var data = JSON.parse(ajax.responseText);
        ObjMenu.innerHTML = "";

        ShowMenu(ObjMenu,data);
        
      }
    };
    ajax.send();
    
  }

 


function ShowMenu(ObjMenu,data){

    if( typeof(data.items) !== 'undefined' ){

        for(var i in data.items){

            var NodeLi = document.createElement("li");           
            var NodeLink = document.createElement("a");            
            var InfoNodo = document.createTextNode(data.items[i].label);

            NodeLink.setAttribute("href", data.items[i].url);            
            NodeLink.appendChild(InfoNodo);
            NodeLi.appendChild(NodeLink);

            if(typeof(data.items[i].items) !== 'undefined') NodeLink.setAttribute("class", "but_principal");
            else NodeLink.setAttribute("class", "but_secundario");

            if( typeof(data.items[i].items) !== 'undefined'){
                if(data.items[i].items.length>0){
                    
                    NodeLink.setAttribute("class", "nav_desplegable"); 
                    NodeLink.setAttribute("onclick", "ShowSubMenu(event, this)"); 
                    var NodeUl = document.createElement("ul");
                    NodeUl.setAttribute("class", "item_desplegable");
                    
                    ShowMenu(NodeUl, data.items[i]);
                    NodeLi.appendChild( NodeUl);
                }
                else{
                    NodeLi.setAttribute("onmouseover", "HideSubMenu(event, this)");
                }                
            }

            ObjMenu.appendChild(NodeLi);
        }
    }
}
 
function ShowSubMenu(event, obj){
    event.preventDefault();
    var SubMenu = obj.nextSibling;
    var AllSubMenu = document.getElementsByClassName("item_desplegable");
    var AllDespMenu = document.getElementsByClassName("nav_desplegable");
    var ContainerBg = document.getElementById("container_bg");
    ContainerBg.style.display = "flex";   
   
    for(var i in AllDespMenu ) {AllDespMenu.item(i).style.backgroundColor = "#ec008c"; AllDespMenu.item(i).style.color= "#ffffff";}
    obj.style.backgroundColor = "#ffffff";
    obj.style.color="#ec008c";        
    for(var i in AllSubMenu) AllSubMenu.item(i).style.display = "none";
    SubMenu.style.display = "flex";        
  
}

function HideSubMenu(){
    
    var AllSubMenu = document.getElementsByClassName("item_desplegable");
    var AllDespMenu = document.getElementsByClassName("nav_desplegable");
    var ContainerBg = document.getElementById("container_bg");
    for(var i in AllSubMenu) AllSubMenu.item(i).style.display = "none";
    for(var i in AllDespMenu ) {AllDespMenu.item(i).style.backgroundColor = "#ec008c"; AllDespMenu.item(i).style.color= "#ffffff";}
    ContainerBg.style.display = "none";  
}



  

/*


 call(ObjMenu,data);

 for(var i=0 ; i< data.items.length; i++){            
            var NodeLi = document.createElement("li");           
            var NodeLink = document.createElement("a");
            NodeLink.setAttribute("href", data.items[i].url);
            if(data.items[i].items.length != 0) NodeLink.setAttribute("class", "nav_desplegable");
            var InfoNodo = document.createTextNode(data.items[i].label);
            NodeLink.appendChild(InfoNodo);

            if(data.items[i].items.length != 0){

                var NodeUl = document.createElement("ul");
                for(var j = 0; j< data.items[i].items.length; j++){

                    var NodeLiSon = document.createElement("li");
                    var NodeLinkSon = document.createElement("a");
                    NodeLinkSon.setAttribute("href", data.items[i].items[j].url);
                    var InfoNodo2 = document.createTextNode(data.items[i].items[j].label);
                    NodeLinkSon.appendChild(InfoNodo2);
                    NodeLiSon.appendChild(NodeLinkSon);
                    NodeUl.appendChild(NodeLiSon);
                    
                }
                NodeLi.appendChild(NodeLink);
                ObjMenu.appendChild(NodeLi);
                NodeLi.appendChild( NodeUl);
                ObjMenu.appendChild(NodeLi);

            }else{
                NodeLi.appendChild(NodeLink);
                ObjMenu.appendChild(NodeLi);
            }            
        }


*/