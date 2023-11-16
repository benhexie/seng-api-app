const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const blogTitleElm = document.getElementById("blogTitle");
const blogBodyElm = document.getElementById("blogBody");
const blogForm = document.getElementById("blogForm");

cancelBtn.addEventListener("click", () => {
    location.href = "/blogs/";
});

blogForm.addEventListener("submit", async (e) => {
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
             // Redirect to the /blogs page
             window.location.href = "/blogs";
        } else {
            console.error("Failed to add blog");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});


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

// cancelBtn.addEventListener("click", () => {
//     location.href = "/blogs";
// });

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

