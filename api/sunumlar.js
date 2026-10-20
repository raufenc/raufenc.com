import { get, list, put } from '@vercel/blob';
import { handleUpload } from '@vercel/blob/client';
import { createPresentationHandler } from '../lib/sunumlar-server.mjs';

export default createPresentationHandler({
  blob: { get, list, put },
  handleUpload,
});
