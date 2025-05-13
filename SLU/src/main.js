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
          toggleMenu();
        }
      
        isRed = !isRed;
      });
      console.log(
        "interactive-cube-manager: Click listener successfully added to the cube."
      );
    },
  });




