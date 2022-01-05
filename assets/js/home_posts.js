// {   
//     //method to submit the form data for new post using AJAX
//     let createPost=function(){
//         let newPostForm=$("#new-post-form");
//         newPostForm.submit((e)=>{
//             e.preventDefault();
            
//             $.ajax({
//                 type:"post",
//                 url: "/posts/create-post",
//                 data:newPostForm.serialize(),
//                 success:function(data) {
//                     // console.log(data);
//                     let post=newPostDom(data.data.post);
//                     $('#posts-list-container>ul').prepend(post);
//                     deletePost($(' .delete-post-button', newPostForm));
//                 },
//                 error: function(err){
//                     console.error(err.responseText);
//                 }
//             });
//         });
//     }
//     //returns a new post which will be rendered in the dom
//     let newPostDom=function(post){
//         return $(`<li id="post-${post._id}">
//                     <p>
//                         <small> <a class="delete-post-button" href="/posts/deletePost/${post._id}">X</a> </small>
//                         ${ post.content } <br>
//                         <small>${post.user.name}</small>
//                     </p>
//                     <div class="post-comments">
//                             <form action="/comments/create" method="post">
//                                 <input type="text" placeholder="Add comment.." name="content" required>
//                                 <input type="hidden" name="post" value="${post._id}">
//                                 <input type="submit" value="comment">
//                             </form>  
//                         <%}%>
//                         <div class="post-comments-list">
//                             <ul class="post-comments-${post._id }"></ul>
//                         </div>
//                     </div>
//                 </li>`);
//     }

//     let deletePost=function(deleteLink){
//         // $(deleteLink).click((e)=>{
//         //     e.preventDefault();

//         //     $.ajax({
//         //         type:"get",
//         //         url: $(deleteLink).prop("href"),
//         //         success:(data)=>{
//         //             console.log(data);
//         //             $(`#post-${data.data.post_id}`).remove();
//         //         },
//         //         error: (err)=>{
//         //             console.log(err.responseText);
//         //         } 
//         //     });
//         // });
//     }

//     createPost();
// }