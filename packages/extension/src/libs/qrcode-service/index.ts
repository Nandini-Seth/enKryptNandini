import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import BrowserStorage from '../common/browser-storage';
import { InternalStorageNamespace } from '@/types/provider';

export interface QRCodeService {
  secret: string;
  enabled: boolean;
}

export class QRCodeService {
  private storage: BrowserStorage;
  private qrcodeKey = 'qrcode-key';

  constructor() {
    this.storage = new BrowserStorage(InternalStorageNamespace.qrcode);
  }

  /**
   * Generates a new TOTP secret to be used for QR code generation
   * @returns {string} The generated secret
   */
  async generateSecret(): Promise<string> {
    return authenticator.generateSecret();
  }

  /**
   * Generates a QR code for the given TOTP secret
   * @param secret The TOTP secret
   * @param account The account name (user given)
   *
   * @returns A promise that resolves to the QR code data URL
   */
  async generateQRCode(
    secret: string,
    account: string = 'enkrypt',
  ): Promise<string> {
    const otpAuth = authenticator.keyuri(account, 'enKrypt Wallet', secret);
    return QRCode.toDataURL(otpAuth);
  }

  /**
   * verify a TOTP token
   *
   * @param otp The TOTP token that needs to be verified
   * @param secret The TOTP secret
   *
   * @returns {boolean} Whether the OTP is valid
   */
  verifyOtp(otp: string, secret: string): boolean {
    return authenticator.verify({ token: otp, secret });
  }

  /**
   * Save the QR code configuration
   *
   * @param config The QR code configuration
   */
  async saveQRCodeConfig(config: QRCodeService): Promise<void> {
    await this.storage.set(this.qrcodeKey, config);
  }

  /**
   * Get the QR code configuration
   *
   * @returns The QR code configuration
   */
  async getQRCodeConfig(): Promise<QRCodeService | null> {
    return this.storage.get(this.qrcodeKey);
  }

  /**
   * Check if the QR code is enabled
   *
   * @returns Whether the QR code is enabled, true or false
   */
  async isQRCodeEnabled(): Promise<boolean> {
    const config = await this.getQRCodeConfig();
    return !!config?.enabled;
  }

  /**
   * Disable the QR code
   */
  async disableQRCode(): Promise<void> {
    await this.storage.remove(this.qrcodeKey);
  }
}

export default QRCodeService;
