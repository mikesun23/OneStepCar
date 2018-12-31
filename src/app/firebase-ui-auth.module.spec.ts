import { FirebaseUiAuthModule } from './firebase-ui-auth.module';

describe('FirebaseUiAuthModule', () => {
  let firebaseUiAuthModule: FirebaseUiAuthModule;

  beforeEach(() => {
    firebaseUiAuthModule = new FirebaseUiAuthModule();
  });

  it('should create an instance', () => {
    expect(firebaseUiAuthModule).toBeTruthy();
  });
});
