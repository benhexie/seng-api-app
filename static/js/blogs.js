const newBtn = document.getElementById("newBtn");
const blogContainer = document.getElementById("blogContainer");
const noBlogText = document.getElementById("noBlogText");

newBtn.addEventListener("click", () => {
    location.href = "/blogs/new-blog"

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
                // remove the milliseconds from the date string
                blogTime.innerText = new Date(blogData.createdAt).toLocaleString()
                    .replace(/:\d{2}\s/, " ");
                titleContainer.appendChild(blogTime);

                const iconContainer = document.createElement("div");
                blogHeader.appendChild(iconContainer);

                const editIcon = document.createElement("img");
                editIcon.src = "../static/assets/edit-icon.svg"; 
                editIcon.alt="edit"
                editIcon.classList.add("blog__icon")
                editIcon.addEventListener("click", () => {
                    location.href = `/blog/${blogData._id}`;
                });
                iconContainer.appendChild(editIcon)

                const trashIcon = document.createElement("img");
                trashIcon.src = "../static/assets/trash-icon.svg"; 
                trashIcon.alt="delete"
                trashIcon.classList.add("blog__icon")
                iconContainer.appendChild(trashIcon)

                const blogBody = document.createElement("p");
                blogBody.classList.add("blog__body");
                // intentionally introduced an XSS vulnerability
                blogBody.innerHTML = blogData.body;
                blog.appendChild(blogBody);

                trashIcon.addEventListener("click", () => {
                    fetch(`/blog/${blogData._id}`, {
                        method: "DELETE"
                    }).then(res => {
                        if (res.status === 200) {
                            blog.remove();
                            if (!blogContainer.children.length) {
                                blogContainer.appendChild(noBlogText);
                            }
                        }
                    });
                });
            });
        }
    } catch (error) {
        console.log(error.message);
    }
})();