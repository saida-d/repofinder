$(document).ready(function(){

   document.addEventListener("deviceready",function(){
        getRepos();
   });

   $('.ui-input-clear').click(function(){

         $('#search_list').hide();
         $('#user_info').hide();
   });

   $('#search_btn').click(function(){
     var search_html='';
     var username= $('#search_input').val();
     var profile_info='';
     console.log(username);
     var repo_url="https://api.github.com/users/"+username+'/repos';
     var user_url="https://api.github.com/users/"+username;

     $.ajax({

        url:repo_url,
        dataType:"jsonp",
        success:function(response){
            /// getting profile
           /* $.ajax({

                url:user_url,
                dataType:"jsonp",
                success:function(data){

                    profile_info+='<img  class="thumbnail" src="'+data.avatar_url+'"/> <h1><a href="'+data.html_url+'">'+data.name+'</a></h1>';
                     $('#user_info').html(profile_info);
                }

            });
          */
            $('#user_info').html('<h3> User: '+username+'</h3>');
            $.each(response.data,function(i,item){
                 search_html +='<li>'+
                 '<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>'+
                 '<p> By '+this.owner.login+'</p>'+
                 '</li>';

            });
            
           
            $('#search_list').append(search_html);
            $('#search_list').listview("refresh");

        }

     });



   });
});


function getRepos(){

    var html='';

    $.ajax({

      url:"https://api.github.com/repositories",
      dataType:"jsonp",
      success:function(response){

         $.each(response.data,function(i,item){
             if(i<10){

                  html+='<li>'+

                    '<img  class="thumbnail" src="'+this.owner.avatar_url+'"/>' +
                    '<h1> <a href="'+this.html_url+'" target="_blank"> '+this.name+'</a></h1>' + 
                    '<p> By '+this.owner.login+'</p>'+
                  '</li>';
             }

         });

         $('#repo_list').append(html);
         $('#repo_list').listview("refresh");
      } 

    });
}