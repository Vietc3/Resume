/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from "@/auth/authService";
import getPageTitle from './utils/PageTitle'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // ADMINISTRATOR Routes
        // =============================================================================
        {
            path: '/',
            redirect: '/resume/profile'
        },
        {
            path: '/resume/profile',
            name: 'resume-profile',
            component: () => import('./views/resume/profile'),
            meta: {
                pageTitle:'Profile',
                rule: 'editor',
            }
        },
        {
            path: '/resume/educations',
            name: 'resume-educations',
            component: () => import('./views/resume/education'),
            meta: {
                pageTitle:'Education',
                rule: 'editor',
            }
        },
        
        {
            path: '/resume/skill',
            name: 'resume-skill',
            component: () => import('./views/resume/skill'),
            meta: {
                pageTitle:'Skill',
                rule: 'editor',
            }
        },

       
        {
            path: '/experience/employment-history/AITT',
            name: 'Company-AITT',
            component: () => import('./views/experience/company/aitt'),
            meta: {
                pageTitle:'AITT',
                rule: 'editor',
            }
        },

        {
            path: '/experience/employment-history/GIHOT',
            name: 'Company-GIHOT',
            component: () => import('./views/experience/company/gihot'),
            meta: {
                pageTitle:'GIHOT',
                rule: 'editor',
            }
        },
        
        {
            path: '/experience/project/Oh-Store',
            name: 'Oh-Store',
            component: () => import('./views/experience/project/oh-store'),
            meta: {
                pageTitle:'Oh Store',
                rule: 'editor',
            }
        },

        {
            path: '/experience/project/Kogi-Store',
            name: 'Kogi-Store',
            component: () => import('./views/experience/project/kogi-store'),
            meta: {
                pageTitle:'Kogi Store',
                rule: 'editor',
            }
        },
        {
            path: '/experience/project/Kogi-Web',
            name: 'Kogi-Web',
            component: () => import('./views/experience/project/kogi-web'),
            meta: {
                pageTitle:'Kogi Web',
                rule: 'editor',
            }
        },
        {
            path: '/experience/project/GMS-Application',
            name: 'GMS Application',
            component: () => import('./views/experience/project/gms-application'),
            meta: {
                pageTitle:'GMS Application',
                rule: 'editor',
            }
        },
        
      
        
        

       
              
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
                {
                    path: '/callback',
                    name: 'auth-callback',
                    component: () => import('@/views/Callback.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/login',
                    name: 'page-login',
                    component: () => import('@/views/pages/login/Login.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/register',
                    name: 'page-register',
                    component: () => import('@/views/pages/register/Register.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/forgot-password',
                    name: 'page-forgot-password',
                    component: () => import('@/views/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/reset-password',
                    name: 'page-reset-password',
                    component: () => import('@/views/pages/ResetPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/lock-screen',
                    name: 'page-lock-screen',
                    component: () => import('@/views/pages/LockScreen.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/comingsoon',
                    name: 'page-coming-soon',
                    component: () => import('@/views/pages/ComingSoon.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-500',
                    name: 'page-error-500',
                    component: () => import('@/views/pages/Error500.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/not-authorized',
                    name: 'page-not-authorized',
                    component: () => import('@/views/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/maintenance',
                    name: 'page-maintenance',
                    component: () => import('@/views/pages/Maintenance.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
    document.title = getPageTitle(to.meta.pageTitle)
    firebase.auth().onAuthStateChanged(() => {

        // get firebase current user
        const firebaseCurrentUser = firebase.auth().currentUser

        // if (
        //     to.path === "/pages/login" ||
        //     to.path === "/pages/forgot-password" ||
        //     to.path === "/pages/error-404" ||
        //     to.path === "/pages/error-500" ||
        //     to.path === "/pages/register" ||
        //     to.path === "/callback" ||
        //     to.path === "/pages/comingsoon" ||
        //     (auth.isAuthenticated() || firebaseCurrentUser)
        // ) {
        //     return next();
        // }

        // If auth required, check login. If login fails redirect to login page
        if(to.meta.authRequired) {
          if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
            router.push({ path: '/pages/login', query: { to: to.path } })
          }
        }

        return next()
        // Specify the current path as the customState parameter, meaning it
        // will be returned to the application after auth
        // auth.login({ target: to.path });

    });

});

export default router
