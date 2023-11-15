const newBtn = document.getElementById("newBtn");
const blogContainer = document.getElementById("blogContainer");

newBtn.addEventListener("click", () => {
    location.href = "/views/new-blog.html"
});

(async () => {
    try {
        const response = await fetch("/blogs");
        const data = await response.json();
        if(data.length) {
            data.forEach(blogData => {
                const blog = document.createElement("div");
                blog.classList.add("blog");
                blog.id = blogData._id;
                blogContainer.appendChild(blog);

                const blogHeader = document.createElement("div");
                blogHeader.classList.add("blog__header");
                blog.appendChild(blogHeader);

                const blogTitle = document.createElement("h4");
                blogTitle.innerText = blogData.title;
                blogHeader.appendChild(blogTitle);

                const blogTime = document.createElement("small");
                blogTime.innerText = new Date(blogData.createdAt).toLocaleString();
                blogHeader.appendChild(blogTime);

                const blogBody = document.createElement("p");
                blogBody.classList.add("blog__body");
                // intentionally introduced an XSS vulnerability
                blogBody.innerHTML = blogData.body;
                blog.appendChild(blogBody);
            });
        }
    } catch (error) {
        
    }
})();