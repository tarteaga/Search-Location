
<script>

import { RouterLink, RouterView } from "vue-router";
import router from './router';

export default {
  data() {
    return {
  userPosition : null
  }
    },
  mounted(){
    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input',this.filltypeahead);
    searchInput.addEventListener("keydown" , this.searchresults);
    this.getUserPosition();
  },
  methods : {
    filltypeahead(e){
      const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: 'fsq3aVPOMG8VjhIbGEHZV3mkK8gG7d5OvHSJjEJHPaySywQ='
      }
    };

    fetch('https://api.foursquare.com/v3/autocomplete?query='+e.srcElement.value+'&ll='+this.userPosition, options)
      .then(response => response.json())
      .then(response => response.results.map( function (x) {
        return x.text.primary;
      }))
      .then(response => this.fillSuggestion(response))
      .catch(err => console.error(err));
    },
    fillSuggestion(suggestions){
      var p = document.getElementById("suggestion");
      p.innerHTML = suggestions[0];
      p.addEventListener('click', this.clicksearch);
    },
    clicksearch(e){
      document.getElementById("search").value = e.srcElement.innerHTML;

    },
    searchresults(e){
      if (e.key== "Enter") {
        router.push({path :"/",query:{query:e.srcElement.value,ll:this.userPosition}});
      }
    },
  
  getUserPosition(){
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(this.assignUserPosition,console.log);
    }
  }, assignUserPosition(position){
        this.userPosition = position.coords.latitude + ',' + position.coords.longitude;
    }
  
  }
}
</script>

<template>
<ul class="topnav">
  <RouterLink to="/">Home</RouterLink>
  <label for="Search"></label>
    <input type="search" name="" id="search" placeholder="¿Qué buscas?">
</ul>
<div class="suggestionDiv">
  <p id="suggestion"></p>
</div>


<RouterView />
</template>

<style>
.topnav {
  list-style-type: none;
  margin: 0;
  padding: -0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: rgb(34, 36, 36);
}

.topnav a.active {
  
  color: white;
}
input{
  margin-top: 12px;
  margin-left: 75%;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  } 
  }

input{
  margin-top: 12px;
  margin-left: 75%;
}
#app{
  display: flex;
  margin-top: 10%;
  font-family: monospace;
  justify-content: space-between;
  margin-left: 12%;
  margin-right: 12%;
}
.suggestionDiv{
  position: fixed;
  left: 81%;
  top: 50px;
  background-color: rgb(186, 199, 199);
  height: fit-content;
  border-radius: 10px;
}
#suggestion{
  margin: 1px;
  padding: 1px;
}

</style>