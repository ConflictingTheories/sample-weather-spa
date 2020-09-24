// Light Mode
//
class Colors {
  // Colours
  static primaryColor = "#5BBFBA";
  static secondaryColor = "#5F6CAF";
  static dark = "#222";
  static textColor = "#111";
  static linkColor = "hsl(199, 82%, 42%)";

  // Mid Tones
  static green = "#A4D4AE";
  static orange = "#F0CF85";
  static yellow = "#E7F0C3";

  // Grays
  static darkGray = "#444";
  static midGray = "#777";
  static lightGray = "#aaa";
  static slateGray = "rgb(150, 160, 190)";

  // Gradients
  static primaryGrad = "linear-gradient(45deg, #5BBFBA, #5F6CAF)";
  static secondaryGrad = "linear-gradient(45deg,#5F6CAF,white)";

  // Weather Colors
  static sunOrange = "hsl(35, 95%, 60)";
  static blueSky = "hsl(200, 95%, 60)";
  static rain = "hsl(240, 95%, 60)";
  static cloudyGray = "hsl(35, 5%, 60)";
  static stormPurple = "hsl(250, 45%, 30)";
  static nightSky = "hsl(240, 45%, 20)";

  static clearDay = `linear-gradient(45deg, white, ${Colors.blueSky}, ${Colors.yellow})`;
  static cloudyDay = `linear-gradient(45deg, ${Colors.blueSky}, ${Colors.cloudyGray})`;
  static stormyDay = `linear-gradient(45deg, ${Colors.cloudyGray}, ${Colors.stormPurple})`;
  static rainyDay = `linear-gradient(45deg, ${Colors.cloudyGray}, ${Colors.rain})`;
  static snowyDay = `linear-gradient(45deg,  ${Colors.cloudyGray},  white)`;
  static smokyDay = `linear-gradient(45deg, ${Colors.cloudyGray},  ${Colors.midGray}`;

  static clearNight = `linear-gradient(45deg, ${Colors.dark}, ${Colors.nightSky})`;
  static cloudyNight = `linear-gradient(45deg, ${Colors.dark}, ${Colors.nightSky}, ${Colors.slateGray})`;
  static stormyNight = `linear-gradient(45deg, ${Colors.nightSky}, ${Colors.stormPurple}, ${Colors.dark} )`;
  static rainyNight = `linear-gradient(45deg, ${Colors.nightSky}, ${Colors.rain})`;
  static snowyNight = `linear-gradient(45deg,  ${Colors.cloudyGray},  ${Colors.nightSky},  ${Colors.stormPurple})`;
  static smokyNight = `linear-gradient(45deg, ${Colors.nightSky},  ${Colors.midGray}`;
}

export default Colors;
