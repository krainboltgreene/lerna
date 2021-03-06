import {
  copyFixture,
  fixtureNamer,
  getTempDir,
  gitInit,
  removeAll,
} from "./fixtureUtils";

const getFixtureName = fixtureNamer();

const createdDirectories = [];
afterAll(() => removeAll(createdDirectories));

export default function initFixture(fixturePath) {
  const fixtureName = getFixtureName(fixturePath);

  return getTempDir(fixtureName).then((testDir) => {
    createdDirectories.push(testDir);

    return copyFixture(fixturePath, testDir)
      .then(() => gitInit(testDir))
      .then(() => testDir);
  });
}
