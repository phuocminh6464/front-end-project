module.exports = {
  name: "my-nx-app",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/my-nx-app/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
