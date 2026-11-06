/**
 * Downloads a local asset (PDF or PNG) via Blob object URL so that
 * sandboxed preview iframes trigger an immediate file save rather than
 * navigating into Chrome's blocked in-frame PDF viewer.
 */
export async function downloadAssetFile(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => {
      window.URL.revokeObjectURL(objectUrl);
    }, 1500);
  } catch {
    // Fallback if fetch is restricted
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
