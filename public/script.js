document.getElementById("myForm").addEventListener("submit", async(e) => {
    e.preventDefault(); 
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const response = await fetch("/submit", {
        method : "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ name, email }),
    })

    const result = await response.json(); 
    document.getElementById("myForm").style.display = "none";
    if (response.ok){
        document.getElementById("validation").innerText = result.message;  
    }
    document.getElementById("validation").style.display = "block"; 
    

})