import { render } from '@testing-library/react';
import App from './App';

jest.mock('./Firebase/firebase', () => ({
  auth: {},
  db: {},
  googleProvider: {},
  default: {},
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  GoogleAuthProvider: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => () => {}),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  signInWithPopup: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

test('renders without crashing', () => {
  render(<App />);
});
