const loadPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const posts = data.posts;
  // console.log(posts)

  const postContainer = document.getElementById("post_container");
  
  posts.forEach((post) => {
    // console.log(post);
    const postDiv = document.createElement("div");
    const indicator = post.isActive ? "badge-success" : "badge-error";
    postDiv.className =
      "bg-gray-100 flex   py-8 px-6 rounded-3xl hover:bg-green-50 hover:border-2";
    postDiv.innerHTML = `
        <div>
                        <div class="indicator">
                            <span id='indicator' class="indicator-item badge ${indicator}"></span> 
                            <img class="w-16 rounded-xl" src="${post.image}" alt="">
                        </div>
                    </div>
                    <div class="pl-5" >
                        <p class="space-x-4 text-gray-700 pb-3">#
                            <span> ${post.category}</span>
                            <span>Author : <span>${post.author.name}</span></span>
                        </p>
                        <h1 class="text-black text-lg font-medium mb-2">${post.title}</h1>
                        <p class="w-full  pb-4">${post.description}</p>
                        
                        <div class="flex justify-between pt-3 border-t-2 border-dashed  border-gray-600 ">
                            <div class="flex space-x-6">
                                <h1 class="flex items-center space-x-2 text-gray-600"><img src="images/comment.png" alt=""><span>${post.comment_count}</span></h1>
                                <h1 class="flex items-center space-x-2 text-gray-600"><img src="images/eye.png" alt=""><span>${post.view_count}</span></h1>
                                <h1 class="flex items-center space-x-2 text-gray-600"><img src="images/time.png" alt=""><span>${post.posted_time}</span>min</h1>
                            </div>
                            <div class='rounded-2xl'>
                                <button onclick="showTitle('${post.title}', ${post.view_count})"><img class='' src="images/email.png" alt=""></button>
                                
                            </div>
                        </div>
                    </div>
        `;
        
        // console.log(indicator)
        postContainer.appendChild(postDiv)
  });
};
let count=0;
const ShowTitle=document.getElementById('show-title')
const showTitle = (title,view)=>{
    count++
    document.getElementById('clickCount').innerText=count;
    console.log(title,view)
    const showTitleDiv=document.createElement('div')
    showTitleDiv.className='bg-white shadow-xl space-x-7 rounded-xl flex justify-between mb-2 px-2'
    showTitleDiv.innerHTML=`
    <h1 class="font-medium py-1 ">${title}</h1>
    <h1 class="flex  items-center space-x-2 text-gray-600"><img src="images/eye.png" alt=""><span>${view}</span></h1>
    `
    ShowTitle.appendChild(showTitleDiv)

}
// showTitle()
loadPost();


