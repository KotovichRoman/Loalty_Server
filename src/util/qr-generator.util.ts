import { createCanvas } from 'canvas';
import * as QRCode from 'qrcode';
import buildUrl from 'build-url';

export async function generateQRCode(userId: number): Promise<Buffer> {
  const qrData = buildUrl(`https://localhost:3000/`, {
    path: `score?userId=${Number(userId)}`,
  });

  const canvas = createCanvas(300, 300);
  await QRCode.toCanvas(
    canvas,
    qrData,
    { width: 300, errorCorrectionLevel: 'H' },
    function (error) {
      if (error) console.error(`ERROR: ${error}`);
    },
  );

  return canvas.toBuffer();
}
