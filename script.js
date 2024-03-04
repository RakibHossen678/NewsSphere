const loadPost = async (inputFieldText='') => {
    document.getElementById('loadingSpinner').classList.remove('hidden')
   

    clearTimeout(timeOut)
    
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputFieldText}`
    
  );
  const data = await res.json();
  const posts = data.posts;
  // console.log(posts)


  const postContainer = document.getElementById("post_container");
  postContainer.textContent=''
  
  posts.forEach((post) => {
    document.getElementById('loadingSpinner').classList.add('hidden')
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
                        
                        <div class="flex space-x-48 pt-3 border-t-2 border-dashed  border-gray-600 w-full">
                            <div class="flex space-x-6">
                                <h1 class="flex items-center space-x-2 text-gray-600"><img src="images/comment.png" alt=""><span>${post.comment_count}</span></h1>
                                <h1 class="flex items-center space-x-2 text-gray-600"><img src="images/eye.png" alt=""><span>${post.view_count}</span></h1>
                                <h1 class="flex items-center space-x-2 text-gray-600"><img src="images/time.png" alt=""><span>${post.posted_time}</span>min</h1>
                            </div>
                            <div class='rounded-2xl'>
                                <button onclick='showTitle("${post.title.replace("Beginner's",'Beginners')}", ${post.view_count})'><img class='' src="images/email.png" alt=""></button>
                                
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
    // console.log(title,view)
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


const loadAllPost=async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data=await (res.json())
    const latestPosts=data
    // console.log(latestPosts)
    const LatestPostContainer=document.getElementById('LatestPostContainer')
    latestPosts.forEach(item=>{
        // console.log(item)
        const latestPostDiv=document.createElement('div')
        latestPostDiv.className='border-2 rounded-lg max-w-[350px]  px-4 py-4'
        latestPostDiv.innerHTML=`
        <div class="w-80">
                        <img class="w-full rounded-2xl" src="${item.cover_image}" alt="">
                    </div>
                    <div>
                        <h2 class="flex items-center space-x-2 py-4">
                            <img class="w-7 " src="images/date.png" alt=""><span class="text-gray-500">${item.author.posted_date ||'No publish date'}</span>
                        </h2>
                        <h1 class="font-semibold mb-2">${item.title}</h1>
                        <p>${item.description}</p>
                        <div class="flex items-center space-x-2 pt-5">
                            <span><img class="w-12 rounded-full" src="${item.profile_image}" alt=""></span>
                            <span>
                                <h3 class="font-medium">${item.author.designation || 'Unknown'}</h3>
                                <p class="text-gray-500">${item.author.name }</p>
                            </span>
                        </div>
                    </div>
        `
        LatestPostContainer.appendChild(latestPostDiv)

    })
}


const handleSearchButton=()=>{
    const inputFieldValue=document.getElementById('inputField').value
    console.log(inputFieldValue)
    loadPost(inputFieldValue)

}


loadAllPost()
// showTitle()
loadPost();

const timeOut=setTimeout(loadPost,2000)