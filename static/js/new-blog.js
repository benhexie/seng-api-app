const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const cancelBtn = document.getElementById("cancelBtn");
const blogTitleElm = document.getElementById("blogTitle");
const blogBodyElm = document.getElementById("blogBody");
const blogForm = document.getElementById("blogForm");

cancelBtn.addEventListener("click", () => {
    location.href = "/";
});

blogForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

if (updateBtn) {
    updateBtn.addEventListener("click", async () => {
        const blogTitle = blogTitleElm.value;
        const blogBody = blogBodyElm.value;
        const blogId = blogForm.getAttribute("data-blog-id");

        if (!blogTitle || !blogBody) return;

        try {
            const response = await fetch(`/blog/${blogId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogTitle: blogTitle,
                    blogBody: blogBody,
                }),
            });

            if (response.ok) {
                console.log("Blog updated successfully");
                Toastify({
                    text: "Your blog has been updated!",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "#333",
                    },
                    onClick: function(){
                        window.location.href = "/";
                    }
                  }).showToast();
                  setTimeout(() => window.location.href = "/", 2200)
            } else {
                console.error("Failed to update blog");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}

if (saveBtn) {
    saveBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const blogTitle = blogTitleElm.value;
        const blogBody = blogBodyElm.value;
    
        if (!blogTitle || !blogBody) return;
    
        try {
            const response = await fetch("/blogs/new-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogTitle: blogTitle,
                    blogBody: blogBody,
                }),
            });
            
            if (response.ok) {
                console.log("Blog added successfully");
                Toastify({
                    text: "Your blog has been posted!",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "#333",
                    },
                    onClick: function(){
                        window.location.href = "/";
                    }
                  }).showToast();
                  setTimeout(() => window.location.href = "/", 2200)
            } else {
                console.error("Failed to add blog");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}