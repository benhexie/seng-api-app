const newBtn = document.getElementById("newBtn");
const blogContainer = document.getElementById("blogContainer");
const noBlogText = document.getElementById("noBlogText");

newBtn.addEventListener("click", () => {
    location.href = "/views/new-blog.html"
});

(async () => {
    try {
        const response = await fetch("/blogs");
        const data = await response.json();
        if(data.length) {
            noBlogText.remove();
            data.forEach(blogData => {
                const blog = document.createElement("div");
                blog.classList.add("blog");
                blog.id = blogData._id;
                blogContainer.appendChild(blog);

                const blogHeader = document.createElement("div");
                blogHeader.classList.add("blog__header");
                blog.appendChild(blogHeader);

                const titleContainer = document.createElement("div");
                blogHeader.appendChild(titleContainer);

                const blogTitle = document.createElement("h4");
                blogTitle.innerText = blogData.title;
                titleContainer.appendChild(blogTitle);

                const blogTime = document.createElement("small");
                blogTime.innerText = new Date(blogData.createdAt).toLocaleString();
                titleContainer.appendChild(blogTime);

                const editIcon = document.createElement("img");
                editIcon.src = "../public/assets/edit-icon.svg"; 
                editIcon.alt="edit" 
                editIcon.classList.add("edit__icon")
                blogHeader.appendChild(editIcon)

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