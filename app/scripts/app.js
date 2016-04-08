/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
    
    app.baseUrl = '/';
    app.routeName = 'page';
    app.waitUntilNexSwipetStart = true;
    
    app.goToPage = function(){ 
        history.pushState({}, null, '../' + this.$.pages.selected);
    };
    
    app._getPageNumber = function (route){
        
        var pageNumber = 0;
        var pathMatch = route.match(/page\/(\d+)/);

        if (pathMatch && 
                pathMatch.length > 1 && 
                pathMatch[1] < app.items.length){
                 pageNumber = pathMatch[1];
         }

        return pageNumber;  
    };
    
    app.setAnimation = function(e){
               
        var lastPageId = this._getPageNumber(this.$.pages.selected);
        var currentPageId = this._getPageNumber(e.currentTarget.dataRoute);
        
        if (lastPageId > currentPageId){
            //TODO PONER LA DIRECCION CORRECTA DE LA ANIMACION
            this.entryAnimation = 'slide-from-left-animation';
            this.exitAnimation = 'slide-right-animation';  
        }
        else {
            this.entryAnimation = 'slide-from-right-animation';
            this.exitAnimation = 'slide-left-animation';  
        }
        
       app.lastRoute = this.$.pages.selected;

    };
    
    app.prePage = function prePage() {
        this.entryAnimation = 'slide-from-right-animation';
        this.exitAnimation = 'slide-left-animation';                 
        this.$.pages.selectNext();    

    };
    
    app.nextPage = function nextPage() { 
        this.entryAnimation = 'slide-from-left-animation';
        this.exitAnimation = 'slide-right-animation';
        this.$.pages.selectPrevious();        
    };
    
    app.upPage = function upPage() {
        this.entryAnimation = 'slide-from-top-animation';
        this.exitAnimation = 'slide-down-animation';      
        this.$.pages.selectPrevious();        
    };
      
    app.downPage = function downPage() {
        this.entryAnimation = 'slide-from-bottom-animation';
        this.exitAnimation = 'slide-up-animation';   
        this.$.pages.selectNext();       
    };
    
    app.onDataLoaded = function(e){
        document.body.style.display = "flex";
        var pageNumber = this._getPageNumber(location.pathname);      
        this.$.pages.selected = app.routeName + '/' + pageNumber;
    };
    
    app.handleTrack = function handleTrack(e){
        
        var swipeValue = 100;
              
        switch(e.detail.state) {
                
          case 'start':

            this.waitUntilNexSwipetStart = false;
            break;
                
          case 'track':
                
            e.preventDefault();
                
            if (!this.waitUntilNexSwipetStart){
                if (e.detail.dx > swipeValue){   
                    this.waitUntilNexSwipetStart = true;
                    this.nextPage();
                }
                else if (e.detail.dx < -swipeValue){
                     this.waitUntilNexSwipetStart = true;
                     this.prePage();
                }
                else if (e.detail.dy > swipeValue){
                    this.waitUntilNexSwipetStart = true;
                    this.upPage();
                }  
                else if (e.detail.dy < -swipeValue){
                    this.waitUntilNexSwipetStart = true;               
                    this.downPage();
                }
            }
            
            break;
            
        }
    };
    
 
})(document);
