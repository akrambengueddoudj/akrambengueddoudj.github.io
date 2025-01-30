var player = videojs('my-video', {
    playbackRates: [0.5, 1, 1.5, 2], // Add speed options
    controls: true,
    autoplay: true,
    fluid: true // Makes the player responsive
});

let qualityLevels = player.qualityLevels();
console.log(qualityLevels);

// disable quality levels with less than 720 horizontal lines of resolution when added
// to the list.
// qualityLevels.on('addqualitylevel', function(event) {
//   let qualityLevel = event.qualityLevel;

//   if (qualityLevel.height >= 720) {
//     qualityLevel.enabled = true;
//   } else {
//     qualityLevel.enabled = false;
//   }
// });

// example function that will toggle quality levels between SD and HD, defining and HD
// quality as having 720 horizontal lines of resolution or more
let toggleQuality = (function() {
  let enable720 = true;

  return function() {
    for (let qualityLevel of qualityLevels) {
      if (qualityLevel.height >= 720) {
        qualityLevel.enabled = enable720;
      } else {
        qualityLevel.enabled = !enable720;
      }
    }
    enable720 = !enable720;
  };
})();

let currentSelectedQualityLevelIndex = qualityLevels.selectedIndex; // -1 if no level selected

// Listen to change events for when the player selects a new quality level
qualityLevels.on('change', function() {
  console.log('Quality Level changed!');
  console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
});