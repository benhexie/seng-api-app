const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const blogTitleElm = document.getElementById("blogTitle");
const blogBodyElm = document.getElementById("blogBody");
const blogForm = document.getElementById("blogForm");

cancelBtn.addEventListener("click", () => {
    location.href = "/views/blogs.html"
})

blogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const blogTitle = blogTitleElm.value;
    const blogBody = blogBodyElm.value;
    
    if (!blogTitle || !blogBody) return;
    fetch("/blog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: blogTitle,
            body: blogBody,
        })
    })
})