// let y = 0;
const showInfo = () => {
	const webButton = document.querySelector("#web-button");
	const fbButton = document.querySelector("#fb-button");
	const instaButton = document.querySelector("#insta-button");
	const liButton = document.querySelector("#li-button");

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

	let currentTab = "";
	webButton.addEventListener("click", function (evt) {
		if (webButton.getAttribute("visible") === true) {
			window.open("https://www.slu.edu/", "_blank");
			currentTab = "web";
		}
	});
	instaButton.addEventListener("click", function (evt) {
		if (instaButton.getAttribute("visible") === true) {
			// window.location.href = "https://www.instagram.com/slu_official/";
			window.open("https://www.instagram.com/slu_official/", "_blank");
			currentTab = "instagram";
		}
	});
	fbButton.addEventListener("click", function (evt) {
		if (fbButton.getAttribute("visible") === true) {
			window.open("https://www.facebook.com/SaintLouisU/", "_blank");
			currentTab = "facebook";
		}
	});
	liButton.addEventListener("click", function (evt) {
		if (liButton.getAttribute("visible") === true) {
			window.open(
				"https://www.linkedin.com/school/saint-louis-university/posts/?feedView=all",
				"_blank"
			);
			currentTab = "LinkedIn";
		}
	});
};

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

	let currentTab = "";
	webButton.addEventListener("click", function (evt) {
		currentTab = "web";
	});
	instaButton.addEventListener("click", function (evt) {
		currentTab = "instagram";
		console.log("NOPE!", currentTab);
	});
	fbButton.addEventListener("click", function (evt) {
		currentTab = "facebook";
		console.log("NOPE!", currentTab);
	});
	liButton.addEventListener("click", function (evt) {
		currentTab = "LinkedIn";
		console.log("NOPE!", currentTab);
	});
};

AFRAME.registerComponent("interactive-cube-manager", {
	init: function () {
		// Log when the component initializes
		console.log("interactive-Menu-manager: Initializing component.");

		const targetEntity = this.el; // 'this.el' is the <a-entity mindar-image-target>
		// Select the cube using its ID 'myInteractiveCube'
		const menuEntity = document.querySelector("#myInteractiveSphere");

		const photoViewer = document.querySelector("#photo-viewer");
		const photoBack = document.querySelector("#photo-back");
		const photoNext = document.querySelector("#photo-next");
		const photoPrev = document.querySelector("#photo-prev");
		const audioToggle = document.querySelector("#audio-toggle");
		// const speakerEntity = document.querySelector("#speaker");
		const audio = document.querySelector("#bg-music");
		let manualAudioEnabled = true;
		let music = false;

		audioToggle.addEventListener("click", () => {
			if (audio.paused) {
				audio.play();
				audioToggle.setAttribute("src", "#icon-sound-on");
				music = true;
				manualAudioEnabled = true;
			} else {
				audio.pause();
				audioToggle.setAttribute("src", "#icon-sound-off");
				music = false;
				manualAudioEnabled = false;
			}
		});

		// Check if the cube was found
		if (!menuEntity) {
			console.error(
				"ERROR: The menu with ID 'myInteractiveSphere' was not found in the document."
			);
			return; // Exit if cube isn't found
		}
		console.log("interactive-menu-manager: menu entity found:", menuEntity);

		// Ensure the cube is initially hidden (A-Frame's 'visible' attribute also handles this)
		menuEntity.setAttribute("visible", false);
		// speakerEntity.setAttribute("on", null);

		// Event listener for when the MindAR target is found
		targetEntity.addEventListener("targetFound", (event) => {
			console.log("MindAR Target Found: Making cube visible.");
			menuEntity.setAttribute("visible", true); // Show the cube
			if (music) {
				audio.play();
			}
		});

		// Event listener for when the MindAR target is lost
		targetEntity.addEventListener("targetLost", (event) => {
			console.log("MindAR Target Lost: Hiding cube.");
			menuEntity.setAttribute("visible", false); // Hide the cube
			if (music) {
				audio.pause();
				console.log("Audio paused.");
			}
		});

		let isRed = false;
		// let isExpanded = false;
		let toggleMenu = false;

		// Event listener for click events on the cube
		menuEntity.addEventListener("click", function () {
			console.log("Menu button clicked!");

			if (audio.paused && manualAudioEnabled) {
				audio
					.play()
					.then(() => {
						console.log("Audio played.");
					})
					.catch((err) => {
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
					src: "/cenBilli2.png", // keep the texture
				});
				console.log("Applied red tint over texture");
				showInfo();
				const popupIds = [
					"option1",
					"option2",
					"option3",
					"option4",
					"option5",
					"option6",
				];

				const allUIIds = [
					"option1",
					"option2",
					"option3",
					"option4",
					"option5",
					"option6",
					"web-button",
					"fb-button",
					"insta-button",
					"li-button",
					"myInteractiveSphere",
				];

				const option3 = document.querySelector("#option3");
				if (option3) {
					option3.addEventListener("click", () => {
						console.log("Option 3 clicked: Opening photo viewer");
						showPhotoViewer();
					});
				}

				const photos = ["#photo1", "#photo2", "#photo3"];
				let currentPhoto = 0;

				function updatePhoto() {
					photoViewer.setAttribute("visible", false);
					photoViewer.setAttribute("src", "");
					setTimeout(() => {
						photoViewer.setAttribute("src", photos[currentPhoto]);
						photoViewer.setAttribute("visible", true);
					}, 50);
				}

				// function hideAllUI() {
				// 	allUIIds.forEach((id) => {
				// 		const el = document.querySelector(`#${id}`);
				// 		if (el) el.setAttribute("visible", false);
				// 	});
				// }
				function hideAllUI() {
					allUIIds.forEach((id) => {
						const el = document.querySelector(`#${id}`);
						if (el) {
							el.setAttribute("visible", false);
							el.classList.remove("clickable");
						}
					});
				}

				// function showAllUI() {
				// 	allUIIds.forEach((id) => {
				// 		const el = document.querySelector(`#${id}`);
				// 		if (el) el.setAttribute("visible", true);
				// 	});
				// }
				function showAllUI() {
					allUIIds.forEach((id) => {
						const el = document.querySelector(`#${id}`);
						if (el) {
							el.setAttribute("visible", true);
							el.classList.add("clickable");
						}
					});
				}

				function showPhotoViewer() {
					hideAllUI();
					photoViewer.setAttribute("visible", true);
					photoBack.setAttribute("visible", true);
					photoNext.setAttribute("visible", true);
					photoPrev.setAttribute("visible", true);
					photoViewer.setAttribute("src", photos[currentPhoto]);
					document.querySelector("#bday-text").setAttribute("visible", true);
				}

				function hidePhotoViewer() {
					photoViewer.setAttribute("visible", false);
					photoBack.setAttribute("visible", false);
					photoNext.setAttribute("visible", false);
					photoPrev.setAttribute("visible", false);
					showAllUI();
					document.querySelector("#bday-text").setAttribute("visible", false);
				}

				// Event listeners
				photoNext.addEventListener("click", () => {
					currentPhoto = (currentPhoto + 1) % photos.length;
					// photoViewer.setAttribute("src", ""); // Reset
					// photoViewer.setAttribute("src", photos[currentPhoto]);
					updatePhoto();
				});

				photoPrev.addEventListener("click", () => {
					currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
					// photoViewer.setAttribute("src", ""); // Clear to force reload if needed
					// photoViewer.setAttribute("src", photos[currentPhoto]);
					updatePhoto();
				});

				photoBack.addEventListener("click", () => {
					hidePhotoViewer();
				});

				let isExpanded = false;
				toggleMenu = () => {
					popupIds.forEach((id) => {
						const el = document.querySelector(`#${id}`);
						if (!isExpanded) {
							el.setAttribute("visible", true);
							el.emit(`show-${id}`);
						} else {
							el.emit(`hide-${id}`);
						}
					});
					if (isExpanded) {
						popupIds.forEach((id) => {
							const el = document.querySelector(`#${id}`);
							el.addEventListener("animationcomplete__hide", () => {
								// audioToggle.setAttribute("src", "#icon-sound-off");
								audioToggle.setAttribute("visible", false);
								if (!isExpanded) {
									el.setAttribute("visible", false);
								}
							});
						});
					}
					isExpanded = !isExpanded;
					audioToggle.setAttribute("visible", true);
					// audioToggle.setAttribute("src", "#icon-sound-on");
				};
				toggleMenu();
			} else {
				// Reset to original (no tint = white color)
				this.setAttribute("material", {
					color: "white",
					src: "/cenBilli2.png", // restore the texture
				});
				console.log("Removed red tint, restored texture");
				noInfo();
				toggleMenu();
			}

			isRed = !isRed;
		});
		console.log(
			"interactive-menu-manager: Click listener successfully added to the menu."
		);
	},
});
