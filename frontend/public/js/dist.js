(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(()=> {
    console.log('hello from script.js')

    // get images on page load
    $.ajax({
        url: "/api/data",
        method: "GET",
        datatype: "json",
        success: (data) => {
            console.log(data)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus === 'error' && errorThrown === 'Connection refused') {
              // Handle connection refused error
              console.error('Connection refused!');
            } else {
              // Handle other AJAX errors
            //   console.error('AJAX Error:', textStatus, errorThrown);
            }
        }
    });

    // async function fetchData() {
    //     try {
    //       const response = await fetch('/api/data');
    //       const data = await response.json(); 
    //       console.log(data); 
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   }
    
    //   fetchData();
});
},{}]},{},[1]);
