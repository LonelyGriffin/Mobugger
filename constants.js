const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  /// DEV  ///
  "ENV": JSON.stringify(NODE_ENV),

  /// CSS ///
  "SIDE_BUTTON_SIZE": JSON.stringify("60") //px
}
