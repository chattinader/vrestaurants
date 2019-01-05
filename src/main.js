// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Restaurants from './components/Restaurants'
import About from './components/About'
import Add from './components/Add'
import Edit from './components/Edit'
import Details from './components/Details'


Vue.use(vueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Restaurants},
    {path: '/about', component: About},
    {path: '/add', component: Add},
    {path: '/edit/:id', component: Edit},
    {path: '/restaurants/:id', component: Details}
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <!--------------------------Nav entête--------------------------------------------------------------------------------------------->
    <div id="app">
        <nav class="navbar navbar-dark fixed bg-dark flex-md-nowrap p-0 shadow">
            <router-link class="navbar-brand col-sm-3 col-md-10 mr-0" to="/">vRestaurants</router-link>
            <ul class="navbar-nav px-3">
              <li class="nav-item text-nowrap">
                <router-link class="nav-link" to="/add">Ajouter un restaurant</router-link>
              </li>
            </ul>
        </nav>
        
        <!--------------------------Nav gauche--------------------------------------------------------------------------------------------->
        <div class="container-solid">
                <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <router-link class="nav-link active" style="color: #555" to="/">
                                    <span data-feather="home"></span>
                                    Accueil <span class="sr-only">(current)</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" style="color: #555" to="/about">
                                    <span data-feather="file"></span>
                                    A propos
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
        </div>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <router-view></router-view>
          </div>
        </main>
    </div>
  `
}).$mount('#app')
