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


// const saveBtn = document.getElementById("saveBtn");
// const cancelBtn = document.getElementById("cancelBtn");
// const blogTitleElm = document.getElementById("blogTitle");
// const blogBodyElm = document.getElementById("blogBody");
// const blogForm = document.getElementById("blogForm");

// cancelBtn.addEventListener("click", () => {
//     // location.href = "/templates/blogs.html"
//     location.href = "/blogs/new-blog"

// })

// blogForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const blogTitle = blogTitleElm.value;
//     const blogBody = blogBodyElm.value;
    
//     if (!blogTitle || !blogBody) return;
//     fetch("/blogs/new-blog", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             title: blogTitle,
//             body: blogBody,
//         })
//     })
// })

// const saveBtn = document.getElementById("saveBtn");
// const cancelBtn = document.getElementById("cancelBtn");
// const blogTitleElm = document.getElementById("blogTitle");
// const blogBodyElm = document.getElementById("blogBody");
// const blogForm = document.getElementById("blogForm");
// const messageElement = document.getElementById("message");

// blogForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const blogTitle = blogTitleElm.value;
//     const blogBody = blogBodyElm.value;
    
//     if (!blogTitle || !blogBody) return;

//     try {
//         const response = await fetch("/blogs/new-blog", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 title: blogTitle,
//                 body: blogBody,
//             })
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Successful response, display success message
//             messageElement.textContent = "Blog successfully added!";
//             messageElement.classList.remove("error");
//             messageElement.classList.add("success");
//         } else {
//             // Unsuccessful response, display error message
//             messageElement.textContent = `Error adding blog: ${data.message}`;
//             messageElement.classList.remove("success");
//             messageElement.classList.add("error");
//         }
//     } catch (error) {
//         // Handle network or unexpected errors
//         messageElement.textContent = "An error occurred. Please try again later.";
//         messageElement.classList.remove("success");
//         messageElement.classList.add("error");
//         console.error("An error occurred:", error);
//     }
// });

