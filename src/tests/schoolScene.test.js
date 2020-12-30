import SchoolScene from '../scenes/schoolScene';

const scene = new SchoolScene();

test('SchoolScene is of type function', () => {
  expect(typeof SchoolScene).toBe('function');
});

test('SchoolScene key name is School', () => {
  expect(scene.sys.config).toBe('School');
});

test('SchoolScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
