const platformOption = document.querySelectorAll(".platformOption")
const buttons = document.querySelectorAll(".defaultBtn")

for (const platform of platformOption) {
    platform.addEventListener("click", () => {

        for (const platform of platformOption)
            platform.style.backgroundColor = "transparent"

        platform.style.backgroundColor = "black"

        buttons.forEach(button => {
            button.style.opacity = 1;
            button.style.pointerEvents = "all";
        });
    })
} 
