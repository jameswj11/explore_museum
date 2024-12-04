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