let y = 0;
const showInfo = () => {
  y = 1;
  const webButton = document.querySelector("#web-button");
  const fbButton = document.querySelector("#fb-button");
  const instaButton = document.querySelector("#insta-button");
  const liButton = document.querySelector("#li-button");
  // const text = document.querySelector("#text");

  webButton.setAttribute("visible", true);
  setTimeout(() => {
    fbButton.setAttribute("visible", true);
  }, 100);
  setTimeout(() => {
    instaButton.setAttribute("visible", true);
  }, 120);
  setTimeout(() => {
    liButton.setAttribute("visible", true);
  }, 140);

  let currentTab = '';
  webButton.addEventListener('click', function (evt) {
    // text.setAttribute("value", "https://www.slu.edu/");
    if(webButton.getAttribute("visible") === true){
      window.location.href = "https://www.slu.edu/";
      currentTab = 'web';
    }
  });
  instaButton.addEventListener('click', function (evt) {
    // text.setAttribute("value", "https://www.instagram.com/slu_official/");
    window.location.href = "https://www.instagram.com/slu_official/";
    currentTab = 'instagram';
  });
  fbButton.addEventListener('click', function (evt) {
    // text.setAttribute("value", "https://www.facebook.com/SaintLouisU/");
    window.location.href = "https://www.facebook.com/SaintLouisU/";
    currentTab = 'facebook';
  });
  liButton.addEventListener('click', function (evt) {
    console.log("Li");
    // text.setAttribute("value", "https://www.linkedin.com/school/saint-louis-university/posts/?feedView=all");
    window.location.href = "https://www.linkedin.com/school/saint-louis-university/posts/?feedView=all";
    currentTab = 'LinkedIn';
  });

  // text.addEventListener('click', function (evt) {
  //   if (currentTab === 'web') {
  //     window.location.href="https://www.slu.edu/";
  //   }
  // });
}

const noInfo = () => {
  const webButton = document.querySelector("#web-button");
  const fbButton = document.querySelector("#fb-button");
  const instaButton = document.querySelector("#insta-button");
  const liButton = document.querySelector("#li-button");
  // const text = document.querySelector("#text");

  liButton.setAttribute("visible", false);
  setTimeout(() => {
    instaButton.setAttribute("visible", false);
  }, 100);
  setTimeout(() => {
    fbButton.setAttribute("visible", false);
  }, 120);
  setTimeout(() => {
    webButton.setAttribute("visible", false);
  }, 140);

  let currentTab = '';
  webButton.addEventListener('click', function (evt) {
    // text.setAttribute("value", "https://www.slu.edu/");
    currentTab = "web";
    
    
  });
  instaButton.addEventListener('click', function (evt) {
    // text.setAttribute("value", "https://www.instagram.com/slu_official/");
    currentTab = 'instagram';
    console.log("NOPE!", currentTab);
  });
  fbButton.addEventListener('click', function (evt) {
    // text.setAttribute("value", "https://www.facebook.com/SaintLouisU/");
    currentTab = 'facebook';
    console.log("NOPE!", currentTab);
  });
  liButton.addEventListener('click', function (evt) {
    console.log("Li");
    // text.setAttribute("value", "https://www.linkedin.com/school/saint-louis-university/posts/?feedView=all");
    currentTab = 'LinkedIn';
    console.log("NOPE!", currentTab);
  });

  // text.addEventListener('click', function (evt) {
  //   if (currentTab === 'web') {
  //     window.location.href="https://www.slu.edu/";
  //   }
  // });
}



AFRAME.registerComponent("interactive-cube-manager", {
    init: function () {
      // Log when the component initializes
      console.log("interactive-Menu-manager: Initializing component.");

      const targetEntity = this.el; // 'this.el' is the <a-entity mindar-image-target>
      // Select the cube using its ID 'myInteractiveCube'
      const menuEntity = document.querySelector("#myInteractiveSphere");
      // const speakerEntity = document.querySelector("#speaker");
      const audio = document.querySelector('#bg-music');
      let music = false;

      // Check if the cube was found
      if (!menuEntity) {
        console.error(
          "ERROR: The menu with ID 'myInteractiveSphere' was not found in the document."
        );
        return; // Exit if cube isn't found
      }
      console.log(
        "interactive-menu-manager: menu entity found:",
        menuEntity
      );
      

      // Ensure the cube is initially hidden (A-Frame's 'visible' attribute also handles this)
      menuEntity.setAttribute("visible", false);
      // speakerEntity.setAttribute("on", null);

      // Event listener for when the MindAR target is found
      targetEntity.addEventListener("targetFound", (event) => {
        console.log("MindAR Target Found: Making cube visible.");
        menuEntity.setAttribute("visible", true); // Show the cube
        if(music) {
          audio.play();
        }
      });

      // Event listener for when the MindAR target is lost
      targetEntity.addEventListener("targetLost", (event) => {
        console.log("MindAR Target Lost: Hiding cube.");
        menuEntity.setAttribute("visible", false); // Hide the cube
        if(music){
          audio.pause();
          console.log("Audio paused.");
        }
      });

      let isRed = false;
      let toggleMenu = false;
      menuEntity.addEventListener("dblclick", function (event) {
        console.log("double!");
        return;
        
      });

      // Event listener for click events on the cube
      menuEntity.addEventListener("click", function () {
        console.log("Cube clicked!");

        if (audio.paused) {
          audio.play().then(() => {
            console.log("Audio played.");
          }).catch((err) => {
            console.error("Play failed:", err);
          });
          music = true;
        } else {
          audio.pause();
          console.log("Audio paused.");
          music = false;
        }
      
        if (!isRed) {
          // Apply red tint
          this.setAttribute("material", {
            color: "red",
            src: "/cenBilli2.png" // keep the texture
          });
          console.log("Applied red tint over texture");
          showInfo();
          const options = [
            document.querySelector("#option1"),
            document.querySelector("#option2"),
            document.querySelector("#option3"),
            document.querySelector("#option4"),
            document.querySelector("#option5"),
            document.querySelector("#option6"),
          ];
          let menuVisible = false;
          const radius = 0.25;
          const angles = [-60, -90, -120, 60, 90, 120];
          toggleMenu = () => {
            menuVisible = !menuVisible;
            options.forEach((opt, i) => {
              opt.setAttribute("visible", menuVisible);
              if (menuVisible) {
                const rad = THREE.MathUtils.degToRad(angles[i]);
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);
                opt.setAttribute("position", `${x} ${y} 0`);
              }
            });
          };
          toggleMenu();

        } else {
          // Reset to original (no tint = white color)
          this.setAttribute("material", {
            color: "white",
            src: "/cenBilli2.png" // restore the texture
          });
          console.log("Removed red tint, restored texture");
          y = 0;
          noInfo();
          toggleMenu();
        }
      
        isRed = !isRed;
      });
      console.log(
        "interactive-cube-manager: Click listener successfully added to the cube."
      );
    },
  });


  



