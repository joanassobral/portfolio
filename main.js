let project_text_div = document.getElementById("project_text_div");
let project_tags_div = document.getElementById("project_tags_div")

let about_btn = document.getElementById("about_btn")

let name_btn = document.getElementById("name");
let nav_section = document.getElementById("nav_section");
let nav_open = true;
name_btn.addEventListener("click",()=>{
    if(nav_open == true){
        nav_section.style.marginTop = - nav_section.offsetHeight + "px";
        nav_open = false;
        name_btn.innerText = "Joana Soares de Albergaria Ambar Sobral ↑";
        name_btn.style.textDecoration = "none";

    }else if(nav_open == false) {
        nav_section.style.marginTop = 0 + "px";
        nav_open = true;
        name_btn.innerText = "Joana Soares de Albergaria Ambar Sobral ↓";
        name_btn.style.textDecoration = "underline";
    }
})

let currentLang = "eng"
document.getElementById("eng_btn").classList.add("btn_selected")

fetch("data.json")

    .then(function(response){
        return response.json();
    })

    .then(function(data){

        for(i=0;i<data.length;i++){
            let projectId = data[i].projectId;

            let engTags = data[i].engTags;
            let esTags = data[i].esTags;
            let ptTags = data[i].ptTags;
            let engText = data[i].engText;
            let esText = data[i].esText;
            let ptText = data[i].ptText;

            let pageLink = data[i].link;

            let numberImgs = data[i].numberImgs;
            let x_coords_imgs = data[i].x_coords_imgs;
            let y_coords_imgs = data[i].y_coords_imgs;

            let numberVids = data[i].numberVids;
            let x_coords_vids = data[i].x_coords_vids;
            let y_coords_vids = data[i].y_coords_vids;

            function makeText(){

                let lang_btn_div = document.getElementById("lang_btn_div");
                    lang_btn_div.style.height = "auto";
                    lang_btn_div.style.opacity = 1;
                    lang_btn_div.style.marginTop = 1.5 + "vh"

                Array.from(document.getElementsByClassName("lang_btn")).forEach(
                    function(lang_btn){
                        lang_btn.classList.remove("btn_selected");
                        lang_btn.addEventListener("click",()=>{
                            let lang_btn_id = lang_btn.id;
                            currentLang = lang_btn_id.replace("_btn","")
                            makeText();

                            if(currentLang === "es"){
                                about_btn.innerText = "Sobre mí";
                                document.getElementById("project_btn_3").innerText = "Una hermosa amistad con Spotify";
                            } else if(currentLang === "eng") {
                                about_btn.innerText = "About";
                                document.getElementById("project_btn_3").innerText = "A beautiful friendship with Spotify";
                            } else if(currentLang === "pt") {
                                about_btn.innerText = "Sobre mim";
                                document.getElementById("project_btn_3").innerText = "Uma linda amizade com o Spotify";
                            };;
                        })
                    }
                )
                let currentText = eval(currentLang + "Text");
                let currentTags = eval(currentLang + "Tags");
                let currentLangBtn = eval(currentLang + "_btn")
                    currentLangBtn.classList.add("btn_selected");


                project_tags_div.innerHTML = "";
                if(engTags){
                    project_tags_div.style.marginBottom = 4 + "vh";

                    const tagsArray = currentTags.split(";");
                        for(k=0;k<tagsArray.length;k++){
                            let tag = document.createElement("p");
                                tag.innerText = "◊ " + tagsArray[k];
                                project_tags_div.appendChild(tag)
                        }
                } else if(!engTags) {
                    project_tags_div.style.marginBottom = 0;
                }
                if(pageLink){
                    let link = document.createElement("p");
                        link.classList.add("link")
                        if(currentLang === "eng"){
                            link.innerText = "Visit website →"
                        } else if(currentLang === "es"){
                            link.innerText = "Visita la página →"
                        } else if(currentLang === "pt"){
                            link.innerText = "Visita a página →"
                        }
                        project_tags_div.appendChild(link);
                        link.addEventListener("click",()=>{
                            window.open(pageLink,"_blank")
                        })
                }

                project_text_div.innerHTML = "";
                const textArray = currentText.split(";");
                for(l=0;l<textArray.length;l++){
                    let textPrg = document.createElement("p");
                        textPrg.innerText = textArray[l];
                        project_text_div.appendChild(textPrg)
                }
            }

            let button = document.getElementById(projectId);
                button.addEventListener("click",()=>{
                    
                    about_btn.classList.remove("tiny_nudge_animation");

                    window.scrollTo(0,0)

                    currentProject = projectId;

                    Array.from(document.getElementsByClassName("btn")).forEach(
                        function(btn){
                                    btn.classList.remove("btn_selected");
                                }
                    )
                    button.classList.add("btn_selected");
                    makeText();

                    scroll_body.innerHTML = "";

                    for(m=0;m<numberImgs;m++){
                        let project_img = document.createElement("img");
                            project_img.src = "Media/" + projectId + "/" + m + ".png"
                            
                            const x_coords_array = x_coords_imgs.split(",");
                            const y_coords_array = y_coords_imgs.split(",");
                            project_img.style.left = x_coords_array[m] + "vh";
                            project_img.style.top = y_coords_array[m] + "vh";

                            if(currentProject === "project_btn_4"){
                                console.log(currentProject)
                                project_img.classList.add("long_img")
                            }

                            scroll_body.appendChild(project_img)

                            if(window.innerHeight>window.innerWidth){
                                project_img.style.left = (x_coords_array[m]*0.70) + "vh";
                                project_img.style.top = (y_coords_array[m]*0.70) + "vh";
                            }
                    }

                    for(n=0;n<numberVids;n++){
                        let video = document.createElement("video");
                            video.src = "Media/" + projectId + "/" + n + ".mp4"
                            video.autoplay = true;
                            video.loop = true;
                            video.playsInline = true;
                            video.muted = true;
                            scroll_body.appendChild(video)
                            
                            const x_coords_array = x_coords_vids.split(",");
                            const y_coords_array = y_coords_vids.split(",");
                            video.style.left = x_coords_array[n] + "vh";
                            video.style.top = y_coords_array[n] + "vh";

                            if(currentProject === "about_btn"){
                                video.id = "about_video";
                            }

                            scroll_body.appendChild(video)   

                            if(window.innerHeight>window.innerWidth){
                                video.style.left = (x_coords_array[n]*0.70) + "vh";
                                video.style.top = (y_coords_array[n]*0.70) + "vh";
                            }
                    }
                })
        }
    })

    .catch(function(err){
        console.log(err);
    });


