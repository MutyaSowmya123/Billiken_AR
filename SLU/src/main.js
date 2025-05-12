// AFRAME.registerComponent("tap-listener", {
//     init: function () {

//     console.log("interactive-circle-manager: Initializing component.");

//     const targetEntity = this.el;
//     const circle = document.querySelector("#menu-button");
//     if (!circle) {
//         console.error(
//           "ERROR: The circle with ID 'menu-button' was not found."
//         );
//       } else {
//         console.log(
//           "interactive-circle-manager: circle entity found:",
//           circle
//         );
//         circle.setAttribute("visible", false);
//         circle.addEventListener("click", function () {
//             console.log("circle clicked!");
//         });
//         console.log(
//             "interactive-circle-manager: Click listener added to the circle."
//           );
//     }




    
//       // Only this entity (#menu-button) will trigger this because it's raycasted
//     //   this.el.addEventListener("click", () => {
//         // const options = [
//         //   document.querySelector("#option1"),
//         //   document.querySelector("#option2"),
//         //   document.querySelector("#option3"),
//         //   document.querySelector("#option4"),
//         //   document.querySelector("#option5"),
//         //   document.querySelector("#option6"),
//         // ];
  
//         // let menuVisible = this.el.getAttribute("data-menu-visible") !== "true";
//         // this.el.setAttribute("data-menu-visible", menuVisible);
  
//         // const radius = 0.25;
//         // const angles = [-60, -90, -120, 60, 90, 120];
  
//         // options.forEach((opt, i) => {
//         //   opt.setAttribute("visible", menuVisible);
//         //   if (menuVisible) {
//         //     const rad = AFRAME.THREE.MathUtils.degToRad(angles[i]);
//         //     const x = radius * Math.cos(rad);
//         //     const y = radius * Math.sin(rad);
//         //     opt.setAttribute("position", `${x} ${y} 0`);
//         //   }
//         // });
  
//         // console.log("Menu toggled from #menu-button only");
//     //   });
//     },
//   });


AFRAME.registerComponent("interactive-cube-manager", {
    init: function () {
      // Log when the component initializes
      console.log("interactive-Menu-manager: Initializing component.");

      const targetEntity = this.el; // 'this.el' is the <a-entity mindar-image-target>
      // Select the cube using its ID 'myInteractiveCube'
      const menuEntity = document.querySelector("#myInteractiveSphere");

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

      // Event listener for when the MindAR target is found
      targetEntity.addEventListener("targetFound", (event) => {
        console.log("MindAR Target Found: Making cube visible.");
        menuEntity.setAttribute("visible", true); // Show the cube
      });

      // Event listener for when the MindAR target is lost
      targetEntity.addEventListener("targetLost", (event) => {
        console.log("MindAR Target Lost: Hiding cube.");
        menuEntity.setAttribute("visible", false); // Hide the cube
      });

      let isRed = false;
      let toggleMenu = false;

      // Event listener for click events on the cube
      menuEntity.addEventListener("click", function () {
        console.log("Cube clicked!");
      
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




